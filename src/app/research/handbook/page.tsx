import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import HandbookToc, { type TocItem } from "@/components/handbook/HandbookToc";
import Reveal from "@/components/landing/Reveal";
import {
  Bullets,
  Callout,
  InLink,
  NumberedSteps,
  OutLink,
  OutlineList,
  P,
  Rail,
  SubTitle,
  Turn,
} from "@/components/handbook/prose";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import {
  PROJECTS_EMAIL,
  RESEARCH_INTEREST_FORM_URL,
  SUPERVISOR_INTEREST_FORM_URL,
} from "@/data/research";

export const metadata: Metadata = {
  title: "Project Hub handbook",
  description:
    "How the SAIN Project Hub works, from first application to published output: eligibility, matching, time commitment, standards, and the escalation path.",
  alternates: { canonical: "/research/handbook" },
};

/* The handbook is a document, not a marketing page.

   One reading column at --container-copy, white ground, hairlines for
   structure, no photo bands and no orbit ornament competing with the text. The
   only two grounds that are not white are the cream imprint band at the top,
   which is where a printed programme carries its version and its authors, and
   the one inverse close, which the page has earned because it ends in a real
   action.

   The source is the Project Hub Handbook v3 (Google Doc, 14 October 2026),
   which replaces v1.0 (docs/research_hub_handbook.md). This page is the same
   policy reordered into the reader's journey: every rule, number, form and
   deadline appears here once, which is why the cross-references below are
   links rather than repetitions. Where v3 was still under discussion (the
   societal topics, how often matching rounds run, the two-week project plan,
   the new single form), the page keeps what v1.0 said or leaves it out. */

const ONBOARDING_FORM_URL = "https://sainonboard.fillout.com/new";
const DISCORD_URL = "https://discord.gg/MYQcfWfgzB";
/* Responder paths, not editor paths. The source document recorded these two
   forms by their document ids, which Google resolves to the editor: a
   participant without edit rights lands on "You need permission", and the
   page's headline weekly obligation stops working. /viewform is the path a
   respondent gets. Both still need one signed-out check by the team, and if
   either form is not shared with responders the callout should route through
   projects@safeainetherlands.org instead of linking a form that 403s. */
const WEEKLY_CHECKIN_URL =
  "https://docs.google.com/forms/d/1Uu4JrMh9j6iNa4seeIyqPnkCtikFXPgT8-pUPnwzVVE/viewform";
const BIWEEKLY_CHECKIN_URL =
  "https://docs.google.com/forms/d/1bBQ8jstIOWAFzOuskhLMv9lnGvcU87ZTtSSKo8mni9o/viewform";
const SUBSTACK_URL = "https://safeainetherlands.substack.com/";
/* The archive is the publications list on /research, so this stays on the
   site: an internal route and a real element id, not a text fragment that no
   longer matches and sends a reader off a preview build to production. */
const PROJECT_ARCHIVE_URL = "/research#publications";

/* The handbook follows the life of a project, so the contents does too. These
   ids are the page's stable deep links; the sticky rail at xl reads the same
   list. */
const contents: TocItem[] = [
  { id: "purpose", title: "What the Project Hub is for" },
  { id: "before-you-apply", title: "Before you apply" },
  { id: "getting-started", title: "From application to running project" },
  { id: "during-the-project", title: "During the project" },
  { id: "publishing", title: "Finishing and publishing" },
  { id: "escalation", title: "If something goes wrong" },
  { id: "supervisors", title: "If you supervise" },
];

const technicalTopics = [
  "Mechanistic interpretability",
  "Representation learning and feature sparsity for safer control",
  "Steering and controllability of LLMs and other foundation models",
  "Adversarial robustness and red-teaming of models",
  "Detection and mitigation of deceptive or misaligned behaviours",
  "Scalable oversight, debate, constitutional AI, and related methods",
  "Robustness of RL agents and multi-agent systems",
  "Safety benchmarks and evaluation metrics, including evaluations in Dutch",
  "Agent foundations",
  "Neuroscience-inspired alignment",
];

const hardwareTopics = [
  "Compute governance and hardware-enabled verification mechanisms",
  "Semiconductor supply chains, export controls, and their role in AI governance",
  "Security of model weights and AI infrastructure",
];

/* Unchanged from v1.0 on purpose: in v3 this bucket is still open for
   discussion (too broad, or scoped to x-risk), so it neither grows nor
   shrinks until that is settled. */
const societalTopics = [
  "AI governance, regulation, and standards, with emphasis on the EU and Dutch context",
  "AI and democratic processes: misinformation, polarisation, information integrity",
  "AI and labour: job displacement, economic and social impacts",
  "Privacy, surveillance, and data protection in AI deployment",
  "Risk assessment for high-stakes domains such as CBRN, cybersecurity, and critical infrastructure",
];

const metaTopics = [
  "Research methodology and evaluation in AI safety",
  "Benchmarking AI systems' persistence, persuasion, or autonomy",
  "Forecasting and scenario analysis for transformative AI",
  "Epistemics, information hazards, and responsible communication in AI safety",
  "Dutch-language resources and education on AI safety",
];

const proposalElements = [
  "Title, problem statement, and motivation",
  "Background and related work",
  "Research or policy questions, and hypotheses if applicable",
  "Intended audience: who should read or use this, for example researchers, a ministry, a regulator, or developers",
  "Proposed methodology",
  "Safety and risk considerations: dual-use, misuse, and infohazards, meaning information that could cause harm if widely shared",
  "Needed resources: potential datasets, compute estimates, and how many collaborators for how much time",
  "Timeline and milestones",
  "Expected outputs",
];

/** The projects inbox, set the way every inline address on this page is. */
function ProjectsMail() {
  return (
    <a
      href={`mailto:${PROJECTS_EMAIL}`}
      className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
    >
      {PROJECTS_EMAIL}
    </a>
  );
}

/* A chapter of the document: an h2 turn under the rule that separates it.

   The numeral above the heading is the index role doing wayfinding, the same
   two digits the contents list and the rail carry. It exists because the
   document cross-references itself by number, and a reader who has scrolled
   past a heading needs a visible referent to know they are in section 4. It is
   not a kicker: Poppins at the index role, never serif, never a sentence. */
function Chapter({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-32 border-t border-navy/10 pt-10"
    >
      <p
        aria-hidden="true"
        className="font-sans text-index tabular-nums text-navy/50"
      >
        {String(index).padStart(2, "0")}
      </p>
      <h2
        id={`${id}-heading`}
        className="mt-2 font-serif text-heading text-navy"
      >
        {title}
      </h2>
      <div className="mt-6 flex flex-col gap-6">{children}</div>
    </section>
  );
}

/** One of the scope buckets: a title-sm heading over its own hairline. */
function TopicList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-navy/10 pt-4">
      <SubTitle>{title}</SubTitle>
      <div className="mt-3">
        <Bullets items={items} />
      </div>
    </div>
  );
}

/** One of the two ways to take part: a serif numeral and name over its copy. */
function Mode({ n, name, children }: { n: number; name: string; children: ReactNode }) {
  return (
    <div>
      <p className="flex items-baseline gap-3">
        <span
          aria-hidden="true"
          className="font-serif text-title-sm tabular-nums text-navy/40"
        >
          {n}
        </span>
        <span className="font-serif text-title-sm text-navy">{name}</span>
      </p>
      <p className="mt-2 font-sans text-body text-navy/74">{children}</p>
    </div>
  );
}

export default function ProjectHubHandbookPage() {
  return (
    <>
      {/* The imprint band. Cream, thin, and no illustration: this is the
          printed programme's title page, and what a reader needs from it is
          the claim, the premise, and who wrote it when. */}
      <section
        aria-labelledby="handbook-heading"
        className="border-b border-navy/10 bg-cream"
      >
        <div className="shell band-index">
          <div className="max-w-copy-wide">
            <nav aria-label="Breadcrumb" className="font-sans text-label text-navy/65">
              <Link
                href="/research"
                className="text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
              >
                Project hub
              </Link>
              <span aria-hidden="true" className="px-2 text-navy/35">
                /
              </span>
              <span aria-current="page">Handbook</span>
            </nav>

            <p className="kicker mt-6 text-kicker text-navy/60">Project Hub</p>
            <h1
              id="handbook-heading"
              className="mt-3 font-serif text-display text-navy"
            >
              The SAIN Project Hub handbook
            </h1>
            <p className="mt-5 max-w-copy font-sans text-body text-navy/72">
              How the Project Hub works, from first application to published
              output. It sets out what participants, supervisors, and the
              Project Team can expect from each other.
            </p>

            <div className="mt-7 flex flex-col gap-1 border-t border-navy/10 pt-4 font-sans text-footnote text-navy/60">
              <p>
                Version 3.0 · 14 October 2026 ·{" "}
                <a
                  href={`mailto:${PROJECTS_EMAIL}`}
                  className="text-navy/60 underline decoration-navy/25 underline-offset-4 hover:text-navy hover:decoration-navy focus-visible:text-navy"
                >
                  {PROJECTS_EMAIL}
                </a>
              </p>
              <p>
                Builds on version 1.0 by Alexander Müller (Director), Thomas
                Brcic (Former SAIN Groningen Co-Director), and Ilija Lichkovski
                (Research Lead).
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="shell band-section">
          {/* Below xl this is one centred reading column and nothing else. At
              xl the copy column stays exactly where it was and the quiet rail
              appears in the margin beside it, which is why the side columns
              are equal fractions rather than the copy being pushed across. */}
          <div className="mx-auto grid max-w-copy xl:max-w-none xl:grid-cols-[minmax(0,1fr)_minmax(0,720px)_minmax(0,1fr)] xl:gap-10 2xl:gap-16">
            <HandbookToc items={contents} />

            <div className="flex min-w-0 flex-col gap-14">
              {/* What the reader needs if they read nothing else, then where
                  their own section is. Both are the answer to "do I have to
                  read all of this?", which is the first judgement this page
                  gets. */}
              <Reveal className="flex flex-col gap-10">
                <Callout label="The short version">
                  <Bullets
                    items={[
                      "Anyone with sufficient background can take part: Bachelor's, Master's, and PhD students, researchers, people working in industry, policy professionals, and people with no formal affiliation. Remote participation works.",
                      "Sign-ups are rolling. Apply at any time and someone from SAIN gets back to you within a working week; matching with supervisors happens in rounds.",
                      "Participation is voluntary and educational. SAIN does not pay stipends or salaries, but supports projects with compute, introductions, and, within reason, conference and travel costs.",
                      <>
                        One address for everything: <ProjectsMail />. Keep it in
                        cc on any email about a project.
                      </>,
                    ]}
                  />
                </Callout>

                <nav aria-labelledby="contents-heading">
                  <h2
                    id="contents-heading"
                    className="font-serif text-heading-sm text-navy"
                  >
                    Find the part that applies to you
                  </h2>
                  <p className="mt-2.5 font-sans text-body text-navy/74">
                    The handbook follows the life of a project. Start where you
                    are.
                  </p>
                  <ol className="mt-6 flex flex-col">
                    {contents.map((item, i) => (
                      <li key={item.id} className="border-t border-navy/10 last:border-b">
                        <a
                          href={`#${item.id}`}
                          className="group flex items-baseline gap-4 py-[11px] font-sans text-ui text-navy underline decoration-transparent underline-offset-4 hover:decoration-navy focus-visible:decoration-navy"
                        >
                          <span
                            aria-hidden="true"
                            className="w-[22px] shrink-0 font-sans text-index tabular-nums text-navy/50 transition-colors group-hover:text-orange-ink group-focus-visible:text-orange-ink"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </Reveal>

              {/* 1 */}
              <Chapter id="purpose" index={1} title="What the Project Hub is for">
                <P>
                  SAIN (Safe AI Netherlands) exists to prepare the Netherlands
                  for the risks of transformative AI: AI capable of changing the
                  economy, science, society, or global security on the scale of
                  a major historical revolution. Every year, hundreds of people
                  take a SAIN course or come to one of our events. The Project
                  Hub is where they, and anyone else with the right background,
                  make their first real contribution, with a supervisor or a
                  project team behind them.
                </P>
                <P>
                  This handbook applies to participants working on a Project Hub
                  project, supervisors affiliated with SAIN, project leads and
                  collaborators on open projects, and anyone outside SAIN who
                  wants to understand how the hub runs. Participants can be
                  students, researchers, people working in industry, policy
                  professionals, or people without a formal affiliation;
                  supervisors come from universities, industry, and government
                  alike.
                </P>
                <Callout label="A note on the name">
                  <P>
                    The Project Hub used to be called the Research Hub. We
                    renamed it because a lot of valuable AI safety work is not a
                    research paper. A policy brief for a ministry, an evaluation
                    of a model in Dutch, an open-source tool, or a clear
                    Dutch-language explainer can matter just as much. Academic
                    research is still very welcome, and still at the heart of
                    the hub.
                  </P>
                </Callout>

                <Turn>Three things decide which projects we take on</Turn>
                <P>
                  We welcome any project that meaningfully contributes to AI
                  safety, whether technical, governance, policy, or conceptual.
                  When we decide which projects and supervisors to take on, we
                  look at three things.
                </P>
                <OutlineList
                  items={[
                    "Relevance to the Netherlands, and to Europe or other middle powers. Many projects should be directly useful here: to Dutch policymakers, regulators, companies, or the Dutch public. General work, such as an interpretability project, is just as welcome, but local relevance helps a project stand out.",
                    "Relevance to transformative AI. The project should address risks from increasingly capable AI systems, whether those risks play out now or are plausible in the future.",
                    "Feasibility on a small budget. SAIN is largely volunteer-driven, so a project should not need large amounts of compute or money to succeed.",
                  ]}
                />

                <Turn>Almost any topic counts, if it reduces risk from transformative AI</Turn>
                <P>
                  If you are unsure whether a topic counts as AI safety, the
                  default answer is yes, provided you can articulate a plausible
                  pathway from your work to reducing risk from transformative
                  AI. To make the scope concrete, the hub especially encourages
                  work in the following areas, without being limited to them.
                </P>
                <div className="flex flex-col gap-7">
                  <TopicList
                    title="Technical alignment and interpretability"
                    items={technicalTopics}
                  />
                  <TopicList
                    title="Hardware, compute, and security"
                    items={hardwareTopics}
                  />
                  <TopicList
                    title="Societal impacts, governance, and policy"
                    items={societalTopics}
                  />
                  <TopicList title="Meta and foundational topics" items={metaTopics} />
                </div>

                <Turn>Five principles hold on every project</Turn>
                <OutlineList
                  items={[
                    "Intellectual honesty. Always communicate accurately what is known, unknown, and uncertain.",
                    <>
                      Proactively consider near-term and long-term harms, as
                      well as dual-use concerns: ways the same work could both
                      protect and cause harm.{" "}
                      <InLink href="#during-the-project">Section 4</InLink>{" "}
                      covers this in depth.
                    </>,
                    "Maintain a supportive environment across disciplines, sectors, and seniority levels. There is zero room for harmful authority.",
                    "Feedback, critique, and review are essential tools, not personal attacks. When receiving feedback, remember it is aimed at the work. When giving it, attack the ideas, not the person.",
                    "Respect confidentiality. Many participants and supervisors work at a company, university, or ministry. Never ask someone to share information they are not allowed to share, and do not share such information yourself.",
                  ]}
                />
                <P>
                  Be extra wary of these principles when deadlines approach.
                  Everyone is fallible, and when compromising on a principle is
                  the difference between publishing and not publishing, holding
                  the principle matters more than the publication.
                </P>
              </Chapter>

              {/* 2 */}
              <Chapter id="before-you-apply" index={2} title="Before you apply">
                <Turn>There are two ways to take part</Turn>
                <P>
                  The hub currently runs in two modes. Everything later in this
                  handbook applies to both unless it says otherwise.
                </P>
                <Rail>
                  <Mode n={1} name="Supervised project matching.">
                    Students, early-career researchers, and professionals apply
                    for a guided project with mentorship from one of
                    SAIN&rsquo;s supervisors. Supervisors publish their agendas,
                    the projects they would like to supervise, on our website,
                    and we match them with suitable applicants (
                    <InLink href="#getting-started">section 3</InLink> explains
                    how). SAIN provides logistical and, where possible,
                    financial support, such as compute. Projects aim to become a
                    published output: a paper, a policy brief, a tool, or
                    something similar.
                  </Mode>
                  <Mode n={2} name="Open collaboration.">
                    Not every project needs formal supervision. SAIN connects
                    people directly and supports the work with compute,
                    visibility, and introductions. To propose a project, submit
                    it via the form on our website; to join one, say so in the
                    same form or reach out to that project&rsquo;s contact
                    person. Nobody plays the supervisor role on these projects,
                    but one person leads, usually whoever designed the project.
                  </Mode>
                </Rail>
                <P>
                  Professionals can also start an open project around a
                  question they run into in their own work: a policy advisor
                  who wants to know how a certain AI risk could be monitored, or
                  an engineer who wants to build an evaluation tool. Just make
                  sure the question is one you can share publicly (see
                  confidentiality in{" "}
                  <InLink href="#during-the-project">section 4</InLink>).
                </P>
                <P>
                  Not ready for a project yet? That is completely fine. If you
                  mainly want to learn, say so in the form, and we will point
                  you to one of SAIN&rsquo;s courses or reading groups. Many
                  participants start there.
                </P>

                <Turn>Anyone with sufficient background is eligible</Turn>
                <Bullets
                  items={[
                    "Both modes are open to anyone with sufficient background: Bachelor's, Master's, and PhD students, researchers, people working in industry, policy professionals, and people with no formal affiliation.",
                    "Remote participation works.",
                    "To supervise, you need substantial experience in a relevant field. In academia this usually means PhD level or above. Outside academia, several years of senior experience in a relevant role counts just as much, for instance as a machine learning or hardware engineer, a security specialist, or a policy advisor working on AI or digital policy. In exceptional cases this can differ.",
                    "Supervisors do not need to be AI safety experts already. Deep expertise in your own field and a genuine interest in AI safety are often exactly what a project needs.",
                  ]}
                />

                <Turn>You can sign up at any time</Turn>
                <Bullets
                  items={[
                    "Sign-ups are rolling. Apply whenever you are ready, and someone from SAIN gets back to you within a working week.",
                    <>
                      Matching with supervisors happens in rounds (
                      <InLink href="#getting-started">section 3</InLink>).
                    </>,
                    "Applicants for supervised projects tell us about their background and experience, which supervisors or projects they are interested in (up to three), what they would like to work on, and how many hours per week they can realistically put in.",
                    "Supervisors only need to give us the basics: name, email, organisation, the projects they would like to supervise, and a short bio and picture for the website. No Discord account or long document is needed, though the Discord is the best way to get to know the community.",
                    "For starting an open collaboration, we appreciate a fully fleshed-out proposal before you contact us, but if necessary we can help shape it.",
                  ]}
                />

                {/* Right where the reader is doing the maths. */}
                <Callout label="Time commitment">
                  <P>
                    Time commitment matters most. In comparable programmes, the
                    most common reason projects fail is that participants cannot
                    put in the time they hoped to. When you apply, give the
                    number of hours per week you are at least 80% sure you can
                    keep up, also during exam periods, busy weeks at work, or
                    holidays. A realistic 6 hours beats an optimistic 10.
                  </P>
                  <P>
                    Hours and meeting cadence are then agreed per project at the
                    kick-off. Projects range from roughly 5 to 10 hours per week
                    to near full-time.
                  </P>
                </Callout>
              </Chapter>

              {/* 3 */}
              <Chapter
                id="getting-started"
                index={3}
                title="From application to running project"
              >
                <Turn>Supervised projects are matched in rounds</Turn>
                <P>
                  This is how supervisors and participants are matched. We are
                  working on automating parts of it, but the steps will stay
                  roughly the same.
                </P>
                <NumberedSteps
                  steps={[
                    "Supervisors sign up with their agenda: one or more projects they would like to supervise, the background they are looking for, and how many people they can take on. We turn this into a profile on our website and promote it through our chapters, courses, and network.",
                    "Applicants apply and select up to three supervisors or projects. If none of the agendas fit, describe what you would like to work on instead, and we will try to find a supervisor for it.",
                    "Every round has a deadline, which we publish on our website. After it, the Project Team does a light check of the applications (is the form complete, does the background fit the project?) and groups them per supervisor.",
                    "Within a week of the deadline, each supervisor receives the applicants who picked them, decides who they would like to talk to, and usually has a short call of 15 to 30 minutes with them before deciding.",
                    <>
                      Once both sides say yes, we send an introduction email,
                      always with <ProjectsMail /> in cc, and the project starts.
                    </>,
                  ]}
                />
                <Bullets
                  items={[
                    "Thesis students: university deadlines do not wait for our rounds. If you are looking for a thesis supervisor or an external thesis project, mention it when you apply, and where possible we handle your application outside the regular rounds.",
                    "No match this round? We tell you, and suggest next steps: the next round, an open collaboration, or a course to build up relevant skills. With your permission, your application stays in our system, so you do not need to fill everything in again.",
                    "Your data: we only share your application with the supervisors you selected or, if you ask us to find a match for you, with supervisors we think are a good fit.",
                  ]}
                />

                <Turn>Supervised matching begins with an application</Turn>
                <P>
                  For supervised project matching, or to join an existing open
                  collaboration, fill in the application form or email{" "}
                  <ProjectsMail />.
                </P>
                <p>
                  <OutLink href={RESEARCH_INTEREST_FORM_URL}>
                    Apply for a project
                  </OutLink>
                </p>

                <Turn>Open collaborations begin with a project proposal</Turn>
                <P>
                  Before a project is approved as a Project Hub open
                  collaboration, the project lead completes a project proposal.
                  The full structure below is what we expect when the goal is a
                  full paper and collaboration; for other outputs, drop what you
                  think is unnecessary. A mechanistic interpretability tool, for
                  example, does not need a title and abstract, and for a policy
                  brief the policy question and intended audience matter more
                  than hypotheses.
                </P>
                <OutlineList items={proposalElements} />
                <P>
                  SAIN&rsquo;s Project Team reviews the proposal and either
                  approves it as a Project Hub project, with or without
                  revisions, or declines it.
                </P>

                <Turn>Onboarding starts with one form</Turn>
                <P>
                  Every new participant gets a rough overview of current
                  projects, groups, and supervisors, an explanation of this
                  handbook and where it lives, and, if relevant, access to
                  compute or other support. Join our Discord by filling in the
                  onboarding form; the invite and the information above follow
                  from there. Supervisors are very welcome on the Discord as
                  well, but it is not required: email works just fine.
                </P>
                <p>
                  <OutLink href={ONBOARDING_FORM_URL}>
                    Fill in the onboarding form
                  </OutLink>
                </p>

                <Turn>What happens once you are matched or approved</Turn>
                <Bullets
                  items={[
                    "You are brought into contact with the relevant people. For supervised matching, a supervisor is formally assigned, we send an introduction email, and a project channel is created in the Discord. For joining an existing open project, you are officially added to the project and its Discord channel. For a new open project, we add it to our website, add you to the Discord, and promote the project so others can join.",
                    "In a kick-off meeting, you agree the time commitment (for example 5 to 10 hours per week, or near full-time), the meeting cadence, and the intended output. We encourage communication through the Discord; other channels can be agreed if preferred.",
                    "The project is registered internally and kept up to date as it progresses.",
                    "Where applicable, the Project Team sets up a GitHub repository under the SAIN organisation and gives project members access.",
                  ]}
                />
              </Chapter>

              {/* 4 */}
              <Chapter id="during-the-project" index={4} title="During the project">
                <Turn>Participants drive the work; supervisors steer it</Turn>
                <P>
                  The Project Hub is run by the Head of Projects, who works on
                  it full-time and is responsible for it end to end, together
                  with the Project Operations people in SAIN&rsquo;s chapters,
                  who know their local universities, companies, and
                  organisations best. Together they form the Project Team. On
                  open collaborations, the project lead runs the project and
                  coordinates the team. Each role owes the others something
                  concrete.
                </P>
                <Rail>
                  <div>
                    <SubTitle>Participants are expected to</SubTitle>
                    <div className="mt-3">
                      <Bullets
                        items={[
                          "Take primary responsibility for the day-to-day progress of the project.",
                          "Put in the hours they committed to, and tell their supervisor or project lead early if this changes.",
                          "Show up to supervisor meetings prepared, with a clear agenda, results, or specific questions.",
                          "Fill in the weekly check-in form.",
                          "Communicate early about blockers or personal constraints.",
                          <>
                            Follow SAIN&rsquo;s core principles (
                            <InLink href="#purpose">section 1</InLink>).
                          </>,
                        ]}
                      />
                    </div>
                  </div>
                  <div>
                    <SubTitle>Supervisors are expected to</SubTitle>
                    <div className="mt-3">
                      <Bullets
                        items={[
                          "Provide regular guidance and mentorship, and high-level project direction, stepping in where needed.",
                          "Help ensure the project is well-scoped and realistic.",
                          "Meet at the agreed frequency, usually weekly or biweekly, and show up prepared.",
                          "Give timely feedback on drafts and project directions.",
                          "Watch out for projects stuck in unproductive directions, and for participant wellbeing issues such as stress or burnout.",
                          "Raise concerns with the Head of Projects or the Project Team where appropriate.",
                        ]}
                      />
                    </div>
                  </div>
                  <div>
                    <SubTitle>The Project Team is responsible for</SubTitle>
                    <div className="mt-3">
                      <Bullets
                        items={[
                          "Maintaining up-to-date documentation, including this handbook.",
                          "Recruiting supervisors and matching them with participants.",
                          "Onboarding new participants and supervisors.",
                          "Keeping track of Project Hub projects and outputs.",
                          <>
                            Acting as the contact point, via <ProjectsMail /> or
                            the <OutLink href={DISCORD_URL}>Discord</OutLink>.
                          </>,
                        ]}
                      />
                    </div>
                  </div>
                </Rail>

                <Turn>The rhythm is weekly</Turn>
                <P>
                  During a project, the standard pattern is the following,
                  though your team or supervisor decides the details:
                </P>
                <Bullets
                  items={[
                    "Weekly or biweekly meetings: discuss recent progress and blockers, refine direction and scope, review experiments, results, and drafts.",
                    "Weekly or biweekly check-ins: a short form for participants and supervisors noting what was tried, progress, and next steps. It keeps everyone accountable and lets the Project Team see how projects are going, and step in where it can help.",
                    <>
                      Contact with the Project Team whenever necessary, via{" "}
                      <ProjectsMail /> or the Discord.
                    </>,
                  ]}
                />

                {/* The most-searched fact block on the page, flush after the
                    rhythm it belongs to so a skim-reader lands on it. */}
                <Callout label="Deadlines">
                  {/* The form is the phrase the sentence already uses, so the
                      sentence carries the link rather than trailing a label
                      that repeats it. */}
                  <div className="flex flex-col gap-3">
                    <p className="font-sans text-body text-navy/74">
                      Participants: fill in the{" "}
                      <OutLink href={WEEKLY_CHECKIN_URL}>
                        weekly check-in form
                      </OutLink>{" "}
                      every Sunday.
                    </p>
                    <p className="font-sans text-body text-navy/74">
                      Supervisors: fill in the{" "}
                      <OutLink href={BIWEEKLY_CHECKIN_URL}>
                        bi-weekly check-in form
                      </OutLink>{" "}
                      every second Sunday.
                    </p>
                  </div>
                </Callout>

                <Turn>Communicate early, precisely, and kindly</Turn>
                <Bullets
                  items={[
                    "Use the agreed channels, ideally the Discord, for project communication.",
                    <>
                      Keep <ProjectsMail /> in cc in email threads about Project
                      Hub projects.
                    </>,
                    "Respond within a reasonable timeframe: 2 to 3 working days for non-urgent matters.",
                    "Meetings are the supervised participant's responsibility: have a simple agenda, start with a brief update since last time (the weekly check-in helps you keep track), and end with concrete next steps.",
                    "Be explicit about availability: travel, family time, exam periods, busy periods at work.",
                    "Default to kind, precise, and honest communication.",
                  ]}
                />

                <Turn>Agree milestones up front</Turn>
                <P>
                  Each project should specify intermediate milestones. As an
                  example, not a fixed rule:
                </P>
                <Bullets
                  items={[
                    "Weeks 1 to 3: getting to know each other and the project, literature review.",
                    "Weeks 4 to 8: a first proof of concept, such as a first experiment or a first outline of the policy brief.",
                    "Weeks 8 to 10: internal discussion of the project, initial results, and what to improve.",
                    "Weeks 10 to 12: working on the weaknesses found, new results.",
                    "Weeks 12 to 14: writing up the final output and submitting it.",
                  ]}
                />

                <Turn>SAIN supports the work but does not pay for it</Turn>
                <P>This applies mostly to technical projects.</P>
                <Bullets
                  items={[
                    "SAIN does not provide stipends or salaries. Participation is voluntary and educational.",
                    "If funding for conference trips, workshop registrations, or travel is needed, we may be able to help within reason.",
                    "Once a project is specified, the Project Team strives to give it easy access to compute and other resources. How much compute SAIN can help with depends on the project and is agreed at the start.",
                    "We encourage computationally inexpensive projects wherever possible.",
                    "Where it helps the project, we introduce you to relevant people: researchers, people in industry, or policymakers who could use your work.",
                  ]}
                />

                <Turn>Integrity, AI tools, confidentiality, and dual-use</Turn>
                <Rail>
                  <div>
                    <SubTitle>Integrity</SubTitle>
                    <div className="mt-3">
                      <Bullets
                        items={[
                          "Cite sources properly, after making sure you know what they actually say, and avoid plagiarism.",
                          "Be honest about experimental results, limitations, and negative findings.",
                          "Keep enough documentation that others could roughly reproduce your work.",
                        ]}
                      />
                    </div>
                  </div>
                  <div>
                    <SubTitle>Responsible use of AI tools</SubTitle>
                    {/* The lead-in is a position, not a rule, so it reads as a
                        paragraph above the three rules, the way the dual-use
                        block below already does. */}
                    <p className="mt-3 font-sans text-body text-navy/74">
                      We are not against using AI tools such as LLMs for coding
                      or writing. Where a participant has considered it
                      carefully and it clearly helps, we encourage it. However:
                    </p>
                    <div className="mt-3">
                      <Bullets
                        items={[
                          "Always check outputs carefully. Do not uncritically trust generated content.",
                          "Avoid feeding sensitive or confidential data into tools unless you are confident they handle data responsibly.",
                          "Where relevant, disclose your use of AI tools.",
                        ]}
                      />
                    </div>
                  </div>
                  <div>
                    <SubTitle>Confidentiality and conflicts of interest</SubTitle>
                    <p className="mt-3 font-sans text-body text-navy/74">
                      Many participants and supervisors combine a project with a
                      job at a company, university, or government organisation.
                      To keep this clean for everyone:
                    </p>
                    <div className="mt-3">
                      <Bullets
                        items={[
                          "Never bring confidential information from your employer, or anyone else, into a project, and never ask others to. Projects should be based on information that can be shared publicly.",
                          "Check your employer's rules on side activities, intellectual property, and publications before you start. Civil servants, for instance, often need to report side activities, and people in industry are often bound by confidentiality and IP agreements.",
                          "Be transparent about potential conflicts of interest, for example when a project evaluates a product or policy of your own employer. Mention it to your supervisor and the Project Team, and in the final output where relevant.",
                          "Unless explicitly agreed otherwise with your employer, you take part in the Project Hub in a personal capacity.",
                        ]}
                      />
                    </div>
                  </div>
                  <div>
                    <SubTitle>Dual-use and infohazards</SubTitle>
                    <p className="mt-3 font-sans text-body text-navy/74">
                      Work on AI safety can have paradoxical effects: it can
                      make AI systems, the AI ecosystem, or people inside it
                      less safe. These effects can play out in complex ways that
                      are impossible to fully foresee. At minimum, spend some
                      time thinking about whether your work could significantly
                      increase capabilities or misuse risk if widely shared.
                    </p>
                    <div className="mt-3">
                      <Bullets
                        items={[
                          "If in doubt, discuss it with your supervisor and/or SAIN's Head of Projects before public dissemination.",
                          "Possible mitigations: redacting sensitive details, internal-only or restricted-access reports, or delaying publication until the risks are better understood.",
                        ]}
                      />
                    </div>
                  </div>
                </Rail>

                <Turn>Understanding matters more than publishing</Turn>
                <P>
                  The Project Hub should be a place where personal wellbeing is
                  taken seriously and support is there for anyone who needs it.
                  AI safety work, like any research, can be intellectually and
                  emotionally demanding, especially under the publish-or-perish
                  pressure that is unfortunately far too common. Combining a
                  project with a demanding job or study can add to that.
                </P>
                <Bullets
                  items={[
                    "Be honest about workload and stress levels with your supervisor, and supervisors with their participants.",
                    "Take regular breaks and keep boundaries between work and rest.",
                    "Remember that what matters most is gaining a better understanding of AI safety, not whether one publishes.",
                    "Speak to the SAIN team if conflicts or issues arise.",
                  ]}
                />
              </Chapter>

              {/* 5 */}
              <Chapter id="publishing" index={5} title="Finishing and publishing">
                <Turn>A project is complete when the question is answered</Turn>
                <Bullets
                  items={[
                    "The main question has been adequately addressed, including negative or null results, and the work has been published somewhere in a presentable form.",
                    "If relevant, infohazard and dual-use considerations have been treated appropriately.",
                  ]}
                />

                <Turn>Final deliverables can take several forms</Turn>
                <P>
                  Each project specifies one or more final deliverables. For
                  instance:
                </P>
                <Bullets
                  items={[
                    "A research paper at a conference, journal, or workshop.",
                    <>
                      A blog post on{" "}
                      <OutLink href={SUBSTACK_URL}>
                        SAIN&rsquo;s Substack
                      </OutLink>{" "}
                      and/or LessWrong.
                    </>,
                    "A policy brief or consultation response, ideally shared with the people who can act on it, such as a ministry, a regulator, or a parliamentary committee.",
                    "An evaluation, benchmark, dataset, or open-source tool.",
                    "A Dutch-language explainer or educational resource.",
                    "A Bachelor's or Master's thesis, ideally followed by a shorter public write-up.",
                  ]}
                />

                <Turn>Authorship reflects contribution</Turn>
                <Bullets
                  items={[
                    "Authorship should reflect substantial intellectual and implementation contributions.",
                    "Author order is handled internally within the project team.",
                    "SAIN and the Project Hub should be acknowledged in publications.",
                    "SAIN may promote your work as enabled by the Project Hub.",
                    "If you have an employer, check whether they need to approve a publication, and whether your affiliation should, or should not, be mentioned.",
                  ]}
                />

                <Turn>After the project</Turn>
                <Bullets
                  items={[
                    <>
                      Send the final output to <ProjectsMail /> as a PDF, with a
                      link if it is published elsewhere. We put the PDF on our
                      website, so it stays available even if other links break.
                    </>,
                    <>
                      Output and other relevant resources, such as data, code,
                      notes, and drafts, are stored in{" "}
                      <InLink href={PROJECT_ARCHIVE_URL}>
                        SAIN&rsquo;s project archive
                      </InLink>
                      .
                    </>,
                    "We share the result with the outside world, for instance in a post on SAIN's Substack and on social media, and update the Project Hub figures on our website. We always check the text with you before anything goes out.",
                    "Write a short note on what went well and what could have gone better, ideally shared with the SAIN community.",
                    "The project may be extended as a follow-up.",
                  ]}
                />
              </Chapter>

              {/* 6 */}
              <Chapter id="escalation" index={6} title="If something goes wrong">
                <P>
                  We hope you never need this section, but it matters that the
                  path is written down before anyone needs it.
                </P>

                <Turn>When to notify someone</Turn>
                <Bullets
                  items={[
                    "A supervisor or participant relationship breaks down, for example through persistent unavailability or unresolved conflict.",
                    "There is suspected misconduct, such as data falsification, harassment including sexual harassment, or plagiarism.",
                    "There are serious concerns about whether the project's direction is still aligned with AI safety.",
                    "Project scope, expectations, or time commitments have become misaligned.",
                  ]}
                />

                <Turn>The path runs from direct to leadership</Turn>
                <NumberedSteps
                  steps={[
                    "Participant and supervisor or project lead: try to resolve it directly first.",
                    "SAIN's Head of Projects, or anyone in the Project Team.",
                    "SAIN's Director, if the conflict involves the Head of Projects or the Project Team.",
                  ]}
                />

                {/* Full column width, directly after the path: the clause that
                    lets a reader ignore the path is not a footnote to it. */}
                <Callout label="You may skip levels">
                  <P>
                    If at any stage you feel unsafe, or face harassment you do
                    not feel comfortable raising with the person involved, skip
                    levels and contact SAIN leadership directly.
                  </P>
                </Callout>

                <Turn>Possible remedies and sanctions</Turn>
                <P>
                  Depending on the severity and nature of the issue, possible
                  actions include:
                </P>
                <Bullets
                  items={[
                    "Clarifying expectations and adjusting milestones.",
                    "Reassigning the supervisor or participant to another project.",
                    "Re-scoping or pausing the project.",
                    "Removal from the Project Hub, or from SAIN roles, in severe cases.",
                  ]}
                />

                <Callout label="Who to contact">
                  <P>
                    For anything in this handbook, applications, project
                    questions, concerns: <ProjectsMail />. It reaches the Head
                    of Projects and the Project Team.
                  </P>
                </Callout>
              </Chapter>

              {/* 7 */}
              <Chapter id="supervisors" index={7} title="If you supervise">
                <P>
                  Supervisor expectations are in{" "}
                  <InLink href="#during-the-project">section 4</InLink>. The
                  procedure for a supervised project is:
                </P>
                <OutlineList
                  items={[
                    "You sign up via the supervisor form, and we publish your agenda on our website.",
                    <>
                      After each round deadline, you receive the applicants who
                      picked you, talk to the ones you are interested in, and
                      let us know who you would like to work with (
                      <InLink href="#getting-started">section 3</InLink>).
                    </>,
                    <>
                      Together with your team, you prepare a short project plan
                      (a lighter version of the project proposal in{" "}
                      <InLink href="#getting-started">section 3</InLink> is
                      fine) and send it, with the list of people on the project,
                      to <ProjectsMail />. Include contact details, and each
                      person&rsquo;s Discord username and GitHub username where
                      applicable, as a minimum.
                    </>,
                    "If applicable, a repository is created in the SAIN GitHub organisation, and participants and supervisors get collaborator access.",
                    <>
                      Every Sunday, participants fill in the weekly check-in
                      form; every second Sunday, the supervisor fills in the
                      bi-weekly check-in form. Both forms are linked under
                      Deadlines in{" "}
                      <InLink href="#during-the-project">section 4</InLink>.
                    </>,
                    <>
                      Keep <ProjectsMail /> in cc on emails about the project,
                      so we know what is going on and can help when needed.
                    </>,
                  ]}
                />
                <P>
                  Interested in supervising through SAIN? You need substantial
                  experience in a relevant field: usually PhD level or above in
                  academia, or several years in a senior role in industry or
                  policy. You do not need to be an AI safety expert already, and
                  we welcome any discipline.
                </P>
                <div>
                  <a
                    href={SUPERVISOR_INTEREST_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-ink gap-2"
                  >
                    Become a supervisor
                    <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </Chapter>
            </div>
          </div>
        </div>
      </div>

      {/* The one inverse band on the page, because the document ends in a real
          action. Claim left, the two ways to act right. Nothing else: the
          handbook has already made the argument. */}
      <section aria-labelledby="handbook-close-heading" className="bg-navy">
        <div className="shell band-close grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h2
              id="handbook-close-heading"
              className="max-w-[620px] font-serif text-closing text-white"
            >
              The hub is open on a rolling basis.
            </h2>
            <p className="mt-4 max-w-[560px] font-sans text-body text-white/75">
              Sign up whenever you are ready. Someone from SAIN gets back to you
              within a working week.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <a
              href={RESEARCH_INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent gap-2"
            >
              Apply for a project
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> (opens the application form in a new tab)</span>
            </a>
            <a
              href={SUPERVISOR_INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-inverse gap-2"
            >
              Become a supervisor
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
