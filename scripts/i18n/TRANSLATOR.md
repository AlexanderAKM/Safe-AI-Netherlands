# Reviewing the Dutch translation of the SAIN website

Thank you for working on the Safe AI Netherlands website. Every piece of text on the
site has been translated into Dutch by AI, as a first draft. Your job is to review
and correct that draft so it reads as good, natural Dutch and says exactly what the
English says. Nobody at SAIN reads Dutch, so you have the final word on the Dutch.

Start with `NOTES.md`: it lists every point where the draft had to guess, with the
choice it made and the alternative. Please settle each one, and add a line to
`NOTES.md` wherever you changed a choice that applies across the site (a term, the
form of address), so we can keep to it in future updates.

## What is in this folder

| File | What it is | Send back |
|---|---|---|
| `review.csv` | Every text side by side: key, English, Dutch draft. Opens in Excel; easiest for reading through | not needed |
| `nl.json` | The Dutch draft of the words on every page: headings, paragraphs, buttons, menus, page titles and descriptions for search engines (English: `en.json`) | corrected |
| `content.nl.json` | The Dutch draft of the open positions, the call for new chapters' starting teams, course application notes and paper summaries (English: `content.en.json`) | corrected |
| `documents/nl/*.md` | The Dutch draft of the three documents under About: vision, theory of change, code of conduct (English: `documents/en/`) | corrected |
| `NOTES.md` | The draft's open questions | with your answers |

Make your corrections in the `.json` and `.md` files themselves; `review.csv` is
only for reading, and changes to it are not used.

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

The JSON files are lists of `"key": "text"` pairs. Change **only the text on
the right**. Leave everything else exactly as it is:

- **Keys** (the part before the colon) stay in English: `"heading": "Dit is de kop"`.
- **Quotation marks, commas, colons and brackets** stay where they are. A missing comma
  breaks the file. A JSON-aware editor (VS Code, or an online JSON validator) will
  point out mistakes.
- **Lists** in square brackets `[ ... ]` keep the same number of items, in the same order.
- Write quotation marks inside a text as typographic quotes (“ ” ‘ ’), or as `\"`.
  A plain `"` ends the text early.

Two kinds of markers appear inside texts. Keep them, and write the Dutch around them:

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
starting-team roles). Please keep them the same in each place.

## Tone

The site speaks to students and young professionals, directly and plainly. Please
use **je/jij**, not u. Keep sentences short and concrete, as the English does.
Use Dutch date formats (“16 november 2026”).

## Keep in English

The draft keeps these as they are. If you think one of them should be translated
after all, or that something else belongs on this list, change it and note it in
`NOTES.md`.

**Names.** Safe AI Netherlands, SAIN, SAIN Amsterdam / Groningen / Utrecht, and
the Project Hub. People's names. City names stay too, but use the Dutch name where
there is one: The Hague becomes Den Haag.

**Role titles.** SAIN's role titles stay in English everywhere, also inside
sentences: “Je werkt samen met de Communications Lead.” The list is at the end
of this file. The job titles of board members, advisors and supervisors stay
English too.

**Course and track names.** The names of courses and tracks, listed at the end of
this file, stay in English. The descriptions of their modules are translated.

**Organisations, platforms and events.** BlueDot, ARENA, MATS, Apart Research,
Discord, Substack, LinkedIn, Luma, Airtable, Google Forms, arXiv, OpenReview, NeurIPS, ICLR, ELLIS, Brainport, ASML, The Hague Security
Delta (HSD), TU/e, TU Delft, VU, UvA. Universities with an official Dutch name take it:
University of Groningen becomes Rijksuniversiteit Groningen.

**Paper titles and conference names**, for example “The Anatomy of Alignment” or
“NeurIPS 2025 workshop”.

**AI terms that Dutch speakers in the field use in English.** The draft keeps:
AI safety, alignment, interpretability (and mechanistic interpretability),
evaluations / evals, benchmark, prompt injection, LLM, reinforcement learning
(RL), multi-agent, frontier AI, agentic AI, sandboxing, compute, hackathon. You know
the Dutch usage better than we do: where a Dutch word is more natural (for example
“AI-veiligheid”), use it throughout and note it. Follow Dutch spelling for compounds
with English words (“AI safety-cursus”, “alignmentonderzoek”).

**Words used the same way throughout.** The draft chose one Dutch word for each
recurring term (chapter, cursus, startteam and so on); `NOTES.md` lists them. If you
change one, change it everywhere and note it.

## Questions

If the English is unclear, a sentence needs context, or the English looks wrong,
please ask Sofia. Choices about the Dutch are yours; please record them in `NOTES.md`.
