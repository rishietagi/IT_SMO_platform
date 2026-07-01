import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Link2,
  Layers,
  CalendarRange,
  TriangleAlert,
  Landmark,
  Wallet,
  Sparkles,
  FileText,
  Settings,
  Circle,
  type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS } from "@/data/catalog";
import { KpmgLogo } from "@/components/brand/KpmgLogo";
import { useProgram } from "@/store/program";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  FolderKanban,
  Link2,
  Layers,
  CalendarRange,
  TriangleAlert,
  Landmark,
  Wallet,
  Sparkles,
  FileText,
  Settings,
};

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? Circle;
  return <Cmp className={className} />;
}

export function Sidebar() {
  const { program } = useProgram();
  return (
    <aside className="flex h-screen w-[236px] shrink-0 flex-col bg-kpmg-navy text-white">
      {/* Brand */}
      <div className="border-b border-white/10 px-4 py-4">
        <div className="mb-2 flex items-center gap-2.5">
          <KpmgLogo variant="white" className="h-5" />
          <span className="text-[10px] font-medium text-white/60">IT SMO Suite</span>
        </div>
        <p className="text-[13px] font-bold leading-tight text-white">
          {program?.clientName ?? "ClientCo"}
        </p>
        <p className="text-[11px] text-white/50">
          Separating from {program?.parentName ?? "Global Corp"}
        </p>
      </div>

      {/* Nav */}
      <nav className="scrollbar-thin flex-1 space-y-0.5 overflow-y-auto p-2">
        {NAV_ITEMS.map((item) =>
          item.placeholder ? (
            <div
              key={item.id}
              className="flex cursor-default items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-white/30"
            >
              <Icon name={item.icon} className="h-[18px] w-[18px] shrink-0" />
              <span className="flex-1">{item.label}</span>
              <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] text-white/40">
                Soon
              </span>
            </div>
          ) : (
            <NavLink
              key={item.id}
              to={`/app/${item.id}`}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2.5 rounded-lg border-l-2 px-3 py-2 text-[13px] transition-colors",
                  isActive
                    ? "border-kpmg-green bg-white/10 font-semibold text-kpmg-green"
                    : "border-transparent text-white/75 hover:bg-white/5 hover:text-white"
                )
              }
            >
              <Icon name={item.icon} className="h-[18px] w-[18px] shrink-0" />
              <span className="flex-1">{item.label}</span>
            </NavLink>
          )
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-4 py-3">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-kpmg-green" />
          <span className="text-[10px] text-white/50">Live · AI-Powered</span>
        </div>
        <p className="text-[9px] text-white/30">KPMG India · Digital Transformation</p>
      </div>
    </aside>
  );
}
