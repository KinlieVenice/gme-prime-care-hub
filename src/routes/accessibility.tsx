import { createFileRoute, Link } from "@tanstack/react-router";
import { Accessibility } from "lucide-react";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility Notice — GME Global Medical Excellence" },
      { name: "description", content: "How GME makes its website and clinic accessible to every patient." },
      { property: "og:title", content: "Accessibility Notice — GME" },
      { property: "og:url", content: "/accessibility" },
    ],
    links: [{ rel: "canonical", href: "/accessibility" }],
  }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <article className="container mx-auto px-4 sm:px-6 pt-36 md:pt-40 lg:pt-44 pb-20 max-w-3xl">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist text-tertiary text-xs uppercase tracking-[0.25em] font-semibold">
        <Accessibility className="size-3.5" /> Accessibility
      </div>
      <h1 className="mt-3 text-4xl md:text-5xl font-display">Accessibility Notice</h1>
      <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
      <div className="mt-8 space-y-6 text-foreground/85 leading-relaxed">
        <p>GME Global Medical Excellence is committed to ensuring our website and clinic are accessible to people of all abilities. We strive to conform to WCAG 2.1 Level AA and continually test and improve the experience for assistive technology users.</p>
        <h2 className="font-display text-2xl mt-6">Built-in Accessibility Help Desk</h2>
        <p>Every page on this site includes a floating Accessibility Help Desk (look for the button in the lower-right corner). From there you can enable:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Focus frame, link highlighter, and big cursor</li>
          <li>High contrast mode and color vision shift</li>
          <li>Adjustable text size and letter/word spacing</li>
          <li>Dyslexia-friendly typography</li>
          <li>Reading guide and reading window overlays</li>
        </ul>
        <p>Settings are saved on your device so the site remembers your preferences on every return visit.</p>
        <h2 className="font-display text-2xl mt-6">In-clinic accommodations</h2>
        <p>Our office is wheelchair accessible and offers private exam rooms, hearing-assistive devices on request, and large-print materials. If you need additional accommodations, please let us know in advance.</p>
        <h2 className="font-display text-2xl mt-6">Feedback</h2>
        <p>If you encounter an accessibility barrier, please contact us so we can help and improve. Email <a className="text-tertiary font-semibold" href="mailto:Contact@GMELV.com">Contact@GMELV.com</a> or call (702) 550-6777.</p>
      </div>
      <div className="mt-10"><Link to="/" className="text-tertiary font-semibold">← Back home</Link></div>
    </article>
  );
}
