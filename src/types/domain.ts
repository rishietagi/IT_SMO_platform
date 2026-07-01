// ─── Core domain types for the IT SMO platform ───

export type Rag = "Red" | "Amber" | "Green";
export type Priority = "Critical" | "High" | "Medium" | "Low";
export type Wave = 1 | 2 | 3;
export type Readiness = "Critical" | "At Risk" | "On Track";
export type Role = "PMO Lead" | "SteerCo" | "Initiative Owner";

export type CategoryName =
  | "ERP"
  | "Manufacturing Tech & PLM"
  | "Business Functions"
  | "Infra & Cyber"
  | "Data & Analytics";

export interface CategoryStyle {
  color: string;
  light: string;
  border: string;
}

export interface Initiative {
  id: number;
  name: string;
  cat: CategoryName;
  rag: Rag;
  wave: Wave;
  pri: Priority;
  /** Progress 0–100 */
  prog: number;
  goLive: string;
  /** early TSA exit (before standard 3-year term) */
  tsa: boolean;
  /** technical dependency [A] — prerequisite for others */
  td: boolean;
  /** budget planned (₹ Cr) */
  bp: number;
  /** budget spent (₹ Cr) */
  bs: number;
  tsaQ: string | null;
  tsaSvc: string | null;
  desc: string;
}

export interface RoadmapProject {
  id: number;
  name: string;
  cat: CategoryName;
  startQ: number;
  endQ: number;
  color: string;
}

export interface Risk {
  id: string;
  desc: string;
  cat: string;
  prob: "High" | "Medium" | "Low";
  impact: "Critical" | "High" | "Medium" | "Low";
  score: number;
  trend: "↑" | "→" | "↓";
  owner: string;
  status: string;
  dueDate: string;
  mitigation: string;
}

export interface Issue {
  id: string;
  desc: string;
  cat: string;
  sev: "High" | "Medium" | "Low";
  status: string;
  owner: string;
  dueDate: string;
  action: string;
}

export interface ArbPrinciple {
  n: number;
  title: string;
  type: "Non-negotiable" | "Guideline";
  desc: string;
}

export interface ArbDecision {
  id: string;
  date: string;
  initiative: string;
  topic: string;
  decision: "Approved" | "Approved with Conditions" | "Deferred" | "Rejected";
  conditions: string;
  status: string;
}

export interface Artifact {
  name: string;
  desc: string;
}

export interface Phase {
  id: string;
  name: string;
  emoji: string;
  color: string;
  light: string;
  border: string;
  artifacts: Artifact[];
}

export interface NavItem {
  id: string;
  label: string;
  /** lucide icon name (resolved in the Sidebar) */
  icon: string;
  placeholder?: boolean;
}

export interface Milestone {
  q: number;
  label: string;
  color: string;
}

export interface Program {
  clientName: string;
  parentName: string;
  industry: string;
  programName: string;
  separationDate: string;
  guidingPrinciples: string;
  initiatives: Initiative[];
  standardTsa: string;
}

// ─── Derived / computed shapes ───

export interface PortfolioMetrics {
  totalProg: number;
  red: Initiative[];
  amber: Initiative[];
  earlyTsa: Initiative[];
  criticalTsa: Initiative[];
  wave1Behind: Initiative[];
  totalBp: number;
  totalBs: number;
  budgetGap: number;
  aiScore: number;
  tsaExpiring: number;
  topRisks: Risk[];
  catProgress: Record<string, number>;
  tsBuckets: Record<string, Initiative[]>;
}

export interface MilestoneStatus {
  l: string;
  status: "done" | "active" | "upcoming";
}

export interface InsightCard {
  icon: string;
  c: string;
  bg: string;
  label: string;
  body: string;
  action: string;
}
