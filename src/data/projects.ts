import { publications, supervisors, type Availability, type Supervisor } from "@/data/research";

/* The Project Hub's open projects: what each supervisor has offered to
   supervise, written up from the agendas they wrote for SAIN (the Drive
   folder of "@ SAIN" documents, read 19 October 2026).

   Only supervisors who are on the site get projects here. `byName` looks each
   one up in `supervisors` (src/data/research.ts), so a project whose
   supervisor is not listed there fails the build instead of shipping, and the
   portrait, position and agenda link come from that one entry.

   A summary paraphrases the supervisor's own words and adds nothing to them:
   no prerequisite, commitment, format or level appears unless the supervisor
   stated it, or the Project Hub team confirmed it (the entry says so). Where an
   agenda gives directions rather than projects, the entry says so.

   Only (assistant) professors can supervise a thesis, so only their projects
   carry `thesis`, even where a PhD supervisor's agenda frames a project as one.
   A thesis counts towards a degree at the supervisor's university and is
   graded by its examiners (at the VU, at least one examiner is VU staff; the
   UvA MSc AI thesis is a course in the UvA programme), so `thesis` names that
   university and the card says the project is for its students.

   Availability comes from the supervisor (src/data/research.ts): open,
   limited, full or to be confirmed. A project can override it with its own
   `availability`, for instance to mark one project full while the
   supervisor's others stay open.

   To add a project: add an entry with its supervisor and categories. To take
   one off the open count but keep it listed, set `availability: "full"`; to
   remove it, delete it.

   Later source: Airtable, base "SAIN Pipeline", table "Project Hub", the
   records with Status "Project Accepted". The page reads nothing but
   `projects` and `supervisors`: the hero's numbers (projectHubStats), the
   filters and the cards are all computed from them, so a fetch that writes
   these two lists in these shapes is the only change the switch needs. The
   table cannot do that yet. It holds a project's name, status and supervisor,
   not what a card shows: the summary and details, topics, thesis university
   and level, location and availability would need fields first. And its list
   has to catch up with this file: on 28 October 2026 it had 13 accepted
   projects to the 32 here, with nothing yet for Sandro, Leon, Steven, Jobst,
   Guillaume or Peter, and Fatih's five as one. */

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

export type ThesisUniversity = "VU" | "UvA";

/** Who can apply: a thesis is for students of its university; every other
    project is open to everyone. */
export type Eligibility = ThesisUniversity | "everyone";

export type Project = {
  id: string;
  title: string;
  supervisor: ProjectSupervisor;
  summary: string;
  details: string[];
  categories: ProjectCategory[];
  /** Offered as a thesis at this university, for its students. `level` only
      when the supervisor stated it ("MSc", "MSc AI"). Every project with this
      set shows its label under the title and under the Thesis filter. */
  thesis?: { university: ThesisUniversity; level?: string };
  /** Any other format the supervisor named: "Team project"... */
  format?: string;
  /** Only when the supervisor stated it. */
  lookingFor?: string;
  commitment?: string;
  /** Only to differ from the supervisor's own availability. */
  availability?: Availability;
  /** With a project-level `availability`: the limit in a few words. */
  availabilityNote?: string;
};

/** A thesis project's label: "VU thesis", or "UvA thesis · MSc AI". */
export function thesisLabel(project: Project) {
  if (!project.thesis) return null;
  const { university, level } = project.thesis;
  return level ? `${university} thesis · ${level}` : `${university} thesis`;
}

export function eligibilityOf(project: Project): Eligibility {
  return project.thesis?.university ?? "everyone";
}

/** The line under every card's title: "VU thesis (MSc): VU students only",
    or "Open to everyone". */
export function eligibilityLabel(project: Project) {
  if (!project.thesis) return "Open to everyone";
  const { university, level } = project.thesis;
  return `${university} thesis${level ? ` (${level})` : ""}: ${university} students only`;
}

/** The project's own availability, else its supervisor's, else open. */
export function projectAvailability(project: Project): Availability {
  return project.availability ?? project.supervisor.availability ?? "open";
}

export function projectAvailabilityNote(project: Project) {
  return project.availability ? project.availabilityNote : project.supervisor.availabilityNote;
}

/** Counts as open: everything but full. Limited is open with fewer places,
    and "to be confirmed" stays open until it is settled either way. */
export function isOpenProject(project: Project) {
  return projectAvailability(project) !== "full";
}

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
const emile = byName("Emile van Krieken", "Amsterdam");
const peter = byName("Peter Bloem", "Amsterdam", [
  { label: "AIXI labs", href: "http://aixi-labs.github.io/" },
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
    thesis: { university: "VU" },
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
  },
  {
    id: "multi-agent-rl-safety",
    title: "Safety in multi-agent and reinforcement learning systems",
    supervisor: satchit,
    summary:
      "Safety questions in reinforcement learning and multi-agent RL, including game-theoretic approaches to the incentives and behaviour of interacting agents.",
    details: [SATCHIT_OPEN],
    categories: ["Multi-agent", "Alignment and RL"],
  },
  {
    id: "llm-guardrails",
    title: "Reliable and robust guardrails for language models",
    supervisor: satchit,
    summary:
      "Mechanisms that constrain, monitor or correct what language models do, built to hold up under distribution shift and adversarial inputs.",
    details: [SATCHIT_OPEN],
    categories: ["Security and privacy", "Evaluations"],
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
  },
  {
    id: "vlm-visual-events",
    title: "Can vision-language models understand and narrate visual events?",
    supervisor: sandro,
    summary:
      "Measure how well current VLMs understand and narrate visual events, and whether human behavioural and cognitive patterns can improve them.",
    details: [SANDRO_ANGLE],
    categories: ["Evaluations"],
  },
  {
    id: "ambiguous-language",
    title: "Ambiguous, underspecified and implicit language in LLMs",
    supervisor: sandro,
    summary:
      "How do LLMs and VLMs handle language with several readings, missing information, or an implied message, and can linguistics boost their understanding?",
    details: [SANDRO_ANGLE],
    categories: ["Evaluations"],
  },
  {
    id: "human-inspired-interp",
    title: "Human-inspired mechanistic interpretability",
    supervisor: sandro,
    summary:
      "Find the circuits in LLMs and VLMs responsible for a specific behaviour, and ask whether they mirror the cognitive and neural mechanisms seen in humans.",
    details: [SANDRO_ANGLE],
    categories: ["Interpretability"],
  },
  {
    id: "communicative-benchmarks",
    title: "Benchmarking LLMs in real communication and collaboration",
    supervisor: sandro,
    summary: "Can LLMs be used, and evaluated, in genuinely communicative and collaborative settings?",
    details: [SANDRO_ANGLE],
    categories: ["Evaluations", "Multi-agent"],
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
  },
  {
    id: "cognitive-skills-interp",
    title: "Theory of mind and plausible deniability, from the inside",
    supervisor: fausto,
    summary:
      "Use mechanistic interpretability to study cognitive skills in LLMs, such as theory of mind and plausible deniability.",
    details: [FAUSTO_OPEN],
    categories: ["Interpretability"],
  },
  {
    id: "emergent-personas",
    title: "Emergent personas in self-designing LLMs",
    supervisor: fausto,
    summary: "Study the personas that emerge when LLMs design themselves.",
    details: [FAUSTO_OPEN],
    categories: ["Alignment and RL"],
  },
  {
    id: "ai-poisoning-signatures",
    title: "Detecting AI poisoning at internet scale",
    supervisor: fausto,
    summary:
      "Can you tell, from high-level summaries of its text, whether a small simulated internet has been poisoned by AI-generated traces?",
    details: [FAUSTO_OPEN],
    categories: ["Security and privacy", "Societal"],
  },
  {
    id: "llm-theory-of-mind",
    title: "Do LLMs model each other's minds to coordinate?",
    supervisor: fausto,
    summary:
      "Study whether LLMs use theory of mind about each other when coordinating, and whether it differs from how they model human users.",
    details: [FAUSTO_OPEN],
    categories: ["Multi-agent", "Interpretability"],
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
  },
  {
    id: "llm-reward-values",
    title: "Using LLMs to align reward functions with moral values",
    supervisor: leon,
    summary:
      "Explore how LLMs themselves can improve reward functions and align them with different moral values.",
    details: ["RL on LLMs is compute-intensive, so the scope adapts to the resources available."],
    categories: ["Alignment and RL"],
  },
  {
    id: "xai-science-thesis",
    title: "Interpretability and AI safety for science (bring your project)",
    supervisor: ana,
    summary:
      "An open call: propose a project related to Ana's work on (mechanistic) interpretability, scientific machine learning and AI safety.",
    details: [
      "Ana leads the explainable AI for science lab at the University of Amsterdam. Get in touch with a specific project in mind related to her published topics.",
      "She primarily supervises MSc AI thesis projects, and is also open to ELLIS honours projects. The ELLIS honours programme is for excellent UvA MSc AI students.",
    ],
    categories: ["Interpretability"],
    /* Honours only: Ana takes only excellent UvA MSc AI students now
       (Project Hub team, 28 October 2026). */
    thesis: { university: "UvA", level: "MSc AI, honours" },
    format: "ELLIS honours project",
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
  },
  {
    id: "neuromorphic-security",
    title: "Security and privacy of neuromorphic systems",
    supervisor: fatih,
    summary: "Study the security and privacy of brain-inspired computing systems.",
    details: [],
    categories: ["Security and privacy"],
  },
  {
    id: "ai-security-testing",
    title: "AI-assisted security testing and vulnerability patching",
    supervisor: fatih,
    summary:
      "Use LLMs to test software and systems, discover vulnerabilities and patch them automatically.",
    details: [],
    categories: ["Security and privacy"],
  },
  {
    id: "autonomous-cyberdefence",
    title: "Autonomous cyberdefence with reinforcement learning",
    supervisor: fatih,
    summary: "Build autonomous reinforcement learning agents for cyberdefence.",
    details: [],
    categories: ["Security and privacy", "Alignment and RL"],
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
  },
  {
    id: "self-improving-agents",
    title: "Safety of recursively self-improving AI agents",
    supervisor: steven,
    summary:
      "Anything on developing and aligning self-improving agents: scalable oversight, debate, self-play, iterated distillation and amplification.",
    details: [STEVEN_OPEN],
    categories: ["Alignment and RL"],
  },
  {
    id: "steering",
    title: "Representation engineering and steering",
    supervisor: steven,
    summary:
      "Detect and steer safety-relevant behaviours in LLMs, for example with conceptors as steering matrices.",
    details: [STEVEN_OPEN],
    categories: ["Interpretability"],
  },
  {
    id: "hybrid-recurrent",
    title: "Inside hybrid transformer-recurrent models",
    supervisor: steven,
    summary:
      "Study recurrent and hybrid transformer-recurrent LLMs, including how they implement retrieval, in the mechanistic interpretability style of earlier AISIG projects.",
    details: [STEVEN_OPEN],
    categories: ["Interpretability"],
  },
  {
    id: "reward-hacking-rlvr",
    title: "Reward hacking in LLM agents trained on verifiable rewards",
    supervisor: emile,
    summary:
      "Study in which scenarios LLM agents trained with reinforcement learning from verifiable rewards (RLVR) learn to reward-hack, from an empirical or a theoretical angle.",
    details: [
      "RLVR brings marked gains in coding, mathematics and precise reasoning, but agents can also learn shortcuts that pass a reward in unexpected, possibly unsafe ways: because the reward is under-specified or even wrong, or because another solution passes it without proper understanding.",
      "A Master's thesis project at the Vrije Universiteit Amsterdam.",
    ],
    categories: ["Alignment and RL"],
    thesis: { university: "VU", level: "MSc" },
    /* Emile's agenda says "Project Reinforcement Learning"; the VU course is
       listed as "Projects on Reinforcement Learning". */
    lookingFor: "Students who have taken the VU course Projects on Reinforcement Learning, which this thesis requires",
  },
  {
    id: "aixi-safety",
    title: "AI safety in universal AI (AIXI)",
    supervisor: peter,
    summary:
      "AIXI is a mathematical model of a maximally intelligent AI, which makes it an interesting framework in which to study AI safety. Explore this direction with the VU and AIXI labs in London.",
    details: [
      "The topic is open and is decided together with the student(s); the AIXI labs website shows the sort of directions that are possible.",
      "A thesis at the Vrije Universiteit Amsterdam.",
    ],
    categories: ["Formal methods", "Alignment and RL"],
    thesis: { university: "VU" },
    lookingFor: "A strong aptitude for theoretical work, which is required; the course Reinforcement Learning is recommended",
    commitment: "Supervision from the VU, plus an hour a week from AIXI labs",
  },
];

/* The hero's numbers, counted from the same lists the page shows, so they
   always agree with the cards: projects open to applications (all but full
   ones), the supervisors with at least one of them, and the publications
   listed. */
export function projectHubStats() {
  const open = projects.filter(isOpenProject);
  return {
    openProjects: open.length,
    supervisors: new Set(open.map((project) => project.supervisor.name)).size,
    publications: publications.length,
  };
}
