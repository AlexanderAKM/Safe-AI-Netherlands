import { readFile } from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";

import MarkdownDocument from "@/components/MarkdownDocument";
import { getSainDocument, sainDocuments } from "@/data/sainDocuments";
import { getDictionary, type Locale } from "@/i18n";

const locale: Locale = "en";
const t = getDictionary(locale);

type DocumentPageProps = {
  params: {
    document: string;
  };
};

/* The English documents live in docs/ itself, where the design briefs cite
   them; a translation of one sits under docs/<locale>/ with the same name. */
async function readDocumentMarkdown(locale: Locale, fileName: string) {
  const folder = locale === "en" ? "docs" : path.join("docs", locale);
  return readFile(path.join(process.cwd(), folder, fileName), "utf8");
}

export function generateStaticParams() {
  return sainDocuments.map((document) => ({
    document: document.slug,
  }));
}

export function generateMetadata({ params }: DocumentPageProps): Metadata {
  const document = getSainDocument(params.document);

  if (!document) {
    return {};
  }

  return {
    title: t.documents[document.key].title,
    description: t.documents[document.key].description,
  };
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const document = getSainDocument(params.document);

  if (!document) {
    notFound();
  }

  const words = t.documents[document.key];
  const markdown = await readDocumentMarkdown(locale, document.fileName);
  const others = sainDocuments.filter((entry) => entry.slug !== document.slug);

  return (
    <>
      {/* Front matter on paper. These are the foundation's written rules, so
          the page opens like the cover of a printed programme: where it sits,
          what kind of document it is, its title, and what it covers. */}
      <section
        aria-labelledby="document-heading"
        className="border-b border-navy/10 bg-cream"
      >
        <div className="shell band-hero flex flex-col gap-6">
          <Link
            href="/about"
            className="inline-flex w-fit items-center gap-1.5 font-sans text-label text-navy/65 underline decoration-navy/20 underline-offset-4 hover:text-navy hover:decoration-navy focus-visible:text-navy"
          >
            <ArrowLeft size={16} weight="regular" aria-hidden="true" />
            {t.documents.backToAbout}
          </Link>

          <div className="flex flex-col gap-4">
            <p className="kicker text-kicker text-navy/65">{words.eyebrow}</p>
            <h1
              id="document-heading"
              className="max-w-[720px] font-serif text-display text-navy"
            >
              {words.title}
            </h1>
            <p className="max-w-[var(--container-copy)] font-sans text-body text-navy/72">
              {words.description}
            </p>
          </div>
        </div>
      </section>

      {/* One reading column at the published copy width. Nothing in the margin:
          the document is the band. */}
      <section className="bg-white">
        <div className="shell band-section">
          <div className="max-w-[var(--container-copy)]">
            <MarkdownDocument markdown={markdown} />
          </div>
        </div>
      </section>

      {/* The other two documents, because a reader who opened one of these came
          to check what SAIN has written down, not to read one file. */}
      <section
        aria-labelledby="other-documents-heading"
        className="border-t border-navy/10 bg-white"
      >
        <div className="shell band-index flex flex-col gap-6">
          <h2
            id="other-documents-heading"
            className="font-serif text-heading-sm text-navy"
          >
            {t.documents.othersHeading}
          </h2>
          <ul className="flex flex-wrap gap-4">
            {others.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/about/${entry.slug}`}
                  className="pub-chip w-full max-w-[340px] justify-between gap-6 sm:w-auto"
                >
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="font-sans text-footnote font-medium text-orange-ink">
                      {t.documents[entry.key].eyebrow}
                    </span>
                    <span className="font-serif text-[15px] leading-5 text-navy">
                      {t.documents[entry.key].title}
                    </span>
                  </span>
                  <ArrowRight
                    size={16}
                    weight="regular"
                    aria-hidden="true"
                    className="shrink-0 text-navy"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
