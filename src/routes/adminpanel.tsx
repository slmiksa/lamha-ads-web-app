import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { defaultContent, type SiteContent } from "@/content/defaults";
import { useContentCtx } from "@/content/store";
import { NodeEditor } from "@/components/ContentEditor";
import { Download, RotateCcw, Save, Upload, ExternalLink, Lock } from "lucide-react";

export const Route = createFileRoute("/adminpanel")({
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

const SECTIONS: { key: keyof SiteContent; label: string }[] = [
  { key: "brand", label: "الهوية والشعار" },
  { key: "contact", label: "التواصل والمتاجر" },
  { key: "assistant", label: "التميمة والدعم" },
  { key: "nav", label: "القائمة العلوية" },
  { key: "home", label: "الصفحة الرئيسية" },
  { key: "partners", label: "شركاء النجاح" },
  { key: "support", label: "الدعم الفني" },
  { key: "privacy", label: "السياسات" },
  { key: "footer", label: "التذييل" },
];

function AdminPanel() {
  const [authed, setAuthed] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem(PASS_KEY) === "1",
  );
  if (!authed) return <Gate onOk={() => setAuthed(true)} />;
  return <Panel />;
}

function Gate({ onOk }: { onOk: () => void }) {
  const [v, setV] = useState("");
  const [err, setErr] = useState(false);
  return (
    <div className="grid min-h-screen place-items-center bg-secondary/40 px-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const stored = window.localStorage.getItem("lamha_admin_pass") ?? DEFAULT_PASSWORD;
          if (v === stored) {
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
          type="password"
          value={v}
          onChange={(e) => {
            setV(e.target.value);
            setErr(false);
          }}
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

function Panel() {
  const { content, setContent, resetContent } = useContentCtx();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [active, setActive] = useState<keyof SiteContent>("brand");
  const [saved, setSaved] = useState(false);
  const [newPass, setNewPass] = useState("");

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(content), [draft, content]);

  const save = () => {
    setContent(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importJson = (file: File) => {
    const r = new FileReader();
    r.onload = () => {
      try {
        setDraft(JSON.parse(String(r.result)) as SiteContent);
      } catch {
        alert("ملف غير صالح");
      }
    };
    r.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-secondary/30 text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3">
          <h1 className="ml-auto font-display text-lg">لوحة تحكم الموقع</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-bold"
          >
            <ExternalLink className="size-4" /> عرض الموقع
          </Link>
          <button
            type="button"
            onClick={exportJson}
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-bold"
          >
            <Download className="size-4" /> تصدير content.json
          </button>
          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-bold">
            <Upload className="size-4" /> استيراد
            <input
              type="file"
              accept="application/json"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) importJson(f);
              }}
            />
          </label>
          <button
            type="button"
            onClick={() => {
              if (confirm("استعادة المحتوى الأصلي وحذف تعديلاتك المحلية؟")) {
                resetContent();
                setDraft(defaultContent);
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-2 text-xs font-bold text-destructive"
          >
            <RotateCcw className="size-4" /> استعادة الأصلي
          </button>
          <button
            type="button"
            onClick={save}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50"
            disabled={!dirty}
          >
            <Save className="size-4" /> {saved ? "تم الحفظ ✓" : "حفظ"}
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-6 md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="h-max rounded-3xl bg-card p-2 shadow-sm md:sticky md:top-24">
          <nav className="flex flex-wrap gap-1 md:flex-col">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setActive(s.key)}
                className={`rounded-xl px-3 py-2.5 text-right text-sm font-bold transition-colors ${
                  active === s.key ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="space-y-4">
          <div className="rounded-3xl bg-card p-4 shadow-sm sm:p-5">
            <NodeEditor
              path={String(active)}
              keyName={String(active)}
              value={draft[active]}
              onChange={(v) => setDraft({ ...draft, [active]: v } as SiteContent)}
            />
          </div>

          <div className="rounded-3xl bg-card p-5 text-sm shadow-sm">
            <h2 className="font-display text-base">النشر على السيرفر</h2>
            <ol className="mt-3 list-decimal space-y-1.5 pr-5 text-muted-foreground">
              <li>عدّل ما تريد ثم اضغط «حفظ» — التعديل يظهر مباشرة في متصفحك.</li>
              <li>اضغط «تصدير content.json» لتنزيل ملف المحتوى.</li>
              <li>ارفع الملف داخل مجلد public_html بجانب index.html ليظهر للجميع.</li>
            </ol>

            <div className="mt-5 flex flex-wrap items-end gap-2 border-t border-border/60 pt-4">
              <label className="flex-1">
                <span className="mb-1 block text-xs font-bold text-muted-foreground">
                  تغيير كلمة مرور اللوحة
                </span>
                <input
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  placeholder="كلمة مرور جديدة"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  if (!newPass.trim()) return;
                  window.localStorage.setItem("lamha_admin_pass", newPass.trim());
                  setNewPass("");
                  alert("تم تغيير كلمة المرور");
                }}
                className="rounded-full bg-secondary px-4 py-2 text-xs font-bold"
              >
                حفظ الكلمة
              </button>
              <button
                type="button"
                onClick={() => {
                  window.localStorage.removeItem(PASS_KEY);
                  window.location.reload();
                }}
                className="rounded-full bg-secondary px-4 py-2 text-xs font-bold"
              >
                خروج
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
