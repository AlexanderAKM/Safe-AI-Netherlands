"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const leadership = [
  {
    name: "Alexander Müller",
    role: "Director SAIN & Co-Director SAIN Groningen",
    linkedin: "https://alexanderakm.github.io/",
    image: "/photos/team/Alexander.jpg",
  },
  {
    name: "Thomas Brcic",
    role: "Co-Director SAIN Groningen",
    linkedin: "https://www.linkedin.com/in/thomas-brcic-1b2737212/",
    image: "/photos/team/Thomas.png",
  },
  {
    name: "Ana Paula Castillo Rodriguez",
    role: "Co-Director SAIN Amsterdam",
    linkedin: "https://www.linkedin.com/in/ana-paula-casrod/",
    image: "/photos/team/Ana_resized.jpeg",
  },
  {
    name: "Andreea Chivu",
    role: "Co-Director SAIN Amsterdam",
    linkedin: "https://www.linkedin.com/in/andreea-chivu-0924911a6/",
    image: "/photos/team/Andreea_resized.jpeg",
  },
  {
    name: "Riccardo Campanella",
    role: "Director SAIN Utrecht",
    linkedin: "https://www.linkedin.com/in/riccardo-campanella/",
    image: "/photos/team/Riccardo_resized.jpeg",
  },
];

const advisors = [
  {
    category: "Technical AI Safety",
    members: [
      {
        name: "Teun van der Weij",
        affiliation: "Research Scientist, Apollo Research; Co-founder, ENAIS",
        link: "https://teunvanderweij.com/",
        image: "/photos/advisory_board/Teun.jpg",
      },
      {
        name: "Jesse Hoogland",
        affiliation: "Co-founder & Director, Timaeus",
        link: "https://www.jessehoogland.com/",
        image: "/photos/advisory_board/Jesse.jpg",
      },
      {
        name: "Tim Bakker",
        affiliation: "AI Safety Advisor",
        link: "https://tbbakker.nl/",
      },
      {
        name: "Nandi Schoots",
        affiliation: "AI Safety Advisor",
        link: "#",
      },
    ],
  },
  {
    category: "AI Governance & Policy",
    members: [
      {
        name: "Jelle Donders",
        affiliation: "Government of the Netherlands",
        link: "https://www.linkedin.com/in/jelle-donders/",
        image: "/photos/advisory_board/Jelle.jpeg",
      },
      {
        name: "Lisa Gotoh",
        affiliation: "AI Governance Advisor",
        link: "https://www.linkedin.com/in/lisa-gotoh/",
      },
      {
        name: "Robert Praas",
        affiliation: "AI Governance Advisor",
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
      <section className="relative min-h-[100svh] flex items-center bg-white overflow-hidden">
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

        <div className="section-container relative z-10 w-full">
          <FadeIn delay={0.1}>
            <p className="max-w-4xl mx-auto text-center text-xl md:text-2xl text-slate-700 leading-relaxed">
              <span className="font-semibold text-navy-900">Our mission</span>{" "}
              is to raise awareness of the full spectrum of existing and
              potential harms from AI, inform mitigation priorities through
              ongoing discourse, and support the realization of effective
              solutions.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="team" className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="heading-lg text-navy-900">Leadership</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {leadership.map((person, i) => (
              <FadeIn key={person.name} delay={i * 0.08}>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-4 h-full flex flex-col group"
                >
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-slate-100">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-display font-semibold text-base text-navy-900 group-hover:text-dutch-orange transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-sm font-medium text-dutch-orange">
                    {person.role}
                  </p>
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
              <h2 className="heading-lg text-navy-900">Advisory Board</h2>
            </div>
          </FadeIn>

          <div className="space-y-10 max-w-6xl mx-auto">
            {advisors.map((group, gi) => (
              <FadeIn key={group.category} delay={gi * 0.15}>
                <div>
                  <h3 className="font-display font-semibold text-2xl text-navy-900 mb-5 text-center">
                    {group.category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {group.members.map((advisor) => (
                      <a
                        key={advisor.name}
                        href={advisor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card p-5 text-center"
                      >
                        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-slate-100">
                          {advisor.image ? (
                            <Image
                              src={advisor.image}
                              alt={advisor.name}
                              fill
                              sizes="(max-width: 1024px) 50vw, 25vw"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white bg-gradient-to-br from-navy-800 to-navy-900 text-2xl font-display font-semibold">
                              {advisor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </div>
                          )}
                        </div>
                        <h4 className="font-display font-semibold text-navy-900">
                          {advisor.name}
                        </h4>
                        <p className="text-sm font-medium text-dutch-orange mt-1">
                          {advisor.affiliation}
                        </p>
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
