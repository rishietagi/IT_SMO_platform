import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { LandingPage } from "@/features/landing/LandingPage";
import { SetupWizard } from "@/features/setup/SetupWizard";
import { ExecutiveOverview } from "@/features/overview/ExecutiveOverview";
import { InitiativesTab } from "@/features/initiatives/InitiativesTab";
import { InitiativeDetail } from "@/features/initiatives/InitiativeDetail";
import { TsaTab } from "@/features/tsa/TsaTab";
import { WorkstreamsTab } from "@/features/workstreams/WorkstreamsTab";
import { FinanceTab } from "@/features/finance/FinanceTab";
import { RoadmapTab } from "@/features/roadmap/RoadmapTab";
import { RisksTab } from "@/features/risks/RisksTab";
import { ArbTab } from "@/features/arb/ArbTab";
import { AiInsightsTab } from "@/features/insights/AiInsightsTab";
import { ReportsTab } from "@/features/reports/ReportsTab";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/setup", element: <SetupWizard /> },
  {
    path: "/app",
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/app/overview" replace /> },
      { path: "overview", element: <ExecutiveOverview /> },
      { path: "initiatives", element: <InitiativesTab /> },
      { path: "initiatives/:id", element: <InitiativeDetail /> },
      { path: "tsa", element: <TsaTab /> },
      { path: "workstreams", element: <WorkstreamsTab /> },
      { path: "roadmap", element: <RoadmapTab /> },
      { path: "risks", element: <RisksTab /> },
      { path: "arb", element: <ArbTab /> },
      { path: "finance", element: <FinanceTab /> },
      { path: "insights", element: <AiInsightsTab /> },
      { path: "reports", element: <ReportsTab /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
