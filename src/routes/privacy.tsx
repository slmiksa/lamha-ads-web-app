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
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((s, i) => (
        <section key={`${s.title}-${i}`} className={`min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 ${i === 0 ? "md:col-span-2" : ""}`}>
          {s.title && <h2 className="font-display text-xl sm:text-2xl">{s.title}</h2>}
          <div className="mt-3 space-y-3 break-words text-sm leading-7 text-muted-foreground sm:text-base">
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
      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <Sections items={p.ar} />
        <WhatsAppButton className="mt-8" />

        <hr className="my-16 border-border" />

        <div dir="ltr" className="text-left">
          <h2 className="font-display text-2xl sm:text-3xl">Terms &amp; Policies – Lamha Ads Marketing App</h2>
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
