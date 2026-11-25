import { sainDocuments } from "@/data/sainDocuments";
import { publications } from "@/data/research";
import { hasDocumentIn } from "@/i18n/documents";
import { SITE_URL } from "@/i18n/metadata";
import { defaultLocale, localizePath, routing } from "@/i18n/routing";

/* Every page, in every language it exists in, with its alternates.

   A page that has been translated is listed once per language, and each
   entry names all of them (and x-default, English) as alternates, the
   sitemap form of the hreflang links in each page's <head>. A page that is
   still English only (the handbook, a document without a docs/nl/ copy, the
   papers) is listed once, in English: its /nl/... URL shows the same English
   text and names the English page as canonical, so it does not belong here. */

type Route = { path: string; translated: boolean };

const routes: Route[] = [
  { path: "", translated: true },
  { path: "/community", translated: true },
  { path: "/courses", translated: true },
  { path: "/about", translated: true },
  { path: "/research", translated: true },
  // Not /team: it is noindex and names /about as canonical (team/page.tsx).
  { path: "/get-involved", translated: true },
  { path: "/open-positions", translated: true },
  { path: "/new-chapters", translated: true },
  { path: "/contact", translated: true },
  { path: "/chapters/groningen", translated: true },
  { path: "/chapters/groningen/events", translated: true },
  { path: "/chapters/utrecht", translated: true },
  { path: "/chapters/amsterdam", translated: true },
  { path: "/research/handbook", translated: false },
  { path: "/research/apply", translated: true },
  { path: "/research/opportunities", translated: true },
  // The governing documents under /about/[document], read from the same
  // source the pages are generated from, so a new document cannot ship
  // unlisted. Translated once docs/nl/<file> exists.
  ...sainDocuments.map((document) => ({
    path: `/about/${document.slug}`,
    translated: hasDocumentIn(document.fileName, "nl"),
  })),
  // The papers hosted in the reader, from the same list as the pages.
  ...publications.flatMap((paper) =>
    paper.reader ? [{ path: `/research/papers/${paper.reader.slug}`, translated: false }] : [],
  ),
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** The page's absolute URL in one language. The English root stays
 *  "https://safeainetherlands.org" with no trailing slash, as before. */
function urlFor(path: string, locale: (typeof routing.locales)[number]) {
  if (locale === defaultLocale) return `${SITE_URL}${path}`;
  return `${SITE_URL}${localizePath(path || "/", locale)}`;
}

export async function GET() {
  const lastmod = new Date().toISOString();

  const entries = routes.flatMap((route, index) => {
    const locales = route.translated ? routing.locales : [defaultLocale];
    const changefreq = index === 0 ? "weekly" : "monthly";
    const priority = index === 0 ? "1.0" : "0.8";
    const alternates = route.translated
      ? [
          ...routing.locales.map(
            (language) =>
              `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(urlFor(route.path, language))}"/>`,
          ),
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(urlFor(route.path, defaultLocale))}"/>`,
        ].join("\n")
      : "";

    return locales.map(
      (locale) => `  <url>
    <loc>${escapeXml(urlFor(route.path, locale))}</loc>
${alternates ? `${alternates}\n` : ""}    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    );
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
