import { useEffect, useState } from "react";
import { WHATSAPP_URL, WhatsAppIcon } from "@/components/site";
import { X } from "lucide-react";

export function RobotAssistant() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1600);
    return () => clearTimeout(t);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`pointer-events-none fixed bottom-0 right-0 z-[60] flex max-w-[95vw] items-end gap-2 p-3 transition-all duration-700 sm:gap-3 sm:p-5 ${
        open ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"
      }`}
    >
      <div className="pointer-events-auto surface-card relative w-[15rem] p-4 sm:w-[17rem]">
        <button
          type="button"
          aria-label="إغلاق المساعد"
          onClick={() => setDismissed(true)}
          className="absolute left-2 top-2 grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" />
        </button>
        <p className="pl-6 text-sm font-extrabold leading-6">حاب تتواصل معنا؟</p>
        <p className="mt-1 text-xs text-muted-foreground">فريق لمحة جاهز يرد عليك على الواتساب.</p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon className="size-4 shrink-0" />
          <span>اضغط هنا</span>
        </a>
        <span className="absolute -left-2 bottom-8 hidden size-4 rotate-45 bg-card sm:block" />
      </div>

      <RobotFigure />
    </div>
  );
}

function RobotFigure() {
  return (
    <div className="pointer-events-none relative shrink-0">
      <span
        className="absolute inset-x-2 bottom-1 h-3 rounded-[50%] bg-foreground/20 blur-md"
        aria-hidden
      />
      <img
        src="/mascot.png"
        alt="تميمة تطبيق لمحة"
        className="relative h-36 w-auto select-none drop-shadow-2xl sm:h-60"
        style={{
          animation: "mascotWavePoint 3.4s ease-in-out infinite",
          transformOrigin: "bottom left",
          willChange: "transform",
        }}
      />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes mascotWavePoint {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            12% { transform: translateY(-6px) rotate(0deg); }
            18% { transform: translateY(-6px) rotate(-8deg); }
            24% { transform: translateY(-6px) rotate(0deg); }
            34% { transform: translateY(-8px) rotate(18deg) translateX(8px); }
            56% { transform: translateY(-6px) rotate(18deg) translateX(8px); }
            76% { transform: translateY(0) rotate(0deg); }
            90% { transform: translateY(-3px) rotate(0deg); }
          }
        }
      `}</style>
    </div>
  );
}
