import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { MessageCircle, ShieldCheck, Handshake, ChevronDown, Mail } from "lucide-react";
import { PageHeader, SiteFooter, StoreButtons, WhatsAppButton, WHATSAPP_URL, CONTACT_EMAIL } from "@/components/site";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "الدعم الفني — تطبيق لمحة للتسويق والإعلان" },
      {
        name: "description",
        content:
          "الدعم الفني لتطبيق لمحة: الأسئلة المتكررة عن نشر الإعلانات، الإعلان المميز، البودكاست والتغطيات والمسابقات، وطرق التواصل معنا.",
      },
      { property: "og:title", content: "الدعم الفني — تطبيق لمحة للتسويق والإعلان" },
      {
        property: "og:description",
        content: "تواصل معنا بأي طريقة تناسبك وسنرد عليك بأسرع وقت، مع إجابات الأسئلة المتكررة.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/support" },
    ],
    links: [{ rel: "canonical", href: "/support" }],
  }),
  component: SupportPage,
});

const faqs = [
  {
    q: "ماهو تطبيق لمحة للتسويق الإلكتروني؟",
    a: "تطبيق لمحة للتسويق الإلكتروني هو منصة تجمع أفضل العروض والخصومات من مختلف المتاجر والمحلات في مدينتك، ليسهّل عليك الوصول لأحدث العروض وتوفير المال.",
  },
  {
    q: "كيف أقدر أضيف إعلان لمتجري؟",
    a: 'اضغط على زر "أضف إعلانك" في الصفحة الرئيسية، ثم عبّئ بيانات متجرك والعرض المطلوب وارفع الصور، وبعدها أرسل الطلب عبر الواتساب. سيتم مراجعة طلبك ونشره خلال وقت قصير.',
  },
  {
    q: "كم تكلفة الإعلان؟",
    a: "تختلف الأسعار حسب نوع الإعلان ومدته. يمكنك الاطلاع على باقات الأسعار المتوفرة أثناء تعبئة نموذج الإعلان. كما يوجد خيار الإعلان المميز الذي يظهر في أعلى الصفحة مقابل رسوم إضافية.",
  },
  {
    q: "كم يستغرق نشر الإعلان بعد الطلب؟",
    a: "عادةً يتم مراجعة الطلب ونشر الإعلان خلال ٢٤ ساعة كحد أقصى من تأكيد الدفع. في بعض الحالات قد يتم النشر خلال ساعات قليلة.",
  },
  {
    q: "هل أقدر أعدّل إعلاني بعد النشر؟",
    a: "نعم، يمكنك التواصل معنا عبر الواتساب وإرسال رقم الطلب مع التعديلات المطلوبة وسنقوم بتحديث الإعلان في أقرب وقت.",
  },
  {
    q: "كيف أغيّر المدينة لعرض عروض مدينتي؟",
    a: "من الصفحة الرئيسية، اضغط على اسم المدينة في الأعلى واختر مدينتك من القائمة. سيتم تحديث العروض تلقائياً لعرض عروض المدينة المختارة.",
  },
  {
    q: "هل التطبيق مجاني للمستخدمين؟",
    a: "نعم، تصفح العروض والخصومات مجاني تماماً لجميع المستخدمين. الرسوم تكون فقط على أصحاب المتاجر الراغبين في نشر إعلاناتهم.",
  },
  {
    q: "ما هو الإعلان المميز؟",
    a: 'الإعلان المميز يظهر في قسم "المميز" بالصفحة الرئيسية مع سلايدر خاص، مما يمنح إعلانك ظهوراً أكبر ووصولاً أوسع للعملاء مقارنة بالإعلان العادي.',
  },
  {
    q: "كيف أتواصل مع صاحب العرض؟",
    a: "عند فتح تفاصيل أي إعلان، ستجد زر التواصل عبر الهاتف أو الواتساب للتواصل مباشرة مع صاحب المتجر أو العرض.",
  },
  {
    q: "كيف أتابع حالة طلب إعلاني؟",
    a: "عند إرسال طلب الإعلان، ستحصل على رقم طلب خاص بك. يمكنك التواصل معنا عبر الواتساب وإرسال رقم الطلب للاستفسار عن حالته.",
  },
];

const mediaFaqs = [
  {
    q: "ما هي بودكاستات لمحة؟",
    a: "بودكاست لمحة هو محتوى صوتي ومرئي نستضيف فيه أصحاب المشاريع والمتاجر والشخصيات المؤثرة في المنطقة، ويُعرض داخل التطبيق في قسم خاص ليتعرّف العملاء أكثر على قصة كل مشروع.",
  },
  {
    q: "كيف أستضيف مشروعي في البودكاست؟",
    a: "تواصل معنا عبر الواتساب أو البريد الإلكتروني وأرسل نبذة عن مشروعك ونشاطك، وسيقوم فريق لمحة بالتواصل معك لتحديد الموعد وتفاصيل الحلقة.",
  },
  {
    q: "هل مشاهدة البودكاست والتغطيات مجانية؟",
    a: "نعم، جميع حلقات البودكاست والتغطيات متاحة مجاناً لكل مستخدمي التطبيق بدون أي رسوم أو اشتراك.",
  },
  {
    q: "ما هي تغطيات لمحة؟",
    a: "تغطيات لمحة هي تغطية مصورة لأبرز الفعاليات والمناسبات والافتتاحات في منطقتك، تُنشر داخل التطبيق لتصل لأكبر عدد من المتابعين.",
  },
  {
    q: "كيف أطلب تغطية لفعالية أو افتتاح متجري؟",
    a: "أرسل لنا تفاصيل الفعالية (المكان والتاريخ ونوع النشاط) عبر الواتساب قبل الموعد بوقت كافٍ، وسنرتب لك التغطية المناسبة.",
  },
  {
    q: "كيف أشارك في المسابقات وأستلم الجوائز؟",
    a: "تُعلن المسابقات داخل التطبيق وعبر الإشعارات، وتشترك بمتابعة الشروط المذكورة في كل مسابقة. يتم التواصل مع الفائزين مباشرة لتسليم الجوائز.",
  },
  {
    q: "كيف تعمل ميزة دعم الإعلان عبر شخصية مشهورة؟",
    a: "أثناء إضافة إعلانك يمكنك اختيار شخصية مؤثرة في منطقتك، فيظهر إعلانك داخل التطبيق وأيضاً لدى المشهور المختار، مما يمنحه انتشاراً أوسع في نطاق جمهوره.",
  },
  {
    q: "كيف أستخدم أكواد الخصم ونظام مسح الأكواد؟",
    a: "افتح إعلان المتجر داخل التطبيق واحصل على كود الخصم الحصري، ثم اعرضه في المتجر ليتم مسحه عبر نظام مسح الأكواد والاستفادة من العرض مباشرة.",
  },
];

const channels = [
  {
    icon: MessageCircle,
    title: "واتساب",
    desc: "اضغط هنا للمراسلة",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    desc: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    external: true,
  },
  {
    icon: ShieldCheck,
    title: "سياسة الخصوصية",
    desc: "اطلع على سياسة الخصوصية",
    href: "/privacy",
    external: false,
  },
  {
    icon: Handshake,
    title: "الدعم المباشر",
    desc: "ردود سريعة عبر الواتساب",
    href: WHATSAPP_URL,
    external: true,
  },
];

function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-6 space-y-3">
      {items.map((f) => (
        <details key={f.q} className="surface-card group px-5 py-4">
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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader title="الدعم الفني" kicker="كيف نقدر نساعدك؟" />
      <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        <p className="text-muted-foreground">تواصل معنا بأي طريقة تناسبك وسنرد عليك بأسرع وقت.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {channels.map((c) =>
            c.external ? (
              <a key={c.title} href={c.href} className="surface-card block p-5 transition-transform hover:-translate-y-0.5">
                <ChannelBody icon={c.icon} title={c.title} desc={c.desc} />
              </a>
            ) : (
              <Link key={c.title} to="/privacy" className="surface-card block p-5 transition-transform hover:-translate-y-0.5">
                <ChannelBody icon={c.icon} title={c.title} desc={c.desc} />
              </Link>
            ),
          )}
        </div>

        <div className="mt-10 rounded-3xl bg-accent/70 p-6 text-center sm:p-8">
          <h2 className="font-display text-xl sm:text-2xl">حمّل تطبيق لمحة</h2>
          <p className="mt-2 text-sm text-muted-foreground">متوفر على App Store و Google Play</p>
          <div className="mt-5 flex justify-center">
            <StoreButtons center />
          </div>
        </div>

        <section className="mt-14">
          <h2 className="font-display text-2xl">الأسئلة المتكررة</h2>
          <Faq items={faqs} />
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl">البودكاست والتغطيات والمسابقات</h2>
          <Faq items={mediaFaqs} />
        </section>

        <WhatsAppButton className="mt-12" />
      </main>
      <SiteFooter />
    </div>
  );
}

function ChannelBody({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof MessageCircle;
  title: string;
  desc: string;
}) {
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
