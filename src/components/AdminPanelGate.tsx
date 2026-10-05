import { useEffect, useState } from "react";
import AdminWorkspace from "@/components/AdminWorkspace";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_SESSION_KEY = "lamha_admin_unlocked";
async function callAdminApi(body: Record<string, unknown>) {
  if (body.action === "verify") {
    const { data, error } = await supabase.rpc("verify_site_admin_password", { _password: String(body.password ?? "") });
    if (error) throw new Error("تعذّر الاتصال بقاعدة البيانات");
    if (!data) throw new Error("كلمة المرور غير صحيحة");
    return { ok: true };
  }
  const { error } = await supabase.rpc("change_site_admin_password", {
    _current_password: String(body.password ?? ""),
    _new_password: String(body.newPassword ?? ""),
  });
  if (error) {
    if (error.code === "42501") throw new Error("كلمة المرور الحالية غير صحيحة");
    throw new Error("تعذّر تغيير كلمة المرور في قاعدة البيانات");
  }
  return { ok: true, message: "تم تغيير كلمة المرور لجميع الأجهزة" };
}

export default function AdminPanelGate() {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [sessionPassword, setSessionPassword] = useState("");

  useEffect(() => {
    setUnlocked(window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "1");
    setReady(true);
  }, []);

  const login = async () => {
    const password = window.prompt("أدخل كلمة مرور لوحة التحكم");
    if (password === null) return;
    try {
      await callAdminApi({ action: "verify", password });
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      window.alert(message || "كلمة المرور غير صحيحة");
      return;
    }
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
    setSessionPassword(password);
    setUnlocked(true);
  };

  const logout = () => {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setSessionPassword("");
    setUnlocked(false);
  };

  const changePassword = async () => {
    const current = sessionPassword || window.prompt("أدخل كلمة المرور الحالية") || "";
    if (!current) return;
    const password = window.prompt("أدخل كلمة المرور الجديدة");
    if (password === null) return;
    if (password.trim().length < 6) {
      window.alert("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل");
      return;
    }
    try {
      const result = await callAdminApi({
        action: "change-password",
        password: current,
        newPassword: password.trim(),
      });
      setSessionPassword(password.trim());
      window.alert(result.message ?? "تم تغيير كلمة المرور لجميع الأجهزة");
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      window.alert(message || "تعذّر تغيير كلمة المرور");
    }
  };

  if (!ready) return null;

  if (!unlocked) {
    return (
      <main className="grid min-h-screen place-items-center bg-secondary/30 px-4" dir="rtl">
        <section className="w-full max-w-sm rounded-2xl border border-border bg-card p-7 text-center shadow-sm">
          <img src="/logo.png" alt="شعار تطبيق لمحة" className="mx-auto h-24 w-auto object-contain" />
          <h1 className="mt-4 font-display text-xl">لوحة تحكم الموقع</h1>
          <button type="button" onClick={login} className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">
            تسجيل الدخول
          </button>
        </section>
      </main>
    );
  }

  return <AdminWorkspace sessionPassword={sessionPassword} onLogout={logout} onChangePassword={changePassword} />;
}