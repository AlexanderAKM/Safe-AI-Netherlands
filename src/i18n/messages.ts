import type { Locale } from "./routing";

import enAbout from "../../messages/en/about.json";
import enChapters from "../../messages/en/chapters.json";
import enCommon from "../../messages/en/common.json";
import enCommunity from "../../messages/en/community.json";
import enContact from "../../messages/en/contact.json";
import enCourses from "../../messages/en/courses.json";
import enGetInvolved from "../../messages/en/getInvolved.json";
import enHome from "../../messages/en/home.json";
import enNewChapters from "../../messages/en/newChapters.json";
import enOpenPositions from "../../messages/en/openPositions.json";
import enProjectHub from "../../messages/en/projectHub.json";
import enTeam from "../../messages/en/team.json";

import nlAbout from "../../messages/nl/about.json";
import nlChapters from "../../messages/nl/chapters.json";
import nlCommon from "../../messages/nl/common.json";
import nlCommunity from "../../messages/nl/community.json";
import nlContact from "../../messages/nl/contact.json";
import nlCourses from "../../messages/nl/courses.json";
import nlGetInvolved from "../../messages/nl/getInvolved.json";
import nlHome from "../../messages/nl/home.json";
import nlNewChapters from "../../messages/nl/newChapters.json";
import nlOpenPositions from "../../messages/nl/openPositions.json";
import nlProjectHub from "../../messages/nl/projectHub.json";
import nlTeam from "../../messages/nl/team.json";

/* One file per namespace per language, in messages/<locale>/<namespace>.json.
   A namespace is a section of the site; the README's "Languages" section
   says which page reads which. `npm run i18n:check` fails when the English
   and Dutch files stop having the same keys.

   Import this from server code only (request.ts). Client components get just
   the namespaces they need through <ClientMessages>, so a page never ships
   every dictionary to the browser. */

type Messages = Record<string, unknown>;

const en: Messages = {
  about: enAbout,
  chapters: enChapters,
  common: enCommon,
  community: enCommunity,
  contact: enContact,
  courses: enCourses,
  getInvolved: enGetInvolved,
  home: enHome,
  newChapters: enNewChapters,
  openPositions: enOpenPositions,
  projectHub: enProjectHub,
  team: enTeam,
};

const nl: Messages = {
  about: nlAbout,
  chapters: nlChapters,
  common: nlCommon,
  community: nlCommunity,
  contact: nlContact,
  courses: nlCourses,
  getInvolved: nlGetInvolved,
  home: nlHome,
  newChapters: nlNewChapters,
  openPositions: nlOpenPositions,
  projectHub: nlProjectHub,
  team: nlTeam,
};

const byLocale: Record<Locale, Messages> = { en, nl };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/* English underneath, the translation on top. A key the Dutch file lacks, or
   leaves empty, reads in English instead of printing the raw key. Arrays are
   replaced whole: a list is translated as a list. */
function withFallback(base: unknown, override: unknown): unknown {
  if (override === undefined || override === null || override === "") return base;
  if (isPlainObject(base) && isPlainObject(override)) {
    const merged: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(override)) {
      merged[key] = withFallback(base[key], value);
    }
    return merged;
  }
  return override;
}

/* The keys withFallback fills in from English: missing from the translation,
   or left empty. Lists count as translated when present, as above. */
function untranslatedKeys(base: unknown, override: unknown, path = ""): string[] {
  if (override === undefined || override === null || override === "") {
    return base === "" ? [] : [path];
  }
  if (isPlainObject(base) && isPlainObject(override)) {
    return Object.keys(base).flatMap((key) =>
      untranslatedKeys(base[key], override[key], path ? `${path}.${key}` : key),
    );
  }
  return [];
}

const cache = new Map<Locale, Messages>();

export function loadMessages(locale: Locale): Messages {
  const cached = cache.get(locale);
  if (cached) return cached;
  const messages =
    locale === "en" ? en : (withFallback(en, byLocale[locale]) as Messages);
  // In development, say once per language which texts show in English
  // because they are not translated yet. `npm run i18n:check` lists the same.
  if (locale !== "en" && process.env.NODE_ENV === "development") {
    const gaps = untranslatedKeys(en, byLocale[locale]);
    if (gaps.length) {
      console.warn(
        `[i18n] ${gaps.length} text${gaps.length === 1 ? "" : "s"} not translated into "${locale}" yet, shown in English:\n` +
          gaps.map((key) => `  ${key}`).join("\n"),
      );
    }
  }
  cache.set(locale, messages);
  return messages;
}
