/* The archive is a record: titles, dates and announcements stay as the
   chapter published them, in English. The English page prints `date` and
   `time` as written; every other language prints `start` and `end` its own
   way (messages/<locale>/chapters.json, groningenEvents.event.when). Give a
   new entry both. */
export type GroningenArchivedEvent = {
  title: string;
  /** As announced: "Wednesday, July 1, 2026", or the whole span
   *  ("Fri, Mar 20, 2026 12:00 PM Sun, Mar 22, 2026 8:00 PM") when `time`
   *  is empty. */
  date: string;
  /** As announced: "6:00 PM 10:00 PM". */
  time: string;
  /** Local time, ISO `YYYY-MM-DDTHH:mm`. */
  start: string;
  /** Local time, ISO `YYYY-MM-DDTHH:mm`; the same day as `start` unless the
   *  event ran over several. */
  end: string;
  description: string;
  image: string;
  academicYear: "2025-2026" | "2024-2025" | "2023-2024";
};

export const groningenEventsArchive: GroningenArchivedEvent[] = [
  {
    title: "Closing Ceremony",
    date: "Wednesday, July 1, 2026",
    time: "6:00 PM 10:00 PM",
    start: "2026-07-01T18:00",
    end: "2026-07-01T22:00",
    description:
      "The closing ceremony of the 2025-2026 year: a privately catered, fully vegetarian rooftop barbecue at BOOVN, bringing the whole SAIN Groningen community together one last time before the summer.",
    image:
      "/photos/events/archive/archive-30.jpg",
    academicYear: "2025-2026",
  },
  {
    title: "AI Safety, Ethics and Society Graduation",
    date: "Wednesday, April 29, 2026",
    time: "5:00 PM 6:30 PM",
    start: "2026-04-29T17:00",
    end: "2026-04-29T18:30",
    description:
      "Looking forward to bringing all cohorts together for a casual evening of networking!",
    image:
      "/photos/events/archive/archive-01.png",
    academicYear: "2025-2026",
  },
  {
    title: "AI Safety Talk by Fatih Turkmen",
    date: "Monday, April 13, 2026",
    time: "6:00 PM 8:00 PM",
    start: "2026-04-13T18:00",
    end: "2026-04-13T20:00",
    description:
      "Join us for the second edition of AISIG’s professional talk series, featuring Fatih Turkmen, Associate Professor of Computer Science at the University of Groningen. Working at the intersection of security, privacy, and machine learning, he will explore how modern AI systems can be made both powerful and privacy-preserving.",
    image:
      "/photos/events/archive/archive-02.png",
    academicYear: "2025-2026",
  },
  {
    title: "AI Control Hackathon",
    date: "Fri, Mar 20, 2026 12:00 PM Sun, Mar 22, 2026 8:00 PM",
    time: "",
    start: "2026-03-20T12:00",
    end: "2026-03-22T20:00",
    description:
      "AI Control Hackathon: a 3-day event where students, researchers, engineers, and curious minds collaborate to tackle one of the biggest challenges in tech: keeping humans in control of powerful AI systems.",
    image:
      "/photos/events/archive/archive-03.png",
    academicYear: "2025-2026",
  },
  {
    title: "AI Safety, Ethics and Society Graduation Ceremony",
    date: "Tuesday, March 10, 2026",
    time: "6:00 PM 8:00 PM",
    start: "2026-03-10T18:00",
    end: "2026-03-10T20:00",
    description:
      "Celebrating the first graduates of 2026 from the AI Safety, Ethics and Society Course!",
    image:
      "/photos/events/archive/archive-04.jpeg",
    academicYear: "2025-2026",
  },
  {
    title: "TedXBroerstraat",
    date: "Friday, February 27, 2026",
    time: "2:00 PM 9:30 PM",
    start: "2026-02-27T14:00",
    end: "2026-02-27T21:30",
    description:
      "TEDxBroerstraat is a nonprofit, student-led initiative inspired by Broerstraat, the historic heart of Groningen, where stories, culture, and ideas have intersected for generations. The conference theme “Memory” explores how the past shapes our identity, how psychology, biology, technology, and other disciplines influence the way we remember, and how shared experiences strengthen communities.",
    image:
      "/photos/events/archive/archive-05.webp",
    academicYear: "2025-2026",
  },
  {
    title: "AI Safety Talk with Tekla Emborg",
    date: "Wednesday, February 11, 2026",
    time: "6:30 PM 8:00 PM",
    start: "2026-02-11T18:30",
    end: "2026-02-11T20:00",
    description:
      "AI Safety Talk with Tekla Emborg, an EU Policy Researcher at the Future of Life Institute, to discuss EU AI regulation and governance.",
    image:
      "/photos/events/archive/archive-06.jpeg",
    academicYear: "2025-2026",
  },
  {
    title: "Defence Acceleration Hackathon",
    date: "Fri, Nov 21, 2025 12:00 PM Sun, Nov 23, 2025 8:30 PM",
    time: "",
    start: "2025-11-21T12:00",
    end: "2025-11-23T20:30",
    description:
      "The biggest hackathon of the year is here!\n\nJoin AISIG’s Defensive Acceleration Hackathon for a weekend of research, building, and real-world impact.\n\nEngineers, Lawyers, Researchers, Developers and more: if you believe defense should move as fast as offense, this is where we start building the proof.",
    image:
      "/photos/events/archive/archive-07.png",
    academicYear: "2025-2026",
  },
  {
    title: "AI Safety, Ethics and Society Course Graduation",
    date: "Wednesday, November 12, 2025",
    time: "6:00 PM 9:30 PM",
    start: "2025-11-12T18:00",
    end: "2025-11-12T21:30",
    description:
      "Congratulations to our graduates from the AI Safety, Ethics and Society Course! We’re very proud to say that they are our first graduating cohort of the academic year. If you are interested in joining our next course iterations, check out the “Get Involved” > “Courses” section of our website.",
    image:
      "/photos/events/archive/archive-08.jpeg",
    academicYear: "2025-2026",
  },
  {
    title: "AISIG AI Forecasting & Timeline Models Hackathon",
    date: "Fri, Oct 31, 2025 5:00 AM Sun, Nov 2, 2025 6:00 AM",
    time: "",
    start: "2025-10-31T05:00",
    end: "2025-11-02T06:00",
    description:
      "The trajectory of AI development represents one of the most consequential questions for humanity's future. Understanding when and how transformative AI capabilities will emerge is critical for policy, safety research, and societal preparedness. Yet current forecasting methods struggle with unprecedented technological shifts, compounding uncertainties, and the challenge of predicting emergent capabilities.",
    image:
      "/photos/events/archive/archive-09.png",
    academicYear: "2025-2026",
  },
  {
    title: "AISIG Pub Quiz",
    date: "Wednesday, October 8, 2025",
    time: "5:00 PM 6:00 PM",
    start: "2025-10-08T17:00",
    end: "2025-10-08T18:00",
    description:
      "The first AISIG pub quiz was a success! Teams tackled rounds on AI history & news, AI safety, AI governance, and Dutch student culture, bringing plenty of energy and teamwork to the game.",
    image:
      "/photos/events/archive/archive-10.jpg",
    academicYear: "2025-2026",
  },
  {
    title: "AI Safety Chat",
    date: "Wednesday, September 24, 2025",
    time: "6:00 PM 6:00 PM",
    start: "2025-09-24T18:00",
    end: "2025-09-24T18:00",
    description:
      "The topic of this AISIG Safety Chat: Could AI contribute to the irreversible destruction of humanity’s long-term potential, with not just local harms, but outcomes that could permanently curtail or end human civilization?",
    image:
      "/photos/events/archive/archive-11.jpeg",
    academicYear: "2025-2026",
  },
  {
    title: "CBRN AI Risks Sprint",
    date: "Fri, Sep 12, 2025 5:00 PM Sun, Sep 14, 2025 10:00 PM",
    time: "",
    start: "2025-09-12T17:00",
    end: "2025-09-14T22:00",
    description:
      "A weekend of collaboration, problem-solving, and networking focused on addressing AI risks in Chemical, Biological, Radiological, and Nuclear (CBRN) Contexts!",
    image:
      "/photos/events/archive/archive-12.jpeg",
    academicYear: "2025-2026",
  },
  {
    title: "Intro Social",
    date: "Wednesday, September 10, 2025",
    time: "6:00 PM 8:30 PM",
    start: "2025-09-10T18:00",
    end: "2025-09-10T20:30",
    description:
      "Thank you to everyone who came to the first AISIG social event of the new opening year.",
    image:
      "/photos/events/archive/archive-13.jpeg",
    academicYear: "2025-2026",
  },
  {
    title: "End-of-year Social",
    date: "Saturday, June 14, 2025",
    time: "6:30 PM 9:30 PM",
    start: "2025-06-14T18:30",
    end: "2025-06-14T21:30",
    description:
      "Celebrate the close of our AI Safety, Ethics & Society course at the End-of-Year Social! Join fellow learners and the wider AISIG community for an evening of relaxed networking, lively discussions, and a slice (or two) of pizza.",
    image:
      "/photos/events/archive/archive-14.jpeg",
    academicYear: "2024-2025",
  },
  {
    title: "AI Safety Chats: Autonomous Weapons & AI in the Military",
    date: "Sunday, May 18, 2025",
    time: "7:00 PM 10:00 PM",
    start: "2025-05-18T19:00",
    end: "2025-05-18T22:00",
    description:
      "Connect with fellow AI-safety enthusiasts at our next AISIG Safety Chat! We’ll gather for an informal, thought-provoking discussion on Autonomous Weapons & AI in the Military, from civilian risk and accountability to the future role of human soldiers.",
    image:
      "/photos/events/archive/archive-15.jpg",
    academicYear: "2024-2025",
  },
  {
    title: "AISIG Social",
    date: "Wednesday, April 30, 2025",
    time: "6:30 PM 9:00 PM",
    start: "2025-04-30T18:30",
    end: "2025-04-30T21:00",
    description:
      "Connect with fellow AI Safety enthusiasts at our AISIG Course Social! Join us for an evening of casual networking and engaging discussions over pizza at Lust. Meet students from across cohorts and connect with the broader AISIG team in a relaxed setting.",
    image:
      "/photos/events/archive/archive-16.jpeg",
    academicYear: "2024-2025",
  },
  {
    title: "AI Safety Chats: The Future of AI Governance",
    date: "Wednesday, April 23, 2025",
    time: "7:00 PM 9:30 PM",
    start: "2025-04-23T19:00",
    end: "2025-04-23T21:30",
    description:
      "Join the AISIG AI Safety Talks! Engage in an open discussion on critical AI safety questions. Enjoy thought-provoking conversations over a delicious meal at The O'Ceallaigh Traditional Music Bar.",
    image:
      "/photos/events/archive/archive-17.jpeg",
    academicYear: "2024-2025",
  },
  {
    title: "Hackathon: Women in AI Safety",
    date: "Fri, Mar 7, 2025 5:30 PM Sun, Mar 9, 2025 7:00 PM",
    time: "",
    start: "2025-03-07T17:30",
    end: "2025-03-09T19:00",
    description:
      "Shape the future of safe and ethical AI development! Whether you're a researcher, developer, policy enthusiast, or new to AI safety - join us for an empowering weekend of innovation and collaboration. No prior AI safety experience required. Together, we can build the foundational tools and frameworks needed for responsible AI development.",
    image:
      "/photos/events/archive/archive-18.jpg",
    academicYear: "2024-2025",
  },
  {
    title: "AI Safety Chats: AI and the future of work!",
    date: "Wednesday, March 5, 2025",
    time: "7:00 PM 9:30 PM",
    start: "2025-03-05T19:00",
    end: "2025-03-05T21:30",
    description:
      "Join the AISIG AI Safety Talks! Engage in an open discussion on critical AI safety questions. Enjoy thought-provoking conversations over a delicious meal at The O'Ceallaigh Traditional Music Bar.",
    image:
      "/photos/events/archive/archive-19.jpg",
    academicYear: "2024-2025",
  },
  {
    title: "AISIG Social",
    date: "Wednesday, February 26, 2025",
    time: "6:30 PM 9:00 PM",
    start: "2025-02-26T18:30",
    end: "2025-02-26T21:00",
    description:
      "Connect with fellow AI Safety enthusiasts at our AISIG Course Social! Join us for an evening of casual networking and engaging discussions over pizza at Lust. Meet students from across cohorts and connect with the broader AISIG team in a relaxed setting.",
    image:
      "/photos/events/archive/archive-16.jpeg",
    academicYear: "2024-2025",
  },
  {
    title: "Vivatam X AISIG (AI Safety Talks)",
    date: "Sunday, January 12, 2025",
    time: "6:25 PM 10:00 PM",
    start: "2025-01-12T18:25",
    end: "2025-01-12T22:00",
    description:
      "Join the AISIG x Vivatam AI Safety Dinner! Engage in an open discussion on critical AI safety questions, from bias and trust to life-or-death decisions. Enjoy thought-provoking conversations over a delicious meal at The Literary Café!",
    image:
      "/photos/events/archive/archive-20.jpg",
    academicYear: "2024-2025",
  },
  {
    title: "Pubquiz: AISIG X Cover",
    date: "Wednesday, December 11, 2024",
    time: "8:00 PM 10:00 PM",
    start: "2024-12-11T20:00",
    end: "2024-12-11T22:00",
    description:
      "Put your AI knowledge to the test at the AISIG x Cover Pub Quiz! Dive into fun trivia about AI theory, news, and safety, connect with fellow enthusiasts, and compete for exciting prizes.",
    image:
      "/photos/events/archive/archive-21.png",
    academicYear: "2024-2025",
  },
  {
    title: "Hackathon: Reprogramming AI Models",
    date: "Fri, Nov 22, 2024 3:30 PM Sun, Nov 24, 2024 11:55 PM",
    time: "",
    start: "2024-11-22T15:30",
    end: "2024-11-24T23:55",
    description:
      "Join us for a weekend of exploration and innovation as we dive into the fascinating world of AI interpretability and feature manipulation. Work alongside experts to analyze model internals, build tools, and create visualizations that make AI systems more transparent and reliable. This is your chance to contribute to cutting-edge research, expand your professional network, and gain hands-on experience with advanced tools and techniques that could shape your career in AI!",
    image:
      "/photos/events/archive/archive-22.png",
    academicYear: "2024-2025",
  },
  {
    title: "Hackathon: AI Policy",
    date: "Sun, Oct 27, 2024 11:55 PM Mon, Oct 28, 2024 12:55 AM",
    time: "",
    start: "2024-10-27T23:55",
    end: "2024-10-28T00:55",
    description:
      "Join us for a weekend of collaboration, problem-solving, and networking as you tackle real-world AI policy challenges. Submit a policy paper or tech product, expand your professional network, and explore new career paths!",
    image:
      "/photos/events/archive/archive-23.png",
    academicYear: "2024-2025",
  },
  {
    title: "Hackathon: AI Security Evaluations",
    date: "Fri, May 24, 2024 6:00 PM Sun, May 26, 2024 11:00 PM",
    time: "",
    start: "2024-05-24T18:00",
    end: "2024-05-26T23:00",
    description:
      "Join us for an exciting weekend of collaboration and innovation at our upcoming AI Security Hackathon! In AI security, benchmarks assess the robustness, transparency, and alignment of AI models, ensuring their safety and reliability.",
    image:
      "/photos/events/archive/archive-24.png",
    academicYear: "2023-2024",
  },
  {
    title: "Hackathon : AI and Democracy",
    date: "Fri, May 3, 2024 7:00 PM Sun, May 5, 2024 10:00 PM",
    time: "",
    start: "2024-05-03T19:00",
    end: "2024-05-05T22:00",
    description:
      "Despite the many potential benefits of the technology (such as equalizing opportunity, creating wealth, and improving coordination), we are also facing significant risks from AI. Together, we will be hacking away to demonstrate and mitigate the challenges that arise in the meeting between AI and democracy, while trying to project these risks into the future.",
    image:
      "/photos/events/archive/archive-25.png",
    academicYear: "2023-2024",
  },
  {
    title: "AISIG Barbecue Social",
    date: "Thursday, April 11, 2024",
    time: "6:00 PM 9:00 PM",
    start: "2024-04-11T18:00",
    end: "2024-04-11T21:00",
    description:
      "Join us at the AISIG BBQ Social on April 11th, 2024. This evening is set aside for engaging discussions on AI safety and ethics, sparked by recent global initiatives in AI development. It’s an opportunity for those interested in the future of AI to connect, exchange thoughts, and enjoy some good food.",
    image:
      "/photos/events/archive/archive-26.jpg",
    academicYear: "2023-2024",
  },
  {
    title: "Regulating New Surveillance Technologies at Work",
    date: "Monday, February 19, 2024",
    time: "5:00 PM 7:00 PM",
    start: "2024-02-19T17:00",
    end: "2024-02-19T19:00",
    description:
      "In collaboration with Panoptiwork and STeP. Sandy Gould from the University of Cardiff will delve into the evolution of surveillance technologies, challenging the traditional critiques by highlighting the modern changes in workplace measurement. Following him, Michele Molè from the University of Groningen will address the legal implications within the EU, aiming to protect workers' privacy and rights.",
    image:
      "/photos/events/archive/archive-27.png",
    academicYear: "2023-2024",
  },
  {
    title: "AI Safety Talk - University of Groningen AI Programme Lustrum",
    date: "Thursday, November 2, 2023",
    time: "11:00 AM 12:00 PM",
    start: "2023-11-02T11:00",
    end: "2023-11-02T12:00",
    description:
      "Join us on Day 1 of Cover & the RuG's AI Programme Lustrum where Max Kearney from AISIG will give a presentation on AI Safety. If you missed our earlier talk at the OpenAI event or are looking to deepen your understanding of this crucial field, this is a good opportunity to do so. We hope to see you at the Martini Plaza! There will also be free food and drinks (entrance is also free)",
    image:
      "/photos/events/archive/archive-28.jpg",
    academicYear: "2023-2024",
  },
  {
    title: "Applications for our Technical and Governance AI Safety courses have opened",
    date: "Sun, Oct 1, 2023 6:30 PM Mon, Oct 30, 2023 11:55 PM",
    time: "",
    start: "2023-10-01T18:30",
    end: "2023-10-30T23:55",
    description:
      "Following the success of last year's technical course, we're excited to offer renewed opportunities for students to participate in our Technical and Governance AI Safety courses, this academic year (block 1b)! These free 8-week courses (~4hr/week) are packed with expert-curated content",
    image:
      "/photos/events/archive/archive-29.jpg",
    academicYear: "2023-2024",
  },
];

export const groningenEventYears = ["2026", "2025", "2024", "2023"] as const;
