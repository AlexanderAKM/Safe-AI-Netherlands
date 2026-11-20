import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import { localizePath, type Locale } from "@/i18n/routing";
import Link from "next/link";

/* Inverse navy close. Poppins italic for the stichting line and the
   column titles, Poppins for the links. One bottom rule, then the legal line
   and the cities. No second logo treatment.

   The nav above carries three routes only, so the footer carries the whole
   map: the community and its city doors, every programme, and the
   organisation pages the nav no longer names. */

/* `key` names the link's label under common.footer.links; city names and
   channel names are the same in every language, so they carry a `name`. */
type FooterLink = { key?: string; name?: string; href: string; external?: boolean };

const columns: { key: string; links: FooterLink[] }[] = [
  {
    key: "community",
    links: [
      { key: "community", href: "/community" },
      { name: "Utrecht", href: "/chapters/utrecht" },
      { name: "Groningen", href: "/chapters/groningen" },
      { name: "Amsterdam", href: "/chapters/amsterdam" },
      { key: "joinCommunity", href: COMMUNITY_JOIN_URL, external: true },
    ],
  },
  {
    key: "programmes",
    links: [
      { key: "courses", href: "/courses" },
      { key: "projectHub", href: "/research" },
      { key: "handbook", href: "/research/handbook" },
      { key: "volunteer", href: "/get-involved" },
    ],
  },
  {
    key: "organisation",
    links: [
      { key: "about", href: "/about" },
      { key: "team", href: "/team" },
      { key: "openPositions", href: "/open-positions" },
      { key: "contact", href: "/contact" },
    ],
  },
];

/* The same three channels layout.tsx declares in the organisation's JSON-LD. */
const socials: FooterLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/safe-ai-netherlands/",
    external: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/sainetherlands/",
    external: true,
  },
  {
    key: "newsletter",
    href: "https://safeainetherlands.substack.com/",
    external: true,
  },
];

const documents: FooterLink[] = [
  { key: "vision", href: "/about/vision" },
  { key: "theoryOfChange", href: "/about/theory-of-change" },
  { key: "codeOfConduct", href: "/about/code-of-conduct" },
];

function FooterAnchor({
  link,
  label,
  newTab,
  locale,
  iconSize = 16,
}: {
  link: FooterLink;
  label: string;
  /** "(opens in a new tab)", for the screen-reader hint on external links. */
  newTab: string;
  locale: Locale;
  iconSize?: 14 | 16;
}) {
  const className =
    "font-sans text-sm leading-5 text-white/78 transition-colors hover:text-white focus-visible:text-white";

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 ${className}`}
      >
        {label}
        <ArrowUpRight size={iconSize} weight="regular" aria-hidden="true" />
        <span className="sr-only"> {newTab}</span>
      </a>
    );
  }

  return (
    <Link href={localizePath(link.href, locale)} className={className}>
      {label}
    </Link>
  );
}

/* The footer takes its language as a prop rather than from the request, like
   everything in SiteShell (see there), so its links are written with
   localizePath and next/link instead of the locale-aware Link. */
export default async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "common.footer" });
  const tA11y = await getTranslations({ locale, namespace: "common.a11y" });
  const label = (link: FooterLink) =>
    link.key ? t(`links.${link.key}`) : (link.name ?? "");

  return (
    <footer className="border-t border-white/16 bg-navy">
      <div className="shell pb-10 pt-[52px]">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex w-full max-w-[420px] flex-col gap-3.5 lg:max-w-[300px] lg:shrink-0 xl:max-w-[420px]">
            <img
              src="/landing/logo-light-113.png"
              srcSet="/landing/logo-light-113.png 1x, /landing/logo-light-226.png 2x, /landing/logo-light-339.png 3x"
              alt="Safe AI Netherlands"
              className="h-12 w-auto self-start"
              width={113}
              height={48}
            />
            <p className="kicker text-kicker-sm text-white/50">
              Stichting Safe AI Netherlands
            </p>
            <a
              href="mailto:info@safeainetherlands.org"
              className="font-sans text-sm leading-5 text-white/78 transition-colors hover:text-white focus-visible:text-white"
            >
              info@safeainetherlands.org
            </a>
            <ul role="list" className="flex flex-wrap gap-x-5 gap-y-1">
              {socials.map((social) => (
                <li key={social.href}>
                  <FooterAnchor
                    link={social}
                    label={label(social)}
                    newTab={tA11y("opensInNewTab")}
                    locale={locale}
                    iconSize={14}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="grid flex-1 gap-8 sm:grid-cols-3 lg:grid-cols-[repeat(3,max-content)] lg:justify-end lg:gap-x-28 xl:gap-x-40">
            {columns.map((column) => (
              <div key={column.key} className="flex flex-col gap-[11px]">
                <p className="kicker text-kicker-sm text-white/50">
                  {t(`columns.${column.key}`)}
                </p>
                {column.links.map((link) => (
                  <FooterAnchor
                    key={link.href}
                    link={link}
                    label={label(link)}
                    newTab={tA11y("opensInNewTab")}
                    locale={locale}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[26px] flex flex-col justify-between gap-3 border-t border-white/16 pt-[18px] sm:flex-row sm:items-center">
          <p className="font-sans text-footnote text-white/60">
            &copy; {new Date().getFullYear()} Safe AI Netherlands
          </p>
          <div className="flex flex-wrap gap-5">
            {documents.map((document) => (
              <Link
                key={document.href}
                href={localizePath(document.href, locale)}
                className="font-sans text-footnote text-white/60 transition-colors hover:text-white focus-visible:text-white"
              >
                {t(`links.${document.key}`)}
              </Link>
            ))}
          </div>
          <p className="font-sans text-footnote text-white/60">
            Utrecht &middot; Groningen &middot; Amsterdam
          </p>
        </div>
      </div>
    </footer>
  );
}
