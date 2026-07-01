import type { Initiative, InsightCard } from "@/types/domain";
import { tsaReadiness } from "./metrics";

/** Rule-based initiative insight cards (verbatim from original getAIInsights). */
export function getAIInsights(init: Initiative): InsightCard[] {
  const out: InsightCard[] = [];
  if (init.rag === "Red")
    out.push({ icon: "🔴", c: "#DC2626", bg: "#FEF2F2", label: "Critical Schedule Risk", body: `${init.name} is off track. Immediate recovery plan required — current trajectory puts ${init.tsa ? init.tsaQ + " TSA exit" : init.goLive + " go-live"} at risk.`, action: "Create Recovery Plan" });
  else if (init.rag === "Amber")
    out.push({ icon: "🟡", c: "#D97706", bg: "#FFFBEB", label: "Schedule Risk Identified", body: `Progress at ${init.prog}% with milestones requiring attention. Resource reallocation recommended to protect ${init.tsa ? init.tsaQ + " exit" : init.goLive + " go-live"}.`, action: "View Recommendation" });

  if (init.bs / init.bp > 0.5 && init.prog < 40)
    out.push({ icon: "⚠️", c: "#D97706", bg: "#FFFBEB", label: "Budget Alert", body: `Spend at ${Math.round((init.bs / init.bp) * 100)}% of budget vs ${init.prog}% programme progress. Forecast indicates potential overrun if current burn rate continues.`, action: "View Budget Forecast" });
  else
    out.push({ icon: "💰", c: "#059669", bg: "#F0FDF4", label: "Budget On Track", body: `₹${init.bs}Cr spent of ₹${init.bp}Cr budget. Utilisation aligned to programme stage. No overrun risk at this time.`, action: "View Budget Detail" });

  if (init.tsa && tsaReadiness(init) === "Critical")
    out.push({ icon: "⏰", c: "#991B1B", bg: "#FEF2F2", label: "TSA Exit Urgent", body: `Global Corp exits "${init.tsaSvc}" at ${init.tsaQ}. Current readiness is Critical. Escalation to SteerCo required.`, action: "Escalate Now" });
  else if (init.td)
    out.push({ icon: "⛓", c: "#7C3AED", bg: "#F5F3FF", label: "Dependency Alert", body: `This initiative is a technical prerequisite [A] for downstream workstreams. Any delay has cascading programme impact.`, action: "View Dependency Map" });
  else
    out.push({ icon: "🟢", c: "#059669", bg: "#F0FDF4", label: "Quality Outlook", body: `No critical blockers identified. Maintain current delivery pace and weekly SMO check-ins to protect the ${init.goLive} go-live target.`, action: "View Quality Plan" });

  out.push({ icon: "⚡", c: "#00338D", bg: "#EFF6FF", label: "Next Best Action", body: init.prog < 20 ? `Finalise vendor selection and contract within 2 weeks to maintain ${init.goLive} go-live trajectory.` : init.prog < 50 ? `Complete blueprint sign-off across all modules before build commences. Block any scope changes.` : `Parallel-stream testing activities with build completion to compress the schedule by 2–3 weeks.`, action: "Create Action" });

  return out.slice(0, 4);
}
