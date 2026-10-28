import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { PROJECTS_EMAIL, RESEARCH_INTEREST_FORM_URL } from "@/data/research";

export const metadata: Metadata = {
  title: "Apply for a project",
  description:
    "Apply to the SAIN Project Hub in one form: join a project, propose your own, or offer to supervise.",
  alternates: { canonical: "/research/apply" },
};

/* The application form, on the site instead of behind a link off it.

   A cream imprint band says what the form is for, the way the handbook's
   title page does, and the form takes the rest of the screen under it.

   Fillout serves the form to frames (no X-Frame-Options, no frame-ancestors),
   so it sits in a plain iframe. Not Fillout's embed script: that scans the
   page once when it loads, so a reader who comes back here through a
   client-side link would find an empty box. The frame is a screen tall and
   the form scrolls inside it, which keeps its own page-by-page flow intact.
   The link to open it in its own tab stays for any browser that will not
   show a form from another site. */

const linkClass =
  "text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy";

export default function ApplyPage() {
  return (
    <>
      <section aria-labelledby="apply-heading" className="border-b border-navy/10 bg-cream">
        <div className="shell band-index">
          <div className="max-w-copy-wide">
            <nav aria-label="Breadcrumb" className="font-sans text-label text-navy/65">
              <Link href="/research" className={linkClass}>
                Project hub
              </Link>
              <span aria-hidden="true" className="px-2 text-navy/35">
                /
              </span>
              <span aria-current="page">Apply</span>
            </nav>

            <h1 id="apply-heading" className="mt-6 font-serif text-heading text-navy">
              Apply for a project
            </h1>
            <p className="mt-4 max-w-copy font-sans text-body text-navy/74">
              One form for the Project Hub. Choose whether you want to join a project (name up to
              three from the{" "}
              <Link href="/research#projects" className={linkClass}>
                open projects
              </Link>
              ), propose your own, or supervise. The projects team gets back to you within a
              working week.
            </p>
            <p className="mt-4 max-w-copy font-sans text-footnote leading-[19px] text-navy/60">
              A VU or UvA thesis is for students of that university; every other project is open
              to everyone. Questions first? Email{" "}
              <a href={`mailto:${PROJECTS_EMAIL}`} className={linkClass}>
                {PROJECTS_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Application form" className="bg-white">
        <div className="shell py-6 md:py-10">
          <div className="border border-navy/12">
            <iframe
              src={RESEARCH_INTEREST_FORM_URL}
              title="SAIN Project Hub application form"
              className="block h-[calc(100dvh-140px)] min-h-[640px] w-full bg-white"
            />
          </div>
          <p className="mt-4 font-sans text-footnote text-navy/60">
            Form not showing?{" "}
            <a
              href={RESEARCH_INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-baseline gap-1 ${linkClass}`}
            >
              Open it in a new tab
              <ArrowUpRight size={13} weight="regular" aria-hidden="true" className="translate-y-[1px]" />
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
