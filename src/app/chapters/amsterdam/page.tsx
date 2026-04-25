"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const leadership = [
  {
    name: "Ana Paula Castillo Rodriguez",
    role: "Co-Director",
    description:
      "Leading SAIN Amsterdam alongside Andreea. Building university partnerships at UvA and VU Amsterdam.",
    linkedin: "https://www.linkedin.com/in/ana-paula-casrod/",
  },
  {
    name: "Andreea Chivu",
    role: "Co-Director",
    description:
      "Co-leading SAIN Amsterdam. Responsible for building the chapter's education, events, and community programming.",
    linkedin: "https://www.linkedin.com/in/andreea-chivu-0924911a6/",
  },
];

const highlights = [
  "70+ participants in current course cohort across Technical and Governance tracks",
  "Supported by ELLIS and connected with AISO Amsterdam",
  "Partnerships with UvA, VU Amsterdam, and the broader EA Netherlands network",
  "Presented at AI020 Conference as the only AI Safety organisation present",
  "TEDx talk at Universiteit van Amsterdam",
  "Active local community of 300+ members",
  "15 team members across 4 teams (Research, Education, Events, PR)",
];

const discussionGroups = [
  {
    name: "Technical AI Safety",
    description:
      "Exploring technical approaches to AI alignment, interpretability, and safety evaluation. Reading and discussing cutting-edge research.",
  },
  {
    name: "AI Governance",
    description:
      "Discussing policy frameworks, regulatory approaches, and governance mechanisms for AI systems. Connecting with policymakers and practitioners.",
  },
];

export default function AmsterdamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #021c4d 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="section-container relative z-10">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/"
                className="text-sm text-slate-400 hover:text-navy-900 transition-colors"
              >
                SAIN
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-sm text-dutch-orange">Amsterdam</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-navy-900 max-w-3xl mb-6">
              SAIN Amsterdam
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-8">
              AI Safety in the Netherlands&apos; largest city and AI research
              hub. Building a diverse community across UvA, VU Amsterdam, and
              the broader Amsterdam tech ecosystem.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Active Chapter
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div>70+ course participants</div>
              <div className="w-px h-4 bg-slate-200" />
              <div>300+ community members</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
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
                    SAIN Amsterdam operates in the Netherlands&apos; largest city
                    and most dense AI research hub. The chapter engages a
                    uniquely diverse community — from BSc students to
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
                    and Andreea Chivu, with a structured team of 15 people
                    covering Research, Education, Events, and PR.
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

      {/* Courses */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <FadeIn>
            <div className="mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Education
              </p>
              <h2 className="heading-lg text-navy-900">
                AI Safety, Ethics, and Society
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="card p-8 max-w-3xl">
              <p className="text-slate-600 leading-relaxed mb-6">
                SAIN Amsterdam runs the Technical AI Safety and AI Governance
                courses, currently engaging 70+ individuals from varying
                backgrounds — students, PhDs, engineers, policymakers, and
                consultants. Facilitators include multiple PhDs,
                risk-management consultants, and an ELLIS assistant professor.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-xl p-5">
                  <h4 className="font-display font-semibold text-navy-900 mb-2">
                    Technical Track
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Deep dives into technical AI safety: mechanistic
                    interpretability, adversarial attacks, evaluation, and
                    alignment research.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5">
                  <h4 className="font-display font-semibold text-navy-900 mb-2">
                    Governance Track
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Policy frameworks, regulatory approaches, and governance
                    mechanisms — with case studies from the EU AI Act and
                    real-world examples.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Discussion Groups */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Discussion Groups
              </p>
              <h2 className="heading-lg text-navy-900 mb-4">
                Weekly research &amp; discussion groups
              </h2>
              <p className="text-slate-500 max-w-2xl">
                Focused groups meeting weekly to discuss and learn about
                specific AI Safety topics, guided by experienced mentors and
                researchers.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {discussionGroups.map((group, i) => (
              <FadeIn key={group.name} delay={i * 0.1}>
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
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <FadeIn>
            <div className="mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Leadership
              </p>
              <h2 className="heading-lg text-navy-900">
                Chapter team
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            {leadership.map((person, i) => (
              <FadeIn key={person.name} delay={i * 0.1}>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-dutch-orange to-dutch-orange-light flex items-center justify-center text-white text-lg font-bold mb-4">
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="font-display font-semibold text-navy-900 group-hover:text-dutch-orange transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-sm font-medium text-dutch-orange mb-2">
                    {person.role}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {person.description}
                  </p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-950">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="heading-lg text-white mb-4">
              Join SAIN Amsterdam
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
              Whether you want to take a course, join a discussion group,
              attend events, or contribute to research — Amsterdam&apos;s AI
              Safety community is waiting for you.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:amsterdam@sain.org"
                className="btn-primary"
              >
                Get in Touch
              </a>
              <Link href="/get-involved" className="btn-secondary">
                More Ways to Get Involved
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
