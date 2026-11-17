# Notes on the Dutch draft

The Dutch files in this folder are a first draft, translated by AI from the English.
They need a full review by a Dutch speaker. These notes list every point where the
draft had to guess: an unclear English sentence, a term that could go either way, a
fragment that is joined to another text on the page, wording with legal or
contractual weight. Each note gives the key (or document and heading), what was
chosen and the alternative.

Nobody at SAIN reads Dutch, so these choices are yours to make. Where a note asks
what the English means, Sofia can answer that.

## Choices made across the whole draft

- **je/jij** throughout, never u.
- **Terms used everywhere:** chapter (de chapter), cursus, cohort, facilitator,
  discussiegroep, leesgroep, startteam, vacatures, begeleider (research supervisor),
  scriptie, talentpijplijn, het landelijke team, certificaatuitreiking (graduation).
  For roles we wrote solliciteren; for courses, events and the Project Hub, aanmelden.
- **Kept in English:** the names, role titles, course and track names and AI terms
  listed in TRANSLATOR.md, team names inside role titles (Education, Events,
  Communications), “Theory of Change” as a document title, and “governance”.
- **Email subject lines stay English** (the `…Subject` keys): the people who sort
  SAIN's inboxes read English. Translate them if you think Dutch subjects are better.
- **Lists that follow a lead-in.** On role cards, “Deze rol past misschien bij je
  als je” is followed by items ending in a verb, “Sterke kandidaten hebben
  daarnaast misschien” by noun phrases, and “In je eerste maanden ga je” by
  infinitive phrases. Please keep the items fitting their lead-in when you edit.
- **Dates and city names** that the website fills into sentences (`{deadline}`,
  `{date}`, `{city}`) are formatted in Dutch by the website itself, so “16 november”
  and “Den Haag” will appear there. You don't need to change anything for that.

## Notes per part

### nl.json: site-wide text, homepage, About, team, contact

- `nav.startingTeamsDeadline`, `home.hero.hiring` — “apply by {deadline}” translated as “solliciteer uiterlijk {deadline}” (by and including that date) rather than the guide’s example “vóór”, which can be read as “before” (excluding the date). Also: the site fills `{deadline}` from `SOFT_DEADLINE_SHORT` in src/data/newChapters.ts, which is the English “16 November”, so the Dutch page would show “uiterlijk 16 November” (capital N). The developers need a Dutch date (“16 november”) for the NL page. `nav.startingTeamsDeadline` is also a fragment appended after `startingTeamsLong` (starts with a comma); check it reads well joined.
- `nav.items.projectHub`, `footer.links.projectHub`, `common.visitTheProjectHub` — the English writes “Project hub” here but “Project Hub” elsewhere. I used “Project Hub” everywhere as the name; tell us if the lowercase was intentional.
- `nav.primaryLabel`, `nav.mobileLabel` — these are screen-reader labels for the navigation landmarks (“Primary”, “Mobile”). I used “Hoofdmenu” / “Mobiel menu”; a screen reader adds “navigatie” after it, so check it does not sound doubled. Alternative: “Hoofdnavigatie” / “Mobiel”.
- `nav.hiringKicker` — “We are hiring” as a small kicker label; chose “We zoeken mensen”. Alternatives: “Vacatures”, “Wij werven”.
- `testimonial.quote` — this is a quote from a real person, translated. Check whether quotes should stay in the speaker’s original English.
- `testimonial.project` — a project title, which I translated (“Onderzoek naar alignmenttechnieken en overheidsinterventies voor AI in kaart brengen”). If project titles are treated like paper titles, keep the English. The English is also ambiguous: “AI alignment techniques and government interventions” could mean government interventions in general or on AI; I chose “voor AI” covering both.
- `landing.missionStatement` — the three `<verb>` tags animate in order. “trains / connects / gets them started” became “<verb>traint</verb> er meer, <verb>verbindt</verb> ze met elkaar en helpt ze <verb>op weg</verb>”; the third highlight is “op weg” (not a verb) to avoid splitting a Dutch separable verb across tags. “traint” could also be “leidt … op”, but that splits around a tag. Please check the rhythm.
- `home.careers.tracks` — career areas, not course names, so translated: “Field building” → “Het vakgebied opbouwen” (unsure; field-building is often kept in English in the Dutch EA/AI safety scene), “Security and compute” → “Beveiliging en compute” (alternative: keep “Security”).
- `home.research.closing` — “Apply any time” for the Project Hub: I used “aanmelden” (not a paid role). Switch to “solliciteren” if SAIN treats Project Hub entries as applications for a role.
- `landing.researchOffer.matching.description`, `about.record.years.2025.line` — “PhD+ supervisors” / “PhD-level supervisors” → “begeleiders op PhD-niveau (of hoger)”. Unclear whether this includes PhD candidates (promovendi) or only people with a doctorate (gepromoveerden); please confirm.
- `landing.researchOffer.publication` — “Publication track” as “Publicatietraject”, and “leading venues” as “toonaangevende conferenties”. If venues include journals, “podia” or “conferenties en tijdschriften” is more accurate.
- `landing.researchSteps.support.body` — “independent collaborators” is ambiguous (people outside SAIN, or collaborators without a supervisor). I used “zelfstandige samenwerkingspartners”.
- `landing.researchSteps.publish.body` — “policy brief” → “beleidsnotitie”; some in the field keep “policy brief”.
- `funnel.fellowship`, `about.pipeline.paragraphs` — “fellowship” kept in English (no good Dutch equivalent).
- `about.meta.description`, `about.hero.body`, `about.pipeline`, `team.body` — “talent pipeline” → “talentpijplijn”, “pipeline” → “pijplijn”. Alternatives: “talentpipeline”, or rephrase. Used consistently in this file; other parts should match.
- `about.meta.description` — “the foundation documents” could mean “the founding documents” or “the documents of the foundation (stichting)”; I chose “de documenten van de stichting”.
- `about.pipeline.paragraphs.0` — “The Funnel Diagram” is capitalised like a name; translated as “Het trechterdiagram”. If the diagram on the page shows an English label, this may need to match. “compounds into a more effective mission” rendered as “zich opstapelt tot een steeds effectievere missie”; check.
- `about.pipeline.record` — “nine-plus cohorts” → “negen of meer cohorten”; “course graduates” rephrased as “mensen die een cursus hebben afgerond”. Plural of cohort: I used “cohorten” (the style sheet gives only the singular); “cohorts” is also used in Dutch.
- `about.path.paragraphs.1` — “European institutions are staffing their AI safety functions” → “hun teams voor AI safety bemensen”; “functions” could also mean roles/departments.
- `about.team.body`, `contact.leads.body` — “national director”, “heads of growth, operations and projects”, “head of operations” are lowercase in the English. I wrote “de nationale Director”, “de hoofden van groei, operations en projecten”, “het hoofd operations”. If these are SAIN role titles (e.g. “Head of Operations”), they should stay in English and capitalised. “chapter directors” (lowercase in the English of `contact.leads.body`) written as “Chapter Directors”, the role title.
- `about.documents.body` — legal: “a stichting, the standard nonprofit legal form” → “een stichting, de gangbare rechtsvorm zonder winstoogmerk”; “holds … the legal entity” → “beheert … de rechtspersoon” (strictly, the stichting *is* the legal entity). A legal check is advisable.
- `about.documents.chapterLine` — “legal umbrella” → “juridische paraplu”; “curricula” → “lesprogramma’s”.
- `footer.links.theoryOfChange`, `documents.theoryOfChange.title` — kept “Theory of Change” in English (common in Dutch NGO language). Alternative: “Veranderingstheorie”. “Code of Conduct” translated as “Gedragscode”, lowercase mid-sentence in `contact.national.addresses.conduct.detail`. These titles should match the translated document files.
- `documents.codeOfConduct.description`, `contact.national.addresses.conduct` — conduct-related: “concerns are reported and handled” → “zorgen worden gemeld en afgehandeld”; label “Conduct” → “Gedrag”. Check that the wording matches the Dutch Code of Conduct.
- `contact.national.addresses.media.label`, `contact.chapters.body`, `contact.chapters.roles.publicOutreach` — “outreach” kept in the media label and the chapter body, but “public outreach” → “Publieksbereik”. Pick one approach if preferred.
- `contact.chapters.roles.communityManager` — label of an e-mail address, kept as in English (Community Manager is a role title). `education` → “Educatie” (alternative: “Onderwijs”).
- `contact.national.body`, `about.documents.contactLine` — “role address” → “functieadres”; alternative “algemeen e-mailadres”.
- `contact.leads.alsoAnswersChapter` — `{chapter}` is filled with a chapter name (presumably the city); “het chapteradres van {chapter}” assumes that.
- `contact.elsewhere.registeredAddress` — legal: “Statutair adres” vs “Vestigingsadres” (KvK) vs “Postadres”; depends on which address it is.
- `contact.elsewhere.substack` — “Writing on AI Safety” as a description of the Substack → “Artikelen over AI safety”.
- `notFound.contact` — “Tell us about a broken link” → “Meld een link die niet werkt” (alternative: “Meld een kapotte link”).

### nl.json: volunteering, open positions page, courses, chapter atlas

- `getInvolved.work.teams.*.name` — Team names (Education, Events, Communications, Community, Outreach, Research operations) kept in English, because they are the first word of the English role titles (Education Lead, Events Lead…) and the team jump links. Alternative: Dutch team names (Onderwijs, Evenementen, Communicatie, Community, Outreach, Onderzoeksondersteuning). They are headings on a Dutch page, so a reviewer should decide; whatever is chosen should match the other translators' team names (`openPositions.rolesLabel`, `volunteers.jumpLabel`).
- `getInvolved.work.body` — “Leads carry a team… team members carry a slice of it”: I used “Teamleiders dragen een team… teamleden nemen een deel van het werk op zich”. “Dragen” as in carry responsibility may sound stiff; alternative “zijn verantwoordelijk voor een team”.
- `getInvolved.foundChapter.body` — The English “and it lives with the community” is unclear (with the Community team? on the community page?). I wrote “valt onder het community-team”. Please check with SAIN what is meant; if it means the information lives on the Community page, use “en staat op de communitypagina”.
- `getInvolved.teams.outreach.description` — “Tabling” has no direct Dutch word; rendered as “met een kraampje staan”. Alternative “een infostand bemannen”.
- `getInvolved.apply.steps` — Step titles kept short with a full stop like the English (“Solliciteer.”, “Reactie.”, “Gesprek.”, “Start.”). “Reactie.” for “Hear back.” is a noun, the others mostly verbs; alternative “Je hoort van ons.”
- `getInvolved.apply.steps[3].body` — “onboarding begins with the next cycle”: “cycle” translated as “ronde”. Unsure whether it means a recruitment round or a course cohort.
- `openPositions.count.*` — These fragments are joined by code into one sentence: `{lead}: {body}.`, where body = chapterClause (+ “ en ” + nationalClause). Example result: “Er staan nu zes vacatures open: vier vacatures bij de chapters in Amsterdam en Utrecht en twee betaalde fulltime vacatures in het landelijke team.” I rephrased `lead` as “Er staan nu {count} … open” because the code capitalises the first letter of `lead`, and starting with “één” would give “Één” instead of the correct “Eén”. `role` is rendered “vacature/vacatures” (rather than “rol/rollen”), which reads better after a number. The repeated “vacatures” in lead and clauses may feel heavy; please read the assembled sentence on the page.
- `openPositions.count.chapterClause` — `{cities}` is filled from the chapter slugs in the code (`chapterSlug`), which may be lower-case (“amsterdam”). Not a translation issue, but it would show in Dutch and English alike; worth checking.
- `openPositions.count.bothClauses` — English has a comma before “and”; Dutch does not use one, so I dropped it (“{chapters} en {national}”).
- `openPositions.joinEmailSubject`, `openPositions.national.emailSubject`, `openPositions.chapter.emailSubject`, `openPositions.chapter.futureEmailSubject` — Translated into Dutch. These e-mail subjects arrive in SAIN's inbox, and SAIN does not read Dutch; you may prefer to keep them English so incoming mail can be sorted.
- `openPositions.hero.heading` — “SAIN is hiring.” rendered as “SAIN zoekt versterking.” (SAIN is looking for reinforcement), since most roles are unpaid and “werven/aannemen” suggests paid jobs. Alternative “SAIN zoekt mensen.”
- `openPositions.close.heading` — “people who decided to show up” translated literally (“mensen die besloten om op te komen dagen”). It is idiomatic in English; a reviewer may find a better Dutch turn, e.g. “mensen die gewoon zijn komen opdagen”.
- `openPositions.roleCard.summary` — `{timeCommitment}` and `{reportsTo}` are filled from role data (`src/data/openPositions.ts`). `reportsTo` is an English role title, so “Rapporteert aan de Chapter Director” works; if `timeCommitment` stays English in the content file, this sentence will mix languages.
- `openPositions.roleCard.formNoOption`, `formSpecialisation`, `formShared` — `{option}` and `{title}` are values the applicant must pick in the (English) Google Form, so they will appear in English inside the Dutch sentence. That is intended; the plain quotes were changed to “ ”.
- `openPositions.roleCard.termLabels` — Labels for paid-role terms (Salaris, Contract, Locatie, Startdatum). Contractual context: the reviewer may want “Arbeidsovereenkomst” or “Dienstverband” instead of “Contract”.
- `openPositions.roleCard.background.softSkills` — Kept as “Soft skills”, which is common in Dutch job ads. Alternative “Persoonlijke vaardigheden”.
- `tracks.fundamentals.outline[2]` — The module heading “Technical AI Safety” kept in English as a course name. If it is a generic theme rather than the course, Dutch “Technische AI safety” would be better.
- `tracks.*.outline`, `tracks.policy.whoItSuits` — Kept “EU AI Act”. In Dutch the official name is “AI-verordening”; both are used. Alternative: “de Europese AI-verordening (AI Act)”.
- `tracks.fundamentals.outline[5]`, `tracks.policy.outline[5]` — “fellowship” kept in English; Dutch has no common equivalent in this sense.
- `tracks.fundamentals.caption`, `tracks.fundamentals.photoAlt`, `eventPrints.prints.utrechtGraduation`, `atlas.groningen.facts[1].value` — “graduation” (end of a course cohort) rendered as “afsluiting” rather than “diploma-uitreiking”, since no actual diploma is involved. Alternative “certificaatuitreiking” if certificates are handed out.
- `tracks.technical.cities`, `tracks.policy.cities`, `courses.cadence.rows[3]` — “application-based” rendered as “deelname na aanmelding en selectie” (participation after application and selection). I assumed it means places are selective; if it only means you must register, use “aanmelden verplicht”.
- `tracks.technical.cities.Utrecht` — “Programming needed” rendered as “Programmeerervaring vereist” (programming experience required).
- `tracks.policy.summary` — “AI Governance” (Utrecht course) kept in English as a course name, although it is not on the course-name list in TRANSLATOR.md. Please confirm it is a course name.
- `tracks.technical.summary`, `tracks.technical.outline` — “agent security / Securing AI agents” rendered as “beveiliging van AI-agents”; “evaluations” kept English per the sheet, with compound “AI safety-evaluations” in the outline. That compound is awkward; alternative “evaluations voor AI safety”.
- `applications.applyBy`, `applications.facilitatorsBy`, `courses.apply.deadlines`, `chapterAtlas.deadlines` — “by {date}” rendered as “uiterlijk {date}” (no later than). The `{date}` values come from data; if they are formatted in English (“16 November”), the Dutch sentence will show an English date.
- `courses.apply.walkthrough` — The `<link>` sentence follows without a full stop, as in the English.
- `atlas.utrecht.origin`, `atlas.utrecht.summary` — “Utrecht University” rendered as its official Dutch name “Universiteit Utrecht”, following the rule for universities with a Dutch name.
- `atlas.amsterdam.facts[2].value` — “AI020 Conference” kept in English as an event name; “TEDxUniversiteit van Amsterdam” kept as written.
- `atlas.utrecht.facts[*].label` — “Directed by” rendered “Onder leiding van”.
- `eventPrints.prints.europe2031` — “Europe 2031” treated as a scenario name and kept English in the caption; in the alt text I paraphrased (“een scenario voor Europa in 2031”). Make both the same if it is a proper name.
- `eventPrints.prints.forecastingHackathon.alt` — “AI forecasting and timeline models” rendered as “AI-voorspellingen en tijdlijnmodellen”. In the field, “AI forecasting” and “timelines” are often left in English; alternative “AI forecasting en timeline-modellen”.
- `chapterAtlas.walkIn` — “walk-in” rendered as “zonder aanmelding binnenlopen”.

### nl.json: community and the chapter pages

#### Terms used across this part

- `community.rhythm.heading` (also `chapters.*.prints[*].caption`, `chapters.groningen.evidence.body`, `chapters.utrecht.prints[0].alt`): “graduation” (end-of-course ceremony with a certificate). I used “certificaatuitreiking” throughout. “Diploma-uitreiking” is the more usual Dutch word but suggests a real diploma; “afsluiting” is another option. Other translators may have chosen differently, so please align.
- `chapter.*`, `chapters.*`: the BlueDot verb “facilitates [the course]”. I wrote “organiseert de cursus … van BlueDot Impact”. “Faciliteert” is an anglicism; “begeleidt” or “verzorgt” are alternatives if SAIN wants to stress that it only runs the sessions of someone else’s course.
- `chapters.amsterdam.courses.technical[2]`, `chapters.*.discussionGroup(s)`, `chapters.utrecht.courses.governance.sessions[0].detail`: “technical AI safety” as a field (not the course name). To avoid a hybrid, I rephrased it as “de technische kant van AI safety”. In the Utrecht path title (`…fundamentals.sessions[3].paths[0].title`) and Groningen “technical AI alignment” I wrote “Technische AI safety” / “technische AI alignment”. Please check that these read naturally.
- `chapters.utrecht.courses.technical.sessions[*]`, `chapters.utrecht.courses.research`, `chapters.groningen.courses.discussionGroups`: following the sheet, I kept “evaluations” in English (“evaluations in AI safety”, “capability- en alignment-evaluations”, “safety evaluations”). In Dutch, “evaluaties” would be natural and fully understood. Decide together with the other parts.
- `governance`/“AI governance” (many keys, e.g. `bluedot.governanceWeeks[2]` “Governancestrategieën”, `chapters.utrecht.courses.fundamentals.summary` “governancepad”): “governance” is not on the keep-in-English list. I kept it, because Dutch writing in the field commonly uses it. The alternative is “bestuur” or “beleid”, but that loses the meaning.
- `chapters.utrecht.meta.description`, `chapters.utrecht.hero.subheading`, `chapters.utrecht.courses.research`: “research track” → “onderzoekstrack”. The sheet’s “track” is defined for course tracks; “onderzoekslijn” is an alternative.
- `chapters.utrecht.courses.technical.summary`, `chapters.utrecht.evidence.body`, `chapters.utrecht.prints[1].alt`: “research challenge” → “onderzoekschallenge”. The alternative is “onderzoekswedstrijd”, but the post-course challenge may not be a competition.
- `chapters.utrecht.courses.fundamentals.summary`, `…technical.summary`, `…governance.summary`: “lecture” → “college” (the university word) and “talk” elsewhere → “lezing”. Please check that “college” suits an extracurricular course.

#### Community page

- `community.chapters.heading`: “each its own room” is a metaphor (perhaps a literal meeting room). I wrote “elk met een eigen plek”; “elk met een eigen sfeer” is an alternative if the point is character.
- `community.startChapter.body`: legal wording. “operate under the national stichting, so no separate legal entity is needed” → “vallen onder de landelijke stichting, dus een aparte rechtspersoon is niet nodig”. Please confirm that this matches SAIN’s actual legal set-up.
- `community.startChapter.startingTeams`: “paid starting teams” → “betaalde startteams”. Please check whether “betaald” correctly describes the arrangement (salary vs. volunteer allowance); this is contractual.
- `community.startChapter.seeStartingRoles`: this is a button. “Bekijk de rollen in de startteams” is noticeably longer than the English.
- `community.startChapter.emailSubject`: this is the mailto subject, which ends up in SAIN’s (non-Dutch-speaking) inbox. I translated it (“Een SAIN-chapter starten”); SAIN may prefer to keep it English.
- `community.startChapter.handsOver[4]`, `[5]`: “One-on-one mentorship” → “Persoonlijke begeleiding” (or “één-op-één-mentorschap”); “outreach” kept as English (also in `founderSteps[3]`), which is common in Dutch student organisations. “Werving en promotie” is the Dutch alternative.
- `community.close.heading`: idiomatic rewrite (“Ook de mensen op deze foto’s kenden de eerste keer niemand.”). Please check the tone.

#### Shared chapter components

- `chapter.course.deadlines`: `{participants}`/`{facilitators}` are filled from `src/data/courseApplications.ts` with English dates (“15 November 2026”). On the Dutch page they would read as “uiterlijk 15 November 2026”. The dates must be localised in code. I used “uiterlijk” for “by” (inclusive deadline); “vóór” would mean “before” and could shift the deadline by one day.
- `chapter.course.closed`: `{note}` comes from the course-application data (closedNote/lapsedNote), not from this file. Check that it is translated too, or the sentence will mix languages.
- `chapter.team.linkedinProfile`: screen-reader fragment appended after a person’s name and followed by the “opens in new tab” text. Kept the leading comma.
- `chapter.close.body`: “onboarding form” → “onboardingformulier”. “Aanmeldformulier” would clash with the sheet’s use of aanmelden for courses/events; “intakeformulier” is an alternative.
- `chapter.close.everythingElse`: shown before a general e-mail address. I wrote “Overige vragen:” rather than a literal “Al het andere:”.
- `chapter.close.allLinks`: English “All {city} links”. I wrote “Alle links van SAIN {city}”, adding “SAIN” for clarity.

#### BlueDot week titles

- `bluedot.technicalWeeks`, `bluedot.governanceWeeks`: these appear to be BlueDot Impact’s official week titles. I translated them as module descriptions; if SAIN wants them to match BlueDot’s (English) course pages, keep them English.

#### Amsterdam

- `chapters.amsterdam.courses.note`, `chapters.groningen.courses.note`: disclaimer wording (“not affiliated with”, “certificate of completion is awarded by”) → “niet verbonden aan”, “het certificaat voor het afronden van de cursus wordt uitgereikt door”. Since this is a disclaimer, please have the reviewer confirm the wording.
- `chapters.amsterdam.courses.technical[1]`: “fundable action plan” → “financierbaar actieplan”. This is slightly unusual Dutch; “een actieplan waarvoor je financiering kunt aanvragen” is clearer but longer. “kill chain” kept in English with Dutch quotes.
- `chapters.amsterdam.courses.governance[0]`: “govern technology” → “technologie besturen … in goede banen leiden”. “Reguleren” is an alternative, but it is narrower than “govern”.
- `chapters.amsterdam.courses.research`: “failure modes of multi-agent debate” rephrased as “de manieren waarop multi-agent debate kan falen”. “Multi-agent debate” is kept as the research term.
- `chapters.amsterdam.teamBody`: “ELLIS assistant professors” kept as an English job title, per the guide (the Dutch equivalent would be “universitair docenten”). “BSc students” → “bachelorstudenten”. “PR” → “pr”.
- `chapters.amsterdam.evidence.body`: kept “AI020 Conference” and “TEDxUniversiteit van Amsterdam” as event names. “120 applicants” → “120 aanmeldingen” (applications rather than people). Use “aanmelders” if the number is people.

#### Utrecht

- `chapters.utrecht.courses.openLead`: “AI Governance” is a course name but is not on the guide’s course-name list (only “Frontier AI Governance” and “Governance & Policy” are). I kept it English as a course name. Please add it to the list or confirm.
- `chapters.utrecht.courses.fundamentals.sessions[*].meta`, `…technical.sessions[*].meta`, `…governance.sessions[*].meta`: these are dates and rooms. I used Dutch weekday/month abbreviations (wo, do; sep, okt, nov, dec), “Room” → “lokaal”, “Location TBD” → “Locatie volgt”. The time ranges are kept as 18:00-19:00. I did not verify that the weekdays match the dates. If these strings are generated or reused elsewhere, they need the same treatment.
- `chapters.utrecht.courses.fundamentals.sessions[3].title`: “Path specialisation” → “Specialisatie per pad”.
- `chapters.utrecht.courses.technical.summary`: “AI safety evaluators” → “evaluatoren [die] AI-modellen op veiligheid testen”. “Securing AI agents” → “AI-agents” (hyphenated per Taalunie). “especially strong solutions … may be added to their repository” kept the conditional.
- `chapters.utrecht.courses.technical.sessions[2].title`: “Embodied AI safety” → “Veiligheid van embodied AI”. Note that a role title in the guide contains “Embodied AI Safety (Physical AI Track)”, so this may be a track name and should stay English.
- `chapters.utrecht.courses.technical.sessions[0].detail`: “threat models” → “dreigingsmodellen”; “scoring” kept. Many Dutch practitioners say “threat models” in English.
- `chapters.utrecht.courses.governance.summary`: the English is logically odd. “Most courses focus on the US and China. In this course, we *also* look at their visions…” seems to mean “we cover the US and China too, but also the middle powers”. I translated it literally (“kijken we ook naar hun visies … en naar de plek van middenmachten”). The reviewer may want to smooth it.
- `chapters.utrecht.courses.governance.sessions[3].detail`: kept “EU AI Act”, “EU AI Office”, “GPAI Code of Practice” in English. Official Dutch names exist (“AI-verordening”, “AI-bureau”, “praktijkcode voor AI voor algemene doeleinden”). The reviewer should decide which is more recognisable to the audience.
- `chapters.utrecht.courses.governance.sessions[2].detail`: ambiguous English (are system cards and future scenarios also analysed, or separate topics?). I kept the same list structure.
- `chapters.utrecht.courses.research`: “The Project Hub launches in October 2026” is already in the past (today is November 2026). The English needs updating; the translation keeps the future tense (“gaat … van start”).
- `chapters.utrecht.evidence.body`, `chapters.utrecht.prints[2].caption`: “Europe 2031” kept in English, on the assumption that it is a named scenario. If it is not, use “Europa in 2031”. The long list sentence keeps the English structure and is heavy in Dutch too.
- `chapters.utrecht.prints[0].caption`: “Programme graduation” → “Certificaatuitreiking” (dropped “programme”).

#### Groningen

- `chapters.groningen.hero.photoAlt`: “canal” → “gracht”. Groningen locals may say “diep” for some waterways.
- `chapters.groningen.courses.discussionGroups`: “fairness” → “eerlijkheid”. In AI ethics, Dutch texts often keep “fairness”. “deployment risks” → “risico’s bij de inzet van AI”. “preference learning” and “scalable oversight” were kept in English.
- `chapters.groningen.teamBody`: “research operations” is a team name and stays English and lowercase. The alternative is “onderzoeksondersteuning”. A role rename around Research Operations is pending on the SAIN side, so I left it as is. “as they spin up” → “nu ze op gang komen”.
- `chapters.groningen.evidence.heading`: “30 events and counting” → “30 evenementen, en de teller loopt”.

#### Groningen archive

- `groningenArchive.body`: the archive entries stay in English on the Dutch site (per the guide). The sentence about keeping the original announcements does not say they are in English. Consider adding “(in het Engels)”. I did not add it, because that would add a fact.
- `groningenArchive.close`: “free and open to walk into” → “gratis, en je kon gewoon binnenlopen”.

### nl.json: new chapters page, Project Hub

#### newChapters

- `newChapters.meta.description` — "leads for education, events and communications" is generic, so per the sheet I wrote “teamleiders voor educatie, evenementen en communicatie”. Alternative: name the role titles (Education Lead, Events Lead, Communications Lead) as `hero.body` does.
- `newChapters.hero.deadline`, `newChapters.apply.body` — "Soft deadline" translated as “streefdeadline”. Alternatives: “richtdatum”, “uiterste streefdatum”. Please choose one wording for the whole site.
- `newChapters.cities.applyIn` — `{city}` is filled from data. If the data still says “The Hague”, the Dutch button reads “Solliciteer in The Hague”. The city names in the data should come out as “Den Haag”.
- `newChapters.incubation.paragraphs[0]` — "incubating chapters" became “chapter in incubatie”. Not sure this reads naturally in Dutch. Alternative: “chapter in opbouw”.
- `newChapters.incubation.paragraphs[2]` — "the director and lead roles stay paid part-time positions" became “de rollen van director en leads blijven betaalde parttimefuncties”, with the titles lower-case and generic. Wording about pay matters here. Alternative: name all four role titles.
- `newChapters.roles.body` — "Open one" (an expandable panel) became “Klap er een open”. Alternative: “Open er een”.
- `newChapters.roleCard.firstMonths` — label before a list from the content file. “In je eerste maanden ga je” only works if the list items are written as infinitive phrases (“een team opbouwen”). Please check it against the translated list items.
- `newChapters.roleCard.goodFitIf` — “Deze rol past misschien bij je als je” is followed by list items. In Dutch these need verb-final word order (“… ervaring hebt met …”). Check it with the content translators. The same label key is used in RoleDisclosure (open positions).
- `newChapters.roleCard.alsoStrong` — “Sterke kandidaten hebben daarnaast misschien” only fits list items that are noun phrases.
- `newChapters.apply.aboutBody` — "talent pipeline" became “talentpijplijn”. Not sure it is idiomatic. Alternative: “talentontwikkeling” with the sentence rephrased.
- `newChapters.apply.visas` — "student residence permit" became “verblijfsvergunning voor studie”, the IND term. Please confirm, since this is a near-legal statement.

#### availability

- `availability.limitedWithNote` — `{note}` comes from project data, which stays English, so the label will mix languages (“Beperkt: two places left”).

#### research

- `research.meta.title`, `research.apply.projectHub` — the English has “Project hub” (lower-case h). I wrote “Project Hub”, since the name stays English and is capitalised everywhere else.
- `research.hero.heading` and others — the source writes “AI Safety” with a capital S on these pages. I kept the source casing. The sheet writes “AI safety”, so other parts of the site may differ.
- `research` (whole section) — joining a project is neither a role nor a course. I used “aanmelden/aanmelding” (not “solliciteren”), because participation is voluntary and unpaid. Alternative: “solliciteren”.
- `research.facts.rolling` — “doorlopend aanmelden” is a short stat label. Alternative: “doorlopende aanmelding”.
- `research.eligibility.who[0]` — "Students at Bachelor, Master, or PhD level" became “Bachelor-, master- en promotiestudenten”. Dutch PhD candidates are usually employees (“promovendi”), not students. Alternative: “Bachelor- en masterstudenten en promovendi”.
- `research.process.support.paragraphs[2]` — "at PhD level or more senior" became “meestal minimaal promovendus”. Not sure this matches the intended level. If it means having completed a PhD, use “gepromoveerd”. The same applies to “promotieniveau” in `research.supervisors.superviseBody`.
- `research.process.publish.paragraphs[0]` — "an evaluation or open-source tool" became “eval of open-sourcetool”. “eval” is kept English per the sheet but may read oddly to non-specialists. Alternative: “evaluatie”. "policy brief" became “beleidsnotitie”.
- `research.eligibility.notAJob` — the statement that no stipend or salary is paid matters legally. Check “SAIN betaalt geen stipendium of salaris; deelname is vrijwillig en bedoeld om van te leren”. Alternative to “stipendium”: “onkostenvergoeding”, which has a different meaning, so I did not use it.
- `research.process.choose.criteria` — "governance" kept in English (“over governance, beleid of concepten”). Alternative: “bestuur”, which sounds off in this context.
- `research.paper.projectPage` — “de projectpagina” is inserted into `viewOn`/`readOn`/`originalOn`/`notHosted` as `{source}`. It reads fine (“Bekijk op de projectpagina”). Other `{source}` values (arXiv, OpenReview) also fit.
- `research.paper.downloadPdf`, `research.reader.*` — I wrote “pdf” in lower case (Taalunie). Alternative: “PDF”.
- `research.reader.zoomReset` — screen-reader label. “terugzetten naar passend” is a bit awkward. Alternative: “klik om de pagina passend te maken”.
- `research.reader.failed` — "The reader could not open this paper here" was made impersonal: “Dit artikel kan hier niet worden geopend”.

#### projects

- `projects.count`, `projects.fromSupervisors`, `projects.clauses.*` — these pieces are joined into one results line: “{count} projecten” + “ van {count} begeleiders” + “, over X of aangeboden als scriptie” + “, met een begeleider in Y of met begeleiding op afstand” + “, open voor iedereen of alleen voor studenten van UvA” + “ die overeenkomen met “zoekterm””. The connecting word “of” comes from another key outside this slice. Please check that the whole line reads naturally, especially the article in “studenten van UvA” (normally “van de UvA”) and where `matching` sits after the comma clauses.
- `projects.clauses.forStudents` vs `projects.studentsOnly` / `projects.eligibility.thesisLine` — `{list}` may hold several universities (“UvA of VU”), so I wrote “studenten van {list}” instead of “{list}-studenten”. The single-university keys use “{university}-studenten”.
- `projects.clauses.matching` — the English uses straight quotes around `{query}`. I used typographic “ ” as the sheet asks.
- `projects.eligibility.thesisTag`, `thesisLine` — `{level}` comes from data in English (e.g. “MSc AI, honours”), so the line will mix languages.
- `projects.chosen` — screen-reader word after the number on the Filters button (“3 gekozen”). Alternative: “geselecteerd”.
- `projects.tracker.any` / `projects.tracker.all` — both are “Alle”. “Any” is the first option of the thesis chip group. Alternative: “Maakt niet uit”.
- `projects.tracker.statuses.in-progress` — “Bezig”. Alternative: “Lopend”.
- `projects.card.lookingFor` — “Zoekt” is a label before a description of the kind of student wanted. Alternative: “Gezocht”.

### nl.json: Project Hub handbook

- `handbook.buildsOn` — “Former SAIN Groningen Co-Director” is a historical credit. I kept the title “Co-Director” in English (job title) and translated “Former” as “voormalig”: “voormalig Co-Director van SAIN Groningen”. SAIN no longer uses Co-Directors, so please confirm SAIN wants this credit kept as written in English. Alternative: keep the whole title in English, “Former SAIN Groningen Co-Director”.
- `handbook.during.rolesIntro` (also `during.roles`, `dualUse.items`, `escalation.path`, `escalation.contact`) — “Head of Projects” is not in the role-title list, but I kept it in English as a SAIN role title. Alternative: “hoofd Projecten”.
- `handbook.during.rolesIntro` — “the Project Operations people in SAIN’s chapters”: I couldn’t tell whether “Project Operations” is a role title. I kept it in English: “de mensen van Project Operations in de chapters van SAIN”. If it is a generic description, use “de mensen die in de chapters projecten coördineren”.
- `handbook.intro` (and everywhere “the Project Team” appears) — I treated “Project Team” as the name of a SAIN team, like Project Hub, and kept it in English: “het Project Team”. Alternative: “het projectteam”. Lower-case “project team” in `purpose.intro[0]` and `publishing.authorship[1]` means a project’s own team, so I translated it as “projectteam”. Readers may confuse the two.
- `handbook.shortVersion.items[1]` (also `signUp`, `close`, `contents.before-you-apply`) — For applying to the Project Hub I used “aanmelden/aanmelding”, as the sheet does for courses. I did not use “solliciteren”, which the sheet keeps for roles. Applicants are called “kandidaten”.
- `handbook.beforeYouApply.modes[0].name` — “Supervised project matching.” is shortened to “Begeleide projecten.” because “matching” reads awkwardly as a label. Elsewhere “matching” is “koppelen”, and “match” stays “match”. `meta.description` keeps “matching”. Alternative: “Koppeling aan een begeleid project.”
- `handbook.purpose.criteria[0]` — I translated “middle powers” as “middelgrote mogendheden”. Please check that this is the usual term in Dutch foreign-policy writing.
- `handbook.purpose.intro[0]` (and other places) — I translated “transformative AI” as “transformatieve AI”. Alternative: keep the English.
- `handbook.purpose.topics` — These AI terms are not on the keep-English list, but I kept them in English because I believe researchers use the English: mechanistic interpretability, representation learning, feature sparsity, foundation models, red-teaming, scalable oversight, debate, constitutional AI, agent foundations, compute governance, forecasting. “Debate” in particular may look odd untranslated. I translated “misaligned” as “niet-aligned”. Please check each one.
- `handbook.purpose.topics[2].items[4]` — CBRN is left as is. In Dutch the abbreviation is the same (chemisch, biologisch, radiologisch, nucleair). I translated “critical infrastructure” as “vitale infrastructuur”, the usual Dutch government term.
- `handbook.purpose.principles[1]` (also `integrityTurn`, `dualUse`, `proposal[5]`, `publishing.complete[1]`) — I kept “dual-use” and “infohazards” in English. The text explains both terms. Alternatives: “tweeërlei gebruik”, and for infohazards “informatierisico’s”.
- `handbook.purpose.principles[2]` — The English “There is zero room for harmful authority” is unclear. I read it as abuse of seniority or power and wrote “Er is geen enkele ruimte voor schadelijk gezagsmisbruik”. Alternative: “Er is geen ruimte voor misbruik van gezag of hiërarchie.” Please check what SAIN means.
- `handbook.purpose.principles[1]`, `beforeYouApply.after`, `signUp[1]`, `roles`, `supervise` — I translated the `<s1>/<s3>/<s4>` links “section N” as “hoofdstuk N”, because the page shows numbered chapters. Alternatives: “deel N” or “sectie N”. `escalation.intro` refers to its own section as “dit hoofdstuk”.
- `handbook.name` / `deliverables` / `proposalIntro` — I translated “policy brief” as “beleidsnotitie”, and “explainer” as “uitleg”. A reviewer may prefer “policy brief”, which is also used in Dutch.
- `handbook.during.deadlines[1]` (also `supervise.procedure[4]`) — I translated “every second Sunday” and “bi-weekly” as “om de zondag” and “tweewekelijks”. In Dutch, “tweewekelijks” can also mean twice a week, so this deadline may be ambiguous. Alternative: “om de twee weken op zondag”.
- `handbook.during.milestones` — The English week ranges overlap (4 to 8, 8 to 10, 10 to 12, 12 to 14). I kept them exactly as in the English: “Week 4 tot 8” and so on.
- `handbook.during.roles[1].items[2]` — The English “Meet at the agreed frequency” is written as “Afspreken met de afgesproken frequentie”, which repeats “afspr-”. A reviewer may want to smooth this.
- `handbook.during.communicate[3]` — The English “Meetings are the supervised participant’s responsibility” became “Bij een begeleid project is de deelnemer verantwoordelijk voor de meetings”. I used “meeting” for the weekly meetings and “gesprek” for the 15 to 30 minute intake call.
- `handbook.during.support` (whole list) — This is about money: no stipends or salaries, and help with costs “within reason”. I translated “stipends” as “vergoedingen” and “within reason” as “binnen redelijke grenzen”. Please check that “vergoedingen” cannot be read as a promise to reimburse expenses. Alternative: “geen stipendia of salarissen”. In `support[3]` I wrote “rekenkracht” instead of “compute” to vary the wording. Change it to “compute” if strict consistency is preferred.
- `handbook.during.confidentiality.items` — Wording about employers matters here (side activities, IP, confidentiality). I used the Dutch terms “nevenwerkzaamheden” (which civil servants must report), “intellectueel eigendom”, “afspraken over geheimhouding”, “belangenverstrengeling” and “op persoonlijke titel”. Please check these.
- `handbook.escalation.when[1]` (also `skip`) — I translated “harassment” as “intimidatie” and “sexual harassment” as “seksuele intimidatie”, the usual Dutch legal and HR terms. I translated “misconduct” as “wangedrag”. Since this is the code-of-conduct part of the text, please check the precise wording.
- `handbook.escalation.when[2]` — The English “still aligned with AI safety” is a pun on alignment. I translated it plainly as “nog wel aansluit bij AI safety”, so the pun is lost. `when[3]` “misaligned” became “lopen niet meer gelijk op”.
- `handbook.escalation.path[2]` — I kept “Director” as the role title: “De Director van SAIN”.
- `handbook.publishing.deliverables[2]` — I translated “parliamentary committee” generically as “parlementaire commissie”. For a Dutch audience, “Kamercommissie” would be more natural, but it is narrower.
- `handbook.supervise.procedure[3]` — I kept “collaborator” (the GitHub access level) in English: “toegang als collaborator”. On the Dutch GitHub interface it may also be “bijdrager”.

### content.nl.json: open positions (roles)

#### Contractual / employment terms

- `openPositions.roles.communications-lead-groningen.commitmentBadge` — “Paid - Part-time” became “Betaald - parttime”. The English names no salary, contract type or hours beyond 8–10 per week, so I added nothing. Alternative: “Betaalde parttime functie”. Code: `src/data/openPositions.ts` counts paid roles with `commitmentBadge?.startsWith("Paid")`. If that count ever reads the localised text, the Dutch badge will not match. A developer should check this; it is not a translation question.
- `openPositions.roles.communications-team-member-groningen.timeCommitment` — “for at least 9 months” became “voor minstens 9 maanden”. This is a minimum commitment for a volunteer. Kept as a plain requirement, with no legal wording such as “contractduur”.
- `openPositions.roles.communications-team-member-groningen.mission` — the benefits list (“In return, you get …”) became “Daar krijg je veel voor terug: …”. “Certificate of involvement” became “bewijs van betrokkenheid”. Alternatives: “verklaring van deelname” or “certificaat”. The reviewer should check that “referentie” and “bewijs van betrokkenheid” promise exactly what SAIN means, no more.
- `openPositions.roles.governance-coordinator.timeCommitment` — “for at least two quarters (6 months)” became “gedurende minstens twee kwartalen (6 maanden)”. Meaning kept exactly.
- `openPositions.roles.governance-coordinator.responsibilities[8]` — “so they can be reimbursed” became “zodat ze vergoed kunnen worden”. Like the English, it does not promise that expenses will be reimbursed.
- `openPositions.roles.communications-lead-groningen.mission` — “national foundation” became “landelijke stichting”. This is correct only if SAIN is legally a stichting. If it is not, use “landelijke organisatie”. Please confirm.
- `openPositions.roles.community-manager.responsibilities[1]` — “GDPR-compliant” became “in overeenstemming met de AVG”. AVG is the Dutch name for the GDPR. Alternative: keep “GDPR”.

#### Fragments and joined texts

- `openPositions.roles.governance-coordinator.reportsTo` — this value is a sentence, not a role title. The summary template is “Rapporteert aan de {reportsTo}”, and in English “Reports to the {reportsTo}” gives “Reports to the The Lead …”, so the English source has a bug. In Dutch I dropped the leading article (“Lead die verantwoordelijk is voor samenwerkingen; voor het lesgeven in de cursus de Education Lead”) so the line reads “Rapporteert aan de Lead die …”. The English source should be fixed too.
- `openPositions.roles.*.goodFitIf` — written to continue “Deze rol past misschien bij je als je …”: lower-case start, verb at the end (“om de risico’s … geeft en ze beter wilt begrijpen.”). The extra sentences inside the first item stand on their own. If the lead-in label changes, these items must change with it.
- `openPositions.chapters.Groningen.closedNote` — the full sentence reads “… Wil je in beeld komen als er iets vrijkomt? Mail dan naar {e-mail} en vertel ons wat je graag zou willen doen.” This should read well, but please check it on the page.

#### Terms kept in English or unsure

- Role titles not on the guide’s list were kept in English as role titles: Content Creator, Incubation Ops, Research Operations, Research/Incubation Ops, On-Campus Ambassador, Director, and “Education Course Facilitator: AI Governance” (governance-coordinator mission). Please confirm that these are role titles and add them to the list.
- `openPositions.roles.governance-coordinator.*` — “the Lead” (capitalised, with no team name) is kept as “de Lead”. In English it is unclear which Lead is meant.
- Programme and pipeline names were kept in English: Research Hunger Games / solo project track, Forge/Incubation pipeline, Governance E2I pipeline, SAIN Repository, SAIN Education Playbook, the Intro / Technical / Governance programmes, the Agentic AI Security project portfolio and its projects (Agentic AI Security Benchmark, Agent Sandbox, Secure-by-Design), and the “AI×Bio” project ladder.
- `openPositions.roles.governance-coordinator.responsibilities[0]` — the four lecture titles were kept in English in quotes, on the assumption that the course is taught in English. If the course runs in Dutch, translate them.
- `openPositions.roles.research-ops-repository-steward.responsibilities[1]` — “a Grant” is capitalised in the English and might be a named programme, so it was kept as “een Grant”. If it just means funding, use “een subsidie” or “een beurs”.
- `openPositions.roles.governance-coordinator.responsibilities[2]` — “save … in Slides” probably means Google Slides. It was kept as “Slides”.
- Team names were kept in English at the coordinator’s request: “het Communications-team”, “het Events-team”, “de teams voor Events, Education en Research”. Hyphenation “Communications-team” vs “Communicationsteam” needs a check. The generic word “communicatievrijwilligers” (no team name) was translated. Alternative: “vrijwilligers voor het Communications-team”.
- `openPositions.roles.community-manager.responsibilities[5]` — “Team Lead Meetings” (capitalised, maybe a named meeting) became “het teamleidersoverleg”. Alternative: keep “Team Lead Meetings”.
- `openPositions.applicationTimeline[2].detail` — “the chapter lead for that team” became “de teamleider van dat team binnen de chapter”. The English is ambiguous. It may mean the Director, not the team lead.
- `openPositions.applicationTimeline[4]` — “Onboarding” and “onboardingronde” were kept, since the word is common in Dutch. Alternative: “Inwerken” / “inwerkperiode”.
- `openPositions.applicationTimeline[3].label` — “Trial conversation” became “Proefgesprek”. Alternative: “Kennismakingsopdracht”. Unclear whether it is a test or a conversation.
- AI and security terms kept in English beyond the sheet’s list: memory poisoning, red-teaming, reward hacking, sim-to-real, uplift, policy training, CTF, CBRN, dual-use research of concern (DURC), RLHF, CoT, VLA, world model(s), capabilities. “Biosecurity” was kept and “biosafety” became “bioveiligheid”. Check whether “biosecurity” or “biobeveiliging” is preferred in Dutch usage.
- “AI governance” as a field became “AI-governance” (Taalunie hyphen). It is not on the keep-English list. Other parts may handle it differently.
- “SAIN brand kit” was kept as “brand kit” (“de SAIN brand kit”, “de brand kit van SAIN”). “Brand tone” and “brand consistency” became “huisstijl”. Alternative: “huisstijlgids” throughout.
- `openPositions.roles.education-facilitator-*.preferredBackground.level` — “Strong bachelor’s” became “Sterke bachelors”. The English is unclear whether it means a bachelor’s student or someone with a bachelor’s degree.
- `openPositions.roles.education-facilitator-cybersec.preferredBackground.level` — “Professional or master’s preferred” became “Bij voorkeur een professional of iemand met een master”. A master’s student may also be meant.
- `openPositions.roles.social-media-copywriter.preferredBackground.level` — the requirement “strong command of English” was kept as “Engels”. Note for SAIN: on a Dutch site, check whether Dutch is also wanted.
- `openPositions.roles.communications-lead-groningen.responsibilities[0]` — “Run our Instagram, LinkedIn and Discord announcements” is ambiguous: it could mean running the Instagram and LinkedIn accounts plus the Discord announcements. Translated as announcements on all three.
- `openPositions.roles.communications-team-member-groningen` — “stories” was kept as “stories” (Instagram stories), not “verhalen”, to match `responsibilities[0]`.
- `openPositions.roles.sain-ambassador.*` — “UU departments” became “departementen van de UU”, the UU’s own term. The example departments became Informatica, Wijsbegeerte and Ethiek. Check them against the UU’s official names. “Professors” became “hoogleraren”, which may be too narrow; alternative: “docenten”.
- `openPositions.roles.communications-lead-groningen.mission` — “socials” became “borrels”, and “brought around 60 people a year through our free AI safety course” became “hebben elk jaar zo’n 60 mensen onze gratis AI safety-cursus gevolgd”.

### content.nl.json: new chapters call, course notes, paper summaries

#### Salary and contract terms

- `newChapters.roles.*.logistics[1]` (Compensation): “€42–50k” / “€34–42k” written out as “€42.000–50.000” / “€34.000–42.000 per jaar bij een voltijdbaan (40 uur), naar rato van je uren”. The English does not say gross; I did not add “bruto”, but Dutch readers will assume a gross annual salary. Please confirm the amounts are gross and whether “bruto” should be stated. Label “Compensation” = “Vergoeding”; “Salaris” is the alternative and may read more naturally for an employment contract.
- `newChapters.roles.*.logistics[2]` (Holiday allowance): “Vakantiegeld: 8% bovenop je brutosalaris.” Assumes these are employment contracts (vakantiegeld is a legal term there). If the roles are freelance or another contract type, the wording needs checking.
- `newChapters.roles.*.logistics[4]` (Reports to): label “Rapporteert aan”. Alternative: “Leidinggevende” (noun, then the value reads as a name). Check it fits the label layout.
- `newChapters.roles.*.hours`: “12 hours a week depending on preference and availability” is ambiguous in English (fixed 12 hours, or about 12 depending on preference?). I kept the ambiguity: “12 uur per week, afhankelijk van voorkeur en beschikbaarheid”. Note the Director’s logistics line says “12 hours” while the other roles say “About 8 hours”; I kept that difference.
- `newChapters.roles.*.hours`: “incubation success” = “het succes van de incubatiefase”. “Incubatie” is used in Dutch startup jargon; alternative “opstartfase”. Should match how other translators render the incubation heading in en.json.
- `newChapters.offer.seal.detail`: “stay on paid part-time contracts” = “aan te blijven op een betaald deeltijdcontract”. The English says “have the opportunity”, which I kept as “krijgen de kans” (no promise of a contract).

#### Joined text and list fragments

- `newChapters.softDeadline` / `softDeadlineShort`: “16 november 2026” / “16 november”. Inserted into sentences such as “Apply by {deadline}” and “Soft deadline {deadline}.”; fits Dutch “vóór 16 november 2026” / “uiterlijk 16 november”, so the preposition in the other file must be chosen to match.
- `newChapters.roles.*.firstMonths`: items continue the fixed lead-in “In je eerste maanden ga je” as lower-case infinitive phrases. The last item for three roles (“in juni: …”) is not a verb phrase in the English either (“By June: …”), so it does not continue the lead-in grammatically; a reviewer may want to rephrase it.
- `newChapters.roles.*.goodFitIf` / `alsoStrong`: items continue the fixed lead-ins “Deze rol past misschien bij je als je” (lower case, verb at the end) and “Sterke kandidaten hebben daarnaast misschien” (lower-case noun phrases). `director.alsoStrong[2]` (“voor Den Haag: ervaring …”) keeps the English “For The Hague:” prefix and reads slightly awkwardly after the lead-in.
- `courseApplications.Utrecht.closedNote`: inserted into “Applications are closed. {note}”. Translated as a full sentence, so it works after any Dutch first sentence.

#### Terms kept in English or uncertain

- `newChapters.cities.eindhoven.origin`: “Center for Safe AI” (TU/e) kept as an organisation name.
- `newChapters.cities.delft.why`: the ELLIS theme names (“Verification & Safe and Responsible AI”, “Multiagent Systems & Robust and Adversarial ML”, “Sequential Decision Making”) kept in English as official names.
- `newChapters.cities.the-hague.why` and `roles.education-lead.alsoStrong[1]`: “Leiden University” = “Universiteit Leiden” (its official Dutch name, by analogy with Rijksuniversiteit Groningen); “Campus The Hague” = “Campus Den Haag”; “Haagse Hogeschool” = “De Haagse Hogeschool” (official name). Please confirm.
- `newChapters.cities.delft.profile`: “embodied AI safety” = “AI safety voor embodied AI”. “Embodied AI” is not on the keep-in-English list; Dutch alternative “belichaamde AI” is rare in the field, so I kept it English.
- `newChapters.cities.eindhoven.profile`: “governance” kept English (“governancevragen”, “de governance van de hardware”); alternative “bestuur” / “beleid”. Also in `the-hague.profile` (“governance-chapter”) and `education-lead.goodFitIf[2]`. In `education-lead.about[2]` I wrote “een track over governance en beleid”; if this refers to the course track “Governance & Policy”, it should stay as that English name.
- `newChapters.offer.book.detail`, `communications-lead.*`: “brand kit” kept English (“de brand kit”). Alternative: “huisstijlkit” / “huisstijl”. Choose one site-wide.
- `newChapters.offer.stack.detail`, `communications-lead.about[2]`: “talent pipeline” = “talentpipeline”. Alternative: “wervingstraject”.
- `roles.education-lead.responsibilities[0]`, `roles.events-lead.responsibilities[0]`: “Education Handbook” and “Events Handbook” kept English as names of SAIN documents. If the handbooks get Dutch names elsewhere, align. `events-lead.about[1]`: “SAIN’s events playbook” = “het events-playbook van SAIN” (generic, not capitalised in English); alternative “het evenementen-playbook”.
- `roles.education-lead.responsibilities[2]`: “discussion leads” = “gespreksleiders” (not a role title in the list). Alternative: “discussieleiders”.
- `roles.education-lead.responsibilities[5]`, `events-lead.responsibilities[4]`: “education inbox” / “events inbox” = “education-inbox” / “events-inbox” (kept as the names of the mailboxes); “communications inbox” = “communicatie-inbox”. Make consistent if the inbox names are fixed.
- `roles.education-lead.responsibilities[0]`, `courseApplications.Groningen.*`: “course iteration” = “editie van de cursus”. Alternative: “cursusronde”.
- `newChapters.applicationSteps[1]`: “Work sample” = “Proefopdracht”, the usual Dutch hiring term.
- `roles.director.about[1]`: “final interviews” = “laatste sollicitatiegesprekken”.
- `roles.director.about[3]`: “high agency” = “veel eigen initiatief”; loses some of the English nuance (ownership, drive). Alternative: “veel eigenaarschap”.
- `roles.director.goodFitIf[2]`: “track record of chasing things to a finished state without being asked” = “Kunt laten zien dat je zaken zonder dat iemand erom vraagt afmaakt”; please check fluency.
- `roles.events-lead.goodFitIf[1]`: “cold-emailing” = “onaangekondigd te mailen”. Alternative: “koud te mailen” (sales jargon).
- `research.paperSummaries`: “preference optimisation” and “language modelling” kept English as technical terms; alternatives “preferentie-optimalisatie”, “taalmodellering”. “AI agents” = “AI-agents”.
- `research.supervisorNotes.Fausto Carcassi`: “1 place left across his projects” = “Nog 1 plek vrij, voor al zijn projecten samen” (one place in total, not one per project). Please check this reads clearly.

#### Possible issue in the English

- `roles.director.about[4]`: “steer AI safety into the field” is unclear (which field?). Rendered as “AI safety daar binnen die vakgebieden op de kaart te zetten” (put AI safety on the map in the fields where the city is strong); please confirm the intended meaning.

### documents/: vision, theory of change, code of conduct

#### General

- `all files › headings` — English headings are in Title Case; per STYLE.md the Dutch ones are in sentence case (“De uitdaging”, “Wie we zijn”). The `{#the-sain-talent-pipeline}` anchor is kept as is, so links to it still work.
- `all files › talent pipeline` — Translated as “talentpijplijn” (and “pijplijn” on its own). It is not in the fixed terminology. Alternative: keep “talent pipeline” in English. en.json uses “talent pipeline” too, so the website translators should use the same word.
- `all files › fellowship` — Kept in English (“de fellowship”, “fellowships”), as it is used in the Dutch field. Alternative: “beurs”/“beursprogramma”, which does not quite mean the same.
- `all files › governance` — Kept as “governance” (“governance-track”, “AI governance”). Alternative: “bestuur”/“beleid en toezicht”.
- `all files › field` — “the field” / “the AI safety field” is translated as “het vakgebied (AI safety)”, and compounds such as “AI safety-organisaties” are rephrased (“organisaties voor AI safety”), following the STYLE.md preference for rephrasing.
- `all files › civil society` — “civil-society organization” → “maatschappelijke organisatie”; “civil-society voice” / “civil society” → “maatschappelijk middenveld”. Please check this is the term SAIN wants.
- `all files › capable` — “capable people” is translated as “capabele mensen”. Alternative: “bekwame/getalenteerde mensen”; the reviewer may find “capabel” too much of an anglicism.

#### vision.md

- `vision.md › Mission` — “At this current scale, AI could affect …” reads oddly in English (the paragraph has just defined a hypothetical scale). Translated as “Op die schaal …” (“at that scale”). If “current” was meant literally (“at today's scale”), this changes the meaning.
- `vision.md › Mission` — “the AI Safety field” (capital S) is rendered as lower-case “AI safety”, as elsewhere.
- `vision.md › The Challenge` — “major institutions like ASML”: ASML is a company, so it is “grote organisaties zoals ASML”. Alternative, closer to the English: “grote instellingen zoals ASML”.
- `vision.md › Who We Are` — “a national foundation (*stichting*)”: the gloss is redundant in Dutch, so it reads “een landelijke *stichting*” (italics kept on stichting).
- `vision.md › Who We Are` — “9+ cohorts” → “minstens 9 cohorten” (9 or more). If “9+” was meant as “more than 9”, it should be “meer dan 9”.
- `vision.md › Who We Are` — “over 100 course graduates” → “meer dan 100 mensen die een cursus hebben afgerond”; Dutch has no neat word for “course graduate”.
- `vision.md › Who We Are` — “we rebranded and expanded” → “kregen we een nieuwe naam en breidden we uit”.
- `vision.md › Who We Are` — “the national Director and Chapter Directors” → “de landelijke Director en de Chapter Directors”: the role titles stay English, with the English plural “Chapter Directors”. “Advisory Board of experts” is translated as “adviesraad van experts” (en.json has it lower-case, so it is treated as a description, not a title). If it is the body's formal name, it may need to stay English or be written as “Raad van Advies”.
- `vision.md › Our Vision` — “frontier AI labs” → “frontier AI-labs” (frontier AI is kept in English per the guide). Please check the compound spelling.
- `vision.md › Our Vision` — “media operation” → “mediatak”. Alternative: “mediaplatform”/“redactie”.
- `vision.md › Strategic Framework: Four Pillars` — The pillar names are translated (Communicatie, Evenementen, Onderwijs, Projecten), also where they come back later (“Communicatie en Evenementen verlagen de drempel”). If SAIN uses them as fixed names, as it does for role titles such as Communications Lead, they could stay English.
- `vision.md › Strategic Framework: Four Pillars` — “strategic outreach” → “strategische outreach”; “outreach” is kept in English. Alternative: “strategische communicatie”.
- `vision.md › Strategic Framework: Four Pillars` — “informal AI Safety Chats” is treated as the name of an event series and kept in English. If it is just a description, it could be “informele gesprekken over AI safety”.
- `vision.md › Strategic Framework: Four Pillars` — “Education is a critical transition in SAIN's pipeline” is translated literally (“Onderwijs is een cruciale overgang”). The English is slightly odd, since education is a stage rather than a transition. The reviewer may prefer “een cruciale schakel”.
- `vision.md › Strategic Framework: Four Pillars` — “finishing projects that contribute to the international field” is unclear in English. Translated as “en worden afgerond als bijdragen aan het internationale vakgebied” (the projects are finished as contributions to the international field). Please check the intended meaning.
- `vision.md › Strategic Framework: Four Pillars` — “field-building” is kept in English. Alternative: “het opbouwen van het vakgebied”.
- `vision.md › Strategic Framework: Four Pillars` — The link text “Theory of Change” is kept in English, matching the page title (see theory_of_change.md › title).
- `vision.md › The SAIN Talent Pipeline` — “levels 0 to 3” → “niveaus 0 tot en met 3” (inclusive), which is clearly the intended meaning.
- `vision.md › The SAIN Talent Pipeline` — Table level 4: “full-time, paid fellowship or internship” → “voltijdse, betaalde fellowship of stage”.
- `vision.md › A Journey Through the Talent Pipeline` — “A friend” has no gender in English; Dutch must choose. I used “Een vriend”. Alternative: “Een vriendin” or the neutral “Een kennis”.
- `vision.md › A Journey Through the Talent Pipeline` — “a local hackathon gathering” → “een lokale hackathon” (“bijeenkomst” dropped as redundant).
- `vision.md › A Journey Through the Talent Pipeline` — “our technical AI safety course”: lower-case in English, so translated as a description (“onze cursus technische AI safety”). If it is the course “Technical AI Safety” from the course-name list, it should read “onze cursus Technical AI Safety”.
- `vision.md › A Journey Through the Talent Pipeline` — “open-source game theory” is kept in English as the name of a research area. Alternative: “open-source speltheorie”. The English switches from present to past tense (“Sara went on to secure”), and the Dutch does the same.
- `vision.md › A Journey Through the Talent Pipeline` — “the national layer takes over the handoff” → “neemt de landelijke laag de overdracht over”. It is a literal rendering of a slightly odd metaphor; the same phrase is in theory_of_change.md.
- `vision.md › A Journey Through the Talent Pipeline` — The unspaced em dashes in the Sara story and in “This balance—local freedom …” (A National Ecosystem) are written as spaced en dashes ( – ), which is the usual Dutch style. The table and the code of conduct keep the spaced em dashes of the English.
- `vision.md › A National Ecosystem` — “A strong central identity provides strategy, legal status, …”: an identity cannot provide things, so it is “Een sterke centrale organisatie”. Alternative, literal: “centrale identiteit”.
- `vision.md › Looking Ahead` — “The course has educated over a hundred individuals”: singular “course”, although elsewhere SAIN has several courses. Kept singular (“De cursus”); the English may mean “our courses”.

#### theory_of_change.md

- `theory_of_change.md › title` — “Theory of Change” is kept in English as the title, and in “Elke theory of change rust op aannames”, because Dutch NGOs commonly use the English term. Alternative: “Veranderingstheorie”. The website text (en.json `theoryOfChange`, page title) must use the same choice, so this needs coordinating with the other translators.
- `theory_of_change.md › intro` — “what would have to be true for us to be wrong” is translated literally (“wat er waar zou moeten zijn om ons ongelijk te geven”). The section “What has to be true” actually lists what must be true for SAIN to be *right*, so the English may contain an error (“for us to be right”). Please check with the author.
- `theory_of_change.md › The situation` — “whether that happens or goes well” → “of dat gebeurt of goed gaat”, keeping the slightly loose “or” of the English.
- `theory_of_change.md › The situation` — “AI safety and security” → “AI safety en security”, with “security” kept in English. Alternative: “AI safety en AI-beveiliging”.
- `theory_of_change.md › The complication` — “gaps” → “kloven” throughout. Alternative: “tekorten”/“lacunes”.
- `theory_of_change.md › The complication` — “Institutions can only build effective AI safety functions”: “functions” (departments or capabilities inside an institution) is rendered as “functies op het gebied van AI safety”, but in Dutch “functie” mostly means a job. Alternative: “taken”/“afdelingen”.
- `theory_of_change.md › Our bet` — “Our bet” → “Onze inzet” (both “stake” and “effort”). Literal alternative: “Onze weddenschap”.
- `theory_of_change.md › Our bet` — “a project hub” is lower-case in the English (twice). I took it to mean SAIN's Project Hub and capitalised it.
- `theory_of_change.md › Our bet` — “warm referrals” → “persoonlijke aanbevelingen”.
- `theory_of_change.md › Our bet` — “NL AI Security Institute” and “EU AI Act” are kept as written. The official Dutch name of the EU AI Act is “AI-verordening”, which the reviewer may prefer. I don't know whether a Dutch name for the future institute exists.
- `theory_of_change.md › Our bet` — “middle powers” → “middenmachten” (the Dutch term in international relations). “a pause or pacing of unsafe development” → “een pauze of vertraging”. “Pacing” (deliberately slowing the tempo) has no exact Dutch equivalent. Alternative: “het tempo beperken”.
- `theory_of_change.md › Our bet` — “Events and outreach” → “Evenementen en outreach” (outreach kept in English).
- `theory_of_change.md › What we count` — “facilitating a course” → “facilitator zijn bij een cursus”, which uses the fixed term.
- `theory_of_change.md › What has to be true` — “the Dutch International AI Strategy” → “de Nederlandse Internationale AI-strategie”. I don't know the official Dutch title of this government strategy, so please check it.
- `theory_of_change.md › What has to be true` — “Conversion works … conversion mechanisms” → “Conversie werkt … conversiemechanismen”, keeping the marketing term. “We will be adamant about testing” → “consequent blijven testen”, which is softer than “adamant”. Alternative: “nadrukkelijk”.
- `theory_of_change.md › What has to be true` — “Handoffs stick” → “Doorverwijzingen beklijven”. Alternative: “Overdrachten werken blijvend”.
- `theory_of_change.md › How we are organized` — The gloss “(stichting)” after “foundation” is dropped, because the Dutch word already is “stichting”.

#### code_of_conduct.md

- `code_of_conduct.md › general` — Rules are written as imperatives (“Ga …”, “Deel geen …”), which avoids choosing between je and u. Where a pronoun is needed, je/jij is used, so I did not deviate from the je/jij rule. A professional should check that the whole document holds up as a binding rules document.
- `code_of_conduct.md › 1. Our Values` — “interpersonal safety” → “sociale veiligheid”, the standard Dutch term for safety in personal interaction (as in workplaces and universities).
- `code_of_conduct.md › 2. Scope` — “all individuals acting in a SAIN capacity” → “alle personen die in een rol bij SAIN betrokken zijn”. I did not use “namens SAIN optreden” (act on SAIN's behalf), because that would be narrower than the list that follows (event attendees, course participants). Please check the scope is the same.
- `code_of_conduct.md › 3. Expected Behavior` — “Respect privacy and consent”: the English “with their consent” does not say whose consent is needed for photographing private SAIN spaces and conversations (the people present? the people in the conversation?). The Dutch “alleen met hun toestemming” is just as open. The same applies under 4 › Privacy violations. Also, “private SAIN spaces” → “besloten ruimtes”. Alternative: “privéruimtes”, which suggests homes.
- `code_of_conduct.md › 3. Expected Behavior` — “without authorization” (public statements on behalf of SAIN; also under 4 › Misrepresentation) → “zonder toestemming”. A stricter alternative: “zonder daartoe bevoegd te zijn”.
- `code_of_conduct.md › 3. Expected Behavior` — The cross-reference in section 7 quotes this rule as “Ga verantwoordelijk om met de naam SAIN”. The wording must match if either is changed.
- `code_of_conduct.md › 4. Unacceptable Behavior` — Heading → “Onaanvaardbaar gedrag”. Alternative: “Ongewenst gedrag”, the usual Dutch HR term, though it means “unwanted” and is weaker than “unacceptable”.
- `code_of_conduct.md › 4. Unacceptable Behavior` — “Harassment” → “Intimidatie”, the Dutch legal term (Algemene wet gelijke behandeling), consistent with “seksuele intimidatie”. Its first example, “intimidation”, then becomes “intimideren”, which overlaps. Alternative heading: “Lastigvallen”.
- `code_of_conduct.md › 4. Unacceptable Behavior` — The definition of sexual harassment follows the wording of the Dutch legal definition (Arbowet / AWGB: “verbaal, non-verbaal of fysiek gedrag met een seksuele connotatie dat als doel of gevolg heeft dat de waardigheid van een persoon wordt aangetast …”). Please check it against the current statutory text. The English gloss “(seksuele intimidatie)” is dropped, because the heading itself is now the Dutch term.
- `code_of_conduct.md › 4. Unacceptable Behavior` — Discrimination grounds: “gender” → “geslacht” (the legal ground), “disability” → “beperking” (the law says “handicap of chronische ziekte”), “religion” → “religie” (the law says “godsdienst”). “any other protected characteristic” → “een ander beschermd kenmerk”. Dutch law speaks of “discriminatiegronden”, so “een andere discriminatiegrond” may be more precise.
- `code_of_conduct.md › 4. Unacceptable Behavior` — “Misrepresentation” → “Misbruik van de naam SAIN”. Dutch has no single word that covers both examples. A literal alternative is “Misleidende voorstelling”, which is less clear.
- `code_of_conduct.md › 4. Unacceptable Behavior` — “Retaliation: any adverse action against someone for reporting a concern or participating in a conduct process” → “Represailles: elke vorm van benadeling …”. “benadeling” is the Dutch legal term for victimisation. “conduct process” → “een procedure over gedrag”. Alternative: “een procedure onder deze gedragscode”.
- `code_of_conduct.md › 5. Research and Professional Integrity` — “Section 6” / “Section 3” → “paragraaf 6” / “paragraaf 3”. Alternative: “artikel” or “onderdeel”.
- `code_of_conduct.md › 5. Research and Professional Integrity` — “Academic dishonesty” → “Academische oneerlijkheid”; “data fabrication” → “het verzinnen van data”. Alternatives: “wetenschappelijk wangedrag”/“fraude”, “fabricatie van data”.
- `code_of_conduct.md › 6. Reporting and Enforcement` — “SAIN national” is rendered as “SAIN landelijk”, and “the National Team” as “het landelijke team” (the fixed term). The English uses both, and it is not clear whether they are the same body. If they are, both could be “het landelijke team (van SAIN)”.
- `code_of_conduct.md › 6. Reporting and Enforcement` — “within 2-3 working days” → “binnen 2–3 werkdagen” (alternative: “2 à 3”). “within 14 days” → “binnen 14 dagen”. The English does not say whether these are calendar or working days, or from when the period runs (presumably from when the outcome is communicated). The Dutch is just as open.
- `code_of_conduct.md › 6. Reporting and Enforcement` — “a private conversation” → “een gesprek onder vier ogen”. “Either party may ask” → “Elk van de partijen kan vragen”, chosen over “Beide partijen”, which could be read as “both together”.
- `code_of_conduct.md › 6. Reporting and Enforcement` — “The Chapter Directors discuss and decide on the outcome” is plural. The Dutch keeps “De Chapter Directors”, although each chapter has one Chapter Director. The English may mean the directors of all chapters, or the directors involved; the Dutch keeps that ambiguity.
- `code_of_conduct.md › 6. Reporting and Enforcement` — “the accused” → “Degene die beschuldigd wordt”. Earlier text says “the person reported” (“de persoon over wie de melding gaat”). Both are kept as in the English; a neutral term throughout may be preferable.
- `code_of_conduct.md › 6. Reporting and Enforcement` — “SAIN's Privacy Policy” → “het privacybeleid van SAIN”. If the website document is called “Privacyverklaring” in Dutch, use that name.
- `code_of_conduct.md › 7. Commitment to Intellectual Diversity` — “Members”: SAIN is a stichting and has no formal members. “Leden” is a literal translation and may suggest a membership that does not exist. Alternative: “Deelnemers”/“Iedereen bij SAIN”. The same applies to “SAIN member X” → “SAIN-lid X”.
- `code_of_conduct.md › 7. Commitment to Intellectual Diversity` — Degree of obligation: “should engage seriously” → “moeten zich … bezighouden” (firm); “people should be willing to revise their views” → “horen bereid te zijn” (softer); “What we require” → “Wat we vereisen”. Please check that the strength of each obligation is what SAIN intends.
- `code_of_conduct.md › 7. Commitment to Intellectual Diversity` — “timelines” (AI jargon: when transformative AI will arrive) → “tijdlijnen”. It may not be clear to a general Dutch reader.
- `code_of_conduct.md › 7. Commitment to Intellectual Diversity` — “No gatekeeping” → “Geen poortwachters”. Alternative: “Geen gatekeeping”.
- `code_of_conduct.md › Organizational Neutrality and Individual Expression` — “We enable the field” → “We maken het vakgebied mogelijk”, a literal rendering that sounds slightly odd. Alternative: “We ondersteunen het vakgebied”.
- `code_of_conduct.md › Organizational Neutrality and Individual Expression` — “chapter Communications teams” → “de communicatieteams van de chapters”. If “Communications” is a fixed team name (like the role title Communications Lead), it could be “de Communications-teams”.
