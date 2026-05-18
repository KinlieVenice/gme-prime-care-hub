import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — GME Global Medical Excellence" },
      { name: "description", content: "How GME collects, uses, and protects your information." },
      { property: "og:title", content: "Privacy Policy — GME" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="container mx-auto px-4 sm:px-6 py-20 max-w-3xl prose prose-slate">
      <p className="text-xs uppercase tracking-[0.3em] text-tertiary font-semibold">Legal</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-display">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
      <div className="mt-8 space-y-6 text-foreground/85 leading-relaxed">
        <p>GME Global Medical Excellence ("GME," "we," "our") is committed to protecting the privacy of your personal and protected health information (PHI). This Privacy Policy describes the information we collect, how we use it, and your rights under HIPAA and applicable law.</p>
        <h2 className="font-display text-2xl mt-8">Information we collect</h2>
        <p>We collect information you provide when you book appointments, contact us, or receive care, including demographic details, insurance information, and clinical history necessary for treatment.</p>
        <h2 className="font-display text-2xl mt-8">How we use information</h2>
        <p>Your information is used to provide medical care, coordinate treatment, manage billing and insurance, comply with legal obligations, and improve the quality of our services. We do not sell your personal information.</p>
        <h2 className="font-display text-2xl mt-8">Disclosures</h2>
        <p>We may share information with treating providers, laboratories, your insurance carrier, business associates that support our operations under HIPAA-compliant agreements, and when required by law.</p>
        <h2 className="font-display text-2xl mt-8">Your rights</h2>
        <p>You have the right to access your records, request corrections, request an accounting of disclosures, and file a complaint with the U.S. Department of Health and Human Services.</p>
        <h2 className="font-display text-2xl mt-8">Contact</h2>
        <p>Questions about this policy? Email <a className="text-tertiary font-semibold" href="mailto:Contact@GMELV.com">Contact@GMELV.com</a> or call (702) 550-6777.</p>
      </div>
      <div className="mt-10"><Link to="/" className="text-tertiary font-semibold">← Back home</Link></div>
    </article>
  );
}
