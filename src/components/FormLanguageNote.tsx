"use client";

import { useLocale, useTranslations } from "next-intl";

/* "Het formulier is in het Engels." The application and sign-up forms SAIN
   links to (Fillout, Google Forms, Airtable) are English only, so on every
   page in another language, the button or embed that opens one carries this
   line under it. Renders nothing in English.

   A Client Component, so it works in server and client trees alike: its one
   message, common.forms, travels with the root layout's provider; a
   <ClientMessages> around it must list "common.forms" too. */
export default function FormLanguageNote({
  tone = "default",
  inline = false,
  className = "",
}: {
  /** "inverse" on navy bands. */
  tone?: "default" | "inverse";
  /** Append to an existing footnote about the form, as one more sentence,
   *  instead of a line of its own. */
  inline?: boolean;
  className?: string;
}) {
  const locale = useLocale();
  const t = useTranslations("common.forms");
  if (locale === "en") return null;
  // In italics, like every note about the language (EnglishOnlyNote).
  if (inline) return <> <span className="italic">{t("inEnglish")}</span></>;

  return (
    <p
      className={`font-sans text-footnote italic ${
        tone === "inverse" ? "text-white/60" : "text-navy/60"
      } ${className}`}
    >
      {t("inEnglish")}
    </p>
  );
}
