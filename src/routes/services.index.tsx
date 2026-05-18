import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Stethoscope, Sparkles, ShieldCheck, UserCheck } from "lucide-react";
import { SERVICES } from "@/lib/site-data";

const ICONS = {
  "primary-care": Stethoscope,
  "lifestyle-medicine": Sparkles,
  "addiction-care": ShieldCheck,
  "all-physician-group": UserCheck,
} as const;

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — GME Global Medical Excellence" },
      { name: "description", content: "Primary care, lifestyle medicine, addiction care, and all-physician group practice in Las Vegas." },
      { property: "og:title", content: "GME Services" },
      { property: "og:description", content: "Every service delivered by a board-certified physician." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <>
      <section className="bg-gradient-hero" style={{ color: "white" }}>
        <div className="container mx-auto px-4 sm:px-6 py-20 md:py-24">
          <p className="text-xs uppercase tracking-[0.3em] opacity-80">Services</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-display max-w-3xl leading-[1.05]">Care that meets you where you are.</h1>
          <p className="mt-5 text-white/85 max-w-2xl text-lg">From annual physicals to advanced longevity protocols and addiction medicine — every program is delivered exclusively by a board-certified physician.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-20 grid gap-6">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.slug];
          return (
            <article key={s.slug} className="rounded-3xl border border-border bg-card shadow-soft overflow-hidden">
              <div className="grid md:grid-cols-12 gap-6 p-6 md:p-10 items-start">
                <div className="md:col-span-3 flex md:flex-col gap-4 items-center md:items-start">
                  <div className="size-16 rounded-2xl bg-gradient-brand grid place-items-center"><Icon className="size-7" style={{ color: "white" }} /></div>
                  <div className="text-xs uppercase tracking-[0.25em] text-tertiary font-semibold">0{i + 1}</div>
                </div>
                <div className="md:col-span-9">
                  <h2 className="text-2xl md:text-3xl font-display">{s.title}</h2>
                  <p className="mt-3 text-foreground/80 leading-relaxed">{s.long}</p>
                  <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-foreground/85">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2"><span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />{b}</li>
                    ))}
                  </ul>
                  <Link to="/services/$slug" params={{ slug: s.slug }} className="mt-6 inline-flex items-center gap-1.5 text-tertiary font-semibold">
                    Read full description <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
