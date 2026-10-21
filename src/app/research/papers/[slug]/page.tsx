import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";

import PaperReader from "@/components/research/PaperReader";
import {
  publications,
  paperSourceName,
  RESEARCH_INTEREST_FORM_URL,
  type Publication,
} from "@/data/research";

/* One paper from the community, read on SAIN's own site.

   The imprint band says what the paper is and where it appeared, in the same
   cream as the handbook's title page. The paper itself sits on the navy band,
   page after page, and the close sends the reader who got to the end towards
   writing the next one. Only papers with a `reader` entry in
   src/data/research.ts get a page; the rest still link to their source. A
   page whose entry has no `pdf` keeps the imprint and the close, and sends
   the reader on to the source. */

type Params = { slug: string };

const readable = publications.filter(
  (paper): paper is Publication & { reader: NonNullable<Publication["reader"]> } =>
    Boolean(paper.reader),
);

function findPaper(slug: string) {
  return readable.find((paper) => paper.reader.slug === slug);
}

/* No `dynamicParams = false` here: with `output: export` only these slugs are
   built anyway, and in Next 14 dev that flag makes every paper page fail with a
   misleading "missing generateStaticParams()" error. */
export function generateStaticParams(): Params[] {
  return readable.map((paper) => ({ slug: paper.reader.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const paper = findPaper(params.slug);
  if (!paper) return {};
  return {
    title: paper.chipTitle,
    description: paper.featured?.summary ?? `${paper.title}. ${paper.venue}.`,
    alternates: { canonical: `/research/papers/${paper.reader.slug}` },
  };
}

export default function PaperPage({ params }: { params: Params }) {
  const paper = findPaper(params.slug);
  if (!paper) notFound();
  const source = paperSourceName(paper);
  const pdf = paper.reader.pdf;

  return (
    <>
      <section aria-labelledby="paper-heading" className="border-b border-navy/10 bg-cream">
        {/* Every paper gets the same imprint, with no drawing beside it. On a
            short screen the reader below can sit entirely out of sight, so the
            first action is the one that takes you to it. */}
        <div className="shell band-index">
          <nav aria-label="Breadcrumb" className="font-sans text-label text-navy/65">
            <Link
              href="/research#publications"
              className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              Project hub
            </Link>
            <span aria-hidden="true" className="px-2 text-navy/35">
              /
            </span>
            <span aria-current="page">Publications</span>
          </nav>

          <p className="mt-6 font-sans text-footnote text-orange-ink lg:mt-8">
            {paper.featured?.venueLabel ?? paper.venue}
          </p>
          <h1 id="paper-heading" className="mt-3 font-serif text-heading text-navy">
            {paper.title}
          </h1>
          <p className="mt-5 max-w-copy-wide font-sans text-body text-navy/72">{paper.authors}</p>
          {paper.featured ? (
            <p className="mt-3 max-w-copy font-sans text-body text-navy/74">
              {paper.featured.summary}
            </p>
          ) : null}

          {/* A paper without a hosted PDF has no reader band, so its one
              action is the source itself. */}
          {pdf ? (
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#paper" className="btn-accent gap-2">
                Read the paper
                <ArrowDownIcon size={16} weight="regular" aria-hidden="true" />
              </a>
              <a
                href={pdf}
                download
                className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                Download PDF
                <DownloadSimpleIcon size={16} weight="regular" aria-hidden="true" />
              </a>
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                View on {source}
                <ArrowUpRightIcon size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          ) : (
            <div className="mt-7">
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent gap-2"
              >
                Read on {source}
                <ArrowUpRightIcon size={16} weight="regular" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          )}

          <p className="mt-7 max-w-copy-wide border-t border-navy/10 pt-4 font-sans text-footnote text-navy/60">
            From the SAIN community.{" "}
            {pdf
              ? `${paper.reader.license ? `Shared here under ${paper.reader.license}; the` : "The"} original is on ${source}.`
              : `The paper is published on ${source} and is not hosted here.`}
          </p>
        </div>
      </section>

      {pdf ? (
        /* scroll-mt clears the 74px navbar, so "Read the paper" lands with the
           reader's toolbar in view rather than under the bar. */
        <section id="paper" aria-label="The paper" className="scroll-mt-[74px] bg-navy text-white">
          <div className="shell pb-16 pt-8 md:pb-24 md:pt-10">
            <PaperReader src={pdf} title={paper.chipTitle} />
          </div>
        </section>
      ) : null}

      <section aria-labelledby="paper-next-heading" className="bg-cream">
        <div className="shell band-section flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[620px]">
            <h2 id="paper-next-heading" className="font-serif text-heading-sm text-navy">
              Write the next one
            </h2>
            <p className="mt-4 font-sans text-body text-navy/74">
              Work like this is what the Project Hub is for. It matches you with a supervisor,
              arranges compute, and takes a project from open question to published finding.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:shrink-0">
            <a
              href={RESEARCH_INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent gap-2"
            >
              Register your interest
              <ArrowUpRightIcon size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link
              href="/research#projects"
              className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              Browse open projects
              <ArrowRightIcon size={16} weight="regular" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
