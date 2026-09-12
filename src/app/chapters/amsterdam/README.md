# SAIN Amsterdam chapter page

Source for `/chapters/amsterdam`.

## Past events list

The "Past events this academic year" panel is populated from a static JSON
snapshot at `src/data/lumaPastEventsAmsterdam.json`, **not** from a live Luma fetch.
This keeps deploys independent of Luma's API. If Luma is down or changes
shape, the build still works.

### Refresh the list

Run from the repo root:

```bash
npm run fetch-luma-events-amsterdam
```

This calls Luma's API for past events on calendar `cal-fabX01E6rMTOg70`
(SAIN Amsterdam) and overwrites `src/data/lumaPastEventsAmsterdam.json`. Then:

```bash
git diff src/data/lumaPastEventsAmsterdam.json   # eyeball the changes
git add src/data/lumaPastEventsAmsterdam.json
git commit -m "chore(amsterdam): refresh Luma past events"
git push
```

This refresh is also run automatically once a day by the
`.github/workflows/refresh-past-events.yml` GitHub Action, so manual runs are
only needed if you want to update immediately.

The page filters to events on or after September 1 of the current academic
year and sorts most-recent first, so the JSON can safely contain older
events. They just won't render.

### Where things live

| File | Purpose |
| --- | --- |
| `page.tsx` | The chapter page (this folder). |
| `src/data/sainAmsTeam.ts` | Team roster (name + role tiles). |
| `src/data/lumaPastEventsAmsterdam.json` | Snapshot of past Luma events. |
| `scripts/fetch-luma-events-amsterdam.mjs` | Refresh script for the snapshot above. |
| `public/logos/ellis.svg` | ELLIS logo, taken unmodified from their site. |

### ELLIS

ELLIS Unit Amsterdam supports the chapter by promoting our work through its
network. It appears twice on this page, both linking to
<https://ivi.fnwi.uva.nl/ellis/>:

- a "Supported by" lockup in the hero, on a white chip because the logo's
  wordmark is near-black and would vanish on the navy background;
- a "Partners & collaborations" block at the end of the About section, with a
  sentence describing the relationship.

The markup is inline rather than a shared component — there is only one
partner today. If a second one is added, factor it out.

### Upcoming events

Upcoming events are rendered via a Luma `<iframe>` embed in `page.tsx` and
need no maintenance because Luma serves them live.
