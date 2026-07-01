import { useState } from "react";
import { ArrowLeft, ArrowRight, Send, Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/brand/Markdown";
import { RagBadge } from "@/components/brand/RagBadge";
import { useInitiatives } from "@/store/program";
import { loadArtifact, saveArtifact } from "@/api/client";
import { CATS } from "@/data/catalog";
import type { Initiative } from "@/types/domain";

const WSR = "Weekly Status Report";

export function ReportsTab() {
  const inits = useInitiatives();
  const [selected, setSelected] = useState<Initiative | null>(null);

  if (selected) return <ReportDetail init={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="space-y-4 p-5">
      <div>
        <h2 className="text-2xl font-extrabold text-kpmg-navy">Reports</h2>
        <p className="text-sm text-muted-foreground">Weekly Status Reports per initiative — select an initiative to view or update.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {inits.map((i) => {
          const has = !!loadArtifact(i.id, WSR);
          return (
            <Card
              key={i.id}
              onClick={() => setSelected(i)}
              style={{ borderTopColor: CATS[i.cat].color }}
              className="flex cursor-pointer items-start justify-between gap-2 border-t-[3px] p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div>
                <p className="text-[13px] font-bold text-foreground">{i.name}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <RagBadge rag={i.rag} />
                  <span className="text-[10px] text-muted-foreground">W{i.wave} · {i.goLive}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${has ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                  {has ? "WSR Ready" : "Draft"}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ReportDetail({ init, onBack }: { init: Initiative; onBack: () => void }) {
  const existing = loadArtifact(init.id, WSR);
  const [content, setContent] = useState(existing?.content ?? "");
  const [editing, setEditing] = useState(!existing);
  const [sent, setSent] = useState(false);

  const save = () => {
    saveArtifact(init.id, WSR, content, existing);
    setEditing(false);
  };

  return (
    <div className="space-y-4 p-5">
      <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-semibold text-kpmg-navy hover:underline">
        <ArrowLeft className="h-4 w-4" /> All reports
      </button>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="flex-1 text-2xl font-extrabold text-kpmg-navy">{init.name} — Weekly Status Report</h2>
        {!editing && (
          <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setEditing(true)}>
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
        )}
        {editing && <Button size="sm" onClick={save}>Save</Button>}
        <Button size="sm" className="gap-1.5 bg-kpmg-green text-kpmg-navy hover:bg-kpmg-green/90" onClick={() => { setSent(true); setTimeout(() => setSent(false), 2500); }}>
          <Send className="h-3.5 w-3.5" /> {sent ? "Sent ✓" : "Send Report"}
        </Button>
      </div>

      <Card className="p-5">
        {editing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`# ${init.name} — Weekly Status Report\n\n## RAG: ${init.rag}\n\n## Progress\n- ...\n\n## Key activities this week\n- ...\n\n## Next steps\n- ...`}
            className="h-[420px] w-full resize-y rounded-lg border border-border p-3 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
          />
        ) : content ? (
          <Markdown>{content}</Markdown>
        ) : (
          <div className="py-16 text-center text-sm text-muted-foreground">
            No report yet. Click <b>Edit</b> to draft this week's status report.
          </div>
        )}
      </Card>
    </div>
  );
}
