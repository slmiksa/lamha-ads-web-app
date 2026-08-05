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

const AdminWorkspace = lazy(() => import("@/components/AdminWorkspace"));

const ADMIN_SESSION_KEY = "lamha_admin_unlocked";
const ADMIN_PASSWORD_HASH_KEY = "lamha_admin_password_hash";
const DEFAULT_PASSWORD_HASH = "0e2292e0fde71e24022fc18496fd7ba7e25c342b790450ee9897d7bcc6261ce1";

async function hashPassword(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function AdminPanel() {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "1");
    setReady(true);
  }, []);

  const login = async () => {
    const password = window.prompt("أدخل كلمة مرور لوحة التحكم");
    if (password === null) return;
    const expected = window.localStorage.getItem(ADMIN_PASSWORD_HASH_KEY) ?? DEFAULT_PASSWORD_HASH;
    if ((await hashPassword(password)) !== expected) {
      window.alert("كلمة المرور غير صحيحة");
      return;
    }
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
    setUnlocked(true);
  };

  const logout = () => {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setUnlocked(false);
  };

  const changePassword = async () => {
    const password = window.prompt("أدخل كلمة المرور الجديدة");
    if (password === null) return;
    if (password.trim().length < 6) {
      window.alert("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل");
      return;
    }
    window.localStorage.setItem(ADMIN_PASSWORD_HASH_KEY, await hashPassword(password.trim()));
    window.alert("تم تغيير كلمة المرور");
  };

  if (!ready) return null;

  if (!unlocked) {
    return (
      <main className="grid min-h-screen place-items-center bg-secondary/30 px-4" dir="rtl">
        <section className="w-full max-w-sm rounded-2xl border border-border bg-card p-7 text-center shadow-sm">
          <img src="/lamha-logo.png" alt="شعار تطبيق لمحة" className="mx-auto h-24 w-auto object-contain" />
          <h1 className="mt-4 font-display text-xl">لوحة تحكم الموقع</h1>
          <button type="button" onClick={login} className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">
            تسجيل الدخول
          </button>
        </section>
      </main>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-secondary/40 text-sm text-muted-foreground">
          جارٍ تحميل لوحة التحكم…
        </div>
      }
    >
      <AdminWorkspace onLogout={logout} onChangePassword={changePassword} />
    </Suspense>
  );
}
