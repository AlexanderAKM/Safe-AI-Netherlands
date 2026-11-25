import { useLocale, useTranslations } from "next-intl";
import {
  ArrowUpRight,
  CalendarBlank,
  CaretDown,
  Compass,
  GraduationCap,
  Megaphone,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

import RuleList from "@/components/careers/RuleList";
import OutlineRows from "@/components/careers/OutlineRows";
import {
  buildFoundingApplicationUrl,
  FOUNDING_LOGISTICS,
  type FoundingRole,
  type FoundingRoleTeam,
} from "@/data/newChapters";
import { localizePath, type Locale } from "@/i18n/routing";
import FormLanguageNote from "@/components/FormLanguageNote";

/* The career row from design.md, grown to carry a full posting: the summary
   row is the same hairline, orange stroke icon and serif title as
   /open-positions, and the panel follows the posting's own order (about the
   role, first months, responsibilities, fit, logistics) so the page and the
   form read as one document. */
const TEAM_ICON: Record<FoundingRoleTeam, Icon> = {
  directors: Compass,
  education: GraduationCap,
  events: CalendarBlank,
  communications: Megaphone,
};

function PanelLabel({ children }: { children: ReactNode }) {
  return <h4 className="kicker mb-3 text-kicker-sm text-navy/65">{children}</h4>;
}

export default function FoundingRoleDisclosure({ role }: { role: FoundingRole }) {
  const t = useTranslations("newChapters.roleCard");
  const tRole = useTranslations(`newChapters.foundingRoles.${role.id}`);
  const tA11y = useTranslations("common.a11y");
  const locale = useLocale() as Locale;
  const TeamIcon = TEAM_ICON[role.team];
  const title = tRole("title");
  const tList = (key: string) => tRole.raw(key) as string[];

  return (
    <details id={role.id} className="group scroll-mt-36 border-t border-navy/10">
      <summary className="flex cursor-pointer list-none items-start gap-5 py-[22px] pr-1 [&::-webkit-details-marker]:hidden">
        <TeamIcon
          size={26}
          weight="light"
          className="mt-0.5 shrink-0 text-orange"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <h3 className="font-serif text-title text-navy">{title}</h3>
            <span className="border border-navy/16 px-2 py-[3px] font-sans text-footnote text-orange-ink">
              {t("badge")}
            </span>
          </div>
          <p className="mt-1.5 font-sans text-caption text-navy/65">
            {tRole("summary")} {tRole("hours", { term: t("term") })}
          </p>
        </div>
        <CaretDown
          size={14}
          weight="bold"
          className="mt-2 shrink-0 text-navy/50 transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <div className="pb-10 sm:pl-[46px]">
        <div className="flex max-w-[760px] flex-col gap-4">
          {tList("about").map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="font-sans text-body text-navy/74">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14">
          <div className="flex flex-col gap-8">
            <div>
              <PanelLabel>{t("panels.firstMonths")}</PanelLabel>
              <OutlineRows items={tList("firstMonths")} />
            </div>
            <div>
              <PanelLabel>{t("panels.responsibilities")}</PanelLabel>
              <RuleList items={tList("responsibilities")} />
            </div>
            <div>
              <PanelLabel>{t("panels.goodFitIf")}</PanelLabel>
              <RuleList items={tList("goodFitIf")} />
            </div>
            <div>
              <PanelLabel>{t("panels.alsoStrong")}</PanelLabel>
              <RuleList items={tList("alsoStrong")} />
            </div>
          </div>

          {/* The terms stay in view while the long left column scrolls past. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <PanelLabel>{t("panels.logistics")}</PanelLabel>
            <dl className="flex flex-col">
              {FOUNDING_LOGISTICS.map(({ id, shared }) => (
                <div key={id} className="border-t border-navy/10 py-3 last:border-b">
                  <dt className="font-sans text-label text-navy">
                    {t(`logistics.terms.${id}`)}
                  </dt>
                  <dd className="mt-0.5 font-sans text-caption leading-[20px] text-navy/72">
                    {shared
                      ? t(`logistics.${id}`)
                      : tRole(`logistics.${id}`, {
                          flexible: t("logistics.flexible"),
                        })}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={localizePath(
              buildFoundingApplicationUrl({ role: role.formValue }),
              locale,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent gap-2"
          >
            {t("applyAs", { role: title })}
            <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
            <span className="sr-only"> {tA11y("opensInNewTab")}</span>
          </a>
          <p className="max-w-[420px] font-sans text-footnote text-navy/65">
            {t("oneForm")}
            <FormLanguageNote inline />
          </p>
        </div>
      </div>
    </details>
  );
}
