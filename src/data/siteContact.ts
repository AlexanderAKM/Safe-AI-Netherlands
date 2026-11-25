/**
 * Onboarding form every chapter links to from its "Join our community" CTAs.
 * Shared here so the form can be swapped in one place.
 */
export const COMMUNITY_JOIN_URL = "https://sainonboard.fillout.com/new";

/* The addresses are here; what /contact says about them is text, in
   messages/<locale>/contact.json, keyed by the ids below. */

/** The foundation's registered address, line by line. /contact prints the
 *  country under it, in the reader's language (contact.elsewhere.country). */
export const registeredAddress = [
  "Stichting Safe AI Netherlands",
  "Hereplein 4",
  "9711 GA Groningen",
] as const;

export type NationalContact = {
  /** Its label and description, under contact.national.inboxes.<id>. */
  id: string;
  email: string;
};

export const nationalContacts: NationalContact[] = [
  {
    id: "formal",
    email: "info@safeainetherlands.org",
  },
  {
    id: "media",
    email: "pr@safeainetherlands.org",
  },
  {
    id: "research",
    email: "research@safeainetherlands.org",
  },
  {
    id: "substack",
    email: "substack@safeainetherlands.org",
  },
  {
    id: "conduct",
    email: "conduct@safeainetherlands.org",
  },
];

export const chapterContactLinks = [
  { name: "SAIN Groningen", href: "/chapters/groningen#join" },
  { name: "SAIN Amsterdam", href: "/chapters/amsterdam#join" },
  { name: "SAIN Utrecht", href: "/chapters/utrecht#join" },
] as const;

export type LeadershipContact = {
  /** The person's role (and the inbox they also answer) are under
      contact.leads.people.<id>. */
  id: string;
  names: string;
  /** The address that belongs to this person and to nobody else. */
  email: string;
  /** Has an `alsoAnswers` message: the shared inbox they also answer, already
      printed in full further up the page. Left out for a lead who answers none
      of them. */
  alsoAnswers?: boolean;
  linkedin?: string;
};

/** Named leads. The shared inboxes are listed once, in the bands above; what is
 *  new here is the person and the address only they read. */
export const leadershipContacts: LeadershipContact[] = [
  {
    id: "alexander",
    names: "Alexander Müller",
    email: "alexander@safeainetherlands.org",
    alsoAnswers: true,
    linkedin: "https://alexanderakm.github.io/",
  },
  {
    id: "tarteel",
    names: "Tarteel Mohamed",
    email: "tarteel@safeainetherlands.org",
    alsoAnswers: true,
    linkedin: "https://www.linkedin.com/in/tarteel-mohamed-8918aa2a7/",
  },
  {
    id: "ana",
    names: "Ana Paula Castillo Rodriguez",
    email: "ana@safeainetherlands.org",
    alsoAnswers: true,
    linkedin: "https://www.linkedin.com/in/ana-paula-casrod/",
  },
  {
    id: "riccardo",
    names: "Riccardo Campanella",
    email: "riccardo@safeainetherlands.org",
    alsoAnswers: true,
    linkedin: "https://www.linkedin.com/in/riccardo-campanella/",
  },
  {
    id: "marta",
    names: "Marta Polizzi",
    email: "marta@safeainetherlands.org",
    linkedin: "https://www.linkedin.com/in/martapolizzi/",
  },
  {
    id: "tjebbe",
    names: "Tjebbe Boersma",
    email: "tjebbe@safeainetherlands.org",
    linkedin: "https://www.linkedin.com/in/tjebbe-hylke-boersma/",
  },
];

export type ChapterRoleEmails = {
  chapter: string;
  /** The chapter page itself, for a link labelled "View chapter". */
  href: string;
  /** The join section of that page, for a link that asks someone to join. */
  joinHref: string;
  /** Each role's label is under contact.chapters.roles.<id>. */
  roles: { id: string; email: string }[];
};

export const chapterRoleEmails: ChapterRoleEmails[] = [
  {
    chapter: "SAIN Groningen",
    href: "/chapters/groningen",
    joinHref: "/chapters/groningen#join",
    roles: [
      { id: "formal", email: "infogro@safeainetherlands.org" },
      { id: "communityManager", email: "cmgro@safeainetherlands.org" },
      { id: "education", email: "edugro@safeainetherlands.org" },
      { id: "research", email: "research@safeainetherlands.org" },
      { id: "events", email: "eventsgro@safeainetherlands.org" },
      { id: "substack", email: "substack@safeainetherlands.org" },
      { id: "outreach", email: "prgro@safeainetherlands.org" },
    ],
  },
  {
    chapter: "SAIN Amsterdam",
    href: "/chapters/amsterdam",
    joinHref: "/chapters/amsterdam#join",
    roles: [
      { id: "formal", email: "infoams@safeainetherlands.org" },
      { id: "communityManager", email: "cmams@safeainetherlands.org" },
      { id: "education", email: "eduams@safeainetherlands.org" },
      { id: "research", email: "research@safeainetherlands.org" },
      { id: "events", email: "eventsams@safeainetherlands.org" },
      { id: "substack", email: "substack@safeainetherlands.org" },
      { id: "outreach", email: "prams@safeainetherlands.org" },
    ],
  },
  {
    chapter: "SAIN Utrecht",
    href: "/chapters/utrecht",
    joinHref: "/chapters/utrecht#join",
    roles: [
      { id: "formal", email: "infoutr@safeainetherlands.org" },
      { id: "communityManager", email: "cmutr@safeainetherlands.org" },
      { id: "education", email: "eduutr@safeainetherlands.org" },
      { id: "research", email: "research@safeainetherlands.org" },
      { id: "events", email: "eventsutr@safeainetherlands.org" },
      { id: "substack", email: "substack@safeainetherlands.org" },
      { id: "outreach", email: "prutr@safeainetherlands.org" },
    ],
  },
];
