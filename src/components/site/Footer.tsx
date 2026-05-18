import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { CLINIC } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-linear-to-b from-background to-mist">
      <div className="container mx-auto px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-4">
            <Logo className="h-12 w-auto" />
            <p className="text-sm text-muted-foreground max-w-sm">
              A small, physician-owned practice in Las Vegas. Every visit, every decision —
              handled by a board-certified doctor who knows your name.
            </p>
            <div className="flex gap-3 pt-2">
              <a href={CLINIC.phoneHref} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm hover:border-primary">
                <Phone className="size-4 text-tertiary" /> {CLINIC.phone}
              </a>
              <a href={CLINIC.bookingUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-brand text-sm font-semibold" style={{ color: "white" }}>
                Book Now
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm uppercase tracking-widest text-tertiary font-semibold">Visit Us</h3>
            <div className="text-sm space-y-6 text-foreground/80">
              <div className="flex gap-3"><MapPin className="size-4 mt-0.5 text-tertiary shrink-0" /><span>{CLINIC.address.line1} <br /> {CLINIC.address.line2}</span></div>
              <div className="flex gap-3"><Mail className="size-4 mt-0.5 text-tertiary shrink-0" /><a className="hover:text-tertiary" href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a></div>
              <div className="flex gap-3"><Clock className="size-4 mt-0.5 text-tertiary shrink-0" />
                <div className="space-y-2">
                  {CLINIC.hours.map((h) => (
                    <div key={h.day} className="flex flex-col">
                      {/* Day on top */}
                      <span className="text-sm">
                        {h.day}
                      </span>
                      {/* Time directly underneath */}
                      <small className="text-xs text-muted-foreground tracking-wide mt-0.5">
                        {h.time}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-5">
            <h3 className="text-sm uppercase tracking-widest text-tertiary font-semibold mb-4">Find Us</h3>
            <div className="rounded-2xl overflow-hidden border border-border shadow-soft md:aspect-[16/8] aspect-[16/10]">
              <iframe
                title="GME clinic location map"
                src={CLINIC.mapEmbed}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {CLINIC.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy" onClick={() => window.scrollTo(0, 0)} className="hover:text-tertiary">Privacy Policy</Link>
            <Link to="/terms" onClick={() => window.scrollTo(0, 0)} className="hover:text-tertiary">Terms & Conditions</Link>
            <Link to="/accessibility" onClick={() => window.scrollTo(0, 0)} className="hover:text-tertiary">Accessibility Notice</Link>
            <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-tertiary">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
