import { useEffect, useState } from "react";
import {
  Accessibility, X, Focus, MousePointer2, Highlighter, Contrast, Palette,
  Type, ALargeSmall, RotateCcw, BookOpenText, ScanLine, AppWindow,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ToggleKey =
  | "focus" | "cursor" | "highlight" | "contrast" | "color-shift"
  | "dyslexic" | "guide" | "window";

const TOGGLES: { key: ToggleKey; label: string; desc: string; icon: typeof Focus }[] = [
  { key: "focus", label: "Focus Frame", desc: "High-visibility outlines on every focusable element.", icon: Focus },
  { key: "cursor", label: "Big Cursor", desc: "Oversized branded cursor that's easier to track.", icon: MousePointer2 },
  { key: "highlight", label: "Link Highlighter", desc: "Bright background behind every link & button.", icon: Highlighter },
  { key: "contrast", label: "High Contrast", desc: "Pure black-on-white palette with bold borders.", icon: Contrast },
  { key: "color-shift", label: "Color Shift", desc: "Rotate the palette for color-vision differences.", icon: Palette },
  { key: "dyslexic", label: "Dyslexia-Friendly Font", desc: "Switches the site to a reader-optimized font.", icon: BookOpenText },
  { key: "guide", label: "Reading Guide", desc: "A horizontal bar that follows your cursor.", icon: ScanLine },
  { key: "window", label: "Reading Window", desc: "Dim everything except a focused band of text.", icon: AppWindow },
];

const TEXT_SIZES = [
  { label: "Default", val: 100 },
  { label: "Large", val: 112 },
  { label: "X-Large", val: 125 },
  { label: "XX-Large", val: 140 },
];

const SPACINGS = [
  { label: "Default", val: 1 },
  { label: "Wide", val: 1.5 },
  { label: "Widest", val: 2 },
];

const STORAGE_KEY = "gme:a11y";

type Prefs = {
  toggles: Record<ToggleKey, boolean>;
  textSize: number;
  spacing: number;
};

const DEFAULTS: Prefs = {
  toggles: { focus: false, cursor: false, highlight: false, contrast: false, "color-shift": false, dyslexic: false, guide: false, window: false },
  textSize: 100,
  spacing: 1,
};

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);

  // hydrate
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPrefs({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {/* ignore */}
  }, []);

  // apply
  useEffect(() => {
    const html = document.documentElement;
    (Object.keys(prefs.toggles) as ToggleKey[]).forEach((k) => {
      html.classList.toggle(`a11y-${k}`, prefs.toggles[k]);
    });
    html.style.fontSize = `${prefs.textSize}%`;
    html.style.setProperty("letter-spacing", prefs.spacing === 1 ? "" : `${(prefs.spacing - 1) * 0.06}em`);
    html.style.setProperty("word-spacing", prefs.spacing === 1 ? "" : `${(prefs.spacing - 1) * 0.25}em`);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch {/* ignore */}
  }, [prefs]);

  // mouse-follow for guide / window
  useEffect(() => {
    if (!prefs.toggles.guide && !prefs.toggles.window) return;
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--guide-y", `${e.clientY - 24}px`);
      document.documentElement.style.setProperty("--window-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [prefs.toggles.guide, prefs.toggles.window]);

  const toggle = (k: ToggleKey) =>
    setPrefs((p) => ({ ...p, toggles: { ...p.toggles, [k]: !p.toggles[k] } }));

  const reset = () => setPrefs(DEFAULTS);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 group flex items-center gap-2 pl-3 pr-4 py-3 rounded-full bg-gradient-brand shadow-glow hover:scale-105 transition-transform"
        aria-label="Open Accessibility Help Desk"
        style={{ color: "white" }}
      >
        <Accessibility className="size-6" />
        <span className="hidden sm:inline text-sm font-semibold">Accessibility</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-end" role="dialog" aria-modal="true" aria-label="Accessibility Help Desk">
          <button className="absolute inset-0" onClick={() => setOpen(false)} aria-label="Close" />
          <div className="relative w-full sm:max-w-md sm:m-6 bg-card border border-border rounded-t-3xl sm:rounded-3xl shadow-card max-h-[92vh] overflow-y-auto">
            <div className="sticky top-0 z-10 bg-gradient-hero px-5 py-4 sm:rounded-t-3xl flex items-center justify-between" style={{ color: "white" }}>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] opacity-80">GME</div>
                <div className="text-lg font-semibold font-display">Accessibility Help Desk</div>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-white/10" aria-label="Close">
                <X className="size-5" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              <p className="text-sm text-muted-foreground">
                Tailor this site to how you read and browse best. Your settings are saved on this device.
              </p>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-base">Profiles</h3>
                  <button onClick={reset} className="text-xs inline-flex items-center gap-1 text-tertiary hover:underline">
                    <RotateCcw className="size-3.5" /> Reset all
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {TOGGLES.map(({ key, label, desc, icon: Icon }) => {
                    const on = prefs.toggles[key];
                    return (
                      <button
                        key={key}
                        onClick={() => toggle(key)}
                        aria-pressed={on}
                        className={cn(
                          "text-left p-3 rounded-2xl border transition-all",
                          on ? "border-primary bg-gradient-to-br from-primary/15 to-accent/10 shadow-soft"
                             : "border-border hover:border-primary/50 bg-background"
                        )}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Icon className={cn("size-5", on ? "text-tertiary" : "text-muted-foreground")} />
                          <span className={cn("text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-full", on ? "bg-tertiary text-tertiary-foreground" : "bg-muted text-muted-foreground")}>
                            {on ? "On" : "Off"}
                          </span>
                        </div>
                        <div className="font-medium text-sm">{label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-display text-base mb-3 flex items-center gap-2"><ALargeSmall className="size-4 text-tertiary" /> Text size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {TEXT_SIZES.map((t) => (
                    <button
                      key={t.val}
                      onClick={() => setPrefs((p) => ({ ...p, textSize: t.val }))}
                      className={cn(
                        "py-2 rounded-xl text-sm border transition",
                        prefs.textSize === t.val ? "bg-tertiary text-tertiary-foreground border-tertiary" : "border-border hover:border-primary/50"
                      )}
                    >{t.label}</button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-base mb-3 flex items-center gap-2"><Type className="size-4 text-tertiary" /> Letter & word spacing</h3>
                <div className="grid grid-cols-3 gap-2">
                  {SPACINGS.map((s) => (
                    <button
                      key={s.val}
                      onClick={() => setPrefs((p) => ({ ...p, spacing: s.val }))}
                      className={cn(
                        "py-2 rounded-xl text-sm border transition",
                        prefs.spacing === s.val ? "bg-tertiary text-tertiary-foreground border-tertiary" : "border-border hover:border-primary/50"
                      )}
                    >{s.label}</button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground border-t border-border pt-4">
                Need more help? Call our team at <a className="text-tertiary font-semibold" href="tel:+17025506777">(702) 550-6777</a> and we'll personally walk you through your visit.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
