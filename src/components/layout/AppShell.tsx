import { Outlet, useLocation, Navigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { AiCoPilot } from "@/features/ai/ChatPanel";
import { NAV_ITEMS } from "@/data/catalog";
import { useProgram } from "@/store/program";

export function AppShell() {
  const { program } = useProgram();
  const location = useLocation();

  // No program loaded (e.g. hard refresh on an app route) → back to landing.
  if (!program) return <Navigate to="/" replace />;

  const seg = location.pathname.split("/")[2] ?? "overview";
  const nav = NAV_ITEMS.find((n) => n.id === seg);
  const title = nav?.label ?? "Executive Overview";

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title={title} />
        <main className="scrollbar-thin flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
        <AiCoPilot />
      </div>
    </div>
  );
}
