import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteFooter, WhatsAppButton } from "@/components/site";
import { useContent } from "@/content/store";
import { defaultContent, type PolicySection } from "@/content/defaults";

const seo = defaultContent.privacy.seo;

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { property: "og:title", content: seo.ogTitle },
      { property: "og:description", content: seo.ogDescription },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function Sections({ items }: { items: PolicySection[] }) {
  return (
    <div className="space-y-8">
      {items.map((s, i) => (
        <section key={`${s.title}-${i}`}>
          {s.title && <h2 className="font-display text-xl sm:text-2xl">{s.title}</h2>}
          <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
            {s.paras?.map((p, j) => <p key={j}>{p}</p>)}
            {s.list && (
              <ul className="list-inside list-disc space-y-1.5">
                {s.list.map((l, j) => (
                  <li key={j}>{l}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

function PrivacyPage() {
  const p = useContent().privacy;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader title={p.headerTitle} kicker={p.kicker} />
      <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        <Sections items={p.ar} />
        <WhatsAppButton className="mt-8" />

        <hr className="my-12 border-border" />

        <div dir="ltr" className="text-left">
          <h2 className="font-display text-2xl">Terms &amp; Policies – Lamha Ads Marketing App</h2>
          <div className="mt-6">
            <Sections items={p.en} />
          </div>
          <WhatsAppButton className="mt-8" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
