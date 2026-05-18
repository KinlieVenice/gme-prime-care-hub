import { createFileRoute } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS, CLINIC } from "@/lib/site-data";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — GME Global Medical Excellence" },
      { name: "description", content: "Stories from neighbors and patients of GME in Las Vegas." },
      { property: "og:title", content: "Patient Stories — GME" },
      { property: "og:description", content: "What our patients say about physician-led care at GME." },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

const EXTRA = [
  { name: "Marcus B.", role: "Patient since 2022", quote: "First clinic where I felt heard. They actually called to follow up." },
  { name: "Elena V.", role: "Hormone therapy patient", quote: "The plan they built around my labs was specific, careful, and explained step by step." },
  { name: "Robert H.", role: "Patient since 2018", quote: "Two physicians who actually run the place. You feel it the moment you walk in." },
  { name: "Anna P.", role: "Primary care patient", quote: "Appointments don't feel rushed. Big difference from anywhere else I've been in Vegas." },
];

function TestimonialsPage() {
  const all = [...TESTIMONIALS, ...EXTRA];
  return (
    <>
      <section className="bg-gradient-hero" style={{ color: "white" }}>
        <div className="container mx-auto px-4 sm:px-6 py-20 md:py-24">
          <p className="text-xs uppercase tracking-[0.3em] opacity-80">Testimonials</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-display max-w-3xl leading-[1.05]">In our patients' own words.</h1>
          <p className="mt-5 text-white/85 max-w-2xl text-lg">Stories collected from neighbors who walked through our doors and stayed.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {all.map((t, i) => (
          <figure key={i} className="rounded-3xl bg-card border border-border shadow-soft p-7 flex flex-col">
            <Quote className="size-6 text-primary mb-3" />
            <blockquote className="text-foreground/85 leading-relaxed flex-1">"{t.quote}"</blockquote>
            <figcaption className="mt-5 pt-4 border-t border-border">
              <div className="flex items-center gap-1 mb-1.5">
                {Array.from({ length: 5 }).map((_, idx) => <Star key={idx} className="size-3.5 fill-primary text-primary" />)}
              </div>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-24">
        <div className="rounded-3xl bg-mist p-8 md:p-10 text-center">
          <h2 className="font-display text-2xl md:text-3xl">Want to share your story?</h2>
          <p className="mt-2 text-muted-foreground">Email us at <a className="text-tertiary font-semibold" href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a></p>
        </div>
      </section>
    </>
  );
}
