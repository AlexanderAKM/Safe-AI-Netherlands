# Translating the SAIN website into Dutch

Thank you for translating the Safe AI Netherlands website. This folder holds every
piece of text on the site, in English. Please send back the same files in Dutch.

## What is in this folder

| File | What it is | Send back as |
|---|---|---|
| `en.json` | The words on every page: headings, paragraphs, buttons, menus, page titles and descriptions for search engines | `nl.json` |
| `content.en.json` | Open positions, the call for new chapters' starting teams, course application notes, paper summaries | `content.nl.json` |
| `documents/*.md` | The three documents under About: vision, theory of change, code of conduct | the same file names, in Dutch |

## What is not in this folder

Some text on the site is left out on purpose and stays in English on the Dutch
pages. You don't need to translate it:

- **Event listings.** The past and upcoming events of Amsterdam and Utrecht (from
  Luma) and the Groningen events archive are the announcements as they went out.
- **The Project Hub's project list.** It comes from SAIN's project database
  (Airtable) and stays English. So do the backup project cards shown when that
  list cannot load.
- **Papers.** Paper titles, authors, venues and the PDFs themselves.
- **Names and titles.** People's names, role titles, the job titles of board
  members, advisors and supervisors, and course and track names (see "Keep in
  English" below).
- **Roles that are not advertised now.** Only open positions are included. When a
  new role opens, or a closed one reopens, its text comes to you in a later update.
- **Course application notes that have expired.** Only the notes the site shows
  today are included.

If you come across English text in the Dutch version, now or later, that is not on
this list, please tell us. It may have been missed.

## How to edit the JSON files

The JSON files are lists of `"key": "text"` pairs. Translate **only the text on
the right**. Leave everything else exactly as it is:

- **Keys** (the part before the colon) stay in English: `"heading": "Dit is de kop"`.
- **Quotation marks, commas, colons and brackets** stay where they are. A missing comma
  breaks the file. A JSON-aware editor (VS Code, or an online JSON validator) will
  point out mistakes.
- **Lists** in square brackets `[ ... ]` keep the same number of items, in the same order.
- Write quotation marks inside a text as typographic quotes (“ ” ‘ ’), or as `\"`.
  A plain `"` ends the text early.

Two kinds of markers appear inside texts. Keep them, and translate around them:

- **`<tag>words</tag>`** marks words that become a link, bold text and so on. Keep
  the tags with the same names, and put them around the Dutch words that mean the
  same thing. The tag may move within the sentence.
  `"Read the <link>handbook</link> first."` → `"Lees eerst het <link>handboek</link>."`
- **`{name}`** is filled in by the website: a date, a number, a list of cities, an
  email address. Keep it exactly as written, untranslated, and place it where the Dutch
  sentence needs it.
  `"Apply by {deadline}."` → `"Solliciteer vóór {deadline}."`

Some texts are joined on the page. For example, `beforeEmail` and `afterEmail`
are the two halves of one sentence with an email address in between, and a few
texts are a phrase that goes into another text's `{placeholder}`. Where a text
looks like a fragment, check the key names next to it; they usually say how it is used.

Some pieces of text are the same in several places (for example the location of the
starting-team roles). Please translate them the same way each time.

## Tone

The site speaks to students and young professionals, directly and plainly. Please
use **je/jij**, not u. Keep sentences short and concrete, as the English does.
Use Dutch date formats (“16 november 2026”).

## Keep in English

These stay as they are in the Dutch text. If you think one of them should be
translated after all, or that something else belongs on this list, please tell us.

**Names.** Safe AI Netherlands, SAIN, SAIN Amsterdam / Groningen / Utrecht, and
the Project Hub. People's names. City names stay too, but use the Dutch name where
there is one: The Hague becomes Den Haag.

**Role titles.** SAIN's role titles stay in English everywhere, also inside
sentences: “Je werkt samen met de Communications Lead.” The list is at the end
of this file. The job titles of board members, advisors and supervisors stay
English too.

**Course and track names.** The names of courses and tracks, listed at the end of
this file, stay in English. The descriptions of their modules are translated.

**Organisations, platforms and events.** BlueDot, ARENA, MATS, Apart Research, Discord, Substack, LinkedIn, Luma, Airtable, Google Forms,
arXiv, OpenReview, NeurIPS, ICLR, ELLIS, Brainport, ASML, The Hague Security
Delta (HSD), TU/e, TU Delft, VU, UvA. Universities with an official Dutch name take it:
University of Groningen becomes Rijksuniversiteit Groningen.

**Paper titles and conference names**, for example “The Anatomy of Alignment” or
“NeurIPS 2025 workshop”.

**AI terms that Dutch speakers in the field use in English.** We suggest keeping:
AI safety, alignment, interpretability (and mechanistic interpretability),
evaluations / evals, benchmark, prompt injection, LLM, reinforcement learning
(RL), multi-agent, frontier AI, agentic AI, sandboxing, compute, hackathon. You know the Dutch usage better than
we do: where a Dutch word is common (for example “AI-veiligheid” in general
writing), tell us and we will decide together. Follow Dutch spelling for compounds
with English words (“AI safety-cursus”, “alignmentonderzoek”).

**Words to choose once and keep using.** *chapter* (a SAIN city group), *course*,
*cohort*, *facilitator*, *discussion group*, *starting team*. Please pick one Dutch
word (or keep the English) for each, use it throughout, and tell us what you chose.

## Questions

If something is unclear, a sentence needs context, or the English looks wrong,
please ask Sofia. It is better to ask than to guess.
