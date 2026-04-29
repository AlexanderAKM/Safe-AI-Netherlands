# SAIN Amsterdam chapter page

Source for `/chapters/amsterdam`.

## Past events list

The "Past events this academic year" panel is populated from a static JSON
snapshot at `src/data/lumaPastEvents.json`, **not** from a live Luma fetch.
This keeps deploys independent of Luma's API — if Luma is down or changes
shape, the build still works.

### Refresh the list

Run from the repo root:

```bash
npm run fetch-luma-events
```

This calls Luma's API for past events on calendar `cal-fabX01E6rMTOg70`
(SAIN Amsterdam) and overwrites `src/data/lumaPastEvents.json`. Then:

```bash
git diff src/data/lumaPastEvents.json   # eyeball the changes
git add src/data/lumaPastEvents.json
git commit -m "chore(amsterdam): refresh Luma past events"
git push
```

The page filters to events on or after September 1 of the current academic
year and sorts most-recent first, so the JSON can safely contain older
events — they just won't render.

### Where things live

| File | Purpose |
| --- | --- |
| `page.tsx` | The chapter page (this folder). |
| `src/data/sainAmsTeam.ts` | Team roster (name + role tiles). |
| `src/data/lumaPastEvents.json` | Snapshot of past Luma events. |
| `scripts/fetch-luma-events.mjs` | Refresh script for the snapshot above. |

### Upcoming events

Upcoming events are rendered via a Luma `<iframe>` embed in `page.tsx` and
need no maintenance — Luma serves them live.
