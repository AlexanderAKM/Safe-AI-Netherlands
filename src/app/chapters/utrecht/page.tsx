import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import lumaPastEventsUtrechtRaw from "@/data/lumaPastEventsUtrecht.json";

const leadership = [
  { name: "Riccardo Campanella", title: "Director" },
  { name: "Betül Selvi", title: "Education Lead" },
  { name: "Luca 'Dug' Dughera", title: "Event Lead" },
  { name: "Dimitra Tsolka", title: "Public Relations Lead" },
  { name: "Cem Kay", title: "Research Operations" },
  { name: "Elena Clacova", title: "Social Media Specialist" },
  { name: "Maria Mouratidi", title: "Researcher" },
  { name: "Max Schaffelder", title: "Advisor" },
  { name: "Thijmen van der Meijden", title: "Facilitator" },
] as const;

const highlights = [
  "3 iterations of the AI Safety Fundamentals program delivered",
  "100+ participants across three editions of the program",
  "Funded by BERI with mentorship from Pathfinder",
  "Guest speaker events including researchers from Anthropic (60+ attendees)",
  "Active local community of 240+ members",
  "LinkedIn engagement rate of ~9% (well above 2% benchmark)",
  "Growing team with focus on doubling to 15 members across 4 teams",
];

const discussionGroups = [
  {
    name: "Technical AI Safety",
    description:
      "Building learning pathways in Technical AI Safety topics including Mechanistic Interpretability. Reading and discussing current research with a focus on practical understanding.",
  },
  {
    name: "AI Governance & Policy",
    description:
      "Exploring regulatory frameworks, risk management approaches, and governance structures for AI systems. Connecting academic insights with real-world policy challenges.",
  },
];

const NATIONAL_SUBSTACK_URL = "https://safeainetherlands.substack.com/";

/** Placeholder until a chapter WhatsApp or Discord is published */
const COMMUNITY_UTRECHT_URL = "/get-involved";

const EDU_UTR_EMAIL = "eduutr@safeainetherlands.org";
const EVENTS_UTR_EMAIL = "eventsutr@safeainetherlands.org";
const INFO_UTR_EMAIL = "infoutr@safeainetherlands.org";

/** SAIN Utrecht Luma calendar — from embed / page HTML (`cal-…`). */
const LUMA_CALENDAR_ID = "cal-SEgERCbTEKinGaJ";
/** Public link for the featured calendar / intro session (short lu.ma URL). */
const LUMA_PUBLIC_URL = "https://lu.ma/bsv03bzb";

/** Distinct labels; several routes currently share the chapter inbox */
const utrechtContactByRole = [
  { label: "Formal collaboration", email: INFO_UTR_EMAIL },
  { label: "Community Manager", email: "cmutr@safeainetherlands.org" },
  { label: "Education", email: EDU_UTR_EMAIL },
  { label: "Research", email: "research@safeainetherlands.org" },
  { label: "Events", email: EVENTS_UTR_EMAIL },
  { label: "Substack", email: "substack@safeainetherlands.org" },
  { label: "Public Outreach", email: "prutr@safeainetherlands.org" },
];

function academicYearStart(now: Date): Date {
  const year = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
  return new Date(year, 8, 1);
}

function formatEventDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

const pastEvents = (
  lumaPastEventsUtrechtRaw as Array<{
    name: string;
    url: string;
    startAt: string;
  }>
)
  .map((ev) => ({ ...ev, startAt: new Date(ev.startAt) }))
  .filter((ev) => ev.startAt >= academicYearStart(new Date()))
  .sort((a, b) => b.startAt.getTime() - a.startAt.getTime());

export default function UtrechtPage() {
  return (
    <>
      {/* Hero — navy + photo + gradient (same structure as Amsterdam / Groningen) */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-navy-950 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(/photos/cities/utrecht-hero.jpg)`,
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/50" />

        <div className="section-container relative z-10">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                SAIN
              </Link>
              <span className="text-slate-500">/</span>
              <span className="text-sm text-dutch-orange">Utrecht</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-white max-w-3xl mb-6">SAIN Utrecht</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              AI Safety in the heart of the Netherlands. Building a
              multidisciplinary community at Utrecht University and beyond,
              with international backing and a growing research focus.
            </p>
          </FadeIn>
          <FadeIn delay={0.28}>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href={COMMUNITY_UTRECHT_URL} className="btn-primary">
                Get involved
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* In-page overview */}
      <section className="border-b border-slate-200 bg-white">
        <div className="section-container py-5 md:py-6">
          <nav
            className="flex flex-wrap justify-center gap-3 md:gap-4 text-base md:text-lg font-semibold text-navy-900"
            aria-label="SAIN Utrecht page sections"
          >
            <a
              href="#events"
              className="rounded-full border-2 border-slate-200 px-6 py-3 md:px-8 md:py-3.5 hover:border-dutch-orange hover:text-dutch-orange transition-colors"
            >
              Events
            </a>
            <a
              href="#programs"
              className="rounded-full border-2 border-slate-200 px-6 py-3 md:px-8 md:py-3.5 hover:border-dutch-orange hover:text-dutch-orange transition-colors"
            >
              Programs
            </a>
            <a
              href="#about"
              className="rounded-full border-2 border-slate-200 px-6 py-3 md:px-8 md:py-3.5 hover:border-dutch-orange hover:text-dutch-orange transition-colors"
            >
              About
            </a>
            <a
              href="#join"
              className="rounded-full border-2 border-slate-200 px-6 py-3 md:px-8 md:py-3.5 hover:border-dutch-orange hover:text-dutch-orange transition-colors"
            >
              Join &amp; contact
            </a>
          </nav>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="section-padding bg-slate-50">
        <div className="section-container">
          <FadeIn>
            <div className="mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Events
              </p>
              <h2 className="heading-lg text-navy-900">
                Past &amp; upcoming events
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <div>
                <p className="text-sm text-slate-600 mb-3">
                  Upcoming events — see details on{" "}
                  <a
                    href={LUMA_PUBLIC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                  >
                    lu.ma/bsv03bzb
                  </a>
                  .
                </p>
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-white">
                  <iframe
                    src={`https://luma.com/embed/calendar/${LUMA_CALENDAR_ID}/events?lt=light`}
                    width="100%"
                    height="450"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex={0}
                    title="SAIN Utrecht Luma calendar"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-3">
                  Past events this academic year
                </p>
                {pastEvents.length > 0 ? (
                  <div className="rounded-xl border border-slate-200 bg-white h-[450px] overflow-y-auto">
                    <ul className="divide-y divide-slate-100">
                      {pastEvents.map((event, i) => (
                        <li key={`${event.url}-${i}`}>
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors group"
                          >
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 w-20 flex-shrink-0">
                              {formatEventDate(event.startAt)}
                            </span>
                            <span className="font-display font-medium text-navy-900 group-hover:text-dutch-orange transition-colors text-sm md:text-base flex-1">
                              {event.name}
                            </span>
                            <svg
                              className="w-4 h-4 text-slate-300 group-hover:text-dutch-orange transition-colors flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-white h-[450px] flex items-center justify-center p-6">
                    <p className="text-sm text-slate-400 text-center max-w-md">
                      No past events in this list yet for the current academic
                      year. Add entries in the chapter JSON snapshot or run the
                      Utrecht Luma fetch script to sync from Luma.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-8 text-sm text-slate-600">
              Events:{" "}
              <a
                href={`mailto:${EVENTS_UTR_EMAIL}?subject=${encodeURIComponent("SAIN Utrecht — Events")}`}
                className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
              >
                {EVENTS_UTR_EMAIL}
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Programs
              </p>
              <h2 className="heading-lg text-navy-900">
                What we run in Utrecht
              </h2>
            </div>
          </FadeIn>

          {/* Courses */}
          <div className="mt-16 pt-16 border-t border-slate-100 first:mt-0 first:border-t-0 first:pt-0">
            <FadeIn>
              <div className="mb-12">
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  Courses
                </p>
                <h2 className="heading-lg text-navy-900">
                  AI Safety Fundamentals
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <FadeIn className="lg:col-span-2">
                <div className="card p-8">
                  <p className="text-slate-600 leading-relaxed mb-6">
                    SAIN Utrecht&apos;s <strong className="text-navy-900">AI Safety Fundamentals</strong>{" "}
                    series has run across three iterations, reaching BSc/MSc
                    students, researchers, engineers, and public-sector
                    participants — more than 100 across three editions. Each
                    week spotlights a different theme so newcomers can drop in
                    and keep coming back for the next session.
                  </p>

                  <h3 className="font-display font-semibold text-navy-900 text-sm uppercase tracking-wider mb-3 pt-6 border-t border-slate-100">
                    Course outline (weekly themes)
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-600 leading-snug">
                    <li className="flex gap-2">
                      <span className="text-dutch-orange font-semibold shrink-0">1.</span>
                      <span>
                        <strong className="text-navy-900">Introduction</strong> — High-level overview of AI safety, why it matters now, capabilities &amp; diffusion, types of risks and solution families (technical &amp; governance).
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-dutch-orange font-semibold shrink-0">2.</span>
                      <span>
                        <strong className="text-navy-900">Risks &amp; incidents</strong> — Social harms, frontier risks, misuse, loss of control; real-world cases and how research lags deployment.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-dutch-orange font-semibold shrink-0">3.</span>
                      <span>
                        <strong className="text-navy-900">Technical AI safety</strong> — Robustness &amp; jailbreaking, scalable oversight, alignment, evaluations, mechanistic interpretability.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-dutch-orange font-semibold shrink-0">4.</span>
                      <span>
                        <strong className="text-navy-900">Regulation &amp; governance</strong> — EU AI Act, accountability, lifecycle governance, evidence &amp; audits (e.g. NIST GOVERN–MAP–MEASURE–MANAGE), generative AI / GPAI obligations.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-dutch-orange font-semibold shrink-0">5.</span>
                      <span>
                        <strong className="text-navy-900">Why safety is hard</strong> — Industry incentives, funding gaps, expert disagreement, slow regulation vs. fast labs, geopolitical race dynamics.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-dutch-orange font-semibold shrink-0">6.</span>
                      <span>
                        <strong className="text-navy-900">Safety in practice</strong> — Red-teaming, checklists, tooling, pathways (fellowships, thesis topics, community) and bridge to hackathons &amp; deeper study.
                      </span>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="card p-6">
                  <h3 className="font-display font-semibold text-navy-900 mb-4">
                    Course details
                  </h3>
                  <dl className="space-y-4">
                    {[
                      { label: "Duration", value: "6 weeks" },
                      {
                        label: "Sessions",
                        value: "~60 minutes each",
                      },
                      {
                        label: "Modular",
                        value: "Join any week",
                      },
                      {
                        label: "Format",
                        value: "Interactive: short input and Q&A",
                      },
                      {
                        label: "Venue",
                        value: "Utrecht University",
                      },
                      {
                        label: "Audience",
                        value: "Students, researchers, professionals",
                      },
                    ].map((item) => (
                      <div key={item.label}>
                        <dt className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-0.5">
                          {item.label}
                        </dt>
                        <dd className="text-sm font-medium text-navy-900">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400 italic">
                      Topics and timings may shift by cohort — email us for the
                      latest schedule.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Technical AI Safety (ARENA) */}
            <div className="mt-16 pt-16 border-t border-slate-100">
              <FadeIn>
                <div className="mb-12">
                  <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                    Courses
                  </p>
                  <h2 className="heading-lg text-navy-900">
                    Technical AI Safety
                  </h2>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <FadeIn className="lg:col-span-2">
                  <div className="card p-8">
                    <p className="text-slate-600 leading-relaxed mb-8">
                      SAIN Utrecht is the{" "}
                      <strong className="text-navy-900">
                        first SAIN chapter
                      </strong>{" "}
                      teaching from{" "}
                      <a
                        href="https://www.arena.education/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                      >
                        ARENA
                      </a>{" "}
                      materials — bringing that curriculum to our community so
                      participants get a hands-on, research-aligned technical
                      track alongside our broader programming.
                    </p>

                    <h3 className="font-display font-semibold text-navy-900 mb-3 pt-6 border-t border-slate-100">
                      1. Reinforcement learning &amp; LLMs
                    </h3>
                    <div className="space-y-5 text-sm text-slate-600 leading-relaxed">
                      <div>
                        <p className="font-semibold text-navy-900 mb-1.5">
                          Proximal Policy Optimisation (PPO)
                        </p>
                        <p>
                          PPO improves sample efficiency, stability, and
                          robustness for deep RL — balancing exploration and
                          exploitation across environments from robotics to
                          games. You&apos;ll implement an agent on{" "}
                          <strong className="text-navy-900">CartPole</strong>,
                          train toward strong performance quickly, and experiment
                          with reward shaping and extensions (e.g. Atari,{" "}
                          <abbr title="MuJoCo physics simulator">MuJoCo</abbr>
                          ).
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-navy-900 mb-1.5">
                          RL from Human Feedback (RLHF)
                        </p>
                        <p>
                          RLHF trains models from rewards and human preferences,
                          typically using{" "}
                          <strong className="text-navy-900">PPO</strong> as the
                          optimisation backbone. The track walks through a full
                          RLHF implementation building on the PPO work — moving
                          from classic RL setups to{" "}
                          <strong className="text-navy-900">
                            autoregressive language models
                          </strong>{" "}
                          with{" "}
                          <strong className="text-navy-900">
                            TransformerLens
                          </strong>
                          , covering objectives, rollout and learning phases, and
                          an end-to-end{" "}
                          <strong className="text-navy-900">
                            RLHFTrainer
                          </strong>{" "}
                          style workflow.
                        </p>
                      </div>
                    </div>

                    <h3 className="font-display font-semibold text-navy-900 mb-3 pt-8 mt-2 border-t border-slate-100">
                      2. Mechanistic interpretability
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      Grounding in transformers and mech interp, then branches
                      through probing, circuits, and toy models — mirroring
                      ARENA&apos;s syllabus (exercises mix notebooks,{" "}
                      <strong className="text-navy-900">TransformerLens</strong>
                      ,{" "}
                      <strong className="text-navy-900">nnsight</strong>,{" "}
                      <strong className="text-navy-900">SAELens</strong>,{" "}
                      <strong className="text-navy-900">Neuronpedia</strong>,
                      and more).
                    </p>
                    <p className="font-semibold text-navy-900 text-sm mb-2">
                      Syllabus map (high level)
                    </p>
                    <ul className="list-disc pl-4 space-y-1.5 text-sm text-slate-600 leading-relaxed">
                      <li>
                        Foundations: transformers from scratch, intro to mech
                        interp
                      </li>
                      <li>
                        <strong className="text-navy-900">
                          Probing &amp; representations
                        </strong>{" "}
                        — linear probes; function vectors &amp; model steering;
                        interpretability with SAEs (scale &amp; prerequisites on
                        superposition); activation oracles
                      </li>
                      <li>
                        <strong className="text-navy-900">
                          Circuits in LLMs
                        </strong>{" "}
                        — indirect object identification; SAE-based circuits &amp;
                        transcoders
                      </li>
                      <li>
                        <strong className="text-navy-900">Toy models</strong>{" "}
                        — balanced brackets; grokking &amp; modular arithmetic;
                        OthelloGPT; superposition &amp; SAEs
                      </li>
                    </ul>
                    <p className="text-sm text-slate-500 mt-4 pt-4 border-t border-slate-100">
                      ARENA&apos;s interpretability modules are deep; cohorts pick
                      subsets and pathways rather than every exercise in every
                      branch.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.15}>
                  <div className="card p-6">
                    <h3 className="font-display font-semibold text-navy-900 mb-4">
                      Course details
                    </h3>
                    <dl className="space-y-4">
                      {[
                        { label: "Duration", value: "Multi-week modules" },
                        {
                          label: "Sessions",
                          value: "~60 minutes each",
                        },
                        {
                          label: "Format",
                          value: "Hands-on exercises & guided discussion",
                        },
                        {
                          label: "Venue",
                          value: "Utrecht University",
                        },
                        {
                          label: "Prerequisites",
                          value: "Python; linear algebra & probability",
                        },
                        {
                          label: "Materials",
                          value: "Based on ARENA open curriculum",
                        },
                      ].map((item) => (
                        <div key={item.label}>
                          <dt className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-0.5">
                            {item.label}
                          </dt>
                          <dd className="text-sm font-medium text-navy-900">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <p className="text-xs text-slate-400 italic">
                        Technical cohort logistics may differ from fundamentals —
                        email for the current plan.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>

            <FadeIn delay={0.2}>
              <p className="mt-10 text-center text-xs text-slate-400 italic max-w-2xl mx-auto mb-6">
                These courses are independently led by SAIN Utrecht and are not
                affiliated with UU.
              </p>
              <p className="text-center text-sm text-slate-600 max-w-2xl mx-auto">
                Questions about the course?{" "}
                <a
                  href={`mailto:${EDU_UTR_EMAIL}?subject=${encodeURIComponent("SAIN Utrecht — Education / course")}`}
                  className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                >
                  {EDU_UTR_EMAIL}
                </a>
              </p>
            </FadeIn>
          </div>

          {/* Discussion groups */}
          <div className="mt-16 pt-16 border-t border-slate-100">
            <FadeIn>
              <div className="mb-12">
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  Discussion groups
                </p>
                <h2 className="heading-lg text-navy-900 mb-4">
                  Weekly research &amp; discussion groups
                </h2>
                <p className="text-slate-500 max-w-2xl">
                  Focused groups meeting weekly to discuss and learn about
                  specific AI Safety topics. Connecting students, researchers,
                  and practitioners for deeper engagement.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              {discussionGroups.map((group, i) => (
                <FadeIn key={group.name} delay={i * 0.05}>
                  <div className="card p-6 h-full">
                    <h3 className="font-display font-semibold text-navy-900 mb-3">
                      {group.name}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {group.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.2}>
              <p className="mt-8 text-sm text-slate-600 max-w-2xl">
                Questions about discussion groups?{" "}
                <a
                  href={`mailto:${EDU_UTR_EMAIL}?subject=${encodeURIComponent("SAIN Utrecht — Discussion groups")}`}
                  className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                >
                  {EDU_UTR_EMAIL}
                </a>
              </p>
            </FadeIn>
          </div>

          {/* Research */}
          <div className="mt-16 pt-16 border-t border-slate-100">
            <FadeIn>
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  Research
                </p>
                <h2 className="heading-lg text-navy-900 mb-4">
                  Current research directions
                </h2>
                <p className="text-slate-500 max-w-2xl leading-relaxed">
                  SAIN Utrecht is expanding from education toward a
                  research-enabled hub — including early-stage work on red-teaming
                  LLMs, safety evaluation, interpretability, and agent behavior.
                  Chapter research isn&apos;t limited to these themes; connect via
                  the{" "}
                  <Link
                    href="/research"
                    className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                  >
                    Research Hub
                  </Link>{" "}
                  for collaboration across SAIN.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-slate-600 mb-6 max-w-2xl leading-relaxed">
                Members of SAIN Utrecht contributed to this research.
              </p>
              <div className="card p-6 max-w-3xl flex flex-col">
                <span className="text-xs font-medium text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md self-start mb-3">
                  Publication
                </span>
                <h3 className="font-display font-semibold text-navy-900 text-lg md:text-xl leading-snug">
                  <a
                    href="https://arxiv.org/abs/2507.17951"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-dutch-orange transition-colors"
                  >
                    Are LLM Belief Updates Consistent with Bayes&apos; Theorem?
                  </a>
                </h3>
                <p className="text-xs text-slate-400 mt-2">
                  <a
                    href="https://arxiv.org/abs/2507.17951"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-dutch-orange hover:text-dutch-orange-dark"
                  >
                    arXiv:2507.17951
                  </a>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-padding bg-slate-50">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  About
                </p>
                <h2 className="heading-lg text-navy-900 mb-6">
                  Where AI safety meets diverse expertise
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    SAIN Utrecht brings AI Safety to the heart of the
                    Netherlands, engaging a multidisciplinary community of
                    students, researchers, and professionals at Utrecht
                    University and beyond.
                  </p>
                  <p>
                    The chapter is the first AI safety initiative in the
                    Netherlands with both international funding (from BERI) and
                    mentorship integration (from Pathfinder). This unique
                    position enables Utrecht to bridge academic research with
                    practical AI safety work.
                  </p>
                  <p>
                    Under Riccardo Campanella&apos;s leadership, SAIN Utrecht is
                    transitioning from an education-first initiative to a
                    research-enabled hub, with early-stage work on red-teaming
                    LLMs, safety evaluation, interpretability, and agent behavior.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <h3 className="font-display font-semibold text-navy-900 mb-4">
                  Chapter highlights
                </h3>
                <ul className="space-y-3">
                  {highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-600"
                    >
                      <svg
                        className="w-4 h-4 text-dutch-orange flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <h2 className="heading-lg text-navy-900 mb-3">SAIN Utrecht Team</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {leadership.map((person, i) => (
              <FadeIn key={person.name} delay={Math.min(i * 0.03, 0.35)}>
                <div className="card p-4 h-full">
                  <h3 className="font-display font-semibold text-base text-navy-900">
                    {person.name}
                  </h3>
                  <p className="text-sm font-medium text-dutch-orange mt-1.5 leading-snug">
                    {person.title}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Join & contact */}
      <section id="join" className="section-padding bg-navy-950">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="heading-lg text-white mb-4">Join &amp; contact</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
              Reach out to the chapter, subscribe to the national Substack for
              updates across SAIN, or explore other ways to get involved.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href={`mailto:${INFO_UTR_EMAIL}?subject=${encodeURIComponent("SAIN Utrecht — Hello")}`}
                className="btn-primary"
              >
                Email the chapter
              </a>
              <a
                href={NATIONAL_SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                National newsletter
              </a>
              <Link href="/get-involved" className="btn-secondary">
                More ways to get involved
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.28}>
            <p className="text-sm font-medium text-slate-400 mb-4 max-w-2xl mx-auto">
              Email the right team to contact SAIN Utrecht
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {utrechtContactByRole.map((row) => (
                <a
                  key={row.label}
                  href={`mailto:${row.email}?subject=${encodeURIComponent(`SAIN Utrecht — ${row.label}`)}`}
                  className="inline-flex flex-col items-start rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-left text-sm text-white hover:bg-white/10 hover:border-white/35 transition-colors min-w-[10.5rem]"
                  aria-label={`Email ${row.label} to contact SAIN Utrecht`}
                >
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </span>
                  <span className="font-display font-semibold text-white">
                    {row.label}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5 break-all">
                    {row.email}
                  </span>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}