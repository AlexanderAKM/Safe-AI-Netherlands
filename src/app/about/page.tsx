"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

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

const values = [
  {
    title: "Rigorous Research",
    description:
      "We support interdisciplinary research that explores the ethical, social, and technical dimensions of AI Safety — from mechanistic interpretability to AI governance.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "Inclusive Community",
    description:
      "AI Safety is not just for ML engineers. We welcome researchers, policymakers, ethicists, students, and professionals from all backgrounds to contribute.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Education First",
    description:
      "Through structured courses, discussion groups, and mentorship, we build deep understanding of AI Safety challenges and equip people to make a real difference.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "National Scale",
    description:
      "By uniting local chapters under a shared brand and infrastructure, we multiply the impact of every AI Safety advocate in the Netherlands.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
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
              The Netherlands&apos; national initiative for AI Safety
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              Safe AI Netherlands (SAIN) was born from the recognition that the
              Netherlands needs a unified, national-level organization dedicated
              to ensuring AI is developed and deployed responsibly.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  Our Mission
                </p>
                <h2 className="heading-lg text-navy-900 mb-6">
                  Ensuring AI benefits everyone
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Our mission is to raise awareness of the full spectrum of
                    existing and potential harms from AI, inform mitigation
                    priorities through ongoing discourse, and support the
                    realization of effective solutions.
                  </p>
                  <p>
                    We recognize that the rapid evolution of AI technologies
                    presents both immense opportunities and significant
                    challenges. As a community of forward-thinking individuals,
                    we are dedicated to ensuring these technologies are developed
                    and utilized in ways that uphold human dignity, foster
                    equity, and prevent harm — both now and in the future.
                  </p>
                  <p>
                    At SAIN, we strongly believe in the transformative power of
                    AI — from conquering diseases and revolutionizing education
                    to unraveling the mysteries of the universe. However,
                    &ldquo;with great power comes great responsibility.&rdquo;
                    Our call for AI Safety embodies a commitment to ensuring we
                    harness AI&apos;s potential in a manner that benefits all of
                    humanity.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h3 className="font-display font-semibold text-lg text-navy-900 mb-6">
                  Why AI Safety Matters
                </h3>
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  <p>
                    AI is revolutionizing healthcare, education, and countless
                    other sectors, yet it also holds the potential for
                    unintended, or even catastrophic, consequences. From AI
                    being exploited by malevolent actors to exacerbating social
                    inequalities, and from autonomous weapons to mass
                    surveillance — the risks are real and demand attention.
                  </p>
                  <p>
                    More speculatively, some experts believe advanced AI systems
                    could pose existential risks. Many highly-reputable
                    researchers including Yoshua Bengio and Geoffrey Hinton have
                    voiced that it is, at the very least, &ldquo;not
                    inconceivable&rdquo; that AI could cause catastrophic harm.
                  </p>
                  <p>
                    It is imperative to balance our effort to address severe
                    societal harms already unfolding from current AI against our
                    need to prepare for potential harms from upcoming advanced AI
                    systems. SAIN aims to cover all such efforts that ensure AI
                    will be beneficial for humanity.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Our Approach
              </p>
              <h2 className="heading-lg text-navy-900">
                What drives us
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.1}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-dutch-orange/10 text-dutch-orange flex items-center justify-center flex-shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-navy-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {value.description}
                    </p>
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
                  {/* Line */}
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[23px] top-12 w-px h-[calc(100%-24px)] bg-slate-200" />
                  )}
                  {/* Dot */}
                  <div className="w-12 h-12 rounded-full bg-dutch-orange/10 border-2 border-dutch-orange text-dutch-orange flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {item.year.slice(-2)}
                  </div>
                  <div className="pt-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-medium text-slate-400">{item.year}</span>
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
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <svg className="w-4 h-4 text-dutch-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
