import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter,
  HeadContent, Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AccessibilityWidget } from "@/components/site/AccessibilityWidget";
import { CLINIC } from "@/lib/site-data";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-tertiary mb-3">404</p>
        <h1 className="text-4xl font-display text-foreground">This page is on a coffee break.</h1>
        <p className="mt-3 text-sm text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="mt-6 inline-flex items-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold" style={{ color: "white" }}>Back home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-display">Something interrupted this page</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again, or call us at {CLINIC.phone}.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold" style={{ color: "white" }}>Try again</button>
          <Link to="/" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium">Home</Link>
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
      { title: "GME Global Medical Excellence — Physician-Led Care in Las Vegas" },
      { name: "description", content: "A two-physician, fully board-certified primary care clinic in Las Vegas. Lifestyle medicine, addiction care, and longevity — delivered exclusively by doctors." },
      { name: "author", content: "GME Global Medical Excellence" },
      { property: "og:site_name", content: "GME Global Medical Excellence" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "GME Global Medical Excellence — Physician-Led Care in Las Vegas" },
      { name: "twitter:title", content: "GME Global Medical Excellence — Physician-Led Care in Las Vegas" },
      { property: "og:description", content: "A two-physician, fully board-certified primary care clinic in Las Vegas. Lifestyle medicine, addiction care, and longevity — delivered exclusively by doctors." },
      { name: "twitter:description", content: "A two-physician, fully board-certified primary care clinic in Las Vegas. Lifestyle medicine, addiction care, and longevity — delivered exclusively by doctors." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ea1c1790-afbd-4227-8601-6e74d22d0c68/id-preview-c95ab814--1348232d-65f2-4d57-a0f2-ce9ac74b907c.lovable.app-1779099084349.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ea1c1790-afbd-4227-8601-6e74d22d0c68/id-preview-c95ab814--1348232d-65f2-4d57-a0f2-ce9ac74b907c.lovable.app-1779099084349.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Lexend:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-tertiary focus:text-tertiary-foreground focus:px-4 focus:py-2 focus:rounded-lg">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <AccessibilityWidget />
    </QueryClientProvider>
  );
}
