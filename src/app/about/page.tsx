"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const leadership = [
  {
    name: "Alexander Müller",
    role: "Director SAIN & Co-Director SAIN Groningen",
    description:
      "Founded AISIG in 2023 and led its growth into the Netherlands' most active AI Safety initiative. Now leading the national expansion as SAIN. MSc AI at the University of Groningen.",
    linkedin: "https://alexanderakm.github.io/",
  },
  {
    name: "Thomas Brcic",
    role: "Director SAIN Groningen",
    description:
      "Co-directing AISIG since July 2025. Leads day-to-day operations in Groningen. LLM (Master of Laws) in Energy and Climate Law, with expertise in AI in energy systems and compute.",
    linkedin: "https://www.linkedin.com/in/thomas-brcic-1b2737212/",
  },
  {
    name: "Ana Paula Castillo Rodriguez",
    role: "Co-Director SAIN Amsterdam",
    description:
      "Leading SAIN's Amsterdam chapter, the largest by city population and university density. Building university partnerships at UvA and VU Amsterdam.",
    linkedin: "https://www.linkedin.com/in/ana-paula-casrod/",
  },
  {
    name: "Andreea Chivu",
    role: "Co-Director SAIN Amsterdam",
    description:
      "Co-leading SAIN Amsterdam alongside Ana Paula. Responsible for building the Amsterdam chapter's education, events, and community programming.",
    linkedin: "https://www.linkedin.com/in/andreea-chivu-0924911a6/",
  },
  {
    name: "Riccardo Campanella",
    role: "Director SAIN Utrecht",
    description:
      "Leading SAIN's Utrecht chapter. Building university partnerships at Utrecht University and growing the local AI Safety community.",
    linkedin: "https://www.linkedin.com/in/riccardo-campanella/",
  },
  {
    name: "Ilija Lichkovski",
    role: "Head of Research",
    description:
      "ML engineer at Researchable and research resident at Prime Intellect. Coordinates SAIN's national AI Safety Research Hub, including supervisor matching and cross-chapter research collaboration.",
    linkedin: "https://ilijalichkovski.github.io/",
  },
  {
    name: "Vin Sixsmith",
    role: "Head of PR",
    description:
      "Won the Future of Life Institute's Keep The Future Human contest. Frame Fellowship alumnus. Leads SAIN's national communications with 8M+ views on AI safety content.",
    linkedin: "https://www.linkedin.com/in/sixsmithvin/",
  },
];

const advisors = [
  {
    category: "Technical AI Safety",
    members: [
      {
        name: "Teun van der Weij",
        affiliation: "Apollo Research / ENAIS",
        description:
          "Co-founder and board member of the European Network for AI Safety. Research Scientist at Apollo Research.",
        link: "https://teunvanderweij.com/",
      },
      {
        name: "Jesse Hoogland",
        affiliation: "Timaeus",
        description:
          "AI safety researcher and co-founder of the Singular Learning Theory research agenda. Co-founded and directs Timaeus, a nonprofit research organization.",
        link: "https://www.jessehoogland.com/",
      },
      {
        name: "Tim Bakker",
        affiliation: "",
        description: "",
        link: "https://tbbakker.nl/",
      },
    ],
  },
  {
    category: "AI Governance & Policy",
    members: [
      {
        name: "Jelle Donders",
        affiliation: "Government of the Netherlands",
        description:
          "Conducting a feasibility study on the establishment of a Dutch AI Safety Institute on behalf of the Government of the Netherlands. Expertise in AI governance and philosophy of advanced AI.",
        link: "https://www.linkedin.com/in/jelle-donders/",
      },
      {
        name: "Lisa Gotoh",
        affiliation: "",
        description: "",
        link: "https://www.linkedin.com/in/lisa-gotoh/",
      },
      {
        name: "Robert Praas",
        affiliation: "",
        description: "",
        link: "https://www.linkedin.com/in/robertpraas/",
      },
    ],
  },
];

const timeline = [
  {
    year: "2023",
    title: "AISIG Founded",
    description:
      "The AI Safety Initiative Groningen (AISIG) was established as a student-led group dedicated to AI Safety education and awareness.",
  },
  {
    year: "2024",
    title: "Rapid Growth",
    description:
      "AISIG expanded beyond students to include professionals, launched the Research Hub, ran multiple course cohorts, and hosted hackathons with Apart Research.",
  },
  {
    year: "2025",
    title: "National Recognition",
    description:
      "With publications at NeurIPS, ICLR, and other top venues, AISIG became a frontrunner among student-led AI Safety groups in Europe.",
  },
  {
    year: "2026",
    title: "SAIN Launched",
    description:
      "AISIG rebrands to Safe AI Netherlands (SAIN), establishing a national initiative with chapters in multiple Dutch cities and a unified infrastructure.",
  },
];

export default function AboutPage() {
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
            <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-4">
              About SAIN
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-navy-900 max-w-3xl mb-6">
              The people building AI Safety in the Netherlands
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              Safe AI Netherlands (SAIN) is led by a dedicated team of AI Safety
              advocates, supported by an advisory board of leading figures in
              the Dutch AI Safety landscape.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="team" className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Leadership
              </p>
              <h2 className="heading-lg text-navy-900">
                Our team
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((person, i) => (
              <FadeIn key={person.name} delay={i * 0.08}>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-6 h-full flex flex-col group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-dutch-orange to-dutch-orange-light flex items-center justify-center text-white text-xl font-bold mb-4">
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-navy-900 group-hover:text-dutch-orange transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-sm font-medium text-dutch-orange mb-2">
                    {person.role}
                  </p>
                  {person.description && (
                    <p className="text-sm text-slate-500 leading-relaxed flex-1">
                      {person.description}
                    </p>
                  )}
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Advisory Board
              </p>
              <h2 className="heading-lg text-navy-900 mb-4">
                Guided by experts
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Our advisory board brings together researchers, policy experts,
                and practitioners to provide strategic guidance to SAIN.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((group, gi) => (
              <FadeIn key={group.category} delay={gi * 0.15}>
                <div>
                  <h3 className="font-display font-semibold text-navy-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-dutch-orange" />
                    {group.category}
                  </h3>
                  <div className="space-y-4">
                    {group.members.map((advisor) => (
                      <a
                        key={advisor.name}
                        href={advisor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white rounded-xl border border-slate-200 p-5 hover:border-dutch-orange/30 hover:shadow-sm transition-all group/card"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {advisor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h4 className="font-display font-semibold text-navy-900 group-hover/card:text-dutch-orange transition-colors">
                              {advisor.name}
                            </h4>
                            {advisor.affiliation && (
                              <p className="text-xs font-medium text-slate-400 mb-1">
                                {advisor.affiliation}
                              </p>
                            )}
                            {advisor.description && (
                              <p className="text-sm text-slate-500 leading-relaxed">
                                {advisor.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Our Journey
              </p>
              <h2 className="heading-lg text-navy-900">
                From AISIG to SAIN
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.1}>
                <div className="relative flex gap-6 pb-12 last:pb-0">
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[23px] top-12 w-px h-[calc(100%-24px)] bg-slate-200" />
                  )}
                  <div className="w-12 h-12 rounded-full bg-dutch-orange/10 border-2 border-dutch-orange text-dutch-orange flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {item.year.slice(-2)}
                  </div>
                  <div className="pt-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-medium text-slate-400">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-navy-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="section-padding bg-navy-950">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                How We Work
              </p>
              <h2 className="heading-lg text-white mb-4">
                National infrastructure, local impact
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                SAIN operates as a national umbrella with local chapters. Each
                chapter operates autonomously while benefiting from shared
                resources, branding, and legal infrastructure.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "National Level",
                items: [
                  "Research Hub & fellowship program",
                  "Substack & national media",
                  "Shared Google Workspace & infrastructure",
                  "Legal entity & financial administration",
                  "Advisory board & partnerships",
                ],
              },
              {
                title: "Chapter Level",
                items: [
                  "Local courses & discussion groups",
                  "Regional events & hackathons",
                  "City-specific outreach",
                  "Local team & leadership",
                  "Community building",
                ],
              },
              {
                title: "What Chapters Get",
                items: [
                  "SAIN brand & authority",
                  "Operational playbooks & templates",
                  "Centralized digital infrastructure",
                  "Mentorship from experienced organizers",
                  "No need for separate legal registration",
                ],
              },
            ].map((col, i) => (
              <FadeIn key={col.title} delay={i * 0.15}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-white mb-4">
                    {col.title}
                  </h3>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-slate-300"
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
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center mt-12">
              <Link href="/get-involved" className="btn-primary">
                Get Involved
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
