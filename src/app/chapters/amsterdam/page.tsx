import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { sainAmsTeam } from "@/data/sainAmsTeam";
import lumaPastEventsAmsterdamRaw from "@/data/lumaPastEventsAmsterdam.json";

const COMMUNITY_WHATSAPP_URL =
  "https://chat.whatsapp.com/H6yoVLat0KY5nSTKNjHgZV";
const NATIONAL_SUBSTACK_URL = "https://safeainetherlands.substack.com/";
const LUMA_CALENDAR_ID = "cal-fabX01E6rMTOg70";
const LUMA_USER_URL = "https://luma.com/user/SAIN_Amsterdam";

const EDU_AMS_EMAIL = "eduams@safeainetherlands.org";
const EVENTS_AMS_EMAIL = "eventsams@safeainetherlands.org";

const amsterdamContactByRole = [
  { label: "Formal collaboration", email: "infoams@safeainetherlands.org" },
  { label: "Community Manager", email: "cmams@safeainetherlands.org" },
  { label: "Education", email: "eduams@safeainetherlands.org" },
  { label: "Research", email: "research@safeainetherlands.org" },
  { label: "Events", email: "eventsams@safeainetherlands.org" },
  { label: "Substack", email: "substack@safeainetherlands.org" },
  { label: "Public Outreach", email: "prams@safeainetherlands.org" },
];

const discussionGroup = {
  name: "Technical AI Safety",
  description:
    "Exploring technical approaches to AI alignment, interpretability, and safety evaluation. Reading and discussing cutting-edge research.",
};

// Cutoff for "this academic year": Sep 1 of the most recent academic-year start.
function academicYearStart(now: Date): Date {
  const year = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
  return new Date(year, 8, 1); // Sep 1
}

function formatEventDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

const pastEvents = (lumaPastEventsAmsterdamRaw as Array<{ name: string; url: string; startAt: string }>)
  .map((ev) => ({ ...ev, startAt: new Date(ev.startAt) }))
  .filter((ev) => ev.startAt >= academicYearStart(new Date()))
  .sort((a, b) => b.startAt.getTime() - a.startAt.getTime());

export default function AmsterdamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-navy-950 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(/photos/cities/amsterdam-hero.jpg)` }}
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
              <span className="text-sm text-dutch-orange">Amsterdam</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-white max-w-3xl mb-6">
              SAIN Amsterdam
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              AI Safety in the Netherlands&apos; largest city. Building a diverse community across UvA, VU Amsterdam, and
              the broader Amsterdam tech ecosystem.
            </p>
          </FadeIn>
          <FadeIn delay={0.28}>
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={COMMUNITY_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Join our community
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* In-page overview */}
      <section className="border-b border-slate-200 bg-white">
        <div className="section-container py-5 md:py-6">
          <nav
            className="flex flex-wrap justify-center gap-3 md:gap-4 text-base md:text-lg font-semibold text-navy-900"
            aria-label="SAIN Amsterdam page sections"
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
              {/* Luma embed */}
              <div>
                <p className="text-sm text-slate-600 mb-3">
                  Upcoming events: see all on{" "}
                  <a
                    href={LUMA_USER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                  >
                    luma.com/user/SAIN_Amsterdam
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
                    title="SAIN Amsterdam Luma calendar"
                  />
                </div>
              </div>

              {/* Past events (this academic year) */}
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
                    <p className="text-sm text-slate-400 text-center">
                      Past events from this academic year will appear here.
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
                href={`mailto:${EVENTS_AMS_EMAIL}?subject=${encodeURIComponent("SAIN Amsterdam: Events")}`}
                className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
              >
                {EVENTS_AMS_EMAIL}
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
                What we run in Amsterdam
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
                  Technical AI Safety &amp; Frontier AI Governance
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <FadeIn className="lg:col-span-2">
                <div className="card p-8">
                  <p className="text-slate-600 leading-relaxed mb-6">
                    We facilitate 2 BlueDot courses:{" "}
                    <strong>&quot;Technical AI Safety&quot;</strong> and{" "}
                    <strong>&quot;Frontier AI Governance&quot;</strong>. We host
                    both courses on-site in Amsterdam. In the previous iteration, we engaged 70+
                    individuals from varying backgrounds, such as students,
                    PhDs, engineers, policymakers, and consultants.
                    Facilitators range from PhDs, risk-management
                    consultants, and an ELLIS assistant professor.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 rounded-xl p-5">
                      <h4 className="font-display font-semibold text-navy-900 mb-2">
                        Technical Course
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        Focuses on the technical aspects of AI Safety, with
                        extra sessions on mechanistic interpretability,
                        adversarial attacks, complex systems, and more.
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-5">
                      <h4 className="font-display font-semibold text-navy-900 mb-2">
                        Governance Course
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        Prioritizes governance and policy aspects, dedicating
                        time to case studies and real-world examples of
                        regulatory, legal, and societal challenges.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="card p-6">
                  <h3 className="font-display font-semibold text-navy-900 mb-4">
                    Course Details
                  </h3>
                  <dl className="space-y-4">
                    {[
                      { label: "Duration", value: "6 weeks" },
                      { label: "Workload", value: "2h readings + 2h discussion / week" },
                      { label: "Format", value: "On-site in Amsterdam" },
                      { label: "Certification", value: "Certificate upon completion" },
                      { label: "Selection", value: "Application-based" },
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
                      These courses are independently led by SAIN Amsterdam
                      and are not affiliated with UvA/VU.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <p className="mt-10 text-center text-sm text-slate-600 max-w-2xl mx-auto">
                Questions about the course?{" "}
                <a
                  href={`mailto:${EDU_AMS_EMAIL}?subject=${encodeURIComponent("SAIN Amsterdam: Education / course")}`}
                  className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                >
                  {EDU_AMS_EMAIL}
                </a>
              </p>
            </FadeIn>
          </div>

          {/* Discussion group */}
          <div className="mt-16 pt-16 border-t border-slate-100">
            <FadeIn>
              <div className="mb-12">
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  Discussion group
                </p>
                <h2 className="heading-lg text-navy-900 mb-4">
                  Weekly discussion group
                </h2>
                <p className="text-slate-500 max-w-2xl">
                  A focused group meeting weekly (~2 hours) to discuss, learn,
                  and collaborate on AI Safety topics, guided by experienced
                  mentors.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              <FadeIn>
                <div className="card p-6 h-full">
                  <h3 className="font-display font-semibold text-navy-900 mb-3">
                    {discussionGroup.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {discussionGroup.description}
                  </p>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <p className="mt-8 text-sm text-slate-600 max-w-2xl">
                Questions about the discussion group?{" "}
                <a
                  href={`mailto:${EDU_AMS_EMAIL}?subject=${encodeURIComponent("SAIN Amsterdam: Discussion group")}`}
                  className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                >
                  {EDU_AMS_EMAIL}
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
                  Current research projects
                </h2>
                <p className="text-slate-500 max-w-2xl leading-relaxed">
                  A snapshot of current work. Research at SAIN Amsterdam
                  isn&apos;t limited to the topics below. We&apos;re open to
                  projects across mechanistic interpretability, alignment,
                  evaluations, and AI governance. If you&apos;d like to
                  propose or join a project, see the{" "}
                  <Link
                    href="/research"
                    className="font-medium text-dutch-orange hover:text-dutch-orange-dark transition-colors"
                  >
                    Research Hub
                  </Link>
                  .
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="card p-5 max-w-2xl flex flex-col">
                <span className="text-xs font-medium text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-md self-start mb-3">
                  Ongoing
                </span>
                <h3 className="font-display font-semibold text-navy-900">
                  Investigating failure modes of Multi-Agent Debate
                </h3>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-padding bg-slate-50">
        <div className="section-container">
          <div className="max-w-3xl">
            <FadeIn>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  About
                </p>
                <h2 className="heading-lg text-navy-900 mb-6">
                  AI Safety at the heart of Dutch AI
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    SAIN Amsterdam operates in the Netherlands&apos; largest city. 
                    The chapter engages a
                    uniquely diverse community: from BSc students to
                    professionals at companies like Deloitte and Shell, and from
                    independent researchers to ELLIS assistant professors.
                  </p>
                  <p>
                    Formerly AISA (AI Safety Amsterdam), the chapter has rapidly
                    grown into one of SAIN&apos;s most active branches,
                    delivering courses to 70+ participants, presenting at the
                    AI020 Conference and TEDxUniversiteit van Amsterdam, and
                    building connections across the Amsterdam AI ecosystem.
                  </p>
                  <p>
                    The chapter is co-directed by Ana Paula Castillo Rodriguez
                    and Andreea Chivu, with a structured team covering
                    Research, Education, Events, and PR.
                  </p>
                </div>
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
              <h2 className="heading-lg text-navy-900 mb-3">
                SAIN Amsterdam Team
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sainAmsTeam.map((person, i) => (
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
            <h2 className="heading-lg text-white mb-4">
              Join &amp; contact
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
              Join our WhatsApp community to get involved. Subscribe to the
              national Substack for articles and updates across SAIN.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href={COMMUNITY_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Join community
              </a>
              <a
                href={NATIONAL_SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                National newsletter
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.28}>
            <p className="text-sm font-medium text-slate-400 mb-4 max-w-2xl mx-auto">
              Email the right team to contact SAIN Amsterdam
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {amsterdamContactByRole.map((row) => (
                <a
                  key={row.email}
                  href={`mailto:${row.email}?subject=${encodeURIComponent(`SAIN Amsterdam: ${row.label}`)}`}
                  className="inline-flex flex-col items-start rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-left text-sm text-white hover:bg-white/10 hover:border-white/35 transition-colors min-w-[10.5rem]"
                  aria-label={`Email ${row.label} to contact SAIN Amsterdam`}
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
