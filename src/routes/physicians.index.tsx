import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PHYSICIANS } from "@/lib/site-data";
import drScott from "@/assets/dr-scott.jpg";
import drMark from "@/assets/dr-mark.png";

export const Route = createFileRoute("/physicians/")({
  head: () => ({
    meta: [
      { title: "Our Physicians — GME Global Medical Excellence" },
      { name: "description", content: "Meet Dr. Scott Silver and Dr. Mark Lopez — dual board-certified internists and Directors of Graduate Medical Education in Las Vegas." },
      { property: "og:title", content: "Meet the GME Physicians" },
      { property: "og:description", content: "Two board-certified internists. 30+ years combined experience. Real, physician-led care." },
      { property: "og:url", content: "/physicians" },
    ],
    links: [{ rel: "canonical", href: "/physicians" }],
  }),
  component: PhysiciansIndex,
});

function PhysiciansIndex() {
  return (
    <>
      <section className="bg-gradient-hero" style={{ color: "white" }}>
        <div className="container mx-auto px-4 sm:px-6 py-20 md:py-24">
          <p className="text-xs uppercase tracking-[0.3em] opacity-80">Our Physicians</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-display max-w-3xl leading-[1.05]">Two doctors. One standard of care.</h1>
          <p className="mt-5 text-white/85 max-w-2xl text-lg">Both fully board-certified. Both Directors of Graduate Medical Education. Both here, every visit.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-8">
        {PHYSICIANS.map((p) => (
          <article key={p.slug} className="rounded-3xl overflow-hidden bg-card border border-border shadow-soft flex flex-col">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={p.slug === "dr-mark-lopez" ? drMark : drScott} alt={p.name} className="size-full object-cover" loading="lazy" width={800} height={1000} />
            </div>
            <div className="p-7 flex-1 flex flex-col">
              <div className="text-xs uppercase tracking-[0.2em] text-tertiary font-semibold">{p.title}</div>
              <h2 className="mt-2 font-display text-2xl">{p.name}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{p.short}</p>
              <Link to="/physicians/$slug" params={{ slug: p.slug }} className="mt-5 inline-flex items-center gap-1.5 text-tertiary font-semibold">
                Full profile <ArrowRight className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
