import type { Initiative, Program, Artifact } from "@/types/domain";
import { INITIATIVES } from "@/data/initiatives";
import { computeMetrics } from "./metrics";

/** Programme-level AI context (retained for when the AI layer is wired to a backend). */
export function buildCtx(program: Program | null): string {
  const inits = program?.initiatives || INITIATIVES;
  const m = computeMetrics(inits);
  return `IT Separation SMO — ${program?.clientName || "ClientCo"} separating from ${program?.parentName || "Global Corp"} (${program?.industry || "Consumer Markets"}).
Programme: ${program?.programName || "IT Separation Program"} | Target: ${program?.separationDate || "Q3 FY29"}
Total initiatives: ${inits.length} | Progress: ${m.totalProg}% | Budget: Rs${m.totalBp}Cr planned / Rs${m.totalBs}Cr spent
Red: ${m.red.map((i) => i.name).join(", ") || "None"} | Amber: ${m.amber.map((i) => i.name).join(", ") || "None"}
Early TSA exits: ${m.earlyTsa.length} | Critical TSA readiness: ${m.criticalTsa.length} | AI Risk Score: ${m.aiScore}/100
Answer concisely and specifically to this programme context.`;
}

export function buildInitCtx(init: Initiative, program: Program | null): string {
  return `IT Separation SMO — ${program?.clientName || "ClientCo"} from ${program?.parentName || "Global Corp"}.
Initiative: ${init.name} | Category: ${init.cat} | Wave: ${init.wave} | Priority: ${init.pri}
RAG: ${init.rag} | Progress: ${init.prog}% | Go-Live: ${init.goLive} | Budget: Rs${init.bp}Cr / Rs${init.bs}Cr spent
${init.tsa ? `EARLY TSA EXIT [B]: Global Corp exits "${init.tsaSvc}" at ${init.tsaQ}.` : "Standard 3-year Global Corp TSA."}
${init.td ? "TECHNICAL DEPENDENCY [A]: Prerequisite for other workstreams." : ""}
${init.desc}`;
}

export function buildArtifactPrompt(
  init: Initiative,
  artifact: Artifact,
  program: Program | null
): string {
  return `You are a senior KPMG consultant. Generate a high-quality ${artifact.name} for this IT separation initiative.
${buildInitCtx(init, program)}
Artifact type: ${artifact.name} | Phase: ${artifact.desc}
Format in Markdown. Be specific to this initiative and the separation context. Use tables where appropriate. Aim for consulting quality — not generic.`;
}
