import type {
  CategoryName,
  CategoryStyle,
  Phase,
  ArbPrinciple,
  ArbDecision,
  NavItem,
  Milestone,
} from "@/types/domain";

export const CATS: Record<CategoryName, CategoryStyle> = {
  ERP: { color: "#7C3AED", light: "#F3E8FF", border: "#DDD6FE" },
  "Manufacturing Tech & PLM": { color: "#059669", light: "#D1FAE5", border: "#A7F3D0" },
  "Business Functions": { color: "#DB2777", light: "#FCE7F3", border: "#F9A8D4" },
  "Infra & Cyber": { color: "#DC2626", light: "#FEE2E2", border: "#FCA5A5" },
  "Data & Analytics": { color: "#0284C7", light: "#E0F2FE", border: "#BAE6FD" },
};

export const CATEGORY_NAMES = Object.keys(CATS) as CategoryName[];

export const PHASES: Phase[] = [
  {
    id: "preInit", name: "Pre-Initiation & Vendor Selection", emoji: "🔍", color: "#0F766E", light: "#CCFBF1", border: "#99F6E4",
    artifacts: [
      { name: "Business Requirements Document (BRD)", desc: "Functional and technical requirements agreed with business stakeholders" },
      { name: "Vendor Landscape Assessment", desc: "Market scan, vendor shortlisting, and preliminary fit analysis" },
      { name: "RFP Document", desc: "Formal RFP covering scope, evaluation criteria, and commercial terms" },
      { name: "Vendor Evaluation Scorecard", desc: "Weighted scoring across functional fit, architecture, commercial, and capability" },
      { name: "Vendor Selection Recommendation", desc: "SteerCo-ready recommendation with preferred vendor and risk considerations" },
      { name: "Vendor Onboarding Checklist", desc: "Actions to onboard vendor into SMO governance and reporting cadence" },
    ],
  },
  {
    id: "initiation", name: "Initiation", emoji: "🚀", color: "#7C3AED", light: "#F3E8FF", border: "#DDD6FE",
    artifacts: [
      { name: "Project Charter", desc: "Formal project authorization with objectives, scope, and governance" },
      { name: "Business Case", desc: "Investment justification with costs, benefits, and strategic alignment" },
      { name: "Stakeholder Register", desc: "Key stakeholders, influence mapping, and engagement approach" },
      { name: "High-Level Scope Statement", desc: "In-scope / out-of-scope boundaries, constraints, and assumptions" },
    ],
  },
  {
    id: "planning", name: "Planning", emoji: "📋", color: "#0284C7", light: "#E0F2FE", border: "#BAE6FD",
    artifacts: [
      { name: "Detailed Project Plan", desc: "Timeline with milestones, tasks, resource assignments, and dependencies" },
      { name: "Risk Register", desc: "Risks with probability, impact, RAG ratings, and mitigation plans" },
      { name: "Resource & RACI Plan", desc: "Team structure, roles, RACI matrix, and capacity plan" },
      { name: "Budget & Cost Plan", desc: "Detailed budget by phase, workstream, and cost category" },
      { name: "Communication Plan", desc: "Stakeholder engagement cadence, formats, and escalation paths" },
    ],
  },
  {
    id: "execution", name: "Execution", emoji: "⚙️", color: "#D97706", light: "#FEF3C7", border: "#FDE68A",
    artifacts: [
      { name: "Weekly Status Report", desc: "RAG status update with progress summary, activities, and next steps" },
      { name: "Change Request Log", desc: "Scope and plan changes with impact assessment and approval status" },
      { name: "Decision Log", desc: "Key decisions with rationale, decision owner, and effective date" },
      { name: "Issue Tracker", desc: "Active issues with severity, owner, and resolution timeline" },
    ],
  },
  {
    id: "monitoring", name: "Monitoring & Control", emoji: "📊", color: "#059669", light: "#D1FAE5", border: "#A7F3D0",
    artifacts: [
      { name: "SteerCo Pack", desc: "Executive steering committee deck with portfolio health and escalations" },
      { name: "Dependency Map", desc: "Cross-initiative dependency analysis, blockers, and impact narrative" },
      { name: "KPI Tracker", desc: "Performance indicators vs baseline targets with trend analysis" },
      { name: "TSA Exit Tracker", desc: "Transition service agreement exit milestones and readiness gaps" },
    ],
  },
  {
    id: "closure", name: "Closure", emoji: "✅", color: "#4B5563", light: "#F1F5F9", border: "#CBD5E1",
    artifacts: [
      { name: "Lessons Learned Register", desc: "Key learnings, what worked well, and recommendations for future programs" },
      { name: "Handover Document", desc: "Formal handover to operations with run-books and support contacts" },
      { name: "Stakeholder Sign-off", desc: "Formal acceptance signatures for all project deliverables" },
      { name: "Project Closure Report", desc: "Final summary — actuals vs plan, benefits realized, formal closure" },
    ],
  },
];

/** Short phase metadata for the initiative-detail stepper (from PHASE_META in the original). */
export const PHASE_META = [
  { short: "Pre-Initiation", sub: "Vendor / Product Evaluation", color: "#0F766E" },
  { short: "Initiation", sub: "Project Charter & Planning", color: "#7C3AED" },
  { short: "Planning & Design", sub: "Detailed Planning & Design", color: "#0284C7" },
  { short: "Execution", sub: "Build, Test & Transition", color: "#D97706" },
  { short: "Stabilisation", sub: "Stabilise & Optimise", color: "#059669" },
  { short: "Closure", sub: "Handover & Closure", color: "#4B5563" },
];

export const SAMPLE_PRINCIPLES: string[] = [
  "Business Continuity First — No disruption to India operations during the separation journey",
  "Speed with Stability — Prioritise early TSA exits without compromising quality or compliance",
  "Cloud Native by Default — All new implementations leverage Azure cloud infrastructure",
  "Data Sovereignty — All ClientCo data hosted within India-compliant data centres",
  "Vendor Independence — Avoid single-vendor dependency in the new standalone landscape",
  "Fit for Purpose — Right-size solutions for India scale, not Global Corp global scale",
  "Security by Design — Cybersecurity controls embedded from Day 1, not retrofitted later",
  "Knowledge Transfer First — Maximise Global Corp knowledge transfer before every TSA exit",
];

export const ARB_PRINCIPLES: ArbPrinciple[] = [
  { n: 1, title: "API-First Architecture", type: "Non-negotiable", desc: "All system integrations via documented APIs. No direct database-to-database connections permitted under any circumstance." },
  { n: 2, title: "SAP BTP as Middleware", type: "Non-negotiable", desc: "All enterprise system integrations route through SAP BTP. No point-to-point integrations between Tier-1 systems." },
  { n: 3, title: "Single Source of Truth", type: "Non-negotiable", desc: "Each master data entity (employee, vendor, customer, material) has exactly one system of record. All others read from it." },
  { n: 4, title: "India Data Residency", type: "Non-negotiable", desc: "All data processed and stored within Azure India Central region. No cross-border flows without explicit CIO and Legal approval." },
  { n: 5, title: "Zero Trust Security", type: "Non-negotiable", desc: "All integration endpoints require mutual authentication. No implicit trust between systems even within the same network segment." },
  { n: 6, title: "Event-Driven Where Possible", type: "Guideline", desc: "Prefer asynchronous event-driven integration over synchronous API calls for non-time-critical flows to reduce coupling." },
  { n: 7, title: "Standard Protocols", type: "Guideline", desc: "REST/JSON is the default protocol. SOAP only for legacy system compatibility with documented justification submitted to ARB." },
  { n: 8, title: "Versioned APIs from Day 1", type: "Guideline", desc: "All APIs must be versioned from Day 1. Breaking changes require ARB approval and minimum 90-day deprecation notice to consumers." },
];

export const ARB_DECISIONS: ArbDecision[] = [
  { id: "ARB-001", date: "15 May FY26", initiative: "Core Network Infrastructure", topic: "MPLS WAN Architecture", decision: "Approved", conditions: "None", status: "Closed" },
  { id: "ARB-002", date: "15 May FY26", initiative: "Identity & Access Management", topic: "Azure AD as primary Identity Provider", decision: "Approved", conditions: "MFA mandatory for all users from Day 1", status: "Conditions Open" },
  { id: "ARB-003", date: "29 May FY26", initiative: "Product Engineering (PLM)", topic: "Windchill SaaS vs On-premise", decision: "Approved with Conditions", conditions: "SaaS subject to India data residency confirmation from PTC within 2 weeks", status: "Conditions Open" },
  { id: "ARB-004", date: "29 May FY26", initiative: "Treasury Management", topic: "Multi-bank connectivity approach", decision: "Deferred", conditions: "Resubmit with BTP integration design included", status: "Pending Resubmission" },
  { id: "ARB-005", date: "12 Jun FY26", initiative: "Cloud Foundation", topic: "Azure Landing Zone architecture", decision: "Approved", conditions: "Security baseline review by CISO within 30 days", status: "Conditions Open" },
];

/** Nav items — icon is a lucide-react icon name resolved in the Sidebar. */
export const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Executive Overview", icon: "LayoutDashboard" },
  { id: "initiatives", label: "Initiatives", icon: "FolderKanban" },
  { id: "tsa", label: "TSA Management", icon: "Link2" },
  { id: "workstreams", label: "Workstreams", icon: "Layers" },
  { id: "roadmap", label: "Roadmap & Milestones", icon: "CalendarRange" },
  { id: "risks", label: "Risks & Issues", icon: "TriangleAlert" },
  { id: "arb", label: "Architecture Review", icon: "Landmark" },
  { id: "finance", label: "Finance", icon: "Wallet" },
  { id: "insights", label: "AI Insights", icon: "Sparkles" },
  { id: "reports", label: "Reports", icon: "FileText" },
  { id: "admin", label: "Administration", icon: "Settings", placeholder: true },
];

export const QS: string[] = [
  "Q1 FY27", "Q2 FY27", "Q3 FY27", "Q4 FY27",
  "Q1 FY28", "Q2 FY28", "Q3 FY28", "Q4 FY28",
  "Q1 FY29", "Q2 FY29", "Q3 FY29", "Q4 FY29",
];

export const MILESTONES: Milestone[] = [
  { q: 3, label: "Wave 1 First Exits", color: "#DC2626" },
  { q: 7, label: "Wave 2 First Exits", color: "#D97706" },
  { q: 11, label: "Full TSA Independence", color: "#00338D" },
];

export const INDUSTRIES = ["Consumer Markets", "Manufacturing", "Oil & Gas", "Aviation", "Financial Services"];

export const ROLES = ["PMO Lead", "SteerCo", "Initiative Owner"] as const;
