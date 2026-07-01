// Data-access seam. Today everything is local (seed data + localStorage for
// artifacts). To move to a real backend later, reimplement THIS file to make
// HTTP calls — no screen needs to change.

import type { Program } from "@/types/domain";
import { INITIATIVES } from "@/data/initiatives";
import { SAMPLE_PRINCIPLES } from "@/data/catalog";
import { nowStamp } from "@/lib/format";

export const SAMPLE_PROGRAM: Program = {
  clientName: "ClientCo",
  parentName: "Global Corp",
  industry: "Consumer Markets",
  programName: "ClientCo IT Separation Program",
  separationDate: "Q3 FY29",
  guidingPrinciples: SAMPLE_PRINCIPLES.join("\n"),
  initiatives: INITIATIVES,
  standardTsa: "3",
};

// ─── Artifact persistence (localStorage; same key shape as the original) ───

const key = (initId: number, artifactName: string) =>
  `smo_art_${initId}_${artifactName.replace(/\s+/g, "_")}`;

export interface ArtifactRecord {
  content: string;
  ts: string;
}

export function loadArtifact(initId: number, artifactName: string): ArtifactRecord | null {
  try {
    const v = localStorage.getItem(key(initId, artifactName));
    return v ? (JSON.parse(v) as ArtifactRecord) : null;
  } catch {
    return null;
  }
}

export function loadArtifactHistory(initId: number, artifactName: string): ArtifactRecord[] {
  try {
    const h = localStorage.getItem(key(initId, artifactName) + "_hist");
    return h ? (JSON.parse(h) as ArtifactRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveArtifact(
  initId: number,
  artifactName: string,
  content: string,
  prev?: ArtifactRecord | null
): ArtifactRecord {
  const ts = nowStamp();
  const rec: ArtifactRecord = { content, ts };
  try {
    if (prev?.content) {
      const hist = loadArtifactHistory(initId, artifactName);
      hist.unshift({ content: prev.content, ts: prev.ts || "Previous" });
      localStorage.setItem(
        key(initId, artifactName) + "_hist",
        JSON.stringify(hist.slice(0, 3))
      );
    }
    localStorage.setItem(key(initId, artifactName), JSON.stringify(rec));
  } catch {
    /* storage may be unavailable; non-fatal */
  }
  return rec;
}

/** Status of an artifact for folder badges. */
export function artifactStatus(
  initId: number,
  artifactName: string
): "saved" | "draft" | "idle" {
  return loadArtifact(initId, artifactName) ? "saved" : "idle";
}
