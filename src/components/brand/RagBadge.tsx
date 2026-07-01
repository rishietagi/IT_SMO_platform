import { cn } from "@/lib/utils";
import type { Rag, Readiness, Priority } from "@/types/domain";

const RAG: Record<Rag, string> = {
  Green: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Amber: "bg-amber-100 text-amber-700 ring-amber-200",
  Red: "bg-red-100 text-red-700 ring-red-200",
};
const RAG_DOT: Record<Rag, string> = {
  Green: "bg-emerald-500",
  Amber: "bg-amber-500",
  Red: "bg-red-500",
};

export function RagBadge({ rag, className }: { rag: Rag; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset",
        RAG[rag],
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", RAG_DOT[rag])} />
      {rag}
    </span>
  );
}

const PRI: Record<Priority, string> = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-amber-100 text-amber-700",
  Medium: "bg-blue-100 text-blue-700",
  Low: "bg-slate-100 text-slate-600",
};

export function PriBadge({ p, className }: { p: Priority; className?: string }) {
  return (
    <span className={cn("inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold", PRI[p], className)}>
      {p}
    </span>
  );
}

const READY: Record<Readiness, string> = {
  Critical: "bg-red-100 text-red-700 ring-red-200",
  "At Risk": "bg-amber-100 text-amber-700 ring-amber-200",
  "On Track": "bg-emerald-100 text-emerald-700 ring-emerald-200",
};

export function ReadinessBadge({ r, className }: { r: Readiness; className?: string }) {
  return (
    <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset", READY[r], className)}>
      {r}
    </span>
  );
}
