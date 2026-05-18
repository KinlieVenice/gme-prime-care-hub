import logo from "@/assets/logo.webp";
import { CLINIC } from "@/lib/site-data";
import { Link } from "@tanstack/react-router";

export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <Link to="/" className="flex items-center gap-3 group" aria-label={`${CLINIC.name} home`}>
      <img src={logo} alt={`${CLINIC.name} logo`} className={className} width={160} height={48} />
    </Link>
  );
}
