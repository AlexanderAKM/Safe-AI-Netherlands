import type { Metadata } from "next";
import Link from "next/link";

import SectionOrbits from "@/components/landing/SectionOrbits";
import { getDictionary } from "@/i18n";

const t = getDictionary("en");

export const metadata: Metadata = {
  title: t.notFound.meta.title,
};

/* Replaces Next's built-in 404 so its words come from the dictionary. Two ways
   on: the homepage, and the contact page for a link that should have worked. */
export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading" className="relative isolate overflow-hidden bg-white">
      <SectionOrbits className="-left-24 top-0 h-[420px] w-[320px] md:-left-14" />
      <div className="shell band-hero flex flex-col gap-6">
        <h1 id="not-found-heading" className="max-w-[760px] font-serif text-display text-navy">
          {t.notFound.heading}
        </h1>
        <p className="max-w-[var(--container-copy)] font-sans text-body text-navy/72">{t.notFound.body}</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn-accent">
            {t.notFound.home}
          </Link>
          <Link href="/contact" className="btn-ghost">
            {t.notFound.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}
