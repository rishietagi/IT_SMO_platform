import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ARB_PRINCIPLES, ARB_DECISIONS } from "@/data/catalog";
import { cn } from "@/lib/utils";

const TEAM = [
  { role: "Chair", who: "CIO", tag: "Decision Authority", dot: "#00338D" },
  { role: "Technical Authority", who: "IT Architecture Lead", tag: "Permanent Member — Meeting Secretary", dot: "#7C3AED" },
  { role: "Security", who: "CISO", tag: "Permanent Member", dot: "#DC2626" },
  { role: "Data Architecture", who: "Data Architect", tag: "Permanent Member", dot: "#0284C7" },
  { role: "Infrastructure", who: "Infrastructure Lead", tag: "Permanent Member", dot: "#059669" },
  { role: "ERP Architecture", who: "SAP/ERP Architect", tag: "Attending Member — ERP decisions", dot: "#D97706" },
  { role: "Business Representative", who: "Rotating · Finance / Operations / Commercial", tag: "1 per meeting", dot: "#9CA3AF" },
];

const AGENDA = [
  { n: 1, t: "Previous decisions & open actions", m: "15 min" },
  { n: 2, t: "New solution design submissions (up to 3)", m: "20 min each" },
  { n: 3, t: "Architecture exception requests", m: "15 min" },
  { n: 4, t: "Integration alignment review", m: "20 min" },
];

const decColor = (d: string) =>
  d === "Approved" ? "#059669" : d.startsWith("Approved") ? "#D97706" : d === "Deferred" ? "#6B7280" : "#DC2626";

export function ArbTab() {
  return (
    <div className="space-y-4 p-5">
      <div>
        <h2 className="text-2xl font-extrabold text-kpmg-navy">Architecture Review Board</h2>
        <p className="text-sm text-muted-foreground">
          Standing governance body ensuring architectural consistency and integration integrity across all 25 initiatives.
        </p>
      </div>

      <Tabs defaultValue="team">
        <TabsList>
          <TabsTrigger value="team">Overview &amp; Team</TabsTrigger>
          <TabsTrigger value="process">Submission Process</TabsTrigger>
          <TabsTrigger value="principles">Integration Principles</TabsTrigger>
          <TabsTrigger value="register">Decision Register</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <p className="mb-3 text-sm font-bold text-kpmg-navy">👥 ARB Team Composition</p>
            <div className="space-y-3">
              {TEAM.map((t) => (
                <div key={t.role} className="flex items-start gap-2.5 border-b border-border/50 pb-2.5 last:border-0">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: t.dot }} />
                  <div className="flex-1">
                    <p className="text-[13px] font-bold text-foreground">{t.role}</p>
                    <p className="text-xs text-muted-foreground">{t.who}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{t.tag}</span>
                </div>
              ))}
            </div>
          </Card>
          <div className="space-y-4">
            <Card className="p-5">
              <p className="mb-3 text-sm font-bold text-kpmg-navy">📅 Meeting Cadence</p>
              {[
                ["Standing ARB", "Bi-weekly · Alternate Wednesdays · 2:00 PM – 4:00 PM IST"],
                ["Emergency ARB", "48-hour notice · Critical path blockers only"],
                ["Quarterly Extended", "Half-day session · Full programme architecture alignment review"],
              ].map(([h, d]) => (
                <div key={h} className="border-b border-border/50 py-2 last:border-0">
                  <p className="text-[13px] font-bold text-foreground">{h}</p>
                  <p className="text-xs text-muted-foreground">{d}</p>
                </div>
              ))}
            </Card>
            <Card className="p-5">
              <p className="mb-3 text-sm font-bold text-kpmg-navy">📋 Standard Agenda</p>
              {AGENDA.map((a) => (
                <div key={a.n} className="flex items-center justify-between border-b border-border/50 py-2 last:border-0">
                  <p className="text-[13px] text-foreground"><b>{a.n}.</b> {a.t}</p>
                  <span className="text-[11px] text-muted-foreground">{a.m}</span>
                </div>
              ))}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="process">
          <Card className="p-6">
            <div className="space-y-4">
              {[
                ["ADD Submission", "10 working days before the meeting"],
                ["Pre-Review by Technical Authority", "3 days"],
                ["ARB Presentation", "20 min total per submission"],
                ["Decision", "Approved · Approved with Conditions · Deferred · Rejected"],
                ["Decision Register Update", "Within 24-hour SLA"],
              ].map(([t, d], i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-kpmg-navy text-xs font-bold text-white">{i + 1}</div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t}</p>
                    <p className="text-xs text-muted-foreground">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="principles" className="grid gap-3 lg:grid-cols-2">
          {ARB_PRINCIPLES.map((p) => (
            <Card
              key={p.n}
              className={cn("border-l-4 p-4", p.type === "Non-negotiable" ? "border-l-red-500" : "border-l-amber-500")}
            >
              <div className="mb-1 flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">{p.n}. {p.title}</p>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold",
                    p.type === "Non-negotiable" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                  )}
                >
                  {p.type}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="register">
          <Card className="overflow-x-auto p-0">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase text-muted-foreground">
                <tr>
                  <th className="px-3 py-2.5 text-left font-semibold">ID</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Date</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Initiative</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Topic</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Decision</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Conditions</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {ARB_DECISIONS.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="px-3 py-3 text-xs font-bold text-kpmg-navy">{d.id}</td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">{d.date}</td>
                    <td className="px-3 py-3 text-[13px] font-semibold text-foreground">{d.initiative}</td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">{d.topic}</td>
                    <td className="px-3 py-3">
                      <span className="text-xs font-bold" style={{ color: decColor(d.decision) }}>{d.decision}</span>
                    </td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">{d.conditions}</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">{d.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
