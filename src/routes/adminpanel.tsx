import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";

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
  const passwordRef = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState(false);
  return (
    <div className="grid min-h-screen place-items-center bg-secondary/40 px-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const stored = window.localStorage.getItem("lamha_admin_pass") ?? DEFAULT_PASSWORD;
          if (passwordRef.current?.value === stored) {
            window.localStorage.setItem(PASS_KEY, "1");
            onOk();
          } else setErr(true);
        }}
        className="surface-card w-full max-w-sm p-7 text-center"
      >
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary-soft text-primary">
          <Lock className="size-6" />
        </span>
        <h1 className="mt-4 font-display text-xl">لوحة تحكم لمحة</h1>
        <p className="mt-1 text-xs text-muted-foreground">أدخل كلمة المرور للدخول</p>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          ref={passwordRef}
          onInput={() => { if (err) setErr(false); }}
          className="mt-5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-center"
          placeholder="كلمة المرور"
        />
        {err && <p className="mt-2 text-xs font-bold text-destructive">كلمة المرور غير صحيحة</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
        >
          دخول
        </button>
      </form>
    </div>
  );
}
