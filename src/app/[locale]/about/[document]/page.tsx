import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasDocumentIn, readDocument } from "@/i18n/documents";
import { localeAlternates } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";

import EnglishOnlyNote from "@/components/EnglishOnlyNote";
import MarkdownDocument from "@/components/MarkdownDocument";
import { getSainDocument, sainDocuments } from "@/data/sainDocuments";

type DocumentPageProps = {
  params: {
    locale: Locale;
    document: string;
  };
};

export function generateStaticParams() {
  return sainDocuments.map((document) => ({
    document: document.slug,
  }));
}

export async function generateMetadata({
  params,
}: DocumentPageProps): Promise<Metadata> {
  const document = getSainDocument(params.document);

  if (!document) {
    return {};
  }

  const t = await getTranslations({
    locale: params.locale,
    namespace: `about.documents.items.${document.key}`,
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates({
      locale: params.locale,
      path: `/about/${document.slug}`,
      /* Until docs/nl/<file> exists, the Dutch page is the English text: it
         names the English page as canonical, and neither page claims a Dutch
         alternate. */
      englishOnly: !hasDocumentIn(document.fileName, "nl"),
    }),
  };
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { locale } = params;
  setRequestLocale(locale);
  /* The first read without an explicit locale fixes the locale of the whole
     render, header and footer included. It happens here, before anything is
     awaited, as the sync pages' useTranslations does it: the root not-found
     element, which every page renders, calls setRequestLocale("en"), and a
     later first read would put this page's shell and links in English. */
  const t = await getTranslations("about");
  const document = getSainDocument(params.document);

  if (!document) {
    notFound();
  }

  /* The document in the reader's language, or the English one while no
     translation exists; `documentLocale` says which came back. */
  const { markdown, locale: documentLocale } = await readDocument(
    document.fileName,
    locale,
  );
  const untranslated = documentLocale !== locale;
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
            {t("document.back")}
          </Link>

          <div className="flex flex-col gap-4">
            <p className="kicker text-kicker text-navy/65">{t(`documents.items.${document.key}.eyebrow`)}</p>
            <h1
              id="document-heading"
              className="max-w-[720px] font-serif text-display text-navy"
            >
              {t(`documents.items.${document.key}.title`)}
            </h1>
            <p className="max-w-[var(--container-copy)] font-sans text-body text-navy/72">
              {t(`documents.items.${document.key}.description`)}
            </p>
          </div>

          {/* A Dutch reader is told before the English starts. */}
          {untranslated ? <EnglishOnlyNote locale={locale} /> : null}
        </div>
      </section>

      {/* One reading column at the published copy width. Nothing in the margin:
          the document is the band. */}
      <section className="bg-white">
        <div className="shell band-section">
          <div
            className="max-w-[var(--container-copy)]"
            lang={untranslated ? documentLocale : undefined}
          >
            <MarkdownDocument markdown={markdown} locale={documentLocale} />
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
            {t("document.others")}
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
                      {t(`documents.items.${entry.key}.eyebrow`)}
                    </span>
                    <span className="font-serif text-[15px] leading-5 text-navy">
                      {t(`documents.items.${entry.key}.title`)}
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
