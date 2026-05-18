import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SERVICES, PHYSICIANS } from "@/lib/site-data";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          { path: "/", priority: "1.0", changefreq: "weekly" as const },
          { path: "/about", priority: "0.8", changefreq: "monthly" as const },
          { path: "/physicians", priority: "0.8", changefreq: "monthly" as const },
          ...PHYSICIANS.map((p) => ({ path: `/physicians/${p.slug}`, priority: "0.7", changefreq: "monthly" as const })),
          { path: "/services", priority: "0.9", changefreq: "monthly" as const },
          ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, priority: "0.8", changefreq: "monthly" as const })),
          { path: "/testimonials", priority: "0.6", changefreq: "monthly" as const },
          { path: "/contact", priority: "0.7", changefreq: "monthly" as const },
          { path: "/privacy", priority: "0.3", changefreq: "yearly" as const },
          { path: "/terms", priority: "0.3", changefreq: "yearly" as const },
          { path: "/accessibility", priority: "0.4", changefreq: "yearly" as const },
        ];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...paths.map((p) => `  <url><loc>${BASE_URL}${p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
