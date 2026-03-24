"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const pillars = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "Research",
    description:
      "Our national Research Hub connects talented researchers with PhD+ supervisors for impactful AI Safety projects, from mechanistic interpretability to AI governance.",
    href: "/research",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a23.838 23.838 0 0 0-2.471.261c.128.132.24.272.339.42a23.798 23.798 0 0 1 2.132-.68m15.482 0a23.838 23.838 0 0 1 2.471.261c-.128.132-.24.272-.339.42a23.798 23.798 0 0 0-2.132-.68M6.906 7.917A3.001 3.001 0 0 1 9 5.25h6a3.001 3.001 0 0 1 2.094 2.667m-9.188 0a23.936 23.936 0 0 1 9.188 0" />
      </svg>
    ),
    title: "Education",
    description:
      "We run the \"AI Safety, Ethics, and Society\" course in Technical and Governance tracks across our local chapters, training the next generation of AI Safety professionals.",
    href: "/chapters/groningen",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    title: "Events",
    description:
      "From technical hackathons with Apart Research to AI Safety Chats and expert seminars, we host regular events that bring the community together.",
    href: "/chapters/groningen",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.466.732-3.558" />
      </svg>
    ),
    title: "Outreach",
    description:
      "Through our Substack, social media, and partnerships, we raise awareness about AI Safety risks and solutions across the Netherlands and beyond.",
    href: "https://aisig.substack.com/",
  },
];

const featuredResearch = [
  {
    title: "The Anatomy of Alignment: Decomposing Preference Optimization by Steering Sparse Features",
    venue: "NeurIPS 2025 Spotlight",
    authors: "Jeremias Ferrao, Matthijs van der Lende, Ilija Lichkovski",
    link: "https://arxiv.org/abs/2509.12934",
  },
  {
    title: "Self-Ablating Transformers: More Interpretability, Less Sparsity",
    venue: "ICLR 2025",
    authors: "Jeremias Ferrao",
    link: "https://openreview.net/pdf?id=QcmEb490bK",
  },
  {
    title: "EU-Agent-Bench: Measuring Illegal Behavior of LLM Agents Under EU Law",
    venue: "NeurIPS 2025",
    authors: "Ilija Lichkovski, Alexander Müller, Mariam Ibrahim, Tiwai Mhundwa",
    link: "https://arxiv.org/abs/2510.21524",
  },
  {
    title: "Contextual Sparsity as a Tool for Mechanistic Understanding of Retrieval in Hybrid Foundation Models",
    venue: "ICLR 2025",
    authors: "Davide Zani, Felix Michalak, Steven Abreu",
    link: "https://openreview.net/pdf?id=TGWzg86kYv",
  },
  {
    title: "Steering Large Language Models using Conceptors",
    venue: "NeurIPS 2024",
    authors: "Joris Postmus, Steven Abreu",
    link: "https://jorispos.github.io/conceptor_steering/",
  },
  {
    title: "AutoSteer: Weight-Preserving RL for Interpretable Model Control",
    venue: "1st Place, Apart Research Hackathon",
    authors: "Jeremias Ferrao",
    link: "https://www.apartresearch.com/project/autosteer-weight-preserving-reinforcement-learning-for-interpretable-model-control",
  },
];

const chapters = [
  {
    city: "Groningen",
    status: "active" as const,
    description: "Our flagship chapter — running courses, research, discussion groups, and events since 2023.",
    href: "/chapters/groningen",
  },
  {
    city: "Amsterdam",
    status: "coming" as const,
    description: "Launching soon in the Netherlands' largest city and AI research hub.",
    href: "/chapters/amsterdam",
  },
  {
    city: "Delft",
    status: "coming" as const,
    description: "Connecting with TU Delft's strong technical community.",
    href: "/chapters/delft",
  },
  {
    city: "Utrecht",
    status: "coming" as const,
    description: "Building AI Safety awareness in the heart of the Netherlands.",
    href: "/chapters/utrecht",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center bg-navy-950 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-dutch-orange/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dutch-orange/30 to-transparent" />

        <div className="section-container relative z-10 py-32 md:py-40">
          <div className="max-w-4xl">
            <FadeIn delay={0.1} direction="none">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 mb-8">
                <span className="w-2 h-2 rounded-full bg-dutch-orange animate-pulse" />
                The Netherlands&apos; national AI Safety initiative
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="heading-xl text-white mb-6 text-balance">
                Building a safer future{" "}
                <span className="gradient-text">with AI</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
                Safe AI Netherlands (SAIN) unites researchers, students, and
                professionals across the country to ensure artificial
                intelligence is developed and deployed responsibly.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <Link href="/research" className="btn-primary text-base px-8 py-3.5">
                  Explore Our Research
                </Link>
                <Link href="/get-involved" className="btn-secondary text-base px-8 py-3.5">
                  Get Involved
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Mission Pillars ── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                What We Do
              </p>
              <h2 className="heading-lg text-navy-900">
                Four pillars of impact
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.1}>
                <Link
                  href={pillar.href}
                  target={pillar.href.startsWith("http") ? "_blank" : undefined}
                  className="card p-6 h-full flex flex-col group"
                >
                  <div className="w-12 h-12 rounded-xl bg-dutch-orange/10 text-dutch-orange flex items-center justify-center mb-4 group-hover:bg-dutch-orange group-hover:text-white transition-colors duration-300">
                    {pillar.icon}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    {pillar.description}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Research ── */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  Research
                </p>
                <h2 className="heading-lg text-navy-900">
                  Selected publications
                </h2>
              </div>
              <Link
                href="/research"
                className="text-sm font-semibold text-dutch-orange hover:text-dutch-orange-dark transition-colors flex items-center gap-1"
              >
                View all research
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResearch.map((paper, i) => (
              <FadeIn key={paper.title} delay={i * 0.08}>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-6 h-full flex flex-col group"
                >
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-navy-900/5 text-xs font-medium text-navy-700 mb-3 self-start">
                    {paper.venue}
                  </div>
                  <h3 className="font-display font-semibold text-navy-900 mb-3 leading-snug group-hover:text-dutch-orange transition-colors">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-auto">
                    {paper.authors}
                  </p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chapters ── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Local Presence
              </p>
              <h2 className="heading-lg text-navy-900 mb-4">
                SAIN chapters across the Netherlands
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Each SAIN chapter operates locally while benefiting from shared
                national infrastructure, resources, and brand recognition.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chapters.map((chapter, i) => (
              <FadeIn key={chapter.city} delay={i * 0.1}>
                <Link href={chapter.href} className="card p-6 h-full flex flex-col group">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-semibold text-lg text-navy-900 group-hover:text-dutch-orange transition-colors">
                      SAIN {chapter.city}
                    </h3>
                    {chapter.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    {chapter.description}
                  </p>
                  <div className="mt-4 text-sm font-medium text-dutch-orange flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center mt-12">
              <Link href="/get-involved#start-chapter" className="btn-outline">
                Start SAIN in your city
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 md:py-32 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dutch-orange/30 to-transparent" />

        <div className="section-container relative z-10 text-center">
          <FadeIn>
            <h2 className="heading-lg text-white mb-6 text-balance">
              AI Safety is one of the most important challenges of our time
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
              Whether you&apos;re a researcher, student, policymaker, or
              concerned citizen — there&apos;s a place for you in SAIN.
              Join us in shaping the responsible development of AI in the
              Netherlands.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/get-involved" className="btn-primary text-base px-8 py-3.5">
                Join SAIN
              </Link>
              <Link href="/about" className="btn-secondary text-base px-8 py-3.5">
                Learn More
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
