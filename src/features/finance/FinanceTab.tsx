import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/brand/StatCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInitiatives } from "@/store/program";
import { CATEGORY_NAMES, CATS } from "@/data/catalog";
import { cr } from "@/lib/format";
import type { CategoryName } from "@/types/domain";

export function FinanceTab() {
  const navigate = useNavigate();
  const inits = useInitiatives();
  const [cat, setCat] = useState<CategoryName | "all">("all");
  const [sort, setSort] = useState("budget");

  const totalBp = inits.reduce((s, i) => s + i.bp, 0);
  const totalBs = inits.reduce((s, i) => s + i.bs, 0);
  const totalPtd = inits.reduce((s, i) => s + Math.round((i.bp * i.prog) / 100), 0);
  const variance = totalPtd - totalBs;

  const rows = useMemo(() => {
    let r = inits.filter((i) => cat === "all" || i.cat === cat);
    r = [...r].sort((a, b) => {
      if (sort === "budget") return b.bp - a.bp;
      if (sort === "spent") return b.bs - a.bs;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });
    return r;
  }, [inits, cat, sort]);

  return (
    <div className="space-y-4 p-5">
      <div>
        <h2 className="text-2xl font-extrabold text-kpmg-navy">Finance</h2>
        <p className="text-sm text-muted-foreground">Budget tracking and cost variance across the portfolio.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard label="Total Budget" value={cr(totalBp)} accent="#00338D" icon={Wallet} />
        <StatCard label="Planned Till Date" value={cr(totalPtd)} accent="#7C3AED" />
        <StatCard label="Actual Spent" value={cr(totalBs)} accent="#0284C7" />
        <StatCard label="Variance vs PTD" value={`${cr(Math.abs(variance))} ${variance >= 0 ? "under" : "over"}`} accent={variance >= 0 ? "#059669" : "#DC2626"} />
        <StatCard label="Utilisation" value={`${totalBp ? Math.round((totalBs / totalBp) * 100) : 0}%`} accent="#D97706" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Select value={cat} onValueChange={(v) => setCat(v as CategoryName | "all")}>
          <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORY_NAMES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="budget">Budget ↓</SelectItem>
            <SelectItem value="spent">Spent ↓</SelectItem>
            <SelectItem value="name">Name A–Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 text-left font-semibold">Initiative</th>
              <th className="px-4 py-2.5 text-left font-semibold">Wave</th>
              <th className="px-4 py-2.5 text-left font-semibold">Total Budget</th>
              <th className="px-4 py-2.5 text-left font-semibold">Planned Till Date</th>
              <th className="px-4 py-2.5 text-left font-semibold">Actual Spent</th>
              <th className="px-4 py-2.5 text-left font-semibold">Variance vs PTD</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((i) => {
              const ptd = Math.round((i.bp * i.prog) / 100);
              const v = ptd - i.bs;
              return (
                <tr key={i.id} className="cursor-pointer hover:bg-slate-50" onClick={() => navigate(`/app/initiatives/${i.id}`)}>
                  <td className="px-4 py-3">
                    <p className="text-[13px] font-bold text-foreground">{i.name}</p>
                    <span className="text-[10px] font-semibold" style={{ color: CATS[i.cat].color }}>{i.cat}</span>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-muted-foreground">W{i.wave}</td>
                  <td className="px-4 py-3 font-semibold">{cr(i.bp)}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-kpmg-navy">{cr(ptd)}</span>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Progress value={i.prog} className="h-1 w-16" indicatorColor={CATS[i.cat].color} />
                      <span className="text-[10px] text-muted-foreground">{i.prog}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{cr(i.bs)} ({i.bp ? Math.round((i.bs / i.bp) * 100) : 0}%)</td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] font-bold" style={{ color: v >= 0 ? "#059669" : "#DC2626" }}>
                      {cr(Math.abs(v))} {v >= 0 ? "under" : "over"}
                    </span>
                    <p className="text-[10px] text-muted-foreground">vs {cr(ptd)} PTD</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
