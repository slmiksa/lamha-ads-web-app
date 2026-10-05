import { useEffect, useState } from "react";
import { WhatsAppIcon, useLinks } from "@/components/site";
import { useContent } from "@/content/store";
import { X } from "lucide-react";

export function RobotAssistant() {
  const c = useContent();
  const { whatsappUrl } = useLinks();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1600);
    return () => clearTimeout(t);
  }, []);

  if (dismissed || !c.assistant.enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-[60] grid grid-cols-[minmax(0,1fr)_auto] items-end gap-1 p-2 transition-all duration-700 sm:left-auto sm:right-0 sm:flex sm:max-w-[95vw] sm:gap-3 sm:p-5 ${
        open ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"
      }`}
    >
      <div className="pointer-events-auto surface-card relative min-w-0 p-3 sm:w-[17rem] sm:p-4">
        <button
          type="button"
          aria-label="إغلاق المساعد"
          onClick={() => setDismissed(true)}
          className="absolute left-2 top-2 grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" />
        </button>
        <p className="pl-6 text-sm font-extrabold leading-6">{c.assistant.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{c.assistant.text}</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon className="size-4 shrink-0" />
          <span>{c.assistant.buttonLabel}</span>
        </a>
        <span className="absolute -left-2 bottom-8 hidden size-4 rotate-45 bg-card sm:block" />
      </div>

      <div className="pointer-events-none relative shrink-0">
        <span className="absolute inset-x-2 bottom-1 h-3 rounded-[50%] bg-foreground/20 blur-md" aria-hidden />
        <img
          src={c.assistant.image}
          alt="تميمة تطبيق لمحة"
          className="relative h-28 w-auto select-none drop-shadow-2xl sm:h-60"
          style={{ animation: "robotFloat 3s ease-in-out infinite" }}
        />
        <style>{`@keyframes robotFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
      </div>
    </div>
  );
}
