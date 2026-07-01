import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { RagBadge } from "@/components/brand/RagBadge";
import { useInitiatives } from "@/store/program";
import { initTimeline } from "@/domain/timeline";
import { CATEGORY_NAMES, CATS, MILESTONES, QS } from "@/data/catalog";

export function RoadmapTab() {
  const navigate = useNavigate();
  const inits = useInitiatives();

  return (
    <div className="space-y-4 p-5">
      <div>
        <h2 className="text-2xl font-extrabold text-kpmg-navy">Roadmap &amp; Milestones</h2>
        <p className="text-sm text-muted-foreground">
          All {inits.length} initiatives across the 3-year programme — 12 quarters FY27–FY29.
        </p>
      </div>

      <Card className="overflow-x-auto p-4">
        <div className="min-w-[860px]">
          {/* Year + quarter header */}
          <div className="grid grid-cols-[190px_1fr]">
            <div />
            <div className="grid grid-cols-3">
              {["FY27", "FY28", "FY29"].map((y, i) => (
                <div
                  key={y}
                  className="border-r border-border py-1.5 text-center text-xs font-bold text-kpmg-navy last:border-r-0"
                  style={{ background: i === 0 ? "#EEF3FB" : i === 1 ? "#F4F7FB" : "#EFF6FF" }}
                >
                  {y}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-[190px_1fr]">
            <div />
            <div className="relative grid grid-cols-12">
              {QS.map((q, i) => (
                <div key={q} className="border-r border-border/40 py-1 text-center text-[9px] text-muted-foreground last:border-r-0">
                  {q.slice(0, 2)}
                </div>
              ))}
              {/* milestone markers */}
              {MILESTONES.map((m) => (
                <div
                  key={m.label}
                  className="absolute bottom-0 top-0 z-10 border-l-2 border-dashed"
                  style={{ left: `${((m.q - 1) / 12) * 100}%`, borderColor: m.color }}
                  title={m.label}
                />
              ))}
            </div>
          </div>

          {/* Tower groups */}
          {CATEGORY_NAMES.map((cat) => {
            const items = inits.filter((i) => i.cat === cat);
            if (!items.length) return null;
            return (
              <div key={cat}>
                <div className="flex items-center gap-2 border-t border-border bg-slate-50/70 px-1 py-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: CATS[cat].color }} />
                  <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    {cat} · {items.length} initiatives
                  </span>
                </div>
                {items.map((init) => {
                  const t = initTimeline(init);
                  const left = ((t.startQ - 1) / 12) * 100;
                  const width = ((t.endQ - t.startQ + 1) / 12) * 100;
                  return (
                    <div
                      key={init.id}
                      className="grid cursor-pointer grid-cols-[190px_1fr] border-t border-border/50 hover:bg-slate-50"
                      onClick={() => navigate(`/app/initiatives/${init.id}`)}
                    >
                      <div className="flex items-center gap-1.5 py-2 pr-2">
                        <span className="line-clamp-2 text-[11px] font-semibold leading-tight text-foreground">{init.name}</span>
                      </div>
                      <div className="relative h-9">
                        {[...Array(11)].map((_, i) => (
                          <div key={i} className="absolute bottom-0 top-0 border-l border-border/30" style={{ left: `${((i + 1) / 12) * 100}%` }} />
                        ))}
                        <div
                          className="absolute top-1/2 flex -translate-y-1/2 items-center overflow-hidden rounded"
                          style={{ left: `${left}%`, width: `${width}%`, height: 16, background: t.color, opacity: 0.9 }}
                        >
                          <div className="absolute inset-y-0 left-0 bg-black/20" style={{ width: `${init.prog}%` }} />
                          <span className="relative z-10 px-2 text-[9px] font-bold text-white">{init.prog > 0 ? `${init.prog}%` : ""}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {CATEGORY_NAMES.map((cat) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span className="h-2 w-4 rounded-sm" style={{ background: CATS[cat].color }} />
            <span className="text-[11px] text-muted-foreground">{cat}</span>
          </div>
        ))}
        {MILESTONES.map((m) => (
          <div key={m.label} className="flex items-center gap-1.5">
            <span className="h-3 border-l-2 border-dashed" style={{ borderColor: m.color }} />
            <span className="text-[11px] text-muted-foreground">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
