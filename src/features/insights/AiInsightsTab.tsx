import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { useInitiatives, useProgram } from "@/store/program";
import { computeMetrics } from "@/domain/metrics";
import { cr } from "@/lib/format";

export function AiInsightsTab() {
  const { role } = useProgram();
  const inits = useInitiatives();
  const m = useMemo(() => computeMetrics(inits), [inits]);
  const totalPtd = inits.reduce((s, i) => s + Math.round((i.bp * i.prog) / 100), 0);

  const panels = [
    {
      title: "Programme Progress",
      icon: "📊",
      color: "#00338D",
      bg: "bg-blue-50/60",
      points: [
        `Overall programme ${m.totalProg}% complete across ${inits.length} initiatives — ${inits.filter((i) => i.prog === 100).length} closed, ${m.red.length} Red, ${m.amber.length} Amber.`,
        `Wave 1 has ${inits.filter((i) => i.wave === 1 && (i.rag === "Red" || i.rag === "Amber")).length} initiatives at risk. Cloud Foundation leads at 58%.`,
        `${m.wave1Behind.length} Wave 1 initiatives behind plan — resource reallocation recommended to protect Q3 FY27 exits.`,
      ],
    },
    {
      title: "Risk Outlook",
      icon: "⚠️",
      color: "#DC2626",
      bg: "bg-red-50/60",
      points: [
        `${m.red.length + m.amber.length} Critical/High risks active. Top risk: TSA Exit — Critical applications (score 25, trending up).`,
        `Data migration complexity remains the single biggest technical risk — early assessment sprints should begin in blueprint phase.`,
        `Resource availability for Business SMEs is below 30% — CIO directive issued but formal commitments not yet confirmed.`,
      ],
    },
    {
      title: "Budget & Finance",
      icon: "💰",
      color: "#7C3AED",
      bg: "bg-violet-50/60",
      points: [
        `Total budget ${cr(m.totalBp)}. Actual spent ${cr(m.totalBs)} vs ${cr(totalPtd)} planned till date — ${cr(Math.abs(totalPtd - m.totalBs))} under plan.`,
        `Spend below plan: verify this is programme momentum (early stage) not delay. Wave 1 initiatives should be ramping now.`,
        `Utilisation at ${m.totalBp ? Math.round((m.totalBs / m.totalBp) * 100) : 0}% — appropriate for programme stage. No budget overrun risk at this time.`,
      ],
    },
    {
      title: "TSA & Exits",
      icon: "🔗",
      color: "#059669",
      bg: "bg-emerald-50/60",
      points: [
        `${m.tsaExpiring} TSA services expiring within 12 months. ${m.criticalTsa.length} classified as Critical readiness.`,
        `All ${inits.length} initiatives remain under Global Corp TSA. ${m.earlyTsa.length} have early exit obligations — Wave 1 exits are the immediate priority.`,
        `Product Engineering Platform (PLM) — Red status on critical path for Q3 FY27 exit. Immediate escalation required.`,
      ],
    },
  ];

  return (
    <div className="space-y-4 p-5">
      <div>
        <h2 className="text-2xl font-extrabold text-kpmg-navy">AI Insights</h2>
        <p className="text-sm text-muted-foreground">Computed programme intelligence · Role: {role}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {panels.map((p) => (
          <Card key={p.title} className="border-t-[3px] p-5" style={{ borderTopColor: p.color }}>
            <p className="mb-3 flex items-center gap-2 text-base font-bold" style={{ color: p.color }}>
              <span>{p.icon}</span> {p.title}
            </p>
            <div className="space-y-2">
              {p.points.map((pt, i) => (
                <div key={i} className={`rounded-lg p-2.5 text-[12px] leading-relaxed text-slate-600 ${p.bg}`}>
                  <span className="mr-2 font-bold" style={{ color: p.color }}>{i + 1}.</span>
                  {pt}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
