import { useTranslations } from "next-intl";

import { isChapterRecruiting } from "@/data/openPositions";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/**
 * Who runs the chapter, by name.
 *
 * A volunteer chapter's credibility is its roster, so the names are the
 * section. design.md's portrait treatment (140px squares, serif name, orange
 * hover rule) waits for real photographs: none are inventoried for any
 * chapter, and a circle with initials in it is exactly the avatar placeholder
 * the system rejects. Until the photographs exist the names sit on hairlines
 * sharing one left edge.
 *
 * The recruiting line renders from `openPositions.ts`, so closing a chapter's
 * hiring closes it here too.
 */

/** A role's title in each language is under `chapters.team.roles.<role>`. */
export type TeamRole =
  | "director"
  | "researchOperationLead"
  | "researchOperationVu"
  | "researchOperations"
  | "researchOps"
  | "educationLead"
  | "eventsLead"
  | "communicationsLead"
  | "communityManager"
  | "discussionCoordinator"
  | "discussionGroupFacilitator"
  | "discussionFacilitator"
  | "facilitator"
  | "eventsTeamMember"
  | "advisor"
  | "advisoryBoard";

export type TeamMember = {
  name: string;
  role: TeamRole;
  /** Only Utrecht has profile URLs so far. */
  linkedin?: string;
};

export default function TeamBand({
  city,
  body,
  team,
}: {
  city: string;
  body: string;
  team: readonly TeamMember[];
}) {
  const recruiting = isChapterRecruiting(city);
  const t = useTranslations("chapters.team");
  const tReview = useTranslations("openPositions.applicationReview");

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="scroll-mt-36 border-t border-navy/10 bg-cream"
    >
      <div className="shell band-section">
        <div className="max-w-[var(--container-copy)]">
          <p className="kicker text-kicker text-navy/65">{t("kicker")}</p>
          <h2
            id="team-heading"
            className="mt-4 font-serif text-heading-sm text-navy"
          >
            {t("heading")}
          </h2>
          <p className="mt-4 font-sans text-body text-navy/74">{body}</p>
        </div>

        <ul
          role="list"
          className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {team.map((person) => (
            <li
              key={`${person.name}-${person.role}`}
              className="border-t border-navy/12 py-3.5"
            >
              <p className="font-serif text-title-sm text-navy">
                {person.linkedin ? (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-navy/20 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                  >
                    {person.name}
                    <ArrowUpRight
                      size={14}
                      weight="regular"
                      aria-hidden="true"
                      className="ml-1 inline-block shrink-0 align-[-2px]"
                    />
                    <span className="sr-only">{t("linkedin")}</span>
                  </a>
                ) : (
                  person.name
                )}
              </p>
              <p className="mt-0.5 font-sans text-footnote text-navy/65">
                {t(`roles.${person.role}`)}
              </p>
            </li>
          ))}
        </ul>

        {recruiting && (
          <div className="mt-10 flex flex-col items-start gap-5 border-t border-navy/14 pt-7">
            <p className="max-w-[var(--container-copy)] font-sans text-body text-navy/74">
              {t("recruiting")} {tReview("sentence")}
            </p>
            <Link
              href={`/open-positions#chapter-${city.toLowerCase()}`}
              className="btn-outline-ink"
            >
              {t("seeOpenPositions")}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
