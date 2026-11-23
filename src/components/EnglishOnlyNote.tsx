import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";

/* The line that tells a reader on /nl/... that this page has not been
   translated yet. Renders nothing in English. Put it right under the page's
   header, and mark the English text below it with lang="en" so screen
   readers switch voice. A muted italic line, like FormLanguageNote:
   every note about the language is set in italics. */
export default async function EnglishOnlyNote({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  if (locale === "en") return null;
  const t = await getTranslations({ locale, namespace: "common.englishOnly" });

  return (
    <p
      className={`max-w-[var(--container-copy)] font-sans text-caption italic text-navy/60 ${className}`}
    >
      {t("note")}
    </p>
  );
}
