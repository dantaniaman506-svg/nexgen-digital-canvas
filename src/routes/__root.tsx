import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SmoothScroll } from "../components/site/SmoothScroll";
import { FloatingLogo } from "../components/site/FloatingLogo";
import { ThemeToggle } from "../components/site/ThemeToggle";
import { ScrollProgress } from "../components/site/ScrollProgress";
import { WhatsAppFloat } from "../components/site/WhatsAppFloat";
import { BottomNav } from "../components/site/BottomNav";
import { Footer } from "../components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-extrabold text-brand-gradient">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="bg-brand-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white"
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
        <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
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
            className="bg-brand-gradient inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
          <a
            href="/"
            className="glass inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-foreground"
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
      { title: "Nexgen Digital Marketing Solutions — Digital Marketing & Growth Agency" },
      {
        name: "description",
        content:
          "Nexgen Digital Marketing Solutions — Ahmedabad's growth partner for social media, SEO, ads, websites and apps. We turn ideas into impact.",
      },
      { name: "author", content: "Nexgen Digital Marketing Solutions" },
      { property: "og:site_name", content: "Nexgen Digital Marketing Solutions" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Nexgen Digital Marketing Solutions" },
      {
        property: "og:description",
        content:
          "Digital marketing, web & app development under one roof — engineered to grow your brand.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#5b8def" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@600;800&family=Inter:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Nexgen Digital Marketing Solutions",
          url: "https://nexgendigital.in",
          address: {
            "@type": "PostalAddress",
            streetAddress:
              "The Emporio, 412, Visat, Sarkhej-Gandhinagar Hwy, opp. 4D Square Mall, Motera",
            addressLocality: "Ahmedabad",
            addressRegion: "Gujarat",
            postalCode: "382424",
            addressCountry: "IN",
          },
          telephone: "+919664946844",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      <div className="relative min-h-screen bg-background text-foreground">
        <SmoothScroll />
        <FloatingLogo />
        <ThemeToggle />
        <ScrollProgress />
        <WhatsAppFloat />
        <main>
          <Outlet />
        </main>
        <Footer />
        <BottomNav />
      </div>
    </QueryClientProvider>
  );
}
