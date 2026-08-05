import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { RobotAssistant } from "../components/RobotAssistant";
import { ContentProvider, useContent } from "../content/store";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "تطبيق لمحة للتسويق والإعلان" },
      {
        name: "description",
        content:
          "تطبيق لمحة للتسويق والإعلان — إعلانات المتاجر والإعلانات الشخصية بالصور والفيديو والموقع، أكواد خصم حصرية، بودكاست وتغطيات ومسابقات.",
      },
      { name: "author", content: "تطبيق لمحة للتسويق والإعلان" },
      { name: "application-name", content: "تطبيق لمحة للتسويق والإعلان" },
      { name: "apple-mobile-web-app-title", content: "تطبيق لمحة" },
      { name: "theme-color", content: "#0f2b4a" },
      { property: "og:site_name", content: "تطبيق لمحة للتسويق والإعلان" },
      { property: "og:title", content: "تطبيق لمحة للتسويق والإعلان" },
      {
        property: "og:description",
        content:
          "التطبيق الأول في السعودية الذي يجمع العميل بإعلانات المتاجر والإعلانات الشخصية بكل تفاصيلها.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://lamha.trndsky.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://lamha.trndsky.com/og-image.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&family=Tajawal:wght@400;500;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/favicon.png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ContentProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <BrandHead />
        <Outlet />
        <AssistantSlot />
      </ContentProvider>
    </QueryClientProvider>
  );
}

/** Applies admin-managed favicon / site name / share image at runtime. */
function BrandHead() {
  const { brand } = useContent();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const set = (selector: string, attr: string, value: string, create: () => HTMLElement) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    set('link[rel="icon"]', "href", brand.favicon, () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "icon");
      return l;
    });
    set('link[rel="shortcut icon"]', "href", brand.favicon, () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "shortcut icon");
      return l;
    });
    set('meta[property="og:image"]', "content", brand.ogImage, () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:image");
      return m;
    });
    set('meta[property="og:site_name"]', "content", brand.siteName, () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:site_name");
      return m;
    });
  }, [brand.favicon, brand.ogImage, brand.siteName]);
  return null;
}

function AssistantSlot() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname.startsWith("/adminpanel")) return null;
  return <RobotAssistant />;
}

