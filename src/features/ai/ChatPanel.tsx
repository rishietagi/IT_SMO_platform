import { useState } from "react";
import { Sparkles, Send, X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useProgram } from "@/store/program";
import { askCoPilot } from "@/api/ai";
import { buildCtx } from "@/domain/aiPrompts";
import { cn } from "@/lib/utils";

const SUGGESTED = [
  "Which Wave 1 initiatives are most at risk of missing TSA deadlines?",
  "Summarise programme health for this week's SteerCo.",
  "What are the top 3 cross-programme dependency risks right now?",
];

interface Msg {
  role: "user" | "assistant";
  content: string;
}

export function AiCoPilot() {
  const { program } = useProgram();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    const reply = await askCoPilot(text, buildCtx(program));
    setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  return (
    <>
      {/* Bottom co-pilot bar */}
      <div className="flex shrink-0 items-center gap-3 border-t bg-white px-5 py-2.5">
        <Bot className="h-5 w-5 text-kpmg-navy" />
        <p className="flex-1 truncate text-xs text-muted-foreground">
          AI Co-Pilot — Ask questions in natural language. Example: "Show me all initiatives with TSA expiring in 6 months and Red status"
        </p>
        <Button size="sm" className="gap-1.5" onClick={() => setOpen(true)}>
          <Sparkles className="h-3.5 w-3.5" /> Ask AI
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="flex w-[400px] flex-col gap-0 p-0 sm:max-w-[400px]">
          <div className="flex items-center gap-2 border-b bg-kpmg-navy px-4 py-3">
            <Bot className="h-5 w-5 text-white" />
            <p className="flex-1 text-sm font-bold text-white">AI Co-Pilot</p>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.length === 0 && (
              <div>
                <p className="mb-2 text-[11px] font-semibold text-muted-foreground">Suggested queries</p>
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="mb-2 block w-full rounded-lg border border-border bg-slate-50 px-3 py-2 text-left text-[11px] leading-snug text-slate-700 hover:bg-slate-100"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            {msgs.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-relaxed",
                  m.role === "user" ? "ml-auto bg-kpmg-navy text-white" : "bg-slate-100 text-slate-700"
                )}
              >
                {m.content}
              </div>
            ))}
            {loading && <div className="rounded-xl bg-slate-100 px-3 py-2 text-[13px] text-muted-foreground">Thinking…</div>}
          </div>

          <div className="flex items-center gap-2 border-t p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask about the programme…"
              className="flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <Button size="icon" onClick={() => send(input)}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
