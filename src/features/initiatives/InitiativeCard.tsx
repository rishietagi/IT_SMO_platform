import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RagBadge } from "@/components/brand/RagBadge";
import { CATS } from "@/data/catalog";
import { cr } from "@/lib/format";
import type { Initiative } from "@/types/domain";

export function InitiativeCard({
  init,
  onClick,
}: {
  init: Initiative;
  onClick?: () => void;
}) {
  const cat = CATS[init.cat];
  return (
    <Card
      onClick={onClick}
      style={{ borderTopColor: cat.color }}
      className="flex cursor-pointer flex-col border-t-[3px] p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold leading-tight text-foreground">{init.name}</h3>
        <RagBadge rag={init.rag} className="shrink-0" />
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span
          className="rounded-md px-2 py-0.5 text-[10px] font-semibold"
          style={{ background: cat.light, color: cat.color }}
        >
          {init.cat}
        </span>
        {init.tsa && (
          <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
            ⚠ [B]
          </span>
        )}
        {init.td && (
          <span className="rounded-md bg-violet-100 px-1.5 py-0.5 text-[10px] font-bold text-violet-700">
            ⛓ [A]
          </span>
        )}
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>📅 {init.goLive}</span>
          <span className="font-semibold text-foreground">W{init.wave}</span>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-bold text-foreground">{init.prog}%</span>
          </div>
          <Progress value={init.prog} className="h-1.5" indicatorColor={cat.color} />
        </div>
        <div className="flex items-center justify-between border-t border-border/60 pt-2 text-[11px] text-muted-foreground">
          <span>{cr(init.bp)} planned</span>
          <span>{cr(init.bs)} spent</span>
        </div>
      </div>
    </Card>
  );
}
