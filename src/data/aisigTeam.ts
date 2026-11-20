/**
 * SAIN Groningen organiser roster (name + role), as confirmed by the chapter
 * in September 2026. The file keeps its AISIG name because the chapter page
 * imports it under that name; the people on it are the current SAIN
 * Groningen team. A role is a key: its title, in each language, is under
 * `team.roles` in messages/<locale>/chapters.json.
 */
export const aisigTeam = [
  { name: "Tarteel Mohamed", role: "director" },
  { name: "Stan Feguson", role: "educationLead" },
  { name: "Tiwai Mhundwa", role: "eventsLead" },
  { name: "Aleksandar Todorov", role: "researchOperations" },
  { name: "Maria Ptaszek", role: "communityManager" },
  { name: "Hristo Karagyozov", role: "eventsTeamMember" },
  { name: "Anna Mikhailova", role: "eventsTeamMember" },
  { name: "Davide Zani", role: "advisoryBoard" },
  { name: "Mariam Ibrahim", role: "advisoryBoard" },
] as const;
