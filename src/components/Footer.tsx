import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import { getDictionary, type Dictionary, type Locale } from "@/i18n";

/* Inverse navy close. Poppins italic for the stichting line and the
   column titles, Poppins for the links. One bottom rule, then the legal line
   and the cities. No second logo treatment.

   The nav above carries three routes only, so the footer carries the whole
   map: the community and its city doors, every programme, and the
   organisation pages the nav no longer names. */

/* A link is named by its key in en.json's footer.links, or, for a city or a
   platform, by its own name, which stays the same in every language. */
type LinkKey = keyof Dictionary["footer"]["links"];
type FooterLink = ({ key: LinkKey } | { name: string }) & { href: string; external?: boolean };

const columns: { title: keyof Dictionary["footer"]["columns"]; links: FooterLink[] }[] = [
  {
    title: "community",
    links: [
      { key: "community", href: "/community" },
      { name: "Utrecht", href: "/chapters/utrecht" },
      { name: "Groningen", href: "/chapters/groningen" },
      { name: "Amsterdam", href: "/chapters/amsterdam" },
      { key: "joinTheCommunity", href: COMMUNITY_JOIN_URL, external: true },
    ],
  },
  {
    title: "programmes",
    links: [
      { key: "courses", href: "/courses" },
      { key: "projectHub", href: "/research" },
      { key: "projectHubHandbook", href: "/research/handbook" },
      { key: "volunteer", href: "/get-involved" },
    ],
  },
  {
    title: "organisation",
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

const nameOf = (link: FooterLink, t: Dictionary) =>
  "key" in link ? t.footer.links[link.key] : link.name;

function FooterAnchor({
  link,
  t,
  iconSize = 16,
}: {
  link: FooterLink;
  t: Dictionary;
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
        {nameOf(link, t)}
        <ArrowUpRight size={iconSize} weight="regular" aria-hidden="true" />
        <span className="sr-only"> {t.common.opensInNewTab}</span>
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {nameOf(link, t)}
    </Link>
  );
}

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
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
                  <FooterAnchor link={social} t={t} iconSize={14} />
                </li>
              ))}
            </ul>
          </div>

          <div className="grid flex-1 gap-8 sm:grid-cols-3 lg:grid-cols-[repeat(3,max-content)] lg:justify-end lg:gap-x-28 xl:gap-x-40">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-[11px]">
                <p className="kicker text-kicker-sm text-white/50">{t.footer.columns[column.title]}</p>
                {column.links.map((link) => (
                  <FooterAnchor key={link.href} link={link} t={t} />
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
                href={document.href}
                className="font-sans text-footnote text-white/60 transition-colors hover:text-white focus-visible:text-white"
              >
                {nameOf(document, t)}
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
