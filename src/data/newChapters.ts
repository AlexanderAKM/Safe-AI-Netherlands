/**
 * Content for /new-chapters: the founding-team call for Eindhoven, Delft and
 * The Hague (winter 2026-27).
 *
 * Source of truth for the copy: Alexander's founding-team role descriptions
 * (14 October 2026). The same text sits in the Airtable form's conditional
 * role descriptions, so when one changes, change the other.
 */

import type { TimelineStep } from "@/data/openPositions";

// -----------------------------------------------------------------------------
// Application form (Airtable)
// -----------------------------------------------------------------------------

/**
 * The founding-team application form in Airtable.
 *
 * PRE-SHIP BLOCKER: empty until the form is built. While it is empty every
 * apply button falls back to /contact, so the page never links to nothing,
 * but it must not go live that way.
 *
 * Use the form view's shared link (airtable.com/app.../shr...), which accepts
 * `prefill_<Field name>` parameters. The field names below must match the
 * form's fields exactly; Airtable ignores a prefill it cannot match, so a
 * wrong name costs the applicant one extra click and nothing else.
 */
export const FOUNDING_FORM_URL = "";

export const FOUNDING_FORM_FIELDS = {
  city: "City",
  role: "Role",
};

export function buildFoundingApplicationUrl(opts?: {
  city?: string;
  role?: string;
}): string {
  if (!FOUNDING_FORM_URL) return "/contact";
  const url = new URL(FOUNDING_FORM_URL);
  if (opts?.city) url.searchParams.set(`prefill_${FOUNDING_FORM_FIELDS.city}`, opts.city);
  if (opts?.role) url.searchParams.set(`prefill_${FOUNDING_FORM_FIELDS.role}`, opts.role);
  return url.toString();
}

export const isFoundingFormLive = FOUNDING_FORM_URL !== "";

// -----------------------------------------------------------------------------
// Dates
// -----------------------------------------------------------------------------

/* Soft deadline. 16 November 2026 is a Monday; the weekday is left out on
   purpose until the date is confirmed (the Asana milestone says 14 Nov). */
export const SOFT_DEADLINE = "16 November 2026";

// -----------------------------------------------------------------------------
// Cities
// -----------------------------------------------------------------------------

export type FoundingCity = {
  id: string;
  name: string;
  /** The institutions the chapter grows from, set as the cell's kicker. */
  origin: string;
  why: string;
  /** One line on the chapter's likely profile. */
  profile: string;
};

export const FOUNDING_CITIES: FoundingCity[] = [
  {
    id: "eindhoven",
    name: "Eindhoven",
    origin: "TU/e and the Brainport region",
    why: "Home to ASML and one of Europe's densest clusters of engineering talent.",
    profile:
      "Likely a technical chapter with important governance questions sprinkled in: interpretability, evaluations, engineering, and the governance of the hardware AI runs on.",
  },
  {
    id: "delft",
    name: "Delft",
    origin: "TU Delft",
    why: "The largest technical university in the Netherlands, with deep strengths in robotics and embodied AI.",
    profile:
      "Likely a strong technical chapter, with a potentially stronger emphasis on embodied AI safety.",
  },
  {
    id: "the-hague",
    name: "The Hague",
    origin: "Ministries, regulators and campuses",
    why: "Ministries, regulators, international institutions, and the Leiden and Haagse Hogeschool campuses.",
    profile:
      "Likely a strong governance chapter that reaches civil servants and policy professionals as much as students.",
  },
];

/** The chapters that already run, for the map and the hero line. */
export const EXISTING_CHAPTERS = ["Groningen", "Amsterdam", "Utrecht"];

// -----------------------------------------------------------------------------
// The founding position: what is missing, what is already there
// -----------------------------------------------------------------------------

export const NOT_THERE_YET = [
  "A team",
  "A room",
  "A first course",
  "A first event",
  "A mailing list",
];

export const ALREADY_THERE = [
  "A funded national organisation",
  "Courses that already run in three cities",
  "Playbooks for events and communications",
  "A mentor from our national team",
  "A network of advisors, researchers and partner organisations",
];

// -----------------------------------------------------------------------------
// Incubation
// -----------------------------------------------------------------------------

export const INCUBATION_MILESTONES = [
  "A strong team",
  "A first AI safety course",
  "Regular public events",
  "Local partners",
  "A steady funnel into the national Project Hub",
];

export type IncubationStop = {
  when: string;
  title: string;
  detail: string;
};

export const INCUBATION_STOPS: IncubationStop[] = [
  {
    when: "Mid-December 2026",
    title: "Founding teams start",
    detail: "A joint kickoff for all three founding teams.",
  },
  {
    when: "January 2027",
    title: "The work kicks off",
    detail: "Team, office space, channels, and a first course on the calendar.",
  },
  {
    when: "Spring 2027",
    title: "First course and events",
    detail: "The chapter runs its first course and regular public events.",
  },
  {
    when: "June 2027",
    title: "SAIN chapter",
    detail:
      "A final review together. Chapters that get there become official SAIN chapters.",
  },
];

// -----------------------------------------------------------------------------
// What you get
// -----------------------------------------------------------------------------

export type OfferIcon =
  | "flag"
  | "compass"
  | "book"
  | "stack"
  | "wallet"
  | "handshake"
  | "users"
  | "seal";

export const FOUNDING_OFFER: Array<{ icon: OfferIcon; title: string; detail: string }> = [
  {
    icon: "flag",
    title: "A founding role",
    detail: "In a funded national organisation, with SAIN's name and backing behind you.",
  },
  {
    icon: "compass",
    title: "A mentor",
    detail:
      "From SAIN's national team: a call every two weeks, regular visits in person, and help whenever you ask for it.",
  },
  {
    icon: "book",
    title: "The whole wiki",
    detail:
      "Course curricula and facilitator guides, our events and communications playbooks, and the brand kit, all ready to use.",
  },
  {
    icon: "stack",
    title: "The infrastructure",
    detail:
      "The Airtable talent pipeline we use, the Discord community that hosts all of SAIN, and the software that automates the boring parts.",
  },
  {
    icon: "wallet",
    title: "A budget",
    detail:
      "For events and materials, handled through SAIN, so you never pay costs out of your own pocket.",
  },
  {
    icon: "handshake",
    title: "Introductions",
    detail:
      "To our advisors, researchers and partner organisations, and to the teams in the other five cities.",
  },
  {
    icon: "users",
    title: "Team life",
    detail: "Team outings, and support to develop yourself professionally in AI safety.",
  },
  {
    icon: "seal",
    title: "A chapter that lasts",
    detail:
      "If the chapter graduates, it officially becomes a SAIN chapter, and the director and leads can stay on paid part-time contracts.",
  },
];

// -----------------------------------------------------------------------------
// Roles
// -----------------------------------------------------------------------------

export type FoundingRoleTeam = "directors" | "education" | "events" | "communications";

export type FoundingRole = {
  /** Anchor on the page (#director) and the value the form's role field takes. */
  id: string;
  title: string;
  formValue: string;
  team: FoundingRoleTeam;
  hours: string;
  summary: string;
  about: string[];
  firstMonths: string[];
  responsibilities: string[];
  goodFitIf: string[];
  alsoStrong: string[];
  logistics: Array<[string, string]>;
};

const SHARED_LOCATION =
  "Eindhoven, Delft or The Hague (whichever one you are based in), with occasional trips to Amsterdam and the other chapters.";
const SHARED_START = "Mid-December 2026, with a joint kickoff for all three founding teams.";
const HOLIDAY = "8% on top of your gross salary.";

export const FOUNDING_ROLES: FoundingRole[] = [
  {
    id: "director",
    title: "Founding Chapter Director",
    formValue: "Chapter Director",
    team: "directors",
    hours: "12 to 16 hours a week, December 2026 to June 2027",
    summary: "Leads the founding team and opens the city's doors.",
    about: [
      "Every SAIN chapter started with one person who decided it should exist and then made it happen. In Groningen, Amsterdam and Utrecht that took years of trial and error. In Eindhoven, Delft and The Hague we want it to take six months, because this time the founder does not start from nothing.",
      "You would be the person leading it! You will develop the team (and will even be included in the final interviews of the other founding team roles in your city) and open the doors to collaboration: at the university or hogeschools, with local organisations, and in The Hague with the ministries and institutions. By June there should be a chapter that runs basically autonomously. You work directly with SAIN's national team, and you are accountable for whether your city reaches its milestones.",
      "Importantly: this role is about building something from nothing and about people, not about being the most knowledgeable person on AI safety in the room. You need enough grounding to represent the field credibly, which is why we ask for a completed AI safety course. Your real job, though, is to find the people who know more than you and get them involved. You are the one that builds, that keeps the team together, and that multiplies what everyone else does.",
      "This means we expect high agency from you. For instance, you will not get a week-by-week checklist. Instead, we will set the destination together, you then choose the route, and you pull in support when you need it.",
      "What the chapter looks like depends on the city. In Eindhoven and Delft, a technical profile fits best: you will mostly be talking to engineers, students and researchers. In The Hague, the director is ideally someone who knows how the government works from the inside.",
    ],
    firstMonths: [
      "Grow the founding team to at least five people with clear roles, starting with the leads selected alongside you.",
      "Secure office space (we will help you) and use your connections within the city for collaborations and useful advisors that can help you navigate the city and develop the chapter.",
      "Get the chapter's communications going and schedule its first course for spring.",
      "Get regular events going.",
    ],
    responsibilities: [
      "Lead the founding team: set direction, run the weekly team meeting, clear blockers, and bring in new members as the chapter grows.",
      "Build the chapter's relationships with the university and local organisations, and in The Hague with government and international institutions.",
      "Own the chapter's plan, milestones and budget, together with the national team.",
      "Represent the chapter at events, with partners and in the press.",
      "Write a short monthly update for the national team: what happened, the numbers, blockers, and next month.",
      "Bring your city's perspective into national decisions.",
    ],
    goodFitIf: [
      "Have built something from scratch, or led a team, society, project or initiative, and can tell us what went wrong and what you did about it.",
      "Have completed an AI safety course (BlueDot, ARENA, a SAIN course or similar), or have equivalent knowledge of the field.",
      "Have a track record of chasing things to a finished state without being asked. Being proactive matters a lot!",
      "Are comfortable with ambiguity, with delegating, and with speaking in front of a room.",
      "Live in or near the city and will be there until at least June 2027.",
    ],
    alsoStrong: [
      "Experience in an AI safety organisation.",
      "A network in the city: at the university, in local industry, or in government.",
      "For The Hague: experience inside government, a regulator or an international institution.",
      "Professional working proficiency in Dutch (especially valuable in The Hague).",
    ],
    logistics: [
      ["Time", "About 12 to 16 hours a week, though it can vary a lot and the job only works if you are flexible."],
      ["Compensation", "€42–50k a year at full-time (40 hours), pro-rated to your hours."],
      ["Holiday allowance", HOLIDAY],
      ["Location", SHARED_LOCATION],
      ["Reports to", "Your mentor on SAIN's national team."],
      ["Start", SHARED_START],
    ],
  },
  {
    id: "education-lead",
    title: "Founding Education Lead",
    formValue: "Education Lead",
    team: "education",
    hours: "8 to 12 hours a week, December 2026 to June 2027",
    summary: "Brings the first AI safety course to the city.",
    about: [
      "Courses are where most people's path into AI safety through SAIN begins. Hundreds of people a year take one at our existing chapters, and many of them go on to (research) projects, jobs and chapter roles of their own. In your city, that first course does not exist yet. You make it exist!",
      "You do not have to write a curriculum. We already have a clear playbook and curricula running in three cities, with readings, session plans and facilitator guides. Your job is to bring one to your city, get as many of the best people in your city to join, make sure they finish, and go on to develop themselves further.",
      "Which course comes first depends on the city: most likely a technical track in Eindhoven and Delft, and Governance & Policy in The Hague. You decide this with your director.",
    ],
    firstMonths: [
      "Choose the first course and track with your director, and schedule it for spring.",
      "Find the right place for people to do the course, recruit and onboard the appropriate number of facilitators, and set up the application process.",
      "Fill the first cohort with your Communications Lead.",
      "By June: tens of people who have finished the course (or courses, if you are ambitious), with clear lessons learned for next year.",
    ],
    responsibilities: [
      "Plan and run course iterations using SAIN's curricula and the Education Handbook.",
      "Start and run discussion groups.",
      "Recruit, train and support facilitators and discussion leads, with help from SAIN.",
      "Run course logistics: cohort design, rooms, applications, the project phase and graduation.",
      "Coordinate with the Communications Lead on marketing, and with the Events Lead on course-related events.",
      "Keep the chapter's education inbox under control.",
    ],
    goodFitIf: [
      "Have facilitated, taught, tutored, or designed a course or workshop.",
      "Have completed an AI safety course.",
      "Are comfortable with both technical and governance content. You do not need to be an expert in either.",
      "Are organised, write clearly, and enjoy getting a group to think together.",
    ],
    alsoStrong: [
      "A master's degree (finished or in progress), or professional experience in education.",
      "Connections to study associations or teaching staff at TU/e, TU Delft, Leiden or the Haagse Hogeschool (whichever is appropriate to your city).",
      "Experience facilitating an AI safety course.",
    ],
    logistics: [
      ["Time", "About 8 to 12 hours a week, though it can vary a lot and the job only works if you are flexible."],
      ["Compensation", "€34–42k a year at full-time (40 hours), pro-rated to your hours."],
      ["Holiday allowance", HOLIDAY],
      ["Location", SHARED_LOCATION],
      ["Reports to", "Your Chapter Director."],
      ["Start", SHARED_START],
    ],
  },
  {
    id: "events-lead",
    title: "Founding Events Lead",
    formValue: "Events Lead",
    team: "events",
    hours: "8 to 12 hours a week, December 2026 to June 2027",
    summary: "Makes the chapter visible, one event at a time.",
    about: [
      "Events are how a chapter becomes visible. A good talk or hackathon is where most people first meet the community. It is also where the people who will later run its courses and projects first show up. In a new city, every event is also proof that there are people here who take AI safety seriously.",
      "You plan and run the chapter's first events, from the first meetup to talks that people travel for. You do not start from zero: SAIN's events playbook, speakers from the other chapters' networks, and a budget are there. What we need is someone who makes events happen reliably, gets the right people in the room, and makes them want to come back. That will be you!",
      "The audience differs per city. In Eindhoven it is TU/e students and Brainport engineers, and in Delft TU Delft students and researchers. In The Hague it is civil servants, policy professionals and students, where a well-run panel or policy hackathon can matter as much as a talk.",
    ],
    firstMonths: [
      "Run the chapter's first public event early in the new year.",
      "Build a spring calendar with a mix of talks, socials and at least one hands-on format, such as a hackathon or reading group.",
      "Find two or three venues you can rely on, and start a list of local speakers.",
      "By June: a history of regular, valuable AI safety events with a clear path to next opportunities.",
    ],
    responsibilities: [
      "Plan a balanced calendar of professional events, community socials and hackathons using SAIN's Events Handbook, and share key dates with the Communications Lead early.",
      "Recruit and brief speakers, both locally and through SAIN's network.",
      "Run event logistics: venue, catering, sign-ups, and the handover to Communications.",
      "Spot opportunities for the chapter and SAIN to appear at other people's events.",
      "Keep the chapter's events inbox under control.",
    ],
    goodFitIf: [
      "Have organised events before, for example for a study association, conference, hackathon, festival or company.",
      "Are comfortable cold-emailing speakers and venues, and following up until you get an answer.",
      "Stay calm when something goes wrong an hour before the doors open.",
      "Have a genuine interest in AI safety. No real background is required, though we expect you to upskill rapidly.",
    ],
    alsoStrong: [
      "A network in the city's student, tech or policy scene.",
      "Experience with hackathons or professional events.",
      "Experience with Luma or similar event tools.",
    ],
    logistics: [
      ["Time", "About 8 to 12 hours a week, though it can vary a lot and the job only works if you are flexible."],
      ["Compensation", "€34–42k a year at full-time (40 hours), pro-rated to your hours."],
      ["Holiday allowance", HOLIDAY],
      ["Location", SHARED_LOCATION],
      ["Reports to", "Your Chapter Director."],
      ["Start", SHARED_START],
    ],
  },
  {
    id: "communications-lead",
    title: "Founding Communications Lead",
    formValue: "Communications Lead",
    team: "communications",
    hours: "8 to 12 hours a week, December 2026 to June 2027",
    summary: "Builds the chapter's audience from zero.",
    about: [
      "Nobody joins something they have never heard of. That is where you come in! You make sure the right people in your city hear about AI safety: students who would make great facilitators, engineers who have been quietly worried about the progress of AI, and civil servants who want to understand what is actually going on.",
      "You launch the chapter's social media accounts and make them run reliably. As SAIN, we have a brand kit, templates and more that are ready to be used. You will be working together with the national team and the other chapters' Communications Leads to share what works and what doesn't. What does not exist yet is an audience in your city, and building one is the job.",
      "Importantly: this role is about getting the right people to act (sign up, show up, apply, move through the talent pipeline), not about follower or like counts per se.",
      "The tone will differ per city. In The Hague, being able to communicate in Dutch matters a lot, in Delft not so much. You know your city best, though.",
    ],
    firstMonths: [
      "Set up the chapter's LinkedIn and Instagram, plus its WhatsApp or Discord announcements, within SAIN's brand kit.",
      "Announce the chapter, and promote its first events and its first course.",
      "Reach at least 100 relevant people in the city through the chapter's channels by spring.",
      "Set up a simple monthly content calendar with the Events and Education Leads.",
    ],
    responsibilities: [
      "Run the chapter's Instagram and LinkedIn, and its WhatsApp and Discord announcements, in line with SAIN's brand kit.",
      "Plan the content calendar each month, in line with SAIN's content pillars and the chapter's goals.",
      "Promote events and courses: build anticipation, drive sign-ups, and post recaps afterwards.",
      "Reshare relevant content from SAIN, our advisors and partner organisations.",
      "Keep the chapter's page on the SAIN website up to date.",
      "Sync with the other chapters' Communications Leads at least once a quarter, and keep the chapter's PR inbox under control.",
    ],
    goodFitIf: [
      "Have run social media, a newsletter, a blog or a student magazine, or have done content creation or journalism.",
      "Write clearly and have a good visual sense (Canva, Figma or similar).",
      "Care about consistency: the right tone and the right logo, every time.",
      "Have a genuine interest in AI safety.",
    ],
    alsoStrong: [
      "A background in communications, marketing, design or journalism.",
      "Experience growing an audience from zero.",
      "Fluent Dutch (especially valuable in The Hague).",
    ],
    logistics: [
      ["Time", "About 8 to 12 hours a week, though it can vary a lot and the job only works if you are flexible."],
      ["Compensation", "€34–42k a year at full-time (40 hours), pro-rated to your hours."],
      ["Holiday allowance", HOLIDAY],
      ["Location", SHARED_LOCATION],
      ["Reports to", "Your Chapter Director."],
      ["Start", SHARED_START],
    ],
  },
];

// -----------------------------------------------------------------------------
// Application process
// -----------------------------------------------------------------------------

export const FOUNDING_APPLICATION_STEPS: TimelineStep[] = [
  {
    label: "Application form",
    detail:
      "Your CV, a few short written questions, and one question for each role you apply for. About 30 minutes.",
  },
  {
    label: "Work sample",
    detail:
      "If your application stands out, a short task that mirrors the role, taking about two hours. For the director, for example, this is a first-semester plan for the city.",
  },
  {
    label: "Interview",
    detail: "45 minutes with two people from SAIN, including a discussion of your work sample.",
  },
  {
    label: "Decision",
    detail: "By mid-December we invite a founding team of four people per city.",
  },
  {
    label: "Start",
    detail:
      "If you are in the founding team, your work really kicks off in mid-January.",
  },
];
