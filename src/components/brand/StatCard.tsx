import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export interface StatDetail {
  l: string;
  v: string;
  emphasize?: boolean;
}

/**
 * KPI tile with a colored top accent, a big value, and optional detail rows or
 * a subtitle. Used across Overview / Finance / TSA so the strips read uniform.
 */
export function StatCard({
  label,
  value,
  accent = "#00338D",
  icon: Icon,
  details,
  sub,
  onClick,
  valueClass,
}: {
  label: string;
  value: React.ReactNode;
  accent?: string;
  icon?: LucideIcon;
  details?: StatDetail[];
  sub?: string;
  onClick?: () => void;
  valueClass?: string;
}) {
  return (
    <Card
      onClick={onClick}
      style={{ borderTopColor: accent }}
      className={cn(
        "flex flex-col border-t-[3px] p-4 transition-shadow",
        onClick && "cursor-pointer hover:shadow-lg"
      )}
    >
      <div className="mb-2.5 flex items-start justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        {Icon && <Icon className="h-4 w-4 shrink-0 opacity-60" style={{ color: accent }} />}
      </div>
      <p className={cn("text-2xl font-extrabold leading-none", valueClass)} style={{ color: accent }}>
        {value}
      </p>
      {details ? (
        <div className="mt-auto pt-2.5">
          {details.map((d, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-t border-border/70 py-1 text-[11px]"
            >
              <span className="text-muted-foreground">{d.l}</span>
              <span
                className={cn("font-bold text-foreground/80", d.emphasize && "font-extrabold")}
                style={d.emphasize ? { color: accent } : undefined}
              >
                {d.v}
              </span>
            </div>
          ))}
        </div>
      ) : sub ? (
        <p className="mt-auto pt-2.5 text-[11px] text-muted-foreground">{sub}</p>
      ) : null}
    </Card>
  );
}
