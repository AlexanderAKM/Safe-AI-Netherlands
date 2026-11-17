/**
 * SAIN Amsterdam organiser roster (name + role).
 * Advisory Board members are listed inline at the bottom, matching the
 * Groningen pattern in `aisigTeam.ts`. A role is a key: its title, in each
 * language, is under `team.roles` in messages/<locale>/chapters.json.
 */
export const sainAmsTeam = [
  { name: "Ana Paula Castillo Rodriguez", role: "director" },
  { name: "Satchit Chatterji", role: "researchOperationLead" },
  { name: "Michele Vannucci", role: "researchOperationVu" },
  { name: "Prabhnoor Kohli", role: "educationLead" },
  { name: "Elina Kramers", role: "communicationsLead" },
  { name: "Duje Vukovac", role: "discussionGroupFacilitator" },
  { name: "Fiona Melzer", role: "discussionGroupFacilitator" },
  { name: "Luan Fletcher", role: "discussionGroupFacilitator" },
  { name: "Monika Stewart", role: "discussionGroupFacilitator" },
  { name: "Henning Bartsch", role: "advisoryBoard" },
  { name: "Leonard Bereska", role: "advisoryBoard" },
  { name: "Zoe Tzifa-Kratira", role: "advisoryBoard" },
] as const;
