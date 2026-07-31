import { createFileRoute } from "@tanstack/react-router";
import heroShot from "@/assets/IMG_2764.webp.asset.json";
import {
  Megaphone,
  MapPin,
  Video,
  Ticket,
  QrCode,
  Bell,
  Star,
  Mic,
  Trophy,
  Store,
  Sparkles,
  ArrowLeft,
  Apple,
  Play,
  ShieldCheck,
  Heart,
  Eye,
} from "lucide-react";

const APP_STORE_URL = "https://lamha.trndsky.com";
const PLAY_STORE_URL = "https://lamha.trndsky.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "تطبيق لمحة — إعلانات المتاجر والإعلانات الشخصية في مكان واحد" },
      {
        name: "description",
        content:
          "لمحة هو التطبيق الأول في السعودية والشرق الأوسط الذي يجمع العميل بإعلانات المتاجر والإعلانات الشخصية بالصور والفيديو والموقع، مع أكواد خصم حصرية ودعم المشاهير. حمّل الآن.",
      },
      { property: "og:title", content: "تطبيق لمحة — إعلاناتك توصل لكل عميل" },
      {
        property: "og:description",
        content:
          "إعلانات المتاجر والإعلانات الشخصية بالصور والفيديو والموقع، أكواد خصم حصرية، بودكاست وتغطيات ومسابقات، ودعم إعلانك عبر شخصية مشهورة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: Megaphone,
    title: "إعلانات متاجر وإعلانات شخصية",
    desc: "منصة واحدة تجمع إعلانات المتاجر والخدمات مع الإعلانات الشخصية بكل تفاصيلها.",
  },
  {
    icon: Video,
    title: "صور وفيديوهات للإعلان",
    desc: "اعرض منتجك بالصور ومقاطع فيديو تصل لآلاف المتصفحين في قسم المعرض.",
  },
  {
    icon: MapPin,
    title: "موقع الإعلان على الخريطة",
    desc: "حدّد موقعك بدقة على الخريطة ليصل العميل إليك مباشرة بدون عناء.",
  },
  {
    icon: Ticket,
    title: "أكواد خصم حصرية",
    desc: "لكل متجر أكواد خصم حصرية داخل التطبيق تزيد مبيعاتك وترضي عملاءك.",
  },
  {
    icon: QrCode,
    title: "نظام مسح الأكواد",
    desc: "امسح الكود واستفد من العرض فوراً — تجربة سريعة وآمنة داخل المتجر.",
  },
  {
    icon: Bell,
    title: "إعلانات عبر الإشعارات",
    desc: "وصول مباشر لجمهورك عبر الإشعارات والإعلانات المميزة في الواجهة.",
  },
];

const contentCards = [
  { icon: Mic, title: "بودكاست ولقاءات", desc: "حوارات مطوّلة مع صنّاع الفكرة وأصحاب المشاريع." },
  { icon: Video, title: "تغطيات لمحة", desc: "تغطية مباشرة لأبرز الفعاليات والمناسبات في مدينتك." },
  { icon: Trophy, title: "مسابقات وجوائز", desc: "مسابقات دورية تزيد التفاعل وتقرّبك من الجمهور." },
];

const steps = [
  { n: "١", title: "حمّل التطبيق", desc: "متوفر على آيفون وأندرويد مجاناً." },
  { n: "٢", title: "اختر باقتك", desc: "دعوات زواج، إعلانات عامة، تجارية، عقارية، أو أسر منتجة." },
  { n: "٣", title: "أضف تفاصيلك", desc: "الاسم، الوصف، رقم التواصل، الموقع، الصور والفيديو." },
  { n: "٤", title: "انشر ووصّل", desc: "إعلانك يظهر لعملاء منطقتك — ويمكن دعمه عبر شخصية مشهورة." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Influencer />
      <Content />
      <Steps />
      <Packages />
      <Download />
      <Footer />
    </div>
  );
}

function StoreButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={APP_STORE_URL}
        className="glow inline-flex items-center gap-3 rounded-2xl bg-brand px-6 py-3.5 text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        <Apple className="size-6" />
        <span className="text-right leading-tight">
          <span className="block text-[11px] opacity-80">حمّل من</span>
          <span className="block text-base font-bold">App Store</span>
        </span>
      </a>
      <a
        href={PLAY_STORE_URL}
        className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-6 py-3.5 text-foreground transition-colors hover:bg-accent"
      >
        <Play className="size-6 text-primary" />
        <span className="text-right leading-tight">
          <span className="block text-[11px] text-muted-foreground">حمّل من</span>
          <span className="block text-base font-bold">Google Play</span>
        </span>
      </a>
      {!compact && (
        <span className="text-sm text-muted-foreground">مجاناً — بدون رسوم اشتراك</span>
      )}
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-brand text-primary-foreground">
            <Sparkles className="size-5" />
          </span>
          <span className="font-display text-xl font-extrabold">لمحة</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a className="transition-colors hover:text-foreground" href="#features">المميزات</a>
          <a className="transition-colors hover:text-foreground" href="#influencer">دعم المشاهير</a>
          <a className="transition-colors hover:text-foreground" href="#steps">كيف يعمل</a>
          <a className="transition-colors hover:text-foreground" href="#packages">الباقات</a>
        </nav>
        <a
          href="#download"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          تحميل التطبيق
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="bg-hero-glow relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
            <Star className="size-3.5" /> الأول في السعودية والشرق الأوسط
          </span>
          <h1 className="mt-6 font-display text-4xl leading-[1.15] md:text-6xl">
            كل إعلان يهمك… <span className="text-gradient-brand">في لمحة</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            تطبيق لمحة يجمع بين العميل وإعلانات المتاجر والإعلانات الشخصية بكامل تفاصيلها: صور
            وفيديوهات، موقع الإعلان على الخريطة، ووسائل تواصل مباشرة — مع أكواد خصم حصرية لكل متجر.
          </p>
          <div className="mt-8">
            <StoreButtons />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" /> إعلانات موثقة ومراجعة
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> تغطية لكل مدن المملكة
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[330px]">
          <div className="absolute -inset-10 -z-10 rounded-full bg-primary/20 blur-3xl" />
          <PhoneFrame>
            <img
              src={heroShot.url}
              alt="واجهة تطبيق لمحة تعرض الإعلانات المميزة والتغطيات"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="glow rounded-[2.75rem] border border-border bg-card p-2.5">
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.25rem] bg-background">
        <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-background/90" />
        {children}
      </div>
    </div>
  );
}

function Stats() {
  const items = [
    { v: "+٢٠", l: "تصنيف ونشاط" },
    { v: "١٠٠٪", l: "إعلانات بالتفاصيل الكاملة" },
    { v: "٢٤/٧", l: "نشر ومتابعة إعلانك" },
    { v: "مجاناً", l: "باقة إعلانات عامة" },
  ];
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.l} className="text-center">
            <div className="font-display text-2xl font-extrabold text-primary md:text-3xl">{i.v}</div>
            <div className="mt-1 text-sm text-muted-foreground">{i.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-sm font-bold text-primary">{kicker}</span>
      <h2 className="mt-2 font-display text-3xl md:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-20">
      <SectionTitle
        kicker="المميزات"
        title="كل ما يحتاجه إعلانك… وكل ما يبحث عنه عميلك"
        desc="تجربة إعلانية متكاملة من النشر حتى وصول العميل إلى باب متجرك."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {features.map((f) => (
          <article key={f.title} className="surface-card group p-6 transition-transform hover:-translate-y-1">
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <f.icon className="size-6" />
            </span>
            <h3 className="mt-5 text-lg">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Influencer() {
  return (
    <section id="influencer" className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-grad px-4 py-1.5 text-xs font-bold text-primary-foreground">
            <Sparkles className="size-3.5" /> ميزة جوهرية
          </span>
          <h2 className="mt-5 font-display text-3xl md:text-4xl">
            دع <span className="text-gradient-brand">شخصية مشهورة</span> تدعم إعلانك
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            اختر شخصية مؤثرة في منطقتك أثناء نشر إعلانك، ليظهر إعلانك داخل التطبيق وأيضاً لدى
            المشهور المختار. وصول أوسع، ثقة أكبر، ونتائج أسرع لإعلانك.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "قائمة شخصيات موثقة يمكنك تصفحها قبل الاختيار",
              "انتشار إعلانك في نطاق جمهور المؤثر داخل منطقتك",
              "تفاعل أعلى وعملاء أكثر لإعلانك المميز",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Star className="size-3" />
                </span>
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card p-6">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-gold-grad px-3 py-1 text-xs font-bold text-primary-foreground">
              مميز
            </span>
            <span className="text-sm font-bold">إعلان مدعوم</span>
          </div>
          <div className="mt-5 space-y-3">
            {[
              { name: "الأميرة للمناسبات", cat: "لأشهى الأكلات", city: "مركز القوز", v: 40, h: 14 },
              { name: "كوفي كيناف", cat: "قهوة - مشروبات - حلا", city: "مركز القوز", v: 64, h: 20 },
              { name: "سعد للاتصالات", cat: "هواتف وإكسسوارات", city: "محافظة القنفذة", v: 11, h: 12 },
            ].map((a) => (
              <div
                key={a.name}
                className="flex items-center gap-4 rounded-2xl border border-border bg-secondary/60 p-4"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                  <Store className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-bold">{a.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{a.cat}</div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <MapPin className="size-3 text-primary" /> {a.city}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Eye className="size-3.5" /> {a.v}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Heart className="size-3.5" /> {a.h}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Content() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionTitle
        kicker="أكثر من مجرد إعلانات"
        title="بودكاست، تغطيات، ومسابقات"
        desc="محتوى يومي يقرّب المتاجر من عملائها ويجعل التطبيق وجهة يومية."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {contentCards.map((c) => (
          <article key={c.title} className="surface-card overflow-hidden">
            <div className="bg-brand p-8 text-primary-foreground">
              <c.icon className="size-8" />
            </div>
            <div className="p-6">
              <h3 className="text-lg">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section id="steps" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionTitle kicker="كيف يعمل" title="انشر إعلانك في أربع خطوات" />
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="surface-card p-6">
              <span className="grid size-11 place-items-center rounded-2xl bg-brand font-display text-lg font-extrabold text-primary-foreground">
                {s.n}
              </span>
              <h3 className="mt-4 text-base">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Packages() {
  const packs = [
    { name: "اعلانات عامة", price: "٠ ريال", note: "الإعلانات العامة والشخصية", gold: true },
    { name: "دعوات الزواج", price: "١ ريال", note: "بطاقة دعوة زواجك لكل مدينتك" },
    { name: "اعلانات اسر منتجة", price: "١٠٠ ريال", note: "مكانك الحقيقي لأسرتك المنتجة", gold: true },
    { name: "اعلانات تجارية", price: "٤٠٠ ريال", note: "اعرض إعلانك التجاري وتميّز" },
    { name: "اعلانات عقارية", price: "٤٠٠ ريال", note: "عقارك - استراحتك - شقتك" },
  ];
  return (
    <section id="packages" className="mx-auto max-w-6xl px-5 py-20">
      <SectionTitle
        kicker="الباقات"
        title="باقة تناسب كل إعلان"
        desc="أسعار الباقات لمدة ٣٠ يوم — والإعلان المميز إضافة ٥٠ ريال."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {packs.map((p) => (
          <article
            key={p.name}
            className={`surface-card p-6 ${p.gold ? "border-gold/40" : ""}`}
            style={p.gold ? { borderColor: "color-mix(in oklab, var(--gold) 45%, transparent)" } : undefined}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
              </div>
              <span
                className={`shrink-0 font-display text-xl font-extrabold ${p.gold ? "text-gold" : "text-primary"}`}
              >
                {p.price}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-gold" /> الإعلان المميز: +٥٠ ريال
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Download() {
  return (
    <section id="download" className="bg-hero-glow border-t border-border">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center">
        <h2 className="font-display text-3xl md:text-5xl">حمّل لمحة الآن وابدأ البيع اليوم</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          إعلانك يوصل لآلاف العملاء في منطقتك، وعميلك يلقى كل التفاصيل وأكواد الخصم في مكان واحد.
        </p>
        <div className="mt-8 flex justify-center">
          <StoreButtons compact />
        </div>
        <a
          href={APP_STORE_URL}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
        >
          تعرف أكثر على التطبيق <ArrowLeft className="size-4" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-brand text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <span className="font-display font-extrabold text-foreground">لمحة</span>
        </div>
        <p>جميع الحقوق محفوظة © {new Date().getFullYear()} تطبيق لمحة</p>
      </div>
    </footer>
  );
}
