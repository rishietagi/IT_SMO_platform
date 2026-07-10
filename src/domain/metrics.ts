import type {
  Initiative,
  Readiness,
  PortfolioMetrics,
} from "@/types/domain";
import { CATEGORY_NAMES } from "@/data/catalog";

/** TSA exit readiness based on wave + progress (verbatim from original). */
export function tsaReadiness(i: Initiative): Readiness | null {
  if (!i.tsa) return null;
  if (i.wave === 1) {
    if (i.prog < 20) return "Critical";
    if (i.prog < 40) return "At Risk";
    return "On Track";
  }
  if (i.wave === 2) {
    if (i.prog < 10) return "At Risk";
    return "On Track";
  }
  return "On Track";
}

/** Single-initiative health score 30–95 (verbatim). */
export function computeHealth(init: Initiative): number {
  const base = init.rag === "Green" ? 82 : init.rag === "Amber" ? 66 : 46;
  const readiness = tsaReadiness(init);
  const tsaPenalty =
    init.tsa && readiness === "Critical"
      ? -8
      : init.tsa && readiness === "At Risk"
        ? -4
        : 0;
  return Math.max(30, Math.min(95, base + tsaPenalty));
}

/** Portfolio-level aggregates + composite AI risk score (verbatim math). */
export function computeMetrics(inits: Initiative[]): PortfolioMetrics {
  const totalProg = inits.length
    ? Math.round(inits.reduce((s, i) => s + i.prog, 0) / inits.length)
    : 0;
  const red = inits.filter((i) => i.rag === "Red");
  const amber = inits.filter((i) => i.rag === "Amber");
  const earlyTsa = inits.filter((i) => i.tsa);
  const criticalTsa = earlyTsa.filter((i) => tsaReadiness(i) === "Critical");
  const wave1Behind = inits.filter((i) => i.wave === 1 && i.prog < 25);
  const totalBp = inits.reduce((s, i) => s + i.bp, 0);
  const totalBs = inits.reduce((s, i) => s + i.bs, 0);
  const budgetGap =
    totalBp > 0
      ? Math.round(Math.abs((totalBs / totalBp) * 100 - totalProg) / 10)
      : 0;
  const rawScore =
    red.length * 8 +
    amber.length * 2 +
    criticalTsa.length * 8 +
    wave1Behind.length * 5 +
    budgetGap;
  const aiScore = Math.min(Math.round(rawScore), 100);
  const tsaExpiring = earlyTsa.filter(
    (i) => i.tsaQ && ["Q3 FY27", "Q4 FY27", "Q1 FY28"].includes(i.tsaQ)
  ).length;

  const topRisks: PortfolioMetrics["topRisks"] = [
    ...red.map((i) => ({
      txt: `${i.name} — ${i.rag} RAG on critical path`,
      sev: "Critical" as const,
    })),
    ...criticalTsa.map((i) => ({
      txt: `${i.name} — TSA exit ${i.tsaQ} at risk`,
      sev: "High" as const,
    })),
    ...wave1Behind
      .filter((i) => i.rag !== "Red")
      .slice(0, 2)
      .map((i) => ({ txt: `${i.name} — Wave 1 behind plan`, sev: "Medium" as const })),
  ].slice(0, 5);

  const catProgress: Record<string, number> = {};
  CATEGORY_NAMES.forEach((cat) => {
    const ci = inits.filter((i) => i.cat === cat);
    catProgress[cat] = ci.length
      ? Math.round(ci.reduce((s, i) => s + i.prog, 0) / ci.length)
      : 0;
  });

  const tsBuckets: Record<string, Initiative[]> = {
    "<6M": [],
    "6-12M": [],
    "12-24M": [],
    "24-36M": [],
    ">36M": [],
  };
  earlyTsa.forEach((i) => {
    const q = i.tsaQ;
    if (q && ["Q3 FY27", "Q4 FY27"].includes(q)) tsBuckets["<6M"].push(i);
    else if (q === "Q1 FY28") tsBuckets["6-12M"].push(i);
    else if (q && ["Q2 FY28", "Q3 FY28"].includes(q)) tsBuckets["12-24M"].push(i);
    else tsBuckets[">36M"].push(i);
  });

  return {
    totalProg,
    red,
    amber,
    earlyTsa,
    criticalTsa,
    wave1Behind,
    totalBp,
    totalBs,
    budgetGap,
    aiScore,
    tsaExpiring,
    topRisks,
    catProgress,
    tsBuckets,
  };
}
