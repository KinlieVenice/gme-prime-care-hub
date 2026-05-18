import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, GraduationCap, Users } from "lucide-react";
import heroConsult from "@/assets/hero-consult.jpg";
import { CLINIC } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About GME — Physician-Owned Clinic in Las Vegas" },
      { name: "description", content: "A small, two-physician, board-certified primary care practice in Las Vegas. 30+ years of combined experience. Mentors of the next generation of doctors." },
      { property: "og:title", content: "About GME Global Medical Excellence" },
      { property: "og:description", content: "Two physicians. 30+ years combined. Built on continuity, time, and trust." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative bg-gradient-hero" style={{ color: "white" }}>
        <div className="container mx-auto px-4 sm:px-6 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.3em] opacity-80">About Us</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-display max-w-3xl leading-[1.05]">
            A small clinic with a big-picture view of your health.
          </h1>
          <p className="mt-5 text-white/85 max-w-2xl text-lg">
            Two physicians. One philosophy. Built on real relationships, longer appointments, and decisions made by board-certified doctors — not algorithms.
          </p>
        </div>
      </section>

    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── Bento grid ── */}
          <div className="lg:col-span-5 grid grid-cols-2 grid-rows-3 gap-3 h-[520px]">

            {/* Tall left — main consult shot */}
            <div className="row-span-2 rounded-xl overflow-hidden relative">
              <img src={heroConsult} alt="Doctor with patient" className="size-full object-cover" style={{ filter: "saturate(0.82) contrast(1.05)" }} loading="lazy" width={400} height={600} />
              <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, mixBlendMode: "overlay", opacity: 0.25 }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 45%, oklch(0.18 0.045 220 / 0.3) 100%)" }} />
            </div>

            {/* Top right — second photo (swap src to another clinic img) */}
            <div className="rounded-xl overflow-hidden relative">
              <img src={heroConsult} alt="Clinic interior" className="size-full object-cover object-top" style={{ filter: "saturate(0.82) contrast(1.05)" }} loading="lazy" width={400} height={300} />
              <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, mixBlendMode: "overlay", opacity: 0.25 }} />
            </div>

            {/* Middle right — teal stat tile */}
            <div className="rounded-xl flex flex-col items-center justify-center gap-1 bg-tertiary text-tertiary-foreground">
              <div className="font-display text-4xl">30+</div>
              <div className="text-xs uppercase tracking-widest opacity-75">Years combined</div>
            </div>

            {/* Bottom left — wide spanning tile, third photo */}
            <div className="col-span-2 rounded-xl overflow-hidden relative">
              <img src={heroConsult} alt="GME team" className="size-full object-cover object-bottom" style={{ filter: "saturate(0.82) contrast(1.05)" }} loading="lazy" width={800} height={300} />
              <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, mixBlendMode: "overlay", opacity: 0.25 }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 45%, oklch(0.18 0.045 220 / 0.3) 100%)" }} />
              {/* label pinned to bottom-left */}
              <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-white/70 font-semibold">Physician-owned · Since day one</div>
            </div>

          </div>

          {/* ── Text col ── */}
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-tertiary font-semibold">About GME</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-display leading-[1.1] text-balance">
              The best medicine starts with a{" "}
              <span className="text-gradient">genuine connection.</span>
            </h2>
            <div className="mt-6 space-y-4 text-foreground/85 leading-relaxed">
            <p>At our practice, we believe the best medicine starts with a genuine connection. As a small group, two-physician-owned clinic, we've traded the "big commercial corporate" feel for a more personal approach to your care. Here, you aren't just a chart number — you are a neighbor who deserves the focused attention of a doctor every single time you walk through our doors.</p>
            <p>Our two fully board-certified physicians bring more than 30 years of combined experience to your care. Beyond the clinic, they serve as Directors of Graduate Medical Education, sharing their passion and expertise to mentor the next generation of doctors, who work alongside them.</p>
            <p>We invite you to experience healthcare where expertise meets a personal touch, and where your well-being is always in the hands of a dedicated expert.</p>
          </div>
            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between gap-6">
              <div className="text-sm text-muted-foreground italic leading-snug">
                "You are a neighbor, not a chart number."
              </div>

            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              
            </div>
          </div>

        </div>
      </div>
    </section>

      <section className="container mx-auto px-4 sm:px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: HeartPulse, t: "Patient-first", b: "Long visits. No revolving door. The same doctor each time." },
            { icon: GraduationCap, t: "Educators of medicine", b: "Both physicians serve as Directors of Graduate Medical Education." },
            { icon: Users, t: "Physician-owned", b: "We answer to you — not a corporate quarterly target." },
          ].map((i) => (
            <div key={i.t} className="p-7 rounded-3xl bg-card border border-border shadow-soft">
              <div className="size-12 rounded-xl bg-gradient-brand grid place-items-center mb-4"><i.icon className="size-6" style={{ color: "white" }} /></div>
              <div className="font-display text-xl">{i.t}</div>
              <p className="text-sm text-muted-foreground mt-1.5">{i.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-24">
        <div className="rounded-[2rem] bg-mist p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-display">Meet the physicians behind GME.</h2>
            <p className="mt-2 text-muted-foreground">Get to know Dr. Silver and Dr. Lopez — their training, their service, and their approach.</p>
          </div>
          <div className="flex flex-col justify-start md:flex-row gap-3">
            <Link to="/physicians" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-tertiary text-tertiary-foreground font-semibold">View physicians <ArrowRight className="size-4" /></Link>
            <a href={CLINIC.bookingUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-brand font-semibold" style={{ color: "white" }}>Book Now</a>
          </div>
        </div>
      </section>
    </>
  );
}
