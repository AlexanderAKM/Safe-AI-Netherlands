import { supervisors, type Supervisor } from "@/data/research";

/* The Project Hub's open projects: what each supervisor has offered to
   supervise, written up from the agendas they wrote for SAIN (the Drive
   folder of "@ SAIN" documents, read 19 October 2026).

   Only supervisors who are on the site get projects here. `byName` looks each
   one up in `supervisors` (src/data/research.ts), so a project whose
   supervisor is not listed there fails the build instead of shipping, and the
   portrait, position and agenda link come from that one entry.

   A summary paraphrases the supervisor's own words and adds nothing to them:
   no prerequisite, commitment, format or level appears unless the supervisor
   stated it. Where an agenda gives directions rather than projects, the entry
   says so.

   To add a project: add an entry with its supervisor and categories. To close
   one: set `open: false` (it stays listed, marked closed) or delete it. */

export type ProjectCategory =
  | "Interpretability"
  | "Evaluations"
  | "Alignment and RL"
  | "Multi-agent"
  | "Formal methods"
  | "Security and privacy"
  | "Societal";

export const projectCategories: ProjectCategory[] = [
  "Interpretability",
  "Evaluations",
  "Alignment and RL",
  "Multi-agent",
  "Formal methods",
  "Security and privacy",
  "Societal",
];

export const projectBases = ["Amsterdam", "Groningen", "Remote"] as const;
export type ProjectBase = (typeof projectBases)[number];

export type ProjectSupervisor = Supervisor & {
  /** Where the supervisor is based, for the location filter. */
  base: ProjectBase;
  /** Besides the agenda, which every supervisor has. */
  links: { label: string; href: string }[];
};

export type Project = {
  id: string;
  title: string;
  supervisor: ProjectSupervisor;
  summary: string;
  details: string[];
  categories: ProjectCategory[];
  /** Only what the supervisor said: "Thesis", "Team project"... */
  format?: string;
  /** Only when the supervisor stated it. */
  lookingFor?: string;
  commitment?: string;
  open: boolean;
};

function byName(
  name: string,
  base: ProjectBase,
  links: ProjectSupervisor["links"] = [],
): ProjectSupervisor {
  const person = supervisors.find((supervisor) => supervisor.name === name);
  if (!person) {
    throw new Error(`${name} has projects but is not in supervisors (src/data/research.ts).`);
  }
  return { ...person, base, links };
}

const filip = byName("Filip Ilievski", "Amsterdam", [
  { label: "Website", href: "https://www.ilievski.info/" },
]);
const satchit = byName("Satchit Chatterji", "Amsterdam");
const sandro = byName("Sandro Pezzelle", "Amsterdam", [
  { label: "Website", href: "https://sandropezzelle.github.io/" },
  { label: "Mulini Lab", href: "https://projects.illc.uva.nl/mulinilab/" },
]);
const fausto = byName("Fausto Carcassi", "Amsterdam", [
  { label: "Website", href: "https://faustocarcassi.com/" },
]);
const leon = byName("Leon Eshuijs", "Amsterdam", [
  { label: "Website", href: "https://watermeleon.github.io/" },
]);
const ana = byName("Ana Lucic", "Amsterdam", [
  { label: "Website", href: "https://a-lucic.github.io" },
]);
const fatih = byName("Fatih Turkmen", "Groningen", [
  { label: "Website", href: "https://www.cs.rug.nl/~turkmen/" },
]);
const guillaume = byName("Guillaume Pourcel", "Groningen");
const jobst = byName("Jobst Heitzig", "Remote", [
  { label: "Theory paper", href: "https://arxiv.org/abs/2508.00159v2" },
  { label: "Code", href: "https://github.com/pik-gane/empo" },
]);
const steven = byName("Steven Abreu", "Remote", [
  { label: "Website", href: "https://stevenabreu.com/" },
]);

const SANDRO_ANGLE = "Every project in Sandro's lab can take an AI safety angle.";
const FAUSTO_OPEN = "Fausto offers these as possible directions to shape together.";
const SATCHIT_OPEN =
  "Satchit offers this as a research direction rather than a fixed project. Bring an idea, or reach out to chat about one.";
const STEVEN_OPEN = "Brainstorm a specific idea together, or propose your own.";

export const projects: Project[] = [
  {
    id: "ai-narratives-media",
    title: "How memes, reels and headlines shape public narratives about AI",
    supervisor: filip,
    summary:
      "Study how short, multimodal media shape what people believe about AI's harms and benefits, combining social-science frameworks with current AI modelling.",
    details: [
      "Formats like memes and reels carry viewpoints in an ambiguous visual grammar that polarises quickly and blurs truth and opinion, and speculative and imminent risk.",
      "Open choices: which formats, how to collect data, which theory to frame them with, how to model and store the knowledge, how much platform context to include, and how to bring in different socio-cultural perspectives.",
      "Rich enough for more than one student. The ambition is publication at a high-quality venue such as ICWSM or an ACL conference.",
    ],
    categories: ["Societal", "Evaluations"],
    format: "Thesis",
    open: true,
  },
  {
    id: "formal-neurosymbolic-safety",
    title: "Formal and neurosymbolic approaches to safe AI",
    supervisor: satchit,
    summary:
      "Use formal guarantees, symbolic reasoning or structured representations to make machine learning systems safer, in general-purpose or expert systems, from foundational methods to applied work.",
    details: [
      "Themes include alignment, robustness, verification, controllability and social norms, and connecting theoretical safety ideas with practical mechanisms.",
      SATCHIT_OPEN,
    ],
    categories: ["Formal methods", "Alignment and RL"],
    open: true,
  },
  {
    id: "multi-agent-rl-safety",
    title: "Safety in multi-agent and reinforcement learning systems",
    supervisor: satchit,
    summary:
      "Safety questions in reinforcement learning and multi-agent RL, including game-theoretic approaches to the incentives and behaviour of interacting agents.",
    details: [SATCHIT_OPEN],
    categories: ["Multi-agent", "Alignment and RL"],
    open: true,
  },
  {
    id: "llm-guardrails",
    title: "Reliable and robust guardrails for language models",
    supervisor: satchit,
    summary:
      "Mechanisms that constrain, monitor or correct what language models do, built to hold up under distribution shift and adversarial inputs.",
    details: [SATCHIT_OPEN],
    categories: ["Security and privacy", "Evaluations"],
    open: true,
  },
  {
    id: "human-societal-safety",
    title: "Human agency, power and pluralism as AI grows more capable",
    supervisor: satchit,
    summary:
      "How capable AI may reshape institutions, democratic decision-making and the distribution of power, from gradual disempowerment to whose values systems should reflect.",
    details: [
      "Connects technical AI safety with policy, governance, justice, democratic legitimacy and meaningful human agency, often through the lens of hybrid intelligence: systems that combine human and AI strengths.",
      "Satchit lists this among his wider interests, open to research and collaboration.",
    ],
    categories: ["Societal"],
    open: true,
  },
  {
    id: "vlm-visual-events",
    title: "Can vision-language models understand and narrate visual events?",
    supervisor: sandro,
    summary:
      "Measure how well current VLMs understand and narrate visual events, and whether human behavioural and cognitive patterns can improve them.",
    details: [SANDRO_ANGLE],
    categories: ["Evaluations"],
    open: true,
  },
  {
    id: "ambiguous-language",
    title: "Ambiguous, underspecified and implicit language in LLMs",
    supervisor: sandro,
    summary:
      "How do LLMs and VLMs handle language with several readings, missing information, or an implied message, and can linguistics boost their understanding?",
    details: [SANDRO_ANGLE],
    categories: ["Evaluations"],
    open: true,
  },
  {
    id: "human-inspired-interp",
    title: "Human-inspired mechanistic interpretability",
    supervisor: sandro,
    summary:
      "Find the circuits in LLMs and VLMs responsible for a specific behaviour, and ask whether they mirror the cognitive and neural mechanisms seen in humans.",
    details: [SANDRO_ANGLE],
    categories: ["Interpretability"],
    open: true,
  },
  {
    id: "communicative-benchmarks",
    title: "Benchmarking LLMs in real communication and collaboration",
    supervisor: sandro,
    summary: "Can LLMs be used, and evaluated, in genuinely communicative and collaborative settings?",
    details: [SANDRO_ANGLE],
    categories: ["Evaluations", "Multi-agent"],
    open: true,
  },
  {
    id: "program-synthesis-interp",
    title: "Program synthesis for mechanistic interpretability",
    supervisor: fausto,
    summary:
      "Apply program synthesis to automate building models of how LLMs implement computations.",
    details: [
      "Fausto supervises at the intersection of mechanistic interpretability, AI safety and cognitive science.",
      FAUSTO_OPEN,
    ],
    categories: ["Interpretability", "Formal methods"],
    open: true,
  },
  {
    id: "cognitive-skills-interp",
    title: "Theory of mind and plausible deniability, from the inside",
    supervisor: fausto,
    summary:
      "Use mechanistic interpretability to study cognitive skills in LLMs, such as theory of mind and plausible deniability.",
    details: [FAUSTO_OPEN],
    categories: ["Interpretability"],
    open: true,
  },
  {
    id: "emergent-personas",
    title: "Emergent personas in self-designing LLMs",
    supervisor: fausto,
    summary: "Study the personas that emerge when LLMs design themselves.",
    details: [FAUSTO_OPEN],
    categories: ["Alignment and RL"],
    open: true,
  },
  {
    id: "ai-poisoning-signatures",
    title: "Detecting AI poisoning at internet scale",
    supervisor: fausto,
    summary:
      "Can you tell, from high-level summaries of its text, whether a small simulated internet has been poisoned by AI-generated traces?",
    details: [FAUSTO_OPEN],
    categories: ["Security and privacy", "Societal"],
    open: true,
  },
  {
    id: "llm-theory-of-mind",
    title: "Do LLMs model each other's minds to coordinate?",
    supervisor: fausto,
    summary:
      "Study whether LLMs use theory of mind about each other when coordinating, and whether it differs from how they model human users.",
    details: [FAUSTO_OPEN],
    categories: ["Multi-agent", "Interpretability"],
    open: true,
  },
  {
    id: "dangerous-behaviour-evals",
    title: "Evaluating and interpreting weird or dangerous model behaviour",
    supervisor: leon,
    summary:
      "Build evaluations or use interpretability methods to study behaviours such as sycophancy, or how models analyse user characteristics when they respond.",
    details: [
      "Topics can be brainstormed together; Leon points to the proposed projects from Neel Nanda's earlier MATS stream for inspiration.",
      "Leon is more familiar with some topics than others, so the first step is agreeing a concrete, tractable question.",
    ],
    categories: ["Interpretability", "Evaluations"],
    open: true,
  },
  {
    id: "safe-rl-training",
    title: "Preventing harmful misalignment during RL training",
    supervisor: leon,
    summary:
      "Investigate mitigations such as safe exploration, filtering, or penalising harmful responses that could stop RL training from producing harmful behaviour.",
    details: [
      "RL on LLMs is compute-intensive, so the scope adapts to the resources available: smaller toy experiments on a specific phenomenon, or finding relevant compute.",
    ],
    categories: ["Alignment and RL"],
    open: true,
  },
  {
    id: "llm-reward-values",
    title: "Using LLMs to align reward functions with moral values",
    supervisor: leon,
    summary:
      "Explore how LLMs themselves can improve reward functions and align them with different moral values.",
    details: ["RL on LLMs is compute-intensive, so the scope adapts to the resources available."],
    categories: ["Alignment and RL"],
    open: true,
  },
  {
    id: "xai-science-thesis",
    title: "Interpretability and AI safety for science (bring your project)",
    supervisor: ana,
    summary:
      "An open call: propose a project related to Ana's work on (mechanistic) interpretability, scientific machine learning and AI safety.",
    details: [
      "Ana leads the explainable AI for science lab at the University of Amsterdam. Get in touch with a specific project in mind related to her published topics.",
    ],
    categories: ["Interpretability"],
    format: "MSc AI thesis or ELLIS honours project",
    open: true,
  },
  {
    id: "llm-rag-security",
    title: "Security and privacy of LLMs and RAG systems",
    supervisor: fatih,
    summary:
      "Find and fix security and privacy problems in large language models and retrieval-augmented generation.",
    details: [
      "Fatih's group regularly enters security and privacy of AI challenges, and invites students to team up.",
    ],
    categories: ["Security and privacy"],
    open: true,
  },
  {
    id: "decentralised-privacy",
    title: "Privacy-preserving, fully decentralised machine learning",
    supervisor: fatih,
    summary:
      "Develop privacy-preserving variants of collaborative learning, from federated to peer-to-peer.",
    details: [
      "Includes identifying attacks such as inference and adversarial manipulation, and defending with privacy-enhancing technologies.",
    ],
    categories: ["Security and privacy"],
    open: true,
  },
  {
    id: "neuromorphic-security",
    title: "Security and privacy of neuromorphic systems",
    supervisor: fatih,
    summary: "Study the security and privacy of brain-inspired computing systems.",
    details: [],
    categories: ["Security and privacy"],
    open: true,
  },
  {
    id: "ai-security-testing",
    title: "AI-assisted security testing and vulnerability patching",
    supervisor: fatih,
    summary:
      "Use LLMs to test software and systems, discover vulnerabilities and patch them automatically.",
    details: [],
    categories: ["Security and privacy"],
    open: true,
  },
  {
    id: "autonomous-cyberdefence",
    title: "Autonomous cyberdefence with reinforcement learning",
    supervisor: fatih,
    summary: "Build autonomous reinforcement learning agents for cyberdefence.",
    details: [],
    categories: ["Security and privacy", "Alignment and RL"],
    open: true,
  },
  {
    id: "empo",
    title: "EMPO: safety by soft-maximising long-term human power",
    supervisor: jobst,
    summary:
      "Test and validate a safe-AI design that hard-codes an objective of empowering humans, through multi-agent reinforcement learning experiments in multigrid environments.",
    details: [
      "When Jobst wrote his agenda, the theory (v1.0) was finished, the codebase nearly done, and an AI Safety Camp project with about five volunteers was due to start in January 2026.",
      "Mentoring is remote: about an hour a week one-on-one, plus a weekly team meeting.",
    ],
    categories: ["Alignment and RL", "Multi-agent"],
    format: "Team project",
    lookingFor:
      "Experienced ML users, ideally with reinforcement learning or multi-agent RL experience",
    commitment: "Weekly one-on-one and team meetings, remote",
    open: true,
  },
  {
    id: "persuasion-benchmark",
    title: "A benchmark for persuasive capabilities in LLMs",
    supervisor: guillaume,
    summary:
      "Build a benchmark that separates superficial persuasion from genuine reasoning in LLM debate, a building block for scalable oversight.",
    details: [
      "Start in mathematics for clear ground truth. Two copies of a model debate; measure whether they can tell valid from flawed arguments, and how robustly they hold a position when challenged.",
      "The aim is to reveal patterns such as models trained for truthfulness defending positions less robustly than models trained to persuade.",
    ],
    categories: ["Evaluations", "Alignment and RL"],
    open: true,
  },
  {
    id: "curriculum-cooperation",
    title: "Automatic curriculum learning for multi-agent cooperation",
    supervisor: guillaume,
    summary:
      "Choose which partners an agent trains with, adaptively, so it learns to cooperate with new partners faster and more robustly.",
    details: [
      "Start from a population of fixed agents with diverse cooperative and competitive behaviours, apply curriculum methods to select partners, and measure efficiency and generalisation to unseen partners.",
    ],
    categories: ["Multi-agent", "Alignment and RL"],
    format: "Thesis",
    open: true,
  },
  {
    id: "global-curriculum-signals",
    title: "Global curriculum signals for robust RL under mis-specified goals",
    supervisor: guillaume,
    summary:
      "Do task-selection strategies that improve performance across the whole task set beat local learning-progress heuristics when goals are mis-specified?",
    details: [
      "A direct comparison of local and global task selection on unsupervised environment design benchmarks such as Kinetix, measuring learning speed, robustness and generalisation.",
    ],
    categories: ["Alignment and RL"],
    format: "Thesis",
    open: true,
  },
  {
    id: "self-improving-agents",
    title: "Safety of recursively self-improving AI agents",
    supervisor: steven,
    summary:
      "Anything on developing and aligning self-improving agents: scalable oversight, debate, self-play, iterated distillation and amplification.",
    details: [STEVEN_OPEN],
    categories: ["Alignment and RL"],
    open: true,
  },
  {
    id: "steering",
    title: "Representation engineering and steering",
    supervisor: steven,
    summary:
      "Detect and steer safety-relevant behaviours in LLMs, for example with conceptors as steering matrices.",
    details: [STEVEN_OPEN],
    categories: ["Interpretability"],
    open: true,
  },
  {
    id: "hybrid-recurrent",
    title: "Inside hybrid transformer-recurrent models",
    supervisor: steven,
    summary:
      "Study recurrent and hybrid transformer-recurrent LLMs, including how they implement retrieval, in the mechanistic interpretability style of earlier AISIG projects.",
    details: [STEVEN_OPEN],
    categories: ["Interpretability"],
    open: true,
  },
];
