import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarCheck, Phone, CheckCircle2 } from "lucide-react";
import { CLINIC, SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = SERVICES.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return { service: s };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    return {
      meta: s ? [
        { title: `${s.title} — GME Global Medical Excellence` },
        { name: "description", content: s.short },
        { property: "og:title", content: s.title },
        { property: "og:description", content: s.short },
        { property: "og:url", content: `/services/${s.slug}` },
      ] : [],
      links: s ? [{ rel: "canonical", href: `/services/${s.slug}` }] : [],
    };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-6 py-24 text-center">
      <h1 className="font-display text-3xl">Service not found</h1>
      <Link to="/services" className="mt-4 inline-flex text-tertiary font-semibold">Back to services</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="container mx-auto px-6 py-24"><p>{error.message}</p></div>,
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const others = SERVICES.filter((x) => x.slug !== s.slug);

  return (
    <>
      <section className="bg-gradient-soft border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-10">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-sm text-tertiary font-medium hover:underline">
            <ArrowLeft className="size-4" /> All services
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-14 md:py-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <p className="text-xs uppercase tracking-[0.3em] text-tertiary font-semibold">Services</p>
          <h1 className="mt-2 text-4xl md:text-6xl font-display leading-[1.05]">{s.title}</h1>
          <p className="mt-5 text-lg text-foreground/85 leading-relaxed">{s.short}</p>
          <div className="mt-8 space-y-4 text-foreground/85 leading-relaxed text-[17px]">
            <p>{s.long}</p>
          </div>

          <div className="mt-10 rounded-3xl bg-mist p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-tertiary font-semibold">What's included</div>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {s.bullets.map((b: string) => (
                <li key={b} className="flex gap-2.5 text-sm">
                  <CheckCircle2 className="size-5 text-tertiary shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 rounded-3xl bg-gradient-hero p-8 shadow-card" style={{ color: "white" }}>
            <div className="text-xs uppercase tracking-[0.25em] opacity-80">Get started</div>
            <h3 className="mt-1 font-display text-2xl">Talk to a real physician.</h3>
            <p className="mt-3 text-white/85 text-sm">Same-week appointments often available. New patients welcome.</p>
            <div className="mt-6 flex flex-col gap-2">
              <a href={CLINIC.bookingUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-tertiary font-semibold">
                <CalendarCheck className="size-4" /> Book Now
              </a>
              <a href={CLINIC.phoneHref} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-white/20 font-medium">
                <Phone className="size-4" /> {CLINIC.phone}
              </a>
            </div>
          </div>
        </aside>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-24">
        <div className="text-xs uppercase tracking-[0.25em] text-tertiary font-semibold mb-4">Other services</div>
        <div className="grid sm:grid-cols-3 gap-4">
          {others.map((o) => (
            <Link key={o.slug} to="/services/$slug" params={{ slug: o.slug }} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 shadow-soft transition group">
              <div className="font-display text-lg">{o.title}</div>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{o.short}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-tertiary font-semibold">Read more <ArrowRight className="size-4 group-hover:translate-x-1 transition" /></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
