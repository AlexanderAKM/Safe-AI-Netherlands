import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import { localizePath, type Locale } from "@/i18n/routing";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

/* /team is an old address for the people band on /about.
 *
 * `redirect()` is a server 307, and this site builds with `output: "export"`,
 * so the exported team page had an empty body: anyone arriving from a search
 * result, a pasted link or a new tab got a white screen. A static host can
 * serve a meta refresh, so the page carries one, plus the link in plain sight
 * for anyone whose browser or reader does not follow it. Both go to the
 * about page in the reader's language. */
const TARGET = "/about#team";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "team.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: true },
    alternates: localeAlternates({ locale, path: "/team", canonicalPath: "/about" }),
  };
}

export default function TeamPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = useTranslations("team");
  return (
    <>
      {/* Honoured in the body by every current browser; the link below is the
          fallback for anything that is not. */}
      <meta httpEquiv="refresh" content={`0;url=${localizePath(TARGET, locale)}`} />
      <section aria-labelledby="team-redirect-heading" className="bg-white">
        <div className="shell band-hero flex flex-col">
          <h1
            id="team-redirect-heading"
            className="max-w-[620px] font-serif text-heading text-navy"
          >
            {t("heading")}
          </h1>
          <p className="mt-5 max-w-[620px] font-sans text-body text-navy/72">
            {t("body")}
          </p>
          <p className="mt-6">
            <Link
              href={TARGET}
              className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
            >
              {t("link")}
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
