# IT SMO Platform — Frontend Polish & Deploy Prep

## Context
This is a single-file React component (`App-1.jsx`, ~3,100 lines) for an internal
KPMG "IT Separation Management Office" (SMO) demo platform — tracks separation
initiatives, TSA exits, roadmap, risk scoring, etc. for a client engagement.
It was originally built and previewed as a Claude.ai artifact, so it's a self-contained
component (only imports React itself, no other local files) but has **no build
tooling around it yet**.

It needs to become a real deployable app for a demo video by Thursday.

## What NOT to touch right now
The file has several AI-powered features that call `api.anthropic.com` directly
from the browser with no API key (works in Claude.ai artifacts, will NOT work once
deployed for real — no key, CORS blocked). **Leave these fetch calls exactly as they
are for now.** Do not stub them, do not wire a backend proxy, do not remove them.
I'm waiting on direction from my director's team on how they want this handled
(mock data vs. real backend) before touching that layer. Just leave it broken/inert
for the moment — don't let it block the rest of the work.

## Tasks for this pass

1. **Scaffold into a deployable Vite app**
   - Standard Vite + React setup (`package.json`, `vite.config.js`, `index.html`, entry point)
   - Move `App-1.jsx` in as `src/App.jsx`
   - Confirm `npm run dev` and `npm run build` both work cleanly

2. **Left-align all text**
   - Go through every screen — landing page, setup wizard, main platform (all tabs/views),
     initiative detail panels, roadmap, risk analysis, etc.
   - Any centered text blocks, headers, or labels should default to left-aligned unless
     there's a clear design reason not to (e.g. a centered hero title on the landing page
     might be fine — use judgment, flag anything ambiguous)

3. **Fix font sizes and colors for consistency**
   - Audit the inline styles — there's a lot of ad hoc `fontSize`/`color` values scattered
     through the file. Establish a consistent type scale (e.g. h1/h2/body/caption) and
     consistent color usage (the KPMG blue `#00338D` is already used as a primary accent —
     keep that as the anchor color)
   - Clean up anywhere text is too small to read comfortably or colors clash

4. **Add KPMG branding**
   - Logo file is at `/kpmg-logo.png` (transparent background, navy wordmark)
   - Place it in the header/nav of the main platform view, and on the landing page
   - Match KPMG's blue (`#00338D`, already used in the file) — don't introduce a
     different blue

5. **Go through each screen for general polish**
   - Landing page, setup wizard (all 5 steps), main platform (all tabs), and any
     modal/detail views
   - Fix obvious spacing/alignment inconsistencies, awkward wrapping, etc. as you find them
   - This is a demo video walkthrough, so it needs to look clean and intentional on
     every screen someone will actually click through, not just the main dashboard

## Heads up for later
Once I get the full original codebase/deployment setup from the team that built this,
I'll likely need to swap out whatever scaffolding you set up here for however they
actually deploy it (their build config, hosting, env vars, possibly a real backend for
the AI calls). Don't over-invest in deployment infra beyond what's needed to get a
working local dev server + a simple static build I can preview/demo from (e.g. Vercel
preview deploy is fine) — treat this as throwaway-able scaffolding, not the final
production setup.

## Working style
Plan mode first — give me a short plan before making changes, especially for the
scaffolding step. After that, work through tasks 2-5 and show me screens as you go
rather than doing all 3,000+ lines in one silent pass.
