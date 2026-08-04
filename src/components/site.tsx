import { Link } from "@tanstack/react-router";
import logo from "@/assets/lamha-logo.png.asset.json";

export const APP_STORE_URL = "https://apps.apple.com/sa/app/lamha-ads/id6760237672?l=ar";
export const PLAY_STORE_URL = "https://lamha.trndsky.com";
export const SUPPORT_EMAIL = "info@lamha.trndsky.com";

export function Logo({ size = 40, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <img
        src={logo.url}
        alt="شعار تطبيق لمحة للتسويق والإعلان"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-xl object-contain"
      />
      {withText && <span className="font-display text-lg font-extrabold sm:text-xl">لمحة</span>}
    </span>
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
      <a
        href={PLAY_STORE_URL}
        aria-label="حمّل تطبيق لمحة من Google Play"
        className="inline-flex items-center gap-3 rounded-2xl border border-foreground/15 bg-foreground px-4 py-2.5 text-background transition-transform hover:-translate-y-0.5 sm:px-5"
      >
        <GooglePlayIcon className="size-6 shrink-0 sm:size-7" />
        <span className="text-left leading-tight">
          <span className="block text-[9px] uppercase tracking-wide opacity-80 sm:text-[10px]">GET IT ON</span>
          <span className="block text-base font-semibold leading-tight sm:text-lg">Google Play</span>
        </span>
      </a>
      <a
        href={APP_STORE_URL}
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
        <Logo size={34} />
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link to="/" className="hover:text-foreground">
            الرئيسية
          </Link>
          <Link to="/privacy" className="hover:text-foreground">
            سياسة الخصوصية
          </Link>
          <Link to="/support" className="hover:text-foreground">
            الدعم الفني
          </Link>
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
        <h1 className="mt-4 font-display text-3xl sm:text-4xl">{title}</h1>
      </div>
    </header>
  );
}
