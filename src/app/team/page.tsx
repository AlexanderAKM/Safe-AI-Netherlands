"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const leadership = [
  {
    name: "Alexander Müller",
    role: "Founder & Director",
    description:
      "Co-founded AISIG in 2023 and led its growth into the Netherlands' most active AI Safety initiative. Now leading the national expansion as SAIN.",
  },
];

const chapters = [
  { name: "SAIN Groningen", href: "/chapters/groningen", status: "Active" },
  { name: "SAIN Amsterdam", href: "/chapters/amsterdam", status: "Coming Soon" },
  { name: "SAIN Utrecht", href: "/chapters/utrecht", status: "Coming Soon" },
];

export default function TeamPage() {
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
              Our Team
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-navy-900 max-w-3xl mb-6">
              The people behind SAIN
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              SAIN is led by a dedicated team of AI Safety advocates, supported
              by an advisory board of leading figures in the Dutch AI Safety
              landscape.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* National Leadership */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                National Leadership
              </p>
              <h2 className="heading-lg text-navy-900">
                Core team
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((person, i) => (
              <FadeIn key={person.name} delay={i * 0.1}>
                <div className="card p-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-dutch-orange to-dutch-orange-light flex items-center justify-center text-white text-xl font-bold mb-4">
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-navy-900">
                    {person.name}
                  </h3>
                  <p className="text-sm font-medium text-dutch-orange mb-2">
                    {person.role}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {person.description}
                  </p>
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={0.2}>
              <Link
                href="/get-involved"
                className="card p-6 flex flex-col items-center justify-center text-center border-dashed group min-h-[200px]"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-dutch-orange/10 group-hover:text-dutch-orange transition-colors">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-slate-400 group-hover:text-navy-900 transition-colors">
                  Join our team
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  We&apos;re looking for passionate people
                </p>
              </Link>
            </FadeIn>
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
                We are assembling an advisory board of important Dutch players
                in the AI Safety landscape to provide strategic guidance and
                help SAIN achieve its full potential.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="max-w-lg mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-navy-900/5 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-navy-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-navy-900 mb-2">
                Coming Soon
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                We are currently in the process of establishing our advisory
                board. If you are a researcher, policymaker, or industry leader
                in AI Safety and would like to contribute, we&apos;d love to
                hear from you.
              </p>
              <a
                href="mailto:info@sain.org"
                className="text-sm font-semibold text-dutch-orange hover:text-dutch-orange-dark transition-colors"
              >
                Get in touch &rarr;
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Chapter Teams */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Chapter Teams
              </p>
              <h2 className="heading-lg text-navy-900 mb-4">
                Local leadership
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Each SAIN chapter is led by a dedicated local team. Visit a
                chapter page to learn more about the people driving AI Safety
                in their city.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {chapters.map((chapter, i) => (
              <FadeIn key={chapter.name} delay={i * 0.1}>
                <Link href={chapter.href} className="card p-5 text-center group">
                  <h3 className="font-display font-semibold text-navy-900 group-hover:text-dutch-orange transition-colors mb-1">
                    {chapter.name}
                  </h3>
                  <span
                    className={`text-xs font-medium ${
                      chapter.status === "Active"
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    {chapter.status}
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
