import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  CalendarBlank,
  CaretDown,
  Compass,
  Flask,
  GraduationCap,
  MapPin,
  Megaphone,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

import RuleList from "./RuleList";
import OutlineRows from "./OutlineRows";
import {
  buildApplicationUrl,
  OPEN_POSITION_FORM_VALUE,
  type Role,
  type Team,
} from "@/data/openPositions";
import FormLanguageNote from "@/components/FormLanguageNote";

/* The career row from design.md: a full-width row on a hairline with a 26px
   orange stroke icon, never an icon in a coloured tile. The glyph names the
   team rather than the role, because the team is what the reader is joining.

   #FF6025 at 26px light is a large glyph, so it stays the identity orange
   here; every orange letterform on this page is orange-ink instead. */
const TEAM_ICON: Record<Team, Icon> = {
  directors: Compass,
  education: GraduationCap,
  events: CalendarBlank,
  communications: Megaphone,
  community: UsersThree,
  outreach: MapPin,
  research: Flask,
};

/* The rows a role's background and terms can have, in card order. The words
   are the role's messages (openPositions.roles.<id>); a background row the
   role leaves out is left off the card. */
const BACKGROUND_ROWS = ["field", "level", "experience", "softSkills"] as const;
const TERMS = ["salary", "contract", "location", "startDate"] as const;

function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <h4 className="kicker mb-3 text-kicker-sm text-navy/65">{children}</h4>
  );
}

export default function RoleDisclosure({
  role,
  note,
  chapterSlug,
  applyUrl: applyUrlOverride,
}: {
  role: Role;
  note?: string;
  chapterSlug?: string;
  applyUrl?: string;
}) {
  const t = useTranslations("openPositions.roleCard");
  const tRole = useTranslations(`openPositions.roles.${role.id}`);
  const tA11y = useTranslations("common.a11y");
  const applyUrl =
    applyUrlOverride ??
    buildApplicationUrl({
      chapter: chapterSlug,
      role: role.formRoleValue,
    });
  const TeamIcon = TEAM_ICON[role.team];
  const title = tRole("title");
  /** One of the role's lists, or none if its messages leave it out. */
  const tList = (key: string): string[] =>
    tRole.has(key) ? (tRole.raw(key) as string[]) : [];
  const goodFitIf = tList("goodFitIf");
  const alsoStrong = tList("alsoStrong");
  const applicationProcess = tList("applicationProcess");
  const backgroundRows = BACKGROUND_ROWS.filter((row) =>
    tRole.has(`background.${row}`),
  );

  return (
    <details className="group border-t border-navy/10">
      <summary className="flex list-none items-start gap-5 py-[18px] pr-1 [&::-webkit-details-marker]:hidden">
        <TeamIcon
          size={26}
          weight="light"
          className="mt-0.5 shrink-0 text-orange"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <h3 className="font-serif text-title-sm text-navy">{title}</h3>
            {role.employment ? (
              <span className="border border-navy/16 px-2 py-[3px] font-sans text-footnote text-orange-ink">
                {t(`badges.${role.employment.badge}`)}
              </span>
            ) : null}
            {role.commitmentBadge ? (
              <span className="border border-navy/16 px-2 py-[3px] font-sans text-footnote text-navy/70">
                {t(`badges.${role.commitmentBadge}`)}
              </span>
            ) : null}
          </div>
          <p className="mt-1.5 font-sans text-caption text-navy/65">
            {t("summary", {
              time: tRole("timeCommitment"),
              reportsTo: tRole("reportsTo"),
            })}
          </p>
        </div>
        <CaretDown
          size={14}
          weight="bold"
          className="mt-2 shrink-0 text-navy/50 transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <div className="pb-9 sm:pl-[46px]">
        <p className="max-w-[760px] font-sans text-body text-navy/74">
          {tRole("mission")}
        </p>
        {note ? (
          <p className="mt-3 max-w-[760px] font-sans text-caption text-navy/65">
            {note}
          </p>
        ) : null}

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
          <div className="flex flex-col gap-7">
            <div>
              <PanelLabel>{t("panels.responsibilities")}</PanelLabel>
              <RuleList items={tList("responsibilities")} />
            </div>
            {goodFitIf.length ? (
              <div>
                <PanelLabel>{t("panels.goodFitIf")}</PanelLabel>
                <RuleList items={goodFitIf} />
              </div>
            ) : null}
            {alsoStrong.length ? (
              <div>
                <PanelLabel>{t("panels.alsoStrong")}</PanelLabel>
                <RuleList items={alsoStrong} />
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-7">
            {backgroundRows.length ? (
              <div>
                <PanelLabel>{t("panels.background")}</PanelLabel>
                <dl className="flex flex-col gap-3">
                  {backgroundRows.map((row) => (
                    <div key={row}>
                      <dt className="font-sans text-label text-navy">
                        {t(`background.${row}`)}
                      </dt>
                      <dd className="mt-0.5 font-sans text-caption leading-[20px] text-navy/72">
                        {tRole(`background.${row}`)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
            {role.employment ? (
              <div>
                <PanelLabel>{t("panels.terms")}</PanelLabel>
                <dl className="flex flex-col gap-3">
                  {TERMS.map((term) => (
                    <div key={term}>
                      <dt className="font-sans text-label text-navy">
                        {t(`terms.${term}`)}
                      </dt>
                      <dd className="mt-0.5 font-sans text-caption leading-[20px] text-navy/72">
                        {tRole(`employment.${term}`)}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6">
                  <PanelLabel>{t("panels.benefits")}</PanelLabel>
                  <RuleList items={tList("employment.benefits")} />
                </div>
              </div>
            ) : null}
            <div>
              <PanelLabel>{t("panels.collaborations")}</PanelLabel>
              <p className="font-sans text-caption leading-[20px] text-navy/72">
                {tRole("collaborations")}
              </p>
            </div>
          </div>
        </div>

        {/* One rule above the stages, none between them: the numbers carry the
            order, and the rule marks where the role ends and the process
            starts. */}
        {applicationProcess.length ? (
          <div className="mt-8 max-w-[760px] border-t border-navy/14 pt-7">
            <PanelLabel>{t("panels.applicationProcess")}</PanelLabel>
            <OutlineRows items={applicationProcess} rules={false} />
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent gap-2"
          >
            {t("apply")}
            <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
            <span className="sr-only"> {tA11y("opensInNewTab")}</span>
          </a>
          {/* The footnote tells the applicant what to do in the form rather
              than promising what the form will already have done for them: the
              pre-fill entry ids in openPositions.ts are still unverified, and
              Google drops entry keys it does not recognise without a word. The
              form is in English, so the option it names is English in every
              language: the catch-all option, the broader role's option, or the
              role's own title, which matches the form while job titles stay
              in English (messages/GLOSSARY.md). */}
          {applyUrlOverride ? (
            <FormLanguageNote className="basis-full" />
          ) : (
            <p className="max-w-[400px] font-sans text-footnote text-navy/65">
              {role.formRoleValue === OPEN_POSITION_FORM_VALUE
                ? t("hints.openPosition", {
                    option: OPEN_POSITION_FORM_VALUE,
                    title,
                  })
                : role.specialisationOf
                  ? t("hints.specialisation", {
                      option: role.specialisationOf,
                      title,
                    })
                  : t("hints.shared", { option: title })}
              <FormLanguageNote inline />
            </p>
          )}
        </div>
      </div>
    </details>
  );
}
