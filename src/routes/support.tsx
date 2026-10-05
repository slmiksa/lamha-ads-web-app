import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { PageHeader, SiteFooter, StoreButtons, WhatsAppButton } from "@/components/site";
import { useContent, useTokens } from "@/content/store";
import { defaultContent } from "@/content/defaults";
import { getIcon } from "@/content/icons";

const seo = defaultContent.support.seo;

export const Route = createFileRoute("/support")({
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
  component: SupportPage,
});

function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-6 space-y-3">
      {items.map((f) => (
        <details key={f.q} className="surface-card group px-6 py-5 open:border-primary/30 open:shadow-md">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold sm:text-base">
            <span>{f.q}</span>
            <ChevronDown className="size-4 shrink-0 text-primary transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

function SupportPage() {
  const c = useContent();
  const t = useTokens();
  const s = c.support;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader title={s.headerTitle} kicker={s.kicker} />
      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <p className="mx-auto max-w-3xl text-center text-lg leading-8 text-muted-foreground">{s.intro}</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {s.channels.map((ch) => {
            const href = t(ch.href);
            const body = <ChannelBody icon={ch.icon} title={ch.title} desc={t(ch.desc)} />;
            return href.startsWith("/") ? (
              <Link
                key={ch.title}
                to={href}
                className="surface-card block p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                {body}
              </Link>
            ) : (
              <a
                key={ch.title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="surface-card block p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                {body}
              </a>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-primary-soft p-7 text-center sm:p-12">
          <h2 className="font-display text-xl sm:text-2xl">{s.downloadTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{s.downloadDesc}</p>
          <div className="mt-5 flex justify-center">
            <StoreButtons center />
          </div>
        </div>

        <section className="mt-20 grid gap-8 md:grid-cols-[.7fr_1.3fr]">
          <h2 className="font-display text-2xl">{s.faqTitle}</h2>
          <Faq items={s.faqs} />
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-[.7fr_1.3fr]">
          <h2 className="font-display text-2xl">{s.mediaTitle}</h2>
          <Faq items={s.mediaFaqs} />
        </section>

        <WhatsAppButton className="mt-12" />
      </main>
      <SiteFooter />
    </div>
  );
}

function ChannelBody({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  const Icon = getIcon(icon);
  return (
    <>
      <span className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 text-base font-bold">{title}</h3>
      <p className="mt-1 break-all text-xs text-muted-foreground">{desc}</p>
    </>
  );
}
