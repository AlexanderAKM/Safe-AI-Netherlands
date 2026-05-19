/**
 * Open positions content for the /open-positions page.
 *
 * Source of truth for role descriptions: working_docs/foundations/06_role_templates.md
 * Roles here are written as marketing-friendly distillations that still reflect
 * the full template (mission, responsibilities, preferred background, collaborations).
 *
 * To open or close a position for a chapter, edit `chapterPositions` below.
 */

// -----------------------------------------------------------------------------
// Application form (Google Form)
// -----------------------------------------------------------------------------

/**
 * Single Google Form for all chapters and roles.
 *
 * SETUP NOTES:
 * - Form fields: Name, Email, Chapter (Amsterdam / Utrecht), Role(s), CV upload,
 *   Motivation letter upload (or long-text), LinkedIn (optional), availability.
 * - Email routing: configure a Google Apps Script trigger on form submission
 *   that emails info@safeainetherlands.org plus the relevant chapter inbox
 *   (infoams@ or infoutr@) based on the "Chapter" answer. Apps Script template
 *   is left as an action item for whoever sets up the form.
 * - Pre-fill: this URL is appended with `&entry.<id>=<value>` to pre-select the
 *   chapter and role for the applicant. Until the form exists, the URL below is
 *   a placeholder that links to the contact page so the page is never broken.
 */
export const APPLICATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfp_XJWTbIUzf7szLlq4pe_RXUYxeK8B1SzKt5TUwkREmINtA/viewform";

/**
 * Pre-fill entry IDs for the Google Form. Replace with the real IDs once the
 * form is created (right-click each field in the live form -> "Get pre-filled
 * link" to read the IDs out of the URL).
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
  "Communications Team member (general or Web Designer, Content Creator, Graphic Designer)";

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

export type Role = {
  id: string;
  title: string;
  team: Team;
  scope: "chapter" | "national";
  reportsTo: string;
  timeCommitment: string;
  mission: string;
  responsibilities: string[];
  preferredBackground: {
    field?: string;
    level?: string;
    experience?: string;
    softSkills?: string;
  };
  collaborations: string;
  /**
   * Optional override for the value used when pre-filling the form's role
   * field. Useful when several distinct website roles share a single form
   * option (e.g. Communications Team Member specialisations).
   */
  formRoleValue?: string;
  /**
   * Optional label shown on the role card to flag this role as a
   * specialisation of a broader role.
   */
  specialisationOf?: string;
};

export const ROLES: Record<string, Role> = {
  "education-lead": {
    id: "education-lead",
    title: "Education Lead",
    team: "education",
    scope: "chapter",
    reportsTo: "Chapter (Co-)Director",
    timeCommitment: "6 to 10 hours per week, with iteration peaks",
    mission:
      "Run iterations of the AI Safety, Ethics and Society course in the chapter. Run discussion groups. Recruit, train, and support course facilitators and discussion leads. Maintain quality across cohorts and groups.",
    responsibilities: [
      "Plan and run course iterations (3-4 per year per chapter).",
      "Plan and run the relevant discussion groups.",
      "Recruit and onboard course facilitators and discussion leads while communicating closely with the facilitator mentor.",
      "Manage course logistics: cohort design, room booking, curriculum updates, project phase, graduation.",
      "Manage discussion logistics: group design, room booking.",
      "Keep the chapter education inbox in check.",
      "Coordinate with the Communications Lead on course and discussion group marketing.",
    ],
    preferredBackground: {
      field:
        "Open. Comfort with both technical and governance AI safety content essential.",
      level:
        "Master's preferred. Strong bachelor's with prior facilitation considered.",
      experience:
        "Facilitation, teaching, or course design experience preferred. Prior AI safety course participation strongly preferred (e.g. having completed a previous SAIN iteration).",
      softSkills:
        "Written communication, organisation, comfort facilitating discussion-based learning.",
    },
    collaborations:
      "Chapter (Co-)Director, facilitators, Communications Lead, Community Manager.",
  },

  "education-course-facilitator": {
    id: "education-course-facilitator",
    title: "Education Course Facilitator",
    team: "education",
    scope: "chapter",
    reportsTo: "Education Lead",
    timeCommitment: "~4 hours per week during iterations (one 2-hour session plus prep)",
    mission:
      "Facilitate one cohort of the course. Lead weekly discussions, support participants, and mark final projects.",
    responsibilities: [
      "Read the weekly readings ahead of the cohort.",
      "Run weekly interactive sessions.",
      "Provide feedback on the final project, depending on the course.",
      "Attend the facilitator check-ins with the Education Lead.",
    ],
    preferredBackground: {
      field:
        "Track-aligned: technical track facilitators with technical background; governance track with policy, law, or philosophy background.",
      level:
        "Professional or master's preferred. Strong bachelor's with prior course participation considered.",
      experience:
        "Prior completion of a previous AI safety course (ours or a comparable one) strongly preferred.",
      softSkills:
        "Warmth, ability to draw out quieter participants, willingness to admit uncertainty.",
    },
    collaborations: "Education Lead, fellow facilitators, course participants.",
  },

  "education-discussion-lead": {
    id: "education-discussion-lead",
    title: "Education Discussion Lead",
    team: "education",
    scope: "chapter",
    reportsTo: "Education Lead",
    timeCommitment:
      "~3 hours per week during the running block (1-hour session plus ~2 hours of prep, curation, and chat moderation)",
    mission:
      "Run one Discussion Group on a specific theme (technical safety, AI governance, privacy, and so on). Maintain a high-quality, casual environment where 8 to 10 participants engage seriously with shared material and with each other.",
    responsibilities: [
      "Pick themes at least a week in advance and prepare questions aligned with the group's focus.",
      "Brief the Communications Lead on promotional details: theme, time, location, description, RSVP mechanism.",
      "Curate reading material before each session: papers, articles, recent cases.",
      "Run the weekly 1-hour session in an informal setting (cafe, rented space, chapter office). Sessions may extend by 30 minutes if participants want to.",
      "Frame the discussion at the start, moderate to keep it balanced, summarise insights at the end. Encourage less participatory members.",
      "Document key points, arguments, disagreements, and open questions in the group's shared session document.",
      "Manage the group's communication platform: keep it on-topic, send reminder posters 2 days before each session, nudge less active participants supportively.",
      "At the start of each block, run the sign-up form, prune inactive members, and refresh the group with new participants.",
      "Surface participants who want to go deeper to the Education Lead, the Research Hub, or Substack opportunities.",
    ],
    preferredBackground: {
      field:
        "Aligned with the group's theme. Technical groups benefit from a CS/ML background; governance and privacy groups benefit from policy, law, ethics, or social-science backgrounds.",
      level: "Bachelor's minimum, master's and above preferred.",
      experience:
        "Prior facilitation, prior reading-group participation, or substantive engagement with the theme. Familiarity with current AI safety discourse in the chosen area is strongly preferred.",
      softSkills:
        "Facilitation (drawing out quieter voices, gently containing dominators), genuine curiosity, comfort moderating without dominating, reliability week to week.",
    },
    collaborations:
      "Education Lead, fellow Discussion Leads, Communications Lead, National Research Lead and Research Operations.",
  },

  "events-lead": {
    id: "events-lead",
    title: "Events Lead",
    team: "events",
    scope: "chapter",
    reportsTo: "Chapter (Co-)Director",
    timeCommitment: "6 to 10 hours per week, peaks around events",
    mission:
      "Plan and execute the chapter's events. Maintain the chapter's event presence, attract speakers, organise community life. Identify opportunities for SAIN exposure to reach new audiences, strengthen the community, and inspire people into AI safety careers.",
    responsibilities: [
      "Plan a balanced calendar of professional events, community socials, and hackathons. Communicate key dates to Communications Lead.",
      "Identify exposure opportunities for SAIN board and community members.",
      "Recruit and brief external speakers.",
      "Manage event logistics: venue, catering, marketing handover to Communications.",
      "Run the team meeting.",
      "Triage the chapter events inbox.",
      "Coordinate budget with the Chapter (Co-)Director.",
    ],
    preferredBackground: {
      field: "Open. Genuine interest in AI safety required.",
      level: "Not relevant.",
      experience:
        "Prior event organisation (student associations, conferences, hackathons) strongly preferred.",
      softSkills:
        "Project management, comfort cold-emailing speakers, calmness under deadline pressure, strong social skills.",
    },
    collaborations:
      "Chapter (Co-)Director, Communications Lead, Community Manager, external speakers, venue contacts.",
  },

  "events-team-member": {
    id: "events-team-member",
    title: "Events Team Member",
    team: "events",
    scope: "chapter",
    reportsTo: "Events Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Work alongside the Events Lead to deliver events end-to-end.",
    responsibilities: [
      "Take ownership of specific events as delegated by the Events Lead.",
      "Help with logistics: bookings, catering, on-site setup.",
      "Attend the weekly team meeting.",
      "Be present at events.",
    ],
    preferredBackground: {
      field: "Open. Strong passion for AI safety.",
      level: "Not relevant.",
      experience:
        "Not required; willingness to learn is enough. Previous experience organising events is a bonus.",
      softSkills: "Reliability, willingness to do hands-on work, social.",
    },
    collaborations: "Events Lead, fellow team members.",
  },

  "communications-lead": {
    id: "communications-lead",
    title: "Communications Lead",
    team: "communications",
    scope: "chapter",
    reportsTo: "Chapter (Co-)Director",
    timeCommitment: "6 to 10 hours per week",
    mission:
      "Run the chapter's internal and external communication. Maintain the chapter's social media presence, coordinate with the national communications leads on shared communication goals, and uphold a consistent brand and tone. Ensure the chapter's events and outputs are optimised for awareness, action (applying to courses), conversion (career switching), or community strengthening.",
    responsibilities: [
      "Run the chapter's Instagram, LinkedIn and WhatsApp announcements in line with the brand kit (agreed templates with SAIN fonts and colours).",
      "Align the content calendar at the beginning of each month with broader organisational goals and SAIN's content pillars.",
      "Identify relevant content to reshare on socials to maintain and grow engagement (advisors, board members, partner organisations).",
      "Propose designs for offline materials, e.g. roll-ups, mugs, T-shirts.",
      "Research and share best practices with Communications Team members.",
      "Delegate tasks with clear expectations and deadlines according to the content calendar.",
      "Coordinate with the Events Lead on event marketing timelines. Drive event anticipation, registration, and post-event recaps.",
      "Coordinate with the Education and Research Leads quarterly on whether any projects benefit from promotion.",
      "Maintain and optimise the chapter portion of the website.",
      "Sync at least quarterly with the other chapters' Communications Leads.",
      "Triage the chapter PR inbox.",
    ],
    preferredBackground: {
      field:
        "Open. Communications, marketing, design, or journalism experience helpful but not required.",
      level: "Bachelor's minimum.",
      experience:
        "Prior social media management, content creation, or journalism. Familiarity with Canva, Figma, or equivalent.",
      softSkills:
        "Writing, visual sense, attention to brand consistency.",
    },
    collaborations:
      "Chapter (Co-)Director, Events Lead, Education Lead, Research Lead, Community Manager, other chapters' Communications Leads.",
  },

  "communications-team-member": {
    id: "communications-team-member",
    title: "Communications Team Member",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Strengthen the chapter's internal and external communication. Coordinate with the Communications Lead on shared goals and a consistent brand and tone across all channels.",
    responsibilities: [
      "Create posts per the chapter's posting calendar across Instagram, LinkedIn or WhatsApp. Create design content, photographs, and videos that can be cross-shared when relevant.",
      "Observe what content performs well, replicate it, and share recommendations with team members.",
      "Cover events live (real-time stories, photos, videos).",
      "Work on local and national SAIN branding.",
      "Attend the weekly team meeting.",
      "Propose ideas based on observed engagement.",
    ],
    preferredBackground: {
      field: "Open.",
      level: "Bachelor's minimum.",
      experience: "Prior content creation helpful.",
      softSkills: "Visual sense, writing, reliability.",
    },
    collaborations: "Communications Lead, Events Lead.",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
  },

  "web-designer": {
    id: "web-designer",
    title: "Web Designer",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Keep the chapter's web presence polished, up to date, and consistent with SAIN's brand.",
    responsibilities: [
      "Build and maintain chapter web pages, ensuring content and design are current.",
      "Implement updates requested by the Communications, Events, or Education Lead.",
      "Optimise pages for readability, mobile responsiveness, and load performance.",
      "Ensure visual consistency with SAIN's brand kit across all web-facing assets.",
      "Propose and prototype improvements to page layout and user flow.",
      "Attend the weekly Communications team meeting.",
    ],
    preferredBackground: {
      field: "Open. Design, computer science, or media studies are helpful.",
      level: "Bachelor's minimum.",
      experience:
        "GitHub experience is a must as our website is developed accordingly. Prior web design or front-end development (portfolio preferred). Familiarity with tools such as Webflow, WordPress, or Figma.",
      softSkills:
        "Visual sense, attention to detail, ability to take and act on feedback.",
    },
    collaborations: "Communications Lead, Communications Team members.",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "content-creator": {
    id: "content-creator",
    title: "Content Creator",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Produce written and multimedia content that communicates SAIN's work, events, and mission to internal and external audiences.",
    responsibilities: [
      "Write copy for social media posts, newsletters, event announcements, and the website in line with SAIN's tone and brand.",
      "Produce short-form video or photo content for Instagram and LinkedIn, including live event coverage (stories, reels, recap posts).",
      "Adapt content to platform and audience: concise and visual for Instagram, professional and substantive for LinkedIn.",
      "Follow the monthly content calendar set by the Communications Lead.",
      "Monitor what content performs well and share observations with the team.",
      "Attend the weekly Communications team meeting.",
    ],
    preferredBackground: {
      field:
        "Open. Journalism, communications, marketing, or media are helpful.",
      level: "Bachelor's minimum.",
      experience:
        "Prior content creation, copywriting, blogging, or social media management helpful. Portfolio or examples of prior work are a strong plus.",
      softSkills:
        "Writing, storytelling, creativity, ability to meet deadlines.",
    },
    collaborations:
      "Communications Lead, Graphic Designer, Events Lead.",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "graphic-designer": {
    id: "graphic-designer",
    title: "Graphic Designer",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Create visual assets that make SAIN's communications distinctive, on-brand, and compelling across digital and print channels.",
    responsibilities: [
      "Design social media visuals, event posters, flyers, and banner graphics in line with SAIN's brand kit.",
      "Produce templates for recurring formats (event announcements, reminder posters, recap cards) for reuse by the Communications team.",
      "Design offline materials such as roll-ups, merchandise, and printed handouts.",
      "Ensure all visual outputs are consistent with SAIN's fonts, colours, and tone.",
      "Incorporate feedback from the Communications Lead and iterate quickly.",
      "Attend the weekly Communications team meeting.",
    ],
    preferredBackground: {
      field:
        "Open. Graphic design, visual communication, or media arts are helpful.",
      level: "Not relevant; portfolio carries more weight than credentials.",
      experience:
        "Prior graphic design work required. Proficiency in Canva, Figma, Adobe Illustrator, Photoshop, or equivalent. Portfolio strongly preferred.",
      softSkills:
        "Visual sense, attention to brand consistency, receptiveness to feedback, ability to work to deadlines.",
    },
    collaborations:
      "Communications Lead, Content Creator, Events Lead, On-Campus Ambassador.",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "community-manager": {
    id: "community-manager",
    title: "Community Manager",
    team: "community",
    scope: "chapter",
    reportsTo: "Chapter (Co-)Director",
    timeCommitment: "4 to 6 hours per week",
    mission:
      "Welcome people into the chapter community and funnel them into deeper involvement. Be the friendly face and first point of contact.",
    responsibilities: [
      "Identify and welcome new community members (chapter WhatsApp, after course iterations, after events).",
      "Maintain the community relationship management database: track first contact, study, year, level of involvement (GDPR-compliant).",
      "Be present at chapter events; approach new people there.",
      "Funnel interested community members towards open positions, course iterations, and events. Forward opportunities from announcement channels to specific high-potential members.",
      "Triage the chapter community manager inbox.",
      "Attend Team Lead Meetings; flag community insights and pain points.",
    ],
    preferredBackground: {
      field: "Open.",
      level: "Not relevant.",
      experience:
        "Prior community management, student association leadership, or similar helpful.",
      softSkills:
        "Warmth, social fluency, reliability, comfort with light data work.",
    },
    collaborations:
      "Chapter (Co-)Director, all team leads, course graduates, community members.",
  },

  "on-campus-ambassador": {
    id: "on-campus-ambassador",
    title: "On-Campus Ambassador",
    team: "outreach",
    scope: "chapter",
    reportsTo: "Events Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Be SAIN's face on campus. Drive awareness and foot traffic to SAIN events by reaching students where they are: at notice boards, tabling spots, and in passing.",
    responsibilities: [
      "Table at university common areas to introduce SAIN to students and invite them to upcoming events.",
      "Distribute flyers and printed materials across campus ahead of events and course iterations.",
      "Post and maintain advertisements on university notice boards and approved campus display areas.",
      "Engage passersby in friendly, informed conversation about SAIN's activities and mission.",
      "Coordinate with the Events Lead on upcoming dates, materials needed, and target locations.",
      "Report back on campus reception, questions asked, and any leads to pass to the Community Manager.",
    ],
    preferredBackground: {
      field: "Open. Genuine interest in AI safety required.",
      level: "Not relevant.",
      experience:
        "Not required. Prior brand ambassador, student rep, or outreach experience is a bonus.",
      softSkills:
        "Outgoing, approachable, reliable, comfortable initiating conversations with strangers.",
    },
    collaborations:
      "Events Lead, Communications Lead, Community Manager.",
  },

  "research-operations": {
    id: "research-operations",
    title: "Research Operations",
    team: "research",
    scope: "national",
    reportsTo: "National Research Lead",
    timeCommitment:
      "2 hours per week in quiet times to 8 hours per week when many supervisors and researchers are onboarded",
    mission:
      "Make the Research Hub run smoothly day-to-day. Handle operational logistics, onboard new researchers and supervisors, and shape the research direction with the Research Lead.",
    responsibilities: [
      "Decide the strategic direction of the Research Hub together with the Lead.",
      "Track applicants and ongoing projects (the Research Hub interest tracker).",
      "Send check-in forms and follow up on open ones.",
      "Maintain Discord channels and the GitHub organisation.",
      "Keep the website's research section updated.",
    ],
    preferredBackground: {
      field:
        "Open. Technical background helpful (familiar with GitHub, basic ML literacy).",
      level: "Bachelor's minimum, master's preferred.",
      experience:
        "Prior research support, lab management, or operational role helpful but not required.",
      softSkills:
        "Reliability, attention to detail, comfort with admin work.",
    },
    collaborations:
      "National Research Lead, supervisors, researchers.",
  },
};

// -----------------------------------------------------------------------------
// Chapter -> open positions
// -----------------------------------------------------------------------------

export type ChapterPosting = {
  /** Slug used in pre-fill (must match the option text in the Google Form). */
  chapterSlug: string;
  chapterName: string;
  blurb: string;
  inboxEmail: string;
  status: "open" | "closed";
  closedNote?: string;
  /**
   * Each posting references a role id from ROLES. Optionally specify how many
   * positions are open and an override on title or notes for the chapter.
   */
  postings?: Array<{
    roleId: keyof typeof ROLES;
    positions?: number;
    note?: string;
  }>;
};

export const chapterPositions: ChapterPosting[] = [
  {
    chapterSlug: "Amsterdam",
    chapterName: "SAIN Amsterdam",
    blurb:
      "SAIN Amsterdam is building its core team. Co-Directors Ana and Andreea are looking for team leads and team members across all teams. If you want to help shape a chapter from the ground up, this is the moment.",
    inboxEmail: "infoams@safeainetherlands.org",
    status: "open",
    postings: [
      { roleId: "education-lead" },
      // { roleId: "education-course-facilitator" },
      { roleId: "education-discussion-lead" },
      { roleId: "events-lead" },
      { roleId: "events-team-member" },
      { roleId: "communications-lead" },
      { roleId: "communications-team-member" },
      { roleId: "web-designer" },
      { roleId: "content-creator" },
      { roleId: "graphic-designer" },
      { roleId: "community-manager" },
      // { roleId: "on-campus-ambassador" },
      { roleId: "research-operations" },
    ],
  },
  {
    chapterSlug: "Utrecht",
    chapterName: "SAIN Utrecht",
    blurb:
      "SAIN Utrecht is building its core team. Director Riccardo and the current team leads are looking for hands-on contributors who want to grow the chapter.",
    inboxEmail: "infoutr@safeainetherlands.org",
    status: "open",
    postings: [
      { roleId: "communications-lead" },
      { roleId: "education-discussion-lead" },
      // { roleId: "education-course-facilitator" },
      { roleId: "community-manager" },
      { roleId: "events-team-member"},
      { roleId: "communications-team-member"},
      { roleId: "on-campus-ambassador"},
      { roleId: "web-designer" },
      { roleId: "content-creator" },
      { roleId: "graphic-designer" },
      { roleId: "research-operations" },
    ],
  },
  {
    chapterSlug: "Groningen",
    chapterName: "SAIN Groningen",
    blurb:
      "SAIN Groningen's core team is currently at capacity. Get in touch if you want to be considered for future openings. We are always looking for ambitious, passionate people.",
    inboxEmail: "infogro@safeainetherlands.org",
    status: "closed",
    closedNote:
      "No formal open positions right now. Strong candidates are still welcome to introduce themselves; we keep a list for the next hiring round.",
  },
];

// -----------------------------------------------------------------------------
// Deadline + Timeline
// -----------------------------------------------------------------------------

/**
 * Hard application deadline for the current hiring round.
 * Update the ISO string and the display strings together when the cycle changes.
 */
export const APPLICATION_DEADLINE = {
  iso: "2026-06-01T23:59:00+02:00",
  display: "1 June 2026, midnight (CET)",
  short: "1 June 2026",
};

export type TimelineStep = {
  label: string;
  detail: string;
};

/**
 * Edit these strings whenever the cycle changes. The page surfaces both the
 * default cycle and the "earlier onboarding possible" caveat.
 */
export const APPLICATION_TIMELINE: TimelineStep[] = [
  {
    label: "Applications open",
    detail: "Submit your application any time before the deadline.",
  },
  {
    label: "Application deadline",
    detail: `${APPLICATION_DEADLINE.display}. All applications must be submitted by this date.`,
  },
  {
    label: "First-round response",
    detail:
      "Within 2 to 3 weeks of applying. Strong candidates are invited to a short intro call with the chapter lead for that team.",
  },
  {
    label: "Trial conversation",
    detail:
      "A 30 to 45 minute call to discuss the role, your motivation, and a small task or scenario relevant to the team.",
  },
  {
    label: "Onboarding",
    detail:
      "If the previous steps go well, the standard onboarding cycle starts right after. Joining SAIN's team at other dates is possible.",
  },
];
