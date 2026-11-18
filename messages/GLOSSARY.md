# Glossary: English → Dutch

How SAIN's words are translated on the Dutch site (`/nl`). It applies to every
file in `messages/nl/`. The Dutch is a first draft: anything marked
**Decision** or **Question** is open until Tjebbe signs it off.

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
- **Times**: 18.30 uur. **Numbers**: 1.000, 2,5. **Percentages**: 20%.
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
| Theory of Change | Name of the document (see Questions) |
| People's names, paper titles, venue names | Names |
| Job titles in postings (*Chapter Director*, *Video Editor (Short-Form)*) | They match the English application forms (see Questions) |

## Decision for Tjebbe: "AI Safety"

The English site writes *AI Safety* as the name of the field ("Your AI Safety
career starts here"). Two options for Dutch:

1. **AI-veiligheid**: normal Dutch, as Dutch media and government write it.
   "Je carrière in AI-veiligheid begint hier."
2. **AI safety**: the field's own name, as the community says it.
   "Je carrière in AI safety begint hier."

**The draft uses option 1, AI-veiligheid**, everywhere the English means
the field. Compounds follow Dutch rules: *AI-veiligheidsonderzoek*,
*cursussen over AI-veiligheid*. Course titles that contain "AI Safety" stay
English either way. Switching to option 2 is a search-and-replace in
`messages/nl/` plus a check of the compounds.

## Terms

| English | Dutch (draft) | Note |
| --- | --- | --- |
| AI governance | AI-governance | *governance* is common in Dutch policy writing |
| AI Safety (the field) | AI-veiligheid | **Decision**, see above |
| apply (course) | aanmelden, je aanmelden | |
| apply (job, role) | solliciteren | |
| apply (Project Hub) | je aanmelden | |
| apply by {date} | uiterlijk {date} aanmelden / solliciteren | "uiterlijk" keeps the date inclusive |
| application | aanmelding (course, Project Hub), sollicitatie (job) | |
| applications are open / closed | de aanmelding is open / gesloten | |
| board | bestuur | |
| breadcrumb | kruimelpad | |
| chapter director | afdelingsdirecteur | role titles: **Question** |
| director | directeur | role titles: **Question** |
| head of …, … lead | hoofd … (*Hoofd evenementen*) | role titles: **Question** |
| advisory board | raad van advies | |
| chapter | afdeling | **Question** |
| cohort | groep | **Question**: "cohort" is also used in Dutch education |
| community | community | |
| compute | rekenkracht | |
| course | cursus | |
| course round, iteration | cursusronde | |
| EU AI Act | AI-verordening | **Question**: or *EU AI Act* |
| deadline | deadline | |
| soft deadline | streefdatum | **Question** |
| discussion group | discussiegroep | |
| reading group | leesgroep | |
| event | evenement; *activiteit* in lists of what a chapter does | |
| facilitator | facilitator | **Question**: or *gespreksleider* / *begeleider* |
| field (of AI Safety) | vakgebied | |
| field building | field building | **Question**: or *het veld opbouwen* |
| free | gratis | |
| graduation (end of a course) | afsluiting, *cursusafsluiting* | participants get a certificate, not a diploma |
| funding | financiering | |
| hackathon | hackathon | |
| handbook | handboek; *Project Hub-handboek* as a title | |
| in person | op locatie | |
| lecture | college | |
| meetup, session | bijeenkomst | |
| join the community | word lid van de community | the button label everywhere |
| mentorship | begeleiding | |
| newsletter | nieuwsbrief | |
| open positions | vacatures | |
| outreach, PR | publiciteit (inboxes), promotie (team) | **Question** |
| paper | paper | |
| policy | beleid | |
| policy brief | beleidsnotitie | |
| programme | programma | |
| project | project | |
| projects team, Project Team | projectteam | **Question**: keep *Project Team* as a name? |
| registered address | vestigingsadres | **Question** |
| research | onderzoek | |
| researcher | onderzoeker | |
| rolling (applications, review) | doorlopend | |
| social (event) | borrel | |
| starting team | startteam | |
| new chapters | nieuwe afdelingen | follows *chapter* |
| supervisor | begeleider | as in *scriptiebegeleider* |
| talent pipeline | talentpijplijn | |
| talk | lezing | |
| thesis | scriptie (*masterscriptie*, *bachelorscriptie*) | |
| track (course) | track | **Question**: or *leerlijn* |
| volunteer (noun) | vrijwilliger | |
| volunteer (button) | word vrijwilliger | |
| volunteering | vrijwilligerswerk | |
| vision | visie | |
| code of conduct | gedragscode | |
| working week | werkweek | |
| workshop | workshop | |

## Questions for Tjebbe

The same list is in the pull request. Answer there or edit this file.

1. **AI Safety**: *AI-veiligheid* (the draft) or *AI safety*?
2. **chapter**: *afdeling* (the draft), or keep *chapter*?
3. **facilitator**: keep *facilitator* (the draft), or *gespreksleider*?
4. **cohort**: *groep* (the draft) or *cohort*?
5. **track**: keep *track* (the draft) or *leerlijn*?
6. **soft deadline**: *streefdatum* (the draft) or *zachte deadline*?
7. **field building**: keep the English (the draft) or describe it?
8. **Theory of Change**: keep the English name (the draft) or *veranderingstheorie*?
9. **Job titles** in the vacancies: keep English (the draft, they match the
   English forms) or translate the visible titles only?
