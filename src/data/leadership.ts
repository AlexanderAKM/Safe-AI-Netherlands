/* The people on /about#team, in three groups. Ana is in two of them: she runs
   the Amsterdam chapter and is Head of Growth for SAIN as a whole, so each
   list names the role that list is about.

   Names are the same in every language. A role is text, so `roleKey` names it
   under team.roles in messages/<locale>/about.json. */

export const leadership = [
  {
    name: "Alexander Müller",
    roleKey: "director",
    linkedin: "https://alexanderakm.github.io/",
    image: "/photos/team/Alexander.jpg",
  },
  {
    name: "Ana Paula Castillo Rodriguez",
    roleKey: "headOfGrowth",
    linkedin: "https://www.linkedin.com/in/ana-paula-casrod/",
    image: "/photos/team/Ana_resized.jpeg",
  },
  {
    name: "Marta Polizzi",
    roleKey: "headOfOperations",
    linkedin: "https://www.linkedin.com/in/martapolizzi/",
    image: "/photos/team/Marta.jpg",
  },
  {
    name: "Tjebbe Boersma",
    roleKey: "headOfProjects",
    linkedin: "https://www.linkedin.com/in/tjebbe-hylke-boersma/",
    image: "/photos/team/Tjebbe.jpeg",
  },
] as const;

export const chapterDirectors = [
  {
    name: "Tarteel Mohamed",
    roleKey: "chapterDirectorGroningen",
    linkedin: "https://www.linkedin.com/in/tarteel-mohamed-8918aa2a7/",
    image: "/photos/team/Tarteel_Mohamed.jpg",
  },
  {
    name: "Ana Paula Castillo Rodriguez",
    roleKey: "chapterDirectorAmsterdam",
    linkedin: "https://www.linkedin.com/in/ana-paula-casrod/",
    image: "/photos/team/Ana_resized.jpeg",
  },
  {
    name: "Riccardo Campanella",
    roleKey: "chapterDirectorUtrecht",
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
    roleKey: "director",
    linkedin: "https://alexanderakm.github.io/",
    image: "/photos/team/Alexander.jpg",
  },
  {
    name: "Richard Rushby",
    roleKey: "entrepreneurialEcosystemDirector",
    linkedin: "https://www.linkedin.com/in/richardrushby/",
    image: "/photos/advisory_board/Richard.png",
  },
  {
    name: "Joris Postmus",
    roleKey: "aisigCofounder",
    linkedin: "https://www.linkedin.com/in/jorispostmus/",
    image: "/photos/team/Joris_Postmus.png",
  },
] as const;
