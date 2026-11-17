import type { Metadata } from "next";
import type { ReactNode } from "react";
import { League_Spartan, Poppins } from "next/font/google";
import { getTranslations } from "next-intl/server";

import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoursePopup from "@/components/CoursePopup";
import ClientMessages from "@/i18n/ClientMessages";
import { SITE_URL } from "@/i18n/metadata";
import {
  LOCALE_COOKIE,
  defaultLocale,
  localizePath,
  ogLocale,
  prefixedLocales,
  routing,
  type Locale,
} from "@/i18n/routing";

/* The root of every page, in every language: <html lang>, the fonts, the
   site-wide metadata, the header, the footer and the course popup. The two
   root layouts render it, app/(en)/layout.tsx for English at the root and
   app/[locale]/layout.tsx for the prefixed languages. */

/* League Spartan for headings and editorial lines, as on the original site. */
const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap",
});

/* Poppins for body copy and interface; its italic carries the kickers. */
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

export async function siteMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "common.metadata" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Safe AI Netherlands",
      template: "%s | SAIN",
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    verification: {
      google: "k0Z89-ZBoJwJsgttXh8i0RILGDy72FQR9N2ynoyFgYg",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    /* Served straight from public/ rather than rasterised on the fly. The old
       /icon route used next/og, whose bundled font it cannot resolve on
       Windows, so both `next dev` and `next build` failed there. A static SVG
       needs no runtime and satisfies `output: export`. The PNG and ICO files
       are that same SVG rasterised: Google's search results show a favicon
       only from a raster icon whose size is a multiple of 48px, and fall back
       to /favicon.ico, so with the SVG alone the result showed a blank globe.
       iOS needs the 180px PNG apple-touch-icon, as it does not render SVG
       icons. */
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/sain-symbol.svg", type: "image/svg+xml" },
      ],
      shortcut: ["/favicon.ico"],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    openGraph: {
      title: "Safe AI Netherlands",
      description: t("description"),
      url: `${SITE_URL}${locale === defaultLocale ? "" : localizePath("/", locale)}`,
      siteName: "Safe AI Netherlands",
      locale: ogLocale[locale],
      alternateLocale: routing.locales
        .filter((other) => other !== locale)
        .map((other) => ogLocale[other]),
      images: [
        {
          url: "/sain-symbol.svg",
          width: 512,
          height: 512,
          alt: t("ogImageAlt"),
        },
      ],
      type: "website",
    },
  };
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Safe AI Netherlands",
  alternateName: "SAIN",
  url: SITE_URL,
  logo: `${SITE_URL}/sain-symbol.svg`,
  sameAs: [
    "https://www.linkedin.com/company/safe-ai-netherlands/",
    "https://www.instagram.com/sainetherlands/",
    "https://safeainetherlands.substack.com/",
  ],
};

/* The reader's language choice, kept in a cookie by the header's switcher.
   Nothing reads the browser's language. On an English page (no prefix), a
   reader who chose another language is sent to the same page in it before
   anything paints; a prefixed page always shows its own language, so a
   link to /nl/... is never redirected. It runs inline, in <head>, because a
   static export has no server to do it. A path that already carries a
   prefix is left alone, so the one 404.html served for every missing URL
   can never bounce /nl/x to /nl/nl/x. */
const rememberedLanguageScript = `(function(){try{var L=${JSON.stringify(
  prefixedLocales,
)},m=document.cookie.match(/(?:^|; )${LOCALE_COOKIE}=([^;]+)/),l=m&&decodeURIComponent(m[1]),p=location.pathname;if(L.indexOf(l)<0)return;for(var i=0;i<L.length;i++){if(p==="/"+L[i]||p.indexOf("/"+L[i]+"/")===0)return;}location.replace("/"+l+(p==="/"?"":p)+location.search+location.hash);}catch(e){}})();`;

export default async function SiteShell({
  locale,
  rememberLanguage = true,
  children,
}: {
  locale: Locale;
  /** Off on the 404 page, which is served for missing URLs in any language. */
  rememberLanguage?: boolean;
  children: ReactNode;
}) {
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      className={`scroll-smooth ${leagueSpartan.variable} ${poppins.variable}`}
    >
      {/* SiteShell is the root layout's markup, moved out of app/ so both
          root layouts can share it; <head> is where it belongs. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {locale === defaultLocale && rememberLanguage ? (
          <script dangerouslySetInnerHTML={{ __html: rememberedLanguageScript }} />
        ) : null}
        <link rel="prefetch" href={localizePath("/about", locale)} />
        <link rel="prefetch" href={localizePath("/get-involved", locale)} />
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-navy antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-100 focus:bg-white focus:px-4 focus:py-2 focus:text-navy focus:outline focus:outline-2 focus:outline-navy"
        >
          {t("skipToContent")}
        </a>
        <ClientMessages
          namespaces={[
            "common.a11y",
            "common.nav",
            "common.hiringBar",
            "common.languageSwitcher",
            "common.coursePopup",
            "courses.applications",
          ]}
        >
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          {/* Renders nothing unless a chapter is taking applications, or the URL
              carries ?preview-popup. */}
          <CoursePopup />
        </ClientMessages>
      </body>
    </html>
  );
}
