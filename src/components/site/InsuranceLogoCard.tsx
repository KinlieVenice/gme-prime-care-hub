import { cn } from "@/lib/utils";

/**
 * Placeholder logo + label card for insurance carriers.
 * Generates a deterministic monogram + brand-tinted "logo" tile from the carrier name.
 */
const PALETTES = [
  "from-[oklch(0.55_0.16_245)] to-[oklch(0.42_0.12_260)]", // blue
  "from-[oklch(0.6_0.14_195)] to-[oklch(0.4_0.09_210)]", // teal
  "from-[oklch(0.55_0.17_25)] to-[oklch(0.42_0.13_15)]",  // red
  "from-[oklch(0.62_0.15_150)] to-[oklch(0.42_0.1_165)]", // green
  "from-[oklch(0.6_0.16_290)] to-[oklch(0.42_0.12_280)]", // purple
  "from-[oklch(0.65_0.15_70)] to-[oklch(0.5_0.13_55)]",   // amber
  "from-[oklch(0.55_0.12_220)] to-[oklch(0.35_0.08_220)]", // navy
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function monogram(name: string) {
  const cleaned = name
    .replace(/\b(of|the|and|&)\b/gi, "")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .trim()
    .split(/\s+/);
  const letters = cleaned.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
  return letters || name.slice(0, 2).toUpperCase();
}

export function InsuranceLogoCard({ name, className }: { name: string; className?: string }) {
  const palette = PALETTES[hash(name) % PALETTES.length];
  const initials = monogram(name);
  return (
    <div
      className={cn(
        "group relative flex items-center gap-3 sm:gap-4 rounded-2xl bg-card border border-border shadow-soft p-3 sm:p-4 hover:border-primary/50 hover:shadow-card transition",
        className
      )}
    >
      <div
        aria-hidden
        className={cn(
          "relative shrink-0 size-12 sm:size-14 rounded-xl grid place-items-center text-white font-display text-base sm:text-lg tracking-tight bg-gradient-to-br shadow-inner overflow-hidden",
          palette
        )}
      >
        <span className="absolute inset-0 opacity-25 mix-blend-overlay [background:radial-gradient(circle_at_30%_20%,white,transparent_55%)]" />
        <span className="relative drop-shadow-sm">{initials}</span>
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">In-Network</div>
        <div className="text-sm sm:text-[15px] font-semibold text-foreground leading-tight truncate">
          {name}
        </div>
      </div>
    </div>
  );
}
