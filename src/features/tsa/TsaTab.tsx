import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Link2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ReadinessBadge } from "@/components/brand/RagBadge";
import { StatCard } from "@/components/brand/StatCard";
import { useInitiatives } from "@/store/program";
import { tsaReadiness } from "@/domain/metrics";
import { CATS } from "@/data/catalog";
import { cn } from "@/lib/utils";
import type { Readiness } from "@/types/domain";

const Q_ORDER: Record<string, number> = {
  "Q3 FY27": 1, "Q4 FY27": 2, "Q1 FY28": 3, "Q2 FY28": 4,
  "Q3 FY28": 5, "Q4 FY28": 6, "Q1 FY29": 7,
};

export function TsaTab() {
  const navigate = useNavigate();
  const inits = useInitiatives();
  const [filter, setFilter] = useState<Readiness | "all">("all");

  const early = inits.filter((i) => i.tsa);
  const counts = {
    Critical: early.filter((i) => tsaReadiness(i) === "Critical").length,
    "At Risk": early.filter((i) => tsaReadiness(i) === "At Risk").length,
    "On Track": early.filter((i) => tsaReadiness(i) === "On Track").length,
  };

  const grouped = useMemo(() => {
    const filtered = early.filter((i) => filter === "all" || tsaReadiness(i) === filter);
    const g: Record<string, typeof filtered> = {};
    filtered.forEach((i) => {
      const q = i.tsaQ || "TBD";
      (g[q] ||= []).push(i);
    });
    return Object.entries(g).sort((a, b) => (Q_ORDER[a[0]] || 9) - (Q_ORDER[b[0]] || 9));
  }, [early, filter]);

  const qColor = (q: string) =>
    ["Q3 FY27", "Q4 FY27"].includes(q) ? "#DC2626" : q.includes("FY28") ? "#D97706" : "#059669";

  return (
    <div className="space-y-4 p-5">
      <div>
        <h2 className="text-2xl font-extrabold text-kpmg-navy">TSA Management</h2>
        <p className="text-sm text-muted-foreground">
          Transition Service Agreement exits — when each service becomes independent from Global Corp.
        </p>
      </div>

      <Card className="border-blue-200 bg-blue-50/60 p-4">
        <p className="text-[13px] font-bold text-blue-900">📌 All {inits.length} initiatives are under Global Corp TSA</p>
        <p className="text-xs leading-relaxed text-blue-800/80">
          <b>[B] Early Exit</b> = Global Corp exits that service before the standard 3-year term.{" "}
          <b>[A] Tech Dep</b> = technical prerequisite. Standard TSA runs through Q3 FY29.
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard label="Total Under TSA" value={inits.length} accent="#00338D" icon={Link2} />
        <StatCard label="Early Exit [B]" value={early.length} accent="#7C3AED" />
        <StatCard label="Critical" value={counts.Critical} accent="#DC2626" />
        <StatCard label="At Risk" value={counts["At Risk"]} accent="#D97706" />
        <StatCard label="On Track" value={counts["On Track"]} accent="#059669" />
      </div>

      {/* Readiness filter */}
      <div className="flex flex-wrap gap-2">
        {(["all", "Critical", "At Risk", "On Track"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
              filter === f ? "border-kpmg-navy bg-kpmg-navy text-white" : "border-border bg-white hover:bg-slate-50"
            )}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      {/* Quarter groups */}
      {grouped.map(([q, items]) => (
        <div key={q} className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ background: qColor(q) }}>
              {q}
            </span>
            <span className="text-xs text-muted-foreground">{items.length} exits</span>
          </div>
          <Card className="overflow-hidden p-0">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Initiative</th>
                  <th className="px-4 py-2 text-left font-semibold">Service Exiting</th>
                  <th className="px-4 py-2 text-left font-semibold">Progress</th>
                  <th className="px-4 py-2 text-left font-semibold">Readiness</th>
                  <th className="px-4 py-2 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {items.map((i) => {
                  const r = tsaReadiness(i)!;
                  return (
                    <tr key={i.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <p className="text-[13px] font-bold text-foreground">{i.name}</p>
                        <span className="text-[10px] font-semibold" style={{ color: CATS[i.cat].color }}>{i.cat}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{i.tsaSvc}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Progress value={i.prog} className="h-1.5 w-20" indicatorColor={CATS[i.cat].color} />
                          <span className="text-[11px] font-semibold">{i.prog}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><ReadinessBadge r={r} /></td>
                      <td className="px-4 py-3 text-right">
                        <Button size="sm" variant="ghost" className="gap-1 text-kpmg-navy" onClick={() => navigate(`/app/initiatives/${i.id}`)}>
                          View <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      ))}
    </div>
  );
}
