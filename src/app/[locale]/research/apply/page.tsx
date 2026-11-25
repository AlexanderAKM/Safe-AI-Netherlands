import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ClientMessages from "@/i18n/ClientMessages";
import { localeAlternates } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

import ApplyForm from "@/components/research/ApplyForm";
import { PROJECTS_EMAIL } from "@/data/research";
import FormLanguageNote from "@/components/FormLanguageNote";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "projectHub.applyPage.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates({ locale, path: "/research/apply" }),
  };
}

/* The application form, on the site instead of behind a link off it.

   A cream imprint band says what the form is for, the way the handbook's
   title page does, and the form takes the rest of the screen under it.

   Fillout serves the form to frames (no X-Frame-Options, no frame-ancestors),
   so it sits in a plain iframe. Not Fillout's embed script: that scans the
   page once when it loads, so a reader who comes back here through a
   client-side link would find an empty box. The frame is a screen tall and
   the form scrolls inside it, which keeps its own page-by-page flow intact.
   The link to open it in its own tab stays for any browser that will not
   show a form from another site. Both live in ApplyForm, which also names the
   project when the reader came from one.

   The form itself is Fillout's, in English in every language; the page
   around it is in the reader's. */

const linkClass =
  "text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy";

export default function ApplyPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = useTranslations("projectHub");
  return (
    <>
      <section aria-labelledby="apply-heading" className="border-b border-navy/10 bg-cream">
        <div className="shell band-index">
          <div className="max-w-copy-wide">
            <nav aria-label={t("breadcrumb.label")} className="font-sans text-label text-navy/65">
              <Link href="/research" className={linkClass}>
                {t("breadcrumb.projectHub")}
              </Link>
              <span aria-hidden="true" className="px-2 text-navy/35">
                /
              </span>
              <span aria-current="page">{t("applyPage.breadcrumb")}</span>
            </nav>

            <h1 id="apply-heading" className="mt-6 font-serif text-heading text-navy">
              {t("applyPage.heading")}
            </h1>
            <p className="mt-4 max-w-copy font-sans text-body text-navy/74">
              {t.rich("applyPage.intro", {
                link: (chunks) => (
                  <Link href="/research#projects" className={linkClass}>
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <p className="mt-4 max-w-copy font-sans text-footnote leading-[19px] text-navy/60">
              {t.rich("applyPage.note", {
                address: PROJECTS_EMAIL,
                email: (chunks) => (
                  <a href={`mailto:${PROJECTS_EMAIL}`} className={linkClass}>
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
        </div>
      </section>

      <section aria-label={t("applyPage.formLabel")} className="bg-white">
        <div className="shell py-6 md:py-10">
          <FormLanguageNote className="mb-4" />
          <ClientMessages namespaces={["projectHub.applyForm"]}>
            <ApplyForm linkClass={linkClass} />
          </ClientMessages>
        </div>
      </section>
    </>
  );
}
