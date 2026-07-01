import { useState } from "react";
import { Sparkles, Pencil, Save, RotateCcw, Copy, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/brand/Markdown";
import { loadArtifact, saveArtifact, type ArtifactRecord } from "@/api/client";
import { generateArtifact } from "@/api/ai";
import { buildArtifactPrompt } from "@/domain/aiPrompts";
import { useProgram } from "@/store/program";
import type { Initiative, Artifact } from "@/types/domain";

type Mode = "idle" | "loading" | "view" | "editing";

export function ArtifactDialog({
  init,
  artifact,
  open,
  onOpenChange,
}: {
  init: Initiative;
  artifact: Artifact | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { program } = useProgram();
  const existing: ArtifactRecord | null = artifact ? loadArtifact(init.id, artifact.name) : null;
  const [mode, setMode] = useState<Mode>(existing ? "view" : "idle");
  const [content, setContent] = useState(existing?.content ?? "");
  const [savedAt, setSavedAt] = useState(existing?.ts ?? "");
  const [draft, setDraft] = useState("");
  const [direction, setDirection] = useState("");

  if (!artifact) return null;

  const generate = async () => {
    setMode("loading");
    const prompt = buildArtifactPrompt(init, artifact, program);
    const text = await generateArtifact(direction ? `${prompt}\nDirection: ${direction}` : prompt);
    setContent(text);
    setMode("view");
  };

  const save = () => {
    const rec = saveArtifact(init.id, artifact.name, draft, { content, ts: savedAt });
    setContent(draft);
    setSavedAt(rec.ts);
    setMode("view");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[86vh] max-w-3xl flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="flex-row items-center gap-3 space-y-0 border-b bg-kpmg-navy px-5 py-3">
          <div className="flex-1">
            <DialogTitle className="text-sm font-bold text-white">{artifact.name}</DialogTitle>
            <p className="text-[11px] text-white/60">
              {savedAt ? `💾 Saved · ${savedAt}` : mode === "editing" ? "✏️ Editing" : mode === "view" ? "📄 Draft ready" : "⚡ Generate"}
            </p>
          </div>
          {mode === "view" && (
            <Button
              size="sm"
              variant="ghost"
              className="gap-1.5 text-white hover:bg-white/15 hover:text-white"
              onClick={() => { setDraft(content); setMode("editing"); }}
            >
              <Pencil className="h-3.5 w-3.5" /> Edit
            </Button>
          )}
          {mode === "editing" && (
            <>
              <Button size="sm" className="gap-1.5 bg-kpmg-green text-kpmg-navy hover:bg-kpmg-green/90" onClick={save}>
                <Save className="h-3.5 w-3.5" /> Save
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/15 hover:text-white" onClick={() => setMode("view")}>
                Cancel
              </Button>
            </>
          )}
          <button onClick={() => onOpenChange(false)} className="text-white/70 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        <div className="scrollbar-thin flex-1 overflow-y-auto p-5">
          {mode === "idle" && (
            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">Add direction for AI (optional)</p>
              <textarea
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                placeholder={`e.g. "Focus on India GST compliance" or "Draft for a CFO audience"`}
                className="mb-4 h-20 w-full resize-y rounded-lg border border-border p-3 text-xs outline-none focus:ring-2 focus:ring-ring"
              />
              <Button className="w-full gap-2" onClick={generate}>
                <Sparkles className="h-4 w-4" /> Generate with AI
              </Button>
              <p className="mt-2.5 text-[11px] text-muted-foreground">
                AI will use the programme context and your direction to generate consulting-quality content.
              </p>
            </div>
          )}
          {mode === "loading" && (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Sparkles className="mb-3 h-8 w-8 animate-pulse text-kpmg-navy" />
              Generating…
            </div>
          )}
          {mode === "editing" && (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="h-[440px] w-full resize-y rounded-lg border border-border p-3 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          )}
          {mode === "view" && (
            <div>
              <Markdown>{content}</Markdown>
              <div className="mt-4 flex gap-2 border-t pt-3">
                <Button size="sm" variant="outline" className="gap-1.5" onClick={generate}>
                  <RotateCcw className="h-3.5 w-3.5" /> Regenerate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => navigator.clipboard?.writeText(content)}
                >
                  <Copy className="h-3.5 w-3.5" /> Copy
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
