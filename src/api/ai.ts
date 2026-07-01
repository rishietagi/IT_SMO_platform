// Inert AI client. The AI features (co-pilot chat, artifact generation, risk
// analysis) are intentionally NOT wired to a live model yet — per the standing
// directive to wait on the backend/API-key decision. These functions preserve
// the call surface and return a graceful, clearly-labelled placeholder so the
// UI looks and feels complete without a key or any outbound request.
//
// When the backend is ready: replace the bodies here with fetch calls to a
// server-side proxy (which holds the key). No component needs to change.

const DELAY = 700;

export const AI_ENABLED = false;

const NOTICE =
  "AI generation will be enabled once the backend is connected. This is a preview placeholder — the full model response will appear here.";

function delay<T>(value: T, ms = DELAY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/** Conversational co-pilot (programme or initiative scope). */
export function askCoPilot(_prompt: string, _context: string): Promise<string> {
  return delay(
    `${NOTICE}\n\nYour question was captured and will be answered against the live programme context once AI is enabled.`
  );
}

/** Generate a consulting-quality artifact (BRD, Charter, etc.). */
export function generateArtifact(_prompt: string): Promise<string> {
  return delay(
    `## Draft (preview)\n\n${NOTICE}\n\nOnce enabled, a full, initiative-specific document will be generated here in Markdown, with tables and consulting-quality structure.`
  );
}

/** Executive risk-score narrative for the overview. */
export function analyzeRisk(_context: string): Promise<string> {
  return delay(
    `${NOTICE}\n\nThe risk narrative will validate the computed score, name the top drivers, and recommend an action once AI is enabled.`
  );
}

/** Short health assessment for a single initiative. */
export function initiativeNarrative(_context: string): Promise<string> {
  return delay(NOTICE, 500);
}

/** Guiding-principles generator used by the setup wizard. */
export function generatePrinciples(_context: string): Promise<string> {
  return delay(
    `${NOTICE}\n\nUse "Load Sample" for now to populate guiding principles.`,
    500
  );
}
