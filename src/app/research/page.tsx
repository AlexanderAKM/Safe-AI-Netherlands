"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const publications = [
  {
    title: "The Anatomy of Alignment: Decomposing Preference Optimization by Steering Sparse Features",
    venue: "NeurIPS 2025 Spotlight",
    authors: "Jeremias Ferrao, Matthijs van der Lende, Ilija Lichkovski",
    link: "https://arxiv.org/abs/2509.12934",
    tags: ["Alignment", "Interpretability"],
  },
  {
    title: "Self-Ablating Transformers: More Interpretability, Less Sparsity",
    venue: "ICLR 2025",
    authors: "Jeremias Ferrao",
    link: "https://openreview.net/pdf?id=QcmEb490bK",
    tags: ["Interpretability"],
  },
  {
    title: "EU-Agent-Bench: Measuring Illegal Behavior of LLM Agents Under EU Law",
    venue: "NeurIPS 2025",
    authors: "Ilija Lichkovski, Alexander Müller, Mariam Ibrahim, Tiwai Mhundwa",
    link: "https://arxiv.org/abs/2510.21524",
    tags: ["Governance", "Evaluation"],
  },
  {
    title: "Contextual Sparsity as a Tool for Mechanistic Understanding of Retrieval in Hybrid Foundation Models",
    venue: "ICLR 2025",
    authors: "Davide Zani, Felix Michalak, Steven Abreu",
    link: "https://openreview.net/pdf?id=TGWzg86kYv",
    tags: ["Interpretability"],
  },
  {
    title: "Steering Large Language Models using Conceptors",
    venue: "NeurIPS 2024",
    authors: "Joris Postmus, Steven Abreu",
    link: "https://jorispos.github.io/conceptor_steering/",
    tags: ["Alignment", "Interpretability"],
  },
  {
    title: "AutoSteer: Weight-Preserving Reinforcement Learning for Interpretable Model Control",
    venue: "1st Place, Apart Research Hackathon",
    authors: "Jeremias Ferrao",
    link: "https://www.apartresearch.com/project/autosteer-weight-preserving-reinforcement-learning-for-interpretable-model-control",
    tags: ["Alignment", "Interpretability"],
  },
  {
    title: "Local Learning Coefficients Predict Developmental Milestones During GRPO",
    venue: "3rd Place, Apart Research Hackathon",
    authors: "Jeremias Ferrao, Ilija Lichkovski",
    link: "https://apartresearch.com/project/local-learning-coefficients-predict-developmental-milestones-during-group-relative-policy-optimization-2te2",
    tags: ["Alignment"],
  },
  {
    title: "Collective Deliberation for Safer CBRN Decisions: A Multi-Agent LLM Debate Pipeline",
    venue: "4th Place, Apart Research Hackathon",
    authors: "Alexander Müller, Arsenijs Golicins, Galina Lesnic",
    link: "https://apartresearch.com/project/collective-deliberation-for-safer-cbrn-decisions-a-multi-agent-llm-debate-pipeline-3w8q",
    tags: ["Safety", "Multi-Agent"],
  },
  {
    title: "Sandbagging LLMs using Activation Steering",
    venue: "Apart Research",
    authors: "Jeremias Ferrao, Davide Zani",
    link: "https://www.apartresearch.com/project/sandbagging-llms-using-activation-steering",
    tags: ["Alignment", "Evaluation"],
  },
  {
    title: "Cybersecurity Persistence Benchmark",
    venue: "Apart Research",
    authors: "Davide Zani, Felix Michalak, Jeremias Ferrao",
    link: "https://www.apartresearch.com/project/cybersecurity-persistence-benchmark",
    tags: ["Safety", "Evaluation"],
  },
  {
    title: "Playing with Perception: Fooling Traffic Sign Classifiers via Copy-Paste Manipulation",
    venue: "Research Project",
    authors: "Davide Zani, Alexandru Dimofte",
    link: "https://drive.google.com/file/d/1JvhstWaLIHB9QPI-cg5S-1ASexhmqLSN/view",
    tags: ["Robustness"],
  },
  {
    title: "AI Misinformation and Threats to Democratic Rights",
    venue: "Apart Research",
    authors: "Davide Zani, Mariam Ibrahim, Tiwai Mhundwa, Felix Michalak, Andrei Avram",
    link: "https://www.apartresearch.com/project/ai-misinformation-and-threats-to-democratic-rights",
    tags: ["Governance", "Safety"],
  },
];

const hubFeatures = [
  {
    title: "Supervised Matching",
    description: "We connect talented researchers with PhD+ supervisors for structured, mentored AI Safety research projects.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    title: "Compute & Support",
    description: "We provide compute resources and logistical support for open collaborations and research projects.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    title: "National Network",
    description: "Access the full SAIN network — researchers, advisors, and practitioners across all Dutch chapters.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.466.732-3.558" />
      </svg>
    ),
  },
  {
    title: "Publication Track",
    description: "Our community has published at NeurIPS, ICLR, and other top venues — we help you build a strong AI Safety research track record.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
];

export default function ResearchPage() {
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
              Research Hub
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-xl text-white max-w-3xl mb-6">
              Advancing AI Safety research in the Netherlands
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              The SAIN Research Hub connects talented researchers with
              experienced supervisors, providing mentorship, compute, and
              community to produce impactful AI Safety research.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">6+</span>
                Active Projects
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">20+</span>
                Researchers
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">12+</span>
                Publications
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                How It Works
              </p>
              <h2 className="heading-lg text-navy-900 mb-4">
                A structured path to AI Safety research
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Whether you&apos;re a student looking for your first research
                experience or a PhD looking to mentor the next generation, the
                Research Hub has a place for you.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hubFeatures.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-dutch-orange/10 text-dutch-orange flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-display font-semibold text-navy-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-dutch-orange mb-3">
                Publications
              </p>
              <h2 className="heading-lg text-navy-900 mb-4">
                Research from our community
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Our researchers publish at top venues including NeurIPS, ICLR,
                and compete in international AI Safety hackathons.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {publications.map((paper, i) => (
              <FadeIn key={paper.title} delay={Math.min(i * 0.05, 0.4)}>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-5 h-full flex flex-col group"
                >
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-navy-900/5 text-xs font-medium text-navy-700">
                      {paper.venue}
                    </span>
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded-md bg-dutch-orange/5 text-xs font-medium text-dutch-orange"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display font-semibold text-navy-900 mb-2 leading-snug group-hover:text-dutch-orange transition-colors">
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
              Contribute to AI Safety research
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
              Whether as a researcher, supervisor, or funder — there are many
              ways to support and participate in the SAIN Research Hub.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/get-involved" className="btn-primary">
                Join as Researcher
              </Link>
              <a
                href="mailto:research@sain.org"
                className="btn-secondary"
              >
                Become a Supervisor
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
