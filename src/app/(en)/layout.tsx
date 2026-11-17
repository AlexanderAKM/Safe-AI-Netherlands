import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";

import SiteShell, { siteMetadata } from "@/components/SiteShell";

/* The root layout for English, which lives at the root with no prefix.

   Every page under app/(en) is a few lines that render the page of the same
   path in app/[locale] with the English locale. The pages themselves are
   written once, in app/[locale]; edit them there. `npm run i18n:check` fails
   if a page exists in one tree and not the other. */

export async function generateMetadata() {
  return siteMetadata("en");
}

export default function EnglishLayout({ children }: { children: ReactNode }) {
  setRequestLocale("en");
  return <SiteShell locale="en">{children}</SiteShell>;
}
