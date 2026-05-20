// src/routes/__root.tsx
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScrollRestoration,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AccessibilityWidget } from "@/components/site/AccessibilityWidget";
import { CLINIC } from "@/lib/site-data";

// ─── SEO constants ───────────────────────────────────────────────────────────
const SITE_URL = "https://www.gmeglobalmedical.com"; // your canonical base
const OG_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/...your-og-image.png";

// ─── Error / Not Found ───────────────────────────────────────────────────────
function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-tertiary mb-3">404</p>
        <h1 className="text-4xl font-display text-foreground">
          This page is on a coffee break.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white"
        >
          Back home
        </Link>
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
        <p className="mt-2 text-sm text-muted-foreground">
          Try again, or call us at {CLINIC.phone}.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
          <Link to="/" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Root route ───────────────────────────────────────────────────────────────
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      // ── Primary SEO ──────────────────────────────────────────────────────
      {
        title: "GME Global Medical Excellence — Physician-Led Care in Las Vegas",
      },
      {
        name: "description",
        content:
          "A two-physician, fully board-certified primary care clinic in Las Vegas. Lifestyle medicine, addiction care, and longevity — delivered exclusively by doctors.",
      },
      { name: "author", content: "GME Global Medical Excellence" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "googlebot", content: "index, follow" },

      // ── Canonical (set per-route; root fallback) ─────────────────────────
      // Per-route canonical is better — override this in each leaf route's head()

      // ── Open Graph ───────────────────────────────────────────────────────
      { property: "og:site_name", content: "GME Global Medical Excellence" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      {
        property: "og:title",
        content: "GME Global Medical Excellence — Physician-Led Care in Las Vegas",
      },
      {
        property: "og:description",
        content:
          "A two-physician, fully board-certified primary care clinic in Las Vegas. Lifestyle medicine, addiction care, and longevity — delivered exclusively by doctors.",
      },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },

      // ── Twitter / X Card ─────────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@GMEMedical" }, // update to your handle
      {
        name: "twitter:title",
        content: "GME Global Medical Excellence — Physician-Led Care in Las Vegas",
      },
      {
        name: "twitter:description",
        content:
          "A two-physician, fully board-certified primary care clinic in Las Vegas. Lifestyle medicine, addiction care, and longevity — delivered exclusively by doctors.",
      },
      { name: "twitter:image", content: OG_IMAGE },

      // ── Local Business / Geo ─────────────────────────────────────────────
      { name: "geo.region", content: "US-NV" },
      { name: "geo.placename", content: "Las Vegas" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // ── Canonical ───────────────────────────────────────────────────────
      { rel: "canonical", href: SITE_URL },
      // ── Fonts ───────────────────────────────────────────────────────────
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Lexend:wght@400;500;600;700&display=swap",
      },
      // ── Favicon set ─────────────────────────────────────────────────────
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      // ── JSON-LD: Local Business structured data ──────────────────────────
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: "GME Global Medical Excellence",
          url: SITE_URL,
          telephone: CLINIC.phone,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Las Vegas",
            addressRegion: "NV",
            addressCountry: "US",
          },
          medicalSpecialty: [
            "PrimaryCare",
            "LifestyleMedicine",
            "AddictionMedicine",
          ],
          image: OG_IMAGE,
          priceRange: "$$",
          sameAs: [
            // add your social profile URLs
          ],
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// ─── Shell (wraps the full HTML document) ─────────────────────────────────────
function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// ─── App tree ─────────────────────────────────────────────────────────────────
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      
      <a  href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-tertiary focus:text-tertiary-foreground focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <AccessibilityWidget />
    </QueryClientProvider>
  );
}