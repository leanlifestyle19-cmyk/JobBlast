# JobBlast

Personal job-application workbench. Reads a listings feed (RoleScout SG output), scores relevance against your profile, AI-tailors CV bullets + cover letters per job (Anthropic API), and tracks every application through a funnel — all offline-first, single-user, zero backend.

Semi-automated by design: JobBlast never logs into job sites or auto-submits. "Approve & Open" opens the real application page; you do the final click.

## Files

- `index.html` — the entire app (vanilla JS, IndexedDB, no CDN)
- `sw.js` — service worker (cache name: `jobblast-20260712` — **bump on every deploy**, ship with index.html in the same commit)
- `manifest.json`, `icon-192.png`, `icon-512.png`

## Deploy (GitHub Pages)

1. Create repo (e.g. `jobblast`), upload all 5 files to the root.
2. Settings → Pages → deploy from `main` / root.
3. Open `https://<user>.github.io/jobblast/` on your phone → Add to Home Screen.
4. Every later deploy: bump `CACHE` in `sw.js` first, commit `sw.js` + `index.html` together.

## Setup inside the app

1. **Setup tab** → paste master CV + a sample cover letter → Save.
2. Add your Anthropic API key. Note: this is an **API key from console.anthropic.com** — billed separately from a Claude.ai subscription. No key = Demo mode (canned tailoring output so the UI still works).
3. Set Feed URL to your RoleScout scraper output (raw GitHub JSON works). Format:

```json
[
  {
    "title": "Deputy Director, Operational Excellence",
    "company": "Health Promotion Board",
    "location": "Singapore",
    "url": "https://...",
    "description": "full JD text...",
    "posted_date": "2026-07-10",
    "source": "Careers@Gov"
  }
]
```

Merged by URL+title; duplicates ignored. Sample SG listings are pre-seeded on first run — clear them in Setup → Clear all data once the real feed is connected.

## Flow

Queue (ranked by match score) → tap card → Tailor with AI (diff view, bold = amendment, edit the letter) → Approve & Open (logs APPLIED, opens the job page) → Track tab (status pipeline, notes, FOLLOW UP stamp at 7 days, CSV export) → Stats (daily target, streak, 7-day chart, funnel).

## Conventions honoured (Master AAR)

M1 cache bump discipline · M2 no CDN/system fonts · M3 SW registers first · M4 individual cache.put · M5 navigate-by-mode · M6 localDateStr (SGT-safe) · M7 guarded IDB stores · M8 min-height:0 scroll areas · M9 Save button outside scroll · M10 API errors surfaced with HTTP status · M16 BYPASS list (api.anthropic.com, githubusercontent, github.io) · M17 node --check passed.# JobBlast