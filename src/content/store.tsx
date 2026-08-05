import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultContent, type SiteContent } from "./defaults";

const STORAGE_KEY = "lamha_site_content_v1";
const MAX_LOCAL_CONTENT_LENGTH = 2_000_000;

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

function readLocal(): Partial<SiteContent> | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw && raw.length > MAX_LOCAL_CONTENT_LENGTH) {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.setItem("lamha_content_recovered", "1");
      return null;
    }
    return raw ? (JSON.parse(raw) as Partial<SiteContent>) : null;
  } catch {
    return null;
  }
}

type Ctx = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  resetContent: () => void;
  hasLocalChanges: boolean;
};

const ContentContext = createContext<Ctx | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [remote, setRemote] = useState<Partial<SiteContent> | null>(null);
  const [local, setLocal] = useState<Partial<SiteContent> | null>(null);

  // Keep the server and first browser render identical, then restore local edits.
  useEffect(() => {
    let cancelled = false;
    const restore = () => {
      if (!cancelled) setLocal(readLocal());
    };
    const idleId = window.setTimeout(restore, 0);
    // Pick up saves made from the admin panel (same tab or another tab).
    window.addEventListener("storage", restore);
    window.addEventListener("lamha:content-updated", restore);
    return () => {
      cancelled = true;
      window.clearTimeout(idleId);
      window.removeEventListener("storage", restore);
      window.removeEventListener("lamha:content-updated", restore);
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

  const setContent = useCallback((next: SiteContent) => {
    setLocal(next);
    try {
      const serialized = JSON.stringify(next);
      if (serialized.length > MAX_LOCAL_CONTENT_LENGTH) {
        window.localStorage.setItem("lamha_content_too_large", "1");
        window.alert("حجم المحتوى كبير جدًا (صور ضخمة). قلّل حجم الصور ثم احفظ مرة أخرى.");
        return;
      }
      window.localStorage.removeItem("lamha_content_too_large");
      window.localStorage.setItem(STORAGE_KEY, serialized);
      window.dispatchEvent(new Event("lamha:content-updated"));
    } catch {
      window.alert("تعذّر الحفظ: مساحة التخزين في المتصفح ممتلئة.");
    }
  }, []);

  const resetContent = useCallback(() => {
    setLocal(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event("lamha:content-updated"));
    } catch {
      /* ignore */
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
  return useCallback(
    (s: string) =>
      s
        .replaceAll("{whatsapp}", whatsappUrl)
        .replaceAll("{email}", c.contact.email)
        .replaceAll("{year}", String(new Date().getFullYear())),
    [whatsappUrl, c.contact.email],
  );
}

export { STORAGE_KEY };
export type { SiteContent };
