import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatCard } from "@/components/brand/StatCard";
import { TriangleAlert } from "lucide-react";
import { CROSS_RISKS, CROSS_ISSUES } from "@/data/risks";
import { cn } from "@/lib/utils";

const sevColor = (s: string) =>
  s === "High" || s === "Critical" ? "#DC2626" : s === "Medium" ? "#D97706" : "#6B7280";
const scoreColor = (n: number) => (n >= 15 ? "#DC2626" : n >= 10 ? "#D97706" : "#6B7280");

export function RisksTab() {
  const [riskCat, setRiskCat] = useState("all");
  const riskCats = ["all", ...Array.from(new Set(CROSS_RISKS.map((r) => r.cat)))];
  const risks = CROSS_RISKS.filter((r) => riskCat === "all" || r.cat === riskCat);

  const open = CROSS_ISSUES.filter((i) => i.status === "Open").length;
  const inProg = CROSS_RISKS.filter((r) => r.status === "In Progress").length;
  const critical = CROSS_RISKS.filter((r) => r.score >= 15).length;

  return (
    <div className="space-y-4 p-5">
      <div>
        <h2 className="text-2xl font-extrabold text-kpmg-navy">Risks &amp; Issues</h2>
        <p className="text-sm text-muted-foreground">
          Cross-programme risk &amp; issue register — computed from initiative data and programme context.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Risks" value={CROSS_RISKS.length} accent="#00338D" icon={TriangleAlert} />
        <StatCard label="Critical / High" value={critical} accent="#DC2626" />
        <StatCard label="Open Issues" value={open} accent="#D97706" />
        <StatCard label="In Progress" value={inProg} accent="#0284C7" />
      </div>

      <Tabs defaultValue="risks">
        <TabsList>
          <TabsTrigger value="risks">⚠ Risks</TabsTrigger>
          <TabsTrigger value="issues">🔴 Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="risks" className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {riskCats.map((c) => (
              <button
                key={c}
                onClick={() => setRiskCat(c)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                  riskCat === c ? "border-kpmg-navy bg-kpmg-navy text-white" : "border-border bg-white hover:bg-slate-50"
                )}
              >
                {c === "all" ? "All" : c}
              </button>
            ))}
          </div>
          <Card className="overflow-x-auto p-0">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase text-muted-foreground">
                <tr>
                  <th className="px-3 py-2.5 text-left font-semibold">ID</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Risk</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Category</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Prob</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Impact</th>
                  <th className="px-3 py-2.5 text-center font-semibold">Score</th>
                  <th className="px-3 py-2.5 text-center font-semibold">Trend</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Owner</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {risks.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-3 py-3 text-xs font-bold text-kpmg-navy">{r.id}</td>
                    <td className="px-3 py-3">
                      <p className="text-[13px] font-semibold text-foreground">{r.desc}</p>
                      <p className="text-[11px] text-muted-foreground">{r.mitigation}</p>
                    </td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">{r.cat}</td>
                    <td className="px-3 py-3 text-xs font-semibold" style={{ color: sevColor(r.prob) }}>{r.prob}</td>
                    <td className="px-3 py-3 text-xs font-semibold" style={{ color: sevColor(r.impact) }}>{r.impact}</td>
                    <td className="px-3 py-3 text-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-extrabold text-white" style={{ background: scoreColor(r.score) }}>
                        {r.score}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center font-bold" style={{ color: r.trend === "↑" ? "#DC2626" : "#9CA3AF" }}>{r.trend}</td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">{r.owner}</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>

        <TabsContent value="issues">
          <Card className="overflow-x-auto p-0">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase text-muted-foreground">
                <tr>
                  <th className="px-3 py-2.5 text-left font-semibold">ID</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Issue</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Category</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Severity</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Owner</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {CROSS_ISSUES.map((i) => (
                  <tr key={i.id} className="hover:bg-slate-50">
                    <td className="px-3 py-3 text-xs font-bold text-kpmg-navy">{i.id}</td>
                    <td className="px-3 py-3">
                      <p className="text-[13px] font-semibold text-foreground">{i.desc}</p>
                      <p className="text-[11px] text-muted-foreground">{i.action}</p>
                    </td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">{i.cat}</td>
                    <td className="px-3 py-3">
                      <span className="rounded-md px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: sevColor(i.sev) }}>{i.sev}</span>
                    </td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">{i.owner}</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">{i.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
