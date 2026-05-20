import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — GME Global Medical Excellence" },
      { name: "description", content: "Terms governing use of the GME website and online services." },
      { property: "og:title", content: "Terms & Conditions — GME" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <article className="container mx-auto px-4 sm:px-6 pt-36 md:pt-40 lg:pt-44 pb-20 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.3em] text-tertiary font-semibold">Legal</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-display">Terms & Conditions</h1>
      <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
      <div className="mt-8 space-y-6 text-foreground/85 leading-relaxed">
        <p>By accessing the GME Global Medical Excellence website, you agree to these terms. The information presented here is for general educational purposes and is not a substitute for individualized medical advice from your physician.</p>
        <h2 className="font-display text-2xl mt-8">Use of the site</h2>
        <p>You agree to use this site only for lawful purposes and in a manner that does not infringe on the rights of others. We may modify, suspend, or discontinue any aspect of the site without notice.</p>
        <h2 className="font-display text-2xl mt-8">No physician-patient relationship</h2>
        <p>Reviewing content on this site does not create a physician-patient relationship. A relationship is established only upon a formal in-person or telehealth visit with one of our physicians.</p>
        <h2 className="font-display text-2xl mt-8">Third-party links</h2>
        <p>This site may link to third-party resources, including our online booking platform. We are not responsible for the content or practices of external sites.</p>
        <h2 className="font-display text-2xl mt-8">Limitation of liability</h2>
        <p>To the fullest extent permitted by law, GME is not liable for damages arising from use of this site.</p>
        <h2 className="font-display text-2xl mt-8">Contact</h2>
        <p>Questions about these terms? Email <a className="text-tertiary font-semibold" href="mailto:Contact@GMELV.com">Contact@GMELV.com</a>.</p>
      </div>
      <div className="mt-10"><Link to="/" className="text-tertiary font-semibold">← Back home</Link></div>
    </article>
  );
}
