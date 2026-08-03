import { createFileRoute } from "@tanstack/react-router";
import heroShot from "@/assets/IMG_2764.webp.asset.json";
import { SaudiDotMap } from "@/components/SaudiDotMap";
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
  Zap,
  Users,
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

const chips = ["🏪 متاجر", "💍 دعوات زواج", "🏠 عقارات", "🎁 أكواد خصم"];

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
      <Services />
      <Features />
      <Influencer />
      <Content />
      <Steps />
      <Packages />
      <Coverage />
      <Download />
      <Footer />
    </div>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path fill="#00A0FF" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" />
      <path fill="#00E676" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" />
      <path fill="#FFC107" d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z" />
      <path fill="#FF3D00" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function StoreButtons({ center = false }: { center?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${center ? "justify-center" : ""}`} dir="ltr">
      <a
        href={PLAY_STORE_URL}
        aria-label="حمّل تطبيق لمحة من Google Play"
        className="inline-flex items-center gap-3 rounded-2xl border border-foreground/15 bg-foreground px-5 py-2.5 text-background transition-transform hover:-translate-y-0.5"
      >
        <GooglePlayIcon className="size-7" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] uppercase tracking-wide opacity-80">GET IT ON</span>
          <span className="block text-lg font-semibold leading-tight">Google Play</span>
        </span>
      </a>
      <a
        href={APP_STORE_URL}
        aria-label="حمّل تطبيق لمحة من App Store"
        className="inline-flex items-center gap-3 rounded-2xl border border-foreground/15 bg-foreground px-5 py-2.5 text-background transition-transform hover:-translate-y-0.5"
      >
        <AppleIcon className="size-7" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] opacity-80">Download on the</span>
          <span className="block text-lg font-semibold leading-tight">App Store</span>
        </span>
      </a>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-brand text-primary-foreground">
            <Sparkles className="size-5" />
          </span>
          <span className="font-display text-xl font-extrabold">لمحة</span>
        </a>
        <nav className="hidden items-center gap-2 rounded-full bg-secondary p-1.5 text-sm text-muted-foreground md:flex">
          {[
            { l: "المميزات", h: "#features" },
            { l: "دعم المشاهير", h: "#influencer" },
            { l: "كيف يعمل", h: "#steps" },
            { l: "الباقات", h: "#packages" },
          ].map((i) => (
            <a
              key={i.h}
              href={i.h}
              className="rounded-full px-4 py-1.5 transition-colors hover:bg-card hover:text-foreground"
            >
              {i.l}
            </a>
          ))}
        </nav>
        <a
          href="#download"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
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
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-12 md:grid-cols-2 md:pb-32 md:pt-16">
        <div className="order-2 md:order-1">
          <div className="relative mx-auto w-full max-w-[320px]">
            <PhoneFrame>
              <img
                src={heroShot.url}
                alt="واجهة تطبيق لمحة تعرض الإعلانات المميزة والتغطيات"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </PhoneFrame>

            <div className="float-card absolute -right-6 top-16 flex items-center gap-3 px-4 py-3 md:-right-14">
              <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-2xl">🛍️</span>
              <span className="text-right leading-tight">
                <span className="block text-[11px] text-muted-foreground">إعلانك وصل</span>
                <span className="block text-sm font-extrabold">+١٢٠٠ مشاهدة</span>
              </span>
            </div>

            <div className="float-card absolute -left-6 bottom-20 flex items-center gap-3 px-4 py-3 md:-left-14">
              <span className="grid size-10 place-items-center rounded-xl bg-gold-grad text-lg">⭐</span>
              <span className="text-right leading-tight">
                <span className="block text-[11px] text-muted-foreground">دعم مشهور</span>
                <span className="block text-sm font-extrabold">انتشار أوسع</span>
              </span>
            </div>
          </div>
        </div>

        <div className="order-1 text-center md:order-2 md:text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-1.5 text-xs font-bold text-primary shadow-sm">
            <span className="size-2 rounded-full bg-primary" /> الأول في السعودية والشرق الأوسط
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.1] md:text-7xl">
            كل إعلان… <span className="text-gradient-brand">في لمحة!</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
            لمحة.. يجمع عميلك بإعلانك بكل تفاصيله — صور وفيديو وموقع وتواصل مباشر.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full bg-card px-4 py-2 text-sm font-bold shadow-sm"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-8 flex justify-center md:justify-start">
            <StoreButtons />
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground md:justify-start">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" /> إعلانات موثقة ومراجعة
            </span>
            <span className="hidden h-4 w-px bg-border md:block" />
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> تغطية لكل مدن المملكة
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="glow rounded-[2.75rem] border-[6px] border-foreground bg-foreground p-0">
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.25rem] bg-card">
        <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-foreground" />
        {children}
      </div>
    </div>
  );
}

function Services() {
  const items = [
    { v: "+٢٠", l: "تصنيف ونشاط" },
    { v: "١٠٠٪", l: "تفاصيل كاملة للإعلان" },
    { v: "٢٤/٧", l: "نشر ومتابعة" },
    { v: "٠ ريال", l: "باقة إعلانات عامة" },
  ];
  const cards = [
    { icon: Zap, title: "نشر سريع", desc: "أضف إعلانك بدقائق وانشره لعملاء منطقتك." },
    { icon: Users, title: "وصول أوسع", desc: "إعلانك يظهر للعملاء وللمشاهير المختارين." },
    { icon: Ticket, title: "خصومات حصرية", desc: "أكواد خصم لكل متجر مع نظام مسح فوري." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionTitle kicker="خدماتنا" title="كل اللي يحتاجه إعلانك في مكان واحد" />
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.l} className="surface-card px-4 py-7 text-center">
            <div className="font-display text-3xl font-extrabold text-primary">{i.v}</div>
            <div className="mt-1 text-sm text-muted-foreground">{i.l}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <article key={c.title} className="rounded-3xl bg-accent/70 p-7">
            <span className="grid size-12 place-items-center rounded-2xl bg-card text-primary shadow-sm">
              <c.icon className="size-6" />
            </span>
            <h3 className="mt-5 text-lg">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-block rounded-full bg-primary-soft px-4 py-1 text-sm font-bold text-primary">
        {kicker}
      </span>
      <h2 className="mt-4 font-display text-3xl md:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="bg-secondary/60">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionTitle
          kicker="المميزات"
          title="كل ما يحتاجه إعلانك… وكل ما يبحث عنه عميلك"
          desc="تجربة إعلانية متكاملة من النشر حتى وصول العميل إلى باب متجرك."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="surface-card group p-7 transition-transform hover:-translate-y-1"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Influencer() {
  return (
    <section id="influencer" className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid items-center gap-12 md:grid-cols-2">
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
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
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
                className="flex items-center gap-4 rounded-2xl bg-secondary/70 p-4"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
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
    <section className="bg-secondary/60">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionTitle
          kicker="أكثر من مجرد إعلانات"
          title="بودكاست، تغطيات، ومسابقات"
          desc="محتوى يومي يقرّب المتاجر من عملائها ويجعل التطبيق وجهة يومية."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {contentCards.map((c) => (
            <article key={c.title} className="surface-card overflow-hidden">
              <div className="bg-brand p-9 text-primary-foreground">
                <c.icon className="size-8" />
              </div>
              <div className="p-6">
                <h3 className="text-lg">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section id="steps" className="mx-auto max-w-6xl px-5 py-20">
      <SectionTitle kicker="كيف يعمل" title="انشر إعلانك في أربع خطوات" />
      <div className="mt-12 grid gap-5 md:grid-cols-4">
        {steps.map((s) => (
          <div key={s.n} className="rounded-3xl bg-accent/70 p-7">
            <span className="grid size-11 place-items-center rounded-2xl bg-brand font-display text-lg font-extrabold text-primary-foreground">
              {s.n}
            </span>
            <h3 className="mt-4 text-base">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Packages() {
  const packs = [
    { name: "اعلانات عامة", note: "الإعلانات العامة والشخصية", gold: true },
    { name: "دعوات الزواج", note: "بطاقة دعوة زواجك لكل مدينتك" },
    { name: "اعلانات اسر منتجة", note: "مكانك الحقيقي لأسرتك المنتجة", gold: true },
    { name: "اعلانات تجارية", note: "اعرض إعلانك التجاري وتميّز" },
    { name: "اعلانات عقارية", note: "عقارك - استراحتك - شقتك" },
  ];
  return (
    <section id="packages" className="bg-secondary/60">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionTitle
          kicker="الباقات"
          title="باقة تناسب كل إعلان"
          desc="اختر الباقة المناسبة لنوع إعلانك داخل التطبيق."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {packs.map((p) => (
            <article
              key={p.name}
              className="surface-card p-7"
              style={
                p.gold
                  ? { borderColor: "color-mix(in oklab, var(--gold) 55%, transparent)" }
                  : undefined
              }
            >
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <Megaphone className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const coverage = [
  { name: "محافظة القنفذة", x: 30.64, y: 82.44 },
  { name: "مركز القوز - محافظة القنفذة", x: 31.38, y: 79.32 },
  { name: "مركز حلي - محافظة القنفذة", x: 32.48, y: 85.87 },
];

function Coverage() {
  return (
    <section id="coverage" className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative order-2 md:order-1">
          <SaudiDotMap className="w-full text-muted-foreground" />
          {coverage.map((c, i) => (
            <div
              key={c.name}
              className="absolute"
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
            >
              <span className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary p-1.5 ring-4 ring-primary/20" />
              <span
                className="absolute whitespace-nowrap rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground shadow-md"
                style={{
                  transform:
                    i === 0
                      ? "translate(-108%, -180%)"
                      : i === 1
                        ? "translate(14%, -50%)"
                        : "translate(14%, 40%)",
                }}
              >
                {c.name}
              </span>
            </div>
          ))}
        </div>

        <div className="order-1 text-center md:order-2 md:text-right">
          <h2 className="font-display text-3xl md:text-4xl">
            قريباً في جميع مناطق المملكة
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            تطبيق لمحة كأول تطبيق يجمع إعلانات المتاجر والإعلانات الشخصية بكل تفاصيلها يتطلع
            لتغطية كافة مناطق المملكة لأنكم تستحقون الأفضل. توسيع مناطق التغطية يحتاج منا المزيد
            من الوقت والجهد لضمان أعلى مستوى جودة للخدمة، ويمكنك تصفح كافة المناطق المدعومة داخل
            التطبيق في كل مرة نقوم بالتوسع إلى مناطق جديدة.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
            {coverage.map((c) => (
              <li
                key={c.name}
                className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-bold text-primary"
              >
                <MapPin className="size-4" /> {c.name}
              </li>
            ))}
          </ul>
          <a
            href="#download"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            المناطق المدعومة <ArrowLeft className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Download() {
  return (
    <section id="download" className="bg-hero-glow">
      <div className="mx-auto max-w-4xl px-5 py-24 text-center">
        <h2 className="font-display text-4xl md:text-5xl">حمّل لمحة الآن وابدأ البيع اليوم</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          إعلانك يوصل لآلاف العملاء في منطقتك، وعميلك يلقى كل التفاصيل وأكواد الخصم في مكان واحد.
        </p>
        <div className="mt-8 flex justify-center">
          <StoreButtons center />
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
    <footer className="bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-brand text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <span className="font-display font-extrabold text-foreground">لمحة</span>
        </div>
        <p>جميع الحقوق محفوظة © {new Date().getFullYear()} تطبيق لمحة</p>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-sm font-bold text-foreground">
        صنع بـ<span className="text-primary">♥</span> في السعودية 🇸🇦
      </div>
    </footer>
  );
}
