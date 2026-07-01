# KPMG IT SMO Suite — Project Documentation

Architecture, domain model, and extension guide for the IT Separation Management Office
platform. For setup and run instructions see [README.md](./README.md).

---

## 1. What the platform is (domain)

The app models a KPMG **IT separation engagement**: a client (e.g. *ClientCo*) is spinning
its IT estate out of a parent company (e.g. *Global Corp*) and must stand up ~25 IT
initiatives independently before the parent stops providing each service.

Key domain concepts:

| Concept | Meaning |
| --- | --- |
| **Initiative** | One of ~25 IT projects being separated (e.g. "SAP RISE — Core ERP"). |
| **Tower / Category** | 5 groupings: ERP, Manufacturing Tech & PLM, Business Functions, Infra & Cyber, Data & Analytics. |
| **TSA** | *Transition Service Agreement* — the parent provides a service until an agreed **exit** date (standard 3-year term). An **early exit [B]** happens before that term. |
| **Wave** | Rollout wave 1/2/3. Wave 1 = earliest, highest-risk exits (Q3–Q4 FY27). |
| **RAG** | Red / Amber / Green health status. |
| **Readiness** | TSA-exit readiness: Critical / At Risk / On Track (derived from wave + progress). |
| **Tech Dependency [A]** | An initiative that is a prerequisite for others. |
| **Phase** | Each initiative moves through a 6-phase lifecycle (Pre-Initiation → Closure), driven by its progress %. |
| **Artifact** | A per-phase deliverable document (BRD, Charter, Risk Register, WSR, …), authorable/AI-generatable. |
| **ARB** | *Architecture Review Board* — governance body enforcing integration principles & logging decisions. |
| **Role** | PMO Lead / SteerCo / Initiative Owner — a context toggle (display only today). |

---

## 2. Screens

| Route | Screen | Purpose |
| --- | --- | --- |
| `/` | Landing | Entry point — start setup or load the sample programme. |
| `/setup` | Setup Wizard | 5-step programme configuration. |
| `/app/overview` | Executive Overview | KPI strip, AI risk gauge, roadmap, tower progress. |
| `/app/initiatives` | Initiatives | Filterable/searchable grid of all initiatives. |
| `/app/initiatives/:id` | Initiative Detail | Phase stepper, health ring, milestones, AI insights, artifact folders. |
| `/app/tsa` | TSA Management | Exits grouped by quarter with readiness. |
| `/app/workstreams` | Workstreams | Initiatives grouped by tower with consolidated health. |
| `/app/roadmap` | Roadmap & Milestones | 12-quarter Gantt with programme milestones. |
| `/app/risks` | Risks & Issues | Cross-programme risk + issue registers. |
| `/app/arb` | Architecture Review | Team, process, principles, decision register. |
| `/app/finance` | Finance | Budget KPIs + per-initiative cost table. |
| `/app/insights` | AI Insights | Computed programme intelligence panels. |
| `/app/reports` | Reports | Per-initiative Weekly Status Reports. |

---

## 3. Architecture

The core principle: **data, domain logic, and API access know nothing about React.**
UI reads through a context store and an API client. Swapping to a real backend means
reimplementing one folder (`src/api/`) — no screen changes.

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  features/  │────▶│  store/      │────▶│  api/       │──▶ localStorage (today)
│  (screens)  │     │  (context)   │     │  (seam)     │    └─ HTTP backend (later)
└─────────────┘     └──────────────┘     └─────────────┘
       │                                        ▲
       ▼                                        │
┌─────────────┐     ┌──────────────┐            │
│ components/  │     │  domain/     │◀───────────┘
│ (ui, charts)│     │ (pure logic) │   data/ (typed seed data)
└─────────────┘     └──────────────┘
```

### Folder structure

```
src/
  main.tsx              App entry — mounts router + ProgramProvider
  router.tsx            All routes
  index.css             Tailwind + design tokens (KPMG colors as CSS vars)

  types/domain.ts       All TypeScript domain models

  data/                 Typed seed data (no React)
    catalog.ts            CATS, PHASES, ARB_*, NAV_ITEMS, QS, MILESTONES, PHASE_META
    initiatives.ts        the 25 initiatives + ROADMAP_PROJECTS
    risks.ts              CROSS_RISKS + CROSS_ISSUES

  domain/               Pure business logic (no React) — ported 1:1 from the original
    metrics.ts            computeMetrics, tsaReadiness, computeHealth
    phases.ts             getPhaseIdx, getPhaseMilestones
    insights.ts           getAIInsights (rule-based cards)
    timeline.ts           initTimeline (Gantt coords)
    aiPrompts.ts          buildCtx / buildInitCtx / buildArtifactPrompt (kept for later)

  api/                  ← the backend seam
    client.ts             getProgram / artifact load+save (localStorage today)
    ai.ts                 inert AI client (placeholders today)

  store/program.tsx     React context: current program + role

  components/
    ui/                   shadcn/ui primitives (button, card, dialog, table, …)
    brand/                KpmgLogo, RagBadge, StatCard, Markdown
    charts/               Donut (Recharts radial)
    layout/               AppShell, Sidebar, Topbar

  features/             One folder per screen
    landing/ setup/ overview/ initiatives/ tsa/ workstreams/
    roadmap/ risks/ arb/ finance/ insights/ reports/ ai/
```

### Design system

- KPMG navy `#00338D` is the primary color (as an HSL CSS var in `index.css`), green
  `#83BD41` is the secondary accent. Both are also exposed as Tailwind `kpmg.*` utilities.
- Type scale, spacing, and component styling come from Tailwind + shadcn/ui.
- Dark-mode tokens are defined but not toggled.

### Key derived logic (in `src/domain/`)

- **`computeMetrics(inits)`** — portfolio KPIs: total progress, RAG counts, budget totals,
  a composite `aiScore` (0–100), TSA buckets, per-tower progress.
- **`tsaReadiness(i)`** / **`computeHealth(i)`** — per-initiative readiness and 0–100 health.
- **`getPhaseIdx` / `getPhaseMilestones`** — map progress % to lifecycle phase + milestone
  checklist.
- **`initTimeline(i)`** — start/end quarter for the roadmap Gantt bar.

These are the same formulas as the original app, so all on-screen numbers match.

---

## 4. AI layer (currently inert)

All AI entry points live in **`src/api/ai.ts`**: `askCoPilot`, `generateArtifact`,
`analyzeRisk`, `initiativeNarrative`, `generatePrinciples`. Today each returns a labelled
placeholder after a short delay. **No `api.anthropic.com` call ships in the client** (no
API key, no CORS issues).

The real prompt builders (`src/domain/aiPrompts.ts`) are retained. To enable live AI:

1. Stand up a small backend endpoint (e.g. `/api/ai`) that holds the API key and forwards
   to the model provider.
2. In `src/api/ai.ts`, replace each function body with a `fetch` to that endpoint, passing
   the prompt from the corresponding `aiPrompts.ts` builder.

No UI component imports the model directly, so this is a single-file change.

---

## 5. Persistence

Artifact drafts, version history, and Weekly Status Reports are saved to **localStorage**
via `src/api/client.ts` (keys like `smo_art_${initiativeId}_${artifactName}`). To move to a
server, reimplement the load/save functions in `client.ts` as HTTP calls — the same
functions are already the only persistence entry points used by the UI.

---

## 6. Extending the app

### Add a new screen/tab
1. Create `src/features/<name>/<Name>Tab.tsx`.
2. Add a route in `src/router.tsx`.
3. Add a nav entry to `NAV_ITEMS` in `src/data/catalog.ts` (with a `lucide` icon name).

### Add a backend
Reimplement `src/api/client.ts` (data) and/or `src/api/ai.ts` (AI) to call your API.
Optionally introduce React Query around them for caching — the call sites are already
async-shaped.

### Enforce roles (RBAC)
`role` is available from `useProgram()`. Today it's display-only; gate views/fields on it
in `features/*` and (eventually) enforce server-side.

---

## 7. Verification

- `npm run typecheck` — no type errors.
- `npm run build` — clean production build; bundle is code-split (react / charts / markdown
  / app chunks).
- `npm run preview` — serve the built app and click through every route; AI buttons show the
  inert placeholder, no console errors.

---

## 8. Notes / known simplifications

- Data is seeded in `src/data/` (mock, not a database).
- AI features are placeholders (see §4).
- Role switching is a context toggle, not enforced access control.
- The Setup Wizard's custom initiative editing is limited to loading the sample set.
