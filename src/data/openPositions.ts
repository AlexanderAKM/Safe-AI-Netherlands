/**
 * Open positions content for the /open-positions page.
 *
 * Source of truth for role descriptions: working_docs/foundations/06_role_templates.md
 * Roles here are written as marketing-friendly distillations that still reflect
 * the full template (mission, responsibilities, preferred background, collaborations).
 *
 * To open or close a position for a chapter, edit `chapterPositions` below.
 * For roles that belong to SAIN Netherlands as a whole rather than to a single
 * chapter, edit `nationalPosting`.
 *
 * The words are in the messages, one file per language
 * (messages/<locale>/openPositions.json): each role's posting under
 * `roles.<id>`, each chapter's heading and blurb under `chapters`, the
 * application steps under `howToApply.steps`. This file keeps what is the
 * same in every language: ids, flags, form values, inboxes and links.
 */

// -----------------------------------------------------------------------------
// Application form (Google Form)
// -----------------------------------------------------------------------------

/**
 * Single Google Form for all chapters and roles.
 *
 * PRE-SHIP BLOCKER (checked 13 September 2026): fetching the URL below returns
 * HTTP 401 with an ordinary browser user agent, which means the form is not
 * publicly readable: it is either restricted to signed-in or in-organisation
 * Google accounts, or it no longer exists. A public form answers 200. Every
 * chapter apply button on /open-positions points here, so before this page
 * ships someone has to open the form in a logged-out browser and confirm an
 * outside applicant can reach and submit it. If they cannot, point the chapter
 * apply CTAs at the chapter inboxes until the form is public.
 *
 * SETUP NOTES:
 * - Form fields: Name, Email, Chapter (Amsterdam / Utrecht / Groningen), Role(s), CV upload,
 *   Motivation letter upload (or long-text), LinkedIn (optional), availability.
 * - Email routing: configure a Google Apps Script trigger on form submission
 *   that emails info@safeainetherlands.org plus the relevant chapter inbox
 *   (infoams@ or infoutr@) based on the "Chapter" answer. Apps Script template
 *   is left as an action item for whoever sets up the form. Until that trigger
 *   exists the page must not promise where an application lands, so the
 *   routing sentence has been taken out of the how-to-apply copy.
 * - Pre-fill: this URL is appended with `&entry.<id>=<value>` to pre-select the
 *   chapter and role for the applicant. Until the form exists, the URL below is
 *   a placeholder that links to the contact page so the page is never broken.
 */
export const APPLICATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfp_XJWTbIUzf7szLlq4pe_RXUYxeK8B1SzKt5TUwkREmINtA/viewform";

/**
 * Application form for the Head of Projects role only.
 *
 * National roles do not go through the chapter Google Form: each one has its
 * own form, because the questions are role-specific rather than
 * chapter-and-role shaped. This Airtable form is for the Head of Projects
 * and nothing else. Give any future national role its own URL rather
 * than reusing this one.
 */
export const RESEARCH_OPERATIONS_LEAD_APPLICATION_FORM_URL =
  "https://airtable.com/appMwcwhDIpVSvLrz/pagfucm2gVY91sjPg/form";

/**
 * Pre-fill entry IDs for the Google Form. Still unconfirmed: replace with the
 * real IDs read off a pre-filled link from the live form (open the form, use
 * "Get pre-filled link", and read the entry ids out of the resulting URL).
 * Google silently drops unknown entry keys, so a wrong id costs the applicant
 * nothing except a field they fill in themselves. Nothing on the page promises
 * the pre-fill until these are verified.
 */
export const FORM_PREFILL = {
  chapterEntryId: "entry.2132087508",
  roleEntryId: "entry.542644840",
};

export function buildApplicationUrl(opts?: {
  chapter?: string;
  role?: string;
}): string {
  const url = new URL(APPLICATION_FORM_URL);
  url.searchParams.set("usp", "pp_url");
  if (opts?.chapter) {
    url.searchParams.set(FORM_PREFILL.chapterEntryId, opts.chapter);
  }
  if (opts?.role) {
    url.searchParams.set(FORM_PREFILL.roleEntryId, opts.role);
  }
  return url.toString();
}

/**
 * Exact text of the Communications Team Member option in the Google Form.
 * Web Designer, Content Creator, and Graphic Designer are presented as
 * distinct roles on the website but pre-fill this single form option, since
 * they are specialisations of the Communications Team Member role.
 */
export const COMMS_TEAM_FORM_VALUE =
  "Communications Team member (general or Web Designer, Content Creator, Graphic Designer, Photographer)";

/**
 * Exact text of the catch-all option in the Google Form's role field.
 *
 * The form is not extended when a new role goes live on the website, so roles
 * with no option of their own point here instead. Their card tells the
 * applicant to pick this option and name the actual role in the motivation
 * letter, which is what `formRoleValue === OPEN_POSITION_FORM_VALUE` switches
 * on in the apply hint.
 */
export const OPEN_POSITION_FORM_VALUE = "Open position";

// -----------------------------------------------------------------------------
// Role catalogue
// -----------------------------------------------------------------------------

export type Team =
  | "directors"
  | "education"
  | "events"
  | "communications"
  | "community"
  | "outreach"
  | "research";

export const TEAM_LABELS: Record<Team, string> = {
  directors: "Chapter Leadership",
  education: "Education",
  events: "Events",
  communications: "Communications",
  community: "Community",
  outreach: "Outreach",
  research: "Research",
};

export const TEAM_ORDER: Team[] = [
  "directors",
  "education",
  "events",
  "communications",
  "community",
  "outreach",
  "research",
];

/** The labels a role's badge can carry, under openPositions.roleCard.badges. */
export type RoleBadge = "paidPartTime" | "paidFullTime";

/*
 * What a role says lives in the messages, in each language, under
 * openPositions.roles.<id> (messages/<locale>/openPositions.json):
 *
 *   title, reportsTo, timeCommitment, mission, collaborations
 *   responsibilities    the "What you would do" list
 *   background          field / level / experience / softSkills: the
 *                       structured background for volunteer roles. A row
 *                       left out of the messages is left off the card.
 *   goodFitIf           "You may be a good fit if you...". Paid staff roles
 *                       use it, with alsoStrong, instead of `background`,
 *                       matching how the job posting itself is written.
 *   alsoStrong          "Strong candidates may also have...": non-essential
 *                       strengths.
 *   employment          salary / contract / location / startDate / benefits,
 *                       for a role with `employment` set below.
 *   applicationProcess  role-specific hiring stages, shown on the role's card.
 *
 * A list a role does not have is absent from its messages, and its card
 * leaves that part out.
 */
export type Role = {
  /** Also the role's key in the messages: openPositions.roles.<id>. */
  id: string;
  team: Team;
  scope: "chapter" | "national";
  /**
   * Short pill shown next to the role title to flag the shape of the
   * commitment, e.g. "Part-time". Shares the accent pill style with
   * `employment.badge` but is independent of it: setting this does not mark
   * the role as salaried or add the terms and benefits block.
   */
  commitmentBadge?: RoleBadge;
  /**
   * Set only for paid staff positions. SAIN is otherwise a volunteer
   * organisation, so the presence of this field is what marks a listing as a
   * salaried job and switches the card over to showing terms and benefits
   * (their text is `employment` in the role's messages).
   */
  employment?: {
    /** Short badge shown next to the role title, e.g. "Paid - Full-time". */
    badge: RoleBadge;
  };
  /**
   * The value the form's role field is pre-filled with: the exact text of
   * the role's option in the Google Form, which is in English, so this stays
   * English in every language. Usually the role's English title. Several
   * distinct website roles can share a single form option (e.g.
   * Communications Team Member specialisations), and a role the form has no
   * option for uses OPEN_POSITION_FORM_VALUE.
   */
  formRoleValue: string;
  /**
   * The broader role this one is a specialisation of, named as its option
   * reads in the (English) form: the role card tells the applicant to choose
   * that option.
   */
  specialisationOf?: string;
};

export const ROLES: Record<string, Role> = {
  "education-lead": {
    id: "education-lead",
    team: "education",
    scope: "chapter",
    formRoleValue: "Education Lead",
  },

  "education-course-facilitator": {
    id: "education-course-facilitator",
    team: "education",
    scope: "chapter",
    formRoleValue: "Education Course Facilitator",
  },

  "education-discussion-lead": {
    id: "education-discussion-lead",
    team: "education",
    scope: "chapter",
    formRoleValue: "Education Discussion Lead",
  },

  "events-lead": {
    id: "events-lead",
    team: "events",
    scope: "chapter",
    /* Paid since September 2026 (upstream #54). The badge is what tells a
       reader this chapter role is compensated where its neighbours are not. */
    commitmentBadge: "paidPartTime",
    formRoleValue: "Events Lead",
  },

  "events-team-member": {
    id: "events-team-member",
    team: "events",
    scope: "chapter",
    formRoleValue: "Events Team Member",
  },

  "communications-lead": {
    id: "communications-lead",
    team: "communications",
    scope: "chapter",
    formRoleValue: "Communications Lead",
  },

  "communications-team-member": {
    id: "communications-team-member",
    team: "communications",
    scope: "chapter",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
  },

  "web-designer": {
    id: "web-designer",
    team: "communications",
    scope: "chapter",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "content-creator": {
    id: "content-creator",
    team: "communications",
    scope: "chapter",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "graphic-designer": {
    id: "graphic-designer",
    team: "communications",
    scope: "chapter",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "photographer": {
    id: "photographer",
    team: "communications",
    scope: "chapter",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "community-manager": {
    id: "community-manager",
    team: "community",
    scope: "chapter",
    formRoleValue: "Community Manager",
  },

  "on-campus-ambassador": {
    id: "on-campus-ambassador",
    team: "outreach",
    scope: "chapter",
    formRoleValue: "On-Campus Ambassador",
  },

  "research-operations-lead": {
    id: "research-operations-lead",
    team: "research",
    scope: "national",
    employment: { badge: "paidFullTime" },
    formRoleValue: "Head of Projects",
  },

  "research-operations": {
    id: "research-operations",
    team: "research",
    scope: "national",
    formRoleValue: "Research Operations",
  },

  "education-lead-utrecht": {
    id: "education-lead-utrecht",
    team: "education",
    scope: "chapter",
    commitmentBadge: "paidPartTime",
    formRoleValue: "Education Lead",
  },

  "research-ops-repository-steward": {
    id: "research-ops-repository-steward",
    team: "research",
    scope: "chapter",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
  },

  "education-facilitator-evals": {
    id: "education-facilitator-evals",
    team: "education",
    scope: "chapter",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
    specialisationOf: "Education Course Facilitator",
  },

  "education-facilitator-cybersec": {
    id: "education-facilitator-cybersec",
    team: "education",
    scope: "chapter",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
    specialisationOf: "Education Course Facilitator",
  },

  "education-facilitator-biosecurity": {
    id: "education-facilitator-biosecurity",
    team: "education",
    scope: "chapter",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
    specialisationOf: "Education Course Facilitator",
  },

  "education-facilitator-embodied": {
    id: "education-facilitator-embodied",
    team: "education",
    scope: "chapter",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
    specialisationOf: "Education Course Facilitator",
  },

  "sain-ambassador": {
    id: "sain-ambassador",
    team: "outreach",
    scope: "chapter",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
  },

  "events-team-member-facilitator": {
    id: "events-team-member-facilitator",
    team: "events",
    scope: "chapter",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
    specialisationOf: "Events Team Member",
  },

  "governance-coordinator": {
    id: "governance-coordinator",
    team: "education",
    scope: "chapter",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
  },

  "education-facilitator-governance": {
    id: "education-facilitator-governance",
    team: "education",
    scope: "chapter",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
    specialisationOf: "Education Course Facilitator",
  },

  "social-media-copywriter": {
    id: "social-media-copywriter",
    team: "communications",
    scope: "chapter",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "video-editor-short-form": {
    id: "video-editor-short-form",
    team: "communications",
    scope: "chapter",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "communications-lead-groningen": {
    id: "communications-lead-groningen",
    team: "communications",
    scope: "chapter",
    commitmentBadge: "paidPartTime",
    /* Its messages carry `goodFitIf` beside `background`: the brief also
       lists "Interest in AI safety" (required) and "Motivation", which have
       no row in the background, so they sit there rather than in a new
       field. */
    formRoleValue: OPEN_POSITION_FORM_VALUE,
  },

  "communications-team-member-groningen": {
    id: "communications-team-member-groningen",
    team: "communications",
    scope: "chapter",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
  },

};

// -----------------------------------------------------------------------------
// Chapter -> open positions
// -----------------------------------------------------------------------------

/*
 * What a chapter's section says lives in the messages, in each language,
 * under openPositions.chapters.<chapterSlug in lower case>:
 *
 *   heading     The section heading on /open-positions. It states what the
 *               chapter is doing ("SAIN Amsterdam is building its core
 *               team"), so the reader knows whose schedule they are reading
 *               before any role title.
 *   blurb       Body paragraph under the heading while the chapter is
 *               recruiting.
 *   closedNote  Body shown instead of `blurb` when the chapter is closed.
 *               One sentence with the chapter inbox as an inline link
 *               (<mail>{email}</mail>), so a closed chapter is a fact with a
 *               door, not a section.
 *   notes       Optional, per role id: a note shown under that posting's
 *               mission, for this chapter only.
 */
export type ChapterPosting = {
  /**
   * Slug used in pre-fill (must match the option text in the Google Form).
   * In lower case it is also the chapter's key in the messages and its
   * section's anchor (#chapter-amsterdam).
   */
  chapterSlug: string;
  chapterName: string;
  inboxEmail: string;
  status: "open" | "closed";
  /**
   * Each posting references a role id from ROLES. Optionally specify how many
   * positions are open; a note for the chapter goes in its messages (above).
   */
  postings?: Array<{
    roleId: keyof typeof ROLES;
    positions?: number;
  }>;
};

export const chapterPositions: ChapterPosting[] = [
  {
    chapterSlug: "Amsterdam",
    chapterName: "SAIN Amsterdam",
    inboxEmail: "infoams@safeainetherlands.org",
    status: "open",
    postings: [
      { roleId: "photographer" },
      { roleId: "video-editor-short-form" },
    ],
  },
  {
    chapterSlug: "Utrecht",
    chapterName: "SAIN Utrecht",
    inboxEmail: "infoutr@safeainetherlands.org",
    status: "open",
    postings: [
      { roleId: "community-manager" },
      { roleId: "education-facilitator-cybersec" },
      { roleId: "education-facilitator-biosecurity" },
      { roleId: "education-facilitator-embodied" },
      { roleId: "education-facilitator-governance" },
      { roleId: "sain-ambassador" },
      { roleId: "events-team-member-facilitator" },
      { roleId: "graphic-designer" },
      { roleId: "photographer" },
      { roleId: "social-media-copywriter" },
    ],
  },
  {
    chapterSlug: "Groningen",
    chapterName: "SAIN Groningen",
    inboxEmail: "infogro@safeainetherlands.org",
    status: "open",
    postings: [
      { roleId: "communications-lead-groningen" },
      { roleId: "communications-team-member-groningen" },
    ],
  },
];

// -----------------------------------------------------------------------------
// National (SAIN Netherlands-wide) open positions
// -----------------------------------------------------------------------------

/*
 * What the national section says lives in the messages, under
 * openPositions.national: `name` (its link in the page's jump row),
 * `heading` (the section heading on /open-positions), `blurb`, and optional
 * `notes.<roleId>`, a note shown under one posting's mission.
 */
export type NationalPosting = {
  /** Anchor slug used for the section on /open-positions. */
  slug: string;
  inboxEmail: string;
  status: "open" | "closed";
  postings?: Array<{
    roleId: keyof typeof ROLES;
    positions?: number;
    /**
     * Each national role has its own application form — there is no shared
     * national form to fall back on, so this is required per role.
     */
    applyUrl: string;
  }>;
};

/**
 * Roles that sit with SAIN Netherlands as a whole rather than with a chapter.
 * Rendered above the chapter sections on /open-positions. Set `status` to
 * "closed" (or empty `postings`) to hide the national section and the Research
 * Hub banner that points at it.
 */
export const nationalPosting: NationalPosting = {
  slug: "national",
  inboxEmail: "info@safeainetherlands.org",
  status: "closed",
  postings: [],
};

/** National roles currently open, in the order declared above. */
export const openNationalPostings = nationalPosting.status === "open"
  ? (nationalPosting.postings ?? [])
  : [];

export const isNationalRecruiting = openNationalPostings.length > 0;

/**
 * Whether a specific national role is currently advertised. Used by
 * /research to decide whether to show its Project Hub hiring banner.
 */
export function isNationalRoleOpen(roleId: keyof typeof ROLES): boolean {
  return openNationalPostings.some((p) => p.roleId === roleId);
}

// -----------------------------------------------------------------------------
// Recruiting state (single source of truth for what the site shows)
// -----------------------------------------------------------------------------

/**
 * A chapter counts as recruiting only when it is marked open AND actually has
 * postings listed. Set a chapter's `status` to "closed" (or empty its
 * `postings`) to hide its recruiting banner and its section on
 * /open-positions.
 */
export function isChapterRecruiting(chapterSlug: string): boolean {
  const chapter = chapterPositions.find((c) => c.chapterSlug === chapterSlug);
  return chapter?.status === "open" && (chapter.postings?.length ?? 0) > 0;
}

/** Chapters currently recruiting, in the order declared above. */
export const recruitingChapters: ChapterPosting[] = chapterPositions.filter(
  (c) => isChapterRecruiting(c.chapterSlug),
);

/**
 * How many volunteer roles are listed across the recruiting chapters. The
 * careers hero counts the page rather than restating a number in prose, so
 * closing a posting changes the sentence without anyone editing it.
 */
export const openChapterPostingCount = recruitingChapters.reduce(
  (total, chapter) => total + (chapter.postings?.length ?? 0),
  0,
);

/**
 * How many of those chapter roles are compensated. A role counts as paid when
 * its badge says so; the careers page reads this so its "most chapter roles
 * are unpaid" paragraph cannot drift from the badges under it.
 */
export const paidChapterPostingCount = recruitingChapters.reduce(
  (total, chapter) =>
    total +
    (chapter.postings ?? []).filter((p) =>
      ROLES[p.roleId]?.commitmentBadge?.startsWith("paid"),
    ).length,
  0,
);

/**
 * When this is false the whole open-positions surface disappears: the navbar
 * entry, the home and chapter recruiting banners, the get-involved link, and
 * the role listings on /open-positions (which falls back to the standing
 * open-application page). Close every chapter *and* the national posting to
 * switch the site over.
 */
export const hasOpenPositions =
  recruitingChapters.length > 0 || isNationalRecruiting;

// -----------------------------------------------------------------------------
// Review policy + Timeline
// -----------------------------------------------------------------------------

/**
 * There is no hard application deadline: applications are reviewed on a rolling
 * basis as they come in. Update these strings if the cycle ever moves back to a
 * fixed closing date.
 *
 * The same three strings, in each language, are openPositions.applicationReview
 * in the messages, which is what /open-positions reads. This English copy stays
 * for the code that still imports it; change both together.
 */
export const APPLICATION_REVIEW = {
  label: "Rolling applications",
  phrase: "on a rolling basis",
  sentence:
    "Applications are reviewed on a rolling basis, so apply whenever you are ready.",
};

export type TimelineStep = {
  label: string;
  detail: string;
};

/**
 * The stages of a chapter application, in order. Each step's label and
 * detail are in the messages, under openPositions.howToApply.steps.<id>: edit
 * those whenever the cycle changes. The page surfaces both the default cycle
 * and the "earlier onboarding possible" caveat.
 */
export const APPLICATION_TIMELINE = [
  "open",
  "review",
  "firstRound",
  "trial",
  "onboarding",
] as const;
