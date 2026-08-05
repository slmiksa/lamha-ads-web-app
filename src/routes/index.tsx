import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SaudiDotMap } from "@/components/SaudiDotMap";
import { Logo, SiteFooter, StoreButtons } from "@/components/site";
import { useContent } from "@/content/store";
import { defaultContent, type SiteContent } from "@/content/defaults";
import { getIcon } from "@/content/icons";
import { Megaphone, MapPin, Star, Store, Sparkles, ArrowLeft, ShieldCheck, Heart, Eye, Menu, X } from "lucide-react";

const seo = defaultContent.home.seo;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { property: "og:title", content: seo.ogTitle },
      { property: "og:description", content: seo.ogDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const c = useContent();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav c={c} />
      <Hero c={c} />
      <Services c={c} />
      <Features c={c} />
      <Influencer c={c} />
      <MediaSection c={c} />
      <Steps c={c} />
      <Packages c={c} />
      <Coverage c={c} />
      <Download c={c} />
      <SiteFooter />
    </div>
  );
}

function Nav({ c }: { c: SiteContent }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 md:flex md:justify-between">
        <a href="#top" className="min-w-0">
          <Logo size={c.brand.logoSizeNav} />
        </a>
        <nav className="hidden items-center gap-2 rounded-full bg-secondary p-1.5 text-sm text-muted-foreground lg:flex">
          {c.nav.links.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="rounded-full px-4 py-1.5 transition-colors hover:bg-card hover:text-foreground"
            >
              {i.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/partners"
            className="hidden rounded-full px-3 py-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            {c.nav.partnersLabel}
          </Link>
          <Link
            to="/support"
            className="hidden rounded-full px-3 py-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            {c.nav.supportLabel}
          </Link>
          <a
            href="#download"
            className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            {c.nav.ctaLabel}
          </a>
          <button
            type="button"
            aria-label="القائمة"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 text-sm font-bold">
            {c.nav.links.map((i) => (
              <a
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-foreground transition-colors hover:bg-secondary"
              >
                {i.label}
              </a>
            ))}
            <Link
              to="/partners"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-foreground transition-colors hover:bg-secondary"
            >
              {c.nav.partnersLabel}
            </Link>
            <Link
              to="/support"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-foreground transition-colors hover:bg-secondary"
            >
              {c.nav.supportLabel}
            </Link>
            <Link
              to="/privacy"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-foreground transition-colors hover:bg-secondary"
            >
              {c.nav.privacyLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero({ c }: { c: SiteContent }) {
  const h = c.home.hero;
  const [shotIndex, setShotIndex] = useState(0);
  const shots = h.shots.length ? h.shots : defaultContent.home.hero.shots;
  const shot = shots[Math.min(shotIndex, shots.length - 1)]!;

  return (
    <section id="top" className="bg-hero-glow relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-10 sm:gap-14 md:grid-cols-2 md:pb-32 md:pt-16">
        <div className="order-2 md:order-1">
          <div className="relative mx-auto w-[75%] max-w-[320px] sm:w-full">
            <PhoneFrame>
              <PhoneSlideshow shots={shots} index={shotIndex} setIndex={setShotIndex} ms={h.slideMs} />
            </PhoneFrame>

            <div
              key={`top-${shotIndex}`}
              className="float-card animate-fade-in absolute -right-4 top-16 flex items-center gap-2 px-3 py-2 sm:-right-6 sm:gap-3 sm:px-4 sm:py-3 md:-right-14"
            >
              <span className="grid size-8 place-items-center rounded-xl bg-primary-soft text-xl sm:size-10 sm:text-2xl">
                {shot.topIcon}
              </span>
              <span className="text-right leading-tight">
                <span className="block text-[10px] text-muted-foreground sm:text-[11px]">{shot.topLabel}</span>
                <span className="block text-xs font-extrabold sm:text-sm">{shot.topValue}</span>
              </span>
            </div>

            <div
              key={`bottom-${shotIndex}`}
              className="float-card animate-fade-in absolute -left-4 bottom-16 flex items-center gap-2 px-3 py-2 sm:-left-6 sm:bottom-20 sm:gap-3 sm:px-4 sm:py-3 md:-left-14"
            >
              <span className="grid size-8 place-items-center rounded-xl bg-gold-grad text-base sm:size-10 sm:text-lg">
                {shot.bottomIcon}
              </span>
              <span className="text-right leading-tight">
                <span className="block text-[10px] text-muted-foreground sm:text-[11px]">{shot.bottomLabel}</span>
                <span className="block text-xs font-extrabold sm:text-sm">{shot.bottomValue}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="order-1 text-center md:order-2 md:text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-1.5 text-xs font-bold text-primary shadow-sm">
            <span className="size-2 rounded-full bg-primary" /> {h.badge}
          </span>
          <h1 className="mt-6 font-display text-[2.25rem] leading-[1.15] sm:text-5xl sm:leading-[1.1] md:text-7xl">
            {h.titleA} <span className="text-gradient-brand">{h.titleB}</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            {h.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
            {h.chips.map((chip, i) => (
              <span key={i} className="rounded-full bg-card px-4 py-2 text-sm font-bold shadow-sm">
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-8 flex justify-center md:justify-start">
            <StoreButtons />
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground md:justify-start">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" /> {h.trust1}
            </span>
            <span className="hidden h-4 w-px bg-border md:block" />
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> {h.trust2}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneSlideshow({
  shots,
  index,
  setIndex,
  ms,
}: {
  shots: SiteContent["home"]["hero"]["shots"];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  ms: number;
}) {
  const len = shots.length;
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % len), Math.max(800, ms || 3200));
    return () => clearInterval(id);
  }, [setIndex, len, ms]);

  return (
    <div className="absolute inset-0">
      {shots.map((shot, i) => (
        <img
          key={`${shot.src}-${i}`}
          src={shot.src}
          alt={shot.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-foreground/40 px-2.5 py-1.5 backdrop-blur-sm">
        {shots.map((shot, i) => (
          <button
            key={`dot-${shot.src}-${i}`}
            type="button"
            aria-label={`عرض اللقطة ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-4 bg-background" : "w-1.5 bg-background/50"
            }`}
          />
        ))}
      </div>
    </div>
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

function SectionTitle({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-block rounded-full bg-primary-soft px-4 py-1 text-sm font-bold text-primary">
        {kicker}
      </span>
      <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}

function Services({ c }: { c: SiteContent }) {
  const s = c.home.services;
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <SectionTitle kicker={s.kicker} title={s.title} />
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {s.stats.map((i, k) => (
          <div key={k} className="surface-card px-4 py-7 text-center">
            <div className="font-display text-3xl font-extrabold text-primary">{i.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{i.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {s.cards.map((card, k) => {
          const Icon = getIcon(card.icon);
          return (
            <article key={k} className="rounded-3xl bg-accent/70 p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-card text-primary shadow-sm">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Features({ c }: { c: SiteContent }) {
  const f = c.home.features;
  return (
    <section id="features" className="bg-secondary/60">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <SectionTitle kicker={f.kicker} title={f.title} desc={f.desc} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {f.items.map((item, k) => {
            const Icon = getIcon(item.icon);
            return (
              <article key={k} className="surface-card group p-7 transition-transform hover:-translate-y-1">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Influencer({ c }: { c: SiteContent }) {
  const inf = c.home.influencer;
  return (
    <section id="influencer" className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-grad px-4 py-1.5 text-xs font-bold text-primary-foreground">
            <Sparkles className="size-3.5" /> {inf.badge}
          </span>
          <h2 className="mt-5 font-display text-2xl sm:text-3xl md:text-4xl">
            {inf.titleA} <span className="text-gradient-brand">{inf.titleB}</span>
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{inf.desc}</p>
          <ul className="mt-6 space-y-3 text-sm">
            {inf.bullets.map((t, i) => (
              <li key={i} className="flex items-start gap-3">
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
              {inf.cardBadge}
            </span>
            <span className="text-sm font-bold">{inf.cardLabel}</span>
          </div>
          <div className="mt-5 space-y-3">
            {inf.ads.map((a, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl bg-secondary/70 p-4">
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
                    <Eye className="size-3.5" /> {a.views}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Heart className="size-3.5" /> {a.likes}
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

function MediaSection({ c }: { c: SiteContent }) {
  const m = c.home.media;
  return (
    <section className="bg-secondary/60">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <SectionTitle kicker={m.kicker} title={m.title} desc={m.desc} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {m.items.map((item, k) => {
            const Icon = getIcon(item.icon);
            return (
              <article key={k} className="surface-card overflow-hidden">
                <div className="bg-brand p-9 text-primary-foreground">
                  <Icon className="size-8" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Steps({ c }: { c: SiteContent }) {
  const s = c.home.steps;
  return (
    <section id="steps" className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <SectionTitle kicker={s.kicker} title={s.title} />
      <div className="mt-12 grid gap-5 md:grid-cols-4">
        {s.items.map((step, i) => (
          <div key={i} className="rounded-3xl bg-accent/70 p-7">
            <span className="grid size-11 place-items-center rounded-2xl bg-brand font-display text-lg font-extrabold text-primary-foreground">
              {step.n}
            </span>
            <h3 className="mt-4 text-base">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Packages({ c }: { c: SiteContent }) {
  const p = c.home.packages;
  return (
    <section id="packages" className="bg-secondary/60">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <SectionTitle kicker={p.kicker} title={p.title} desc={p.desc} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {p.items.map((item, i) => (
            <article
              key={i}
              className="surface-card p-7"
              style={
                item.gold
                  ? { borderColor: "color-mix(in oklab, var(--gold) 55%, transparent)" }
                  : undefined
              }
            >
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <Megaphone className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg">{item.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Coverage({ c }: { c: SiteContent }) {
  const cov = c.home.coverage;
  return (
    <section id="coverage" className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
        <div className="relative order-2 mx-auto w-full max-w-md md:order-1 md:max-w-none">
          <SaudiDotMap className="w-full text-muted-foreground" />
          {cov.pins.map((pin, i) => (
            <div key={i} className="absolute" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
              <span className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-primary/20" />
              <span className="pointer-events-none absolute bottom-[14px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold text-primary-foreground shadow-md sm:px-2.5 sm:py-1 sm:text-[11px]">
                {pin.name}
              </span>
            </div>
          ))}
        </div>

        <div className="order-1 text-center md:order-2 md:text-right">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl">{cov.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{cov.desc}</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
            {cov.pins.map((pin, i) => (
              <li
                key={i}
                className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-2 text-xs font-bold text-primary sm:text-sm"
              >
                <MapPin className="size-4 shrink-0" /> {pin.name}
              </li>
            ))}
          </ul>
          <a
            href="#download"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {cov.ctaLabel} <ArrowLeft className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Download({ c }: { c: SiteContent }) {
  const d = c.home.download;
  return (
    <section id="download" className="bg-hero-glow">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:py-24 text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">{d.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{d.desc}</p>
        <div className="mt-8 flex justify-center">
          <StoreButtons center />
        </div>
      </div>
    </section>
  );
}
