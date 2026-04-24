"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const eventPhotos = [
  { src: "/photos/events/course-graduation.jpeg", alt: "AI Safety course graduation ceremony" },
  { src: "/photos/events/control-hackathon.png", alt: "AI Control Hackathon" },
  { src: "/photos/events/tedx-broerstraat.webp", alt: "TEDxBroerstraat presentation" },
  { src: "/photos/events/tekla-emborg-talk.jpeg", alt: "AI Safety talk with Tekla Emborg" },
  { src: "/photos/events/defence-hackathon.png", alt: "Defence Acceleration Hackathon" },
  { src: "/photos/events/pub-quiz.jpg", alt: "SAIN Groningen pub quiz" },
  { src: "/photos/events/forecasting-hackathon.png", alt: "AI Forecasting Hackathon" },
  { src: "/photos/events/graduation-ceremony.jpeg", alt: "Graduation ceremony" },
  { src: "/photos/events/fatih-turkmen-talk.png", alt: "Talk with Fatih Turkmen" },
];

const events = [
  { date: "Mar 2025", title: "AI Control Hackathon" },
  { date: "Mar 2025", title: "AI Safety, Ethics and Society Graduation Ceremony" },
  { date: "Feb 2025", title: "TEDxBroerstraat" },
  { date: "Feb 2025", title: "AI Safety Talk with Tekla Emborg" },
  { date: "Nov 2024", title: "Defence Acceleration Hackathon" },
  { date: "Nov 2024", title: "AI Safety, Ethics and Society Course Graduation" },
  { date: "Oct 2024", title: "AI Forecasting & Timeline Models Hackathon" },
  { date: "Oct 2024", title: "SAIN Groningen Pub Quiz" },
  { date: "Sep 2024", title: "AI Safety Chat" },
];

const discussionGroups = [
  {
    name: "(Mechanistic) Interpretability",
    description:
      "Reverse-engineering ML systems to understand their inner workings and components. Designing systems whose components and decisions are more easily understood, by uncovering circuits, motifs, and algorithms that neural networks use.",
  },
  {
    name: "AI Governance & Privacy",
    description:
      "Shaping policies for AI's ethical and responsible use. Discussing guidelines, regulations, and accountability mechanisms to ensure AI systems are transparent, secure, fair, and free of bias.",
  },
  {
    name: "Neuralignment",
    description:
      "Exploring the intersection of neuroscience and AI to improve how AI systems align with human values. Studying how knowledge of the brain can help solve the alignment problem.",
  },
];

const researchHighlights = [
  {
    title: "Steering LLMs using Conceptors",
    venue: "NeurIPS 2024",
    authors: "Joris Postmus, Steven Abreu",
    link: "https://jorispos.github.io/conceptor_steering/",
  },
  {
    title: "Self-Ablating Transformers",
    venue: "ICLR 2025",
    authors: "Jeremias Ferrao",
    link: "https://openreview.net/pdf?id=QcmEb490bK",
  },
  {
    title: "The Anatomy of Alignment",
    venue: "NeurIPS 2025 Spotlight",
    authors: "Jeremias Ferrao, Matthijs van der Lende, Ilija Lichkovski",
    link: "https://arxiv.org/abs/2509.12934",
  },
  {
    title: "EU-Agent-Bench",
    venue: "NeurIPS 2025",
    authors: "Ilija Lichkovski, Alexander Müller, Mariam Ibrahim, Tiwai Mhundwa",
    link: "https://arxiv.org/abs/2510.21524",
  },
];

export default function GroningenPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-navy-950 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(/photos/cities/groningen-hero.jpg)` }}
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
              <span className="text-sm text-dutch-orange">Groningen</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-white max-w-3xl mb-6">
              SAIN Groningen
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              SAIN&apos;s flagship chapter — formerly the AI Safety Initiative
              Groningen (AISIG). Running courses, research, discussion groups,
              and events since 2023.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Active Chapter
              </div>
              <div className="w-px h-4 bg-slate-600" />
              <div>80+ course graduates</div>
              <div className="w-px h-4 bg-slate-600" />
              <div>Founded 2023</div>
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
                  The frontrunner of student-led AI Safety in Europe
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    SAIN Groningen is SAIN&apos;s flagship local chapter, and
                    the direct successor of the AI Safety Initiative Groningen
                    (AISIG). Founded in 2023, it quickly became one of the most
                    active AI Safety groups in Europe.
                  </p>
                  <p>
                    While originally student-led, SAIN Groningen now includes
                    many professionals and has produced research published at top
                    venues including NeurIPS and ICLR. The chapter runs education
                    programs, discussion groups, events, and feeds into SAIN&apos;s
                    national Research Hub.
                  </p>
                  <p>
                    SAIN Groningen operates with a structured 4-team model:
                    Education, Research, Events, and PR — a blueprint that is
                    being replicated in new SAIN chapters across the Netherlands.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-4">
                <a
                  href="https://chat.whatsapp.com/IugZtosMu0NES3erIFnFNE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-5 flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-navy-900 group-hover:text-dutch-orange transition-colors">
                      WhatsApp Community
                    </h3>
                    <p className="text-sm text-slate-500">
                      Join our community chat for updates and discussions
                    </p>
                  </div>
                </a>

                <a
                  href="https://aisig.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-5 flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-dutch-orange/10 text-dutch-orange flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-navy-900 group-hover:text-dutch-orange transition-colors">
                      Substack
                    </h3>
                    <p className="text-sm text-slate-500">
                      Weekly articles on AI Safety from diverse perspectives
                    </p>
                  </div>
                </a>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FadeIn className="lg:col-span-2">
              <div className="card p-8">
                <p className="text-slate-600 leading-relaxed mb-6">
                  We facilitate the Center for AI Safety course{" "}
                  <strong>&quot;AI Safety, Ethics, and Society&quot;</strong> in
                  two distinct cohorts, each customized to fit two different
                  approaches to AI Safety: <strong>Technical</strong> and{" "}
                  <strong>Governance</strong>. We host both courses on-site in
                  Groningen.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  This course has a broader scope compared to the previously
                  facilitated AGISF, and addresses not only control issues and
                  misalignment but also risks like malicious use, accidents, and
                  societal dependence. We aim for 3-4 cohorts per year, reaching
                  around 60 individuals annually.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-xl p-5">
                    <h4 className="font-display font-semibold text-navy-900 mb-2">
                      Technical Track
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Focuses on the technical aspects of AI Safety, with extra
                      sessions on mechanistic interpretability, adversarial
                      attacks, complex systems, and more.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5">
                    <h4 className="font-display font-semibold text-navy-900 mb-2">
                      Governance Track
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Prioritizes governance and policy aspects, dedicating time
                      to case studies and real-world examples of regulatory,
                      legal, and societal challenges.
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
                    { label: "Duration", value: "6 weeks per block" },
                    { label: "Workload", value: "2h readings + 2h discussion / week" },
                    { label: "Cohorts per year", value: "3-4 (Block-based)" },
                    { label: "Format", value: "On-site in Groningen" },
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
                    These courses are independently led by SAIN Groningen and
                    are not affiliated with the University of Groningen.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
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
                Focused groups meeting weekly (~2 hours) to discuss, learn, and
                collaborate on specific AI Safety topics. Each group has at
                least one experienced mentor guiding the conversation.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://chat.whatsapp.com/IugZtosMu0NES3erIFnFNE"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Join via WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Events */}
      <section className="section-padding bg-slate-50">
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

          <div className="max-w-2xl">
            {events.map((event, i) => (
              <FadeIn key={`${event.title}-${i}`} delay={Math.min(i * 0.05, 0.3)}>
                <div className="flex items-center gap-4 py-4 border-b border-slate-200 last:border-0">
                  <span className="text-sm font-medium text-slate-400 w-24 flex-shrink-0">
                    {event.date}
                  </span>
                  <h3 className="font-display font-medium text-navy-900">
                    {event.title}
                  </h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Gallery
              </p>
              <h2 className="heading-lg text-navy-900">
                Moments from our community
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {eventPhotos.map((photo, i) => (
              <FadeIn key={photo.src} delay={Math.min(i * 0.06, 0.3)}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="absolute bottom-3 left-3 right-3 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {photo.alt}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Research Highlights */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                  Research
                </p>
                <h2 className="heading-lg text-navy-900">
                  Selected research from our members
                </h2>
              </div>
              <Link
                href="/research"
                className="text-sm font-semibold text-dutch-orange hover:text-dutch-orange-dark transition-colors flex items-center gap-1"
              >
                View full Research Hub
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {researchHighlights.map((paper, i) => (
              <FadeIn key={paper.title} delay={i * 0.1}>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-5 h-full flex flex-col group"
                >
                  <span className="text-xs font-medium text-navy-700 bg-navy-900/5 px-2.5 py-0.5 rounded-md self-start mb-3">
                    {paper.venue}
                  </span>
                  <h3 className="font-display font-semibold text-navy-900 group-hover:text-dutch-orange transition-colors mb-2">
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

      {/* CTA */}
      <section className="section-padding bg-navy-950">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="heading-lg text-white mb-4">
              Join SAIN Groningen
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
              Whether you want to take our course, join a discussion group,
              participate in events, or contribute to research — we&apos;d love
              to have you.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://chat.whatsapp.com/IugZtosMu0NES3erIFnFNE"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Join WhatsApp Community
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
