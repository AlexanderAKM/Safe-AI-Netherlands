import type { Dictionary } from "@/i18n";

/**
 * Onboarding form every chapter links to from its "Join our community" CTAs.
 * Shared here so the form can be swapped in one place.
 */
export const COMMUNITY_JOIN_URL = "https://sainonboard.fillout.com/new";

/* The addresses live here; what each one is for is in en.json, under
   contact.national.addresses and contact.chapters.roles. */
type NationalAddress = keyof Dictionary["contact"]["national"]["addresses"];
type ChapterRole = keyof Dictionary["contact"]["chapters"]["roles"];

export type NationalContact = {
  key: NationalAddress;
  email: string;
};

export const nationalContacts: NationalContact[] = [
  { key: "formal", email: "info@safeainetherlands.org" },
  { key: "media", email: "pr@safeainetherlands.org" },
  { key: "research", email: "research@safeainetherlands.org" },
  { key: "substack", email: "substack@safeainetherlands.org" },
  { key: "conduct", email: "conduct@safeainetherlands.org" },
];

export const chapterContactLinks = [
  { name: "SAIN Groningen", href: "/chapters/groningen#join" },
  { name: "SAIN Amsterdam", href: "/chapters/amsterdam#join" },
  { name: "SAIN Utrecht", href: "/chapters/utrecht#join" },
] as const;

export type LeadershipContact = {
  names: string;
  /** A SAIN role title, which stays in English in every language. */
  role: string;
  /** The address that belongs to this person and to nobody else. */
  email: string;
  /** The shared inbox they also answer, already printed in full further up the
      page: the formal role address, or a chapter's. Left out for a lead who
      answers none of them. */
  alsoAnswers?: "formal" | { chapter: string };
  linkedin?: string;
};

/** Named leads. The shared inboxes are listed once, in the bands above; what is
 *  new here is the person and the address only they read. */
export const leadershipContacts: LeadershipContact[] = [
  {
    names: "Alexander Müller",
    role: "Director SAIN",
    email: "alexander@safeainetherlands.org",
    alsoAnswers: "formal",
    linkedin: "https://alexanderakm.github.io/",
  },
  {
    names: "Tarteel Mohamed",
    role: "Director SAIN Groningen",
    email: "tarteel@safeainetherlands.org",
    alsoAnswers: { chapter: "SAIN Groningen" },
    linkedin: "https://www.linkedin.com/in/tarteel-mohamed-8918aa2a7/",
  },
  {
    names: "Ana Paula Castillo Rodriguez",
    role: "Director SAIN Amsterdam and Head of Growth SAIN",
    email: "ana@safeainetherlands.org",
    alsoAnswers: { chapter: "SAIN Amsterdam" },
    linkedin: "https://www.linkedin.com/in/ana-paula-casrod/",
  },
  {
    names: "Riccardo Campanella",
    role: "Director SAIN Utrecht",
    email: "riccardo@safeainetherlands.org",
    alsoAnswers: { chapter: "SAIN Utrecht" },
    linkedin: "https://www.linkedin.com/in/riccardo-campanella/",
  },
  {
    names: "Marta Polizzi",
    role: "Head of Operations SAIN",
    email: "marta@safeainetherlands.org",
    linkedin: "https://www.linkedin.com/in/martapolizzi/",
  },
  {
    names: "Tjebbe Boersma",
    role: "Head of Projects SAIN",
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
  roles: { label: ChapterRole; email: string }[];
};

export const chapterRoleEmails: ChapterRoleEmails[] = [
  {
    chapter: "SAIN Groningen",
    href: "/chapters/groningen",
    joinHref: "/chapters/groningen#join",
    roles: [
      { label: "formalCollaboration", email: "infogro@safeainetherlands.org" },
      { label: "communityManager", email: "cmgro@safeainetherlands.org" },
      { label: "education", email: "edugro@safeainetherlands.org" },
      { label: "research", email: "research@safeainetherlands.org" },
      { label: "events", email: "eventsgro@safeainetherlands.org" },
      { label: "substack", email: "substack@safeainetherlands.org" },
      { label: "publicOutreach", email: "prgro@safeainetherlands.org" },
    ],
  },
  {
    chapter: "SAIN Amsterdam",
    href: "/chapters/amsterdam",
    joinHref: "/chapters/amsterdam#join",
    roles: [
      { label: "formalCollaboration", email: "infoams@safeainetherlands.org" },
      { label: "communityManager", email: "cmams@safeainetherlands.org" },
      { label: "education", email: "eduams@safeainetherlands.org" },
      { label: "research", email: "research@safeainetherlands.org" },
      { label: "events", email: "eventsams@safeainetherlands.org" },
      { label: "substack", email: "substack@safeainetherlands.org" },
      { label: "publicOutreach", email: "prams@safeainetherlands.org" },
    ],
  },
  {
    chapter: "SAIN Utrecht",
    href: "/chapters/utrecht",
    joinHref: "/chapters/utrecht#join",
    roles: [
      { label: "formalCollaboration", email: "infoutr@safeainetherlands.org" },
      { label: "communityManager", email: "cmutr@safeainetherlands.org" },
      { label: "education", email: "eduutr@safeainetherlands.org" },
      { label: "research", email: "research@safeainetherlands.org" },
      { label: "events", email: "eventsutr@safeainetherlands.org" },
      { label: "substack", email: "substack@safeainetherlands.org" },
      { label: "publicOutreach", email: "prutr@safeainetherlands.org" },
    ],
  },
];
