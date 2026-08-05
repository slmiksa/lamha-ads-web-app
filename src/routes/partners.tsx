import { createFileRoute } from "@tanstack/react-router";
import { Handshake, Star } from "lucide-react";
import { PageHeader, SiteFooter, StoreButtons, WhatsAppButton } from "@/components/site";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "شركاء النجاح — تطبيق لمحة للتسويق والإعلان" },
      {
        name: "description",
        content:
          "شركاء النجاح في تطبيق لمحة للتسويق والإعلان: نفتخر بشراكتنا مع أفضل الجهات والمؤسسات وصنّاع المحتوى في المنطقة.",
      },
      { property: "og:title", content: "شركاء النجاح — تطبيق لمحة للتسويق والإعلان" },
      { property: "og:description", content: "نفتخر بشراكتنا مع أفضل الجهات والمؤسسات." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/partners" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "شركاء النجاح — تطبيق لمحة للتسويق والإعلان" },
      { name: "twitter:description", content: "نفتخر بشراكتنا مع أفضل الجهات والمؤسسات." },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: PartnersPage,
});

const partners = [
  {
    name: "عبد الإله | ABDULELAH",
    img: "/partners/abdulelah.jpeg",
    lines: ["صانع محتوى", "مرخص اعلامياً", "موثق في منصة سناب شات بعنوان lakr_r"],
  },
  {
    name: "سناب صدى القنفذة - لصوتك صدى مسموع",
    img: "/partners/sada-qnf.png",
    lines: [
      "منصة اعلامية حرة لخدمة محافظة القنفذة ومراكزها وقراها .",
      "- تغطيات متنوعة",
      "- اخبار اجتماعية",
      "- اعلانات",
      "- دعم",
      "----------",
      "وسائل التواصل والمتابعة",
      "Whatsapp + Call : 0554235053",
      "Snap + X + TikTok : sda_qnf",
    ],
  },
  {
    name: "داني فون للاتصالات",
    img: "/partners/danyphone.png",
    lines: [
      "وجهتكم الرائدة في عالم الحلول التقنية والجوالات. نجمع بين جودة المنتجات وأحدث الابتكارات لنقدم تجربة عميل متكاملة ترتكز على الثقة، الانتشار، والعروض الحصرية التي تلبي تطلعاتكم.",
    ],
  },
];

function PartnersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader title="شركاء النجاح" kicker="فخورون بهم" />
      <main className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="flex flex-col items-center text-center">
          <span className="grid size-16 place-items-center rounded-full bg-primary-soft text-primary">
            <Handshake className="size-7" />
          </span>
          <h2 className="mt-5 font-display text-2xl sm:text-3xl">شركاؤنا في النجاح</h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            نفتخر بشراكتنا مع أفضل الجهات والمؤسسات
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <article
              key={p.name}
              className="surface-card overflow-hidden p-0 transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                <img
                  src={p.img}
                  alt={`شعار ${p.name} — أحد شركاء النجاح في تطبيق لمحة`}
                  loading="lazy"
                  className="size-full object-cover"
                />
                <span className="absolute bottom-3 left-3 grid size-9 place-items-center rounded-full bg-[var(--gold)] text-foreground shadow-md">
                  <Star className="size-4 fill-current" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold leading-7">{p.name}</h3>
                <div className="mt-2 space-y-1 text-sm leading-7 text-muted-foreground">
                  {p.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-accent/70 p-6 text-center sm:p-8">
          <h2 className="font-display text-xl sm:text-2xl">تبي تكون أحد شركاء النجاح؟</h2>
          <p className="mt-2 text-sm text-muted-foreground">راسلنا وسنرد عليك بأسرع وقت</p>
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
