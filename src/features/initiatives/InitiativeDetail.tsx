import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, FileText, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Donut } from "@/components/charts/Donut";
import { RagBadge, PriBadge, ReadinessBadge } from "@/components/brand/RagBadge";
import { PhaseFolder } from "./PhaseFolder";
import { ArtifactDialog } from "./ArtifactDialog";
import { useInitiatives, useProgram } from "@/store/program";
import { computeHealth, tsaReadiness } from "@/domain/metrics";
import { getPhaseIdx, getPhaseMilestones } from "@/domain/phases";
import { getAIInsights } from "@/domain/insights";
import { PHASE_META, PHASES, CATS } from "@/data/catalog";
import { initiativeNarrative } from "@/api/ai";
import { cr } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Artifact, Initiative } from "@/types/domain";

export function InitiativeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inits = useInitiatives();
  const init = inits.find((i) => i.id === Number(id));

  const [artifact, setArtifact] = useState<Artifact | null>(null);
  const [dlgOpen, setDlgOpen] = useState(false);
  const [narrative, setNarrative] = useState("");
  const [narrLoading, setNarrLoading] = useState(false);

  const phaseIdx = init ? getPhaseIdx(init.prog) : 0;
  const milestones = useMemo(
    () => (init ? getPhaseMilestones(phaseIdx, init) : []),
    [init, phaseIdx]
  );
  const insights = useMemo(() => (init ? getAIInsights(init) : []), [init]);

  if (!init) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Initiative not found.{" "}
        <button className="text-kpmg-navy underline" onClick={() => navigate("/app/initiatives")}>
          Back to initiatives
        </button>
      </div>
    );
  }

  const cat = CATS[init.cat];
  const health = computeHealth(init);
  const healthColor = health >= 75 ? "#16A34A" : health >= 55 ? "#D97706" : "#DC2626";
  const readiness = tsaReadiness(init);
  const done = milestones.filter((m) => m.status === "done").length;

  const openArtifact = (a: Artifact) => {
    setArtifact(a);
    setDlgOpen(true);
  };
  const runNarrative = async () => {
    setNarrLoading(true);
    setNarrative(await initiativeNarrative(""));
    setNarrLoading(false);
  };

  return (
    <div className="space-y-4 p-5">
      <button
        onClick={() => navigate("/app/initiatives")}
        className="flex items-center gap-1.5 text-xs font-semibold text-kpmg-navy hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Initiatives
      </button>

      {/* Header */}
      <div className="flex flex-wrap items-start gap-3">
        <div className="h-10 w-1.5 rounded-full" style={{ background: cat.color }} />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-extrabold text-kpmg-navy">{init.name}</h2>
            <RagBadge rag={init.rag} />
            {readiness && <ReadinessBadge r={readiness} />}
          </div>
          <p className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
            <span>Category: <b className="text-foreground">{init.cat}</b></span>
            <span>Wave: <b className="text-foreground">{init.wave}</b></span>
            <span>Priority: <PriBadge p={init.pri} /></span>
            <span>Go-Live: <b className="text-foreground">{init.goLive}</b></span>
            <span>Budget: <b className="text-foreground">{cr(init.bp)}</b></span>
          </p>
        </div>
      </div>

      {/* Phase stepper */}
      <Card className="p-5">
        <p className="mb-4 text-sm font-bold text-foreground">
          Project Lifecycle <span className="text-muted-foreground">(6 Phases)</span>
        </p>
        <div className="flex items-start">
          {PHASE_META.map((p, i) => {
            const state = i < phaseIdx ? "done" : i === phaseIdx ? "current" : "upcoming";
            return (
              <div key={i} className="flex flex-1 items-start">
                <div className="flex flex-1 flex-col items-center text-center">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ring-2",
                      state === "done" && "bg-emerald-500 text-white ring-emerald-500",
                      state === "current" && "bg-kpmg-navy text-white ring-kpmg-navy",
                      state === "upcoming" && "bg-slate-100 text-slate-400 ring-slate-200"
                    )}
                  >
                    {state === "done" ? "✓" : i + 1}
                  </div>
                  <p className={cn("mt-1.5 text-[11px] font-bold", state === "upcoming" ? "text-muted-foreground" : "text-foreground")}>
                    {p.short}
                  </p>
                  <p className="text-[10px] leading-tight text-muted-foreground">{p.sub}</p>
                </div>
                {i < PHASE_META.length - 1 && (
                  <div className={cn("mt-4 h-0.5 flex-1", i < phaseIdx ? "bg-emerald-500" : "bg-slate-200")} />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
            {/* Health + milestones */}
            <Card className="p-5">
              <div className="flex items-center gap-4">
                <Donut value={health} color={healthColor} size={110}>
                  <span className="text-2xl font-extrabold" style={{ color: healthColor }}>{health}</span>
                  <span className="text-[9px] text-muted-foreground">/ 100</span>
                </Donut>
                <div>
                  <p className="text-sm font-bold text-foreground">Overall Health</p>
                  <p className="text-xs text-muted-foreground">
                    {health >= 75 ? "Good" : health >= 55 ? "Fair" : "At Risk"}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Phase {phaseIdx + 1} · {done} of {milestones.length} milestones done
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2 border-t pt-4">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-2 text-[13px]">
                    {m.status === "done" ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    ) : m.status === "active" ? (
                      <Circle className="mt-0.5 h-4 w-4 shrink-0 fill-kpmg-navy/20 text-kpmg-navy" />
                    ) : (
                      <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                    )}
                    <span className={cn(m.status === "upcoming" ? "text-muted-foreground" : "text-foreground", m.status === "active" && "font-semibold")}>
                      {m.l}
                      {m.status === "active" && <span className="ml-2 text-[10px] font-bold text-kpmg-navy">In Progress</span>}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI insight cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">AI Insights</p>
                <Button size="sm" variant="outline" className="gap-1.5" onClick={runNarrative} disabled={narrLoading}>
                  <Sparkles className="h-3.5 w-3.5" /> {narrLoading ? "Analysing…" : "AI Assessment"}
                </Button>
              </div>
              {narrative && (
                <div className="rounded-lg bg-blue-50 p-2.5 text-[11px] leading-relaxed text-blue-900">{narrative}</div>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                {insights.map((ins, i) => (
                  <div key={i} className="rounded-xl border p-3" style={{ background: ins.bg, borderColor: `${ins.c}22` }}>
                    <p className="mb-1 flex items-center gap-1.5 text-xs font-bold" style={{ color: ins.c }}>
                      <span>{ins.icon}</span> {ins.label}
                    </p>
                    <p className="text-[11px] leading-relaxed text-slate-600">{ins.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Risks + Top Issues + Stakeholders */}
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
            <TopRisksCard init={init} />
            <TopIssuesCard init={init} />
            <StakeholdersCard init={init} phaseIdx={phaseIdx} milestones={milestones} />
          </div>
        </TabsContent>

        <TabsContent value="artifacts" className="space-y-2.5">
          <p className="text-xs text-muted-foreground">
            <FileText className="mr-1 inline h-3.5 w-3.5" />
            Project artifacts across all 6 phases. Generate with AI, edit, and save.
          </p>
          {PHASES.map((phase, i) => (
            <PhaseFolder key={phase.id} phase={phase} init={init} defaultOpen={i === phaseIdx} onOpen={openArtifact} />
          ))}
        </TabsContent>
      </Tabs>

      <ArtifactDialog key={artifact?.name ?? "none"} init={init} artifact={artifact} open={dlgOpen} onOpenChange={setDlgOpen} />
    </div>
  );
}

function TopRisksCard({ init }: { init: Initiative }) {
  const rows = [
    { d: `${init.cat} data migration complexity`, impact: "High", score: init.rag === "Red" ? 20 : 15, trend: "↑" },
    { d: "Resource availability — business SMEs", impact: "High", score: 12, trend: "↑" },
    { d: `${init.tsa ? "TSA exit timeline" : "Integration dependency"} risk`, impact: init.tsa ? "Critical" : "Medium", score: init.tsa ? 18 : 9, trend: "→" },
    { d: "Vendor delivery quality", impact: "Medium", score: 8, trend: "→" },
  ];
  const navigate = useNavigate();
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-xs font-extrabold text-foreground">Top Risks</h4>
        <button onClick={() => navigate("/app/risks")} className="text-[11px] font-bold text-kpmg-navy hover:underline">View All</button>
      </div>
      <div className="grid grid-cols-[1fr_46px_40px_20px] border-b border-border/60 pb-1 text-[10px] font-bold text-muted-foreground">
        <span>Risk</span><span>Impact</span><span className="text-center">Score</span><span />
      </div>
      {rows.map((r, i) => {
        const sc = r.score >= 18 ? "#DC2626" : r.score >= 12 ? "#D97706" : "#CA8A04";
        return (
          <div key={i} className="grid grid-cols-[1fr_46px_40px_20px] items-center border-t border-slate-50 py-1.5 text-[11px]">
            <span className="pr-1 leading-tight text-foreground">{r.d}</span>
            <span className="text-[10px] font-semibold" style={{ color: r.impact === "Critical" || r.impact === "High" ? "#DC2626" : "#D97706" }}>{r.impact}</span>
            <span className="mx-auto rounded-md px-1.5 text-[10px] font-extrabold text-white" style={{ background: sc }}>{r.score}</span>
            <span className="text-center font-bold" style={{ color: r.trend === "↑" ? "#DC2626" : "#9CA3AF" }}>{r.trend}</span>
          </div>
        );
      })}
    </Card>
  );
}

function TopIssuesCard({ init }: { init: Initiative }) {
  const rows = [
    { d: "Global Corp KT documentation incomplete", sev: "High", status: "Open" },
    { d: "Business SME availability below 30%", sev: "High", status: "In Progress" },
    { d: `Vendor PD at 60% vs 80% required`, sev: "Medium", status: "In Progress" },
    { d: "Integration scope not fully defined", sev: "Medium", status: "Open" },
  ];
  void init;
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-xs font-extrabold text-foreground">Top Issues</h4>
        <span className="text-[11px] font-bold text-kpmg-navy">View All</span>
      </div>
      <div className="grid grid-cols-[1fr_42px_66px] border-b border-border/60 pb-1 text-[10px] font-bold text-muted-foreground">
        <span>Issue</span><span>Severity</span><span>Status</span>
      </div>
      {rows.map((iss, i) => (
        <div key={i} className="grid grid-cols-[1fr_42px_66px] items-center border-t border-slate-50 py-1.5 text-[11px]">
          <span className="pr-1 leading-tight text-foreground">{iss.d}</span>
          <span className="text-[10px] font-semibold" style={{ color: iss.sev === "High" ? "#DC2626" : "#D97706" }}>{iss.sev}</span>
          <span className={cn("w-fit rounded-md px-1.5 py-0.5 text-[10px] font-bold", iss.status === "In Progress" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500")}>{iss.status}</span>
        </div>
      ))}
    </Card>
  );
}

function StakeholdersCard({
  init,
  phaseIdx,
  milestones,
}: {
  init: Initiative;
  phaseIdx: number;
  milestones: { l: string; status: string }[];
}) {
  const items = [
    { icon: "📅", label: "Next Steering Committee", detail: `Agenda: ${PHASE_META[phaseIdx].short} progress, risks, budget forecast`, sub: "Monthly cadence" },
    { icon: "📄", label: "Upcoming Deliverable", detail: `${milestones.find((m) => m.status === "active")?.l || "Phase milestone"} due`, sub: `Target: ${init.goLive}` },
    { icon: "💬", label: "Recent Update", detail: `${init.desc.substring(0, 60)}…`, sub: "From SMO weekly update" },
  ];
  return (
    <Card className="p-4">
      <h4 className="mb-2 text-xs font-extrabold text-foreground">Stakeholders &amp; Communication</h4>
      {items.map((s, i) => (
        <div key={i} className="flex gap-2.5 border-b border-slate-50 py-2 last:border-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm">{s.icon}</div>
          <div>
            <p className="text-[11px] font-bold text-foreground">{s.label}</p>
            <p className="text-[10px] leading-tight text-muted-foreground">{s.detail}</p>
            <p className="mt-0.5 text-[10px] font-semibold text-kpmg-navy">{s.sub}</p>
          </div>
        </div>
      ))}
    </Card>
  );
}
