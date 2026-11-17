import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { COMMUNITY_JOIN_URL } from "@/data/siteContact";
import { Link } from "@/i18n/navigation";

/**
 * The close. Inverse navy, because this band asks for a decision.
 *
 * The claim on the left, the two ways to act on the right, and the chapter's
 * three inboxes on one footnote line under the hairline. The accent button
 * says exactly what the hero's said: one label per destination, so the second
 * ask reads as the same door rather than a new one.
 */
export default function ChapterClose({
  city,
  eventsEmail,
  eduEmail,
  infoEmail,
  linktreeUrl,
}: {
  city: string;
  eventsEmail: string;
  eduEmail: string;
  infoEmail: string;
  linktreeUrl: string;
}) {
  const mailto =
    "underline decoration-white/35 underline-offset-4 hover:decoration-white focus-visible:decoration-white";
  const t = useTranslations("chapters.close");
  const tActions = useTranslations("common.actions");
  const tA11y = useTranslations("common.a11y");
  /* The address in "Events: <address>", as a mail link. */
  const mailLink = (email: string, chunks: ReactNode) => (
    <a href={`mailto:${email}`} className={mailto}>
      {chunks}
    </a>
  );

  return (
    <section
      id="join"
      aria-labelledby="join-heading"
      className="scroll-mt-36 bg-navy"
    >
      <div className="shell band-close">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2
              id="join-heading"
              className="max-w-[620px] font-serif text-closing text-white"
            >
              {t("heading", { city })}
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/78">
              {t("body")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <a
              href={COMMUNITY_JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent gap-2"
            >
              {tActions("joinCommunity")}
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> {tA11y("opensInNewTab")}</span>
            </a>
            <Link href="/get-involved" className="btn-ghost-inverse">
              {tActions("volunteer")}
            </Link>
          </div>
        </div>

        <p className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-white/16 pt-5 font-sans text-footnote text-white/60">
          <span>
            {t.rich("events", {
              email: eventsEmail,
              link: (chunks) => mailLink(eventsEmail, chunks),
            })}
          </span>
          <span aria-hidden="true" className="text-white/30">
            ·
          </span>
          <span>
            {t.rich("courses", {
              email: eduEmail,
              link: (chunks) => mailLink(eduEmail, chunks),
            })}
          </span>
          <span aria-hidden="true" className="text-white/30">
            ·
          </span>
          <span>
            {t.rich("everythingElse", {
              email: infoEmail,
              link: (chunks) => mailLink(infoEmail, chunks),
            })}
          </span>
          <span aria-hidden="true" className="hidden text-white/30 sm:inline">
            ·
          </span>
          <a
            href={linktreeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 ${mailto}`}
          >
            {t("allLinks", { city })}
            <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
            <span className="sr-only"> {tA11y("opensInNewTab")}</span>
          </a>
        </p>
      </div>
    </section>
  );
}
