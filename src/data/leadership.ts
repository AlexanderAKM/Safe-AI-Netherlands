/* The people on /about#team, in three groups. Ana is in two of them: she runs
   the Amsterdam chapter and is Head of Growth for SAIN as a whole, so each
   list names the role that list is about. */

export const leadership = [
  {
    name: "Alexander Müller",
    role: "Director SAIN",
    linkedin: "https://alexanderakm.github.io/",
    image: "/photos/team/Alexander.jpg",
  },
  {
    name: "Ana Paula Castillo Rodriguez",
    role: "Head of Growth SAIN",
    linkedin: "https://www.linkedin.com/in/ana-paula-casrod/",
    image: "/photos/team/Ana_resized.jpeg",
  },
  {
    name: "Marta Polizzi",
    role: "Head of Operations SAIN",
    linkedin: "https://www.linkedin.com/in/martapolizzi/",
    image: "/photos/team/Marta.jpg",
  },
  {
    name: "Tjebbe Boersma",
    role: "Head of Projects SAIN",
    linkedin: "https://www.linkedin.com/in/tjebbe-hylke-boersma/",
    image: "/photos/team/Tjebbe.jpeg",
  },
] as const;

export const chapterDirectors = [
  {
    name: "Tarteel Mohamed",
    role: "Chapter Director, Groningen",
    linkedin: "https://www.linkedin.com/in/tarteel-mohamed-8918aa2a7/",
    image: "/photos/team/Tarteel_Mohamed.jpg",
  },
  {
    name: "Ana Paula Castillo Rodriguez",
    role: "Chapter Director, Amsterdam",
    linkedin: "https://www.linkedin.com/in/ana-paula-casrod/",
    image: "/photos/team/Ana_resized.jpeg",
  },
  {
    name: "Riccardo Campanella",
    role: "Chapter Director, Utrecht",
    linkedin: "https://www.linkedin.com/in/riccardo-campanella/",
    image: "/photos/team/Riccardo_resized.jpeg",
  },
] as const;

/* The foundation's board. Each tile carries the person's own affiliation, as
   the advisory board's do. Richard's photo stays in advisory_board/, where it
   was first added. */
export const board = [
  {
    name: "Alexander Müller",
    role: "Director SAIN",
    linkedin: "https://alexanderakm.github.io/",
    image: "/photos/team/Alexander.jpg",
  },
  {
    name: "Richard Rushby",
    role: "Director, The Entrepreneurial Ecosystem",
    linkedin: "https://www.linkedin.com/in/richardrushby/",
    image: "/photos/advisory_board/Richard.png",
  },
  {
    name: "Joris Postmus",
    role: "AI Researcher & Developer; Co-founder, AISIG",
    linkedin: "https://www.linkedin.com/in/jorispostmus/",
    image: "/photos/team/Joris_Postmus.png",
  },
] as const;
