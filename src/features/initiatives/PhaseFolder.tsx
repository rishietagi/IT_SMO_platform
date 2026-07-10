import { useState } from "react";
import { ChevronDown, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { artifactStatus } from "@/api/client";
import type { Phase, Artifact, Initiative } from "@/types/domain";

export function PhaseFolder({
  phase,
  init,
  defaultOpen,
  onOpen,
}: {
  phase: Phase;
  init: Initiative;
  defaultOpen?: boolean;
  onOpen: (a: Artifact) => void;
}) {
  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-left transition-colors hover:bg-slate-50"
        style={{ background: open ? phase.light : undefined }}
      >
        <span className="text-lg">{phase.emoji}</span>
        <span className="flex-1 text-sm font-bold text-foreground">{phase.name}</span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
          {phase.artifacts.length} artifacts
        </span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="divide-y divide-border/60 border-t border-border">
          {phase.artifacts.map((a) => {
            const status = artifactStatus(init.id, a.name);
            return (
              <button
                key={a.name}
                onClick={() => onOpen(a)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-slate-50"
              >
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-foreground">{a.name}</p>
                  <p className="text-[11px] text-muted-foreground">{a.desc}</p>
                </div>
                {status === "saved" ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                    <CheckCircle2 className="h-3 w-3" /> Saved
                  </span>
                ) : status === "draft" ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    <FileText className="h-3 w-3" /> Draft
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                    <Sparkles className="h-3 w-3" /> Generate
                  </span>
                )}
                <FileText className="h-4 w-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
