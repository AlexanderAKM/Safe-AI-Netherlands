"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const leadership = [
  {
    name: "Riccardo Campanella",
    role: "Director",
    description:
      "Leading SAIN Utrecht. Building university partnerships at Utrecht University and growing the local AI Safety community.",
    linkedin: "https://www.linkedin.com/in/riccardo-campanella/",
  },
];

const highlights = [
  "3 iterations of the AI Safety Fundamentals program delivered",
  "20+ enrolled participants in the 2026 cohort",
  "Funded by BERI with mentorship from Pathfinder",
  "Guest speaker events including researchers from Anthropic (60+ attendees)",
  "Active local community of 223 members",
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

export default function UtrechtPage() {
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
              <span className="text-sm text-dutch-orange">Utrecht</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-navy-900 max-w-3xl mb-6">
              SAIN Utrecht
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-8">
              AI Safety in the heart of the Netherlands. Building a
              multidisciplinary community at Utrecht University and beyond, with
              international backing and a growing research focus.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Active Chapter
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div>20+ course participants</div>
              <div className="w-px h-4 bg-slate-200" />
              <div>223+ community members</div>
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
                    LLMs, safety evaluation, interpretability, and agent
                    behavior.
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
                AI Safety Fundamentals
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="card p-8 max-w-3xl">
              <p className="text-slate-600 leading-relaxed mb-6">
                SAIN Utrecht has delivered 3 iterations of its AI Safety
                program, reaching a diverse audience of BSc/MSc students,
                researchers, engineers, and public sector participants. The
                2026 cohort includes 20+ enrolled participants engaging with
                both Technical AI Safety and Governance topics.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-xl p-5">
                  <h4 className="font-display font-semibold text-navy-900 mb-2">
                    Technical Track
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Mechanistic Interpretability, adversarial robustness, and
                    AI safety evaluation. Building practical understanding of
                    technical safety research.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5">
                  <h4 className="font-display font-semibold text-navy-900 mb-2">
                    Governance Track
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Risk management, regulatory approaches, and AI standards.
                    Connecting academic insights with real-world governance
                    challenges.
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
                specific AI Safety topics. Connecting students, researchers,
                and practitioners for deeper engagement.
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
              Join SAIN Utrecht
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
              Whether you want to take a course, join a discussion group,
              attend events, or contribute to research — Utrecht&apos;s AI
              Safety community welcomes you.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:utrecht@sain.org"
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
