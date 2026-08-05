import { faqs, mediaFaqs } from "./data/faqs";
import { privacyAr, privacyEn } from "./data/privacy";
import type { PolicySection } from "./data/privacy";

export type Seo = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
};

export type HeroShot = {
  src: string;
  alt: string;
  topIcon: string;
  topLabel: string;
  topValue: string;
  bottomIcon: string;
  bottomLabel: string;
  bottomValue: string;
};

export type IconCard = { icon: string; title: string; desc: string };

export type SiteContent = {
  brand: {
    siteName: string;
    logo: string;
    favicon: string;
    ogImage: string;
    logoSizeNav: number;
    logoSizeHeader: number;
    logoSizeFooter: number;
  };
  contact: {
    whatsapp: string;
    whatsappDisplay: string;
    whatsappButtonLabel: string;
    email: string;
    appStoreUrl: string;
    playStoreUrl: string;
    playStoreSoonLabel: string;
  };
  assistant: {
    enabled: boolean;
    image: string;
    title: string;
    text: string;
    buttonLabel: string;
  };
  nav: {
    links: { label: string; href: string }[];
    partnersLabel: string;
    supportLabel: string;
    privacyLabel: string;
    ctaLabel: string;
  };
  footer: {
    homeLabel: string;
    whatsappLabel: string;
    copyright: string;
    madeIn: string;
  };
  home: {
    seo: Seo;
    hero: {
      badge: string;
      titleA: string;
      titleB: string;
      subtitle: string;
      chips: string[];
      trust1: string;
      trust2: string;
      shots: HeroShot[];
      slideMs: number;
    };
    services: {
      kicker: string;
      title: string;
      stats: { value: string; label: string }[];
      cards: IconCard[];
    };
    features: { kicker: string; title: string; desc: string; items: IconCard[] };
    influencer: {
      badge: string;
      titleA: string;
      titleB: string;
      desc: string;
      bullets: string[];
      cardBadge: string;
      cardLabel: string;
      ads: { name: string; cat: string; city: string; views: string; likes: string }[];
    };
    media: { kicker: string; title: string; desc: string; items: IconCard[] };
    steps: { kicker: string; title: string; items: { n: string; title: string; desc: string }[] };
    packages: {
      kicker: string;
      title: string;
      desc: string;
      items: { name: string; note: string; gold: boolean }[];
    };
    coverage: {
      title: string;
      desc: string;
      ctaLabel: string;
      pins: { name: string; x: number; y: number }[];
    };
    download: { title: string; desc: string };
  };
  partners: {
    seo: Seo;
    headerTitle: string;
    kicker: string;
    title: string;
    subtitle: string;
    items: { name: string; img: string; lines: string[] }[];
    ctaTitle: string;
    ctaDesc: string;
  };
  support: {
    seo: Seo;
    headerTitle: string;
    kicker: string;
    intro: string;
    channels: { icon: string; title: string; desc: string; href: string }[];
    downloadTitle: string;
    downloadDesc: string;
    faqTitle: string;
    faqs: { q: string; a: string }[];
    mediaTitle: string;
    mediaFaqs: { q: string; a: string }[];
  };
  privacy: {
    seo: Seo;
    headerTitle: string;
    kicker: string;
    ar: PolicySection[];
    en: PolicySection[];
  };
};

export const defaultContent: SiteContent = {
  brand: {
    siteName: "تطبيق لمحة للتسويق والإعلان",
    logo: "/logo.png",
    favicon: "/favicon.ico",
    ogImage: "https://lamhaads.sa/og-image.png",
    logoSizeNav: 72,
    logoSizeHeader: 80,
    logoSizeFooter: 56,
  },
  contact: {
    whatsapp: "966590844649",
    whatsappDisplay: "+966 59 084 4649",
    whatsappButtonLabel: "راسلنا على واتساب",
    email: "info@lamhaads.sa",
    appStoreUrl: "https://apps.apple.com/sa/app/lamha-ads/id6760237672?l=ar",
    playStoreUrl: "",
    playStoreSoonLabel: "قريباً",
  },
  assistant: {
    enabled: true,
    image: "/mascot.png",
    title: "حاب تتواصل معنا؟",
    text: "فريق لمحة جاهز يرد عليك على الواتساب.",
    buttonLabel: "اضغط هنا",
  },
  nav: {
    links: [
      { label: "المميزات", href: "#features" },
      { label: "دعم المشاهير", href: "#influencer" },
      { label: "كيف يعمل", href: "#steps" },
      { label: "الباقات", href: "#packages" },
    ],
    partnersLabel: "شركاء النجاح",
    supportLabel: "الدعم الفني",
    privacyLabel: "سياسة الخصوصية",
    ctaLabel: "تحميل التطبيق",
  },
  footer: {
    homeLabel: "الرئيسية",
    whatsappLabel: "واتساب",
    copyright: "جميع الحقوق محفوظة © {year} تطبيق لمحة",
    madeIn: "صنع بـ♥ في السعودية 🇸🇦",
  },
  home: {
    seo: {
      title: "تطبيق لمحة — إعلانات المتاجر والإعلانات الشخصية في مكان واحد",
      description:
        "لمحة هو التطبيق الأول في السعودية والشرق الأوسط الذي يجمع العميل بإعلانات المتاجر والإعلانات الشخصية بالصور والفيديو والموقع، مع أكواد خصم حصرية ودعم المشاهير. حمّل الآن.",
      ogTitle: "تطبيق لمحة — إعلاناتك توصل لكل عميل",
      ogDescription:
        "إعلانات المتاجر والإعلانات الشخصية بالصور والفيديو والموقع، أكواد خصم حصرية، بودكاست وتغطيات ومسابقات، ودعم إعلانك عبر شخصية مشهورة.",
    },
    hero: {
      badge: "الأول في السعودية والشرق الأوسط",
      titleA: "كل إعلان…",
      titleB: "في لمحة!",
      subtitle: "لمحة.. يجمع عميلك بإعلانك بكل تفاصيله — صور وفيديو وموقع وتواصل مباشر.",
      chips: ["🏪 متاجر", "💍 دعوات زواج", "🏠 عقارات", "🎁 أكواد خصم"],
      trust1: "إعلانات موثقة",
      trust2: "تغطية لكل مدن المملكة",
      slideMs: 3200,
      shots: [
        {
          src: "/hero-app.webp",
          alt: "الصفحة الرئيسية في تطبيق لمحة مع الإعلانات المميزة",
          topIcon: "🛍️",
          topLabel: "الصفحة الرئيسية",
          topValue: "إعلانات مميزة",
          bottomIcon: "🎥",
          bottomLabel: "تغطيات مباشرة",
          bottomValue: "من قلب الحدث",
        },
        {
          src: "/screens/s1.webp",
          alt: "تصفح إعلانات الكافيهات والهواتف في تطبيق لمحة",
          topIcon: "☕",
          topLabel: "تصفح حسب النشاط",
          topValue: "كافيهات وجوالات",
          bottomIcon: "📍",
          bottomLabel: "قريب منك",
          bottomValue: "إعلانات منطقتك",
        },
        {
          src: "/screens/s2.webp",
          alt: "تصنيفات الإعلانات في تطبيق لمحة",
          topIcon: "🗂️",
          topLabel: "تصنيفات متنوعة",
          topValue: "+٢٠ تصنيف",
          bottomIcon: "🔎",
          bottomLabel: "وصول أسرع",
          bottomValue: "لِما تبحث عنه",
        },
        {
          src: "/screens/s3.webp",
          alt: "اختيار باقة الإعلان في تطبيق لمحة",
          topIcon: "🎯",
          topLabel: "اختر باقتك",
          topValue: "عام أو تجاري",
          bottomIcon: "🗓️",
          bottomLabel: "إعلانك ظاهر",
          bottomValue: "لمدة شهر",
        },
        {
          src: "/screens/s4.webp",
          alt: "نموذج إضافة إعلان جديد في تطبيق لمحة",
          topIcon: "📝",
          topLabel: "أضف إعلانك",
          topValue: "بخطوات بسيطة",
          bottomIcon: "⚡",
          bottomLabel: "نشر سريع",
          bottomValue: "خلال دقائق",
        },
        {
          src: "/screens/s5.webp",
          alt: "تحديد موقع الإعلان على الخريطة في تطبيق لمحة",
          topIcon: "🗺️",
          topLabel: "حدد موقعك",
          topValue: "على الخريطة",
          bottomIcon: "🖼️",
          bottomLabel: "صورة الغلاف",
          bottomValue: "تجذب العميل",
        },
        {
          src: "/screens/s6.webp",
          alt: "إضافة صور وفيديو وترويج عبر شخصية مشهورة",
          topIcon: "⭐",
          topLabel: "دعم مشهور",
          topValue: "انتشار أوسع",
          bottomIcon: "📸",
          bottomLabel: "صور وفيديو",
          bottomValue: "لكل التفاصيل",
        },
        {
          src: "/screens/s7.webp",
          alt: "تفاصيل الإعلان مع التواصل عبر واتساب والاتصال",
          topIcon: "💬",
          topLabel: "تواصل مباشر",
          topValue: "واتساب واتصال",
          bottomIcon: "🧭",
          bottomLabel: "موقع الإعلان",
          bottomValue: "بالوصول السريع",
        },
        {
          src: "/screens/s8.webp",
          alt: "معرض الفيديوهات في تطبيق لمحة",
          topIcon: "▶️",
          topLabel: "فيديوهات وبودكاست",
          topValue: "محتوى متجدد",
          bottomIcon: "🔥",
          bottomLabel: "مشاهدات أعلى",
          bottomValue: "تفاعل أكبر",
        },
        {
          src: "/screens/s9.webp",
          alt: "صفحة حسابي في تطبيق لمحة",
          topIcon: "👤",
          topLabel: "حسابي",
          topValue: "إدارة إعلاناتك",
          bottomIcon: "❤️",
          bottomLabel: "المفضلة",
          bottomValue: "والمدفوعات",
        },
      ],
    },
    services: {
      kicker: "خدماتنا",
      title: "كل اللي يحتاجه إعلانك في مكان واحد",
      stats: [
        { value: "+٢٠", label: "تصنيف ونشاط" },
        { value: "١٠٠٪", label: "تفاصيل كاملة للإعلان" },
        { value: "٢٤/٧", label: "نشر ومتابعة" },
        { value: "١٠٠٪", label: "إعلانك ظاهر لمدة شهر" },
      ],
      cards: [
        { icon: "Zap", title: "نشر سريع", desc: "أضف إعلانك بدقائق وانشره لعملاء منطقتك." },
        { icon: "Users", title: "وصول أوسع", desc: "إعلانك يظهر للعملاء وللمشاهير المختارين." },
        { icon: "Ticket", title: "خصومات حصرية", desc: "أكواد خصم لكل متجر مع نظام مسح فوري." },
      ],
    },
    features: {
      kicker: "المميزات",
      title: "كل ما يحتاجه إعلانك… وكل ما يبحث عنه عميلك",
      desc: "تجربة إعلانية متكاملة من النشر حتى وصول العميل إلى باب متجرك.",
      items: [
        {
          icon: "Megaphone",
          title: "إعلانات متاجر وإعلانات شخصية",
          desc: "منصة واحدة تجمع إعلانات المتاجر والخدمات مع الإعلانات الشخصية بكل تفاصيلها.",
        },
        {
          icon: "Video",
          title: "صور وفيديوهات للإعلان",
          desc: "اعرض منتجك بالصور ومقاطع فيديو تصل لآلاف المتصفحين في قسم المعرض.",
        },
        {
          icon: "MapPin",
          title: "موقع الإعلان على الخريطة",
          desc: "حدّد موقعك بدقة على الخريطة ليصل العميل إليك مباشرة بدون عناء.",
        },
        {
          icon: "Ticket",
          title: "أكواد خصم حصرية",
          desc: "لكل متجر أكواد خصم حصرية داخل التطبيق تزيد مبيعاتك وترضي عملاءك.",
        },
        {
          icon: "QrCode",
          title: "نظام مسح الأكواد",
          desc: "امسح الكود واستفد من العرض فوراً — تجربة سريعة وآمنة داخل المتجر.",
        },
        {
          icon: "Bell",
          title: "إعلانات عبر الإشعارات",
          desc: "وصول مباشر لجمهورك عبر الإشعارات والإعلانات المميزة في الواجهة.",
        },
      ],
    },
    influencer: {
      badge: "ميزة جوهرية",
      titleA: "دع",
      titleB: "شخصية مشهورة",
      desc: "اختر شخصية مؤثرة في منطقتك أثناء نشر إعلانك، ليظهر إعلانك داخل التطبيق وأيضاً لدى المشهور المختار. وصول أوسع، ثقة أكبر، ونتائج أسرع لإعلانك.",
      bullets: [
        "قائمة شخصيات موثقة يمكنك تصفحها قبل الاختيار",
        "انتشار إعلانك في نطاق جمهور المؤثر داخل منطقتك",
        "تفاعل أعلى وعملاء أكثر لإعلانك المميز",
      ],
      cardBadge: "مميز",
      cardLabel: "إعلان مدعوم",
      ads: [
        { name: "مطعم الذوق الرفيع", cat: "لأشهى الأكلات", city: "مركز القوز", views: "4,014", likes: "1,280" },
        { name: "كوفي لمسة", cat: "قهوة - مشروبات - حلا", city: "مركز القوز", views: "6,420", likes: "2,135" },
        {
          name: "متجر الاتصالات الذكية",
          cat: "هواتف وإكسسوارات",
          city: "محافظة القنفذة",
          views: "1,112",
          likes: "3,460",
        },
      ],
    },
    media: {
      kicker: "أكثر من مجرد إعلانات",
      title: "بودكاست، تغطيات، ومسابقات",
      desc: "محتوى يومي يقرّب المتاجر من عملائها ويجعل التطبيق وجهة يومية.",
      items: [
        { icon: "Mic", title: "بودكاست ولقاءات", desc: "حوارات مطوّلة مع صنّاع الفكرة وأصحاب المشاريع." },
        { icon: "Video", title: "تغطيات لمحة", desc: "تغطية مباشرة لأبرز الفعاليات والمناسبات في مدينتك." },
        { icon: "Trophy", title: "مسابقات وجوائز", desc: "مسابقات دورية تزيد التفاعل وتقرّبك من الجمهور." },
      ],
    },
    steps: {
      kicker: "كيف يعمل",
      title: "انشر إعلانك في أربع خطوات",
      items: [
        { n: "١", title: "حمّل التطبيق", desc: "متوفر على آيفون وأندرويد مجاناً." },
        { n: "٢", title: "اختر باقتك", desc: "دعوات زواج، إعلانات عامة، تجارية، عقارية، أو أسر منتجة." },
        { n: "٣", title: "أضف تفاصيلك", desc: "الاسم، الوصف، رقم التواصل، الموقع، الصور والفيديو." },
        { n: "٤", title: "انشر ووصّل", desc: "إعلانك يظهر لعملاء منطقتك — ويمكن دعمه عبر شخصية مشهورة." },
      ],
    },
    packages: {
      kicker: "الباقات",
      title: "باقة تناسب كل إعلان",
      desc: "اختر الباقة المناسبة لنوع إعلانك داخل التطبيق.",
      items: [
        { name: "اعلانات عامة", note: "الإعلانات العامة والشخصية", gold: true },
        { name: "دعوات الزواج", note: "بطاقة دعوة زواجك لكل مدينتك", gold: false },
        { name: "اعلانات اسر منتجة", note: "مكانك الحقيقي لأسرتك المنتجة", gold: true },
        { name: "اعلانات تجارية", note: "اعرض إعلانك التجاري وتميّز", gold: false },
        { name: "اعلانات عقارية", note: "عقارك - استراحتك - شقتك", gold: false },
      ],
    },
    coverage: {
      title: "قريباً في جميع مناطق المملكة",
      desc: "تطبيق لمحة كأول تطبيق يجمع إعلانات المتاجر والإعلانات الشخصية بكل تفاصيلها يتطلع لتغطية كافة مناطق المملكة لأنكم تستحقون الأفضل. توسيع مناطق التغطية يحتاج منا المزيد من الوقت والجهد لضمان أعلى مستوى جودة للخدمة، ويمكنك تصفح كافة المناطق المدعومة داخل التطبيق في كل مرة نقوم بالتوسع إلى مناطق جديدة.",
      ctaLabel: "المناطق المدعومة",
      pins: [
        { name: "محافظة القنفذة", x: 26.5, y: 70 },
        { name: "مركز القوز", x: 31.4, y: 81 },
        { name: "مركز حلي", x: 36.5, y: 92 },
      ],
    },
    download: {
      title: "حمّل لمحة الآن وابدأ البيع اليوم",
      desc: "إعلانك يوصل لآلاف العملاء في منطقتك، وعميلك يلقى كل التفاصيل وأكواد الخصم في مكان واحد.",
    },
  },
  partners: {
    seo: {
      title: "شركاء النجاح — تطبيق لمحة للتسويق والإعلان",
      description:
        "شركاء النجاح في تطبيق لمحة للتسويق والإعلان: نفتخر بشراكتنا مع أفضل الجهات والمؤسسات وصنّاع المحتوى في المنطقة.",
      ogTitle: "شركاء النجاح — تطبيق لمحة للتسويق والإعلان",
      ogDescription: "نفتخر بشراكتنا مع أفضل الجهات والمؤسسات.",
    },
    headerTitle: "شركاء النجاح",
    kicker: "فخورون بهم",
    title: "شركاؤنا في النجاح",
    subtitle: "نفتخر بشراكتنا مع أفضل الجهات والمؤسسات",
    items: [
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
    ],
    ctaTitle: "تبي تكون أحد شركاء النجاح؟",
    ctaDesc: "راسلنا وسنرد عليك بأسرع وقت",
  },
  support: {
    seo: {
      title: "الدعم الفني — تطبيق لمحة للتسويق والإعلان",
      description:
        "الدعم الفني لتطبيق لمحة: الأسئلة المتكررة عن نشر الإعلانات، الإعلان المميز، البودكاست والتغطيات والمسابقات، وطرق التواصل معنا.",
      ogTitle: "الدعم الفني — تطبيق لمحة للتسويق والإعلان",
      ogDescription: "تواصل مع فريق لمحة وتصفح الأسئلة المتكررة.",
    },
    headerTitle: "الدعم الفني",
    kicker: "كيف نقدر نساعدك؟",
    intro: "تواصل معنا بأي طريقة تناسبك وسنرد عليك بأسرع وقت.",
    channels: [
      { icon: "MessageCircle", title: "واتساب", desc: "اضغط هنا للمراسلة", href: "{whatsapp}" },
      { icon: "Mail", title: "البريد الإلكتروني", desc: "{email}", href: "mailto:{email}" },
      { icon: "ShieldCheck", title: "سياسة الخصوصية", desc: "اطلع على سياسة الخصوصية", href: "/privacy" },
      { icon: "Handshake", title: "الدعم المباشر", desc: "ردود سريعة عبر الواتساب", href: "{whatsapp}" },
    ],
    downloadTitle: "حمّل تطبيق لمحة",
    downloadDesc: "متوفر على App Store و Google Play",
    faqTitle: "الأسئلة المتكررة",
    faqs,
    mediaTitle: "البودكاست والتغطيات والمسابقات",
    mediaFaqs,
  },
  privacy: {
    seo: {
      title: "سياسة الخصوصية والشروط — تطبيق لمحة للتسويق والإعلان",
      description: "الشروط والسياسات الخاصة بتطبيق لمحة للتسويق والإعلان.",
      ogTitle: "سياسة الخصوصية — تطبيق لمحة",
      ogDescription: "الشروط والسياسات الخاصة بتطبيق لمحة للتسويق والإعلان.",
    },
    headerTitle: "الشروط والسياسات",
    kicker: "تطبيق لمحة للتسويق والإعلان",
    ar: privacyAr,
    en: privacyEn,
  },
};

export type { PolicySection };
