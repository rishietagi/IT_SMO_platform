import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InitiativeCard } from "./InitiativeCard";
import { useInitiatives } from "@/store/program";
import { CATEGORY_NAMES, CATS } from "@/data/catalog";
import { cn } from "@/lib/utils";
import type { CategoryName } from "@/types/domain";

export function InitiativesTab() {
  const navigate = useNavigate();
  const inits = useInitiatives();
  const [cat, setCat] = useState<CategoryName | "all">("all");
  const [rag, setRag] = useState("all");
  const [wave, setWave] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      inits.filter(
        (i) =>
          (cat === "all" || i.cat === cat) &&
          (rag === "all" || i.rag === rag) &&
          (wave === "all" || String(i.wave) === wave) &&
          (!q || i.name.toLowerCase().includes(q.toLowerCase()))
      ),
    [inits, cat, rag, wave, q]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: inits.length };
    CATEGORY_NAMES.forEach((n) => (c[n] = inits.filter((i) => i.cat === n).length));
    return c;
  }, [inits]);

  return (
    <div className="space-y-4 p-5">
      <div>
        <h2 className="text-2xl font-extrabold text-kpmg-navy">Initiatives in Scope</h2>
        <p className="text-sm text-muted-foreground">
          Showing {filtered.length} of {inits.length} · ⚠ [B] = early TSA exit · ⛓ [A] = tech dependency
        </p>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {(["all", ...CATEGORY_NAMES] as const).map((c) => {
          const active = cat === c;
          const color = c === "all" ? "#00338D" : CATS[c as CategoryName].color;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={active ? { background: color, borderColor: color } : { color, borderColor: color }}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                active ? "text-white" : "bg-white hover:bg-slate-50"
              )}
            >
              {c === "all" ? "All" : c} ({counts[c]})
            </button>
          );
        })}
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[240px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search initiatives…"
            className="pl-9"
          />
        </div>
        <Select value={rag} onValueChange={setRag}>
          <SelectTrigger className="w-[130px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Green">Green</SelectItem>
            <SelectItem value="Amber">Amber</SelectItem>
            <SelectItem value="Red">Red</SelectItem>
          </SelectContent>
        </Select>
        <Select value={wave} onValueChange={setWave}>
          <SelectTrigger className="w-[130px]"><SelectValue placeholder="Wave" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Waves</SelectItem>
            <SelectItem value="1">Wave 1</SelectItem>
            <SelectItem value="2">Wave 2</SelectItem>
            <SelectItem value="3">Wave 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((i) => (
          <InitiativeCard key={i.id} init={i} onClick={() => navigate(`/app/initiatives/${i.id}`)} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No initiatives match the current filters.
        </div>
      )}
    </div>
  );
}
