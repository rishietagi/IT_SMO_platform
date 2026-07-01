import type { Risk, Issue } from "@/types/domain";

export const CROSS_RISKS: Risk[] = [
  { id: "CR-01", desc: "TSA Exit — Critical applications", cat: "Schedule", prob: "High", impact: "Critical", score: 25, trend: "↑", owner: "SMO Lead", status: "Open", dueDate: "30 Sep FY27", mitigation: "Accelerated implementation plans for Wave 1. Weekly tracking." },
  { id: "CR-02", desc: "Data Migration Complexity", cat: "Technical", prob: "High", impact: "High", score: 16, trend: "↑", owner: "Data Lead", status: "Open", dueDate: "31 Jan FY28", mitigation: "Early data quality assessments across all initiatives. Cleansing sprints in blueprint." },
  { id: "CR-03", desc: "Resource Availability — Business SMEs", cat: "Resource", prob: "High", impact: "High", score: 15, trend: "→", owner: "Programme Director", status: "In Progress", dueDate: "31 Oct FY27", mitigation: "Formal SME allocation commitments. CIO directive issued." },
  { id: "CR-04", desc: "Integration Complexity — 25 simultaneous", cat: "Technical", prob: "High", impact: "High", score: 14, trend: "↑", owner: "Architecture Lead", status: "Open", dueDate: "28 Feb FY28", mitigation: "SAP BTP as single middleware. ARB governing all integration designs." },
  { id: "CR-05", desc: "Regulatory Compliance — India GST/TDS", cat: "Compliance", prob: "Medium", impact: "Critical", score: 13, trend: "→", owner: "Tax Lead", status: "In Progress", dueDate: "30 Nov FY27", mitigation: "Specialist advisory engaged for all statutory configurations." },
  { id: "CR-06", desc: "Third Party Dependency — Global Corp KT", cat: "Dependency", prob: "High", impact: "Medium", score: 12, trend: "↑", owner: "SMO Lead", status: "Open", dueDate: "31 Aug FY27", mitigation: "Formal KT schedule with SLA. Escalation to Global Corp MD if blocked." },
  { id: "CR-07", desc: "Change Readiness — 600+ users impacted", cat: "Change", prob: "Medium", impact: "Medium", score: 9, trend: "→", owner: "Change Lead", status: "Open", dueDate: "30 Jun FY28", mitigation: "Change champion network. Super user programme across all business functions." },
  { id: "CR-08", desc: "Knowledge Transfer Gap — legacy systems", cat: "Dependency", prob: "Medium", impact: "Medium", score: 9, trend: "→", owner: "Data Lead", status: "Open", dueDate: "31 Oct FY27", mitigation: "Structured documentation programme. All KT sessions recorded." },
  { id: "CR-09", desc: "Budget Overrun — contingency adequacy", cat: "Financial", prob: "Low", impact: "Medium", score: 7, trend: "→", owner: "Programme Director", status: "Monitor", dueDate: "31 Mar FY28", mitigation: "Earned value monitoring monthly. Contingency release process in place." },
  { id: "CR-10", desc: "Programme Governance — decision velocity", cat: "Governance", prob: "Low", impact: "Medium", score: 6, trend: "→", owner: "SMO Lead", status: "Monitor", dueDate: "Ongoing", mitigation: "SteerCo monthly. ARB bi-weekly. Escalation protocol defined." },
];

export const CROSS_ISSUES: Issue[] = [
  { id: "IS-01", desc: "Global Corp KT documentation incomplete — 3 critical systems undocumented", cat: "Technical", sev: "High", status: "Open", owner: "Architecture Lead", dueDate: "Q3 FY26", action: "Formal escalation to Global Corp MD. Weekly tracking." },
  { id: "IS-02", desc: "Business SME availability below 30% — blueprint workshops at risk", cat: "Resource", sev: "High", status: "In Progress", owner: "Programme Director", dueDate: "Q3 FY26", action: "CIO directive issued. Dedicated SME allocation for blueprint phase." },
  { id: "IS-03", desc: "Vendor PD at 60-80% required — resourcing gap identified", cat: "Resource", sev: "Medium", status: "In Progress", owner: "SMO Lead", dueDate: "Q3 FY26", action: "Additional resource request submitted to Infosys. Escalation path agreed." },
  { id: "IS-04", desc: "Integration scope not fully defined — 8 interfaces pending design", cat: "Technical", sev: "Medium", status: "Open", owner: "Architecture Lead", dueDate: "Q4 FY26", action: "ARB working session scheduled. BTP integration patterns to be confirmed." },
  { id: "IS-05", desc: "Azure India region capacity — GPU availability for AI workloads uncertain", cat: "Technical", sev: "Low", status: "Monitor", owner: "Infrastructure Lead", dueDate: "Q1 FY27", action: "Microsoft account team engaged. Reservation request submitted." },
];
