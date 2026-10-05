import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultContent, type SiteContent } from "./defaults";
import { supabase } from "@/integrations/supabase/client";

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

type Ctx = {
  content: SiteContent;
  setContent: (next: SiteContent) => Promise<void>;
  resetContent: () => Promise<void>;
  refreshContent: () => Promise<void>;
};

const ContentContext = createContext<Ctx | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [remote, setRemote] = useState<Partial<SiteContent> | null>(null);
  const refreshContent = useCallback(async () => {
    const { data, error } = await supabase.rpc("get_published_site_content");
    if (error) throw new Error("تعذّر تحميل المحتوى من قاعدة البيانات");
    if (data && typeof data === "object" && !Array.isArray(data)) {
      setRemote(data as Partial<SiteContent>);
    }
  }, []);

  useEffect(() => {
    void refreshContent().catch(() => {});
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") void refreshContent().catch(() => {});
    };
    window.addEventListener("pageshow", refreshWhenVisible);
    document.addEventListener("visibilitychange", refreshWhenVisible);
    return () => {
      window.removeEventListener("pageshow", refreshWhenVisible);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [refreshContent]);

  const content = useMemo(() => deepMerge(defaultContent, remote), [remote]);

  const setContent = useCallback(async (next: SiteContent) => {
    setRemote(next);
  }, []);

  const resetContent = useCallback(async () => {
    setRemote(defaultContent);
  }, []);

  const value = useMemo(
    () => ({ content, setContent, resetContent, refreshContent }),
    [content, setContent, resetContent, refreshContent],
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

export type { SiteContent };
