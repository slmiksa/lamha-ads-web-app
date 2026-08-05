import { Link } from "@tanstack/react-router";

export const APP_STORE_URL = "https://apps.apple.com/sa/app/lamha-ads/id6760237672?l=ar";
export const PLAY_STORE_URL = "";
export const CONTACT_EMAIL = "info@lamhaads.sa";
export const WHATSAPP_NUMBER = "966590844649";
export const WHATSAPP_DISPLAY = "+966 59 084 4649";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function Logo({ size = 56, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <img
        src="/logo.png"
        alt="شعار تطبيق لمحة للتسويق والإعلان"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-2xl object-contain"
      />
      {withText && <span className="font-display text-xl font-extrabold sm:text-2xl">لمحة</span>}
    </span>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.28.64 4.42 1.76 6.25L4 29l7.9-1.7a12 12 0 0 0 4.14.74C22.68 28.04 28 22.7 28 16.04 28 9.4 22.68 3 16.04 3zm0 21.9c-1.3 0-2.58-.28-3.76-.82l-.27-.12-4.7 1.01 1-4.55-.18-.29a9.83 9.83 0 0 1-1.53-5.3c0-5.46 4.44-9.9 9.9-9.9 5.45 0 9.88 4.44 9.88 9.9 0 5.45-4.43 9.9-9.88 9.9zm5.42-7.2c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
    </svg>
  );
}

export function WhatsAppButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex max-w-full items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 ${className}`}
    >
      <WhatsAppIcon className="size-5 shrink-0" />
      <span>راسلنا على واتساب</span>
    </a>
  );
}

export function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path fill="#00A0FF" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" />
      <path fill="#00E676" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" />
      <path fill="#FFC107" d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z" />
      <path fill="#FF3D00" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  );
}

export function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

export function StoreButtons({ center = false }: { center?: boolean }) {
  return (
    <div
      className={`flex w-full flex-wrap items-center gap-3 ${center ? "justify-center" : ""}`}
      dir="ltr"
    >
      <div
        aria-label="تطبيق لمحة على Google Play قريباً"
        className="relative inline-flex cursor-default items-center gap-3 rounded-2xl border border-foreground/15 bg-foreground px-4 py-2.5 text-background opacity-80 sm:px-5"
      >
        <GooglePlayIcon className="size-6 shrink-0 sm:size-7" />
        <span className="text-left leading-tight">
          <span className="block text-[9px] uppercase tracking-wide opacity-80 sm:text-[10px]">GET IT ON</span>
          <span className="block text-base font-semibold leading-tight sm:text-lg">Google Play</span>
        </span>
        <span dir="rtl" className="absolute -top-2 left-3 rounded-full bg-[var(--gold)] px-2 py-0.5 text-[10px] font-bold text-foreground">
          قريباً
        </span>
      </div>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="حمّل تطبيق لمحة من App Store"
        className="inline-flex items-center gap-3 rounded-2xl border border-foreground/15 bg-foreground px-4 py-2.5 text-background transition-transform hover:-translate-y-0.5 sm:px-5"
      >
        <AppleIcon className="size-6 shrink-0 sm:size-7" />
        <span className="text-left leading-tight">
          <span className="block text-[9px] opacity-80 sm:text-[10px]">Download on the</span>
          <span className="block text-base font-semibold leading-tight sm:text-lg">App Store</span>
        </span>
      </a>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row">
        <Logo size={46} />
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link to="/" className="hover:text-foreground">
            الرئيسية
          </Link>
          <Link to="/partners" className="hover:text-foreground">
            شركاء النجاح
          </Link>
          <Link to="/privacy" className="hover:text-foreground">
            سياسة الخصوصية
          </Link>
          <Link to="/support" className="hover:text-foreground">
            الدعم الفني
          </Link>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            واتساب
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} dir="ltr" className="hover:text-foreground">
            {CONTACT_EMAIL}
          </a>
        </nav>
        <p className="text-center">جميع الحقوق محفوظة © {new Date().getFullYear()} تطبيق لمحة</p>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-sm font-bold text-foreground">
        صنع بـ<span className="text-primary">♥</span> في السعودية 🇸🇦
      </div>
    </footer>
  );
}

export function PageHeader({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <header className="bg-hero-glow">
      <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <Link to="/" className="inline-flex">
          <Logo />
        </Link>
        {kicker && (
          <span className="mt-6 inline-block rounded-full bg-card/80 px-4 py-1 text-xs font-bold text-primary shadow-sm">
            {kicker}
          </span>
        )}
        <h1 className="mt-4 font-display text-2xl sm:text-4xl">{title}</h1>
      </div>
    </header>
  );
}
