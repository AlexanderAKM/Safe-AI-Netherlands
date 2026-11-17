import type { ChapterName } from "@/data/courseApplications";

/* The three course tracks, read by the landing's CourseTracks and by
   CourseTabs on /courses. Each track's per-city routes resolve through
   courseApplications, so they cannot drift from the chapter pages.

   Their words are in messages/<locale>/courses.json under `tracks.<id>`: the
   title, tagline, who it suits, summary, outline, one line per city (under
   `cities.<city in lower case>`), and the photograph's alt text and caption. */

export type TrackId = "fundamentals" | "technical" | "policy";

export type Track = {
  id: TrackId;
  index: string;
  /* Typed as the chapter name rather than a loose string, so each row can
     resolve its own route out of courseApplications instead of carrying a
     second copy of it here. */
  cities: ChapterName[];
  photo: string;
  /** Rungs on disk for `photo`. See scripts/generate-responsive-images.mjs. */
  photoWidths: number[];
  /** Where the crop sits in the frame; centred unless the photo says otherwise. */
  photoPosition?: string;
};

export const TRACKS: Track[] = [
  {
    id: "fundamentals",
    index: "01",
    cities: ["Utrecht"],
    photo: "/landing/course-fundamentals.jpg",
    photoWidths: [640, 960, 1280, 1920],
  },
  {
    id: "technical",
    index: "02",
    cities: ["Utrecht", "Groningen", "Amsterdam"],
    photo: "/landing/course-technical.jpg",
    /* The source is 1024 wide, so the ladder stops at 960. */
    photoWidths: [640, 960],
  },
  {
    id: "policy",
    index: "03",
    cities: ["Utrecht", "Groningen", "Amsterdam"],
    photo: "/landing/course-policy.jpg",
    /* The master is 1920 wide, so the ladder stops at 1280. */
    photoWidths: [640, 960, 1280],
    /* Nearly square, so the wide stacked frame shows a band of it. Weighted
       toward the top, where the faces and the table are. */
    photoPosition: "50% 30%",
  },
];
