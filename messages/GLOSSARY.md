# Glossary: English → Dutch

How SAIN's words are translated on the Dutch site (`/nl`). It applies to every
file in `messages/nl/`. The Dutch is a first draft. Tjebbe decided the
site-wide terms on 19 November 2026 and the wording on 20 November (marked
**Decided**); no question is open.

When you add a term, add it here in the same pull request.

## Style

- **Informal**: *je*, *jij*, *jouw*, never *u*. Address the reader directly,
  as the English does ("Kies je stad", not "Kies uw stad").
- **Normal Dutch**: translate meaning, not word order. Shorter is better; the
  design has fixed line lengths.
- **Sentence case** for headings and buttons, as in the English
  ("Volg een gratis cursus", not "Volg Een Gratis Cursus").
- **No em dashes** (—), as in the English (`design/design.md`). Use a comma,
  a colon or two sentences.
- **Quotes**: keep the quote marks the English uses (‘ ’ “ ”).
- **Apostrophes** are typographic, as in the English copy: *foto’s*,
  *programma’s*, *zo’n* (never a straight ').
- **Dates** come from the data and are formatted by the site: "16 november
  2026", "wo 18 nov". Write a date by hand only inside a sentence that has no
  `{date}` placeholder, and then in the same form.
- **Times** (**Decided**): two-digit hours, a full stop and *uur*: 05.00 uur,
  18.30 uur, 18.00-19.30 uur. Times the site prints from data follow it too
  (the Groningen archive, the Project Hub tracker's "om 14.24 uur").
- **Numbers**: 1.000, 2,5. **Percentages**: 20%. **Salaries** written out:
  €42.000 tot €50.000 per jaar.
- **Placeholders and tags** stay exactly as in the English: `{date}`,
  `{count, plural, ...}`, `<link>…</link>`. `npm run i18n:check` fails
  otherwise.
- **Dutch place names** for Dutch places: *Den Haag*, not The Hague. Official
  names stay as they are, also when English (*Campus The Hague*,
  *Leiden University College*).
- **Institutions** by their Dutch names in Dutch text: *Universiteit van
  Amsterdam (UvA)*, *Vrije Universiteit (VU)*, *Rijksuniversiteit Groningen*,
  *Universiteit Utrecht*, *TU Delft*, *TU/e*. Abbreviations stay.

## Keep in English

| Term | Why |
| --- | --- |
| Safe AI Netherlands, SAIN, Stichting Safe AI Netherlands | Name |
| SAIN Amsterdam, SAIN Groningen, SAIN Utrecht | Names of the chapters |
| Project Hub (and "Project hub" where the English writes it so) | Name of the programme |
| BlueDot, BlueDot Impact, ARENA, AISIG, MATS, ERA, Existential Risk Observatory | Names |
| Course titles: *AI Safety Fundamentals*, *Technical AI Safety*, *AI Governance*, *Frontier AI Governance*, … | Names of the courses |
| alignment, interpretability, red-teaming, evals, reward hacking, frontier AI | Technical terms; Dutch researchers use the English |
| chapter, chapters | **Decided**: kept as the word for SAIN's local groups (see Terms) |
| cohort | **Decided**: Dutch *cohort* (see Terms) |
| facilitator, track (and the track names as drafted) | **Decided** |
| Theory of Change, field building, Soft skills, brand kit | **Decided**: names and established terms |
| EU AI Act, EU AI Office, GPAI Code of Practice | **Decided**: the names, not *AI-verordening* |
| People's names, paper titles, venue names | Names |
| Job titles in postings (*Chapter Director*, *Video Editor (Short-Form)*) | **Decided**: they match the English application forms. People's role titles on /about, /contact and the chapter pages are translated (*Directeur*, *Hoofd evenementen*, *Chapterdirecteur*) |
| Quotes from people (Stefano Zuffi's testimonial) | **Decided**: their own words, marked `lang="en"` |
| Airtable's project topics (*Alignment and RL*) | **Decided**: as Airtable writes them. The thesis tags are translated (*Masterscriptie*, *Scriptie (niveau open)*) |

## Decided: "AI Safety" is *AI-veiligheid*

The English site writes *AI Safety* as the name of the field ("Your AI Safety
career starts here"). Two options for Dutch:

1. **AI-veiligheid**: normal Dutch, as Dutch media and government write it.
   "Je carrière in AI-veiligheid begint hier."
2. **AI safety**: the field's own name, as the community says it.
   "Je carrière in AI safety begint hier."

**Decided: option 1, AI-veiligheid**, everywhere the English means the
field. Compounds follow Dutch rules: *AI-veiligheidsonderzoek*,
*cursussen over AI-veiligheid*. Course titles that contain "AI Safety" stay
English either way. Switching to option 2 is a search-and-replace in
`messages/nl/` plus a check of the compounds.

## Terms

| English | Dutch (draft) | Note |
| --- | --- | --- |
| AI governance | AI-governance | *governance* is common in Dutch policy writing |
| AI Safety (the field) | AI-veiligheid | **Decided**, see above |
| apply (course) | aanmelden, je aanmelden | |
| apply (job, role) | solliciteren | |
| apply (Project Hub) | je aanmelden | |
| apply by {date} | uiterlijk {date} aanmelden / solliciteren | "uiterlijk" keeps the date inclusive |
| application | aanmelding (course, Project Hub), sollicitatie (job) | |
| application-based | met aanmelding en selectie | **Decided** |
| applications are open / closed | de aanmelding is open / gesloten | |
| board | bestuur | |
| breadcrumb | kruimelpad | |
| chapter director (a person's role) | chapterdirecteur | **Decided** (job title in a posting: *Chapter Director*) |
| director (a person's role) | directeur | **Decided** |
| head of …, … lead (a person's role) | hoofd … (*Hoofd evenementen*) | **Decided** |
| advisory board | raad van advies | |
| chapter | chapter: *het chapter*, *de chapters*; *dit*, *elk*, *ons chapter*; compounds *chapterdirecteur*, *chapteradres*, *chapterbijeenkomst* | **Decided** |
| cohort | cohort: *het cohort*, *de cohorten* (*het volgende cohort*, *cursuscohorten*) | **Decided**. A course *iteration* stays *cursusronde* |
| community | community | |
| compute | rekenkracht | |
| course | cursus | |
| course round, iteration | cursusronde | |
| EU AI Act | EU AI Act (*de EU AI Act*) | **Decided**; also *EU AI Office*, *GPAI Code of Practice* |
| deadline | deadline | |
| soft deadline | streefdatum | **Decided** |
| discussion group | discussiegroep | |
| reading group | leesgroep | |
| event | evenement; *activiteit* in lists of what a chapter does | |
| facilitator | facilitator | **Decided** |
| field (of AI Safety) | vakgebied | |
| field building | field building | **Decided** |
| free | gratis | |
| graduation (end of a course) | afsluiting, *cursusafsluiting* | **Decided**; participants get a certificate, not a diploma |
| funding | financiering | |
| hackathon | hackathon | |
| handbook | handboek; *Project Hub-handboek* as a title | |
| in person | op locatie | |
| incubating (a new chapter) | in een incubatiefase | **Decided** |
| lecture | college | **Decided** |
| meetup, session | bijeenkomst | **Decided** |
| join the community | word lid van de community | the button label everywhere |
| mentorship | begeleiding | |
| newsletter | nieuwsbrief | |
| open positions | vacatures ("Er staan nu 15 vacatures open"); one of them is a *rol* | **Decided** |
| outreach, PR | publiciteit (inboxes), promotie (team) | **Decided** |
| paper | paper: *de paper*, *de papers*; the reader is the *Paperlezer* | **Decided** |
| part-time, full-time | parttime, fulltime | **Decided** |
| PDF | PDF, *PDF-kopie* (capitals, as in the English) | **Decided** |
| PhD level or above | promovendi of mensen met een hogere functie | **Decided** |
| policy | beleid | |
| policy brief | beleidsnotitie | |
| programme | programma | |
| project | project | |
| projects team, Project Team | projectteam | **Decided** |
| registered address | vestigingsadres | **Decided** |
| research | onderzoek | |
| researcher | onderzoeker | |
| rolling (applications, review) | doorlopend | **Decided** |
| social (event) | borrel | **Decided** |
| starting team | startteam | |
| new chapters | nieuwe chapters | **Decided** |
| supervisor | begeleider | as in *scriptiebegeleider* |
| talent pipeline | talentpijplijn | |
| talk | lezing | |
| thesis | scriptie (*masterscriptie*, *bachelorscriptie*) | |
| track (course) | track; track names *Technische alignment*, *Governance en beleid* | **Decided** |
| volunteer (noun) | vrijwilliger | |
| volunteer (button) | word vrijwilliger | |
| volunteering | vrijwilligerswerk | |
| vision | visie | |
| code of conduct | gedragscode | |
| Conduct (the contact inbox) | Gedrag | **Decided** |
| working week | werkweek | |
| workshop | workshop | |

## Forms

The forms SAIN links to (Fillout, Google Forms, Airtable) are English. On a
Dutch page, every button, link or embed that opens one carries the line
*Het formulier is in het Engels.* (`common.forms.inEnglish`, rendered by
`src/components/FormLanguageNote.tsx`), or the same sentence added to a
footnote that already talks about the form. **Decided.**

## Decisions

Decided by Tjebbe on 19 November 2026: AI-veiligheid; *chapter*;
*facilitator*; *cohort*; *track* and the track names; job titles English and
role titles translated; quotes in the speaker's own English; *EU AI Act*;
*Theory of Change*, *field building*, *Soft skills* and *brand kit* in
English; BlueDot week titles translated; the note under every form.

Decided on 20 November, as drafted unless noted: the Project Hub hero and
buttons; "met aanmelding en selectie"; *streefdatum* and *doorlopend*; the
event words; the contact labels; *de paper*, with *PDF* in capitals; the
Project Hub labels; Airtable's tags (thesis tags translated, topics
English); the vacancy wording; "AI-veiligheid daar op de kaart te zetten"
on the new-chapters page; two-digit hours (*05.00 uur*).

The **mission statement** on the home page, also on 20 November: "SAIN
*traint* nieuwe mensen, *verbindt* ze met elkaar en helpt ze *op weg*." (the
three highlighted words).

A new question goes in the pull request that raises it, and its answer goes
here.
