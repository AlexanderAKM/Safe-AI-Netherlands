import type { ChapterName } from "@/data/courseApplications";

/* The chapters as the /community page digests them: the hero prints, the
   atlas and the fourth-chapter band all read this. Every fact is one the
   chapter's own page already states (src/app/chapters/<city>/page.tsx); keep
   them in step when a chapter page changes. Plain data, so both the server
   page and the client atlas can import it.

   The words are in messages/<locale>/community.json, under
   `atlas.chapters.<id>`: the chapter's origin, its summary, the photograph's
   alt text and the facts. What stays here is the same in every language. */

export type AtlasChapter = {
  /** The chapter's key under community.atlas.chapters. */
  id: string;
  city: ChapterName;
  index: string;
  href: string;
  photo: string;
  /** The first fact, under "Directed by": a name, so it is not translated. */
  director: string;
  /** The other facts, in order: keys under `atlas.chapters.<id>.facts`,
   *  each with a `label` and a `value`. */
  facts: string[];
  /** Course titles are names, and stay English in every language. */
  course: string;
  calendar: string;
  calendarUrl: string;
};

export const ATLAS: AtlasChapter[] = [
  {
    id: "utrecht",
    city: "Utrecht",
    index: "01",
    href: "/chapters/utrecht",
    photo: "/photos/cities/utrecht-hero",
    director: "Riccardo Campanella",
    facts: ["community", "thisYear"],
    course: "AI Safety Fundamentals",
    calendar: "cal-2gYun0D26BriJ5z",
    calendarUrl: "https://lu.ma/sain-utrecht-events",
  },
  {
    id: "groningen",
    city: "Groningen",
    index: "02",
    href: "/chapters/groningen",
    photo: "/photos/cities/groningen-hero",
    director: "Tarteel Mohamed",
    /* Research: workshops, said out loud, because every NeurIPS and ICLR
       item in research.ts is a workshop paper. */
    facts: ["sinceOctober2023", "research"],
    course: "Technical AI Safety & Frontier AI Governance",
    calendar: "cal-jjqTmBdWcqoyEUF",
    calendarUrl: "https://luma.com/user/SAINGroningen",
  },
  {
    id: "amsterdam",
    city: "Amsterdam",
    index: "03",
    href: "/chapters/amsterdam",
    photo: "/photos/cities/amsterdam-hero",
    director: "Ana Paula Castillo Rodriguez",
    facts: ["courses", "onStage"],
    course: "Technical AI Safety & Frontier AI Governance",
    calendar: "cal-WD5xl5IYLpY7xNm",
    calendarUrl: "https://luma.com/user/SAIN_Amsterdam",
  },
];
