/* The text that stays in src/data/ rather than en.json, gathered into one
   object for the translator: open positions, the new-chapters call, course
   application notes, and the Project Hub's paper summaries and supervisor
   notes.

   Only what the site shows today is taken: roles that are posted, a course
   note that has not lapsed. Names, role titles, paper titles and venues, URLs
   and form values stay out; they are English in every language. Entries are
   keyed by the id they have in the data file, so a Dutch copy can be matched
   back to them. */

import { importSource } from "./load-ts.mjs";

/** The listed keys of `object` that are set, in the listed order. */
function pick(object, keys) {
  const picked = {};
  for (const key of keys) {
    if (object?.[key] !== undefined && object[key] !== "") picked[key] = object[key];
  }
  return picked;
}

function notesByRole(postings = []) {
  return Object.fromEntries(postings.filter((p) => p.note).map((p) => [p.roleId, p.note]));
}

function nonEmpty(object) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) =>
      Array.isArray(value) ? value.length > 0 : typeof value === "object" ? Object.keys(value).length > 0 : true,
    ),
  );
}

function openPositionsContent(data) {
  const { ROLES, chapterPositions, nationalPosting, APPLICATION_REVIEW, APPLICATION_TIMELINE } = data;
  const posted = [
    ...chapterPositions.flatMap((chapter) => chapter.postings ?? []),
    ...(nationalPosting.postings ?? []),
  ].map((posting) => posting.roleId);

  const roles = {};
  for (const id of posted) {
    const role = ROLES[id];
    if (!role || roles[id]) continue;
    roles[id] = pick(role, [
      "commitmentBadge",
      "timeCommitment",
      "reportsTo",
      "mission",
      "responsibilities",
      "preferredBackground",
      "goodFitIf",
      "alsoStrong",
      "collaborations",
      "applicationProcess",
    ]);
    if (role.employment) {
      roles[id].employment = pick(role.employment, ["badge", "location", "salary", "contract", "startDate", "benefits"]);
    }
  }

  return {
    applicationReview: APPLICATION_REVIEW.sentence,
    applicationTimeline: APPLICATION_TIMELINE,
    chapters: Object.fromEntries(
      chapterPositions.map((chapter) => [
        chapter.chapterSlug,
        nonEmpty({
          ...pick(chapter, ["heading", "blurb", "closedNote"]),
          notes: notesByRole(chapter.postings),
        }),
      ]),
    ),
    national: nonEmpty({
      ...pick(nationalPosting, ["heading", "blurb", "closedNote"]),
      notes: notesByRole(nationalPosting.postings),
    }),
    roles,
  };
}

function newChaptersContent(data) {
  return {
    softDeadline: data.SOFT_DEADLINE,
    softDeadlineShort: data.SOFT_DEADLINE_SHORT,
    cities: Object.fromEntries(
      data.FOUNDING_CITIES.map((city) => [city.id, pick(city, ["origin", "why", "profile"])]),
    ),
    alreadyThere: data.ALREADY_THERE,
    incubationMilestones: data.INCUBATION_MILESTONES,
    incubationStops: data.INCUBATION_STOPS,
    offer: Object.fromEntries(data.FOUNDING_OFFER.map((item) => [item.icon, pick(item, ["title", "detail"])])),
    roles: Object.fromEntries(
      data.FOUNDING_ROLES.map((role) => [
        role.id,
        pick(role, ["hours", "summary", "about", "firstMonths", "responsibilities", "goodFitIf", "alsoStrong", "logistics"]),
      ]),
    ),
    applicationSteps: data.FOUNDING_APPLICATION_STEPS,
  };
}

function courseApplicationsContent(data) {
  return Object.fromEntries(
    data.courseApplications.map((entry) => [
      entry.chapter,
      pick(entry, ["deadlines", "rollingNote", "chapterNote", "closedNote"]),
    ]),
  );
}

function researchContent(data) {
  return {
    paperSummaries: Object.fromEntries(
      data.publications.filter((paper) => paper.featured).map((paper) => [paper.chipTitle, paper.featured.summary]),
    ),
    supervisorNotes: Object.fromEntries(
      data.supervisors
        .filter((person) => person.availabilityNote)
        .map((person) => [person.name, person.availabilityNote]),
    ),
  };
}

export async function buildContent() {
  return {
    openPositions: openPositionsContent(await importSource("data/openPositions.ts")),
    newChapters: newChaptersContent(await importSource("data/newChapters.ts")),
    courseApplications: courseApplicationsContent(await importSource("data/courseApplications.ts")),
    research: researchContent(await importSource("data/research.ts")),
  };
}
