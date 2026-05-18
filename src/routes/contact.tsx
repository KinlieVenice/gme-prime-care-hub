import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, CalendarCheck } from "lucide-react";
import { CLINIC } from "@/lib/site-data";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — GME Global Medical Excellence" },
      { name: "description", content: "Reach GME in Las Vegas. Call, email, or book online. 700 Shadow Lane Suite #165, Las Vegas, NV 89106." },
      { property: "og:title", content: "Contact GME" },
      { property: "og:description", content: "Call (702) 550-6777 or book online." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="bg-gradient-hero" style={{ color: "white" }}>
        <div className="container mx-auto px-4 sm:px-6 py-20 md:py-24">
          <p className="text-xs uppercase tracking-[0.3em] opacity-80">Contact</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-display max-w-3xl leading-[1.05]">We'd love to hear from you.</h1>
          <p className="mt-5 text-white/85 max-w-2xl text-lg">Call us, email us, or stop by Shadow Lane. A real person — usually at the front desk by 8 AM.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-5">
          {[
            { icon: Phone, label: "Call us", value: CLINIC.phone, href: CLINIC.phoneHref },
            { icon: Mail, label: "Email us", value: CLINIC.email, href: `mailto:${CLINIC.email}` },
            { icon: MapPin, label: "Visit us", value: `${CLINIC.address.line1}, ${CLINIC.address.line2}` },
          ].map((c) => (
            <a key={c.label} href={c.href} className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-soft hover:border-primary/40 transition">
              <div className="size-12 rounded-xl bg-gradient-brand grid place-items-center shrink-0"><c.icon className="size-5" style={{ color: "white" }} /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-tertiary font-semibold">{c.label}</div>
                <div className="font-medium mt-0.5">{c.value}</div>
              </div>
            </a>
          ))}
          <div className="p-5 rounded-2xl bg-card border border-border shadow-soft">
            <div className="flex gap-3 items-center mb-3"><Clock className="size-5 text-tertiary" /><span className="text-xs uppercase tracking-widest text-tertiary font-semibold">Office hours</span></div>
            <ul className="text-sm space-y-1.5">
              {CLINIC.hours.map((h) => <li key={h.day} className="flex justify-between border-b border-border/60 pb-1"><span>{h.day}</span><span className="text-muted-foreground">{h.time}</span></li>)}
            </ul>
          </div>
          <a href={CLINIC.bookingUrl} target="_blank" rel="noreferrer" className="block text-center px-5 py-4 rounded-2xl bg-gradient-brand font-semibold shadow-glow" style={{ color: "white" }}>
            <CalendarCheck className="inline size-5 mr-2 -mt-1" /> Book online
          </a>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-soft space-y-4"
          >
            <h2 className="font-display text-2xl">Send us a message</h2>
            <p className="text-sm text-muted-foreground">For medical emergencies, please call 911. For appointment requests, the form below is fine — we reply within one business day.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First name" name="first" />
              <Field label="Last name" name="last" />
              <Field label="Email" name="email" type="email" />
              <Field label="Phone" name="phone" type="tel" />
            </div>
            <Field label="Subject" name="subject" />
            <div>
              <label className="block text-xs uppercase tracking-widest text-tertiary font-semibold mb-2">Message</label>
              <textarea required rows={5} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button type="submit" className="px-6 py-3 rounded-full bg-tertiary text-tertiary-foreground font-semibold hover:opacity-95">Send message</button>
            {sent && <p className="text-sm text-tertiary font-medium">Thanks — we've received your note and will reply within one business day.</p>}
          </form>

          <div className="mt-6 rounded-3xl overflow-hidden border border-border shadow-soft aspect-[16/9]">
            <iframe title="GME map" src={CLINIC.mapEmbed} className="size-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-widest text-tertiary font-semibold mb-2">{label}</label>
      <input id={name} name={name} type={type} required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}
