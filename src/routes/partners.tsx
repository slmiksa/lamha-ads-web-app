import { createFileRoute } from "@tanstack/react-router";
import { Handshake, Star } from "lucide-react";
import { PageHeader, SiteFooter, StoreButtons, WhatsAppButton } from "@/components/site";
import { useContent } from "@/content/store";
import { defaultContent } from "@/content/defaults";

const seo = defaultContent.partners.seo;

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { property: "og:title", content: seo.ogTitle },
      { property: "og:description", content: seo.ogDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: PartnersPage,
});

function PartnersPage() {
  const p = useContent().partners;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader title={p.headerTitle} kicker={p.kicker} />
      <main className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="flex flex-col items-center text-center">
          <span className="grid size-16 place-items-center rounded-full bg-primary-soft text-primary">
            <Handshake className="size-7" />
          </span>
          <h2 className="mt-5 font-display text-2xl sm:text-3xl">{p.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">{p.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {p.items.map((item) => (
            <article
              key={item.name}
              className="surface-card overflow-hidden p-0 transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                <img
                  src={item.img}
                  alt={`شعار ${item.name} — أحد شركاء النجاح في تطبيق لمحة`}
                  loading="lazy"
                  className="size-full object-cover"
                />
                <span className="absolute bottom-3 left-3 grid size-9 place-items-center rounded-full bg-[var(--gold)] text-foreground shadow-md">
                  <Star className="size-4 fill-current" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold leading-7">{item.name}</h3>
                <div className="mt-2 space-y-1 text-sm leading-7 text-muted-foreground">
                  {item.lines.map((l, i) => (
                    <p key={i}>{l}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-accent/70 p-6 text-center sm:p-8">
          <h2 className="font-display text-xl sm:text-2xl">{p.ctaTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{p.ctaDesc}</p>
          <div className="mt-5 flex justify-center">
            <WhatsAppButton />
          </div>
          <div className="mt-6 flex justify-center">
            <StoreButtons center />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
