import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Target,
  FolderKanban,
  Wallet,
  TriangleAlert,
  Zap,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatCard, type StatDetail } from "@/components/brand/StatCard";
import { Donut } from "@/components/charts/Donut";
import { useProgram, useInitiatives } from "@/store/program";
import { computeMetrics } from "@/domain/metrics";
import { initTimeline } from "@/domain/timeline";
import { CATS, QS } from "@/data/catalog";
import { ROADMAP_PROJECTS } from "@/data/initiatives";
import { analyzeRisk } from "@/api/ai";
import { cr } from "@/lib/format";

export function ExecutiveOverview() {
  const navigate = useNavigate();
  const { program } = useProgram();
  const inits = useInitiatives();
  const m = useMemo(() => computeMetrics(inits), [inits]);

  const [aiText, setAiText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const runAnalysis = async () => {
    setAiLoading(true);
    setAiText(await analyzeRisk(""));
    setAiLoading(false);
  };

  const totalPtd = inits.reduce((s, i) => s + Math.round((i.bp * i.prog) / 100), 0);
  const finVar = totalPtd - m.totalBs;
  const scoreColor = m.aiScore >= 70 ? "#DC2626" : m.aiScore >= 50 ? "#D97706" : "#16A34A";
  const scoreLabel = m.aiScore >= 70 ? "High" : m.aiScore >= 50 ? "Medium" : "Low";

  const tsaSoon: StatDetail[] = m.earlyTsa
    .slice()
    .sort((a, b) => (a.tsaQ ?? "").localeCompare(b.tsaQ ?? ""))
    .slice(0, 3)
    .map((i) => ({ l: i.name.length > 22 ? i.name.slice(0, 22) + "…" : i.name, v: i.tsaQ ?? "—" }));
  const wave1Risk = inits.filter((i) => i.wave === 1 && (i.rag === "Red" || i.rag === "Amber"));

  return (
    <div className="space-y-5 p-5">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-extrabold text-kpmg-navy">
          {program?.programName ?? "IT Separation Program"} — Executive Overview
        </h2>
        <p className="text-sm text-muted-foreground">
          {program?.clientName ?? "ClientCo"} · Separation from {program?.parentName ?? "Global Corp"}{" "}
          · Target: {program?.separationDate ?? "Q3 FY29"}
        </p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard
          label="Overall TSA Exit Progress"
          value={`${m.totalProg}%`}
          accent="#00338D"
          icon={Target}
          details={[
            { l: "Target", v: program?.separationDate ?? "Q3 FY29" },
            { l: "TSA Exits Total", v: `${m.earlyTsa.length}` },
            { l: "Complete", v: `${m.earlyTsa.filter((i) => i.prog >= 100).length}` },
            { l: "In Progress", v: `${m.earlyTsa.filter((i) => i.prog > 0 && i.prog < 100).length}` },
            { l: "Not Started", v: `${m.earlyTsa.filter((i) => i.prog === 0).length}` },
          ]}
        />
        <StatCard
          label="IT Separation Initiatives"
          value={inits.length}
          accent="#7C3AED"
          icon={FolderKanban}
          onClick={() => navigate("/app/initiatives")}
          sub={`🟢 ${inits.filter((i) => i.rag === "Green").length}   🟡 ${inits.filter((i) => i.rag === "Amber").length}   🔴 ${inits.filter((i) => i.rag === "Red").length}`}
        />
        <StatCard
          label="Financial Snapshot"
          value={finVar >= 0 ? "✓ Under Budget" : "⚠ Over Budget"}
          valueClass="text-base"
          accent={finVar >= 0 ? "#059669" : "#DC2626"}
          icon={Wallet}
          details={[
            { l: "Total Budget", v: cr(m.totalBp) },
            { l: "Planned Till Date", v: cr(totalPtd) },
            { l: "Actual Spent", v: cr(m.totalBs) },
            { l: "Variance", v: `${cr(Math.abs(finVar))} ${finVar >= 0 ? "under" : "over"}`, emphasize: true },
          ]}
        />
        <StatCard
          label="TSA Expiring <12M"
          value={m.tsaExpiring}
          accent={m.tsaExpiring > 5 ? "#DC2626" : "#D97706"}
          icon={TriangleAlert}
          details={[...tsaSoon, { l: "Status", v: "Need immediate attention", emphasize: true }]}
        />
        <StatCard
          label="Wave 1 At Risk"
          value={wave1Risk.length}
          accent={inits.some((i) => i.wave === 1 && i.rag === "Red") ? "#DC2626" : "#D97706"}
          icon={Zap}
          details={[
            ...wave1Risk.slice(0, 3).map((i) => ({
              l: i.name.length > 22 ? i.name.slice(0, 22) + "…" : i.name,
              v: i.rag,
            })),
            { l: "Status", v: "Need attention now", emphasize: true },
          ]}
        />
      </div>

      {/* Middle row: roadmap + towers */}
      <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <MiniRoadmap />
        <div className="space-y-4">
          <RiskGauge score={m.aiScore} color={scoreColor} label={scoreLabel} onRun={runAnalysis} loading={aiLoading} text={aiText} />
          <TowerProgress catProgress={m.catProgress} />
        </div>
      </div>
    </div>
  );
}

function MiniRoadmap() {
  const inits = useInitiatives();
  return (
    <Card className="p-4">
      <p className="mb-3 text-sm font-bold text-foreground">
        Roadmap — Major Projects (Annual OpEx &gt; ₹1Cr)
      </p>
      {/* Year header */}
      <div className="grid grid-cols-[130px_1fr] text-[10px]">
        <div />
        <div className="grid grid-cols-3">
          {["FY27", "FY28", "FY29"].map((y, i) => (
            <div
              key={y}
              className="border-r border-border py-1 text-center font-bold text-kpmg-navy last:border-r-0"
              style={{ background: i === 0 ? "#EEF3FB" : i === 1 ? "#F4F7FB" : "#EFF6FF" }}
            >
              {y}
            </div>
          ))}
        </div>
      </div>
      {ROADMAP_PROJECTS.map((proj) => {
        const init = inits.find((i) => i.id === proj.id) ?? { prog: 0 };
        const left = ((proj.startQ - 1) / 12) * 100;
        const width = ((proj.endQ - proj.startQ + 1) / 12) * 100;
        return (
          <div key={proj.id} className="grid grid-cols-[130px_1fr] border-t border-border/60">
            <div className="py-1.5 pr-2 text-[10px] font-semibold leading-tight text-foreground">
              {proj.name}
            </div>
            <div className="relative h-7">
              {[33.33, 66.66].map((p) => (
                <div key={p} className="absolute bottom-0 top-0 border-l border-border/60" style={{ left: `${p}%` }} />
              ))}
              <div
                className="absolute top-1/2 flex -translate-y-1/2 items-center justify-center overflow-hidden rounded"
                style={{ left: `${left}%`, width: `${width}%`, height: 14, background: proj.color, opacity: 0.92 }}
              >
                <div className="absolute inset-y-0 left-0 bg-black/20" style={{ width: `${init.prog}%` }} />
                <span className="relative z-10 text-[8px] font-bold text-white">
                  {init.prog > 0 ? `${init.prog}%` : ""}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <div className="mt-2.5 flex flex-wrap gap-3">
        {Object.entries(CATS).map(([cat, { color }]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span className="h-1.5 w-3 rounded-sm" style={{ background: color }} />
            <span className="text-[9px] text-muted-foreground">{cat.split(" ")[0]}</span>
          </div>
        ))}
        <span className="ml-auto text-[9px] text-muted-foreground">{QS[0]} – {QS[QS.length - 1]}</span>
      </div>
    </Card>
  );
}

function RiskGauge({
  score,
  color,
  label,
  onRun,
  loading,
  text,
}: {
  score: number;
  color: string;
  label: string;
  onRun: () => void;
  loading: boolean;
  text: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <Donut value={score} color={color} size={104}>
          <span className="text-2xl font-extrabold" style={{ color }}>
            {score}
          </span>
          <span className="text-[9px] font-semibold text-muted-foreground">/ 100</span>
        </Donut>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">AI Risk Score</p>
          <p className="text-xs text-muted-foreground">
            Composite health · <span style={{ color }}>{label} risk</span>
          </p>
          <Button size="sm" variant="outline" className="mt-2 gap-1.5" onClick={onRun} disabled={loading}>
            <Sparkles className="h-3.5 w-3.5" />
            {loading ? "Analysing…" : "AI Risk Analysis"}
          </Button>
        </div>
      </div>
      {text && (
        <p className="mt-3 rounded-lg bg-blue-50 p-2.5 text-[11px] leading-relaxed text-blue-900">
          {text}
        </p>
      )}
    </Card>
  );
}

function TowerProgress({ catProgress }: { catProgress: Record<string, number> }) {
  return (
    <Card className="p-4">
      <p className="mb-3 text-sm font-bold text-foreground">Transition Progress by Tower</p>
      <div className="space-y-3">
        {Object.entries(catProgress).map(([cat, p]) => {
          const color = CATS[cat as keyof typeof CATS]?.color ?? "#374151";
          return (
            <div key={cat}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">{cat}</span>
                <span className="text-xs font-bold" style={{ color }}>
                  {p}%
                </span>
              </div>
              <Progress value={p} className="h-1.5" indicatorColor={color} />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
