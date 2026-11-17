import type { ChapterName } from "@/data/courseApplications";
import type { Dictionary } from "@/i18n";

/* The chapters as the /community page digests them: the hero prints, the
   atlas and the fourth-chapter band all read this. Every fact is one the
   chapter's own page already states (src/app/chapters/<city>/page.tsx); keep
   them in step when a chapter page changes. Plain data, so both the server
   page and the client atlas can import it.

   Each chapter's words (where it comes from, its summary, its photograph's alt
   text and its facts) are in en.json under atlas.<id>. The course names are
   SAIN's and BlueDot's own, so they stay here in English.

   Groningen's research fact says "workshops" out loud: every NeurIPS and ICLR
   item in research.ts is a workshop paper. */

export type AtlasChapter = {
  id: keyof Dictionary["atlas"];
  city: ChapterName;
  index: string;
  href: string;
  photo: string;
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
    course: "Technical AI Safety & Frontier AI Governance",
    calendar: "cal-WD5xl5IYLpY7xNm",
    calendarUrl: "https://luma.com/user/SAIN_Amsterdam",
  },
];
