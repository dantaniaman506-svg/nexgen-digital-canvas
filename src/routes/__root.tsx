import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";

import { reportLovableError } from "../lib/lovable-error-reporting";
import { SmoothScroll } from "../components/site/SmoothScroll";
import { FloatingLogo } from "../components/site/FloatingLogo";
import { DesktopNav } from "../components/site/DesktopNav";
import { ScrollProgress } from "../components/site/ScrollProgress";
import { WhatsAppFloat } from "../components/site/WhatsAppFloat";
import { BottomNav } from "../components/site/BottomNav";
import { Footer } from "../components/site/Footer";
import { VideoBackground } from "../components/site/VideoBackground";
import { ThemeToggle } from "../components/site/ThemeToggle";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-extrabold text-brand-gradient">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
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
          This page didn&apos;t load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
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
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Full-page video background */}
      <VideoBackground />

      {/* Desktop sticky nav — hidden on mobile/tablet, shown on lg+ */}
      <DesktopNav />

      {/* Page content */}
      <div className="relative z-[1] min-h-screen bg-transparent text-foreground" style={{ overflowX: "clip" }}>
        <SmoothScroll />

        {/* Mobile/tablet only: floating logo top-left */}
        <div className="lg:hidden">
          <FloatingLogo />
        </div>

        <ScrollProgress />
        <WhatsAppFloat />

        {/* Mobile/tablet only: theme toggle top-right (desktop nav has its own) */}
        <div
          className="lg:hidden"
          style={{ position: "fixed", top: 14, right: 14, zIndex: 50 }}
        >
          <ThemeToggle />
        </div>

        <main>
          <Outlet />
        </main>

        <Footer />

        {/* Bottom nav: mobile + tablet only */}
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    </QueryClientProvider>
  );
}
