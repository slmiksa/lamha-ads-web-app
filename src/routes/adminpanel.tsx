import { lazy, Suspense, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/adminpanel")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "لوحة التحكم — تطبيق لمحة" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "لوحة تحكم محتوى موقع تطبيق لمحة." },
    ],
  }),
  component: AdminPanel,
});

const PASS_KEY = "lamha_admin_ok";
const DEFAULT_PASSWORD = "lamha2026";
const AdminWorkspace = lazy(() => import("@/components/AdminWorkspace"));

function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    setAuthed(window.localStorage.getItem(PASS_KEY) === "1");
    setAuthReady(true);
  }, []);

  if (!authReady) return <div className="min-h-screen bg-secondary/40" aria-hidden />;
  if (!authed) return <Gate onOk={() => setAuthed(true)} />;
  return <Suspense fallback={<div className="min-h-screen bg-secondary/40" aria-label="جارٍ تحميل لوحة التحكم" />}><AdminWorkspace /></Suspense>;
}

function Gate({ onOk }: { onOk: () => void }) {
  const [err, setErr] = useState(false);

  return (
    <main className="grid min-h-screen place-items-center bg-background px-5 py-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const entered = String(form.get("access-code") ?? "");
          const stored = window.localStorage.getItem("lamha_admin_pass") ?? DEFAULT_PASSWORD;
          if (entered === stored) {
            window.localStorage.setItem(PASS_KEY, "1");
            onOk();
            return;
          }
          setErr(true);
        }}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <div className="mb-6 text-center">
          <img src="/logo.png" alt="شعار لمحة" className="mx-auto h-20 w-20 object-contain" />
          <h1 className="mt-4 font-display text-xl">لوحة التحكم</h1>
          <p className="mt-1 text-sm text-muted-foreground">أدخل رمز الدخول للمتابعة</p>
        </div>

        <label htmlFor="admin-access-code" className="mb-2 block text-sm font-bold">
          رمز الدخول
        </label>
        <input
          id="admin-access-code"
          name="access-code"
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          onInput={() => {
            if (err) setErr(false);
          }}
          className="password-mask h-12 w-full rounded-lg border border-input bg-background px-4 text-center text-base outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="••••••••"
          required
        />
        <p className={`mt-2 min-h-5 text-center text-xs font-bold text-destructive ${err ? "visible" : "invisible"}`} aria-live="polite">
          رمز الدخول غير صحيح
        </p>
        <button
          type="submit"
          className="mt-3 h-12 w-full rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          دخول
        </button>
      </form>
    </main>
  );
}
