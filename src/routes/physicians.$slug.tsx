import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarCheck, Phone, BadgeCheck } from "lucide-react";
import { CLINIC, PHYSICIANS, type PhysicianSlug } from "@/lib/site-data";
import { ctaClass } from "@/components/site/CTAButton";
import drScott from "@/assets/dr-scott.jpg";
import drMark from "@/assets/dr-mark.png";

export const Route = createFileRoute("/physicians/$slug")({
  loader: ({ params }) => {
    const p = PHYSICIANS.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { physician: p };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.physician;
    return {
      meta: p ? [
        { title: `${p.name} — GME Global Medical Excellence` },
        { name: "description", content: p.short },
        { property: "og:title", content: p.name },
        { property: "og:description", content: p.short },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: `/physicians/${p.slug}` },
      ] : [],
      links: p ? [{ rel: "canonical", href: `/physicians/${p.slug}` }] : [],
    };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-6 py-24 text-center">
      <h1 className="font-display text-3xl">Physician not found</h1>
      <Link to="/physicians" className="mt-4 inline-flex text-tertiary font-semibold">Back to physicians</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="container mx-auto px-6 py-24"><p>{error.message}</p></div>,
  component: PhysicianPage,
});

function PhysicianPage() {
  const { physician: p } = Route.useLoaderData();
  const img = p.slug === ("dr-mark-lopez" as PhysicianSlug) ? drMark : drScott;
  const other = PHYSICIANS.find((x) => x.slug !== p.slug)!;

  return (
    <>
      <section className="bg-gradient-soft border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 pt-32 md:pt-36 lg:pt-40 pb-10">
          <Link to="/physicians" className="inline-flex items-center gap-1.5 text-sm text-tertiary font-medium hover:underline">
            <ArrowLeft className="size-4" /> All physicians
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-12 md:py-20 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-card">
            <img src={img} alt={p.name} className="size-full object-cover" width={1000} height={1250} />
          </div>
          <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="text-xs uppercase tracking-widest text-tertiary font-semibold mb-3">Credentials</div>
            <ul className="space-y-2">
              {p.credentials.map((c: string) => (
                <li key={c} className="flex gap-2 text-sm">
                  <BadgeCheck className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.3em] text-tertiary font-semibold">{p.title}</p>
          <h1 className="mt-2 text-4xl md:text-6xl font-display leading-[1.05]">{p.name}</h1>
          <div className="mt-6 space-y-4 text-foreground/85 leading-relaxed text-[17px]">
            {p.bio.map((para: string, i: number) => <p key={i}>{para}</p>)}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={CLINIC.bookingUrl} target="_blank" rel="noreferrer" className={ctaClass({ variant: "primary", size: "lg" })}>
              <CalendarCheck /> Book with {p.name.split(" ")[1]}
            </a>
            <a href={CLINIC.phoneHref} className={ctaClass({ variant: "outline", size: "lg" })}>
              <Phone /> {CLINIC.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-24">
        <Link to="/physicians/$slug" params={{ slug: other.slug }} className="block rounded-3xl border border-border bg-card p-8 hover:border-primary/50 transition shadow-soft">
          <div className="text-xs uppercase tracking-[0.2em] text-tertiary">Next physician</div>
          <div className="mt-1 flex items-center justify-between gap-4">
            <div>
              <div className="font-display text-2xl">{other.name}</div>
              <div className="text-sm text-muted-foreground mt-1">{other.title}</div>
            </div>
            <ArrowRight className="size-6 text-tertiary" />
          </div>
        </Link>
      </section>
    </>
  );
}
