export type NationalContact = {
  label: string;
  detail: string;
  email: string;
};

export const nationalContacts: NationalContact[] = [
  {
    label: "Formal",
    detail: "General formal inquiries",
    email: "info@safeainetherlands.org",
  },
  {
    label: "Media & outreach",
    detail: "Press, public outreach, and partnerships",
    email: "pr@safeainetherlands.org",
  },
  {
    label: "Research",
    detail: "Research Hub, supervisors, and collaborations",
    email: "research@safeainetherlands.org",
  },
  {
    label: "Substack",
    detail: "Writing, editing, and newsletter work",
    email: "substack@safeainetherlands.org",
  },
  {
    label: "Conduct",
    detail: "Code of Conduct breaches or general concerns",
    email: "conduct@safeainetherlands.org",
  },
];

export const chapterContactLinks = [
  { name: "SAIN Groningen", href: "/chapters/groningen#join" },
  { name: "SAIN Amsterdam", href: "/chapters/amsterdam#join" },
  { name: "SAIN Utrecht", href: "/chapters/utrecht#join" },
] as const;

export type LeadershipContact = {
  names: string;
  role: string;
  emails: { label: string; email: string }[];
  linkedin?: string;
};

/** Named leads: chapter or national inboxes plus personal addresses where relevant. */
export const leadershipContacts: LeadershipContact[] = [
  {
    names: "Alexander Müller",
    role: "Director SAIN",
    emails: [
      { label: "National formal", email: "info@safeainetherlands.org" },
      { label: "Personal", email: "alexander@safeainetherlands.org" },
    ],
    linkedin: "https://alexanderakm.github.io/",
  },
  {
    names: "Tarteel Mohamed",
    role: "Director SAIN Groningen",
    emails: [
      { label: "Personal", email: "tarteel@safeainetherlands.org" },
      { label: "Groningen chapter", email: "infogro@safeainetherlands.org" },
    ],
    linkedin: "https://www.linkedin.com/in/tarteel-mohamed-8918aa2a7/",
  },
  {
    names: "Ana Paula Castillo Rodriguez",
    role: "Co-Director SAIN Amsterdam",
    emails: [
      { label: "Amsterdam chapter", email: "infoams@safeainetherlands.org" },
      { label: "Personal", email: "ana@safeainetherlands.org" },
    ],
    linkedin: "https://www.linkedin.com/in/ana-paula-casrod/",
  },
  {
    names: "Andreea Chivu",
    role: "Co-Director SAIN Amsterdam",
    emails: [
      { label: "Amsterdam chapter", email: "infoams@safeainetherlands.org" },
      { label: "Personal", email: "andreea@safeainetherlands.org" },
    ],
    linkedin: "https://www.linkedin.com/in/andreea-chivu-0924911a6/",
  },
  {
    names: "Riccardo Campanella",
    role: "Director SAIN Utrecht",
    emails: [
      { label: "Utrecht chapter", email: "infoutr@safeainetherlands.org" },
      { label: "Personal", email: "riccardo@safeainetherlands.org" },
    ],
    linkedin: "https://www.linkedin.com/in/riccardo-campanella/",
  },
];

export type ChapterRoleEmails = {
  chapter: string;
  joinHref: string;
  roles: { label: string; email: string }[];
};

export const chapterRoleEmails: ChapterRoleEmails[] = [
  {
    chapter: "SAIN Groningen",
    joinHref: "/chapters/groningen#join",
    roles: [
      { label: "Formal collaboration", email: "infogro@safeainetherlands.org" },
      { label: "Community Manager", email: "cmgro@safeainetherlands.org" },
      { label: "Education", email: "edugro@safeainetherlands.org" },
      { label: "Research", email: "research@safeainetherlands.org" },
      { label: "Events", email: "eventsgro@safeainetherlands.org" },
      { label: "Substack", email: "substack@safeainetherlands.org" },
      { label: "Public Outreach", email: "prgro@safeainetherlands.org" },
    ],
  },
  {
    chapter: "SAIN Amsterdam",
    joinHref: "/chapters/amsterdam#join",
    roles: [
      { label: "Formal collaboration", email: "infoams@safeainetherlands.org" },
      { label: "Community Manager", email: "cmams@safeainetherlands.org" },
      { label: "Education", email: "eduams@safeainetherlands.org" },
      { label: "Research", email: "research@safeainetherlands.org" },
      { label: "Events", email: "eventsams@safeainetherlands.org" },
      { label: "Substack", email: "substack@safeainetherlands.org" },
      { label: "Public Outreach", email: "prams@safeainetherlands.org" },
    ],
  },
  {
    chapter: "SAIN Utrecht",
    joinHref: "/chapters/utrecht#join",
    roles: [
      { label: "Formal collaboration", email: "infoutr@safeainetherlands.org" },
      { label: "Community Manager", email: "cmutr@safeainetherlands.org" },
      { label: "Education", email: "eduutr@safeainetherlands.org" },
      { label: "Research", email: "research@safeainetherlands.org" },
      { label: "Events", email: "eventsutr@safeainetherlands.org" },
      { label: "Substack", email: "substack@safeainetherlands.org" },
      { label: "Public Outreach", email: "prutr@safeainetherlands.org" },
    ],
  },
];
