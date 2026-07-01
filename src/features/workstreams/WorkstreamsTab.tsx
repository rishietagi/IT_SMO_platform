import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { InitiativeCard } from "@/features/initiatives/InitiativeCard";
import { useInitiatives } from "@/store/program";
import { CATEGORY_NAMES, CATS } from "@/data/catalog";
import { cr } from "@/lib/format";

export function WorkstreamsTab() {
  const navigate = useNavigate();
  const inits = useInitiatives();

  return (
    <div className="space-y-6 p-5">
      <div>
        <h2 className="text-2xl font-extrabold text-kpmg-navy">Workstreams</h2>
        <p className="text-sm text-muted-foreground">Initiatives grouped by technology tower with consolidated health.</p>
      </div>

      {CATEGORY_NAMES.map((cat) => {
        const items = inits.filter((i) => i.cat === cat);
        if (!items.length) return null;
        const color = CATS[cat].color;
        const avg = Math.round(items.reduce((s, i) => s + i.prog, 0) / items.length);
        const bp = items.reduce((s, i) => s + i.bp, 0);
        const bs = items.reduce((s, i) => s + i.bs, 0);
        const ptd = items.reduce((s, i) => s + Math.round((i.bp * i.prog) / 100), 0);
        const variance = ptd - bs;
        const red = items.filter((i) => i.rag === "Red").length;
        const amber = items.filter((i) => i.rag === "Amber").length;

        return (
          <div key={cat} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
              <h3 className="text-base font-bold text-foreground">{cat}</h3>
              <span className="ml-auto text-xs text-muted-foreground">
                {items.length} initiatives · {cr(bp)} total · <span className="font-bold" style={{ color }}>{avg}% avg</span>
              </span>
            </div>
            <Progress value={avg} className="h-2" indicatorColor={color} />

            <Card className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-4">
              <Metric label="Budget" value={`${cr(bs)} / ${cr(bp)}`} sub={`${bp ? Math.round((bs / bp) * 100) : 0}% utilised`} color={color} />
              <Metric label="Variance vs PTD" value={`${cr(Math.abs(variance))} ${variance >= 0 ? "under" : "over"}`} sub={`PTD ${cr(ptd)}`} color={variance >= 0 ? "#059669" : "#DC2626"} />
              <Metric label="RAG Status" value={red || amber ? `🔴 ${red}  🟡 ${amber}` : "🟢 All Green"} sub="Red / Amber count" color="#1F2937" />
              <Metric label="Schedule" value={avg > 15 ? "On Track" : "Early Stage"} sub={`${avg}% complete`} color={avg > 15 ? "#059669" : "#D97706"} />
            </Card>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((i) => (
                <InitiativeCard key={i.id} init={i} onClick={() => navigate(`/app/initiatives/${i.id}`)} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Metric({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-bold" style={{ color }}>{value}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}
