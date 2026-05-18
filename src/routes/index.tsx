import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Stethoscope, Sparkles, ShieldCheck, UserCheck, ArrowRight, CalendarCheck,
  Phone, Star, Quote, ChevronLeft, ChevronRight, X,
} from "lucide-react";
import heroClinic from "@/assets/hero-clinic.jpg";
import heroConsult from "@/assets/hero-consult.jpg";
import heroTools from "@/assets/hero-tools.jpg";
import drScott from "@/assets/dr-scott.jpg";
import drMark from "@/assets/dr-mark.png";
import {
  CLINIC, SERVICES, PHYSICIANS, AFFILIATIONS,
  INSURANCE_FEATURED, INSURANCE_ALL, TESTIMONIALS,
} from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GME Global Medical Excellence — Physician-Led Care in Las Vegas" },
      { name: "description", content: "Two doctors. Decades of combined experience. Zero mid-level extenders. Primary care, lifestyle medicine, and addiction care in Las Vegas." },
      { property: "og:title", content: "GME Global Medical Excellence" },
      { property: "og:description", content: "Physician-led primary care, lifestyle medicine, and addiction care in Las Vegas." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const SLIDES = [
  {
    img: heroClinic,
    eyebrow: "Welcome to GME",
    title: "Healthcare where your doctor actually knows you.",
    body: "A small, two-physician clinic in Las Vegas — built on long appointments, longer relationships, and decisions made by board-certified doctors.",
  },
  {
    img: heroConsult,
    eyebrow: "Physician-Led",
    title: "Every visit. Every decision. A real physician.",
    body: "No mid-level extenders. Just two board-certified internists with 30+ combined years of experience and time to listen.",
  },
  {
    img: heroTools,
    eyebrow: "Modern Medicine, Personal Touch",
    title: "Primary care, lifestyle medicine, and recovery — under one roof.",
    body: "From annual physicals to hormone optimization to MAT — coordinated by the same doctor who takes your call.",
  },
];

function HomePage() {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <PhysiciansSection />
      <AffiliationsMarquee />
      <ServicesSection />
      <InsuranceSection />
      <CommitmentSection />
      <TestimonialsStrip />
      <CtaBand />
    </>
  );
}

/* ---------------- HERO ---------------- */
function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, []);
  const go = (d: number) => setI((v) => (v + d + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative h-[88vh] min-h-[620px] w-full">
        {SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
            aria-hidden={idx !== i}
          >
            <img
              src={s.img}
              alt=""
              className={`absolute inset-0 size-full object-cover ${idx === i ? "animate-ken" : ""}`}
              width={1920}
              height={1080}
              loading={idx === 0 ? "eager" : "lazy"}
              fetchPriority={idx === 0 ? "high" : undefined}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
        ))}

        <div className="relative h-full container mx-auto px-4 sm:px-6 flex items-center">
          <div className="max-w-2xl" style={{ color: "white" }}>
            <div key={`eyebrow-${i}`} className="animate-fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs uppercase tracking-[0.25em]">
              <span className="size-1.5 rounded-full bg-primary" /> {SLIDES[i].eyebrow}
            </div>
            <h1 key={`t-${i}`} className="animate-fade-up mt-5 text-4xl md:text-6xl lg:text-7xl font-display leading-[1.05] text-balance">
              {SLIDES[i].title}
            </h1>
            <p key={`b-${i}`} className="animate-fade-up mt-5 text-base md:text-lg text-white/85 max-w-xl">
              {SLIDES[i].body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={CLINIC.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-brand font-semibold shadow-glow hover:scale-[1.02] transition"
              >
                <CalendarCheck className="size-5" /> Book Now
              </a>
              <a
                href={CLINIC.phoneHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 backdrop-blur border border-white/25 font-medium hover:bg-white/15"
              >
                <Phone className="size-5" /> {CLINIC.phone}
              </a>
            </div>
          </div>
        </div>

        {/* controls */}
        <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2">
          <button onClick={() => go(-1)} className="p-2.5 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20" aria-label="Previous slide" style={{ color: "white" }}>
            <ChevronLeft className="size-5" />
          </button>
          <button onClick={() => go(1)} className="p-2.5 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20" aria-label="Next slide" style={{ color: "white" }}>
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* dots */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-32 flex items-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-primary" : "w-4 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>

      {/* trust strip */}
      <div className="border-y border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          {[
            { k: "30+", v: "Years combined experience" },
            { k: "100%", v: "Physician-delivered care" },
            { k: "2", v: "Board-certified doctors" },
            { k: "1", v: "Patient at a time" },
          ].map((s) => (
            <div key={s.v} className="md:flex md:items-center md:gap-3">
              <div className="text-3xl font-display text-gradient">{s.k}</div>
              <div className="text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function AboutSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-20 md:py-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      <div className="lg:col-span-5 relative">
        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-card">
          <img src={heroConsult} alt="Doctor talking with patient" className="size-full object-cover" loading="lazy" width={800} height={1000} />
        </div>
        <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-card border border-border rounded-2xl shadow-card p-5 max-w-[16rem]">
          <div className="text-xs uppercase tracking-widest text-tertiary font-semibold">Since day one</div>
          <div className="font-display text-lg mt-1">Physician-owned. Patient-first.</div>
        </div>
      </div>
      <div className="lg:col-span-7">
        <p className="text-xs uppercase tracking-[0.3em] text-tertiary font-semibold">About GME</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-display leading-[1.1] text-balance">
          The best medicine starts with a <span className="text-gradient">genuine connection.</span>
        </h2>
        <div className="mt-6 space-y-4 text-foreground/80 leading-relaxed">
          <p>
            As a small group, two-physician-owned clinic, we've traded the big-commercial-corporate feel for a more personal approach to your care. Here, you aren't a chart number — you are a neighbor who deserves the focused attention of a doctor every single time you walk through our doors.
          </p>
          <p>
            Our two fully board-certified physicians bring more than 30 years of combined experience. Beyond the clinic, they serve as Directors of Graduate Medical Education, mentoring the next generation of doctors who train alongside them.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/about" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-tertiary text-tertiary-foreground font-semibold hover:opacity-95">
            Read our full story <ArrowRight className="size-4" />
          </Link>
          <Link to="/physicians" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-tertiary font-medium">
            Meet the physicians
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PHYSICIANS ---------------- */
function PhysiciansSection() {
  return (
    <section className="bg-gradient-soft">
      <div className="container mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-tertiary font-semibold">Our Physicians</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-display leading-[1.1]">Two doctors. One philosophy.</h2>
          <p className="mt-4 text-muted-foreground">Both board-certified. Both Directors of Graduate Medical Education. Both here to know your name.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6 lg:gap-8">
          {PHYSICIANS.map((p) => (
            <Link
              key={p.slug}
              to="/physicians/$slug"
              params={{ slug: p.slug }}
              className="group relative rounded-3xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-card transition"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.slug === "dr-mark-lopez" ? drMark : drScott}
                  alt={p.name}
                  loading="lazy"
                  width={800} height={1000}
                  className="size-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7" style={{ color: "white" }}>
                <div className="text-xs uppercase tracking-[0.25em] opacity-80">{p.title.split("·")[0]}</div>
                <h3 className="font-display text-2xl md:text-3xl mt-1">{p.name}</h3>
                <p className="text-sm text-white/85 mt-2 line-clamp-3 max-w-md">{p.short}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                  View profile <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/physicians" className="inline-flex items-center gap-2 text-tertiary font-semibold hover:underline">
            Meet the full team <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- AFFILIATIONS ---------------- */
function AffiliationsMarquee() {
  const list = [...AFFILIATIONS, ...AFFILIATIONS];
  return (
    <section className="border-y border-border bg-tertiary text-tertiary-foreground overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-6 flex items-center gap-6">
        <div className="shrink-0 text-xs uppercase tracking-[0.3em] opacity-80 hidden md:block">Affiliations</div>
        <div className="flex-1 overflow-hidden">
          <div className="flex w-max gap-12 animate-marquee">
            {list.map((a, i) => (
              <span key={i} className="text-sm md:text-base font-medium opacity-90 whitespace-nowrap flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-primary" />
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
const SERVICE_ICONS = {
  "primary-care": Stethoscope,
  "lifestyle-medicine": Sparkles,
  "addiction-care": ShieldCheck,
  "all-physician-group": UserCheck,
} as const;

function ServicesSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-tertiary font-semibold">Services</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-display leading-[1.1]">Care that meets you where you are.</h2>
        </div>
        <Link to="/services" className="inline-flex items-center gap-2 text-tertiary font-semibold self-start md:self-auto">
          See all services <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SERVICES.map((s, i) => {
          const Icon = SERVICE_ICONS[s.slug];
          const featured = i === 0;
          return (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className={`group relative p-6 lg:p-7 rounded-3xl border transition-all hover:-translate-y-1 ${
                featured
                  ? "bg-gradient-hero text-white border-transparent shadow-glow"
                  : "bg-card border-border shadow-soft hover:shadow-card hover:border-primary/40"
              }`}
              style={featured ? { color: "white" } : undefined}
            >
              <div className={`size-12 rounded-2xl grid place-items-center mb-5 ${featured ? "bg-white/15" : "bg-gradient-brand"}`}>
                <Icon className="size-6" style={{ color: "white" }} />
              </div>
              <h3 className={`font-display text-xl ${featured ? "" : "text-foreground"}`}>{s.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${featured ? "text-white/85" : "text-muted-foreground"}`}>{s.short}</p>
              <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${featured ? "" : "text-tertiary"}`}>
                Learn more <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- INSURANCE ---------------- */
function InsuranceSection() {
  const [open, setOpen] = useState(false);
  return (
    <section className="bg-mist">
      <div className="container mx-auto px-4 sm:px-6 py-20 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-tertiary font-semibold">Insurance</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-display leading-[1.15]">In-network with most major plans.</h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              We accept a wide range of commercial, Medicare, and military health plans. Don't see yours? Call us — we're often able to verify benefits the same day.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-tertiary text-tertiary-foreground font-semibold hover:opacity-95"
            >
              View full network list <ArrowRight className="size-4" />
            </button>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {INSURANCE_FEATURED.map((n) => (
              <div key={n} className="aspect-[5/3] rounded-2xl bg-card border border-border shadow-soft grid place-items-center text-center p-4">
                <span className="text-sm font-semibold text-tertiary">{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Close" />
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-card border border-border rounded-3xl shadow-card overflow-hidden flex flex-col">
            <div className="px-6 py-5 bg-gradient-hero flex items-center justify-between" style={{ color: "white" }}>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] opacity-80">Insurance</div>
                <div className="font-display text-xl">Networks we accept</div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="p-2 rounded-full hover:bg-white/10"><X className="size-5" /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {INSURANCE_ALL.map((n) => (
                  <li key={n} className="flex items-center gap-2 py-1.5 border-b border-border/60">
                    <span className="size-1.5 rounded-full bg-primary" /> {n}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted-foreground">
                List updated regularly. Coverage details can vary by plan; please call <a href={CLINIC.phoneHref} className="text-tertiary font-semibold">{CLINIC.phone}</a> to verify benefits.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------- COMMITMENT ---------------- */
function CommitmentSection() {
  const items = [
    { t: "Time to listen", b: "Longer appointments. Real conversations. No clock running you out." },
    { t: "Continuity of care", b: "You see the same physician — not a rotating cast of providers." },
    { t: "Mentors of medicine", b: "Our doctors train the next generation. Your care benefits from it." },
    { t: "Privacy & dignity", b: "From routine visits to addiction care, your story stays yours." },
  ];
  return (
    <section className="container mx-auto px-4 sm:px-6 py-20 md:py-28">
      <div className="rounded-[2.5rem] overflow-hidden bg-gradient-hero p-8 sm:p-12 lg:p-16 relative" style={{ color: "white" }}>
        <div className="absolute -top-24 -right-24 size-80 rounded-full bg-primary/30 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -left-24 size-80 rounded-full bg-accent/30 blur-3xl" aria-hidden />
        <div className="relative grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] opacity-80">Our Commitment</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-display leading-[1.1]">A practice built on what medicine should feel like.</h2>
            <p className="mt-5 text-white/85 max-w-md">
              We chose to stay small on purpose. It's the only way we can promise what comes next.
            </p>
          </div>
          <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {items.map((i) => (
              <li key={i.t} className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5">
                <div className="font-display text-xl">{i.t}</div>
                <p className="text-sm text-white/80 mt-1.5 leading-relaxed">{i.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS STRIP ---------------- */
function TestimonialsStrip() {
  return (
    <section className="bg-gradient-soft">
      <div className="container mx-auto px-4 sm:px-6 py-20 md:py-24">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-tertiary font-semibold">Patient voices</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-display">What our neighbors say.</h2>
          </div>
          <Link to="/testimonials" className="hidden sm:inline-flex items-center gap-2 text-tertiary font-semibold">All stories <ArrowRight className="size-4" /></Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-3xl bg-card border border-border shadow-soft p-6 flex flex-col">
              <Quote className="size-6 text-primary mb-3" />
              <blockquote className="text-sm text-foreground/85 leading-relaxed flex-1">"{t.quote}"</blockquote>
              <figcaption className="mt-5 pt-4 border-t border-border">
                <div className="flex items-center gap-1 mb-1.5">
                  {Array.from({ length: 5 }).map((_, idx) => <Star key={idx} className="size-3.5 fill-primary text-primary" />)}
                </div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA BAND ---------------- */
function CtaBand() {
  return (
    <section className="container mx-auto px-4 sm:px-6 pt-4">
      <div className="rounded-[2rem] border border-border bg-card p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between shadow-soft">
        <div>
          <h2 className="text-2xl md:text-3xl font-display">Ready for a doctor who remembers your name?</h2>
          <p className="mt-2 text-muted-foreground">Same-week appointments often available. New patients welcome.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <a href={CLINIC.bookingUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-brand font-semibold shadow-glow" style={{ color: "white" }}>
            <CalendarCheck className="size-5" /> Book Now
          </a>
          <a href={CLINIC.phoneHref} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border hover:border-tertiary font-medium">
            <Phone className="size-5 text-tertiary" /> {CLINIC.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
