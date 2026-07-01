import type { Initiative } from "@/types/domain";
import { CATS } from "@/data/catalog";

const Q_LOOKUP: Record<string, number> = {
  "Q1 FY27": 1, "Q2 FY27": 2, "Q3 FY27": 3, "Q4 FY27": 4,
  "Q1 FY28": 5, "Q2 FY28": 6, "Q3 FY28": 7, "Q4 FY28": 8,
  "Q1 FY29": 9, "Q2 FY29": 10, "Q3 FY29": 11, "Q4 FY29": 12,
};

const WAVE_STARTS: Record<number, number> = { 1: 1, 2: 3, 3: 6 };

/** Gantt coordinates for an initiative on the 12-quarter roadmap (verbatim). */
export function initTimeline(init: Initiative): {
  startQ: number;
  endQ: number;
  color: string;
} {
  const endQ = Q_LOOKUP[init.goLive] || 11;
  const startQ = Math.min(WAVE_STARTS[init.wave] || 1, endQ - 1);
  return { startQ, endQ, color: CATS[init.cat]?.color || "#374151" };
}
