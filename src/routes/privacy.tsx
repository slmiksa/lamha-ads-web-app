import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteFooter, WhatsAppButton } from "@/components/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية — تطبيق لمحة للتسويق والإعلان" },
      {
        name: "description",
        content:
          "سياسة الخصوصية والشروط والأحكام الخاصة بتطبيق لمحة للتسويق والإعلان: مسؤولية الإعلانات، سياسة النشر، الأسعار والدفع، حماية البيانات، والتواصل.",
      },
      { property: "og:title", content: "سياسة الخصوصية — تطبيق لمحة للتسويق والإعلان" },
      {
        property: "og:description",
        content: "الشروط وسياسة الخصوصية لاستخدام منصة لمحة للتسويق عبر الموقع والتطبيقات المحمولة.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

type Section = { title: string; paras?: string[]; list?: string[] };

const ar: Section[] = [
  {
    title: "١. التعريف بالتطبيق",
    paras: [
      "تطبيق لمحة للتسويق هو منصة إلكترونية متخصصة في عرض الإعلانات المصنفة بمختلف أنواعها مثل إعلانات الزواج، الخدمات، العروض، وغيرها من الإعلانات.",
      "تنطبق هذه الشروط وسياسة الخصوصية على استخدام منصة لمحة للتسويق عبر الموقع الإلكتروني والتطبيقات المحمولة.",
      "يتم نشر الإعلانات داخل التطبيق من خلال إدارة التطبيق بناءً على الطلبات المقدمة من أصحاب الإعلانات.",
      "لا يتطلب التطبيق تسجيل حسابات للمستخدمين، ويقتصر التحكم الكامل وإدارة المحتوى على حساب واحد خاص بمالك التطبيق.",
    ],
  },
  {
    title: "٢. مسؤولية الإعلانات",
    paras: [
      "يتحمل صاحب الإعلان المسؤولية الكاملة عن محتوى الإعلان المنشور، بما في ذلك صحة المعلومات، دقتها، ومشروعية الإعلان.",
      "لا يتحمل تطبيق لمحة للتسويق أي مسؤولية قانونية أو مالية أو أخلاقية ناتجة عن الإعلانات المنشورة.",
      "كما أن التطبيق غير مسؤول عن أي تعامل يتم بين المستخدمين وأصحاب الإعلانات أو أي أضرار مباشرة أو غير مباشرة قد تنتج عن تلك التعاملات.",
    ],
  },
  {
    title: "٣. سياسة النشر",
    paras: ["تحتفظ إدارة التطبيق بالحق الكامل في رفض أو حذف أي إعلان يخالف:"],
    list: [
      "القيم العامة",
      "الأنظمة المعمول بها في المملكة العربية السعودية",
      "المحتوى غير اللائق أو المضلل",
      "أي محتوى قد يسبب ضررًا للمستخدمين",
    ],
  },
  {
    title: "",
    paras: [
      "كما يحق لإدارة التطبيق تعديل تصنيف الإعلان بما يتناسب مع نوعه دون الرجوع لصاحب الإعلان.",
    ],
  },
  {
    title: "٤. الأسعار والدفع",
    paras: [
      "أسعار الإعلانات غير ثابتة وقابلة للتغيير حسب الموسم، والطلب، ونوع الإعلان، سواء بالزيادة أو النقصان.",
      "يتم الدفع مقابل نشر الإعلانات عن طريق التحويل البنكي فقط.",
      "لا يوفر التطبيق أي بوابة دفع إلكترونية أو عمليات دفع داخل التطبيق.",
    ],
  },
  {
    title: "٥. سياسة الخصوصية",
    paras: [
      "يحترم تطبيق لمحة للتسويق خصوصية المستخدمين ويلتزم بحماية المعلومات المتعلقة باستخدام التطبيق.",
      "لا يقوم التطبيق بجمع أي بيانات شخصية للمستخدمين.",
      "لا يتطلب التطبيق إنشاء حسابات للمستخدمين ولا يستخدم أنظمة تتبع لسلوك المستخدمين داخل التطبيق.",
      "البيانات التي يتم إرسالها من قبل أصحاب الإعلانات، مثل محتوى الإعلان أو وسائل التواصل الخاصة بهم، يتم استخدامها فقط لغرض مراجعة ونشر الإعلان داخل المنصة.",
      "لا يتم بيع أو مشاركة هذه البيانات مع أي أطراف خارجية.",
    ],
  },
  {
    title: "٦. الحماية والأمان",
    paras: [
      "يتم تطبيق إجراءات تقنية مناسبة لحماية التطبيق من محاولات الاختراق أو إساءة الاستخدام.",
      "ومع ذلك، لا يمكن ضمان الحماية الكاملة بنسبة ١٠٠٪ من جميع المخاطر التقنية أو الإلكترونية.",
      "يتم استخدام التطبيق على مسؤولية المستخدم الشخصية.",
    ],
  },
  {
    title: "٧. التراخيص والتوثيق",
    paras: [
      "يعمل التطبيق بشكل مستقل وفق الأنظمة المعمول بها في المملكة العربية السعودية.",
      "الاسم التجاري: مؤسسة لمحة الحدث للدعاية والإعلان",
      "الرقم الوطني الموحد للمنشأة: 7054222174",
    ],
  },
  {
    title: "٨. التعديلات على الشروط",
    paras: [
      "يحتفظ تطبيق لمحة للتسويق بالحق في تعديل هذه الشروط والسياسات في أي وقت دون إشعار مسبق.",
      "يعد استمرار استخدام التطبيق أو الموقع موافقة ضمنية على أي تعديلات يتم إجراؤها على هذه الشروط.",
    ],
  },
  {
    title: "٩. التواصل",
    paras: [
      "في حال وجود أي استفسارات بخصوص الشروط أو سياسة الخصوصية يمكن التواصل عبر البريد الإلكتروني: info@lamhaads.sa",
    ],
  },
];

const en: Section[] = [
  {
    title: "1. App Overview",
    paras: [
      "Lamha Marketing is an electronic platform specialized in displaying classified advertisements such as marriage ads, services, promotional offers, and other types of advertisements.",
      "These Terms and Privacy Policy apply to the use of Lamha Marketing through the website and mobile applications.",
      "Advertisements are published by the app administration based on requests submitted by advertisers.",
      "The app does not require user account registration, and full control of the platform is limited to a single administrator account owned by the app owner.",
    ],
  },
  {
    title: "2. Advertisement Responsibility",
    paras: [
      "Each advertiser is fully responsible for the content, accuracy, and legality of their advertisement.",
      "Lamha Marketing bears no legal, financial, or moral responsibility for any published advertisement.",
      "The app is not responsible for any transactions or interactions between users and advertisers or any damages that may result from such interactions.",
    ],
  },
  {
    title: "3. Publishing Policy",
    paras: ["The app administration reserves the right to reject or remove any advertisement that violates:"],
    list: [
      "Public morals",
      "Applicable laws in Saudi Arabia",
      "Misleading or inappropriate content",
      "Any content that may harm users",
    ],
  },
  {
    title: "4. Pricing and Payment",
    paras: [
      "Advertisement prices are not fixed and may change depending on season, demand, and advertisement type.",
      "Payments for advertisements are accepted via bank transfer only.",
      "The app does not provide any in-app payment gateway.",
    ],
  },
  {
    title: "5. Privacy Policy",
    paras: [
      "Lamha Marketing respects the privacy of its users and is committed to protecting information related to the use of the platform.",
      "The app does not collect personal data from users.",
      "No user accounts or behavioral tracking systems are used within the application.",
      "Any information provided by advertisers, such as advertisement content or contact details, is used solely for the purpose of reviewing and publishing advertisements on the platform.",
      "No data is sold or shared with third parties.",
    ],
  },
  {
    title: "6. Security",
    paras: [
      "Reasonable technical security measures are implemented to protect the application from unauthorized access or misuse.",
      "However, complete protection against all technical risks cannot be guaranteed.",
      "Use of the app is at the user's own risk.",
    ],
  },
  {
    title: "7. Certifications",
    paras: [
      "Freelance Certification Number: FL-83548418",
      "Business Platform Certification Number: 0000032128",
    ],
  },
  {
    title: "8. Policy Updates",
    paras: [
      "Lamha Marketing reserves the right to modify these terms and policies at any time without prior notice.",
      "Continued use of the website or application constitutes acceptance of any updates.",
    ],
  },
  {
    title: "9. Contact",
    paras: ["For any inquiries regarding these Terms or the Privacy Policy, please contact:"],
  },
];

function Sections({ items }: { items: Section[] }) {
  return (
    <div className="space-y-8">
      {items.map((s, i) => (
        <section key={`${s.title}-${i}`}>
          {s.title && <h2 className="font-display text-xl sm:text-2xl">{s.title}</h2>}
          <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
            {s.paras?.map((p) => <p key={p}>{p}</p>)}
            {s.list && (
              <ul className="list-inside list-disc space-y-1.5">
                {s.list.map((l) => (
                  <li key={l}>{l}</li>
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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader title="سياسة الخصوصية" kicker="الشروط والأحكام" />
      <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        <Sections items={ar} />
        <WhatsAppButton className="mt-4" />

        <hr className="my-12 border-border" />

        <div dir="ltr" className="text-left">
          <h2 className="font-display text-2xl">Terms &amp; Policies – Lamha Marketing App</h2>
          <div className="mt-6">
            <Sections items={en} />
          </div>
          <WhatsAppButton className="mt-4" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
