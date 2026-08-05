import { useEffect, useState } from "react";
import { WHATSAPP_URL, WHATSAPP_DISPLAY, WhatsAppIcon } from "@/components/site";
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
          <span dir="ltr">{WHATSAPP_DISPLAY}</span>
        </a>
        <span className="absolute -left-2 bottom-8 hidden size-4 rotate-45 bg-card sm:block" />
      </div>

      <RobotFigure />
    </div>
  );
}

function RobotFigure() {
  return (
    <svg
      viewBox="0 0 120 170"
      className="pointer-events-none h-32 w-auto shrink-0 drop-shadow-xl sm:h-56"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g className="origin-center" style={{ animation: "robotFloat 3s ease-in-out infinite" }}>
        <rect x="57" y="6" width="6" height="14" rx="3" fill="currentColor" className="text-primary" />
        <circle cx="60" cy="6" r="6" className="fill-[var(--gold)]" />
        <rect x="18" y="20" width="84" height="66" rx="24" className="fill-[var(--primary)]" />
        <rect x="28" y="32" width="64" height="42" rx="18" className="fill-[var(--foreground)]" />
        <circle cx="47" cy="53" r="7" className="fill-[var(--primary-foreground)]" />
        <circle cx="73" cy="53" r="7" className="fill-[var(--primary-foreground)]" />
        <circle cx="47" cy="55" r="3" className="fill-[var(--foreground)]" />
        <circle cx="73" cy="55" r="3" className="fill-[var(--foreground)]" />
        <rect x="30" y="92" width="60" height="52" rx="20" className="fill-[var(--card)]" stroke="var(--primary)" strokeWidth="4" />
        <rect x="42" y="102" width="36" height="26" rx="10" className="fill-[var(--card)]" />
        <image href="/logo.png" x="44" y="104" width="32" height="22" preserveAspectRatio="xMidYMid meet" />

        <rect x="4" y="96" width="20" height="40" rx="10" className="fill-[var(--primary)]" />
        <rect x="96" y="96" width="20" height="40" rx="10" className="fill-[var(--primary)]" />
        <rect x="38" y="146" width="16" height="18" rx="8" className="fill-[var(--foreground)]" />
        <rect x="66" y="146" width="16" height="18" rx="8" className="fill-[var(--foreground)]" />
      </g>
      <style>{`@keyframes robotFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
    </svg>
  );
}
