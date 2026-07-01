# KPMG IT SMO Suite

An internal KPMG **IT Separation Management Office (SMO)** platform — a single-page
web app for tracking an IT separation programme (a client spinning its IT estate out
of a parent company): initiatives, TSA exits, roadmap, risks, finances, architecture
governance, and per-initiative artifacts.

> This is a front-end demo application. Data is local/seeded and the AI features are
> currently **inert** (see [AI features](#ai-features)). The architecture is built so a
> real backend can be added later without rewriting the UI.

---

## Prerequisites

- **Node.js 20+** and npm

Check with:

```bash
node --version   # should be v20 or higher
npm --version
```

> If you don't have Node installed and use conda, you can create an isolated env:
> ```bash
> conda create -n it-smo -c conda-forge nodejs=20 -y
> conda activate it-smo
> ```

---

## Getting started

From the project root:

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot reload)
npm run dev
```

Then open the URL it prints (usually **http://localhost:5173/**).

That's it — no environment variables or backend required.

---

## Available scripts

| Command             | What it does                                              |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with hot-module reload         |
| `npm run build`     | Type-check-safe production build → outputs to `dist/`    |
| `npm run preview`   | Serve the built `dist/` locally (verify the prod build)  |
| `npm run typecheck` | Run `tsc --noEmit` to check types without building       |

Typical verify-before-deploy loop:

```bash
npm run typecheck && npm run build && npm run preview
```

---

## Using the app

1. On the landing page choose:
   - **Sample SMO Program** — loads a fully populated demo (ClientCo separating from
     Global Corp, 25 initiatives) and drops you into the dashboard.
   - **Setup New SMO Program** — a 5-step wizard to configure your own programme (use
     "Use Sample Data" / "Load Sample 25" to fill it quickly).
2. Navigate via the left sidebar: Executive Overview, Initiatives, TSA Management,
   Workstreams, Roadmap, Risks & Issues, Architecture Review, Finance, AI Insights,
   Reports.
3. Click any initiative to open its **detail view** (lifecycle phases, health, milestones,
   and per-phase artifacts).
4. The **role switcher** (top-right) and **Ask AI** co-pilot (bottom bar) are available on
   every app screen.

---

## AI features

The app has several AI touch-points (co-pilot chat, artifact generation, risk analysis,
initiative assessment, principle generation). These are intentionally **not wired to a
live model** — they return a graceful placeholder after a short delay, so the UI is fully
demoable without an API key or any outbound request.

All AI logic is isolated in **`src/api/ai.ts`**. To enable real AI later, replace the
function bodies there with calls to a server-side proxy that holds the API key. No UI
component needs to change. See [PROJECT.md](./PROJECT.md) for details.

---

## Deployment (Vercel — free)

This is a standard static Vite build, so it deploys on Vercel's free tier with zero config:

1. Push the repo to GitHub.
2. In Vercel: **Add New → Project → Import** your repo.
3. Vercel auto-detects **Vite**. Confirm:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **Deploy.** No environment variables are needed.

Every subsequent push to the connected branch auto-redeploys. PRs get preview URLs.

> `dist/` and `node_modules/` are git-ignored — Vercel builds fresh on its own.

---

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix primitives) for the component system
- **Recharts** for charts (radial gauges, progress)
- **react-router-dom** for routing
- **lucide-react** for icons
- **react-markdown** + **remark-gfm** for artifact rendering

For architecture, folder layout, and the domain model, see **[PROJECT.md](./PROJECT.md)**.
