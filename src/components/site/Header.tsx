import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ChevronDown, CalendarCheck } from "lucide-react";
import { Logo } from "./Logo";
import { CLINIC, SERVICES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Physicians", to: "/physicians" },
  { label: "Services", to: "/services", children: SERVICES.map((s) => ({ label: s.title, to: `/services/${s.slug}` })) },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setServiceOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled ? "bg-background/75 backdrop-blur-lg border-b border-border shadow-soft" : "bg-background/90 backdrop-blur-sm"
      )}
    >
      {/* top utility bar */}
      <div className="hidden lg:block bg-gradient-hero text-white/90 text-xs">
        <div className="container mx-auto px-6 flex items-center justify-between h-9">
          <span>Physician-led care since day one · Las Vegas, NV</span>
          <div className="flex items-center gap-5">
            <a href={`mailto:${CLINIC.email}`} className="hover:text-white">{CLINIC.email}</a>
            <span className="opacity-50">|</span>
            <span>{CLINIC.address.line1}, {CLINIC.address.line2}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
              if ("children" in item && item.children) {
                return (
                  <div
                    key={item.to}
                    className="relative"
                    onMouseEnter={() => setServiceOpen(true)}
                    onMouseLeave={() => setServiceOpen(false)}
                  >
                    <Link
                      to={item.to}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition-colors",
                        active ? "text-tertiary" : "text-foreground/80 hover:text-tertiary"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="size-3.5" />
                    </Link>
                    <div
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 top-full pt-2 w-72 transition-all",
                        serviceOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                      )}
                    >
                      <div className="bg-card border border-border rounded-2xl shadow-card p-2">
                        <Link to="/services" className="block px-4 py-2.5 rounded-xl text-sm font-medium text-tertiary hover:bg-muted">
                          All Services →
                        </Link>
                        <div className="h-px bg-border my-1" />
                        {item.children.map((c) => (
                          <Link
                            key={c.to}
                            to={c.to}
                            className="block px-4 py-2.5 rounded-xl text-sm hover:bg-muted text-foreground/80 hover:text-foreground"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    active ? "text-tertiary" : "text-foreground/80 hover:text-tertiary"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={CLINIC.phoneHref}
              className={ctaClass({ variant: "subtle", size: "sm", className: "hidden md:inline-flex" })}
            >
              <Phone /> {CLINIC.phone}
            </a>
            <a
              href={CLINIC.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className={ctaClass({ variant: "primary", size: "sm", className: "hidden sm:inline-flex" })}
            >
              <CalendarCheck /> Book Now
            </a>
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile nav */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <div key={item.to}>
                <Link
                  to={item.to}
                  className="block px-4 py-3 rounded-xl font-medium hover:bg-muted"
                >
                  {item.label}
                </Link>
                {"children" in item && item.children && (
                  <div className="pl-6 flex flex-col">
                    {item.children.map((c) => (
                      <Link key={c.to} to={c.to} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-2 pt-3">
              <a href={CLINIC.phoneHref} className="flex-1 text-center px-4 py-3 rounded-xl bg-mist text-tertiary font-medium">
                {CLINIC.phone}
              </a>
              <a
                href={CLINIC.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center px-4 py-3 rounded-xl bg-gradient-brand font-semibold"
                style={{ color: "white" }}
              >
                Book Now
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
