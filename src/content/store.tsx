import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultContent, type SiteContent } from "./defaults";

const STORAGE_KEY = "lamha_site_content_v1";
const DB_NAME = "lamha_content_db";
const DB_STORE = "content";
const DB_VERSION = 1;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base)) return (Array.isArray(override) ? override : base) as T;
  if (isPlainObject(base) && isPlainObject(override)) {
    const out: Record<string, unknown> = { ...base };
    for (const k of Object.keys(override)) {
      out[k] = k in (base as Record<string, unknown>)
        ? deepMerge((base as Record<string, unknown>)[k], override[k])
        : override[k];
    }
    return out as T;
  }
  return (override as T) ?? base;
}

function hasIndexedDb(): boolean {
  try {
    return typeof window !== "undefined" && !!window.indexedDB;
  } catch {
    return false;
  }
}

function openContentDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!hasIndexedDb()) {
      reject(new Error("IndexedDB غير مدعوم في هذا المتصفح"));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("تعذر فتح التخزين المحلي"));
    request.onblocked = () => reject(new Error("التخزين المحلي مشغول"));
  });
}

function readLegacy(): Partial<SiteContent> | null {
  try {
    const legacy = window.localStorage.getItem(STORAGE_KEY);
    if (!legacy) return null;
    return JSON.parse(legacy) as Partial<SiteContent>;
  } catch {
    return null;
  }
}

async function readLocal(): Promise<Partial<SiteContent> | null> {
  // Fallback for WebViews / private mode where IndexedDB is unavailable.
  if (!hasIndexedDb()) return readLegacy();

  let db: IDBDatabase;
  try {
    db = await openContentDb();
  } catch {
    return readLegacy();
  }
  const stored = await new Promise<Partial<SiteContent> | null>((resolve) => {
    try {
      const request = db.transaction(DB_STORE, "readonly").objectStore(DB_STORE).get(STORAGE_KEY);
      request.onsuccess = () => resolve((request.result as Partial<SiteContent> | undefined) ?? null);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  db.close();
  if (stored) return stored;

  // Migrate the old synchronous storage once, then remove it permanently.
  const parsed = readLegacy();
  if (!parsed) return null;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  await writeLocal(parsed);
  return parsed;
}

function writeLegacy(value: Partial<SiteContent> | null): void {
  try {
    if (value === null) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* storage full or blocked */
  }
}

async function writeLocal(value: Partial<SiteContent> | null): Promise<void> {
  if (!hasIndexedDb()) {
    writeLegacy(value);
    return;
  }
  let db: IDBDatabase;
  try {
    db = await openContentDb();
  } catch {
    writeLegacy(value);
    return;
  }
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(DB_STORE, "readwrite");
    const store = transaction.objectStore(DB_STORE);
    if (value === null) store.delete(STORAGE_KEY);
    else store.put(value, STORAGE_KEY);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  db.close();
}

type Ctx = {
  content: SiteContent;
  setContent: (next: SiteContent) => Promise<void>;
  resetContent: () => Promise<void>;
  hasLocalChanges: boolean;
};

const ContentContext = createContext<Ctx | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [remote, setRemote] = useState<Partial<SiteContent> | null>(null);
  const [local, setLocal] = useState<Partial<SiteContent> | null>(null);

  // Keep the server and first browser render identical, then restore local edits.
  useEffect(() => {
    let cancelled = false;
    const channel = typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel("lamha-content");
    const restore = () => {
      void readLocal()
        .then((stored) => {
          if (!cancelled) setLocal(stored);
        })
        .catch(() => {
          if (!cancelled) setLocal(null);
        });
    };
    const idleId = window.setTimeout(restore, 0);
    // Pick up saves made from the admin panel (same tab or another tab).
    window.addEventListener("storage", restore);
    window.addEventListener("lamha:content-updated", restore);
    channel?.addEventListener("message", restore);
    return () => {
      cancelled = true;
      window.clearTimeout(idleId);
      window.removeEventListener("storage", restore);
      window.removeEventListener("lamha:content-updated", restore);
      channel?.removeEventListener("message", restore);
      channel?.close();
    };
  }, []);

  // Published content file (upload content.json next to index.html on the server)
  useEffect(() => {
    let alive = true;
    fetch("/content.json", { cache: "no-store" })
      .then((r) => {
        const type = r.headers.get("content-type") ?? "";
        return r.ok && type.includes("application/json") ? r.json() : null;
      })
      .then((d) => {
        if (alive && d && typeof d === "object") setRemote(d as Partial<SiteContent>);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const content = useMemo(
    () => deepMerge(deepMerge(defaultContent, remote), local),
    [remote, local],
  );

  const setContent = useCallback(async (next: SiteContent) => {
    setLocal(next);
    try {
      await writeLocal(next);
      window.dispatchEvent(new Event("lamha:content-updated"));
      if (typeof BroadcastChannel !== "undefined") {
        const channel = new BroadcastChannel("lamha-content");
        channel.postMessage("updated");
        channel.close();
      }
    } catch (error) {
      setLocal(null);
      throw error;
    }
  }, []);

  const resetContent = useCallback(async () => {
    setLocal(null);
    await writeLocal(null);
    window.dispatchEvent(new Event("lamha:content-updated"));
    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel("lamha-content");
      channel.postMessage("updated");
      channel.close();
    }
  }, []);

  const value = useMemo(
    () => ({ content, setContent, resetContent, hasLocalChanges: local !== null }),
    [content, setContent, resetContent, local],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContentCtx(): Ctx {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside ContentProvider");
  return ctx;
}

export function useContent(): SiteContent {
  return useContentCtx().content;
}

/** Replaces {whatsapp} / {email} / {year} tokens inside admin-editable strings. */
export function useTokens() {
  const c = useContent();
  const whatsappUrl = `https://wa.me/${c.contact.whatsapp}`;
  // split/join keeps this working on older WebViews without String.replaceAll.
  return useCallback(
    (s: string) =>
      s
        .split("{whatsapp}").join(whatsappUrl)
        .split("{email}").join(c.contact.email)
        .split("{year}").join(String(new Date().getFullYear())),
    [whatsappUrl, c.contact.email],
  );
}

export { STORAGE_KEY };
export type { SiteContent };
