import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, Download } from "lucide-react";
import { StoreButtons } from "@/components/site";
import { useContent } from "@/content/store";

export const Route = createFileRoute("/social-media")({
  head: () => ({
    meta: [
      { title: "تابعنا عبر السوشال ميديا — تطبيق لمحة" },
      {
        name: "description",
        content: "تابع تطبيق لمحة على سناب شات ومنصة إكس وتيك توك، وحمّل التطبيق.",
      },
      { property: "og:title", content: "تابعنا عبر السوشال ميديا — تطبيق لمحة" },
      {
        property: "og:description",
        content: "حسابات تطبيق لمحة الرسمية وروابط تحميل التطبيق.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SocialMediaPage,
});

const SNAPCHAT_PATH =
  "M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z";

const X_PATH =
  "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";

const TIKTOK_PATH =
  "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";

const socials = [
  {
    label: "تابعنا في سناب شات",
    href: "https://snapchat.com/t/K6xnxfZw",
    theme: "social-icon-snap",
    icon: <path d={SNAPCHAT_PATH} />,
  },
  {
    label: "تابعنا في منصة إكس",
    href: "https://x.com/lamhaads?s=11",
    theme: "social-icon-dark",
    icon: <path d={X_PATH} />,
  },
  {
    label: "تابعنا في تيك توك",
    href: "https://www.tiktok.com/@lamha.ads?_r=1&_t=ZS-99xGPSmqiPo",
    theme: "social-icon-dark social-icon-tiktok",
    icon: <path d={TIKTOK_PATH} />,
  },
];

function SocialMediaPage() {
  const c = useContent();

  return (
    <main dir="rtl" className="social-page relative min-h-screen overflow-hidden px-5 py-12 text-social-foreground sm:py-16">
      <div aria-hidden className="social-pattern absolute inset-0 opacity-10" />
      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-sm flex-col items-center">
        <a href="/" aria-label="العودة إلى الرئيسية" className="block">
          <img src={c.brand.logo} alt="شعار تطبيق لمحة" className="h-auto w-52 drop-shadow-xl sm:w-60" />
        </a>

        <h1 className="mt-5 text-center font-display text-3xl font-black sm:text-4xl">تطبيق لمحة</h1>
        <p className="mt-1 text-center text-lg font-bold text-social-foreground/70">صُنع لكم</p>

        <div className="mt-9 w-full space-y-3.5">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-16 w-full items-center gap-3 rounded-2xl bg-card px-2.5 py-2.5 shadow-social transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${social.theme}`}>
                <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
                  {social.icon}
                </svg>
              </span>
              <span className="flex-1 text-right text-[15px] font-extrabold text-card-foreground">
                {social.label}
              </span>
              <ChevronLeft className="size-5 text-card-foreground/30 transition-transform group-hover:-translate-x-1" />
            </a>
          ))}
        </div>

        <div className="mt-10 flex w-full items-center gap-3">
          <span className="h-px flex-1 bg-social-foreground/25" />
          <span className="inline-flex items-center gap-2 text-sm font-extrabold">
            حمّل التطبيق من هنا
            <Download className="size-4" />
          </span>
          <span className="h-px flex-1 bg-social-foreground/25" />
        </div>

        <div className="mt-5 w-full rounded-3xl border border-social-foreground/15 bg-social-foreground/10 px-4 py-6 backdrop-blur-sm">
          <StoreButtons center />
        </div>

        <p className="mt-auto pt-12 text-center text-xs font-medium text-social-foreground/55">
          لمحة © {new Date().getFullYear()} — جميع الحقوق محفوظة
        </p>
      </div>
    </main>
  );
}