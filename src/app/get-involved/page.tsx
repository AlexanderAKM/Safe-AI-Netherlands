"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const ways = [
  {
    title: "Join a Chapter",
    description:
      "Connect with your local SAIN community. Participate in courses, discussion groups, events, and research — all while building your AI Safety network.",
    cta: "Find your chapter",
    href: "#chapters-list",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
  {
    title: "Research with Us",
    description:
      "Join the SAIN Research Hub as a researcher or supervisor. Work on meaningful AI Safety projects with structured mentorship and access to compute resources.",
    cta: "Explore the Research Hub",
    href: "/research",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "Write for Our Substack",
    description:
      "Share your perspective on AI Safety with a national audience. Whether a one-time guest post or ongoing contributions, we welcome diverse voices.",
    cta: "Visit our Substack",
    href: "https://aisig.substack.com/",
    external: true,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    ),
  },
  {
    title: "Donate",
    description:
      "Your financial support enables us to run courses, host events, provide research compute, and build the infrastructure that powers AI Safety work across the Netherlands.",
    cta: "Support SAIN",
    href: "#donate",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dutch-orange/30 to-transparent" />

        <div className="section-container relative z-10">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-4">
              Get Involved
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-white max-w-3xl mb-6">
              There&apos;s a place for you in SAIN
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
              Whether you&apos;re a researcher, student, policymaker, or
              concerned citizen — AI Safety needs diverse perspectives. Join us
              in building a safer future with AI.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Contribute
              </p>
              <h2 className="heading-lg text-navy-900">
                Ways to get involved
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ways.map((way, i) => (
              <FadeIn key={way.title} delay={i * 0.1}>
                <div className="card p-8 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-dutch-orange/10 text-dutch-orange flex items-center justify-center mb-5">
                    {way.icon}
                  </div>
                  <h3 className="font-display font-semibold text-xl text-navy-900 mb-3">
                    {way.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed flex-1 mb-5">
                    {way.description}
                  </p>
                  {"external" in way ? (
                    <a
                      href={way.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-dutch-orange hover:text-dutch-orange-dark transition-colors flex items-center gap-1"
                    >
                      {way.cta}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={way.href}
                      className="text-sm font-semibold text-dutch-orange hover:text-dutch-orange-dark transition-colors flex items-center gap-1"
                    >
                      {way.cta}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters List */}
      <section id="chapters-list" className="section-padding bg-slate-50">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Find Your Chapter
              </p>
              <h2 className="heading-lg text-navy-900">
                SAIN chapters in the Netherlands
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { city: "Groningen", active: true, href: "/chapters/groningen" },
              { city: "Amsterdam", active: false, href: "/chapters/amsterdam" },
              { city: "Delft", active: false, href: "/chapters/delft" },
              { city: "Utrecht", active: false, href: "/chapters/utrecht" },
            ].map((ch, i) => (
              <FadeIn key={ch.city} delay={i * 0.1}>
                <Link href={ch.href} className="card p-6 text-center group">
                  <h3 className="font-display font-semibold text-lg text-navy-900 group-hover:text-dutch-orange transition-colors">
                    {ch.city}
                  </h3>
                  <p
                    className={`text-xs font-medium mt-1 ${
                      ch.active ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {ch.active ? "Active" : "Coming Soon"}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Start a Chapter */}
      <section id="start-chapter" className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  Start a Chapter
                </p>
                <h2 className="heading-lg text-navy-900 mb-4">
                  Bring SAIN to your city
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto">
                  Starting a local SAIN chapter is one of the best ways to
                  multiply your impact. We provide everything you need to get
                  started.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h3 className="font-display font-semibold text-lg text-navy-900 mb-6">
                  What SAIN provides to new chapters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    "The SAIN brand and national recognition",
                    "Operational playbooks and handbooks",
                    "Course curriculum and facilitation guides",
                    "Google Workspace and digital infrastructure",
                    "One-on-one mentorship from experienced organizers",
                    "Outreach templates and media support",
                    "No need for separate legal entity registration",
                    "Connection to the national network",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-dutch-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>

                <h3 className="font-display font-semibold text-lg text-navy-900 mb-4">
                  How to get started
                </h3>
                <ol className="space-y-3 mb-8">
                  {[
                    "Reach out to us expressing your interest in starting a chapter",
                    "Get paired with a mentor to guide you through the founding process",
                    "Set up your local communication channels (WhatsApp/Signal/Slack)",
                    "Launch your chapter page on the SAIN website",
                    "Do initial outreach in your city",
                    "Run your first meetup or event",
                    "Consider running the AI Safety, Ethics, and Society course",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="w-6 h-6 rounded-full bg-dutch-orange/10 text-dutch-orange text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>

                <div className="text-center">
                  <a
                    href="mailto:info@sain.org?subject=Starting a SAIN chapter"
                    className="btn-primary"
                  >
                    Express Interest
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Donate */}
      <section id="donate" className="section-padding bg-navy-950">
        <div className="section-container text-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-4">
              Support Our Work
            </p>
            <h2 className="heading-lg text-white mb-4">
              Help us build the Netherlands&apos; AI Safety ecosystem
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              Your donation directly funds courses, research compute, events,
              and the infrastructure that powers AI Safety work across the
              Netherlands. A lot of money can be effectively used in a national
              initiative.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:donate@sain.org?subject=Donation to SAIN"
                className="btn-primary text-base px-8 py-3.5"
              >
                Donate Now
              </a>
              <a
                href="mailto:info@sain.org?subject=Funding SAIN"
                className="btn-secondary text-base px-8 py-3.5"
              >
                Discuss Funding
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-xl mx-auto text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Stay Updated
              </p>
              <h2 className="heading-md text-navy-900 mb-4">
                Subscribe to our newsletter
              </h2>
              <p className="text-slate-500 mb-6">
                Weekly articles on AI Safety from a range of perspectives.
                Research updates, event announcements, and more.
              </p>
              <a
                href="https://aisig.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Subscribe on Substack
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
