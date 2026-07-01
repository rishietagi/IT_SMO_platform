import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles, Rocket, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KpmgLogo } from "@/components/brand/KpmgLogo";
import { useProgram } from "@/store/program";
import { INITIATIVES } from "@/data/initiatives";
import { SAMPLE_PRINCIPLES, INDUSTRIES } from "@/data/catalog";
import { generatePrinciples } from "@/api/ai";
import { cn } from "@/lib/utils";
import type { Program, Initiative } from "@/types/domain";

const STEPS = [
  { n: 1, l: "Overview" },
  { n: 2, l: "Principles" },
  { n: 3, l: "Initiatives" },
  { n: 4, l: "TSA" },
  { n: 5, l: "Launch" },
];

interface Draft {
  clientName: string;
  parentName: string;
  programName: string;
  industry: string;
  separationDate: string;
  description: string;
  guidingPrinciples: string;
  initiatives: Initiative[];
  standardTsa: string;
}

export function SetupWizard() {
  const navigate = useNavigate();
  const { launch } = useProgram();
  const [step, setStep] = useState(1);
  const [aiLoading, setAiLoading] = useState(false);
  const [d, setD] = useState<Draft>({
    clientName: "",
    parentName: "",
    programName: "",
    industry: "Consumer Markets",
    separationDate: "Q3 FY29",
    description: "",
    guidingPrinciples: "",
    initiatives: [],
    standardTsa: "3",
  });

  const set = (patch: Partial<Draft>) => setD((prev) => ({ ...prev, ...patch }));
  const fillSample = () =>
    set({
      clientName: "ClientCo",
      parentName: "Global Corp",
      programName: "ClientCo IT Separation Program",
      industry: "Consumer Markets",
      separationDate: "Q3 FY29",
      description: "ClientCo India separating full IT estate from US parent Global Corp following strategic divestiture.",
    });

  const canNext = (n: number) => {
    if (n === 1) return !!(d.clientName && d.parentName && d.programName);
    if (n === 2) return !!d.guidingPrinciples;
    if (n === 3) return d.initiatives.length > 0;
    return true;
  };

  const aiGen = async () => {
    setAiLoading(true);
    const text = await generatePrinciples(`${d.clientName} in ${d.industry} from ${d.parentName}`);
    set({ guidingPrinciples: text });
    setAiLoading(false);
  };

  const doLaunch = () => {
    const program: Program = {
      clientName: d.clientName,
      parentName: d.parentName,
      industry: d.industry,
      programName: d.programName,
      separationDate: d.separationDate,
      guidingPrinciples: d.guidingPrinciples,
      initiatives: d.initiatives.length ? d.initiatives : INITIATIVES,
      standardTsa: d.standardTsa,
    };
    launch(program);
    navigate("/app/overview");
  };

  const label = (t: string) => <label className="mb-1.5 block text-xs font-bold text-slate-700">{t}</label>;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center gap-3 bg-kpmg-navy px-5 py-3">
        <KpmgLogo variant="white" className="h-5" />
        <p className="text-[13px] font-bold text-white">Setup New SMO Program</p>
        <p className="text-[11px] text-white/60">Step {step} of 5</p>
        <Button variant="ghost" size="sm" className="ml-auto gap-1.5 text-white hover:bg-white/15 hover:text-white" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" /> Home
        </Button>
      </div>

      {/* Stepper */}
      <div className="border-b bg-white px-5 py-3">
        <div className="mx-auto flex max-w-xl items-center">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                    step > s.n ? "bg-kpmg-green text-white" : step === s.n ? "bg-kpmg-navy text-white" : "bg-slate-100 text-slate-400"
                  )}
                >
                  {step > s.n ? <Check className="h-4 w-4" /> : s.n}
                </div>
                <span className={cn("text-[10px]", step === s.n ? "font-bold text-kpmg-navy" : "text-muted-foreground")}>{s.l}</span>
              </div>
              {i < STEPS.length - 1 && <div className={cn("mx-1 mb-4 h-0.5 flex-1", step > s.n ? "bg-kpmg-green" : "bg-slate-200")} />}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-xl px-5 py-6">
        <Card className="p-6">
          {step === 1 && (
            <>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-kpmg-navy">Programme Overview</h2>
                <Button size="sm" variant="outline" className="text-emerald-700" onClick={fillSample}>Use Sample Data</Button>
              </div>
              <div className="space-y-3.5">
                <div>{label("Client Name *")}<Input value={d.clientName} onChange={(e) => set({ clientName: e.target.value })} placeholder="e.g. ClientCo" /></div>
                <div>{label("Parent Company *")}<Input value={d.parentName} onChange={(e) => set({ parentName: e.target.value })} placeholder="e.g. Global Corp" /></div>
                <div>{label("Programme Name *")}<Input value={d.programName} onChange={(e) => set({ programName: e.target.value })} placeholder="e.g. ClientCo IT Separation Programme" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    {label("Industry")}
                    <Select value={d.industry} onValueChange={(v) => set({ industry: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{INDUSTRIES.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>{label("Separation Target")}<Input value={d.separationDate} onChange={(e) => set({ separationDate: e.target.value })} /></div>
                </div>
                <div>{label("Description")}<textarea value={d.description} onChange={(e) => set({ description: e.target.value })} className="h-20 w-full resize-y rounded-lg border border-border p-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" /></div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-kpmg-navy">Guiding Principles</h2>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-emerald-700" onClick={() => set({ guidingPrinciples: SAMPLE_PRINCIPLES.join("\n") })}>Use Sample</Button>
                  <Button size="sm" variant="outline" className="gap-1.5 text-kpmg-navy" onClick={aiGen} disabled={aiLoading}>
                    <Sparkles className="h-3.5 w-3.5" /> {aiLoading ? "Generating…" : "AI Generate"}
                  </Button>
                </div>
              </div>
              <textarea
                value={d.guidingPrinciples}
                onChange={(e) => set({ guidingPrinciples: e.target.value })}
                placeholder="Paste principles or use Sample / AI Generate…"
                className="h-56 w-full resize-y rounded-lg border border-border p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </>
          )}

          {step === 3 && (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-kpmg-navy">Initiatives</h2>
                <Button size="sm" variant="outline" className="text-kpmg-navy" onClick={() => set({ initiatives: INITIATIVES })}>Load Sample 25</Button>
              </div>
              {d.initiatives.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-border py-12 text-center">
                  <p className="mb-3 text-4xl">📋</p>
                  <Button onClick={() => set({ initiatives: INITIATIVES })}>Load Sample 25 Initiatives</Button>
                </div>
              ) : (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] font-bold text-emerald-800">
                  {d.initiatives.length} initiatives loaded
                </div>
              )}
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="mb-3 text-lg font-extrabold text-kpmg-navy">TSA Structure</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                All initiatives are under Global Corp TSA. Standard duration: {d.standardTsa} years.
              </p>
              {label("Standard TSA Duration")}
              <Select value={d.standardTsa} onValueChange={(v) => set({ standardTsa: v })}>
                <SelectTrigger className="w-52"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Year</SelectItem>
                  <SelectItem value="2">2 Years</SelectItem>
                  <SelectItem value="3">3 Years (Standard)</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}

          {step === 5 && (
            <>
              <h2 className="mb-4 text-lg font-extrabold text-kpmg-navy">Review &amp; Launch</h2>
              {[
                ["Client", d.clientName],
                ["Parent", d.parentName],
                ["Industry", d.industry],
                ["Target", d.separationDate],
                ["Initiatives", `${d.initiatives.length} configured`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border/60 py-2 text-[13px]">
                  <span className="font-semibold text-muted-foreground">{k}</span>
                  <span className="font-bold text-foreground">{v}</span>
                </div>
              ))}
              <div className="mt-4 rounded-lg bg-blue-50 px-4 py-3 text-[13px] font-bold text-blue-900">
                Ready to launch with full platform access
              </div>
            </>
          )}

          {/* Nav */}
          <div className="mt-6 flex justify-between border-t pt-4">
            <Button variant="secondary" onClick={() => (step === 1 ? navigate("/") : setStep((s) => s - 1))}>
              {step === 1 ? "← Home" : "← Back"}
            </Button>
            {step < 5 ? (
              <Button disabled={!canNext(step)} onClick={() => setStep((s) => s + 1)} className="gap-1.5">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={doLaunch} className="gap-1.5 bg-kpmg-green text-kpmg-navy hover:bg-kpmg-green/90">
                <Rocket className="h-4 w-4" /> Launch Programme
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
