import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CpTask {
  phase: string;
  num: string;
  task: string;
  owner: string;
  end: string;
  status: "Done" | "In Progress" | "Upcoming";
  blocker: boolean;
  reason: string;
}

const TASKS: CpTask[] = [
  { phase: "Phase 1", num: "1.4", task: "Infosys selected — SteerCo approved", owner: "CIO", end: "Q3 FY27", status: "Done", blocker: false, reason: "Gates contract negotiation" },
  { phase: "Phase 1", num: "1.5", task: "Contract negotiation", owner: "Legal and PMO", end: "Q3 FY27", status: "In Progress", blocker: true, reason: "CFO signature overdue — delays kick-off by 1 week per day" },
  { phase: "Phase 2", num: "2.1", task: "Infosys onboarding and team mobilisation", owner: "PMO", end: "Q4 FY27", status: "Upcoming", blocker: false, reason: "Gates all Phase 2 activities" },
  { phase: "Phase 2", num: "2.4", task: "Global Corp KT sessions (10 sessions)", owner: "Tech Lead", end: "Q1 FY28", status: "Upcoming", blocker: false, reason: "Must complete before blueprint sign-off" },
  { phase: "Phase 3", num: "3.7", task: "Blueprint sign-off — all modules", owner: "All Business Owners", end: "Q2 FY28", status: "Upcoming", blocker: false, reason: "Hard gate — no build starts without this" },
  { phase: "Phase 4", num: "4.1", task: "FI/CO build and unit test", owner: "Infosys Finance team", end: "Q4 FY28", status: "Upcoming", blocker: false, reason: "Longest build track — drives overall schedule" },
  { phase: "Phase 4", num: "4.7", task: "System integration testing (SIT)", owner: "Infosys and QA", end: "Q4 FY28", status: "Upcoming", blocker: false, reason: "Cannot start until all module builds complete" },
  { phase: "Phase 5", num: "5.5", task: "UAT sign-off", owner: "CFO and Supply Chain Head", end: "Q2 FY29", status: "Upcoming", blocker: false, reason: "Business sign-off required before cutover" },
  { phase: "Phase 6", num: "6.2", task: "Cutover execution", owner: "All", end: "Q3 FY29", status: "Upcoming", blocker: false, reason: "Final critical path task before go-live" },
  { phase: "Phase 6", num: "6.3", task: "Go-Live Q3 FY29", owner: "CIO Decision", end: "Q3 FY29", status: "Upcoming", blocker: false, reason: "Programme target — full TSA independence" },
];

const STATS: [string, string][] = [
  ["Total Tasks", "57"],
  ["On Critical Path", "10"],
  ["Active Blockers", "1"],
  ["Float", "0 days"],
  ["Go-Live", "Q3 FY29"],
];

const statusStyle = (t: CpTask) =>
  t.status === "Done"
    ? "bg-emerald-100 text-emerald-700"
    : t.status === "In Progress"
      ? "bg-amber-100 text-amber-800"
      : t.blocker
        ? "bg-red-100 text-red-700"
        : "bg-blue-50 text-blue-700";

export function CriticalPathPanel() {
  const cols = "grid grid-cols-[42px_40px_1fr_110px_70px_88px] gap-2";
  return (
    <div className="mb-4 overflow-hidden rounded-xl border-2 border-red-600">
      {/* Header */}
      <div className="flex items-center justify-between bg-red-600 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-base">🔴</span>
          <div>
            <p className="text-[13px] font-extrabold text-white">Critical Path — SAP RISE (Core ERP)</p>
            <p className="text-[11px] text-white/75">10 tasks on critical path · 1 active blocker · Go-Live Q3 FY29</p>
          </div>
        </div>
        <div className="rounded-lg bg-white/15 px-3 py-1.5 text-center">
          <p className="text-[11px] font-bold text-white">Total Float</p>
          <p className="text-lg font-black text-red-200">0 days</p>
        </div>
      </div>

      {/* Blocker callout */}
      <div className="flex items-start gap-2.5 border-b border-red-300 bg-red-50 px-4 py-2.5">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
        <div>
          <p className="text-xs font-extrabold text-red-800">Active Blocker — Task 1.5: Contract Negotiation</p>
          <p className="text-[11px] leading-relaxed text-red-700">
            CFO signature on Infosys contract overdue. Every day of delay compresses the mobilisation window and
            pushes project kick-off. Escalation to CIO required today.
          </p>
        </div>
      </div>

      {/* Task table */}
      <div className="bg-white">
        <div className={cn(cols, "border-b border-red-200 bg-rose-50 px-4 py-1.5 text-[10px] font-bold text-red-800")}>
          <span>Phase</span><span>#</span><span>Task</span><span>Owner</span><span>Target</span><span>Status</span>
        </div>
        {TASKS.map((t, i) => (
          <div
            key={i}
            className={cn(cols, "items-start border-b border-red-50 px-4 py-2 last:border-0")}
            style={{ background: t.blocker ? "#FEF2F2" : i === TASKS.length - 1 ? "#F0FDF4" : "white" }}
          >
            <span className="text-[10px] font-semibold text-muted-foreground">{t.phase.replace("Phase ", "P")}</span>
            <span className="text-[11px] font-extrabold" style={{ color: t.blocker ? "#DC2626" : i === TASKS.length - 1 ? "#059669" : "#00338D" }}>{t.num}</span>
            <div>
              <p className="text-[11px] font-bold leading-tight" style={{ color: t.blocker ? "#991B1B" : "#1F2937" }}>
                {t.task}
                {t.blocker && <span className="ml-1.5 rounded bg-red-600 px-1.5 py-px text-[9px] font-bold text-white">BLOCKER</span>}
              </p>
              <p className="text-[10px] leading-tight text-muted-foreground">{t.reason}</p>
            </div>
            <span className="text-[10px] text-foreground">{t.owner}</span>
            <span className="text-[10px] font-bold text-foreground">{t.end}</span>
            <span className={cn("h-fit w-fit rounded-md px-1.5 py-0.5 text-[10px] font-bold", statusStyle(t))}>{t.status}</span>
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="flex gap-6 border-t border-orange-200 bg-orange-50 px-4 py-2.5">
        {STATS.map(([l, v]) => (
          <div key={l} className="text-center">
            <p className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground">{l}</p>
            <p className="text-[13px] font-extrabold text-orange-800">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
