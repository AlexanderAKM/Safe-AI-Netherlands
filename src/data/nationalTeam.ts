/**
 * National (cross-chapter) roles that are neither Leadership nor Advisory Board.
 * Rendered on `/about#national-team`.
 *
 * `image` and `link` are optional: without an image the card falls back to
 * initials (same as the Advisory Board cards), and without a link it renders as
 * a plain tile instead of an anchor.
 *
 * Portraits live in `public/photos/national_team/` and are referenced here as
 * `/photos/national_team/<file>`, cropped 4:5 to match the other people cards.
 */
export type NationalTeamMember = {
  name: string;
  role: string;
  link?: string;
  image?: string;
};

export const nationalTeam: NationalTeamMember[] = [
  {
    name: "Sofia Kostakonti",
    role: "Website Developer",
    link: "https://www.linkedin.com/in/sofia-kostakonti/",
    image: "/photos/national_team/Sofia.jpg",
  },
];
