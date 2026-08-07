import { useEffect, useRef, useState } from "react";
import { Download, ExternalLink, LogOut, RotateCcw, Save, Upload } from "lucide-react";
import { NodeEditor } from "@/components/ContentEditor";
import { defaultContent, type SiteContent } from "@/content/defaults";
import { useContentCtx } from "@/content/store";

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

export default function AdminWorkspace({
  onLogout,
  onChangePassword,
}: {
  onLogout: () => void;
  onChangePassword: () => void;
}) {
  return <Panel onLogout={onLogout} onChangePassword={onChangePassword} />;
}

function Panel({ onLogout, onChangePassword }: { onLogout: () => void; onChangePassword: () => void }) {
  const { content, setContent, resetContent } = useContentCtx();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [active, setActive] = useState<keyof SiteContent>("brand");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [restoreVersion, setRestoreVersion] = useState(0);
  const draftRef = useRef<SiteContent>(content);
  const dirtyRef = useRef(false);
  const touchedRef = useRef(false);

  const markDirty = () => {
    dirtyRef.current = true;
    touchedRef.current = true;
    setDirty(true);
  };

  // Adopt late-arriving content (local restore / content.json) only while untouched,
  // so background loads can never wipe what the admin is editing.
  useEffect(() => {
    if (dirtyRef.current || touchedRef.current) return;
    draftRef.current = content;
    setDraft(content);
    setRestoreVersion((version) => version + 1);
  }, [content]);

  const save = () => {
    // Commit the currently focused uncontrolled field before persisting.
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    setSaving(true);
    window.setTimeout(() => {
      void setContent(draftRef.current)
        .then(() => {
          setSaved(true);
          dirtyRef.current = false;
          setDirty(false);
          window.setTimeout(() => setSaved(false), 2200);
        })
        .catch(() => window.alert("تعذّر الحفظ. تأكد من توفر مساحة تخزين في المتصفح."))
        .finally(() => setSaving(false));
    }, 0);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draftRef.current, null, 2)], { type: "application/json" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "content.json";
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  };

  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(String(reader.result)) as SiteContent;
        draftRef.current = imported;
        setDraft(imported);
        markDirty();
      } catch {
        window.alert("ملف غير صالح");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-secondary/30 text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3">
          <h1 className="ml-auto font-display text-lg">لوحة تحكم الموقع</h1>
          <a href="/" className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-bold">
            <ExternalLink className="size-4" /> عرض الموقع
          </a>
          <button type="button" onClick={exportJson} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-2 text-xs font-bold text-primary">
            <Download className="size-4" /> نشر (تنزيل content.json)
          </button>
          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-bold">
            <Upload className="size-4" /> استيراد
            <input type="file" accept="application/json" hidden onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) importJson(file);
            }} />
          </label>
          <button type="button" onClick={() => {
            if (window.confirm("استعادة المحتوى الأصلي وحذف تعديلاتك المحلية؟")) {
              void resetContent().then(() => {
                setDraft(defaultContent);
                draftRef.current = defaultContent;
                dirtyRef.current = false;
                touchedRef.current = false;
                setDirty(false);
              });
            }
          }} className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-2 text-xs font-bold text-destructive">
            <RotateCcw className="size-4" /> استعادة الأصلي
          </button>
          <button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50">
            <Save className="size-4" /> {saving ? "جارٍ الحفظ…" : saved ? "تم الحفظ ✓" : "حفظ"}
          </button>
          <button type="button" onClick={onLogout} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-bold">
            <LogOut className="size-4" /> تسجيل الخروج
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-6 md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="h-max rounded-3xl bg-card p-2 shadow-sm md:sticky md:top-24">
          <nav className="flex flex-wrap gap-1 md:flex-col">
            {SECTIONS.map((section) => (
              <button key={section.key} type="button" onClick={() => setActive(section.key)} className={`rounded-xl px-3 py-2.5 text-right text-sm font-bold transition-colors ${active === section.key ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 space-y-4" translate="no">
          <div className="rounded-3xl bg-card p-4 shadow-sm sm:p-5">
            <NodeEditor key={`${active}-${restoreVersion}`} path={String(active)} keyName={String(active)} value={draft[active]} onChange={(value) => {
              const next = { ...draftRef.current, [active]: value } as SiteContent;
              draftRef.current = next;
              setDraft(next);
              markDirty();
            }} />
          </div>



          <div className="rounded-3xl bg-card p-5 text-sm shadow-sm">
            <h2 className="font-display text-base">النشر على السيرفر</h2>
            <ol className="mt-3 list-decimal space-y-1.5 pr-5 text-muted-foreground">
              <li>عدّل ما تريد ثم اضغط «حفظ» — التعديل يظهر فورًا في هذا المتصفح دون إعادة تحميل.</li>
              <li>اضغط «تصدير content.json» لتنزيل ملف المحتوى.</li>
              <li>ارفع الملف داخل مجلد public_html بجانب index.html ليظهر للجميع.</li>
            </ol>
            <div className="mt-5 border-t border-border/60 pt-4">
              <button type="button" onClick={onChangePassword} className="rounded-full bg-secondary px-4 py-2 text-xs font-bold">
                تغيير كلمة مرور اللوحة
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}