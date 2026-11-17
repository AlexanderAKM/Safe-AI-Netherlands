import type { ChapterName } from "@/data/courseApplications";
import type { Dictionary } from "@/i18n";

/* The three course tracks, read by the landing's CourseTracks and by the
   /courses tabs. Each track's per-city routes resolve through
   courseApplications, so they cannot drift from the chapter pages.

   The track names are SAIN's own and stay in English in every language. All
   the other words (tagline, who it suits, summary, outline, what runs in each
   city, the photograph's alt text and caption) are in en.json under
   tracks.<id>. */

export type TrackId = keyof Dictionary["tracks"];

export type Track = {
  id: TrackId;
  index: string;
  title: string;
  /* Typed as the chapter name rather than a loose string, so each row can
     resolve its own route out of courseApplications instead of carrying a
     second copy of it here. Each one's line is tracks.<id>.cities.<city>. */
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
    title: "AI Safety Fundamentals",
    cities: ["Utrecht"],
    photo: "/landing/course-fundamentals.jpg",
    photoWidths: [640, 960, 1280, 1920],
  },
  {
    id: "technical",
    index: "02",
    title: "Technical Alignment",
    cities: ["Utrecht", "Groningen", "Amsterdam"],
    photo: "/landing/course-technical.jpg",
    /* Only these two rungs exist on disk; the source is 960 wide. Listing
       1280 and 1920 here sent wide viewports to files that were never
       written, which is why this tab's photograph came up blank. */
    photoWidths: [640, 960],
  },
  {
    id: "policy",
    index: "03",
    title: "Governance & Policy",
    cities: ["Utrecht", "Groningen", "Amsterdam"],
    photo: "/landing/course-policy.jpg",
    /* The master is 1920 wide, so the ladder stops at 1280. */
    photoWidths: [640, 960, 1280],
    /* Nearly square, so the wide stacked frame shows a band of it. Weighted
       toward the top, where the faces and the table are. */
    photoPosition: "50% 30%",
  },
];

/** What a track runs in one city, from its words in the dictionary. */
export function trackCityDetail(words: Dictionary["tracks"][TrackId], city: ChapterName): string {
  return (words.cities as Partial<Record<ChapterName, string>>)[city] ?? "";
}
