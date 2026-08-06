import { memo, useRef, useState } from "react";
import { ChevronDown, Plus, Trash2, ArrowUp, ArrowDown, Upload } from "lucide-react";
import { ICON_NAMES } from "@/content/icons";

const LABELS: Record<string, string> = {
  brand: "الهوية والشعار",
  contact: "بيانات التواصل والمتاجر",
  assistant: "التميمة / زر الدعم العائم",
  nav: "القائمة العلوية",
  footer: "التذييل",
  home: "الصفحة الرئيسية",
  partners: "صفحة شركاء النجاح",
  support: "صفحة الدعم الفني",
  privacy: "صفحة السياسات",
  seo: "بيانات محركات البحث",
  hero: "القسم الرئيسي (الهيرو)",
  services: "خدماتنا",
  features: "المميزات",
  influencer: "دعم المشاهير",
  media: "البودكاست والتغطيات",
  steps: "خطوات العمل",
  packages: "الباقات",
  coverage: "التغطية والخريطة",
  download: "قسم التحميل",
  siteName: "اسم الموقع",
  logo: "الشعار",
  favicon: "أيقونة الموقع (Favicon)",
  ogImage: "صورة المشاركة (سوشال ميديا)",
  logoSizeNav: "حجم الشعار في الهيدر",
  logoSizeHeader: "حجم الشعار في الصفحات الداخلية",
  logoSizeFooter: "حجم الشعار في التذييل",
  whatsapp: "رقم واتساب",
  whatsappDisplay: "الرقم الظاهر",
  whatsappButtonLabel: "نص زر الواتساب",
  email: "البريد الإلكتروني",
  appStoreUrl: "رابط App Store",
  playStoreUrl: "رابط Google Play",
  playStoreSoonLabel: "نص قريباً",
  enabled: "مُفعّل",
  image: "الصورة",
  img: "الصورة",
  src: "الصورة",
  title: "العنوان",
  titleA: "العنوان (الجزء الأول)",
  titleB: "العنوان (الجزء الملوّن)",
  subtitle: "العنوان الفرعي",
  text: "النص",
  desc: "الوصف",
  description: "الوصف",
  ogTitle: "عنوان المشاركة",
  ogDescription: "وصف المشاركة",
  buttonLabel: "نص الزر",
  label: "النص",
  href: "الرابط",
  links: "الروابط",
  partnersLabel: "نص شركاء النجاح",
  supportLabel: "نص الدعم الفني",
  privacyLabel: "نص سياسة الخصوصية",
  ctaLabel: "نص زر الإجراء",
  homeLabel: "نص الرئيسية",
  whatsappLabel: "نص واتساب",
  copyright: "حقوق النشر",
  madeIn: "سطر صنع في",
  badge: "الشارة",
  chips: "الوسوم",
  trust1: "عبارة الثقة ١",
  trust2: "عبارة الثقة ٢",
  shots: "لقطات الجوال (السلايدر)",
  slideMs: "مدة السلايد (ملي ثانية)",
  alt: "وصف الصورة",
  topIcon: "أيقونة البطاقة العلوية",
  topLabel: "نص البطاقة العلوية",
  topValue: "قيمة البطاقة العلوية",
  bottomIcon: "أيقونة البطاقة السفلية",
  bottomLabel: "نص البطاقة السفلية",
  bottomValue: "قيمة البطاقة السفلية",
  kicker: "العنوان الصغير",
  stats: "الأرقام",
  cards: "البطاقات",
  items: "العناصر",
  value: "القيمة",
  icon: "الأيقونة",
  bullets: "النقاط",
  cardBadge: "شارة البطاقة",
  cardLabel: "عنوان البطاقة",
  ads: "الإعلانات التجريبية",
  name: "الاسم",
  cat: "التصنيف",
  city: "المدينة",
  views: "المشاهدات",
  likes: "الإعجابات",
  n: "الرقم",
  note: "الملاحظة",
  gold: "تمييز ذهبي",
  pins: "مواقع الخريطة",
  x: "الموضع الأفقي %",
  y: "الموضع الرأسي %",
  headerTitle: "عنوان الصفحة",
  lines: "الأسطر",
  ctaTitle: "عنوان دعوة الإجراء",
  ctaDesc: "وصف دعوة الإجراء",
  intro: "مقدمة",
  channels: "قنوات التواصل",
  downloadTitle: "عنوان التحميل",
  downloadDesc: "وصف التحميل",
  faqTitle: "عنوان الأسئلة",
  faqs: "الأسئلة المتكررة",
  mediaTitle: "عنوان قسم الإعلام",
  mediaFaqs: "أسئلة البودكاست والتغطيات",
  q: "السؤال",
  a: "الإجابة",
  ar: "النص العربي",
  en: "النص الإنجليزي",
  paras: "الفقرات",
  list: "القائمة",
};

const IMAGE_KEYS = new Set(["logo", "favicon", "ogImage", "image", "img", "src"]);
const LONG_KEYS = new Set(["desc", "description", "a", "text", "subtitle", "intro", "ogDescription", "note", "lines", "paras", "list", "bullets"]);
const MAX_IMAGE_DIMENSION = 1280;
const MAX_IMAGE_FILE_BYTES = 8_000_000;

const SAFE_FIELD_PROPS = {
  autoComplete: "off",
  spellCheck: false,
  translate: "no" as const,
  "data-lpignore": "true",
  "data-1p-ignore": "true",
  "data-form-type": "other",
};

function label(key: string) {
  return LABELS[key] ?? key;
}

function blankLike(sample: unknown): unknown {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return sample.length ? [blankLike(sample[0])] : [];
  if (sample && typeof sample === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(sample)) out[k] = blankLike(v);
    return out;
  }
  return "";
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > MAX_IMAGE_FILE_BYTES) {
      reject(new Error("الصورة كبيرة جدًا. الحد الأقصى 8 ميجابايت."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("تعذر قراءة الصورة."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("صيغة الصورة غير مدعومة."));
      image.onload = () => {
        const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("تعذر تجهيز الصورة."));
          return;
        }
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/webp", 0.72));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

function ImageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      {value && (
        <img
          src={value}
          alt=""
          className="size-16 shrink-0 rounded-xl border border-border object-contain"
        />
      )}
      <input
        {...SAFE_FIELD_PROPS}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir="ltr"
        placeholder="/logo.png"
        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
      />
      <input
        {...SAFE_FIELD_PROPS}
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          setProcessing(true);
          setError("");
          try {
            onChange(await compressImage(f));
          } catch (reason) {
            setError(reason instanceof Error ? reason.message : "تعذر ضغط الصورة.");
          } finally {
            setProcessing(false);
            e.target.value = "";
          }
        }}
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={processing}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-secondary px-3 py-2 text-xs font-bold"
      >
        <Upload className="size-4" /> {processing ? "جارٍ الضغط…" : "رفع صورة"}
      </button>
      </div>
      {error && <p className="text-xs font-bold text-destructive">{error}</p>}
    </div>
  );
}

/**
 * Uncontrolled fields keep typing entirely inside the browser. Updating the
 * recursive content tree on each keypress was rebuilding hundreds of editor
 * nodes and could make mobile browsers and translation extensions lock up.
 */
function BufferedText({
  value,
  onCommit,
  long,
  rows,
}: {
  value: string;
  onCommit: (v: string) => void;
  long: boolean;
  rows: number;
}) {
  const cls = "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm";
  const commit = (next: string) => {
    if (next !== value) onCommit(next);
  };
  return long ? (
    <textarea
      {...SAFE_FIELD_PROPS}
      defaultValue={value}
      rows={rows}
      onBlur={(e) => commit(e.currentTarget.value)}
      className={`${cls} leading-7`}
    />
  ) : (
    <input
      {...SAFE_FIELD_PROPS}
      defaultValue={value}
      onBlur={(e) => commit(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
      }}
      className={cls}
    />
  );
}

export const NodeEditor = memo(function NodeEditor({
  path,
  keyName,
  value,
  onChange,
}: {
  path: string;
  keyName: string;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 py-2 text-sm font-bold">
        <input
          {...SAFE_FIELD_PROPS}
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="size-4"
        />
        {label(keyName)}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <Field name={keyName}>
        <input
          {...SAFE_FIELD_PROPS}
          type="number"
          step="any"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
        />
      </Field>
    );
  }

  if (typeof value === "string") {
    if (IMAGE_KEYS.has(keyName)) {
      return (
        <Field name={keyName}>
          <ImageField value={value} onChange={onChange} />
        </Field>
      );
    }
    if (keyName === "icon") {
      return (
        <Field name={keyName}>
          <select
            {...SAFE_FIELD_PROPS}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
          >
            {[...new Set([value, ...ICON_NAMES])].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>
      );
    }
    const long = LONG_KEYS.has(keyName) || value.length > 90;
    return (
      <Field name={keyName}>
        <BufferedText
          value={value}
          onCommit={onChange}
          long={long}
          rows={Math.min(10, Math.max(2, Math.ceil(value.length / 70)))}
        />
      </Field>
    );
  }

  if (Array.isArray(value)) {
    const move = (i: number, d: number) => {
      const next = [...value];
      const j = i + d;
      if (j < 0 || j >= next.length) return;
      [next[i], next[j]] = [next[j], next[i]];
      onChange(next);
    };
    return (
      <div className="rounded-2xl border border-border/70 p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-extrabold">
            {label(keyName)} <span className="text-muted-foreground">({value.length})</span>
          </span>
          <button
            type="button"
            onClick={() => onChange([...value, blankLike(value[0] ?? "")])}
            className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground"
          >
            <Plus className="size-3.5" /> إضافة
          </button>
        </div>
        <div className="space-y-3">
          {value.map((item, i) => (
            <ArrayItem
              key={`${path}-${i}`}
              number={i + 1}
              onUp={() => move(i, -1)}
              onDown={() => move(i, 1)}
              onDelete={() => onChange(value.filter((_, j) => j !== i))}
            >
              {typeof item === "object" && item !== null && !Array.isArray(item) ? (
                <div className="space-y-3">
                  {Object.entries(item as Record<string, unknown>).map(([k, v]) => (
                    <NodeEditor
                      key={k}
                      path={`${path}.${i}.${k}`}
                      keyName={k}
                      value={v}
                      onChange={(nv) => {
                        const next = [...value];
                        next[i] = { ...(item as Record<string, unknown>), [k]: nv };
                        onChange(next);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <NodeEditor
                  path={`${path}.${i}`}
                  keyName={keyName === "lines" || keyName === "paras" || keyName === "list" ? "text" : "label"}
                  value={item}
                  onChange={(nv) => {
                    const next = [...value];
                    next[i] = nv;
                    onChange(next);
                  }}
                />
              )}
            </ArrayItem>
          ))}
        </div>
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <Collapsible title={label(keyName)} initiallyOpen={!path.includes(".")}>
        <div className="space-y-3">
          {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
            <NodeEditor
              key={k}
              path={`${path}.${k}`}
              keyName={k}
              value={v}
              onChange={(nv) => onChange({ ...(value as Record<string, unknown>), [k]: nv })}
            />
          ))}
        </div>
      </Collapsible>
    );
  }

  return null;
});

function ArrayItem({
  number,
  onUp,
  onDown,
  onDelete,
  children,
}: {
  number: number;
  onUp: () => void;
  onDown: () => void;
  onDelete: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-secondary/50 p-3">
      <div className={`flex items-center justify-between gap-2 ${open ? "mb-3" : ""}`}>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex min-w-0 flex-1 items-center gap-2 text-right text-xs font-bold text-muted-foreground"
          aria-expanded={open}
        >
          <ChevronDown className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
          العنصر #{number}
        </button>
        <div className="flex items-center gap-1">
          <IconBtn onClick={onUp} title="أعلى">
            <ArrowUp className="size-3.5" />
          </IconBtn>
          <IconBtn onClick={onDown} title="أسفل">
            <ArrowDown className="size-3.5" />
          </IconBtn>
          <IconBtn danger title="حذف" onClick={onDelete}>
            <Trash2 className="size-3.5" />
          </IconBtn>
        </div>
      </div>
      {open ? children : null}
    </div>
  );
}

function Field({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-muted-foreground">{label(name)}</span>
      {children}
    </label>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`grid size-7 place-items-center rounded-lg ${
        danger ? "bg-destructive/10 text-destructive" : "bg-card text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Collapsible({
  title,
  children,
  initiallyOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
}) {
  const [open, setOpen] = useState(initiallyOpen);
  return (
    <div className="rounded-2xl border border-border/70">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-sm font-extrabold"
      >
        {title}
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="space-y-3 border-t border-border/60 p-3">{children}</div>}
    </div>
  );
}
