import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProgram } from "@/store/program";
import { ROLES } from "@/data/catalog";
import type { Role } from "@/types/domain";

export function Topbar({ title }: { title: string }) {
  const navigate = useNavigate();
  const { role, setRole, reset } = useProgram();

  return (
    <header className="z-10 flex h-14 shrink-0 items-center gap-3 border-b bg-white px-5">
      <h1 className="flex-1 truncate text-sm font-bold text-foreground">{title}</h1>
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 text-muted-foreground"
        onClick={() => {
          reset();
          navigate("/");
        }}
      >
        <Home className="h-4 w-4" />
        Home
      </Button>
      <Select value={role} onValueChange={(v) => setRole(v as Role)}>
        <SelectTrigger className="h-8 w-[150px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ROLES.map((r) => (
            <SelectItem key={r} value={r} className="text-xs">
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Live
      </span>
    </header>
  );
}
