import type { Initiative, MilestoneStatus } from "@/types/domain";

/** Map progress % → phase index 0–5 (verbatim). */
export function getPhaseIdx(prog: number): number {
  if (prog < 18) return 0;
  if (prog < 34) return 1;
  if (prog < 52) return 2;
  if (prog < 72) return 3;
  if (prog < 92) return 4;
  return 5;
}

/** Milestone checklist for the current phase with done/active/upcoming status (verbatim). */
export function getPhaseMilestones(
  phaseIdx: number,
  init: Initiative
): MilestoneStatus[] {
  const sets: { l: string }[][] = [
    [
      { l: "BRD drafted and approved by business" },
      { l: "Vendor landscape assessment completed" },
      { l: "RFP issued to shortlisted vendors" },
      { l: "Vendor evaluation and selection completed" },
      { l: "Contract negotiated and signed" },
      { l: "Vendor onboarding checklist completed" },
    ],
    [
      { l: "Project charter approved by CIO" },
      { l: "Business case signed off by CFO" },
      { l: "Stakeholder register completed" },
      { l: "Project kick-off meeting held" },
      { l: "Governance cadence established" },
    ],
    [
      { l: "Detailed project plan baselined" },
      { l: "Risk register completed and reviewed" },
      { l: "RACI and resource plan agreed" },
      { l: "Budget and cost plan approved" },
      { l: "Blueprint and design sign-off received" },
    ],
    [
      { l: "Development environment provisioned" },
      { l: "Global Corp KT sessions completed" },
      { l: "Blueprint sign-off — all modules" },
      { l: `Build ${init.cat} Module 1 complete` },
      { l: `Build ${init.cat} Module 2 complete` },
      { l: "Integration development complete" },
      { l: "Data migration dry run completed" },
      { l: "System Integration Testing (SIT) done" },
    ],
    [
      { l: "UAT preparation and test cases ready" },
      { l: "UAT Cycle 1 completed" },
      { l: "UAT defects resolved" },
      { l: "UAT sign-off received from business" },
      { l: "Go-live readiness review complete" },
    ],
    [
      { l: "Cutover execution completed" },
      { l: "Go-Live achieved" },
      { l: "Hypercare period complete" },
      { l: "Formal handover to IT Operations" },
      { l: "Project closure report issued" },
    ],
  ];
  const ms = sets[phaseIdx] || sets[3];
  const phaseRanges: [number, number][] = [
    [0, 18],
    [18, 34],
    [34, 52],
    [52, 72],
    [72, 92],
    [92, 100],
  ];
  const [lo, hi] = phaseRanges[phaseIdx] || [52, 72];
  const pctInPhase = Math.max(0, Math.min(100, ((init.prog - lo) / (hi - lo)) * 100));
  const doneCount = Math.floor((pctInPhase / 100) * ms.length);
  return ms.map((m, i) => ({
    ...m,
    status: i < doneCount ? "done" : i === doneCount ? "active" : "upcoming",
  }));
}
