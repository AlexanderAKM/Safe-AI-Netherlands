import type { MetadataRoute } from "next";

const siteUrl = "https://safeainetherlands.org";

const routes = [
  "",
  "/about",
  "/research",
  "/team",
  "/get-involved",
  "/contact",
  "/chapters/groningen",
  "/chapters/groningen/events",
  "/chapters/utrecht",
  "/chapters/amsterdam",
  "/research/handbook",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route, index) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
