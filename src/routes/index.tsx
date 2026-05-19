import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Stethoscope, Sparkles, ShieldCheck, UserCheck, ArrowRight, CalendarCheck,
  Phone, Star, Quote, ChevronLeft, ChevronRight, X, BadgeCheck, GraduationCap,
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
import { ctaClass } from "@/components/site/CTAButton";
import { InsuranceLogoCard } from "@/components/site/InsuranceLogoCard";

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
    <section className="relative isolate">
      <div className="relative h-screen min-h-[600px] w-full overflow-hidden">
        {SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
            aria-hidden={idx !== i}
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={s.img}
                alt=""
                className={`absolute inset-0 min-w-full min-h-full object-cover ${idx === i ? "animate-ken" : ""}`}
                width={1920}
                height={1080}
                loading={idx === 0 ? "eager" : "lazy"}
                fetchPriority={idx === 0 ? "high" : undefined}
              />
            </div>
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
                className={ctaClass({ variant: "primary", size: "lg" })}
              >
                <CalendarCheck /> Book Now
              </a>
              <a
                href={CLINIC.phoneHref}
                className={ctaClass({ variant: "glass", size: "lg" })}
              >
                <Phone /> {CLINIC.phone}
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

function AboutSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative grid lg:grid-cols-12 gap-0 items-center min-h-[620px]">

          {/* ── Image col with gradient wipe ── */}
          <div className="lg:col-span-5 relative h-[420px] lg:h-full">
            {/* Bleeds to the left edge */}
            <div className="absolute inset-y-0 right-0 left-[calc(-50vw+50%)] overflow-hidden">
              <img
                src={heroConsult}
                alt="Doctor talking with patient"
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
                width={800}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent" />

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background" />
            </div>
          </div>

          {/* ── Text col ── */}
          <div className="lg:col-span-7 lg:pl-12 pt-8 lg:pt-0">
            <p className="text-xs uppercase tracking-[0.3em] text-tertiary font-semibold">About GME</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-display leading-[1.1] text-balance">
              The best medicine starts with a{" "}
              <span className="text-gradient">genuine connection.</span>
            </h2>
            <div className="mt-6 space-y-4 text-foreground/80 leading-relaxed">
              <p>
                As a small group, two-physician-owned clinic, we've traded the
                big-commercial-corporate feel for a more personal approach to your
                care. Here, you aren't a chart number — you are a neighbor who
                deserves the focused attention of a doctor every single time you
                walk through our doors.
              </p>
              <p>
                Our two fully board-certified physicians bring more than 30 years
                of combined experience. Beyond the clinic, they serve as Directors
                of Graduate Medical Education, mentoring the next generation of
                doctors who train alongside them.
              </p>
            </div>

            {/* "card" content moved inline as a subtle stat row */}
            <div className="mt-6 pt-6 border-t border-border flex items-center gap-6">
              <div>
                <div className="font-display text-2xl text-gradient">30+</div>
                <div className="text-xs text-muted-foreground mt-0.5">Years combined</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <div className="font-display text-2xl text-gradient">2</div>
                <div className="text-xs text-muted-foreground mt-0.5">Board-certified MDs</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-sm text-muted-foreground italic leading-snug max-w-[12rem]">
                Physician-owned since day one.
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className={ctaClass({ variant: "solid", size: "lg" })}>
                Read our full story <ArrowRight />
              </Link>
              <Link to="/physicians" className={ctaClass({ variant: "outline", size: "lg" })}>
                Meet the physicians
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------------- PHYSICIANS ---------------- */
function PhysiciansSection() {
  return (
    <section className="relative bg-gradient-soft overflow-hidden">
      <div aria-hidden className="absolute -top-32 -left-24 size-[28rem] rounded-full bg-primary/15 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 -right-24 size-[28rem] rounded-full bg-accent/20 blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-tertiary font-semibold">Our Physicians</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-display leading-[1.05] text-balance">
              Meet the doctors who will <span className="text-gradient">actually treat you.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted-foreground leading-relaxed">
            Both board-certified internists. Both Directors of Graduate Medical Education at Valley Hospital. Both here, every visit — never a stand-in.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {PHYSICIANS.map((p, idx) => {
            const img = p.slug === "dr-mark-lopez" ? drMark : drScott;
            const role = p.title.split("·")[0].trim();
            const sub = p.title.split("·").slice(1).join(" · ").trim();
            return (
              <article key={p.slug} className="group relative">
                <div className="absolute -top-6 -left-2 font-display text-7xl md:text-8xl text-gradient opacity-25 select-none pointer-events-none">
                  0{idx + 1}
                </div>

                <div className="relative rounded-[2rem] bg-card border border-border shadow-soft overflow-hidden hover:shadow-card transition">
                  <div className="grid grid-cols-5 min-h-[20rem]">
                    <div className="col-span-2 relative overflow-hidden">
                      <img
                        src={img}
                        alt={p.name}
                        loading="lazy"
                        width={800}
                        height={1000}
                        className="absolute inset-0 size-full object-cover group-hover:scale-105 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-white/85 backdrop-blur text-tertiary rounded-full px-2 py-1">
                        <BadgeCheck className="size-3" /> Certified
                      </span>
                    </div>

                    <div className="col-span-3 p-5 sm:p-6 flex flex-col">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-tertiary font-semibold">{role}</div>
                      <h3 className="font-display text-xl sm:text-2xl mt-1 leading-tight">{p.name}</h3>
                      {sub && <div className="text-xs text-muted-foreground mt-1 leading-snug">{sub}</div>}

                      <p className="text-sm text-foreground/75 mt-3 leading-relaxed line-clamp-4 flex-1">{p.short}</p>

                      <div className="mt-4 pt-4 border-t border-border flex items-center gap-3 text-xs text-muted-foreground">
                        <GraduationCap className="size-4 text-tertiary shrink-0" />
                        <span className="leading-snug">{p.credentials[0]}</span>
                      </div>

                      <Link
                        to="/physicians/$slug"
                        params={{ slug: p.slug }}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-tertiary hover:gap-2.5 transition-all"
                      >
                        View full profile <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/physicians" className={ctaClass({ variant: "outline", size: "lg" })}>
            Meet the full team <ArrowRight />
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
              className={ctaClass({ variant: "solid", size: "lg", className: "mt-6" })}
            >
              View full network list <ArrowRight />
            </button>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INSURANCE_FEATURED.map((n) => (
              <InsuranceLogoCard key={n} name={n} />
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
    <section className="container mx-auto px-4 sm:px-6 py-20">
      <div className="rounded-[2rem] border border-border bg-card p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between shadow-soft">
        <div>
          <h2 className="text-2xl md:text-3xl font-display">Ready for a doctor who remembers your name?</h2>
          <p className="mt-2 text-muted-foreground">Same-week appointments often available. New patients welcome.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <a href={CLINIC.bookingUrl} target="_blank" rel="noreferrer" className={ctaClass({ variant: "primary", size: "lg" })}>
            <CalendarCheck /> Book Now
          </a>
          <a href={CLINIC.phoneHref} className={ctaClass({ variant: "outline", size: "lg" })}>
            <Phone /> {CLINIC.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
