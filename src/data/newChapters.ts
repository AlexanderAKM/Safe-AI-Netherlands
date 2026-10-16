/**
 * Content for /new-chapters: the starting-team call for Eindhoven, Delft and
 * The Hague (winter 2026-27).
 *
 * Source of truth for the copy: the team's rewritten expansion text (16
 * October 2026). The Airtable form carries only a short description per role;
 * the full postings live here, so a change to a role starts in this file.
 */

import type { TimelineStep } from "@/data/openPositions";

// -----------------------------------------------------------------------------
// Application form (Airtable)
// -----------------------------------------------------------------------------

/**
 * The starting-team application form: an Airtable interface form, writing to
 * the "Starting Team Applications" table.
 *
 * Interface forms take `prefill_<Field name>` parameters, matched on the
 * table's field names rather than the questions the form shows (checked 14
 * October 2026: `prefill_City=Delft&prefill_Role=Chapter Director` fills both).
 * Keep the two field names below in step with the table.
 */
export const FOUNDING_FORM_URL: string =
  "https://airtable.com/appBt9aud43DOhyE7/pagfucm2gVY91sjPg/form";

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


// -----------------------------------------------------------------------------
// Dates
// -----------------------------------------------------------------------------

/* Soft deadline, confirmed 14 October 2026. It is a Monday; copy names the
   date only, never the weekday. */
export const SOFT_DEADLINE = "16 November 2026";
export const SOFT_DEADLINE_SHORT = "16 November";

/* The switch for the site-wide call-outs: the announcement bar, the nav item
   and the two lines on the landing. Set it to false when the starting teams
   are chosen; /new-chapters itself stays up. */
export const STARTING_TEAMS_RECRUITING = true;

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
    origin: "TU/e, the Center for Safe AI and the Brainport region",
    why: "Brainport is home to ASML and one of Europe's densest clusters of engineering talent.",
    profile:
      "Likely a valuable technical chapter with some important governance questions sprinkled in: interpretability, evaluations, engineering, compute verification and the governance of the hardware AI runs on.",
  },
  {
    id: "delft",
    name: "Delft",
    origin: "TU Delft",
    why: "The largest technical university in the Netherlands, with deep strengths in robotics and embodied AI. TU Delft's ELLIS unit coordinates themes including Verification & Safe and Responsible AI, Multiagent Systems & Robust and Adversarial ML, and Sequential Decision Making.",
    profile:
      "Likely also a strong technical chapter, with a potentially stronger emphasis on embodied AI safety.",
  },
  {
    id: "the-hague",
    name: "The Hague",
    origin: "Ministries, regulators and campuses",
    why: "Ministries, regulators, international institutions, and the Leiden and Haagse Hogeschool campuses. Notably strong for cybersecurity, with national and international cyber institutions, including The Hague Security Delta (HSD), Europe's largest security cluster.",
    profile:
      "Likely a strong governance chapter that reaches civil servants and policy professionals as much as students.",
  },
];

/** The chapters that already run, for the map and the hero line. */
export const EXISTING_CHAPTERS = ["Groningen", "Amsterdam", "Utrecht"];

// -----------------------------------------------------------------------------
// The starting position: what is missing, what is already there
// -----------------------------------------------------------------------------

export const NOT_THERE_YET = [
  "A team",
  "A booked room",
  "A first course",
  "A first event",
  "A mailing list",
];

export const ALREADY_THERE = [
  "A funded national organisation",
  "Courses that already run in three cities",
  "Playbooks for events, communications and more",
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
    title: "Starting teams begin",
    detail: "A joint kickoff for all three starting teams.",
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
  | "growth"
  | "seal";

export const FOUNDING_OFFER: Array<{ icon: OfferIcon; title: string; detail: string }> = [
  {
    icon: "flag",
    title: "A starting role",
    detail: "In a funded national organisation, with SAIN's name and backing behind you.",
  },
  {
    icon: "compass",
    title: "A mentor",
    detail:
      "From SAIN's national team: likely at least a call every two weeks, a visit in person every so often, and help whenever you ask for it.",
  },
  {
    icon: "book",
    title: "The complete wiki",
    detail:
      "SAIN's organisational wiki: course curricula and facilitator guides, all our playbooks on events, communications and more, and the brand kit, all ready to use.",
  },
  {
    icon: "stack",
    title: "The infrastructure",
    detail:
      "The Airtable talent pipeline we use, the Discord server where all of SAIN's community is, and the software that automates the stuff that would be annoying to do yourself.",
  },
  {
    icon: "wallet",
    title: "A budget",
    detail: "For events and materials, handled through SAIN.",
  },
  {
    icon: "handshake",
    title: "Introductions",
    detail:
      "To our advisors, researchers and partner organisations, and to the teams in the other five cities.",
  },
  {
    icon: "growth",
    title: "Personal development",
    detail:
      "A package to help you develop professionally in AI safety, which we try to offer every SAIN team member.",
  },
  {
    icon: "seal",
    title: "A chapter that lasts",
    detail:
      "If the chapter does well, it officially becomes a SAIN chapter, and the director and leads have the opportunity to stay on paid part-time contracts.",
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

const SHARED_TERM =
  "December 2026 to June 2027, with possibility of extension based on funding and incubation success";
const SHARED_LOCATION =
  "Eindhoven, Delft or The Hague (whichever one you are based in), with occasional trips to Amsterdam and the other chapters.";
const SHARED_START = "Mid-December 2026, with a joint kickoff for all three starting teams.";
const HOLIDAY = "8% on top of your gross salary.";
const FLEXIBLE = "though it can vary a lot and the job only works if you are flexible.";

export const FOUNDING_ROLES: FoundingRole[] = [
  {
    id: "director",
    title: "Chapter Director",
    formValue: "Chapter Director",
    team: "directors",
    hours: `12 hours a week depending on preference and availability, ${SHARED_TERM}`,
    summary: "Leads the starting team and opens the city's doors.",
    about: [
      "Every SAIN chapter started with one person who had a vision and made it happen. In Groningen, Amsterdam and Utrecht that took years of trial and error. In Eindhoven, Delft and The Hague we want it to take six months, because this time the director has all of SAIN's resources to get started.",
      "As the Director, you would be the person leading everything in your city. You will develop the team (and will even be included in the final interviews of the other starting team roles in your city if possible) and open the doors to collaboration: at the university or hogescholen, with local organisations, and in The Hague with the ministries and institutions. By June there should be a chapter that runs basically autonomously. You work directly with SAIN's national team, and you are accountable for whether your city reaches its milestones.",
      "Importantly: this role is about building something from nothing, and about people. Whilst AI safety knowledge is helpful, your job is to gather the most knowledgeable people into your community, not to be that person yourself. You need enough grounding to represent the field credibly, which is why we ask, at least, for a completed AI safety course. You are the one that builds, that keeps the team together, and that multiplies what everyone else does.",
      "This means we expect high agency from you. For instance, you will not get a week-by-week checklist. Instead, we will set the destination together, you then choose the route, and you pull in support when you need it.",
      "What the chapter looks like depends on the city. In Eindhoven and Delft, a technical profile fits best: you will mostly be talking to engineers, students and researchers. In The Hague, the director is ideally someone who knows how the government works from the inside. It is your job to identify your city's strengths and steer AI safety into the field.",
    ],
    firstMonths: [
      "Grow your starting team to at least four people with clear roles, starting with the leads selected alongside you. We will help by sharing other applicants with you.",
      "Secure office space and use your connections within the city for collaborations and useful advisors that can help you navigate the city and develop the chapter. We will help with budget and connections.",
      "Get the chapter's communications going and schedule your first course for spring.",
      "Get regular events going.",
    ],
    responsibilities: [
      "Lead the starting team: set direction, run the weekly team meeting, clear blockers, and bring in new members as the chapter grows.",
      "Build the chapter's relationships with the university and local organisations, and set priorities accordingly. For example, in The Hague, relationships with the government and international institutions are most important.",
      "Own the chapter's plan, milestones and budget, together with the national team.",
      "Represent the chapter at events, with partners and in the press.",
      "Write a short monthly update for the national team: what happened, the numbers, blockers, and next month's plans.",
      "Bring your city's perspective and opportunities into SAIN's national decisions.",
    ],
    goodFitIf: [
      "Have built something from scratch, or led a team, community, project or initiative, and can tell us what went wrong and what you did about it.",
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
      ["Time", `12 hours a week, ${FLEXIBLE}`],
      ["Compensation", "€42–50k a year at full-time (40 hours), pro-rated to your hours."],
      ["Holiday allowance", HOLIDAY],
      ["Location", SHARED_LOCATION],
      ["Reports to", "Your mentor on SAIN's national team."],
      ["Start", SHARED_START],
    ],
  },
  {
    id: "education-lead",
    title: "Education Lead",
    formValue: "Education Lead",
    team: "education",
    hours: `8 hours a week depending on preference and availability, ${SHARED_TERM}`,
    summary: "Brings the first AI safety course to the city.",
    about: [
      "Courses are where most people's path into AI safety begins. At SAIN, hundreds of people a year take one at our existing chapters, and many of them go on to (research) projects, jobs and chapter roles of their own. In your city, that first course does not exist yet. You make it exist!",
      "You will not have to write a curriculum. We already have a clear playbook and curricula running in three cities, with readings, session plans and facilitator guides. Your job is to bring one to your city, get as many of the best people in your city to join, make sure they finish, and go on to develop themselves further.",
      "Which course comes first depends on the city: most likely a technical track in Eindhoven and Delft, and a governance & policy track in The Hague. You decide this with your director.",
    ],
    firstMonths: [
      "Choose the first course and track with your director, and schedule it for spring.",
      "Find the right place for people to do the course, recruit and onboard the appropriate number of facilitators, and get ready for applications! We will help you set up the application process.",
      "Promote the first cohort with your Communications Lead.",
      "By June: tens of people have finished the course (or courses, if you are ambitious), and you have documented clear lessons to run courses better next year.",
    ],
    responsibilities: [
      "Plan and run course iterations using SAIN's curricula and the Education Handbook.",
      "Start and run discussion groups.",
      "Recruit, train and support facilitators and discussion leads, with help from SAIN.",
      "Run course logistics: design each cohort, book rooms, process applications, plan and execute the project phase, and celebrate all participants in a graduation ceremony!",
      "Coordinate with the Communications Lead on marketing, and with the Events Lead on course-related events.",
      "Attend to the chapter's education inbox, and escalate matters to your Director or SAIN's national team where appropriate.",
    ],
    goodFitIf: [
      "Are organised, write clearly, and enjoy getting a group to think together. The role requires good administrative attention.",
      "Have completed an AI safety course.",
      "Are comfortable with both technical and governance content. You do not need to be an expert in either.",
    ],
    alsoStrong: [
      "A master's degree (finished or in progress), or professional experience in education.",
      "Connections to study associations or teaching staff at TU/e, TU Delft, Leiden or the Haagse Hogeschool (whichever is appropriate to your city).",
      "Experience facilitating an AI safety course.",
    ],
    logistics: [
      ["Time", `About 8 hours a week, ${FLEXIBLE}`],
      ["Compensation", "€34–42k a year at full-time (40 hours), pro-rated to your hours."],
      ["Holiday allowance", HOLIDAY],
      ["Location", SHARED_LOCATION],
      ["Reports to", "Your Chapter Director."],
      ["Start", SHARED_START],
    ],
  },
  {
    id: "events-lead",
    title: "Events Lead",
    formValue: "Events Lead",
    team: "events",
    hours: `8 hours a week depending on preference and availability, ${SHARED_TERM}`,
    summary: "Makes the chapter visible, one event at a time.",
    about: [
      "Events are how a chapter becomes visible. A good talk or hackathon is where most people first meet the community. It is also where the people who will later run its courses and projects first show up. In a new city, every event is also proof that there are people here who take AI safety seriously.",
      "You plan and run the chapter's first events, from the first meetup to talks that people travel for. You do not start from zero: SAIN's events playbook, speakers from the other chapters' networks, and a budget are there. What we need is someone who makes events happen reliably, gets the right people in the room, and makes them want to come back. That will be you!",
      "The audience differs per city. In Eindhoven it is TU/e students and Brainport engineers, and in Delft TU Delft students and researchers. In The Hague it is civil servants, policy professionals and students. Your role is to deliver events that build on your city's strengths and opportunities. Each event is an opportunity to bring the local community and newcomers together while representing SAIN's mission and values authentically.",
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
      "Run event logistics: booking venues, selecting and ordering catering, enabling sign-ups, and the handover to Communications to promote every event.",
      "Spot opportunities for the chapter and SAIN to appear at other people's events.",
      "Attend to the chapter's events inbox, and escalate matters to your Director or SAIN's national team where appropriate.",
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
      ["Time", `About 8 hours a week, ${FLEXIBLE}`],
      ["Compensation", "€34–42k a year at full-time (40 hours), pro-rated to your hours."],
      ["Holiday allowance", HOLIDAY],
      ["Location", SHARED_LOCATION],
      ["Reports to", "Your Chapter Director."],
      ["Start", SHARED_START],
    ],
  },
  {
    id: "communications-lead",
    title: "Communications Lead",
    formValue: "Communications Lead",
    team: "communications",
    hours: `8 hours a week depending on preference and availability, ${SHARED_TERM}`,
    summary: "Builds the chapter's audience from zero.",
    about: [
      "Nobody joins something they have never heard of. That is where you come in! You make sure the right people in your city hear about AI safety: researchers and professionals who would make great facilitators, engineers and students who have been quietly worried about the progress of AI and need a community, and civil servants who want to understand what is actually going on.",
      "You launch the chapter's social media accounts and make them run reliably. As SAIN, we have a brand kit, templates and more that are ready to be used. You will be working together with the national team and the other chapters' Communications Leads to share what works and what doesn't. What does not exist yet is an audience in your city, and building one is the job.",
      "Importantly: this role is about getting the right people to act (sign up, show up, apply, move through the talent pipeline, and so on), not about follower or like counts per se.",
      "The tone will differ per city. In The Hague, being able to communicate in Dutch matters a lot, in Delft not so much. You should know your city best, though.",
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
      "Sync with the other chapters' Communications Leads at least once a quarter.",
      "Attend to the chapter's communications inbox, and escalate matters to your Director or SAIN's national team where appropriate.",
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
      ["Time", `About 8 hours a week, ${FLEXIBLE}`],
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
      "Your CV, a few short written questions, and one question for each role you apply for. About 45 minutes.",
  },
  {
    label: "Work sample",
    detail:
      "If your application stands out, we'll give you a short task that mirrors the role you'll be doing, which takes about two hours.",
  },
  {
    label: "Interview",
    detail: "45 minutes with two people from SAIN, including a discussion of your work sample.",
  },
  {
    label: "Decision",
    detail: "By mid-December we invite a starting team of four people per city.",
  },
  {
    label: "Start",
    detail:
      "If you are in the starting team, your work will really kick off in mid-January!",
  },
];
