import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import SiteShell, { siteMetadata } from "@/components/SiteShell";
import { prefixedLocales, type Locale } from "@/i18n/routing";

/* The root layout of every prefixed language (/nl/...). English has its own
   root layout in app/(en), because it lives at the root without a prefix.
   Both render the same SiteShell.

   Only the prefixed languages are generated here, so the build never writes
   an /en/... copy of the site. */

type Params = { locale: string };

function isPrefixedLocale(locale: string): locale is Locale {
  return (prefixedLocales as readonly string[]).includes(locale);
}

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Params }) {
  if (!isPrefixedLocale(params.locale)) return {};
  return siteMetadata(params.locale);
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  // /en/... and any unknown prefix: English is at the root.
  if (!isPrefixedLocale(params.locale)) notFound();
  setRequestLocale(params.locale);

  return <SiteShell locale={params.locale}>{children}</SiteShell>;
}
