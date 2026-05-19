import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, CalendarCheck, Phone, GraduationCap, Award } from "lucide-react";
import { CLINIC, PHYSICIANS } from "@/lib/site-data";
import { ctaClass } from "@/components/site/CTAButton";
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

const IMG = { "dr-scott-silver": drScott, "dr-mark-lopez": drMark } as const;

function PhysiciansIndex() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-hero overflow-hidden" style={{ color: "white" }}>
        <div className="absolute -top-32 -right-24 size-[28rem] rounded-full bg-primary/30 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-24 size-[28rem] rounded-full bg-accent/25 blur-3xl" aria-hidden />
        <div className="relative container mx-auto px-4 sm:px-6 py-20 md:py-28 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-[0.3em] opacity-80">Our Physicians</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-display leading-[1.02] max-w-3xl">
              Two doctors. <span className="italic opacity-90">One</span> standard of care.
            </h1>
            <p className="mt-5 text-white/85 max-w-xl text-base md:text-lg">
              Both fully board-certified. Both Directors of Graduate Medical Education. Both here, every visit — never a stand-in.
            </p>
          </div>
          <dl className="lg:col-span-4 grid grid-cols-3 gap-4 text-center">
            {[
              { k: "30+", v: "Years combined" },
              { k: "2", v: "Board-certified MDs" },
              { k: "100%", v: "Physician-delivered" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 py-4 px-2">
                <dt className="font-display text-2xl md:text-3xl">{s.k}</dt>
                <dd className="text-[11px] uppercase tracking-wider opacity-80 mt-1">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* PHYSICIAN CARDS — alternating editorial layout */}
      <section className="container mx-auto px-4 sm:px-6 py-20 md:py-28 space-y-20 md:space-y-28">
        {PHYSICIANS.map((p, idx) => {
          const reverse = idx % 2 === 1;
          const topCreds = p.credentials.slice(0, 4);
          return (
            <article key={p.slug} className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Image side */}
              <div className={`lg:col-span-5 ${reverse ? "lg:order-2" : ""}`}>
                <div className="relative">
                  <div aria-hidden className="absolute -inset-4 rounded-[2.5rem] bg-gradient-brand opacity-20 blur-2xl" />
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-card ring-1 ring-border">
                    <img
                      src={IMG[p.slug]}
                      alt={p.name}
                      className="size-full object-cover"
                      loading="lazy"
                      width={1000}
                      height={1250}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/70 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3" style={{ color: "white" }}>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.25em] opacity-80">Co-Founder</div>
                        <div className="font-display text-xl">{p.name}</div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider bg-white/15 backdrop-blur border border-white/25 rounded-full px-2.5 py-1">
                        <BadgeCheck className="size-3.5" /> Board Certified
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className={`lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs uppercase tracking-[0.25em] text-tertiary font-semibold">{p.title.split("·")[0].trim()}</span>
                </div>

                <h2 className="mt-5 font-display text-3xl md:text-5xl leading-[1.05]">{p.name}</h2>
                <p className="mt-2 text-tertiary font-medium">{p.title.split("·").slice(1).join(" · ").trim()}</p>

                <p className="mt-5 text-foreground/80 leading-relaxed max-w-xl">{p.short}</p>

                <ul className="mt-6 grid sm:grid-cols-2 gap-2.5 max-w-xl">
                  {topCreds.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Award className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/physicians/$slug"
                    params={{ slug: p.slug }}
                    className={ctaClass({ variant: "solid", size: "lg" })}
                  >
                    Full profile <ArrowRight />
                  </Link>
                  <a href={CLINIC.bookingUrl} target="_blank" rel="noreferrer" className={ctaClass({ variant: "outline", size: "lg" })}>
                    <CalendarCheck /> Book with {p.name.split(" ")[1]}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* CTA strip */}
      <section className="container mx-auto px-4 sm:px-6 pb-24">
        <div className="rounded-[2rem] bg-gradient-hero p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between" style={{ color: "white" }}>
          <div className="max-w-xl">
            <h3 className="font-display text-2xl md:text-3xl">Not sure which doctor to start with?</h3>
            <p className="mt-2 text-white/85">Call us — we'll match you with the right physician for your needs.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={CLINIC.phoneHref} className={ctaClass({ variant: "glass", size: "lg" })}>
              <Phone /> {CLINIC.phone}
            </a>
            <a href={CLINIC.bookingUrl} target="_blank" rel="noreferrer" className={ctaClass({ variant: "primary", size: "lg" })}>
              <CalendarCheck /> Book Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
