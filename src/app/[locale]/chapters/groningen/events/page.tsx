import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatDate } from "@/i18n/format";
import { localeAlternates } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

import Reveal from "@/components/landing/Reveal";
import {
  groningenEventYears,
  groningenEventsArchive,
  type GroningenArchivedEvent,
} from "@/data/groningenEventsArchive";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({
    locale,
    namespace: "chapters.groningenEvents.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates({ locale, path: "/chapters/groningen/events" }),
  };
}

/* The archive images are announcement graphics as often as they are
   photographs, so they are printed small and left to do their own work. Rungs
   are the `-{w}.webp` siblings written for this page. */
const WIDTHS = [320, 640];
const rung = (src: string, width: number) =>
  src.replace(/\.[a-zA-Z]+$/, `-${width}.webp`);

/* When an event ran. The English page prints the date and time exactly as the
   announcement did; every other language formats `start` and `end` with the
   messages under groningenEvents.event.when: "woensdag 1 juli 2026,
   18.00-22.00 uur". */
function eventWhen(
  event: GroningenArchivedEvent,
  locale: Locale,
  t: (key: string, values: Record<string, string>) => string,
): string {
  if (locale === "en") {
    return event.time ? `${event.date}, ${event.time}` : event.date;
  }
  const [startDay, startClock] = event.start.split("T");
  const [endDay, endClock] = event.end.split("T");
  const clock = (hhmm: string) => {
    const [hour, minute] = hhmm.split(":");
    return t("time", { hour, minute });
  };
  if (startDay !== endDay) {
    return t("range", {
      startDate: formatDate(startDay, locale, "weekdayLong"),
      startTime: clock(startClock),
      endDate: formatDate(endDay, locale, "weekdayLong"),
      endTime: clock(endClock),
    });
  }
  const date = formatDate(startDay, locale, "weekdayLong");
  if (startClock === endClock) return t("at", { date, time: clock(startClock) });
  return t("sameDay", { date, start: clock(startClock), end: clock(endClock) });
}

export default function GroningenEventsArchivePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = useTranslations("chapters.groningenEvents");
  const tWhen = useTranslations("chapters.groningenEvents.event.when");

  return (
    <>
      {/* A record, not a pitch: white ground, no photograph behind the claim,
          and the only action is back to the chapter. */}
      <section
        aria-labelledby="archive-heading"
        className="border-b border-navy/10 bg-white"
      >
        <div className="shell band-hero">
          <Link
            href="/chapters/groningen"
            className="inline-flex items-center gap-2 font-sans text-label text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
          >
            <ArrowLeft size={16} weight="regular" aria-hidden="true" />
            SAIN Groningen
          </Link>
          <h1
            id="archive-heading"
            className="mt-6 max-w-[720px] font-serif text-display text-navy"
          >
            {t("hero.heading")}
          </h1>
          <p className="mt-5 max-w-[var(--container-copy)] font-sans text-body text-navy/72">
            {t("hero.intro")}
          </p>
        </div>
      </section>

      <section id="archive-events" className="scroll-mt-36 bg-white">
        <div className="shell band-section flex flex-col gap-14">
          {groningenEventYears.map((year) => {
            const events = groningenEventsArchive.filter((event) =>
              event.date.includes(year),
            );
            if (events.length === 0) return null;

            return (
              <div key={year}>
                <div className="flex items-baseline justify-between gap-6 border-b border-navy/14 pb-3">
                  <h2 className="font-serif text-heading-sm text-navy">
                    {year}
                  </h2>
                  <p className="font-sans text-footnote text-navy/65">
                    {t("year.count", { count: events.length })}
                  </p>
                </div>

                <ul role="list">
                  {events.map((event) => (
                    <li
                      key={`${event.title}-${event.date}`}
                      className="grid gap-5 border-b border-navy/10 py-7 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[240px_minmax(0,1fr)]"
                    >
                      <div className="bg-white p-2 shadow-[0_7px_22px_#021C4D1F]">
                        <img
                          src={rung(event.image, WIDTHS[0])}
                          srcSet={WIDTHS.map(
                            (w) => `${rung(event.image, w)} ${w}w`,
                          ).join(", ")}
                          sizes="(min-width: 1024px) 224px, (min-width: 640px) 184px, calc(100vw - 48px)"
                          alt=""
                          width={640}
                          height={427}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[3/2] w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="font-sans text-footnote text-navy/65">
                          {eventWhen(event, locale, tWhen)}
                        </p>
                        <h3
                          lang="en"
                          className="mt-1.5 font-serif text-title-sm text-navy"
                        >
                          {event.title}
                        </h3>
                        {/* The blurbs are the original announcements, so many
                            of them invite you to something that has already
                            happened. Attributing the tense per row is what
                            keeps a 2023 entry from reading as a live one. */}
                        <p className="kicker mt-3 text-kicker-sm text-navy/55">
                          {t("event.fromAnnouncement")}
                        </p>
                        <div
                          lang="en"
                          className="mt-1.5 flex max-w-[var(--container-copy)] flex-col gap-2.5 font-sans text-[15.5px] leading-[25px] text-navy/74"
                        >
                          {event.description
                            .split("\n\n")
                            .map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-navy">
        <div className="shell band-close flex flex-col items-start gap-6">
          <Reveal>
            <p className="max-w-[560px] font-serif text-closing text-white">
              {t("close.heading")}
            </p>
          </Reveal>
          <Link href="/chapters/groningen#events" className="btn-accent">
            {t("close.button")}
          </Link>
        </div>
      </section>
    </>
  );
}
