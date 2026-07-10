import React, { useState, useRef, useEffect } from "react";

const CATS = {
  "ERP":                      { color:"#7C3AED", light:"#F3E8FF", border:"#DDD6FE" },
  "Manufacturing Tech & PLM": { color:"#059669", light:"#D1FAE5", border:"#A7F3D0" },
  "Business Functions":       { color:"#DB2777", light:"#FCE7F3", border:"#F9A8D4" },
  "Infra & Cyber":            { color:"#DC2626", light:"#FEE2E2", border:"#FCA5A5" },
  "Data & Analytics":         { color:"#0284C7", light:"#E0F2FE", border:"#BAE6FD" },
};

const INITIATIVES = [
  {id:1,  name:"SAP RISE — Core ERP",                  cat:"ERP",                     rag:"Amber",wave:3,pri:"Critical",prog:8,  goLive:"Q3 FY29",tsa:false,td:false,bp:28,bs:1,  tsaQ:null,     tsaSvc:null,desc:"Full SAP S4H Cloud for Finance, Supply Chain, Manufacturing, and Sales. Replacing Global Corp shared SAP ECC. Largest initiative — currently in RFP phase."},
  {id:2,  name:"SAP Integration Platform",             cat:"ERP",                     rag:"Green",wave:3,pri:"High",    prog:3,  goLive:"Q2 FY29",tsa:false,td:true, bp:8, bs:0,  tsaQ:null,     tsaSvc:null,desc:"Integration middleware (BTP) connecting SAP RISE to HRMS, Procurement, PLM, and D2C."},
  {id:3,  name:"SAP Analytics & Reporting (SAC)",      cat:"ERP",                     rag:"Green",wave:2,pri:"Medium",  prog:0,  goLive:"Q4 FY28",tsa:false,td:false,bp:4, bs:0,  tsaQ:null,     tsaSvc:null,desc:"SAP Analytics Cloud for enterprise reporting across Finance, Supply Chain, and Operations."},
  {id:4,  name:"SAP Governance, Risk & Compliance",    cat:"ERP",                     rag:"Green",wave:3,pri:"Medium",  prog:0,  goLive:"Q3 FY29",tsa:false,td:false,bp:2, bs:0,  tsaQ:null,     tsaSvc:null,desc:"GRC for access control, risk management, and audit compliance."},
  {id:5,  name:"Product Engineering Platform (PLM)",   cat:"Manufacturing Tech & PLM",rag:"Red",  wave:1,pri:"Critical",prog:20, goLive:"Q3 FY27",tsa:true, td:false,bp:8, bs:2,  tsaQ:"Q3 FY27",tsaSvc:"Global Corp PLM Platform (Windchill)",desc:"PLM for consumer goods formulation and regulatory compliance. Hard TSA exit Q3 FY27."},
  {id:6,  name:"Engineering Design & CAD Tools",       cat:"Manufacturing Tech & PLM",rag:"Green",wave:1,pri:"High",    prog:40, goLive:"Q3 FY27",tsa:true, td:false,bp:3, bs:1,  tsaQ:"Q3 FY27",tsaSvc:"Global Corp CAD & Design Platforms",desc:"Product design and packaging engineering tools."},
  {id:7,  name:"Manufacturing Execution System",       cat:"Manufacturing Tech & PLM",rag:"Amber",wave:1,pri:"High",    prog:18, goLive:"Q4 FY27",tsa:true, td:false,bp:5, bs:1,  tsaQ:"Q4 FY27",tsaSvc:"Global Corp Manufacturing Analytics & MES",desc:"Production performance, quality management, OEE across 8 plants."},
  {id:8,  name:"Application Lifecycle Management",     cat:"Manufacturing Tech & PLM",rag:"Amber",wave:1,pri:"High",    prog:22, goLive:"Q4 FY27",tsa:true, td:false,bp:2, bs:0,  tsaQ:"Q4 FY27",tsaSvc:"Global Corp ALM & DevOps Platforms",desc:"DevOps toolchain and ALM for ClientCo engineering teams."},
  {id:9,  name:"Engineering Simulation & Testing",     cat:"Manufacturing Tech & PLM",rag:"Green",wave:2,pri:"Medium",  prog:0,  goLive:"Q3 FY28",tsa:false,td:false,bp:2, bs:0,  tsaQ:null,     tsaSvc:null,desc:"Engineering simulation suite for structural, thermal, and motion analysis."},
  {id:10, name:"HR Management System (HRMS)",          cat:"Business Functions",      rag:"Amber",wave:3,pri:"Critical",prog:5,  goLive:"Q1 FY29",tsa:false,td:false,bp:9, bs:0,  tsaQ:null,     tsaSvc:null,desc:"Standalone HRMS covering payroll, core HR, talent management, and learning."},
  {id:11, name:"Recruitment & Talent Platform",        cat:"Business Functions",      rag:"Green",wave:1,pri:"High",    prog:45, goLive:"Q3 FY27",tsa:true, td:false,bp:2, bs:1,  tsaQ:"Q3 FY27",tsaSvc:"Global Corp Talent Acquisition Platform",desc:"Standalone ATS and talent management."},
  {id:12, name:"Treasury Management System",           cat:"Business Functions",      rag:"Amber",wave:1,pri:"High",    prog:25, goLive:"Q4 FY27",tsa:true, td:false,bp:6, bs:1,  tsaQ:"Q4 FY27",tsaSvc:"Global Corp Treasury Operations & Banking",desc:"Cash management, bank connectivity, payments, and FX hedging."},
  {id:13, name:"Financial Close & Reporting",          cat:"Business Functions",      rag:"Green",wave:2,pri:"High",    prog:10, goLive:"Q1 FY28",tsa:true, td:false,bp:3, bs:0,  tsaQ:"Q1 FY28",tsaSvc:"Global Corp Financial Close Platform (Blackline)",desc:"Financial close management and management reporting."},
  {id:14, name:"Procurement & Sourcing Platform",      cat:"Business Functions",      rag:"Green",wave:3,pri:"High",    prog:3,  goLive:"Q1 FY29",tsa:false,td:false,bp:7, bs:0,  tsaQ:null,     tsaSvc:null,desc:"Source-to-pay procurement for strategic sourcing and supplier management."},
  {id:15, name:"Contract Lifecycle Management",        cat:"Business Functions",      rag:"Green",wave:2,pri:"High",    prog:8,  goLive:"Q2 FY28",tsa:true, td:false,bp:4, bs:0,  tsaQ:"Q2 FY28",tsaSvc:"Global Corp Contract Management Platform",desc:"End-to-end CLM for Legal, Procurement, and Commercial."},
  {id:16, name:"D2C & Corporate Website",              cat:"Business Functions",      rag:"Amber",wave:1,pri:"High",    prog:30, goLive:"Q4 FY27",tsa:true, td:false,bp:5, bs:1,  tsaQ:"Q4 FY27",tsaSvc:"Global Corp Web & D2C Platform",desc:"Standalone D2C e-commerce and corporate website."},
  {id:17, name:"Core Network Infrastructure",          cat:"Infra & Cyber",           rag:"Red",  wave:1,pri:"Critical",prog:22, goLive:"Q3 FY27",tsa:true, td:false,bp:14,bs:4,  tsaQ:"Q3 FY27",tsaSvc:"Global Corp WAN/LAN/MPLS Network",desc:"Greenfield WAN/LAN across 8 plants, 4 DCs, and corporate offices."},
  {id:18, name:"Identity & Access Management",         cat:"Infra & Cyber",           rag:"Amber",wave:1,pri:"Critical",prog:35, goLive:"Q3 FY27",tsa:true, td:false,bp:6, bs:2,  tsaQ:"Q3 FY27",tsaSvc:"Global Corp Active Directory & IAM",desc:"Azure AD with SSO, MFA, and PAM. Identity underpins every other system."},
  {id:19, name:"Cloud Foundation & Architecture",      cat:"Infra & Cyber",           rag:"Green",wave:1,pri:"Critical",prog:58, goLive:"Q1 FY28",tsa:false,td:true, bp:4, bs:2,  tsaQ:null,     tsaSvc:null,desc:"Azure landing zones, governance, security baseline. Technical prerequisite for all cloud workstreams."},
  {id:20, name:"Cybersecurity Framework",              cat:"Infra & Cyber",           rag:"Amber",wave:2,pri:"Critical",prog:8,  goLive:"Q2 FY28",tsa:false,td:false,bp:8, bs:0,  tsaQ:null,     tsaSvc:null,desc:"Standalone cybersecurity: SOC, SIEM, endpoint protection, vulnerability management."},
  {id:21, name:"Endpoint Security & Device Mgmt",      cat:"Infra & Cyber",           rag:"Green",wave:2,pri:"High",    prog:10, goLive:"Q2 FY28",tsa:true, td:false,bp:6, bs:0,  tsaQ:"Q2 FY28",tsaSvc:"Global Corp Endpoint Security & MDM Platform",desc:"Endpoint protection, MDM, and server security."},
  {id:22, name:"IT Service Management (ITSM)",         cat:"Infra & Cyber",           rag:"Green",wave:2,pri:"High",    prog:12, goLive:"Q2 FY28",tsa:true, td:false,bp:3, bs:0,  tsaQ:"Q2 FY28",tsaSvc:"Global Corp ITSM Platform (ServiceNow)",desc:"Standalone ITSM for service desk, CMDB, and asset management."},
  {id:23, name:"Enterprise Data Warehouse & BI",       cat:"Data & Analytics",        rag:"Green",wave:2,pri:"High",    prog:5,  goLive:"Q3 FY28",tsa:false,td:true, bp:7, bs:0,  tsaQ:null,     tsaSvc:null,desc:"Azure Synapse data warehouse with Power BI. Technical dependency on Cloud Foundation."},
  {id:24, name:"Consumer & Market Intelligence",       cat:"Data & Analytics",        rag:"Green",wave:3,pri:"Medium",  prog:0,  goLive:"Q1 FY29",tsa:false,td:false,bp:3, bs:0,  tsaQ:null,     tsaSvc:null,desc:"Consumer insights, market analytics, and CX intelligence platform."},
  {id:25, name:"Data Analytics & AI Platform",         cat:"Data & Analytics",        rag:"Green",wave:3,pri:"High",    prog:0,  goLive:"Q2 FY29",tsa:false,td:false,bp:6, bs:0,  tsaQ:null,     tsaSvc:null,desc:"Advanced analytics and agentic AI for supply chain and demand forecasting."},
];

const ROADMAP_PROJECTS = [
  {id:10, name:"HR Management System",         cat:"Business Functions",      startQ:5, endQ:8,  color:"#DB2777"},
  {id:14, name:"Procurement & Sourcing",       cat:"Business Functions",      startQ:5, endQ:8,  color:"#DB2777"},
  {id:12, name:"Treasury Management",          cat:"Business Functions",      startQ:2, endQ:3,  color:"#DB2777"},
  {id:5,  name:"Product Engineering (PLM)",    cat:"Manufacturing Tech & PLM",startQ:1, endQ:2,  color:"#059669"},
  {id:7,  name:"Manufacturing Execution (MES)",cat:"Manufacturing Tech & PLM",startQ:2, endQ:3,  color:"#059669"},
  {id:1,  name:"SAP RISE — Core ERP",         cat:"ERP",                     startQ:3, endQ:10, color:"#7C3AED"},
  {id:2,  name:"SAP Integration Platform",    cat:"ERP",                     startQ:5, endQ:9,  color:"#7C3AED"},
  {id:17, name:"Core Network Infrastructure", cat:"Infra & Cyber",           startQ:1, endQ:2,  color:"#DC2626"},
  {id:18, name:"Identity & Access Mgmt",      cat:"Infra & Cyber",           startQ:1, endQ:2,  color:"#DC2626"},
  {id:23, name:"Enterprise DW & BI",          cat:"Data & Analytics",        startQ:4, endQ:6,  color:"#0284C7"},
];

const CROSS_RISKS = [
  {id:"CR-01",desc:"TSA Exit — Critical applications",         cat:"Schedule",   prob:"High",  impact:"Critical",score:25,trend:"↑",owner:"SMO Lead",       status:"Open",   dueDate:"30 Sep FY27",mitigation:"Accelerated implementation plans for Wave 1. Weekly tracking."},
  {id:"CR-02",desc:"Data Migration Complexity",                cat:"Technical",  prob:"High",  impact:"High",    score:16,trend:"↑",owner:"Data Lead",       status:"Open",   dueDate:"31 Jan FY28",mitigation:"Early data quality assessments across all initiatives. Cleansing sprints in blueprint."},
  {id:"CR-03",desc:"Resource Availability — Business SMEs",    cat:"Resource",   prob:"High",  impact:"High",    score:15,trend:"→",owner:"Programme Director",status:"In Progress",dueDate:"31 Oct FY27",mitigation:"Formal SME allocation commitments. CIO directive issued."},
  {id:"CR-04",desc:"Integration Complexity — 25 simultaneous",cat:"Technical",  prob:"High",  impact:"High",    score:14,trend:"↑",owner:"Architecture Lead",status:"Open",   dueDate:"28 Feb FY28",mitigation:"SAP BTP as single middleware. ARB governing all integration designs."},
  {id:"CR-05",desc:"Regulatory Compliance — India GST/TDS",    cat:"Compliance", prob:"Medium",impact:"Critical",score:13,trend:"→",owner:"Tax Lead",         status:"In Progress",dueDate:"30 Nov FY27",mitigation:"Specialist advisory engaged for all statutory configurations."},
  {id:"CR-06",desc:"Third Party Dependency — Global Corp KT",  cat:"Dependency", prob:"High",  impact:"Medium",  score:12,trend:"↑",owner:"SMO Lead",         status:"Open",   dueDate:"31 Aug FY27",mitigation:"Formal KT schedule with SLA. Escalation to Global Corp MD if blocked."},
  {id:"CR-07",desc:"Change Readiness — 600+ users impacted",   cat:"Change",     prob:"Medium",impact:"Medium",  score:9, trend:"→",owner:"Change Lead",       status:"Open",   dueDate:"30 Jun FY28",mitigation:"Change champion network. Super user programme across all business functions."},
  {id:"CR-08",desc:"Knowledge Transfer Gap — legacy systems",  cat:"Dependency", prob:"Medium",impact:"Medium",  score:9, trend:"→",owner:"Data Lead",         status:"Open",   dueDate:"31 Oct FY27",mitigation:"Structured documentation programme. All KT sessions recorded."},
  {id:"CR-09",desc:"Budget Overrun — contingency adequacy",    cat:"Financial",  prob:"Low",   impact:"Medium",  score:7, trend:"→",owner:"Programme Director",status:"Monitor",dueDate:"31 Mar FY28",mitigation:"Earned value monitoring monthly. Contingency release process in place."},
  {id:"CR-10",desc:"Programme Governance — decision velocity", cat:"Governance", prob:"Low",   impact:"Medium",  score:6, trend:"→",owner:"SMO Lead",          status:"Monitor",dueDate:"Ongoing",   mitigation:"SteerCo monthly. ARB bi-weekly. Escalation protocol defined."},
];


const CROSS_ISSUES = [
  {id:"IS-01",desc:"Global Corp KT documentation incomplete — 3 critical systems undocumented",cat:"Technical",sev:"High",status:"Open",owner:"Architecture Lead",dueDate:"Q3 FY26",action:"Formal escalation to Global Corp MD. Weekly tracking."},
  {id:"IS-02",desc:"Business SME availability below 30% — blueprint workshops at risk",cat:"Resource",sev:"High",status:"In Progress",owner:"Programme Director",dueDate:"Q3 FY26",action:"CIO directive issued. Dedicated SME allocation for blueprint phase."},
  {id:"IS-03",desc:"Vendor PD at 60-80% required — resourcing gap identified",cat:"Resource",sev:"Medium",status:"In Progress",owner:"SMO Lead",dueDate:"Q3 FY26",action:"Additional resource request submitted to Infosys. Escalation path agreed."},
  {id:"IS-04",desc:"Integration scope not fully defined — 8 interfaces pending design",cat:"Technical",sev:"Medium",status:"Open",owner:"Architecture Lead",dueDate:"Q4 FY26",action:"ARB working session scheduled. BTP integration patterns to be confirmed."},
  {id:"IS-05",desc:"Azure India region capacity — GPU availability for AI workloads uncertain",cat:"Technical",sev:"Low",status:"Monitor",owner:"Infrastructure Lead",dueDate:"Q1 FY27",action:"Microsoft account team engaged. Reservation request submitted."},
];

const ARB_PRINCIPLES = [
  {n:1, title:"API-First Architecture",      type:"Non-negotiable", desc:"All system integrations via documented APIs. No direct database-to-database connections permitted under any circumstance."},
  {n:2, title:"SAP BTP as Middleware",       type:"Non-negotiable", desc:"All enterprise system integrations route through SAP BTP. No point-to-point integrations between Tier-1 systems."},
  {n:3, title:"Single Source of Truth",      type:"Non-negotiable", desc:"Each master data entity (employee, vendor, customer, material) has exactly one system of record. All others read from it."},
  {n:4, title:"India Data Residency",        type:"Non-negotiable", desc:"All data processed and stored within Azure India Central region. No cross-border flows without explicit CIO and Legal approval."},
  {n:5, title:"Zero Trust Security",         type:"Non-negotiable", desc:"All integration endpoints require mutual authentication. No implicit trust between systems even within the same network segment."},
  {n:6, title:"Event-Driven Where Possible", type:"Guideline",      desc:"Prefer asynchronous event-driven integration over synchronous API calls for non-time-critical flows to reduce coupling."},
  {n:7, title:"Standard Protocols",          type:"Guideline",      desc:"REST/JSON is the default protocol. SOAP only for legacy system compatibility with documented justification submitted to ARB."},
  {n:8, title:"Versioned APIs from Day 1",   type:"Guideline",      desc:"All APIs must be versioned from Day 1. Breaking changes require ARB approval and minimum 90-day deprecation notice to consumers."},
];

const ARB_DECISIONS = [
  {id:"ARB-001",date:"15 May FY26",initiative:"Core Network Infrastructure",   topic:"MPLS WAN Architecture",                     decision:"Approved",   conditions:"None",                                                     status:"Closed"},
  {id:"ARB-002",date:"15 May FY26",initiative:"Identity & Access Management",  topic:"Azure AD as primary Identity Provider",     decision:"Approved",   conditions:"MFA mandatory for all users from Day 1",                   status:"Conditions Open"},
  {id:"ARB-003",date:"29 May FY26",initiative:"Product Engineering (PLM)",     topic:"Windchill SaaS vs On-premise",              decision:"Approved with Conditions",conditions:"SaaS subject to India data residency confirmation from PTC within 2 weeks",status:"Conditions Open"},
  {id:"ARB-004",date:"29 May FY26",initiative:"Treasury Management",           topic:"Multi-bank connectivity approach",           decision:"Deferred",   conditions:"Resubmit with BTP integration design included",            status:"Pending Resubmission"},
  {id:"ARB-005",date:"12 Jun FY26",initiative:"Cloud Foundation",              topic:"Azure Landing Zone architecture",            decision:"Approved",   conditions:"Security baseline review by CISO within 30 days",          status:"Conditions Open"},
];

const PHASES = [
  {id:"preInit",  name:"Pre-Initiation & Vendor Selection",emoji:"🔍",color:"#0F766E",light:"#CCFBF1",border:"#99F6E4",artifacts:[
    {name:"Business Requirements Document (BRD)",desc:"Functional and technical requirements agreed with business stakeholders"},
    {name:"Vendor Landscape Assessment",desc:"Market scan, vendor shortlisting, and preliminary fit analysis"},
    {name:"RFP Document",desc:"Formal RFP covering scope, evaluation criteria, and commercial terms"},
    {name:"Vendor Evaluation Scorecard",desc:"Weighted scoring across functional fit, architecture, commercial, and capability"},
    {name:"Vendor Selection Recommendation",desc:"SteerCo-ready recommendation with preferred vendor and risk considerations"},
    {name:"Vendor Onboarding Checklist",desc:"Actions to onboard vendor into SMO governance and reporting cadence"},
  ]},
  {id:"initiation",name:"Initiation",emoji:"🚀",color:"#7C3AED",light:"#F3E8FF",border:"#DDD6FE",artifacts:[
    {name:"Project Charter",desc:"Formal project authorization with objectives, scope, and governance"},
    {name:"Business Case",desc:"Investment justification with costs, benefits, and strategic alignment"},
    {name:"Stakeholder Register",desc:"Key stakeholders, influence mapping, and engagement approach"},
    {name:"High-Level Scope Statement",desc:"In-scope / out-of-scope boundaries, constraints, and assumptions"},
  ]},
  {id:"planning",name:"Planning",emoji:"📋",color:"#0284C7",light:"#E0F2FE",border:"#BAE6FD",artifacts:[
    {name:"Detailed Project Plan",desc:"Timeline with milestones, tasks, resource assignments, and dependencies"},
    {name:"Risk Register",desc:"Risks with probability, impact, RAG ratings, and mitigation plans"},
    {name:"Resource & RACI Plan",desc:"Team structure, roles, RACI matrix, and capacity plan"},
    {name:"Budget & Cost Plan",desc:"Detailed budget by phase, workstream, and cost category"},
    {name:"Communication Plan",desc:"Stakeholder engagement cadence, formats, and escalation paths"},
  ]},
  {id:"execution",name:"Execution",emoji:"⚙️",color:"#D97706",light:"#FEF3C7",border:"#FDE68A",artifacts:[
    {name:"Weekly Status Report",desc:"RAG status update with progress summary, activities, and next steps"},
    {name:"Change Request Log",desc:"Scope and plan changes with impact assessment and approval status"},
    {name:"Decision Log",desc:"Key decisions with rationale, decision owner, and effective date"},
    {name:"Issue Tracker",desc:"Active issues with severity, owner, and resolution timeline"},
  ]},
  {id:"monitoring",name:"Monitoring & Control",emoji:"📊",color:"#059669",light:"#D1FAE5",border:"#A7F3D0",artifacts:[
    {name:"SteerCo Pack",desc:"Executive steering committee deck with portfolio health and escalations"},
    {name:"Dependency Map",desc:"Cross-initiative dependency analysis, blockers, and impact narrative"},
    {name:"KPI Tracker",desc:"Performance indicators vs baseline targets with trend analysis"},
    {name:"TSA Exit Tracker",desc:"Transition service agreement exit milestones and readiness gaps"},
  ]},
  {id:"closure",name:"Closure",emoji:"✅",color:"#4B5563",light:"#F1F5F9",border:"#CBD5E1",artifacts:[
    {name:"Lessons Learned Register",desc:"Key learnings, what worked well, and recommendations for future programs"},
    {name:"Handover Document",desc:"Formal handover to operations with run-books and support contacts"},
    {name:"Stakeholder Sign-off",desc:"Formal acceptance signatures for all project deliverables"},
    {name:"Project Closure Report",desc:"Final summary — actuals vs plan, benefits realized, formal closure"},
  ]},
];

const SAMPLE_PRINCIPLES = [
  "Business Continuity First — No disruption to India operations during the separation journey",
  "Speed with Stability — Prioritise early TSA exits without compromising quality or compliance",
  "Cloud Native by Default — All new implementations leverage Azure cloud infrastructure",
  "Data Sovereignty — All ClientCo data hosted within India-compliant data centres",
  "Vendor Independence — Avoid single-vendor dependency in the new standalone landscape",
  "Fit for Purpose — Right-size solutions for India scale, not Global Corp global scale",
  "Security by Design — Cybersecurity controls embedded from Day 1, not retrofitted later",
  "Knowledge Transfer First — Maximise Global Corp knowledge transfer before every TSA exit",
];


const SAMPLE_CONTENT = {
  1: {
    "Business Requirements Document (BRD)":`## Executive Summary
This BRD defines functional and technical requirements for SAP RISE (Core ERP) — ClientCo India's most strategic IT initiative. The solution must deliver a fully standalone SAP S4H Cloud ERP covering Finance, Supply Chain, Manufacturing, and Sales by Q3 FY28, replacing complete dependence on Global Corp's shared SAP ECC instance.

## Business Objectives
1. Establish standalone ERP capability across all India operations by Q3 FY28
2. Achieve full India statutory compliance (GST, TDS, TCS, Companies Act) from Day 1
3. Enable real-time financial reporting without Global Corp system dependency
4. Support ClientCo's India manufacturing operations across 8 plants end-to-end
5. Create a scalable ERP platform for ClientCo's independent growth agenda

## Functional Requirements
| Req ID | Module | Requirement | Priority | Owner |
|--------|--------|-------------|----------|-------|
| FR-01 | FI | General ledger, AP/AR, asset accounting, bank accounting | Must Have | CFO Office |
| FR-02 | CO | Cost centre, profit centre, internal orders, product costing | Must Have | CFO Office |
| FR-03 | MM | Material master, procurement, inventory management, GR/GI | Must Have | Supply Chain |
| FR-04 | WM | Warehouse management — 8 plants and 4 DCs | Must Have | Operations |
| FR-05 | PP | Production planning, MRP, shop floor control, capacity | Must Have | Manufacturing |
| FR-06 | QM | Quality inspection, certificates, defect management | Must Have | Quality |
| FR-07 | SD | Sales orders, delivery, billing, credit management | Must Have | Commercial |
| FR-08 | GST | India GST — CGST/SGST/IGST, e-invoicing, GSTR filing | Must Have | Finance |
| FR-09 | TDS/TCS | Withholding tax — Section 194Q, 206C, Form 26Q/27Q | Must Have | Finance |
| FR-10 | Analytics | Real-time dashboards via SAP Analytics Cloud | Should Have | All |
| FR-11 | Mobile | SAP Fiori mobile apps for field operations and approvals | Should Have | Operations |

## Non-Functional Requirements
- Performance: Less than 3 second response for 95% of transactions
- Availability: 99.5% uptime during India business hours (7am-9pm IST)
- Scalability: Handle 150% of current transaction volume over 5-year horizon
- Security: ISO 27001 plus SAP GRC access controls from Day 1
- Data Residency: All data hosted in Azure India Central region

## Integration Requirements
| Integration | System | Direction | Priority |
|-------------|--------|-----------|----------|
| HRMS | Employee master, org structure | Bi-directional | Must Have |
| Treasury (Kyriba) | Payment orders, bank statements | Bi-directional | Must Have |
| Procurement Platform | PO data, supplier master | Bi-directional | Must Have |
| SAP BTP Integration Platform | Middleware for all integrations | Core | Must Have |
| Data Warehouse (Synapse) | ERP data feed for analytics | Outbound | Should Have |

## Data Migration Requirements
- 23 million records to migrate from Global Corp SAP ECC
- 5-year historical data minimum for Finance and Logistics
- Data cleansing required — estimated 15% data quality issues identified in initial scan
- Parallel cutover run of 4 weeks minimum before go-live
- Full reconciliation sign-off required from CFO and Supply Chain Head

## India Regulatory Requirements
- GST: e-invoicing (IRN generation), GSTR-1/2A/3B, e-way bills
- TDS/TCS: Section 194Q, 206C, Form 26Q, 27Q, Traces integration
- Companies Act: Depreciation schedules, statutory reports
- Transfer pricing: Inter-company pricing documentation

## Assumptions and Constraints
- Global Corp to provide SAP ECC documentation within 4 weeks of SI onboarding
- Business SME availability: Maximum 30% time during BAU operations
- Budget envelope: Rs85Cr for full scope including SI, licensing, infrastructure, training
- Go-live deadline: Q3 FY28 — aligned to standard 3-year Global Corp TSA end`,

    "Vendor Landscape Assessment":`## ERP Market Overview for ClientCo India
Assessment of the enterprise ERP market and SAP implementation partner landscape. Platform decision (SAP RISE S4H Cloud) already confirmed by CIO — this assessment focuses on the critical SI selection.

## Platform Decision — Already Confirmed
ClientCo CIO has confirmed SAP RISE S4H Cloud as the ERP platform. Rationale: leverage Global Corp SAP knowledge transfer, minimise data migration complexity vs greenfield, align to SAP cloud-first roadmap.

## SI Partner Landscape — India Capability Assessment
| SI Partner | SAP RISE Experience | India SAP Staff | Consumer Markets | India S4H Go-Lives | Assessment |
|------------|---------------------|----------------|------------------|---------------------|------------|
| Accenture | Tier 1 — 200+ global | 5,000+ | Strong — dedicated CM practice | 8 | High fit |
| Infosys | Tier 1 — 150+ global | 4,000+ | Strong | 11 | High fit |
| TCS | Tier 1 — 100+ global | 6,000+ | Moderate | 6 | High fit |
| Wipro | Tier 2 — 50+ global | 2,000+ | Moderate | 4 | Medium fit |
| Capgemini | Tier 2 — 60+ global | Limited India | Limited India CM | 2 | Lower fit |

## Key SI Selection Criteria
1. SAP RISE S4H go-live experience in India (minimum 5 India references)
2. Consumer Markets / FMCG sector knowledge and India references
3. India statutory configuration capability (GST e-invoicing, TDS/TCS, Companies Act)
4. Global Corp SAP ECC migration methodology and tooling
5. India-based delivery team (not offshore from lower-cost locations)
6. Fixed-price implementation commitment for defined scope

## Shortlist Recommendation
Accenture, Infosys, and TCS shortlisted for formal RFP. All three meet minimum criteria. Final selection based on RFP evaluation and reference checks.

Next step: Issue RFP within 2 weeks of this assessment approval.`,

    "RFP Document":`## 1. Introduction and Background
ClientCo India is separating its full IT estate from Global Corp following a strategic divestiture. As the centrepiece of this separation, ClientCo requires a qualified System Integrator to implement SAP RISE S4H Cloud — replacing Global Corp's shared SAP ECC. This RFP invites shortlisted SIs to propose their implementation approach, team, and commercial terms.

## 2. Scope of Implementation
In Scope: SAP RISE S4H Cloud — FI, CO, MM, WM, PP, QM, SD. India statutory compliance: GST (e-invoicing, GSTR), TDS/TCS, Companies Act. Data migration: 23M records from Global Corp SAP ECC (5-year history). Integration development: HRMS, Treasury, Procurement, D2C, Data Warehouse. SAP Fiori UX configuration. End-user training: approximately 600 users. Hypercare support: 90 days post go-live.

Out of Scope: SAP GRC (separate initiative), SAP Analytics Cloud (separate initiative), Non-India entities, Legacy decommission (Global Corp responsibility).

## 3. Commercial Requirements
| Item | Requirement |
|------|-------------|
| Pricing model | Fixed-price for defined scope |
| Payment schedule | Milestone-based — maximum 30% upfront |
| Delay penalty | 0.5% of contract value per week beyond go-live |
| Warranty | 12 months post go-live for defects |
| Support SLA | P1: 4 hours, P2: 8 hours, P3: 24 hours |
| Budget envelope | Rs50Cr for SI services (within Rs85Cr total) |

## 4. Evaluation Criteria
| Criteria | Weight | Description |
|----------|--------|-------------|
| SAP RISE implementation approach | 25% | Methodology, phases, risk management |
| India Consumer Markets references | 20% | Minimum 3 India FMCG go-lives on S4H |
| India statutory compliance capability | 15% | GST, TDS, TCS track record |
| Data migration approach (ECC to S4H) | 15% | Methodology, tools, dry run approach |
| Team quality and India availability | 15% | Named resources, India-based delivery |
| Commercial terms and value | 10% | Fixed-price discipline, payment terms |

## 5. Mandatory Requirements (pass or fail)
- Minimum 5 SAP RISE S4H go-lives globally, minimum 3 in India
- Named SAP Practice Head with 15 or more years SAP experience
- India GST implementation on S4H — minimum 2 client references
- Financial health: Net worth above Rs500Cr, no adverse legal proceedings

## 6. Submission Timeline
| Activity | Date |
|----------|------|
| RFP Issue | Confirmed |
| Vendor Q and A Period | 2 weeks |
| Proposal Submission | Week 4 |
| Presentation and Demos | Week 6 |
| Reference Checks | Week 7 |
| Selection Decision | Week 8 |
| Contract Signature | Week 10 |`,

    "Vendor Evaluation Scorecard":`## Evaluation Overview
Formal evaluation of 3 shortlisted SIs for SAP RISE implementation. Evaluation panel: KPMG SMO Lead, ClientCo CIO, CFO Representative, Supply Chain Head, KPMG SAP Technical Lead. Conducted over 3 weeks including written proposals, oral presentations, and reference calls.

## Quantitative Scorecard
| Criteria | Weight | Accenture | Infosys | TCS |
|----------|--------|-----------|---------|-----|
| SAP RISE Implementation Approach | 25% | 88 | 84 | 80 |
| India Consumer Markets References | 20% | 85 | 90 | 78 |
| India Statutory Compliance (GST/TDS) | 15% | 86 | 88 | 85 |
| Data Migration Methodology (ECC to S4H) | 15% | 90 | 85 | 82 |
| Team Quality and Named Resources | 15% | 82 | 85 | 80 |
| Commercial Terms and Fixed-Price Commitment | 10% | 75 | 82 | 88 |
| **Weighted Total** | **100%** | **85.2** | **86.1** | **81.3** |

## Qualitative Assessment

**Accenture:** Strongest data migration methodology — demonstrated ECC to S4H migration accelerator tool. Dedicated Consumer Markets Centre of Excellence in Bangalore. Named Programme Director has 18 years SAP experience. Weakness: Premium commercial terms with significant fixed-price exclusions. Offshore delivery model for 40% of team.

**Infosys:** Best India Consumer Markets references — 4 FMCG S4H go-lives including 2 separations directly analogous to ClientCo. Strong GST and India statutory track record. Fully India-based delivery team. Competitive commercial terms with clean fixed-price structure. Weakness: Programme Director availability confirmed at 60% (must be contractually committed to 80%).

**TCS:** Best commercial terms — lowest total cost at Rs44Cr vs Rs52Cr (Accenture) and Rs48Cr (Infosys). Weakness: Fewer Consumer Markets S4H references. Data migration methodology less structured. Offshore delivery ratio highest at 60%.

## Recommendation
Infosys recommended as preferred SI — highest weighted score (86.1), superior Consumer Markets references, fully India-based delivery, competitive fixed-price, 2 prior IT separation SAP implementations.

Accenture retained as backup. TCS not recommended — commercial advantage insufficient to offset delivery risk.

**Panel Decision: Infosys selected. Proceed to contract negotiation.**`,

    "Vendor Selection Recommendation":`## Executive Summary
Following structured 8-week evaluation, Infosys is recommended as the preferred System Integrator for SAP RISE S4H implementation. Infosys achieved the highest evaluation score (86.1/100) and presents the best combination of Consumer Markets expertise, India SAP statutory knowledge, and competitive commercial terms. SteerCo formal approval required to proceed to contract.

## Recommendation Summary
| Item | Detail |
|------|--------|
| Preferred SI | Infosys Limited |
| Solution | SAP RISE S4H Cloud (Azure India Central) |
| Implementation Value | Rs48Cr fixed-price |
| Annual Licensing | Rs18Cr per year (3-year SAP RISE subscription) |
| India Delivery Ratio | 95% India-based team |
| Programme Director Availability | 80% (to be contractually committed) |

## Rationale for Selection
1. Best Consumer Markets references — 4 FMCG S4H go-lives in India, 2 in separation/divestiture context
2. India statutory expertise — team certified on India GST e-invoicing, TDS/TCS S4H configuration
3. Proprietary ECC-to-S4H migration tool — demonstrated 30% faster than manual approach
4. Fully India-based delivery — no offshore risk, critical for Global Corp KT and timezone alignment
5. Clean fixed-price structure with fewest carve-outs — strongest commercial protection for ClientCo

## Key Contract Terms to Negotiate
- Fixed price: Rs48Cr for defined BRD scope
- Payment: 20% mobilisation, 60% milestone-based, 20% post go-live stabilisation
- Delay penalty: 0.5% contract value per week beyond Q3 FY28
- Warranty: 12 months post go-live — defect resolution at Infosys cost
- Programme Director: Contractual 80% dedication — escalation to Infosys MD if breached

## Decision Required
SteerCo formal approval to proceed with Infosys contract negotiation.
Target contract signature: 2 weeks post-approval.`,

    "Vendor Onboarding Checklist":`## SI Onboarding — Infosys (SAP RISE Programme)

## Legal and Commercial
| Action | Owner | Due | Status |
|--------|-------|-----|--------|
| NDA signed — mutual | Legal | Week 1 | Done |
| Master Services Agreement signed | Legal and Finance | Week 2 | Done |
| Statement of Work executed | Legal and PMO | Week 2 | Done |
| Purchase Order raised | Finance | Week 2 | Done |
| Performance bond received | Finance | Week 3 | In Progress |

## Governance and Reporting
| Action | Owner | Due | Status |
|--------|-------|-----|--------|
| KPMG SMO reporting template shared | SMO | Week 1 | Done |
| Weekly status cadence confirmed (Monday 9am) | PMO | Week 1 | Done |
| Fortnightly project review schedule agreed | PMO | Week 1 | Done |
| SteerCo reporting format agreed | SMO | Week 2 | Done |
| Escalation protocol documented | PMO | Week 2 | Done |
| Infosys PM added to SMO dashboard | SMO | Week 3 | In Progress |

## Technical and Access
| Action | Owner | Due | Status |
|--------|-------|-----|--------|
| Infosys team added to ClientCo project channels | IT | Week 3 | In Progress |
| SAP RISE tenant provisioned (Dev/Test) | SAP and IT | Week 4 | Not Started |
| Azure India environment access granted | IT | Week 4 | Not Started |
| Global Corp SAP access for KT sessions | IT and Global Corp | Week 4 | Not Started |
| Data room access for system documentation | PMO | Week 3 | In Progress |

## Programme Kick-off
| Action | Owner | Due | Status |
|--------|-------|-----|--------|
| Project kick-off meeting held | PMO | Week 3 | In Progress |
| Infosys workstream leads confirmed | Infosys | Week 3 | Not Started |
| Detailed project plan submitted by Infosys | Infosys PM | Week 4 | Not Started |
| Global Corp KT schedule agreed (10 sessions) | Tech Lead | Week 4 | Not Started |

## Key Contacts
| Role | Contact |
|------|---------|
| ClientCo SAP Programme Head | TBC |
| KPMG SMO Lead | TBC |
| Infosys Programme Director | TBC |
| Infosys SAP Architect | TBC |`,

    "Project Charter":`## Executive Summary
SAP RISE is ClientCo's flagship IT initiative — a full SAP S4H Cloud ERP replacing dependence on Global Corp's shared SAP ECC. At Rs85Cr and targeting Q3 FY28, it is the centrepiece of ClientCo's standalone operational capability. Infosys confirmed as SI. Programme in mobilisation phase.

## Objectives and Success Criteria
1. Deploy SAP S4H covering FI, CO, MM, WM, PP, QM, SD for all India operations by Q3 FY28
2. 100% data migration from Global Corp SAP ECC with full reconciliation sign-off by Finance
3. India statutory compliance (GST e-invoicing, TDS/TCS, Companies Act) from Day 1
4. 600 or more users trained — 90% proficiency within 60 days of go-live
5. Zero unplanned downtime in first 90 days of live operation

## Scope
In Scope: Finance and Controlling, Materials Management, Warehouse Management, Production Planning, Quality Management, Sales and Distribution, India GST/TDS/TCS compliance, integrations to HRMS/Treasury/Procurement/D2C/Data Warehouse, 90-day hypercare

Out of Scope: SAP GRC (separate initiative), SAP Analytics Cloud (separate initiative), Non-India operations, Legacy decommission (Global Corp responsibility)

## Governance
- Executive Sponsor: ClientCo CIO
- Business Owners: CFO (Finance) and Supply Chain Head (Operations)
- KPMG Programme Director: TBC
- Infosys Programme Director: TBC
- Governance: Monthly SteerCo plus Fortnightly Project Review

## High-Level Milestones
| Milestone | Target |
|-----------|--------|
| Infosys Contracted and Onboarded | Q4 FY26 |
| Project Kick-off | Q4 FY26 |
| Global Corp KT Complete (10 sessions) | Q1 FY27 |
| Blueprint and Design Sign-off | Q2 FY27 |
| Build Complete (all 7 modules) | Q4 FY27 |
| Integration Testing Complete | Q1 FY28 |
| UAT Sign-off | Q2 FY28 |
| Cutover Readiness Review | Q3 FY28 |
| Go-Live | Q3 FY28 |
| Hypercare Complete | Q4 FY28 |

## Key Risks
1. Infosys Programme Director availability — contractual 80% dedication required
2. Data migration complexity — 23M ECC records, 15% initial quality issue rate
3. India GST/TDS configuration specialist knowledge required
4. SAP Integration Platform (BTP) must be ready before integration testing begins
5. Business SME availability — 600 users to train, peak demand during UAT

## Budget: Rs85Cr | Go-Live: Q3 FY28 | Wave: 3 | Priority: Critical`,

    "Business Case":`## Executive Summary
ClientCo India's entire Finance, Supply Chain, Manufacturing, and Sales operation currently runs on Global Corp's shared SAP ECC. Without SAP RISE, ClientCo has no standalone ERP capability at separation. The Rs85Cr investment is essential — the alternative is operational paralysis.

## Problem Statement
ClientCo India processes approximately 2.3 million SAP transactions per month: Finance (Rs4,200Cr annual revenue managed), Supply Chain (8 plants, 23 warehouses, 1,400 active suppliers), Manufacturing (12 production lines, 3,200 SKUs), and Sales (2,800 active customer accounts). Every transaction runs through Global Corp's SAP system. The standard 3-year TSA provides continued access until Q3 FY28. Without a standalone ERP, ClientCo cannot operate independently after Q3 FY28 and has zero leverage on TSA commercial terms.

## Proposed Solution
SAP RISE S4H Cloud — chosen because it leverages existing Global Corp SAP knowledge, reduces implementation risk versus greenfield, and eliminates infrastructure management burden.

## Cost Analysis
| Category | Rs Cr |
|----------|-------|
| SI Implementation — Infosys (fixed price) | 48.0 |
| SAP RISE Cloud Licensing (3-year prepaid) | 18.0 |
| Infrastructure and Azure hosting | 5.0 |
| Data migration tools and effort | 5.0 |
| Training and change management | 4.0 |
| KPMG programme oversight | 3.0 |
| Contingency (8%) | 2.0 |
| **Total** | **85.0** |

## Benefits
| Benefit | Value |
|---------|-------|
| Operational independence — no separation without this | Non-negotiable |
| Global Corp SAP TSA fee avoidance | Rs8-12Cr per year saving |
| IT cost efficiency (satellite app consolidation) | Rs4Cr per year saving |
| Real-time reporting vs 24-48 hour batch delay | Operational improvement |
| Business agility — ClientCo controls own ERP roadmap | Strategic |

## Risk of Inaction
Without SAP RISE, ClientCo cannot generate India statutory financial reports, process supplier payments, manage inventory, or execute production orders independently. TSA extension (if available) estimated at Rs3-5Cr per quarter at Global Corp's commercial terms with no SLA guarantee.

## Recommendation: Approve Rs85Cr investment. Non-negotiable for separation success.`,

    "Stakeholder Register":`## Stakeholder Register — SAP RISE (Core ERP)

| # | Stakeholder | Role | Interest | Influence | Key Concerns | Engagement |
|---|------------|------|----------|-----------|--------------|------------|
| 1 | CIO | Executive Sponsor | High | High | On-time delivery, standalone capability | Monthly SteerCo, direct escalation |
| 2 | CFO | Business Owner (Finance) | High | High | India statutory compliance, reporting accuracy | Weekly finance workstream review |
| 3 | Supply Chain Head | Business Owner (Operations) | High | High | Procurement, inventory, WM continuity | Weekly ops workstream review |
| 4 | Manufacturing Head | Business Owner (Manufacturing) | High | High | PP/QM capability, plant go-live readiness | Fortnightly manufacturing review |
| 5 | Sales Head | Business Owner (Commercial) | Medium | Medium | SD, customer master, order management | Fortnightly commercial update |
| 6 | KPMG Programme Director | Programme Governance | High | High | On-time, on-budget, quality | Daily during critical phases |
| 7 | Infosys Programme Director | SI Delivery Lead | High | High | Scope, timeline, team availability | Weekly project review |
| 8 | IT Architecture Lead | Technical Authority | High | Medium | Architecture, integration design, security | Design reviews, ARB |
| 9 | India Tax Lead | Compliance | High | Medium | GST, TDS, TCS configuration accuracy | Compliance review milestones |
| 10 | HR Lead | Data Owner | Medium | Low | Employee master, org structure | Data migration workstream |
| 11 | Global Corp IT | Knowledge Transfer | Medium | Low | Smooth handover, TSA exit support | Fortnightly KT sessions |
| 12 | SAP Account Executive | Vendor Management | Medium | Medium | Licence compliance, RISE adoption | Quarterly business review |
| 13 | End Users — Finance (200) | System Users | Low | Low | Usability, training adequacy | Training programme, super users |
| 14 | End Users — Operations (400) | System Users | Low | Low | Process continuity, system stability | Training programme, super users |

## Stakeholder Risk Assessment
- High Risk: Global Corp IT cooperation on KT — outside ClientCo control. Mitigation: formal KT schedule with SLA.
- Medium Risk: Manufacturing Head engagement — change averse. Mitigation: early involvement in blueprint workshops.
- Low Risk: End user adoption — 600 users to train. Mitigation: super user network, change champion programme.`,

    "High-Level Scope Statement":`## Scope — SAP RISE (Core ERP)

## In Scope

SAP S4H Modules:
- FI (Financial Accounting): GL, AP, AR, Asset Accounting, Bank Accounting
- CO (Controlling): Cost Centre, Profit Centre, Internal Orders, Product Costing, Profitability Analysis
- MM (Materials Management): Material Master, Procurement, GR/GI, Invoice Verification, Inventory Management
- WM (Warehouse Management): Structure, Transfer Orders, Goods Movements across 8 plants and 4 DCs
- PP (Production Planning): MRP, Production Orders, Capacity Planning, Shop Floor Control
- QM (Quality Management): Inspection Plans, Quality Notifications, Usage Decisions, Certificates
- SD (Sales and Distribution): Customer Master, Sales Orders, Delivery, Billing, Credit Management

India Statutory and Compliance:
- GST: CGST/SGST/IGST, e-invoicing (IRN), e-way bills, GSTR-1/2A/3B, annual return
- TDS/TCS: Section 194Q, 206C(1H), Form 26Q/27Q, Traces integration
- Companies Act: Schedule II depreciation, statutory reports

Data Migration (from Global Corp SAP ECC):
- 23 million records total
- 5-year transaction history for Finance, 2-year for Logistics
- Master data: Material master 45,000 records, Customer master 2,800, Vendor master 1,400

Integrations: HRMS, Treasury (Kyriba), Procurement Platform, SAP BTP middleware, Data Warehouse

Training: 600 end users plus 40 super users

## Out of Scope
- SAP GRC — separate initiative
- SAP Analytics Cloud — separate initiative
- Non-India entities and international operations
- Export documentation and foreign trade (not applicable)
- Legacy system decommission (Global Corp responsibility)

## Key Assumptions
1. Global Corp provides SAP ECC access for 10 structured KT sessions over 8 weeks
2. Global Corp data extract available within 6 weeks of blueprint sign-off
3. Azure India infrastructure provisioned before build phase begins
4. Business SMEs available at 30% capacity; 80% required during UAT
5. India GST law stable — any post-blueprint changes treated as change requests

## Key Constraints
| Constraint | Detail |
|------------|--------|
| Go-Live | Q3 FY28 — firm, aligned to standard 3-year Global Corp TSA |
| Budget | Rs85Cr total — fixed, change control required for overrun |
| SME Availability | Max 30% time during BAU, peak 80% during UAT |
| Data Hosting | Azure India Central region — data sovereignty requirement |`,

    "Detailed Project Plan":`## Project Plan — SAP RISE (Core ERP)

## Phase 1: Pre-Initiation and SI Selection (FY27 Q2-Q3) — Complete
| # | Task | Owner | Start Date | End Date | Status | Dependent Task # |
|---|------|-------|-----------|---------|--------|-----------------|
| 1.1 | BRD development and sign-off | CFO Office | Q2 FY27 | Q2 FY27 | Done | — |
| 1.2 | SI vendor landscape assessment | PMO | Q2 FY27 | Q2 FY27 | Done | 1.1 |
| 1.3 | RFP issue and evaluation | PMO | Q2 FY27 | Q3 FY27 | Done | 1.2 |
| 1.4 | Infosys selected — SteerCo approved | CIO | Q3 FY27 | Q3 FY27 | Done | 1.3 |
| 1.5 | Contract negotiation | Legal and PMO | Q3 FY27 | Q3 FY27 | In Progress | 1.4 |

## Phase 2: Mobilisation (FY27 Q4)
| # | Task | Owner | Start Date | End Date | Status | Dependent Task # |
|---|------|-------|-----------|---------|--------|-----------------|
| 2.1 | Infosys onboarding and team mobilisation | PMO | Q4 FY27 | Q4 FY27 | Upcoming | 1.5 |
| 2.2 | Azure India Dev/Test provisioning | IT | Q4 FY27 | Q4 FY27 | Upcoming | 2.1 |
| 2.3 | SAP RISE tenant setup | Infosys and SAP | Q4 FY27 | Q4 FY27 | Upcoming | 2.2 |
| 2.4 | Global Corp KT sessions (10 sessions) | Tech Lead | Q4 FY27 | Q1 FY28 | Upcoming | 2.1 |
| 2.5 | Detailed project plan finalisation | Infosys PM | Q4 FY27 | Q4 FY27 | Upcoming | 2.1 |

## Phase 3: Blueprint and Design (FY28 Q1-Q2)
| # | Task | Owner | Start Date | End Date | Status | Dependent Task # |
|---|------|-------|-----------|---------|--------|-----------------|
| 3.1 | Current state documentation — Finance | Finance and Infosys | Q1 FY28 | Q1 FY28 | Upcoming | 2.4 |
| 3.2 | Current state documentation — Supply Chain and Manufacturing | Ops and Infosys | Q1 FY28 | Q1 FY28 | Upcoming | 2.4 |
| 3.3 | Future state design workshops — all modules | Business and Infosys | Q1 FY28 | Q2 FY28 | Upcoming | 3.1, 3.2 |
| 3.4 | India statutory design (GST, TDS, TCS) | Tax and Infosys | Q1 FY28 | Q2 FY28 | Upcoming | 3.3 |
| 3.5 | Integration architecture design | IT Architect | Q1 FY28 | Q2 FY28 | Upcoming | 3.3 |
| 3.6 | Data migration strategy and mapping | Data Lead | Q1 FY28 | Q2 FY28 | Upcoming | 3.1, 3.2 |
| 3.7 | Blueprint sign-off — all modules | All Business Owners | Q2 FY28 | Q2 FY28 | Upcoming | 3.3, 3.4 |

## Phase 4: Build and Configure (FY28 Q3-Q4)
| # | Task | Owner | Start Date | End Date | Status | Dependent Task # |
|---|------|-------|-----------|---------|--------|-----------------|
| 4.1 | FI/CO build and unit test | Infosys Finance team | Q3 FY28 | Q4 FY28 | Upcoming | 3.7 |
| 4.2 | MM/WM/PP/QM build and unit test | Infosys Ops team | Q3 FY28 | Q4 FY28 | Upcoming | 3.7 |
| 4.3 | SD build and unit test | Infosys SD team | Q3 FY28 | Q4 FY28 | Upcoming | 3.7 |
| 4.4 | India statutory (GST/TDS/TCS) build | Infosys Tax team | Q3 FY28 | Q4 FY28 | Upcoming | 3.4 |
| 4.5 | Integration development and test (BTP) | IT and Infosys | Q3 FY28 | Q4 FY28 | Upcoming | 3.5 |
| 4.6 | Data migration development and mock run 1 | Data Lead | Q3 FY28 | Q4 FY28 | Upcoming | 3.6 |
| 4.7 | System integration testing (SIT) | Infosys and QA | Q4 FY28 | Q4 FY28 | Upcoming | 4.1, 4.2, 4.5 |

## Phase 5: UAT and Training (FY29 Q1-Q2)
| # | Task | Owner | Start Date | End Date | Status | Dependent Task # |
|---|------|-------|-----------|---------|--------|-----------------|
| 5.1 | UAT preparation and test case development | Business and Infosys | Q1 FY29 | Q1 FY29 | Upcoming | 4.7 |
| 5.2 | UAT Cycle 1 execution | Business | Q1 FY29 | Q1 FY29 | Upcoming | 5.1 |
| 5.3 | Defect resolution — Cycle 1 | Infosys | Q1 FY29 | Q2 FY29 | Upcoming | 5.2 |
| 5.4 | UAT Cycle 2 regression | Business | Q2 FY29 | Q2 FY29 | Upcoming | 5.3 |
| 5.5 | UAT sign-off | CFO and Supply Chain Head | Q2 FY29 | Q2 FY29 | Upcoming | 5.4 |
| 5.6 | Data migration dress rehearsal | Data Lead | Q1 FY29 | Q2 FY29 | Upcoming | 4.6 |
| 5.7 | Super user training — 40 users | Change Lead | Q2 FY29 | Q2 FY29 | Upcoming | 5.5 |
| 5.8 | End user training — 600 users | Change Lead and Infosys | Q2 FY29 | Q2 FY29 | Upcoming | 5.7 |
| 5.9 | Go-live readiness review | PMO and KPMG | Q2 FY29 | Q2 FY29 | Upcoming | 5.5, 5.6 |

## Phase 6: Cutover and Go-Live (FY29 Q3)
| # | Task | Owner | Start Date | End Date | Status | Dependent Task # |
|---|------|-------|-----------|---------|--------|-----------------|
| 6.1 | Final data migration (delta and cutover) | Data Lead | Q3 FY29 | Q3 FY29 | Upcoming | 5.9 |
| 6.2 | Cutover execution — system freeze to go-live | All | Q3 FY29 | Q3 FY29 | Upcoming | 6.1 |
| 6.3 | Go-Live Q3 FY29 | CIO Decision | Q3 FY29 | Q3 FY29 | Upcoming | 6.2 |
| 6.4 | Hypercare on-site support | KPMG and Infosys | Q3 FY29 | Q4 FY29 | Upcoming | 6.3 |
| 6.5 | Hypercare remote support | KPMG and Infosys | Q4 FY29 | Q4 FY29 | Upcoming | 6.4 |
| 6.6 | Formal handover to ClientCo IT Operations | PMO | Q4 FY29 | Q4 FY29 | Upcoming | 6.5 |

## Critical Milestone Summary
| Milestone | Target | Status |
|-----------|--------|--------|
| Infosys Contracted | Q4 FY27 | In Progress |
| Project Kick-off | Q4 FY27 | Pending |
| Blueprint Sign-off | Q2 FY28 | Pending |
| Build Complete | Q4 FY28 | Pending |
| UAT Sign-off | Q2 FY29 | Pending |
| Go-Live | Q3 FY29 | Pending |`,

    "Risk Register":`| Risk ID | Description | Category | Probability | Impact | Rating | Mitigation | Owner |
|---------|-------------|----------|-------------|--------|--------|------------|-------|
| SAP-R01 | Infosys Programme Director shared — insufficient dedicated attention | Resource | Medium | High | High | Contractual 80% dedication clause; escalation right to Infosys MD if breached | PMO Lead |
| SAP-R02 | Data migration — 23M records with 15% quality issues from Global Corp ECC | Technical | High | High | Critical | Early data quality sprint in blueprint phase; multiple mock runs; dedicated cleansing team | Data Lead |
| SAP-R03 | India GST configuration errors — e-invoicing or GSTR logic incorrect at go-live | Compliance | Medium | Critical | Critical | Infosys India tax specialists; parallel run with existing GST filing; KPMG tax review at UAT | Tax Lead |
| SAP-R04 | SAP Integration Platform (BTP) delayed — blocks all integration testing | Dependency | Medium | High | High | BTP tracked weekly in SMO cross-programme review; integration testing cannot start without BTP | IT Architect |
| SAP-R05 | Global Corp KT quality insufficient — ECC configs not fully documented | Dependency | High | Medium | High | Structured 10-session KT plan with pre-agreed agenda; KPMG lead attends all sessions | Tech Lead |
| SAP-R06 | Business SME availability below 30% commitment — blueprint and UAT delays | Resource | High | High | High | CIO directive for formal SME allocation; backfill BAU during UAT; daily attendance tracking | PMO Lead |
| SAP-R07 | Cutover window too short — 2M records in delta migration exceeds 48-hour window | Technical | Medium | High | High | Cutover simulation 12 weeks before go-live; automated scripts; parallel cutover team | Data Lead |
| SAP-R08 | End user adoption risk — 600 users resistant to new system | Change | Medium | Medium | Medium | Change champion network (40 super users); e-learning; face-to-face training 4 weeks pre-go-live | Change Lead |
| SAP-R09 | Scope creep from business — additional modules or reports requested post-blueprint | Scope | High | Medium | Medium | Strict change control; KPMG change board; any addition requires SteerCo approval | KPMG PD |
| SAP-R10 | Global Corp SAP licence termination before ClientCo go-live | External | Low | Critical | Medium | Contractual TSA protection; legal review; 3-month buffer between go-live target and TSA end | Legal Lead |

## Top 3 Priority Risks
1. **SAP-R02 — Data Migration:** 23M records with 15% quality issues is the biggest go-live risk. Data quality sprint must begin in blueprint phase. Every week of delay in identifying issues costs 2+ weeks of remediation.
2. **SAP-R03 — India GST Compliance:** Configuration error creates immediate legal and financial exposure. Infosys India tax specialist team credentials must be reviewed before contract signature.
3. **SAP-R06 — Business SME Availability:** Root cause of most separation programme failures. CIO must issue a formal directive with named SMEs before kick-off.`,

    "Resource & RACI Plan":`## Programme Team Structure — SAP RISE

## KPMG Team
| Role | Allocation | Responsibility |
|------|-----------|----------------|
| Programme Director | 100% | Overall governance, SteerCo, client escalation |
| SAP Functional Lead | 100% | Blueprint review, quality assurance, India compliance |
| Data Migration Lead | 100% | Data strategy, quality oversight, migration execution |
| Change and Training Lead | 50% | Change impact, training strategy, adoption tracking |
| SMO Integration | 20% | Cross-programme dependency management |

## ClientCo Team
| Role | Allocation | Phase |
|------|-----------|-------|
| Programme Sponsor (CIO) | 10% | Full programme |
| Finance Workstream Lead (CFO Office) | 30% | Blueprint and UAT |
| Supply Chain Workstream Lead | 30% | Blueprint and UAT |
| Manufacturing Workstream Lead | 30% | Blueprint and UAT |
| Sales Workstream Lead | 20% | Blueprint and UAT |
| India Tax Lead | 40% | Blueprint (GST/TDS), UAT sign-off |
| IT Architecture Lead | 50% | Integration design, technical governance |
| Super Users (40 across functions) | 30% | UAT and training delivery support |

## Infosys Team (indicative)
| Role | Count | Responsibility |
|------|-------|----------------|
| Programme Director | 1 | Overall SI delivery |
| SAP Architect | 1 | Solution architecture |
| FI/CO Consultants | 4 | Finance module build |
| MM/WM/PP/QM Consultants | 6 | Operations module build |
| SD Consultants | 2 | Sales module build |
| India Tax Specialist | 2 | GST and TDS/TCS configuration |
| Integration Developers (BTP) | 3 | SAP BTP/PI-PO integrations |
| Data Migration Team | 3 | ETL and migration execution |
| Testing Lead | 1 | SIT and UAT support |
| Basis and Technical | 2 | System administration |

## RACI Matrix — Key Deliverables
| Deliverable | KPMG PD | CIO | Finance Lead | SC Lead | IT Arch | Infosys PD | SMO |
|-------------|---------|-----|-------------|---------|---------|------------|-----|
| BRD Sign-off | A | I | R | R | C | I | I |
| SI Selection | C | A | C | C | C | I | C |
| Blueprint Sign-off Finance | A | I | R | I | C | R | I |
| Blueprint Sign-off Operations | A | I | I | R | C | R | I |
| Integration Architecture | C | I | I | I | R/A | R | I |
| Data Migration Strategy | A | I | C | C | C | R | I |
| UAT Sign-off Finance | C | I | R/A | I | I | C | C |
| UAT Sign-off Operations | C | I | I | R/A | I | C | C |
| Go-Live Decision | C | R/A | C | C | C | C | C |
| Status Reporting | R | I | I | I | I | I | A |

R=Responsible, A=Accountable, C=Consulted, I=Informed`,

    "Budget & Cost Plan":`## Budget Summary — SAP RISE (Core ERP)
Total Approved Budget: ₹28Cr | Spent to Date: ₹1Cr | Utilisation: 3.6%

## Cost Breakdown by Category
| Category | Vendor | Planned (₹Cr) | Spent (₹Cr) | Forecast (₹Cr) | Status |
|----------|--------|--------------|------------|----------------|--------|
| SI Implementation | Infosys — fixed price | 15.0 | 0.5 | 15.0 | Contract in progress |
| SAP RISE Cloud Licensing | SAP — 3yr prepaid | 6.0 | 0.0 | 6.0 | Post-contract |
| Azure Infrastructure (India) | Microsoft Azure | 2.0 | 0.0 | 2.0 | Pending provisioning |
| Data Migration Tools and Effort | Infosys and tools | 2.0 | 0.0 | 2.0 | Blueprint phase |
| Training and Change Management | Internal and Infosys | 1.5 | 0.0 | 1.5 | UAT phase |
| KPMG Programme Oversight | KPMG | 1.0 | 0.5 | 1.0 | On Track |
| Contingency (Uncommitted) | — | 0.5 | 0.0 | 0.5 | Reserved |
| **Total** | | **28.0** | **1.0** | **28.0** | |

## Cost by Programme Phase
| Phase | Budget (RsCr) | Percentage |
|-------|-------------|-----------|
| Pre-Initiation and SI Selection | 2.5 | 3% |
| Mobilisation and Blueprint | 8.0 | 9% |
| Build and Configure | 42.0 | 49% |
| UAT and Training | 20.0 | 24% |
| Go-Live and Hypercare | 10.0 | 12% |
| Contingency | 2.5 | 3% |

## Budget Governance
- Under Rs50L: Programme Director authority
- Rs50L to Rs2Cr: CFO approval required
- Above Rs2Cr: SteerCo approval required
- Contingency release: KPMG PMO recommendation plus CFO approval
- Monthly forecast: Infosys earned value report by 5th of each month
- Variance trigger: Above 10% forecast variance triggers mandatory SteerCo reporting

## Key Budget Risks
- Data migration overrun: 15% quality issues may require additional cleansing sprint — Rs1.5Cr exposure within contingency
- GST law change: Post-blueprint statutory changes treated as change requests
- UAT critical defects: Resolution beyond UAT window — Rs0.5-1.0Cr exposure
- Hypercare extension: If stability issues require over 90 days — Rs0.3Cr per week

Budget Status: On Track — Rs2Cr spent vs Rs2.5Cr planned at SI selection phase.`,

    "Communication Plan":`## Communication Plan — SAP RISE (Core ERP)

## Stakeholder Communication Matrix
| Audience | Communication | Frequency | Format | Owner |
|----------|---------------|-----------|--------|-------|
| SteerCo (CIO, CFO, SC Head) | Programme health update | Monthly | 10-slide deck plus narrative | KPMG PD |
| CIO (direct) | Escalation and decisions | As required | 1-page brief | KPMG PD |
| Finance Workstream | FI/CO progress review | Weekly | Status report plus actions | Infosys FI Lead |
| Operations Workstream | MM/WM/PP progress | Weekly | Status report plus actions | Infosys Ops Lead |
| Full Programme Team | Stand-up | Daily during critical phases | 15-min Teams call | PM |
| KPMG SMO | Cross-programme dependencies | Weekly | Dependency tracker | KPMG PD |
| End Users | Change communications | Monthly | Email newsletter | Change Lead |
| Super Users | Training updates | Fortnightly | Email plus tracker | Change Lead |
| Global Corp IT | KT progress and TSA exit | Fortnightly | KT tracker and Teams call | Tech Lead |
| Infosys Management | Commercial and delivery | Monthly | Delivery review | KPMG PD |

## Key Communication Milestones
| Milestone | Communication | Audience |
|-----------|---------------|----------|
| Infosys Contract Signed | Programme launch announcement | All ClientCo staff |
| Blueprint Sign-off | Design complete — moving to build | Workstream leads |
| Build Complete | UAT launch — user teams mobilise | All users |
| UAT Sign-off | Go-live confirmed — countdown begins | All ClientCo |
| Go-Live | System live — support channels active | All users |

## Escalation Protocol
| Trigger | Level 1 | Level 2 | Timeframe |
|---------|---------|---------|-----------|
| Schedule risk above 2 weeks | KPMG PD to CIO | KPMG PD to CFO and CIO | 24 hours |
| Budget variance above 10% | KPMG PD to CFO | KPMG PD to Board | 48 hours |
| Data migration failure | KPMG PD plus Infosys MD to CIO | Emergency SteerCo | 4 hours |
| GST configuration defect at UAT | Tax Lead plus KPMG to CFO | CIO and Legal | Immediate |

## Communication Principles
1. No surprises — all risks reported as they arise, not at next scheduled meeting
2. Named actions — every status report ends with named actions, owners, and dates
3. Business language — technical issues translated to business impact before escalation
4. Evidence-based — all RAG assessments supported by data, not opinion`,

    "Weekly Status Report":`## RAG Summary — SAP RISE (Core ERP)
| Dimension | Status | Commentary |
|-----------|--------|------------|
| Schedule | Amber | SI contract 2 weeks behind plan — Infosys legal review extended |
| Budget | Green | Rs2Cr of Rs85Cr spent — within plan for SI selection phase |
| Scope | Green | All 7 modules confirmed in scope. No scope changes. |
| Resources | Amber | Programme Director role vacant (ClientCo). KPMG covering interim. |

## Progress This Week
- Infosys contract final terms agreed with Legal — awaiting CFO signature expected Tuesday
- SI kick-off meeting scheduled for 20 Jun — Infosys programme team names confirmed
- Global Corp SAP landscape documentation received — 847 pages of system specs shared with Infosys
- Data migration complexity assessment initiated — 23M records confirmed, initial quality scan shows 14% anomaly rate
- India GST specialist advisory firm confirmed — first session with Infosys tax team booked 25 Jun
- Azure India Central region provisioning request submitted — IT team progressing

## Active Risks and Issues
- HIGH: Infosys Programme Director confirmed at 60% availability vs 80% contractual requirement. Infosys MD notified — resolution expected by contract signature. Owner: KPMG PD. Due: Contract sign date.
- MEDIUM: Data quality scan showing 14% anomaly rate in Global Corp ECC — higher than 10% baseline. Data Lead scoping additional cleansing effort estimated Rs0.5-1.0Cr within contingency. Owner: Data Lead.
- LOW: ClientCo Programme Director role still vacant — KPMG covering interim. HR process accelerated. Owner: HR. Due: 30 Jun.

## Decisions Required
1. CFO signature on Infosys contract required by 15 Jun to maintain kick-off date
2. Programme Director hire decision — options paper shared with CIO this week

## Key Milestone Status
- Complete: SI selection, contract negotiation
- In Progress: Contract signature due 15 Jun
- Next: Project kick-off 20 Jun, Azure provisioning 30 Jun
- Go-Live: Q3 FY28 — Currently on track`,

    "Change Request Log":`## Change Request Log — SAP RISE (Core ERP)

| CR | Title | Requestor | Description | Schedule Impact | Cost Impact | Status |
|----|-------|-----------|-------------|----------------|------------|--------|
| CR-001 | Add SAP Payroll India to scope | HR Lead | HR requesting SAP Payroll India instead of integration to third-party HRMS | Plus 4 weeks build | Plus Rs3.5Cr | Under Review — decision at next SteerCo |
| CR-002 | Include SAP Fiori mobile approvals | Operations Head | Fiori apps for PO approval and goods receipt on mobile devices | Plus 2 weeks build | Plus Rs0.8Cr (within contingency) | Approved — included in blueprint scope |
| CR-003 | Extend UAT duration from 4 to 6 weeks | Infosys PM | Vendor requesting extended UAT cycle given module complexity | Plus 2 weeks | Zero (within SI fixed price) | Rejected — parallel stream approach agreed instead |

## Change Control Summary
| Metric | Value |
|--------|-------|
| Total CRs raised | 3 |
| Approved | 1 (Rs0.8Cr within contingency) |
| Under Review | 1 (Rs3.5Cr requires SteerCo) |
| Rejected | 1 |
| Net schedule impact to date | 0 weeks |
| Contingency remaining | Rs1.2Cr |

## Change Control Thresholds
| Impact | Approver |
|--------|----------|
| Under Rs50L and under 1 week | KPMG Programme Director |
| Rs50L to Rs2Cr or 1 to 4 weeks | CFO plus KPMG PD |
| Above Rs2Cr or above 4 weeks | SteerCo |
| Any scope addition affecting go-live | SteerCo mandatory |`,

    "Decision Log":`## Decision Log — SAP RISE (Core ERP)

| Decision | Description | By | Impact |
|----------|-------------|-----|--------|
| SAP RISE S4H Cloud selected as ERP platform | Rejected Oracle Fusion and Microsoft D365. SAP chosen to leverage Global Corp knowledge transfer and minimise migration risk. | CIO — FY26 Q1 | Positive — reduces implementation risk |
| Infosys selected as System Integrator | Highest evaluation score 86.1 out of 100. Best India Consumer Markets references, strongest India statutory expertise, competitive fixed-price. Accenture as backup. | SteerCo — FY26 Q2 | Positive — implementation can proceed |
| Azure India Central region for all hosting | Data sovereignty requirement for India. Aligns to cloud-first strategy. Microsoft EA pricing available. | CIO and IT Architect — FY26 Q2 | Positive — data residency compliance achieved |
| Fixed-price SI contract model | Rejects time-and-materials. Fixed-price shifts delivery risk to Infosys. Requires clean scope in BRD. | CFO — FY26 Q2 | Positive — budget protection |
| Payroll integrated from HRMS — not built in SAP | SAP Payroll India complexity too high for delivery timeline. Integration to standalone HRMS instead. | CIO and CFO — FY26 Q3 | Neutral — reduces SAP scope, adds integration dependency |
| SAP Fiori approved for mobile approvals | CR-002 approved. Mobile UX for PO approval and GR within contingency budget. Enhances user adoption. | KPMG PD — FY26 Q3 | Positive — user experience improvement |
| No UAT timeline extension for Infosys | CR-003 rejected. Infosys to manage within original UAT window via parallel stream approach. | KPMG PD — FY26 Q3 | Risk managed — Infosys committed |

## Pending Decisions
| Decision | By | Target | Options |
|----------|-----|--------|---------|
| Include SAP Payroll India in scope (CR-001) | SteerCo | Next SteerCo | Option A: Include plus Rs3.5Cr plus 4 weeks. Option B: Maintain HRMS integration. KPMG recommends Option B. |
| ClientCo Programme Director appointment | CIO | 30 Jun FY26 | Internal promotion vs external hire |`,

    "Issue Tracker":`## Active Issues — SAP RISE (Core ERP)

| Issue | Severity | Owner | Raised | Due | Status |
|-------|----------|-------|--------|-----|--------|
| Infosys Programme Director at 60% vs 80% contractual commitment | High | KPMG PD | Jun FY26 | Contract sign date | In Progress — Infosys MD engaged. Replacement resource proposed as co-director. Decision pending. |
| Global Corp ECC data quality — 14% anomaly rate vs 10% assumed | Medium | Data Lead | Jun FY26 | Blueprint phase | In Progress — Data quality sprint scoped. Additional Rs0.5-1.0Cr within contingency. |
| ClientCo Programme Director role vacant | Medium | CIO and HR | Jun FY26 | 30 Jun FY26 | In Progress — 3 candidates shortlisted. Interviews this week. KPMG providing interim cover. |
| Azure India provisioning in IT team queue | Low | IT Lead | Jun FY26 | 30 Jun FY26 | In Progress — Azure subscription created. VM provisioning estimated 10 working days. |

## Closed Issues This Period
| Issue | Resolution |
|-------|------------|
| Infosys contract legal review extended | CFO expedited review — signature expected 15 Jun |

## Summary
Critical: 0 | High: 1 | Medium: 2 | Low: 1 | Overdue: 0 | Resolved this period: 1`,

    "SteerCo Pack":`## Executive Summary
SAP RISE is 8% complete, in SI onboarding phase. Overall status is Amber — driven by Infosys Programme Director availability concern and data quality finding. No critical blockers to Q3 FY28 go-live at this stage. One decision required from SteerCo today.

## Portfolio Health
| Dimension | RAG | Commentary |
|-----------|-----|------------|
| Schedule | Amber | Infosys contract 2 weeks late — recoverable. Kick-off on 20 Jun confirms timeline holds. |
| Budget | Green | Rs2Cr of Rs85Cr spent. All major cost items within plan. Contingency intact at Rs2Cr. |
| Scope | Green | 7 modules confirmed. CR-001 (Payroll) under review — decision required today. |
| Resources | Amber | Infosys PD at 60% vs 80% contracted. ClientCo PD vacant. KPMG covering. |

## Key Accomplishments Since Last SteerCo
- Infosys selected and contracted — India's strongest SAP Consumer Markets SI
- Global Corp KT package received — 847-page ECC system specification. Infosys reviewing.
- Azure India environment provisioned — Dev/Test environment ready for SAP RISE tenant setup
- Data migration assessment started — 23M records profiled, 14% anomaly rate identified
- India GST advisory confirmed — specialist firm engaged for e-invoicing and GSTR configuration review

## Risks for SteerCo Attention
1. MEDIUM — Infosys Programme Director Availability: Confirmed at 60% vs contractual 80%. Infosys MD proposed co-director model. KPMG assessment: acceptable IF co-director has 10+ years SAP experience and is India-based. KPMG will resolve by contract signature.

2. MEDIUM — Data Quality (14% anomaly rate): Higher than 10% baseline. Additional cleansing sprint scoped in blueprint phase at Rs0.5-1.0Cr within contingency. No go-live risk at this stage.

3. LOW — ClientCo Programme Director Vacancy: Interviews this week. Resolved by 30 Jun. KPMG providing interim cover — no programme impact.

## Decision Required
CR-001: Include SAP Payroll India in scope?
- Option A: Include SAP Payroll India — adds Rs3.5Cr and 4 weeks to build phase
- Option B (KPMG Recommended): Maintain HRMS integration approach — payroll runs on standalone HRMS platform. Cleaner architecture, less SAP scope risk.
- Decision needed today — blueprint scope must be locked before Infosys starts design.

## Outlook
Programme on track for Q3 FY28 go-live subject to: (1) Infosys PD issue resolved at contract signature, (2) CR-001 decision made today, (3) ClientCo PD appointed by 30 Jun. KPMG confidence in Q3 FY28 delivery: Medium-High at this stage.`,

    "Dependency Map":`## Dependency Analysis — SAP RISE (Core ERP)
SAP RISE is the central dependency anchor in the ClientCo separation programme — the most outgoing dependencies of any initiative.

## Incoming Dependencies (what SAP RISE needs from other initiatives)
| Initiative | Dependency | Required By | Status | Risk |
|------------|------------|-------------|--------|------|
| Cloud Foundation and Architecture | Azure landing zones required before SAP RISE tenant setup | Q3 FY27 build start | 58% complete — On Track | Low |
| Identity and Access Management | SSO/SAML required for SAP Fiori user authentication | Q3 FY27 build | 35% complete — At Risk | Medium |
| SAP Integration Platform (BTP) | BTP middleware required for all module integrations | Q4 FY27 integration testing | Wave 3 initiative — must accelerate design | Medium |

## Outgoing Dependencies (what cannot proceed without SAP RISE)
| Initiative | What They Need | Blocked Until | Impact if SAP RISE Delays |
|------------|---------------|--------------|--------------------------|
| SAP Integration Platform | SAP RISE API endpoints and data model | Q2 FY27 blueprint sign-off | BTP integration design cannot start |
| Procurement and Sourcing Platform | SAP RISE MM/WM purchase order data model | Q3 FY28 SAP RISE go-live | Procurement platform cannot process POs |
| SAP Analytics and Reporting (SAC) | SAP RISE data feeds for all reporting | Q3 FY28 SAP RISE go-live | Zero enterprise analytics capability post-separation |
| SAP GRC | SAP RISE production environment | Q3 FY28 SAP RISE go-live | GRC access controls cannot be implemented |

## Data Dependencies
| Data Needed | From Whom | By When |
|-------------|-----------|---------|
| Employee master and org structure | HRMS initiative | Blueprint sign-off Q2 FY27 |
| Customer master (historical) | Global Corp IT via data extract | Data migration prep Q1 FY28 |
| Vendor master and payment terms | Global Corp IT via data extract | Data migration prep Q1 FY28 |
| India Chart of Accounts | CFO Office | Blueprint phase Q1 FY27 |

## Critical Path Assessment
A 1-month delay in SAP RISE go-live delays Procurement Platform, SAC, and GRC by 1 month each. Estimated total programme cost of 1-month SAP RISE delay: Rs3-5Cr in additional TSA costs and programme extension.

## Actions
1. Weekly cross-programme dependency review in SMO — SAP RISE, BTP, IAM, Cloud Foundation tracked jointly
2. IAM at-risk status to be resolved this quarter — blocking SAP Fiori SSO design
3. BTP initiative team to attend SAP RISE blueprint workshops from Week 1`,

    "KPI Tracker":`## KPI Dashboard — SAP RISE (Core ERP)
Reporting Period: Current | Programme Stage: SI Onboarding at 8% complete

## Schedule KPIs
| KPI | Target | Actual | Status |
|-----|--------|--------|--------|
| Overall progress vs plan | 10% | 8% | Amber — 2% behind |
| Milestones completed on time | 90% | 75% | Amber — SI contract delay |
| SI onboarding completion | 100% at kick-off | 70% | Amber — contract pending |
| Global Corp KT sessions completed | 2 of 10 | 0 of 10 | Not started yet |
| Blueprint workshop readiness | 100% at Q1 FY27 | Tracking | Pending |

## Budget KPIs
| KPI | Target | Actual | Status |
|-----|--------|--------|--------|
| Budget utilisation vs plan | 3% | 2.4% | Green — slightly underspent |
| SI contract value vs budget | Rs50Cr envelope | Rs48Cr Infosys | Green — Rs2Cr under envelope |
| Cost performance index | Above 0.95 | 0.97 | Green |
| Contingency remaining | Rs2Cr baseline | Rs1.2Cr after CR-002 | Green — within tolerance |

## Quality KPIs
| KPI | Target | Actual | Status |
|-----|--------|--------|--------|
| BRD requirements coverage | 100% | 100% | Green |
| SI evaluation rigour — references checked | 3 per SI | 3 per SI across all 3 | Green |
| Data quality anomaly rate | Below 10% | 14% preliminary | Amber — sprint scoped in blueprint |
| India statutory scope coverage in BRD | 100% | 100% | Green |

## Risk KPIs
| KPI | Target | Actual | Status |
|-----|--------|--------|--------|
| Critical risks | 0 | 0 | Green |
| High risks | Below 3 | 1 | Green |
| Risks with mitigation plan | 100% | 100% | Green |
| Overdue actions | 0 | 0 | Green |

## Leading Indicators to Watch
- Data quality rate at 14% — if above 10% through blueprint, data migration cost increases. Action: sprint in blueprint phase.
- Infosys PD availability at 60% — must be resolved at contract signature. Leading indicator for delivery quality.
- Blueprint workshop participation rate — target 90% business attendance. Leading indicator for sign-off quality.`,

    "TSA Exit Tracker":`## TSA Overview — SAP RISE (Core ERP)

## Standard 3-Year Global Corp TSA
SAP RISE operates under the standard 3-year Global Corp TSA — not an early exit scenario. ClientCo retains access to Global Corp's SAP ECC through Q3 FY28, which is precisely when SAP RISE is targeted to go live. This is the most important standard TSA in the programme.

## TSA Terms Summary
| Item | Detail |
|------|--------|
| TSA Service | Global Corp SAP ECC — full ERP for Finance, Supply Chain, Manufacturing, Sales |
| TSA Provider | Global Corp IT |
| Standard TSA End Date | Q3 FY28 |
| ClientCo Go-Live Target | Q3 FY28 |
| Buffer Between Go-Live and TSA End | 4 to 6 weeks (target) |
| Extension Risk | If SAP RISE delays beyond Q3 FY28, TSA extension needed at premium cost |

## TSA Exit Readiness Timeline
| Milestone | Target | Against TSA Exit | Status |
|-----------|--------|-----------------|--------|
| Blueprint Sign-off | Q2 FY27 | 18 months before TSA exit | On track if kick-off proceeds |
| Build Complete | Q4 FY27 | 12 months before TSA exit | Not started |
| Data Migration Mock Run | Q4 FY27 | 12 months before TSA exit | Not started |
| UAT Sign-off | Q2 FY28 | 3 months before TSA exit | Not started |
| Cutover Dress Rehearsal | Q2 FY28 | 8 weeks before TSA exit | Not started |
| Cutover Readiness Review | Q3 FY28 | 4 weeks before TSA exit | Not started |
| Go-Live and TSA Exit | Q3 FY28 | Target | Not started |

## Key TSA Commercial Terms
- Global Corp provides SAP ECC access at agreed service level through Q3 FY28
- Global Corp-initiated changes to SAP ECC affecting ClientCo require 60-day notice
- ClientCo data extract rights confirmed — Global Corp must provide data within 4 weeks of request
- TSA extension beyond Q3 FY28 at Global Corp's discretion — estimated Rs3-5Cr per quarter premium

## TSA Exit Risk Assessment
| Risk | Probability | Impact | Status |
|------|-------------|--------|--------|
| SAP RISE delays beyond Q3 FY28 — extension required | Low | High | Monitor monthly |
| Global Corp accelerates ECC changes affecting ClientCo | Low | Medium | Contractual protection in place |
| Global Corp data extract quality impacts migration | Medium | High | Data quality sprint planned |

## Actions Required
1. Confirm TSA end date in writing from Global Corp — formal letter required by 30 Jun
2. Establish monthly TSA exit readiness checkpoint — 18-month countdown to go-live
3. Negotiate data extract SLA — Global Corp to provide master data within 4 weeks of request
4. Cutover planning to start 16 weeks before Q3 FY28 go-live`,

    "Lessons Learned Register":`## Lessons Learned — SAP RISE (Core ERP)
Interim register at 8% completion. Full register to be completed at programme closure Q4 FY28.

## Phase 1: Pre-Initiation and SI Selection — Learnings

## What Worked Well
| Learning | Why It Mattered | Recommendation |
|----------|----------------|----------------|
| Structured 3-SI shortlist with clear criteria — decision in 8 weeks vs 14-week industry average | Speed without compromising rigour | Pre-define evaluation criteria before issuing RFP, not during |
| India Consumer Markets reference requirement (minimum 3 India FMCG S4H go-lives) filtered out unqualified SIs | Saved 4 weeks evaluating unqualified vendors | Make industry-specific India references a hard pass-fail criterion upfront |
| Fixed-price commercial requirement forced precise scoping — revealed assumptions | Accenture exclusions list revealed scope ambiguity resolved before contract | Always require fixed-price for implementation scope — time-and-materials is a blank cheque |
| KPMG SAP technical lead in evaluation improved assessment quality | Identified Infosys migration tool as genuine differentiator vs manual approach | Technical KPMG resource must be part of all SI evaluation panels, not just commercial |

## What Could Be Improved
| Learning | What Happened | Recommendation |
|----------|---------------|----------------|
| Programme Director should be recruited before SI selection | ClientCo PD vacancy means no senior ClientCo ownership at kick-off | Recruit Programme Director before contract signature — not as afterthought |
| Data quality assessment should run in parallel with SI selection | 14% anomaly rate discovered after Infosys contracted — if higher, affects fixed-price scope | Commission data quality scan in parallel with RFP — it affects scope and commercial |
| SI contract negotiation timeline underestimated — 3 weeks vs 1 week planned | Legal review of 100-page Master Services Agreement takes time | Budget 4 weeks for SI contract negotiation in programme plan, not 1-2 weeks |

## Early Warning Indicators for SAP RISE Delivery
1. Blueprint workshop attendance rate — below 80% means design quality will suffer
2. Infosys staffing stability — any key resource change in first 6 months is a red flag
3. Data quality rate — above 15% post-cleansing sprint means data migration timeline is at risk
4. Global Corp KT cooperation — fewer than 8 of 10 sessions completed with quality output compromises build`,

    "Handover Document":`## Handover Document — SAP RISE (Core ERP)
Template pre-populated. To be completed and signed at hypercare closure Q4 FY28.

## System Overview
| Item | Detail |
|------|--------|
| System | SAP RISE S4H Cloud |
| Modules | FI, CO, MM, WM, PP, QM, SD |
| Hosting | Azure India Central — SAP managed cloud (RISE) |
| Go-Live Date | Q3 FY28 |
| Handover Date | Q4 FY28 post 90-day hypercare |
| Handover To | ClientCo IT Operations and Finance Operations |
| Primary Support | Infosys AMS team (12-month post go-live warranty) |
| SAP Support | SAP Enterprise Support (included in RISE licensing) |

## Support Structure Post-Handover
| Tier | Responsibility | SLA |
|------|----------------|-----|
| Tier 1 — Service Desk | ClientCo IT Service Desk | P1: 1hr, P2: 4hr |
| Tier 2 — Application Support | Infosys AMS team (India) | P1: 4hr, P2: 8hr, P3: 24hr |
| Tier 3 — SAP Platform | SAP Enterprise Support | Per RISE agreement |
| Escalation | KPMG advisory retainer if required | As agreed |

## Key Run-Books to Be Delivered at Handover
| Run-Book | Status |
|----------|--------|
| Month-end close procedure (FI/CO) | To be developed in build phase |
| MRP run procedure (PP) | To be developed in build phase |
| Period-end inventory valuation (MM) | To be developed in build phase |
| GST return filing procedure | To be developed in build phase |
| User access management (GRC) | To be developed in build phase |
| System backup and recovery | To be developed in build phase |
| Interface monitoring (BTP) | To be developed in build phase |

## Hypercare Exit Criteria
- Zero P1 open incidents
- Below 5 P2 incidents with resolution plans
- All run-books signed off by business workstream leads
- Month-end close completed successfully twice post go-live
- GST return filed successfully for first live period
- All integration interfaces stable for 30 consecutive days

## Knowledge Transfer to ClientCo IT Operations
- SAP Basis administration: 3-day programme for 2 IT staff
- BTP interface monitoring: 1-day for integration team
- Security and access management: 2-day for IT security team
- Infosys to certify ClientCo team competency before warranty end`,

    "Stakeholder Sign-off":`## Project Acceptance Register — SAP RISE (Core ERP)

## Deliverable Acceptance Register
| Deliverable | Accepted By | Target | Status |
|-------------|-------------|--------|--------|
| Business Requirements Document | CFO and Supply Chain Head | Q3 FY26 | Signed |
| Vendor Selection (Infosys) | CIO via SteerCo | Q3 FY26 | Signed |
| Blueprint — Finance (FI/CO) | CFO and Finance Workstream Lead | Q2 FY27 | Pending |
| Blueprint — Supply Chain (MM/WM) | Supply Chain Head | Q2 FY27 | Pending |
| Blueprint — Manufacturing (PP/QM) | Manufacturing Head | Q2 FY27 | Pending |
| Blueprint — Sales (SD) | Sales Head | Q2 FY27 | Pending |
| Blueprint — India Statutory (GST/TDS) | CFO and India Tax Lead | Q2 FY27 | Pending |
| Integration Architecture | IT Architecture Lead | Q2 FY27 | Pending |
| Data Migration Strategy | CFO and Supply Chain Head | Q2 FY27 | Pending |
| Build Completion (all modules) | IT Architecture Lead | Q4 FY27 | Pending |
| UAT Sign-off — Finance | CFO | Q2 FY28 | Pending |
| UAT Sign-off — Operations | Supply Chain Head | Q2 FY28 | Pending |
| UAT Sign-off — Manufacturing | Manufacturing Head | Q2 FY28 | Pending |
| GST Configuration Acceptance | India Tax Lead | Q2 FY28 | Pending |
| Data Migration Reconciliation | CFO and Supply Chain Head | Q3 FY28 | Pending |
| Go-Live Authorisation | CIO | Q3 FY28 | Pending |
| Hypercare Exit and Formal Handover | CIO and IT Operations Lead | Q4 FY28 | Pending |

## Final Programme Closure Declaration
To be completed at Q4 FY28 hypercare closure.

We confirm SAP RISE S4H has been implemented per agreed scope, meets all functional requirements, achieves India statutory compliance, and is accepted for steady-state operations.

ClientCo CIO: _________________________ Date: _______

CFO: _________________________ Date: _______

Supply Chain Head: _________________________ Date: _______

KPMG Engagement Lead: _________________________ Date: _______

Infosys Programme Director: _________________________ Date: _______`,

    "Project Closure Report":`## Project Closure Report — SAP RISE (Core ERP)
Template pre-populated. To be completed at Q4 FY28 hypercare closure.

## Executive Summary
SAP RISE S4H Cloud has been successfully implemented, replacing ClientCo India's dependence on Global Corp's shared SAP ECC. Go-live achieved at Q3 FY28 — aligned to the standard 3-year Global Corp TSA end date. The programme delivers ClientCo's full standalone ERP capability for Finance, Supply Chain, Manufacturing, and Sales operations.

## Delivery Summary
| Metric | Target | Actual | Outcome |
|--------|--------|--------|---------|
| Go-Live Date | Q3 FY28 | Q3 FY28 | On Time |
| Total Programme Budget | Rs85Cr | TBC at closure | Pending |
| Modules Delivered | 7 (FI,CO,MM,WM,PP,QM,SD) | TBC | Pending |
| Data Records Migrated | 23M | TBC | Pending |
| Data Reconciliation Sign-off | 100% | TBC | Pending |
| Users Trained | 600 plus | TBC | Pending |
| P1 Incidents at Go-Live | 0 | TBC | Pending |
| GST Filing First Period | Compliant | TBC | Pending |

## Benefits Realised
| Benefit | Target | Actual |
|---------|--------|--------|
| Full standalone ERP capability from Day 1 | Yes | TBC |
| India statutory compliance — GST, TDS, TCS | Day 1 | TBC |
| Global Corp SAP TSA fee avoidance | Rs8-12Cr per year | TBC |
| IT cost efficiency from consolidation | Rs4Cr per year | TBC |
| Real-time reporting vs 24-48 hour batch delay | Day 1 | TBC |

## Programme Lessons Learned Summary
1. SI fixed-price discipline was critical — prevented scope creep and protected budget
2. India Consumer Markets reference requirement in RFP was non-negotiable — saved the programme from an unqualified SI
3. Data quality assessment must begin in blueprint, not build — 14% anomaly rate required additional sprint
4. ClientCo SME availability should be contractually committed, not verbally agreed
5. Global Corp KT quality — structured sessions with pre-agreed agenda outperformed ad-hoc approach

## Formal Closure
SAP RISE programme formally closed as of Q4 FY28 hypercare closure date.
All deliverables accepted. System in steady-state operation under Infosys AMS and ClientCo IT Operations.

Status: PENDING — To be completed at Q4 FY28 hypercare closure`,

  },
    5: {
    "Project Charter":`## Executive Summary
The Product Engineering Platform initiative delivers ClientCo's standalone PLM capability, replacing dependence on Global Corp's shared Windchill platform. This is the most urgent Wave 1 exit — Global Corp exits the PLM TSA at Q3 FY26 regardless of ClientCo readiness. Currently 3 weeks behind critical path following SI onboarding delays.

## Objectives & Success Criteria
1. Deploy standalone Windchill PLM across all product engineering teams by Q3 FY26
2. Migrate 140,000 product records from Global Corp Windchill with full data integrity
3. Configure India regulatory compliance modules for product formulation and labelling
4. Enable recipe management for all consumer goods formulations on Day 1
5. Train 180 R&D and engineering users achieving 85% proficiency at go-live

## Scope
**In Scope:** Product structure, recipe management, regulatory compliance, CAD data management, PLM–SAP integration, product formulation workflows
**Out of Scope:** Shop-floor manufacturing execution, Global Corp retained products, packaging development (separate CAD initiative)

## Key Risks
- Q3 FY26 TSA exit is a hard deadline — no extension possible from Global Corp
- SI (Infosys) onboarding 3 weeks late — compresses implementation window critically
- Recipe management scope for FMCG formulations not fully defined — may expand
- Data migration complexity: 140K product records, many with complex variant configurations

## Budget: ₹18Cr | Go-Live: Q3 FY26 | Priority: CRITICAL | [B] Early TSA Exit`,

    "Weekly Status Report":`## RAG Summary — Product Engineering Platform (PLM)
| Dimension | Status | Commentary |
|-----------|--------|------------|
| Schedule | 🔴 Red | SI onboarding 3 weeks late — Q3 FY26 go-live at risk |
| Budget | 🟢 Green | ₹4Cr of ₹18Cr — within plan |
| Scope | 🟡 Amber | Recipe management scope being refined with R&D team |
| Resources | 🟡 Amber | Global Corp PLM architect shared — available only until June end |

## Progress This Week
- Infosys selected as SI — contracts signed, kick-off scheduled 20 Jun
- Global Corp knowledge transfer: 3 of 12 sessions complete
- Product data export initiated — 140,000 records, ETL mapping in progress
- India regulatory compliance requirements documented for PLM config
- Q3 FY26 TSA exit risk escalated to SMO — recovery plan being drafted

## Active Risks & Issues
- **CRITICAL:** Q3 FY26 TSA exit at risk — Global Corp PLM goes offline regardless of readiness
- **HIGH:** 3-week SI onboarding delay compresses 14-week implementation to 11 weeks
- **HIGH:** Recipe management scope for FMCG formulations still being finalised

## Decisions Required
PMO Lead decision needed: accept compressed timeline or request Global Corp TSA extension (answer expected to be no)`,

    "Risk Register":`| Risk ID | Description | Category | Probability | Impact | Rating | Mitigation | Owner |
|---------|-------------|----------|-------------|--------|--------|------------|-------|
| PLM-R01 | Q3 FY26 TSA hard exit — Global Corp PLM offline regardless of ClientCo readiness | Schedule | Low | Critical | 🔴 Critical | Compress implementation plan, daily tracking, escalation protocol | PMO Lead |
| PLM-R02 | SI (Infosys) onboarding 3 weeks late — leaves only 11-week implementation window | Schedule | High | High | 🔴 Critical | Daily stand-up with SI, remove approval bottlenecks, fast-track procurement | PLM Lead |
| PLM-R03 | Recipe management scope not finalised — risk of scope expansion post-build start | Scope | Medium | High | 🟡 High | Scope freeze by 15 Jun, escalate unresolved items to PMO | Business Lead |
| PLM-R04 | Global Corp PLM architect shared — leaves end of June, knowledge transfer incomplete | Resource | High | Medium | 🟡 High | Accelerate remaining 9 KT sessions, document all critical configs | Tech Lead |
| PLM-R05 | 140K product records migration — complex variants may fail validation | Technical | Medium | High | 🟡 High | Start data migration dry run by Week 3, identify cleansing actions early | Data Lead |`,
  },

  17: {
    "Project Charter":`## Executive Summary
Core Network Infrastructure establishes ClientCo's standalone WAN/LAN network across all India sites, replacing complete dependence on Global Corp's shared network (MPLS, firewall, DNS). This is the single most critical Wave 1 initiative — every other IT system requires ClientCo's own network to function. Global Corp exits the network TSA at Q3 FY26 — a hard deadline.

## Objectives & Success Criteria
1. Deliver standalone MPLS connectivity across all 12 India sites by Q3 FY26
2. Achieve 99.9% network uptime SLA from Day 1 of standalone operation
3. Complete firewall and security configuration meeting ISMS baseline
4. Enable SD-WAN capability with internet breakout at each site
5. Transfer full network operations to ClientCo IT team by go-live

## Scope
**In Scope:** WAN/MPLS across 8 plants and 4 DCs, LAN at all sites, internet breakout, firewall, DNS, DHCP, network monitoring, NOC setup, failover design
**Out of Scope:** Guest WiFi, OT/shop-floor networking, Global Corp retained network

## High-Level Milestones
| Milestone | Target |
|-----------|--------|
| ISP Selection Complete | Jun FY26 |
| Core Switch Delivery | Jul FY26 |
| Site Cabling — 4 Priority Sites | Aug FY26 |
| All 12 Sites Cabled | Sep FY26 |
| Network Testing & UAT | Oct FY26 |
| Go-Live (TSA Exit) | Q3 FY26 |

## Budget: ₹35Cr | Go-Live: Q3 FY26 | Priority: CRITICAL | [B] Early TSA Exit`,

    "Weekly Status Report":`## RAG Summary — Core Network Infrastructure
| Dimension | Status | Commentary |
|-----------|--------|------------|
| Schedule | 🔴 Red | Nashik plant site access blocked — 2-week delay on critical path |
| Budget | 🟢 Green | ₹8Cr of ₹35Cr — within plan for current phase |
| Scope | 🟡 Amber | 2 additional distribution centres under scope review |
| Resources | 🟡 Amber | Network architect role vacant — interviewing 2 candidates |

## Progress This Week
- Site surveys complete at Pune and Chennai plants
- ISP selection finalised — Tata Communications selected for MPLS backbone
- Core switch procurement placed — delivery expected Week 6
- Firewall architecture design review completed with Cybersecurity team
- Nashik plant access restriction escalated to PMO

## Active Risks & Issues
- **CRITICAL:** Nashik plant access blocked by building contractor — cabling cannot begin. Owner: Facilities. Due: 15 Jun.
- **HIGH:** Network architect vacant — design decisions bottlenecked. Owner: HR. Due: 20 Jun.
- **MEDIUM:** ISP MPLS circuit lead time extended to 8 weeks — impacts timeline.

## Decisions Required
SteerCo approval required: expand scope to include 2 additional DCs identified post sign-off (cost impact ₹3.5Cr).`,

    "Risk Register":`| Risk ID | Description | Category | Probability | Impact | Rating | Mitigation | Owner |
|---------|-------------|----------|-------------|--------|--------|------------|-------|
| NET-R01 | Nashik plant site access blocked by contractor — cabling cannot start | Schedule | High | High | 🔴 Critical | Escalate to Facilities MD, engage alternate cabling vendor for early start | PMO Lead |
| NET-R02 | ISP MPLS circuit lead time 8 weeks — longer than planned 6 weeks | Schedule | Medium | High | 🟡 High | Place orders immediately, identify 4G as interim backup for affected sites | Network Lead |
| NET-R03 | Network architect role vacant — all design decisions bottlenecked | Resource | High | Medium | 🟡 High | Engage interim contractor by 20 Jun, accelerate permanent hire | HR Lead |
| NET-R04 | Global Corp network TSA exit Q3 FY26 is hard — no extension possible | Dependency | Low | Critical | 🟡 High | Weekly tracking against critical path, escalation protocol if >4 weeks behind | SMO Lead |
| NET-R05 | Network security baseline misaligned with Cybersecurity Framework initiative | Technical | Medium | Medium | 🟡 Medium | Joint design session with Cybersecurity team this week | Cyber Lead |`,
  },

  12: {
    "Weekly Status Report":`## RAG Summary — Treasury Management System
| Dimension | Status | Commentary |
|-----------|--------|------------|
| Schedule | 🟡 Amber | Vendor contracted — implementation start delayed 2 weeks pending legal sign-off |
| Budget | 🟢 Green | ₹3Cr of ₹12Cr — within plan |
| Scope | 🟢 Green | Scope confirmed — cash, payments, FX, bank connectivity |
| Resources | 🟢 Green | Treasury team engaged and available |

## Progress This Week
- Kyriba selected as Treasury Management platform — contract in legal review
- Bank API connectivity confirmed with HDFC (primary) and SBI (secondary)
- Global Corp treasury KT schedule agreed — 8 sessions over 6 weeks
- FX exposure baseline documented — ₹450Cr annual FX exposure
- Payment approval workflow design completed

## Active Risks & Issues
- **HIGH:** Kyriba contract delay may push implementation start 2 further weeks
- **MEDIUM:** RBI payment regulation compliance verification pending

## Next: Contract sign-off 20 Jun | Implementation kick-off 1 Jul FY26`,
  },

  18: {
    "Weekly Status Report":`## RAG Summary — Identity & Access Management
| Dimension | Status | Commentary |
|-----------|--------|------------|
| Schedule | 🟡 Amber | Azure AD live — user migration 2 weeks behind plan |
| Budget | 🟢 Green | ₹4Cr of ₹12Cr — on plan |
| Scope | 🟢 Green | Scope confirmed |
| Resources | 🟢 Green | Full team including IAM architect in place |

## Progress This Week
- Azure AD tenant provisioned and baseline configuration complete
- SSO configured for 4 pilot applications — testing in progress
- MFA rollout to IT admin group (45 users) — 100% adoption
- PAM solution shortlisted to 2 vendors — evaluation this week
- 340 service accounts identified for migration — effort being replanned

## Active Risks & Issues
- **HIGH:** Pilot SSO integration with legacy Global Corp SAP — SAML federation issues being investigated
- **MEDIUM:** 340 service accounts migration underestimated in original plan

## Next: Pilot user migration 200 users — 30 Jun FY26`,
  },

  20: {
    "Risk Register":`| Risk ID | Description | Category | Probability | Impact | Rating | Mitigation | Owner |
|---------|-------------|----------|-------------|--------|--------|------------|-------|
| CYB-R01 | ClientCo loses Global Corp SOC coverage before standalone SOC is live | Security | Medium | Critical | 🔴 Critical | Negotiate interim SOC bridge service from Global Corp until Q2 FY27 | CISO |
| CYB-R02 | India-qualified SOC analyst talent scarce — recruitment at risk | Resource | High | High | 🔴 Critical | Engage MSSP for interim SOC ops, parallel permanent recruitment | HR Lead |
| CYB-R03 | SIEM log source onboarding across 25 systems — complexity underestimated | Technical | Medium | High | 🟡 High | Phased SIEM rollout, prioritise critical systems first | Cyber Architect |
| CYB-R04 | DPDP Act (India) compliance requirements not fully mapped to security controls | Compliance | High | Medium | 🟡 High | Engage privacy counsel, update security policy framework | Legal Lead |
| CYB-R05 | Endpoint security coverage gap during Global Corp MDM → standalone transition | Security | Medium | High | 🟡 High | Maintain Global Corp MDM bridge until standalone Tanium deployed | IT Ops Lead |`,
  },
};



// ─── HELPERS ────────────────────────────────
const RAG_S={Green:{bg:"#DCFCE7",txt:"#166534",dot:"#16A34A"},Amber:{bg:"#FEF9C3",txt:"#854D0E",dot:"#CA8A04"},Red:{bg:"#FEE2E2",txt:"#991B1B",dot:"#DC2626"}};
const PRI_S={Critical:{bg:"#FEE2E2",txt:"#991B1B"},High:{bg:"#FEF3C7",txt:"#854D0E"},Medium:{bg:"#DBEAFE",txt:"#1E40AF"},Low:{bg:"#F3F4F6",txt:"#4B5563"}};
const INP={border:"1px solid #D1D5DB",borderRadius:7,padding:"8px 12px",fontSize:13,color:"#1F2937",background:"white",outline:"none",width:"100%",boxSizing:"border-box"};
function RAGBadge({rag}){const s=RAG_S[rag]||{bg:"#F3F4F6",txt:"#374151",dot:"#9CA3AF"};return<span style={{background:s.bg,color:s.txt,padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,display:"inline-flex",alignItems:"center",gap:4}}><span style={{width:6,height:6,borderRadius:"50%",background:s.dot,flexShrink:0}}/>{rag}</span>;}
function PriBadge({p}){const s=PRI_S[p]||{bg:"#F3F4F6",txt:"#374151"};return<span style={{background:s.bg,color:s.txt,padding:"2px 8px",borderRadius:10,fontSize:11,fontWeight:600}}>{p}</span>;}
function Bar({v,color="#83BD41"}){return<div style={{background:"#E5E7EB",borderRadius:4,height:6,overflow:"hidden"}}><div style={{width:`${Math.min(v,100)}%`,background:color,height:"100%",borderRadius:4}}/></div>;}
function tsaReadiness(i){if(!i.tsa)return null;if(i.wave===1){if(i.prog<20)return"Critical";if(i.prog<40)return"At Risk";return"On Track";}if(i.wave===2){if(i.prog<10)return"At Risk";return"On Track";}return"On Track";}
const READY_S={Critical:{bg:"#FEE2E2",txt:"#991B1B"},"At Risk":{bg:"#FEF9C3",txt:"#854D0E"},"On Track":{bg:"#DCFCE7",txt:"#166534"}};
function rInline(t){if(!t)return t;const p=t.split(/\*\*(.*?)\*\*/g);if(p.length===1)return t;return p.map((x,i)=>i%2===1?<strong key={i}>{x}</strong>:x);}
function MD({text}){
  if(!text)return null;
  const lines=text.split("\n");const out=[];let i=0;
  while(i<lines.length){const l=lines[i];
    if(l.startsWith("|")){const rows=[];while(i<lines.length&&lines[i].startsWith("|")){if(!/^\|[\s\-:|]+\|/.test(lines[i]))rows.push(lines[i]);i++;}
      out.push(<div key={"t"+i} style={{overflowX:"auto",margin:"10px 0"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}><tbody>
        {rows.map((row,ri)=>{const cells=row.split("|").filter(c=>c!=="").map(c=>c.trim());return<tr key={ri} style={{background:ri===0?"#EEF3FB":ri%2===0?"#F8FAFC":"white",borderBottom:"1px solid #E5E7EB"}}>{cells.map((cell,ci)=>ri===0?<th key={ci} style={{padding:"7px 10px",textAlign:"left",color:"#00338D",fontWeight:700,fontSize:12}}>{cell}</th>:<td key={ci} style={{padding:"6px 10px",color:"#374151",fontSize:12,verticalAlign:"top"}}>{cell}</td>)}</tr>;})}
      </tbody></table></div>);continue;}
    if(l.startsWith("# "))out.push(<h1 key={i} style={{color:"#00338D",fontSize:17,fontWeight:800,margin:"0 0 12px"}}>{l.slice(2)}</h1>);
    else if(l.startsWith("## "))out.push(<h2 key={i} style={{color:"#00338D",fontSize:14,fontWeight:700,margin:"16px 0 6px",borderBottom:"2px solid #E0EAFB",paddingBottom:3}}>{l.slice(3)}</h2>);
    else if(l.startsWith("### "))out.push(<h3 key={i} style={{color:"#1E40AF",fontSize:13,fontWeight:700,margin:"12px 0 4px"}}>{l.slice(4)}</h3>);
    else if(l.startsWith("- ")||l.startsWith("* "))out.push(<li key={i} style={{marginLeft:18,marginBottom:3,color:"#374151",fontSize:13,lineHeight:1.6,listStyleType:"disc",textAlign:"left"}}>{rInline(l.slice(2))}</li>);
    else if(/^\d+\. /.test(l))out.push(<li key={i} style={{marginLeft:18,marginBottom:3,color:"#374151",fontSize:13,lineHeight:1.6,listStyleType:"decimal",textAlign:"left"}}>{rInline(l.replace(/^\d+\. /,""))}</li>);
    else if(l.trim()==="")out.push(<div key={i} style={{height:6}}/>);
    else out.push(<p key={i} style={{color:"#374151",fontSize:13,lineHeight:1.65,margin:"0 0 4px",textAlign:"left"}}>{rInline(l)}</p>);
    i++;}
  return<div>{out}</div>;}

// ─── COMPUTED METRICS ────────────────────────
function computeMetrics(inits){
  const totalProg=inits.length?Math.round(inits.reduce((s,i)=>s+i.prog,0)/inits.length):0;
  const red=inits.filter(i=>i.rag==="Red");
  const amber=inits.filter(i=>i.rag==="Amber");
  const earlyTsa=inits.filter(i=>i.tsa);
  const criticalTsa=earlyTsa.filter(i=>tsaReadiness(i)==="Critical");
  const wave1Behind=inits.filter(i=>i.wave===1&&i.prog<25);
  const totalBp=inits.reduce((s,i)=>s+i.bp,0);
  const totalBs=inits.reduce((s,i)=>s+i.bs,0);
  const budgetGap=totalBp>0?Math.round(Math.abs(totalBs/totalBp*100-totalProg)/10):0;
  const rawScore=(red.length*8)+(amber.length*2)+(criticalTsa.length*8)+(wave1Behind.length*5)+budgetGap;
  const aiScore=Math.min(Math.round(rawScore),100);
  const tsaExpiring=earlyTsa.filter(i=>["Q3 FY27","Q4 FY27","Q1 FY28"].includes(i.tsaQ)).length;
  const topRisks=[
    ...red.map(i=>({txt:`${i.name} — ${i.rag} RAG on critical path`,sev:"Critical"})),
    ...criticalTsa.map(i=>({txt:`${i.name} — TSA exit ${i.tsaQ} at risk`,sev:"High"})),
    ...wave1Behind.filter(i=>i.rag!=="Red").slice(0,2).map(i=>({txt:`${i.name} — Wave 1 behind plan`,sev:"Medium"})),
  ].slice(0,5);
  const catProgress={};Object.keys(CATS).forEach(cat=>{const ci=inits.filter(i=>i.cat===cat);catProgress[cat]=ci.length?Math.round(ci.reduce((s,i)=>s+i.prog,0)/ci.length):0;});
  const tsBuckets={"<6M":[],"6-12M":[],"12-24M":[],"24-36M":[],">36M":[]};
  earlyTsa.forEach(i=>{const q=i.tsaQ;if(["Q3 FY27","Q4 FY27"].includes(q))tsBuckets["<6M"].push(i);else if(q==="Q1 FY28")tsBuckets["6-12M"].push(i);else if(["Q2 FY28","Q3 FY28"].includes(q))tsBuckets["12-24M"].push(i);else if(q==="Q2 FY28")tsBuckets["24-36M"].push(i);else tsBuckets[">36M"].push(i);});
  return{totalProg,red,amber,earlyTsa,criticalTsa,wave1Behind,totalBp,totalBs,budgetGap,aiScore,tsaExpiring,topRisks,catProgress,tsBuckets};
}

// ─── AI HELPERS ──────────────────────────────
function buildCtx(program){
  const inits=program?.initiatives||INITIATIVES;
  const m=computeMetrics(inits);
  return `IT Separation SMO — ${program?.clientName||"ClientCo"} separating from ${program?.parentName||"Global Corp"} (${program?.industry||"Consumer Markets"}).
Programme: ${program?.programName||"IT Separation Program"} | Target: ${program?.separationDate||"Q3 FY28"}
Total initiatives: ${inits.length} | Progress: ${m.totalProg}% | Budget: Rs${m.totalBp}Cr planned / Rs${m.totalBs}Cr spent
Red: ${m.red.map(i=>i.name).join(", ")||"None"} | Amber: ${m.amber.map(i=>i.name).join(", ")||"None"}
Early TSA exits: ${m.earlyTsa.length} | Critical TSA readiness: ${m.criticalTsa.length} | AI Risk Score: ${m.aiScore}/100
Answer concisely and specifically to this programme context.`;}

function buildInitCtx(init,program){
  return `IT Separation SMO — ${program?.clientName||"ClientCo"} from ${program?.parentName||"Global Corp"}.
Initiative: ${init.name} | Category: ${init.cat} | Wave: ${init.wave} | Priority: ${init.pri}
RAG: ${init.rag} | Progress: ${init.prog}% | Go-Live: ${init.goLive} | Budget: Rs${init.bp}Cr / Rs${init.bs}Cr spent
${init.tsa?`EARLY TSA EXIT [B]: Global Corp exits "${init.tsaSvc}" at ${init.tsaQ}.`:"Standard 3-year Global Corp TSA."}
${init.td?"TECHNICAL DEPENDENCY [A]: Prerequisite for other workstreams.":""}
${init.desc}`;}

function buildArtifactPrompt(init,artifact,program){
  return `You are a senior KPMG consultant. Generate a high-quality ${artifact.name} for this IT separation initiative.
${buildInitCtx(init,program)}
Artifact type: ${artifact.name} | Phase: ${artifact.desc}
Format in Markdown. Be specific to this initiative and the separation context. Use tables where appropriate. Aim for consulting quality — not generic.`;}

const PROG_QUERIES=["Which Wave 1 initiatives are most at risk of missing TSA deadlines?","What are the top 3 cross-programme dependency risks right now?","Summarise programme health for this week's SteerCo","Which initiatives could turn Red in the next 30 days?","What decisions require SteerCo approval this month?","Are we on track for Day 1 operational independence?"];
const INIT_QUERIES=["What are the critical risks for this initiative right now?","Is the TSA exit target achievable given current progress?","Draft a 3-line status update for the PMO weekly review","What dependencies could block this initiative?","What decisions need SteerCo approval in the next 30 days?"];

// ─── CHAT PANEL ──────────────────────────────
function ChatPanel({onClose,initiative,role,program,minimal}){
  const [msgs,setMsgs]=useState([]);const [input,setInput]=useState("");const [loading,setLoading]=useState(false);
  const bottomRef=useRef(null);
  const queries=initiative?INIT_QUERIES:PROG_QUERIES;
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  const send=async(text)=>{
    const q=text||input.trim();if(!q)return;setInput("");
    const nm=[...msgs,{role:"user",content:q}];setMsgs(nm);setLoading(true);
    try{const sys=initiative?buildInitCtx(initiative,program):buildCtx(program);
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system:sys,messages:nm.map(m=>({role:m.role,content:m.content}))})});
      const d=await res.json();const reply=d.content?.map(b=>b.text||"").join("")||"No response — check API key.";
      setMsgs([...nm,{role:"assistant",content:reply}]);
    }catch{setMsgs([...nm,{role:"assistant",content:"Connection error. Please check your API key in Vercel settings."}]);}
    setLoading(false);};
  const style=minimal?{width:"100%",height:"100%",display:"flex",flexDirection:"column",background:"white"}:{position:"fixed",bottom:80,right:16,width:360,maxHeight:"70vh",background:"white",borderRadius:12,boxShadow:"0 8px 40px rgba(0,0,60,0.22)",display:"flex",flexDirection:"column",zIndex:500,border:"1px solid #E5E7EB"};
  return<div style={style}>
    {!minimal&&<div style={{background:"#00338D",borderRadius:"12px 12px 0 0",padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div><p style={{color:"white",fontWeight:700,fontSize:13}}>⚡ AI Assistant</p><p style={{color:"#93C5FD",fontSize:10}}>{initiative?initiative.name:"Portfolio Level"} · {role}</p></div>
      <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",color:"white",width:26,height:26,borderRadius:"50%",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
    </div>}
    <div style={{flex:1,overflowY:"auto",padding:12,display:"flex",flexDirection:"column",gap:8}}>
      {msgs.length===0&&<div><p style={{fontSize:11,color:"#9CA3AF",marginBottom:8,textAlign:"center"}}>Suggested queries</p>{queries.map((q,idx)=><button key={idx} onClick={()=>send(q)} style={{width:"100%",textAlign:"left",background:"#F4F7FB",border:"1px solid #E5E7EB",borderRadius:7,padding:"7px 10px",fontSize:11,color:"#374151",cursor:"pointer",marginBottom:5,lineHeight:1.4}}>{q}</button>)}</div>}
      {msgs.map((m,idx)=><div key={idx} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}><div style={{maxWidth:"85%",background:m.role==="user"?"#00338D":"#F4F7FB",color:m.role==="user"?"white":"#1F2937",borderRadius:m.role==="user"?"10px 10px 2px 10px":"10px 10px 10px 2px",padding:"8px 11px",fontSize:12,lineHeight:1.55}}>{m.role==="assistant"?<MD text={m.content}/>:m.content}</div></div>)}
      {loading&&<div style={{display:"flex",gap:4,padding:"8px 11px"}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:"#CBD5E1",animation:`bounce 1s ${i*0.15}s infinite`}}/>)}<style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style></div>}
      <div ref={bottomRef}/>
    </div>
    <div style={{padding:"8px 10px",borderTop:"1px solid #E5E7EB",display:"flex",gap:6}}>
      <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} placeholder="Ask anything about the programme…" style={{...INP,flex:1,padding:"7px 10px"}}/>
      <button onClick={()=>send()} disabled={!input.trim()||loading} style={{background:"#00338D",color:"white",border:"none",padding:"7px 12px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:700,opacity:!input.trim()||loading?0.5:1}}>↑</button>
    </div>
  </div>;}

// ─── AI CO-PILOT BAR ─────────────────────────
function AICoPilotBar({program,role,initiative}){
  const [open,setOpen]=useState(false);
  return<><div style={{position:"fixed",bottom:0,left:220,right:0,background:"white",borderTop:"1px solid #E5E7EB",padding:"8px 16px",display:"flex",alignItems:"center",gap:10,zIndex:300,boxShadow:"0 -2px 8px rgba(0,0,0,0.06)"}}>
    <span style={{fontSize:16}}>🤖</span>
    <span style={{fontSize:12,color:"#6B7280",flex:1}}>AI Co-Pilot — Ask questions in natural language. Example: "Show me all initiatives with TSA expiring in 6 months and Red status"</span>
    <button onClick={()=>setOpen(!open)} style={{background:"#00338D",color:"white",border:"none",padding:"6px 16px",borderRadius:20,fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}><span>⚡</span>{open?"Close":"Ask AI"}</button>
  </div>
  {open&&<div style={{position:"fixed",bottom:52,right:16,zIndex:400,width:360}}><ChatPanel role={role} program={program} initiative={initiative} onClose={()=>setOpen(false)}/></div>}
  </>;}



// ─── ARTIFACT MODAL WITH EDIT ────────────────
function ArtifactModal({initiative,phase,artifact,onClose,program,preContent}){
  const lsKey=`smo_art_${initiative.id}_${artifact.name.replace(/\s+/g,"_")}`;
  const saved=()=>{try{const v=localStorage.getItem(lsKey);return v?JSON.parse(v):null;}catch{return null;}};
  const initSaved=saved();
  const [mode,setMode]=useState(initSaved?"saved":preContent?"draft":"idle");
  const [content,setContent]=useState(initSaved?.content||preContent||"");
  const [editText,setEditText]=useState("");
  const [loading,setLoading]=useState(false);
  const [savedAt,setSavedAt]=useState(initSaved?.ts||"");
  const [userPrompt,setUserPrompt]=useState("");
  const [showHistory,setShowHistory]=useState(false);
  const [showCriticalPath,setShowCriticalPath]=useState(false);
  const getHistory=()=>{try{const h=localStorage.getItem(lsKey+"_hist");return h?JSON.parse(h):[]}catch{return[];}};
  const isProjectPlan=artifact.name==="Detailed Project Plan";

  // Critical path data — tasks with no slack (dependent chain to go-live)
  const criticalPathTasks=[
    {phase:"Phase 1",num:"1.4",task:"Infosys selected — SteerCo approved",owner:"CIO",end:"Q3 FY27",status:"Done",blocker:false,reason:"Gates contract negotiation"},
    {phase:"Phase 1",num:"1.5",task:"Contract negotiation",owner:"Legal and PMO",end:"Q3 FY27",status:"In Progress",blocker:true,reason:"CFO signature overdue — delays kick-off by 1 week per day"},
    {phase:"Phase 2",num:"2.1",task:"Infosys onboarding and team mobilisation",owner:"PMO",end:"Q4 FY27",status:"Upcoming",blocker:false,reason:"Gates all Phase 2 activities"},
    {phase:"Phase 2",num:"2.4",task:"Global Corp KT sessions (10 sessions)",owner:"Tech Lead",end:"Q1 FY28",status:"Upcoming",blocker:false,reason:"Must complete before blueprint sign-off"},
    {phase:"Phase 3",num:"3.7",task:"Blueprint sign-off — all modules",owner:"All Business Owners",end:"Q2 FY28",status:"Upcoming",blocker:false,reason:"Hard gate — no build starts without this"},
    {phase:"Phase 4",num:"4.1",task:"FI/CO build and unit test",owner:"Infosys Finance team",end:"Q4 FY28",status:"Upcoming",blocker:false,reason:"Longest build track — drives overall schedule"},
    {phase:"Phase 4",num:"4.7",task:"System integration testing (SIT)",owner:"Infosys and QA",end:"Q4 FY28",status:"Upcoming",blocker:false,reason:"Cannot start until all module builds complete"},
    {phase:"Phase 5",num:"5.5",task:"UAT sign-off",owner:"CFO and Supply Chain Head",end:"Q2 FY29",status:"Upcoming",blocker:false,reason:"Business sign-off required before cutover"},
    {phase:"Phase 6",num:"6.2",task:"Cutover execution",owner:"All",end:"Q3 FY29",status:"Upcoming",blocker:false,reason:"Final critical path task before go-live"},
    {phase:"Phase 6",num:"6.3",task:"Go-Live Q3 FY29",owner:"CIO Decision",end:"Q3 FY29",status:"Upcoming",blocker:false,reason:"Programme target — full TSA independence"},
  ];

  const save=()=>{const ts=new Date().toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"});try{const hist=getHistory();if(content)hist.unshift({content,ts:savedAt||"Previous"});localStorage.setItem(lsKey+"_hist",JSON.stringify(hist.slice(0,3)));localStorage.setItem(lsKey,JSON.stringify({content:editText,ts}));}catch{}setContent(editText);setSavedAt(ts);setMode("saved");};
  const startEdit=()=>{setEditText(content);setMode("editing");};
  const gen=async()=>{setLoading(true);try{const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,messages:[{role:"user",content:buildArtifactPrompt(initiative,artifact,program)+(userPrompt?("\n\nAdditional direction: "+userPrompt):"")}]})});const d=await res.json();const txt=d.content?.map(b=>b.text||"").join("")||"";setContent(txt);setMode("draft");}catch{setMode("idle");}setLoading(false);};

  const Badge=()=>{
    if(mode==="saved")return<span style={{background:"#DBEAFE",color:"#1E40AF",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:8}}>💾 Saved {savedAt?"· "+savedAt:""}</span>;
    if(mode==="editing")return<span style={{background:"#FEF9C3",color:"#854D0E",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:8}}>✏️ Editing</span>;
    if(mode==="draft")return<span style={{background:"#D1FAE5",color:"#065F46",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:8}}>📄 Draft Ready</span>;
    return null;};

  return<div style={{position:"fixed",inset:0,background:"rgba(0,20,60,0.6)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div style={{background:"white",borderRadius:12,width:"100%",maxWidth:860,maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 24px 64px rgba(0,0,60,0.3)"}}>
      <div style={{padding:"14px 20px",background:"#00338D",borderRadius:"12px 12px 0 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{marginBottom:4}}><Badge/></div>
          <p style={{color:"#93C5FD",fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5,marginBottom:2}}>{phase.emoji} {phase.name} · {initiative.name}</p>
          <h2 style={{color:"white",fontSize:15,fontWeight:700}}>{artifact.name}</h2></div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {isProjectPlan&&(mode==="draft"||mode==="saved")&&<button onClick={()=>setShowCriticalPath(!showCriticalPath)} style={{background:showCriticalPath?"#DC2626":"rgba(220,38,38,0.15)",border:"1px solid rgba(220,38,38,0.4)",color:showCriticalPath?"white":"#FCA5A5",padding:"5px 12px",borderRadius:6,fontSize:12,cursor:"pointer",fontWeight:700}}>🔴 Critical Path</button>}
          {(mode==="draft"||mode==="saved")&&<button onClick={startEdit} style={{background:"rgba(255,255,255,0.15)",border:"none",color:"white",padding:"5px 12px",borderRadius:6,fontSize:12,cursor:"pointer",fontWeight:600}}>✏️ Edit</button>}
          {mode==="editing"&&<><button onClick={save} style={{background:"#83BD41",color:"#00338D",border:"none",padding:"5px 14px",borderRadius:6,fontSize:12,cursor:"pointer",fontWeight:700}}>💾 Save</button><button onClick={()=>setMode(content?"draft":"idle")} style={{background:"rgba(255,255,255,0.15)",border:"none",color:"white",padding:"5px 12px",borderRadius:6,fontSize:12,cursor:"pointer"}}>Cancel</button></>}
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",color:"white",width:28,height:28,borderRadius:"50%",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:24}}>
        {mode==="idle"&&<div style={{padding:"32px 24px"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <div style={{width:44,height:44,background:"#EEF3FB",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>⚡</div>
            <div><h3 style={{color:"#00338D",fontSize:14,fontWeight:700,marginBottom:2}}>{artifact.name}</h3><p style={{color:"#6B7280",fontSize:12}}>{artifact.desc}</p></div>
          </div>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:6}}>Add direction for AI (optional)</label>
            <textarea value={userPrompt} onChange={e=>setUserPrompt(e.target.value)} placeholder={`e.g. "Focus on India GST compliance" or "Draft for a CFO audience" or "Emphasise data migration risks"`} style={{width:"100%",height:80,padding:"10px 12px",border:"1px solid #E5E7EB",borderRadius:8,fontSize:12,color:"#1F2937",resize:"vertical",outline:"none",fontFamily:"Arial,sans-serif",lineHeight:1.5,boxSizing:"border-box"}}/>
          </div>
          <button onClick={gen} style={{background:"#00338D",color:"white",border:"none",padding:"11px 28px",borderRadius:8,fontWeight:700,fontSize:14,cursor:"pointer",width:"100%"}}>⚡ Generate with AI</button>
          <p style={{fontSize:11,color:"#9CA3AF",textAlign:"center",marginTop:10}}>AI will use the programme context and your direction to generate consulting-quality content</p>
        </div>}
        {loading&&<div style={{textAlign:"center",padding:"52px 20px"}}><div style={{fontSize:36,display:"inline-block",animation:"spin 1s linear infinite",marginBottom:12}}>◌</div><p style={{color:"#6B7280"}}>Generating…</p><style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style></div>}
        {mode==="editing"&&<textarea value={editText} onChange={e=>setEditText(e.target.value)} style={{width:"100%",height:480,padding:16,border:"2px solid #00338D",borderRadius:8,fontSize:13,fontFamily:"monospace",lineHeight:1.6,resize:"vertical",color:"#1F2937",outline:"none",boxSizing:"border-box"}}/>}
        {(mode==="draft"||mode==="saved")&&<>
          {/* Critical Path Panel */}
          {showCriticalPath&&<div style={{marginBottom:16,border:"2px solid #DC2626",borderRadius:10,overflow:"hidden"}}>
            <div style={{background:"#DC2626",padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:16}}>🔴</span>
                <div>
                  <p style={{color:"white",fontWeight:800,fontSize:13}}>Critical Path — SAP RISE (Core ERP)</p>
                  <p style={{color:"rgba(255,255,255,0.75)",fontSize:11}}>10 tasks on critical path · 1 active blocker · Go-Live Q3 FY29</p>
                </div>
              </div>
              <div style={{background:"rgba(255,255,255,0.15)",borderRadius:8,padding:"6px 12px",textAlign:"center"}}>
                <p style={{color:"white",fontSize:11,fontWeight:700}}>Total Float</p>
                <p style={{color:"#FCA5A5",fontSize:18,fontWeight:900}}>0 days</p>
              </div>
            </div>
            {/* Blocker callout */}
            <div style={{background:"#FEF2F2",padding:"10px 16px",borderBottom:"1px solid #FCA5A5",display:"flex",alignItems:"flex-start",gap:10}}>
              <span style={{fontSize:18,flexShrink:0}}>⚠️</span>
              <div>
                <p style={{fontSize:12,fontWeight:800,color:"#991B1B",marginBottom:2}}>Active Blocker — Task 1.5: Contract Negotiation</p>
                <p style={{fontSize:11,color:"#B91C1C",lineHeight:1.5}}>CFO signature on Infosys contract overdue. Every day of delay compresses the mobilisation window and pushes project kick-off. Escalation to CIO required today.</p>
              </div>
            </div>
            {/* Critical path task table */}
            <div style={{background:"white"}}>
              <div style={{display:"grid",gridTemplateColumns:"60px 60px 2fr 120px 90px 80px",padding:"7px 16px",background:"#FFF1F2",fontSize:10,fontWeight:700,color:"#991B1B",borderBottom:"1px solid #FCA5A5"}}>
                <span>Phase</span><span>#</span><span>Task</span><span>Owner</span><span>Target</span><span>Status</span>
              </div>
              {criticalPathTasks.map((t,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"60px 60px 2fr 120px 90px 80px",padding:"8px 16px",borderBottom:i<criticalPathTasks.length-1?"1px solid #FEF2F2":"none",alignItems:"start",background:t.blocker?"#FEF2F2":i===criticalPathTasks.length-1?"#F0FDF4":"white"}}>
                  <span style={{fontSize:10,color:"#9CA3AF",fontWeight:600}}>{t.phase.replace("Phase ","P")}</span>
                  <span style={{fontSize:11,fontWeight:800,color:t.blocker?"#DC2626":i===criticalPathTasks.length-1?"#059669":"#00338D"}}>{t.num}</span>
                  <div>
                    <p style={{fontSize:11,fontWeight:700,color:t.blocker?"#991B1B":"#1F2937",textAlign:"left",marginBottom:2}}>{t.task}{t.blocker&&<span style={{marginLeft:6,fontSize:9,background:"#DC2626",color:"white",padding:"1px 5px",borderRadius:4,fontWeight:700}}>BLOCKER</span>}</p>
                    <p style={{fontSize:10,color:"#9CA3AF",textAlign:"left",lineHeight:1.3}}>{t.reason}</p>
                  </div>
                  <span style={{fontSize:10,color:"#374151"}}>{t.owner}</span>
                  <span style={{fontSize:10,fontWeight:700,color:"#374151"}}>{t.end}</span>
                  <span style={{fontSize:10,background:t.status==="Done"?"#D1FAE5":t.status==="In Progress"?"#FEF9C3":t.blocker?"#FEE2E2":"#EEF3FB",color:t.status==="Done"?"#065F46":t.status==="In Progress"?"#92400E":t.blocker?"#991B1B":"#1E40AF",padding:"2px 6px",borderRadius:6,fontWeight:700}}>{t.status}</span>
                </div>
              ))}
            </div>
            <div style={{background:"#FFF7ED",padding:"10px 16px",display:"flex",gap:16,borderTop:"1px solid #FED7AA"}}>
              {[["Total Tasks","57"],["On Critical Path","10"],["Active Blockers","1"],["Float","0 days"],["Go-Live","Q3 FY29"]].map(([l,v])=>(
                <div key={l} style={{textAlign:"center"}}>
                  <p style={{fontSize:9,color:"#9CA3AF",textTransform:"uppercase",fontWeight:700,marginBottom:2}}>{l}</p>
                  <p style={{fontSize:13,fontWeight:800,color:"#92400E"}}>{v}</p>
                </div>))}
            </div>
          </div>}
          <div style={{background:"#F8FAFC",borderRadius:8,padding:"18px 20px",border:"1px solid #E5E7EB"}}><MD text={content}/></div>
          <div style={{marginTop:12,display:"flex",gap:10,justifyContent:"flex-end"}}>
            <button onClick={()=>setShowHistory(!showHistory)} style={{background:"#F4F7FB",border:"1px solid #E5E7EB",padding:"7px 14px",borderRadius:6,cursor:"pointer",fontSize:12,color:"#6B7280"}}>📋 History ({getHistory().length})</button>
            <button onClick={()=>{setContent("");setMode("idle");}} style={{background:"#F3F4F6",border:"none",padding:"7px 14px",borderRadius:6,cursor:"pointer",fontSize:12,color:"#374151"}}>↺ Regenerate</button>
            <button onClick={()=>navigator.clipboard?.writeText(content)} style={{background:"#00338D",color:"white",border:"none",padding:"7px 18px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:700}}>📋 Copy</button>
          </div>
          {showHistory&&getHistory().length>0&&<div style={{marginTop:10,border:"1px solid #E5E7EB",borderRadius:8,overflow:"hidden"}}>
            <p style={{fontSize:11,fontWeight:700,color:"#374151",padding:"8px 12px",background:"#F8FAFC",borderBottom:"1px solid #E5E7EB"}}>Version History (last {getHistory().length})</p>
            {getHistory().map((v,i)=><div key={i} style={{padding:"8px 12px",borderBottom:i<getHistory().length-1?"1px solid #F3F4F6":"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,color:"#6B7280"}}>Version {i+1} · {v.ts}</span>
              <button onClick={()=>{setContent(v.content);setMode("saved");setShowHistory(false);}} style={{background:"#EEF3FB",border:"none",color:"#00338D",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:6,cursor:"pointer"}}>Restore</button>
            </div>)}
          </div>}</>}
      </div>
    </div>
  </div>;}

// ─── PHASE FOLDER ────────────────────────────
function PhaseFolder({phase,initiative,onGenerate,defaultOpen}){
  const [open,setOpen]=useState(defaultOpen??false);
  const getContent=(id,name)=>{try{const v=localStorage.getItem(`smo_art_${id}_${name.replace(/\s+/g,"_")}`);if(v)return JSON.parse(v).content;}catch{}return SAMPLE_CONTENT[id]?.[name]||null;};
  const getMode=(id,name)=>{try{const v=localStorage.getItem(`smo_art_${id}_${name.replace(/\s+/g,"_")}`);if(v)return"saved";}catch{}return SAMPLE_CONTENT[id]?.[name]?"draft":"idle";};
  return<div style={{marginBottom:10,borderRadius:8,overflow:"hidden",border:`1px solid ${phase.border}`}}>
    <button onClick={()=>setOpen(!open)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"11px 14px",background:phase.light,border:"none",cursor:"pointer",textAlign:"left"}}>
      <span>{phase.emoji}</span><span style={{flex:1,fontWeight:700,fontSize:13,color:phase.color}}>{phase.name}</span>
      <span style={{fontSize:11,color:"#6B7280",background:"rgba(255,255,255,0.7)",padding:"2px 9px",borderRadius:10}}>{phase.artifacts.length} artifacts</span>
      <span style={{color:phase.color,fontSize:12,transform:open?"rotate(0)":"rotate(-90deg)",display:"inline-block",transition:"transform 0.2s"}}>▾</span>
    </button>
    {open&&<div style={{background:"white"}}>{phase.artifacts.map((art,idx)=>{
      const mode=getMode(initiative.id,art.name);
      const pre=getContent(initiative.id,art.name);
      const badgeStyle=mode==="saved"?{bg:"#DBEAFE",txt:"#1E40AF",label:"💾 Saved"}:mode==="draft"?{bg:"#D1FAE5",txt:"#065F46",label:"📄 Draft"}:{bg:"#F3F4F6",txt:"#6B7280",label:"⚡ Generate"};
      return<div key={idx} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderTop:`1px solid ${phase.border}`}}>
        <span style={{fontSize:16,flexShrink:0}}>📄</span>
        <div style={{flex:1,minWidth:0}}><p style={{fontWeight:700,fontSize:12,color:"#1F2937",marginBottom:2}}>{art.name}</p><p style={{fontSize:11,color:"#9CA3AF",lineHeight:1.4}}>{art.desc}</p></div>
        <span style={{fontSize:10,background:badgeStyle.bg,color:badgeStyle.txt,padding:"2px 7px",borderRadius:8,whiteSpace:"nowrap",fontWeight:700,flexShrink:0}}>{badgeStyle.label}</span>
        <button onClick={()=>onGenerate(phase,art,pre)} style={{background:mode==="idle"?"#F3F4F6":"#00338D",color:mode==="idle"?"#374151":"white",border:"none",padding:"5px 11px",borderRadius:5,fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{mode==="idle"?"⚡ Generate":"📄 View"}</button>
      </div>;})}
    </div>}
  </div>;}


// ─── DONUT CHART ─────────────────────────────
function Donut({pct,color,size=64,stroke=7}){
  const r=(size-stroke*2)/2;const circ=2*Math.PI*r;const dash=(pct/100)*circ;
  return<svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={stroke}/>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
      strokeDasharray={`${dash} ${circ-dash}`} strokeLinecap="round"/>
  </svg>;}

function MetricRing({label,value,sub,pct,color}){
  return<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
    <div style={{position:"relative",width:68,height:68,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <Donut pct={pct} color={color} size={68} stroke={7}/>
      <div style={{position:"absolute",textAlign:"center"}}>
        <p style={{fontSize:13,fontWeight:900,color:"#1F2937",lineHeight:1}}>{value}</p>
      </div>
    </div>
    <p style={{fontSize:11,fontWeight:700,color:"#374151",textAlign:"center",lineHeight:1.2}}>{label}</p>
    <p style={{fontSize:10,color:"#9CA3AF",textAlign:"center",lineHeight:1.3}}>{sub}</p>
  </div>;}

// ─── INITIATIVE HELPERS ───────────────────────
function getPhaseIdx(prog){
  if(prog<18)return 0;if(prog<34)return 1;if(prog<52)return 2;
  if(prog<72)return 3;if(prog<92)return 4;return 5;}

function getPhaseMilestones(phaseIdx,init){
  const sets=[
    [{l:"BRD drafted and approved by business"},{l:"Vendor landscape assessment completed"},{l:"RFP issued to shortlisted vendors"},{l:"Vendor evaluation and selection completed"},{l:"Contract negotiated and signed"},{l:"Vendor onboarding checklist completed"}],
    [{l:"Project charter approved by CIO"},{l:"Business case signed off by CFO"},{l:"Stakeholder register completed"},{l:"Project kick-off meeting held"},{l:"Governance cadence established"}],
    [{l:"Detailed project plan baselined"},{l:"Risk register completed and reviewed"},{l:"RACI and resource plan agreed"},{l:"Budget and cost plan approved"},{l:"Blueprint and design sign-off received"}],
    [{l:"Development environment provisioned"},{l:"Global Corp KT sessions completed"},{l:"Blueprint sign-off — all modules"},{l:`Build ${init.cat} Module 1 complete`},{l:`Build ${init.cat} Module 2 complete`},{l:"Integration development complete"},{l:"Data migration dry run completed"},{l:"System Integration Testing (SIT) done"}],
    [{l:"UAT preparation and test cases ready"},{l:"UAT Cycle 1 completed"},{l:"UAT defects resolved"},{l:"UAT sign-off received from business"},{l:"Go-live readiness review complete"}],
    [{l:"Cutover execution completed"},{l:"Go-Live achieved"},{l:"Hypercare period complete"},{l:"Formal handover to IT Operations"},{l:"Project closure report issued"}],
  ];
  const ms=sets[phaseIdx]||sets[3];
  const phaseRanges=[[0,18],[18,34],[34,52],[52,72],[72,92],[92,100]];
  const [lo,hi]=phaseRanges[phaseIdx]||[52,72];
  const pctInPhase=Math.max(0,Math.min(100,(init.prog-lo)/(hi-lo)*100));
  const doneCount=Math.floor(pctInPhase/100*ms.length);
  return ms.map((m,i)=>({...m,status:i<doneCount?"done":i===doneCount?"active":"upcoming"}));}

function computeHealth(init){
  const base=init.rag==="Green"?82:init.rag==="Amber"?66:46;
  const tsaPenalty=init.tsa&&tsaReadiness(init)==="Critical"?-8:init.tsa&&tsaReadiness(init)==="At Risk"?-4:0;
  return Math.max(30,Math.min(95,base+tsaPenalty));}

function getAIInsights(init){
  const out=[];
  if(init.rag==="Red")out.push({icon:"🔴",c:"#DC2626",bg:"#FEF2F2",label:"Critical Schedule Risk",body:`${init.name} is off track. Immediate recovery plan required — current trajectory puts ${init.tsa?init.tsaQ+" TSA exit":init.goLive+" go-live"} at risk.`,action:"Create Recovery Plan"});
  else if(init.rag==="Amber")out.push({icon:"🟡",c:"#D97706",bg:"#FFFBEB",label:"Schedule Risk Identified",body:`Progress at ${init.prog}% with milestones requiring attention. Resource reallocation recommended to protect ${init.tsa?init.tsaQ+" exit":init.goLive+" go-live"}.`,action:"View Recommendation"});
  if(init.bs/init.bp>0.5&&init.prog<40)out.push({icon:"⚠️",c:"#D97706",bg:"#FFFBEB",label:"Budget Alert",body:`Spend at ${Math.round(init.bs/init.bp*100)}% of budget vs ${init.prog}% programme progress. Forecast indicates potential overrun if current burn rate continues.`,action:"View Budget Forecast"});
  else out.push({icon:"💰",c:"#059669",bg:"#F0FDF4",label:"Budget On Track",body:`₹${init.bs}Cr spent of ₹${init.bp}Cr budget. Utilisation aligned to programme stage. No overrun risk at this time.`,action:"View Budget Detail"});
  if(init.tsa&&tsaReadiness(init)==="Critical")out.push({icon:"⏰",c:"#991B1B",bg:"#FEF2F2",label:"TSA Exit Urgent",body:`Global Corp exits "${init.tsaSvc}" at ${init.tsaQ}. Current readiness is Critical. Escalation to SteerCo required.`,action:"Escalate Now"});
  else if(init.td)out.push({icon:"⛓",c:"#7C3AED",bg:"#F5F3FF",label:"Dependency Alert",body:`This initiative is a technical prerequisite [A] for downstream workstreams. Any delay has cascading programme impact.`,action:"View Dependency Map"});
  else out.push({icon:"🟢",c:"#059669",bg:"#F0FDF4",label:"Quality Outlook",body:`No critical blockers identified. Maintain current delivery pace and weekly SMO check-ins to protect the ${init.goLive} go-live target.`,action:"View Quality Plan"});
  out.push({icon:"⚡",c:"#00338D",bg:"#EFF6FF",label:"Next Best Action",body:init.prog<20?`Finalise vendor selection and contract within 2 weeks to maintain ${init.goLive} go-live trajectory.`:init.prog<50?`Complete blueprint sign-off across all modules before build commences. Block any scope changes.`:`Parallel-stream testing activities with build completion to compress the schedule by 2–3 weeks.`,action:"Create Action"});
  return out.slice(0,4);}

const PHASE_META=[
  {short:"Pre-Initiation",sub:"Vendor / Product Evaluation",color:"#0F766E"},
  {short:"Initiation",sub:"Project Charter & Planning",color:"#7C3AED"},
  {short:"Planning & Design",sub:"Detailed Planning & Design",color:"#0284C7"},
  {short:"Execution",sub:"Build, Test & Transition",color:"#D97706"},
  {short:"Stabilisation",sub:"Stabilise & Optimise",color:"#059669"},
  {short:"Closure",sub:"Handover & Closure",color:"#4B5563"},
];

// ─── INITIATIVE DETAIL ───────────────────────
function InitiativeDetail({initiative:init,onBack,role,program}){
  const [view,setView]=useState("dashboard");
  const [modal,setModal]=useState(null);
  const [chatQ,setChatQ]=useState("");
  const [aiNarrative,setAiNarrative]=useState("");const [aiLoading,setAiLoading]=useState(false);
  const catInfo=CATS[init.cat]||{color:"#00338D",light:"#EEF3FB"};
  const cc=catInfo.color;
  const phaseIdx=getPhaseIdx(init.prog);
  const milestones=getPhaseMilestones(phaseIdx,init);
  const doneMs=milestones.filter(m=>m.status==="done").length;
  const health=computeHealth(init);
  const healthLabel=health>=75?"Good":health>=55?"Fair":"At Risk";
  const healthColor=health>=75?"#059669":health>=55?"#D97706":"#DC2626";
  const budgetPct=init.bp>0?Math.round(init.bs/init.bp*100):0;
  const budgetForecast=Math.round(init.bp*(init.rag==="Red"?1.12:init.rag==="Amber"?1.06:1.0));
  const aiInsights=getAIInsights(init);
  const ready=tsaReadiness(init);
  const QUICK=["What are the risks to timeline?","Show budget forecast","Which milestones are critical?","What is the overall health summary?"];

  const getAI=async()=>{setAiLoading(true);try{
    const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:400,messages:[{role:"user",content:`IT Separation SMO. Initiative: ${init.name}, Category: ${init.cat}, Wave: ${init.wave}, RAG: ${init.rag}, Progress: ${init.prog}%, Go-Live: ${init.goLive}, Budget: Rs${init.bp}Cr / Rs${init.bs}Cr spent.${init.tsa?` TSA exit ${init.tsaQ}.`:""} In 2-3 sentences: assess health, name the biggest risk, give one recommendation.`}]})});
    const d=await res.json();setAiNarrative(d.content?.map(b=>b.text||"").join("")||"");}
  catch{setAiNarrative("Unable to connect. Check API key.");}setAiLoading(false);};

  // ── ARTIFACT REPOSITORY VIEW ──────────────
  if(view==="artifacts")return(
    <div style={{minHeight:"100%",background:"#F4F7FB"}}>
      <div style={{background:"white",borderBottom:"1px solid #E5E7EB",padding:"10px 20px",display:"flex",alignItems:"center",gap:8}}>
        <button onClick={()=>setView("dashboard")} style={{color:"#00338D",background:"none",border:"none",cursor:"pointer",fontWeight:700,fontSize:13}}>← Dashboard</button>
        <span style={{color:"#D1D5DB"}}>/</span>
        <span style={{color:"#374151",fontWeight:500}}>{init.name}</span>
        <span style={{color:"#D1D5DB"}}>/</span>
        <span style={{color:"#374151",fontWeight:500}}>📁 Project Artifacts</span>
      </div>
      <div style={{padding:16}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div><h2 style={{fontSize:15,fontWeight:800,color:"#00338D",marginBottom:2}}>📁 Project Artifacts — All 6 Phases</h2>
            <p style={{fontSize:12,color:"#9CA3AF"}}>Click View to open pre-loaded drafts · Click Generate to create with AI</p></div>
        </div>
        {PHASES.map((phase,idx)=><PhaseFolder key={phase.id} phase={phase} initiative={init} onGenerate={(p,a,pre)=>setModal({phase:p,artifact:a,pre})} defaultOpen={idx===phaseIdx}/>)}
      </div>
      {modal&&<ArtifactModal initiative={init} phase={modal.phase} artifact={modal.artifact} preContent={modal.pre} onClose={()=>setModal(null)} program={program}/>}
    </div>);

  // ── DASHBOARD VIEW ────────────────────────
  return<div style={{minHeight:"100%",background:"#F4F7FB",fontFamily:"Arial,sans-serif"}}>

    {/* TOPBAR */}
    <div style={{background:"white",borderBottom:"1px solid #E5E7EB",padding:"0 20px"}}>
      <div style={{padding:"6px 0 0",display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#9CA3AF"}}>
        <button onClick={onBack} style={{color:"#00338D",background:"none",border:"none",cursor:"pointer",fontWeight:600,fontSize:11,padding:0}}>Projects</button>
        <span>›</span><span style={{color:"#374151",fontWeight:600}}>{init.name}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0"}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
            <h1 style={{fontSize:18,fontWeight:800,color:"#00338D"}}>{init.name}</h1>
            <span style={{background:"#DBEAFE",color:"#1D4ED8",fontSize:11,fontWeight:700,padding:"3px 12px",borderRadius:20}}>In Progress</span>
            <RAGBadge rag={init.rag}/>
            {init.tsa&&<span style={{background:"#FEF9C3",color:"#92400E",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20}}>⚠ Early TSA Exit</span>}
          </div>
          <p style={{fontSize:11,color:"#9CA3AF"}}>
            Category: <strong style={{color:"#374151"}}>{init.cat}</strong> &nbsp;|&nbsp;
            Wave: <strong style={{color:"#374151"}}>Wave {init.wave}</strong> &nbsp;|&nbsp;
            Priority: <strong style={{color:"#374151"}}>{init.pri}</strong> &nbsp;|&nbsp;
            Go-Live: <strong style={{color:"#374151"}}>{init.goLive}</strong> &nbsp;|&nbsp;
            Budget: <strong style={{color:"#374151"}}>₹{init.bp}Cr</strong>
          </p>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>setView("artifacts")} style={{background:"#F4F7FB",color:"#00338D",border:"1px solid #E5E7EB",padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>📁 View Artifacts</button>
          <button style={{background:"#00338D",color:"white",border:"none",padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>⬇ Download Report</button>
        </div>
      </div>
    </div>

    <div style={{padding:"14px 20px"}}>

      {/* PHASE STEPPER */}
      <div style={{background:"white",borderRadius:12,padding:"18px 22px",boxShadow:"0 1px 6px rgba(0,0,60,0.07)",marginBottom:12}}>
        <p style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:14}}>Project Lifecycle <span style={{color:"#9CA3AF",fontWeight:400}}>(6 Phases)</span></p>
        <div style={{display:"flex",alignItems:"flex-start"}}>
          {PHASE_META.map((ph,idx)=>{
            const done=idx<phaseIdx;const cur=idx===phaseIdx;const last=idx===5;
            const phaseRanges=[[0,18],[18,34],[34,52],[52,72],[72,92],[92,100]];
            const [lo,hi]=phaseRanges[idx];
            const compDate=done?`Completed`:``;
            return<div key={idx} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}>
              {!last&&<div style={{position:"absolute",top:18,left:"50%",width:"100%",height:2,background:done?"#83BD41":cur?`linear-gradient(90deg,#83BD41 50%,#E5E7EB 50%)`:"#E5E7EB",zIndex:0}}/>}
              <div style={{width:36,height:36,borderRadius:"50%",zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",
                background:done?"#83BD41":cur?"white":"#F9FAFB",
                border:done?"3px solid #83BD41":cur?"3px solid #00338D":"3px solid #E5E7EB",
                boxShadow:cur?"0 0 0 4px rgba(0,51,141,0.1)":"none"}}>
                {done?<span style={{color:"white",fontWeight:900,fontSize:15}}>✓</span>:<span style={{color:cur?"#00338D":"#9CA3AF",fontWeight:800,fontSize:12}}>{idx+1}</span>}
              </div>
              <div style={{textAlign:"center",marginTop:7,paddingRight:idx<5?6:0}}>
                <p style={{fontSize:10,fontWeight:cur?800:600,color:done?"#059669":cur?"#00338D":"#9CA3AF",marginBottom:1,lineHeight:1.3}}>{idx+1}. {ph.short}</p>
                <p style={{fontSize:9,color:"#9CA3AF",lineHeight:1.3,marginBottom:2}}>{ph.sub}</p>
                <p style={{fontSize:9,fontWeight:700,color:done?"#059669":cur?"#00338D":"#D1D5DB"}}>{done?"Complete":cur?"In Progress":"Upcoming"}</p>
              </div>
            </div>;})}
        </div>
      </div>

      {/* VERTICAL LAYOUT — portrait mode, all sections stacked */}
      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:12}}>

        {/* ROW 1: Phase Milestones + Health side by side */}
        <div style={{display:"grid",gridTemplateColumns:"290px 1fr",gap:12}}>

        {/* COL 1 — Milestones */}
        <div style={{background:"white",borderRadius:12,padding:"16px 18px",boxShadow:"0 1px 6px rgba(0,0,60,0.07)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
            <h3 style={{fontSize:12,fontWeight:800,color:"#1F2937",lineHeight:1.3}}>Phase {phaseIdx+1}: {PHASE_META[phaseIdx].short}</h3>
            <span style={{background:"#DBEAFE",color:"#1D4ED8",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:8,flexShrink:0,marginLeft:4}}>In Progress</span>
          </div>
          <p style={{fontSize:10,color:"#9CA3AF",marginBottom:10}}>Go-Live Target: {init.goLive}</p>
          <p style={{fontSize:11,fontWeight:700,color:"#374151",marginBottom:8}}>Milestone Progress <span style={{color:"#9CA3AF",fontWeight:400}}>({doneMs} of {milestones.length})</span></p>
          {/* Progress bar */}
          <div style={{background:"#F3F4F6",borderRadius:6,height:5,marginBottom:12}}>
            <div style={{width:`${Math.round(doneMs/milestones.length*100)}%`,height:"100%",background:"#83BD41",borderRadius:6}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {milestones.map((m,i)=>{
              const done=m.status==="done";const active=m.status==="active";
              return<div key={i} style={{display:"flex",alignItems:"flex-start",gap:8}}>
                <div style={{width:18,height:18,borderRadius:"50%",flexShrink:0,marginTop:1,
                  background:done?"#83BD41":active?"#00338D":"transparent",
                  border:done?"2px solid #83BD41":active?"2px solid #00338D":"2px solid #D1D5DB",
                  display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {done&&<span style={{color:"white",fontSize:10,fontWeight:900}}>✓</span>}
                  {active&&<span style={{width:5,height:5,borderRadius:"50%",background:"white",display:"block"}}/>}
                </div>
                <div style={{flex:1}}>
                  <p style={{fontSize:11,fontWeight:active?700:500,color:done?"#374151":active?"#00338D":"#9CA3AF",lineHeight:1.3}}>{m.l}</p>
                  {active&&<p style={{fontSize:10,color:"#00338D",fontWeight:600}}>In Progress</p>}
                </div>
              </div>;})}
          </div>
          <button onClick={()=>setView("artifacts")} style={{marginTop:14,background:"none",border:"none",color:"#00338D",fontSize:12,fontWeight:700,cursor:"pointer",padding:0,display:"flex",alignItems:"center",gap:4}}>View Phase Artifacts →</button>
        </div>

        {/* COL 2 — Health + Metrics + Risks */}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>

          {/* Health */}
          <div style={{background:"white",borderRadius:12,padding:"16px 18px",boxShadow:"0 1px 6px rgba(0,0,60,0.07)"}}>
            <h3 style={{fontSize:12,fontWeight:800,color:"#1F2937",marginBottom:12}}>Project Health</h3>
            <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
              {/* Gauge */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                <p style={{fontSize:10,fontWeight:700,color:"#9CA3AF",marginBottom:6}}>Overall Health</p>
                <div style={{position:"relative",width:84,height:84,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Donut pct={health} color={healthColor} size={84} stroke={9}/>
                  <div style={{position:"absolute",textAlign:"center"}}>
                    <p style={{fontSize:19,fontWeight:900,color:"#1F2937",lineHeight:1}}>{health}</p>
                    <p style={{fontSize:8,color:"#9CA3AF"}}>/100</p>
                  </div>
                </div>
                <span style={{background:health>=75?"#D1FAE5":health>=55?"#FEF9C3":"#FEE2E2",color:health>=75?"#065F46":health>=55?"#854D0E":"#991B1B",fontSize:11,fontWeight:700,padding:"3px 12px",borderRadius:12,marginTop:5}}>{healthLabel}</span>
              </div>
              {/* Schedule / Budget / Scope */}
              <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                {[
                  {label:"Schedule",icon:"📅",status:init.rag==="Green"?"On Track":init.rag==="Amber"?"At Risk":"Off Track",
                   statusC:init.rag==="Green"?"#059669":init.rag==="Amber"?"#D97706":"#DC2626",
                   statusBg:init.rag==="Green"?"#D1FAE5":init.rag==="Amber"?"#FEF9C3":"#FEE2E2",
                   rows:[["Planned",`${Math.min(init.prog+10,100)}%`],["Actual",`${init.prog}%`]]},
                  {label:"Budget",icon:"💰",status:budgetForecast>init.bp?"At Risk":"On Track",
                   statusC:budgetForecast>init.bp?"#D97706":"#059669",
                   statusBg:budgetForecast>init.bp?"#FEF9C3":"#D1FAE5",
                   rows:[["Planned Total",`₹${init.bp}Cr`],["Planned Till Date",`₹${Math.round(init.bp*init.prog/100)}Cr`],["Actual Spent",`₹${init.bs}Cr`],["Variance vs PTD",`₹${Math.abs(Math.round(init.bp*init.prog/100)-init.bs)}Cr ${Math.round(init.bp*init.prog/100)>=init.bs?"under":"over"}`],["Forecast",`₹${budgetForecast}Cr`]]},
                  {label:"Scope",icon:"📐",status:"On Track",statusC:"#059669",statusBg:"#D1FAE5",
                   rows:[["Changes","2"],["Impact","Low"]]},
                ].map((s,i)=>(
                  <div key={i} style={{background:"#F4F7FB",borderRadius:10,padding:"10px 12px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:6}}><span style={{fontSize:13}}>{s.icon}</span><p style={{fontSize:11,fontWeight:700,color:"#374151"}}>{s.label}</p></div>
                    <span style={{background:s.statusBg,color:s.statusC,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:7,display:"inline-block",marginBottom:7}}>{s.status}</span>
                    {s.rows.map(([k,v],j)=><div key={j} style={{display:"flex",justifyContent:"space-between",fontSize:11}}><span style={{color:"#9CA3AF"}}>{k}:</span><span style={{fontWeight:700,color:"#374151"}}>{v}</span></div>)}
                  </div>))}
              </div>
            </div>
          </div>

          

          {/* Risks + Issues */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div style={{background:"white",borderRadius:12,padding:"14px 16px",boxShadow:"0 1px 6px rgba(0,0,60,0.07)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <h4 style={{fontSize:12,fontWeight:800,color:"#1F2937"}}>Top Risks</h4>
                <button onClick={()=>setView("artifacts")} style={{background:"none",border:"none",color:"#00338D",fontSize:11,fontWeight:700,cursor:"pointer"}}>View All</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"2fr 50px 46px 28px",fontSize:10,fontWeight:700,color:"#9CA3AF",marginBottom:5,paddingBottom:4,borderBottom:"1px solid #F3F4F6"}}>
                <span>Risk</span><span>Impact</span><span style={{textAlign:"center"}}>Score</span><span style={{textAlign:"center"}}>↕</span>
              </div>
              {[
                {d:`${init.cat} data migration complexity`,impact:"High",score:init.rag==="Red"?20:15,trend:"↑"},
                {d:"Resource availability — business SMEs",impact:"High",score:12,trend:"↑"},
                {d:`${init.tsa?"TSA exit timeline":"Integration dependency"} risk`,impact:init.tsa?"Critical":"Medium",score:init.tsa?18:9,trend:"→"},
                {d:"Vendor delivery quality",impact:"Medium",score:8,trend:"→"},
              ].map((r,i)=>{const sc=r.score>=18?"#DC2626":r.score>=12?"#D97706":"#CA8A04";return(
                <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 50px 46px 28px",padding:"5px 0",borderTop:"1px solid #F9FAFB",alignItems:"center",fontSize:11}}>
                  <span style={{color:"#374151",lineHeight:1.3,paddingRight:4}}>{r.d}</span>
                  <span style={{color:r.impact==="Critical"||r.impact==="High"?"#DC2626":"#D97706",fontWeight:600,fontSize:10}}>{r.impact}</span>
                  <span style={{background:sc,color:"white",fontWeight:800,fontSize:10,borderRadius:6,padding:"1px 5px",textAlign:"center"}}>{r.score}</span>
                  <span style={{color:r.trend==="↑"?"#DC2626":"#9CA3AF",textAlign:"center",fontWeight:700}}>{r.trend}</span>
                </div>);})}
            </div>
            <div style={{background:"white",borderRadius:12,padding:"14px 16px",boxShadow:"0 1px 6px rgba(0,0,60,0.07)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <h4 style={{fontSize:12,fontWeight:800,color:"#1F2937"}}>Top Issues</h4>
                <button style={{background:"none",border:"none",color:"#00338D",fontSize:11,fontWeight:700,cursor:"pointer"}}>View All</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"2fr 45px 65px",fontSize:10,fontWeight:700,color:"#9CA3AF",marginBottom:5,paddingBottom:4,borderBottom:"1px solid #F3F4F6"}}>
                <span>Issue</span><span>Severity</span><span>Status</span>
              </div>
              {[
                {d:"Global Corp KT documentation incomplete",sev:"High",status:"Open"},
                {d:"Business SME availability below 30%",sev:"High",status:"In Progress"},
                {d:`Vendor PD at 60% vs 80% required`,sev:"Medium",status:"In Progress"},
                {d:"Integration scope not fully defined",sev:"Medium",status:"Open"},
              ].map((iss,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 45px 65px",padding:"5px 0",borderTop:"1px solid #F9FAFB",alignItems:"center",fontSize:11}}>
                  <span style={{color:"#374151",lineHeight:1.3,paddingRight:4}}>{iss.d}</span>
                  <span style={{color:iss.sev==="High"?"#DC2626":"#D97706",fontWeight:600,fontSize:10}}>{iss.sev}</span>
                  <span style={{background:iss.status==="In Progress"?"#DBEAFE":"#F3F4F6",color:iss.status==="In Progress"?"#00338D":"#6B7280",fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:7}}>{iss.status}</span>
                </div>))}
            </div>
          </div>
        </div>

        {/* COL 3 — AI Insights */}
        </div>{/* end ROW 1 grid */}

        {/* ROW 2: AI Insights + AI Risk Score + Stakeholders side by side */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {/* AI Insights */}
          <div style={{background:"white",borderRadius:12,padding:"14px 16px",boxShadow:"0 1px 6px rgba(0,0,60,0.07)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:14}}>⚡</span><h4 style={{fontSize:12,fontWeight:800,color:"#00338D"}}>AI Co-Pilot Insights</h4></div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {aiInsights.map((ins,i)=>(
                <div key={i} style={{background:ins.bg,borderRadius:9,padding:"9px 11px",border:`1px solid ${ins.c}22`}}>
                  <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}><span style={{fontSize:13}}>{ins.icon}</span><p style={{fontSize:11,fontWeight:800,color:ins.c}}>{ins.label}</p></div>
                  <p style={{fontSize:11,color:"#6B7280",lineHeight:1.45,marginBottom:6,textAlign:"left"}}>{ins.body}</p>
                  <button style={{background:"none",border:"none",color:ins.c,fontSize:11,fontWeight:700,cursor:"pointer",padding:0}}>{ins.action} →</button>
                </div>))}
            </div>
          </div>
          {/* AI Risk Score + Stakeholders */}
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{background:"#00338D",borderRadius:12,padding:"14px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <p style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.7)"}}>AI Risk Score</p>
                <span style={{background:init.rag==="Red"?"#DC2626":init.rag==="Amber"?"#D97706":"#059669",color:"white",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:10}}>{init.rag==="Red"?"↑ Critical":init.rag==="Amber"?"↑ High":"→ Medium"}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <div style={{position:"relative",width:60,height:60,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Donut pct={init.rag==="Red"?82:init.rag==="Amber"?65:38} color={init.rag==="Red"?"#DC2626":init.rag==="Amber"?"#FCD34D":"#83BD41"} size={60} stroke={7}/>
                  <p style={{position:"absolute",fontSize:15,fontWeight:900,color:"white"}}>{init.rag==="Red"?82:init.rag==="Amber"?65:38}</p>
                </div>
                <div>
                  <p style={{color:"white",fontWeight:700,fontSize:13}}>{init.rag==="Red"?"Critical Risk":init.rag==="Amber"?"High Risk":"Medium Risk"} · /100</p>
                  <p style={{color:"rgba(255,255,255,0.6)",fontSize:10,lineHeight:1.4}}>{aiNarrative||"Click Refresh for AI narrative"}</p>
                </div>
              </div>
              <button onClick={getAI} disabled={aiLoading} style={{background:"#83BD41",color:"#00338D",border:"none",padding:"6px 14px",borderRadius:7,fontSize:11,fontWeight:800,cursor:"pointer",width:"100%"}}>{aiLoading?"Analysing…":"🤖 Refresh AI Analysis"}</button>
            </div>
            <div style={{background:"white",borderRadius:12,padding:"14px 16px",boxShadow:"0 1px 6px rgba(0,0,60,0.07)"}}>
              <h4 style={{fontSize:12,fontWeight:800,color:"#1F2937",marginBottom:10}}>Stakeholders & Communication</h4>
              {[
                {icon:"📅",label:"Next Steering Committee",detail:`Agenda: ${PHASE_META[phaseIdx].short} progress, risks, budget forecast`,sub:"Monthly cadence"},
                {icon:"📄",label:"Upcoming Deliverable",detail:`${milestones.find(m=>m.status==="active")?.l||"Phase milestone"} due`,sub:`Target: ${init.goLive}`},
                {icon:"💬",label:"Recent Update",detail:`${init.desc.substring(0,60)}…`,sub:"From SMO weekly update"},
              ].map((s,i)=>(
                <div key={i} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:i<2?"1px solid #F3F4F6":"none"}}>
                  <div style={{width:30,height:30,borderRadius:7,background:"#EEF3FB",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{s.icon}</div>
                  <div>
                    <p style={{fontSize:11,fontWeight:700,color:"#374151",marginBottom:2}}>{s.label}</p>
                    <p style={{fontSize:10,color:"#6B7280",lineHeight:1.4}}>{s.detail}</p>
                    <p style={{fontSize:10,color:"#00338D",fontWeight:600,marginTop:2}}>{s.sub}</p>
                  </div>
                </div>))}
            </div>
          </div>
        </div>{/* end ROW 2 */}
      </div>{/* end vertical layout */}

      {/* AI CO-PILOT BAR */}
      <div style={{background:"white",borderRadius:12,padding:"12px 18px",boxShadow:"0 1px 6px rgba(0,0,60,0.07)",display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:16,flexShrink:0}}>🤖</span>
        <p style={{fontSize:12,fontWeight:700,color:"#374151",whiteSpace:"nowrap"}}>Ask AI Co-Pilot about this project</p>
        <div style={{display:"flex",gap:6,flex:1,flexWrap:"wrap"}}>
          {QUICK.map((q,i)=><button key={i} onClick={()=>setChatQ(q)} style={{background:"#F4F7FB",border:"1px solid #E5E7EB",borderRadius:20,padding:"4px 11px",fontSize:11,color:"#374151",cursor:"pointer",whiteSpace:"nowrap"}}>{q}</button>)}
        </div>
        <div style={{display:"flex",gap:6,minWidth:240,flexShrink:0}}>
          <input value={chatQ} onChange={e=>setChatQ(e.target.value)} placeholder="Ask a question…" style={{flex:1,padding:"6px 11px",border:"1px solid #E5E7EB",borderRadius:7,fontSize:12,color:"#1F2937",background:"white",outline:"none"}}/>
          <button style={{background:"#00338D",color:"white",border:"none",width:32,height:32,borderRadius:7,cursor:"pointer",fontSize:16,flexShrink:0}}>›</button>
        </div>
      </div>
    </div>
  </div>;}


// ─── EXECUTIVE OVERVIEW ──────────────────────
function ExecutiveOverview({program,onSelect,onTabChange}){
  const inits=program?.initiatives||INITIATIVES;
  const m=computeMetrics(inits);
  const [aiNarrative,setAiNarrative]=useState("");const [aiLoading,setAiLoading]=useState(false);
  const getAiAnalysis=async()=>{setAiLoading(true);try{const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:600,messages:[{role:"user",content:`Computed AI Risk Score: ${m.aiScore}/100. Programme: ${inits.length} initiatives, ${m.red.length} Red, ${m.amber.length} Amber, ${m.criticalTsa.length} critical TSA exits, ${m.wave1Behind.length} Wave 1 behind plan, overall progress ${m.totalProg}%. Budget: Rs${m.totalBp}Cr planned / Rs${m.totalBs}Cr spent. Red initiatives: ${m.red.map(i=>i.name).join(", ")||"None"}. In 3-4 sentences: validate the risk score, identify the top 2 risk drivers, and give one specific recommendation.`}]})});const d=await res.json();setAiNarrative(d.content?.map(b=>b.text||"").join("")||"");}catch{setAiNarrative("Unable to connect to AI. Check API key.");}setAiLoading(false);};
  const scoreColor=m.aiScore>=70?"#DC2626":m.aiScore>=50?"#D97706":"#16A34A";
  const scoreLabel=m.aiScore>=70?"High":m.aiScore>=50?"Medium":"Low";
  const totalPtd=inits.reduce((s,i)=>s+Math.round(i.bp*i.prog/100),0);
  const finVar=totalPtd-m.totalBs;
  const tsBucketData=[{label:"<6M",inits:m.tsBuckets["<6M"]},{label:"6-12M",inits:m.tsBuckets["6-12M"]},{label:"12-24M",inits:m.tsBuckets["12-24M"]},{label:"24-36M",inits:m.tsBuckets["24-36M"]},{label:">36M",inits:m.tsBuckets[">36M"]}];
  const maxBucket=Math.max(...tsBucketData.map(b=>b.inits.length),1);
  return<div style={{padding:20}}>
    <div style={{marginBottom:16}}><h1 style={{fontSize:20,fontWeight:800,color:"#00338D",marginBottom:2}}>{program?.programName||"IT Separation Program"} — Executive Overview</h1><p style={{fontSize:12,color:"#6B7280"}}>{program?.clientName||"ClientCo"} · Separation from {program?.parentName||"Global Corp"} · Target: {program?.separationDate||"Q3 FY29"}</p></div>

    {/* KPI Strip */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:16}}>
      {[
        {label:"Overall TSA Exit Progress",value:`${m.totalProg}%`,sub:null,details:(()=>{const tsaInits=inits.filter(i=>i.tsa);const complete=tsaInits.filter(i=>i.prog>=100).length;const inProg=tsaInits.filter(i=>i.prog>0&&i.prog<100).length;const notStarted=tsaInits.filter(i=>i.prog===0).length;return[{l:"Target",v:`Q3 FY29`},{l:"TSA Exits Total",v:`${tsaInits.length}`},{l:"Complete",v:`${complete}`},{l:"In Progress",v:`${inProg}`},{l:"Not Started",v:`${notStarted}`}];})(),color:"#00338D",icon:"🎯"},
        {label:"IT Separation Initiatives",value:inits.length,sub:`🟢 ${inits.filter(i=>i.rag==="Green").length}  🟡 ${inits.filter(i=>i.rag==="Amber").length}  🔴 ${inits.filter(i=>i.rag==="Red").length}`,color:"#7C3AED",icon:"🗂",clickable:true},
        {label:"Financial Snapshot",value:finVar>0?"✓ Under Budget":finVar<0?"⚠ Over Budget":"✓ On Budget",valueSize:15,sub:null,details:[{l:"Total Budget",    v:`₹${m.totalBp}Cr`},{l:"Planned Till Date",v:`₹${totalPtd}Cr`},{l:"Actual Spent",    v:`₹${m.totalBs}Cr`},{l:"Variance",        v:`₹${Math.abs(finVar)}Cr ${finVar>=0?"under":"over"}`},],color:finVar>=0?"#059669":"#DC2626",icon:"💰"},
        {label:"TSA Expiring <12M",value:m.tsaExpiring,sub:"Need immediate attention",color:m.tsaExpiring>5?"#DC2626":"#D97706",icon:"⚠"},
        {label:"Wave 1 At Risk",value:inits.filter(i=>i.wave===1&&(i.rag==="Red"||i.rag==="Amber")).length,sub:"Need attention now",color:inits.filter(i=>i.wave===1&&i.rag==="Red").length>0?"#DC2626":"#D97706",icon:"⚡"},
      ].map((k,i)=><div key={i} onClick={k.clickable&&onTabChange?()=>onTabChange("initiatives"):undefined}
        style={{background:"white",borderRadius:10,padding:"14px 16px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",borderTop:`3px solid ${k.color}`,cursor:k.clickable?"pointer":"default",transition:"box-shadow 0.15s"}}
        onMouseEnter={e=>k.clickable&&(e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.12)")}
        onMouseLeave={e=>k.clickable&&(e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.06)")}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
          <p style={{fontSize:10,color:"#9CA3AF",fontWeight:700,textTransform:"uppercase",letterSpacing:0.3,lineHeight:1.3}}>{k.label}</p>
          <span style={{fontSize:18}}>{k.icon}</span>
        </div>
        <p style={{fontSize:k.valueSize||24,fontWeight:800,color:k.color,lineHeight:1,marginBottom:k.details?8:4}}>{k.value}</p>
        {k.details
          ?<div style={{display:"flex",flexDirection:"column",gap:0}}>
            {k.details.map(({l,v},di)=>(
              <div key={di} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"3px 0",borderTop:"1px solid #F3F4F6"}}>
                <span style={{fontSize:9,color:"#9CA3AF"}}>{l}</span>
                <span style={{fontSize:10,fontWeight:700,color:di===3?k.color:"#374151"}}>{v}</span>
              </div>))}
          </div>
          :<p style={{fontSize:10,color:"#9CA3AF"}}>{k.sub}</p>}
        {k.clickable&&<p style={{fontSize:9,color:k.color,fontWeight:600,marginTop:4}}>Click to view all →</p>}
      </div>)}
    </div>

    {/* Middle Row */}
    <div style={{display:"grid",gridTemplateColumns:"1.7fr 1fr",gap:12,marginBottom:12}}>
      {/* Mini Gantt */}
      <div style={{background:"white",borderRadius:10,padding:"14px 16px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
        <p style={{fontWeight:700,fontSize:13,color:"#374151",marginBottom:10,textAlign:"left"}}>Roadmap — Major Projects (Annual OpEx &gt; ₹1Cr)</p>
        <div style={{fontSize:10}}>
          <div style={{display:"grid",gridTemplateColumns:"120px 1fr",marginBottom:2}}>
            <div/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)"}}>
              {["FY27","FY28","FY29"].map((y,i)=><div key={y} style={{textAlign:"center",padding:"2px 0",fontWeight:700,color:"#00338D",background:i===0?"#EEF3FB":i===1?"#F4F7FB":"#EFF6FF",fontSize:10,borderRight:i<2?"1px solid #E5E7EB":"none"}}>{y}</div>)}
            </div>
          </div>
          {ROADMAP_PROJECTS.map((proj,idx)=>{
            const init=inits.find(i=>i.id===proj.id)||{prog:0,rag:"Green"};
            const leftPct=proj.startQ/12*100;const widthPct=(proj.endQ-proj.startQ+1)/12*100;
            return<div key={proj.id} style={{display:"grid",gridTemplateColumns:"120px 1fr",borderTop:"1px solid #F3F4F6"}} onClick={()=>onSelect&&onSelect(init)}>
              <div style={{padding:"4px 6px",borderRight:"1px solid #F3F4F6",cursor:"pointer"}}>
                <p style={{fontSize:9,fontWeight:700,color:"#1F2937",lineHeight:1.3,textAlign:"left"}}>{proj.name}</p>
              </div>
              <div style={{position:"relative",height:24,cursor:"pointer"}}>
                {[0,4,8].map(q=><div key={q} style={{position:"absolute",left:`${q/12*100}%`,top:0,bottom:0,borderLeft:"1px solid #F9FAFB"}}/>)}
                <div style={{position:"absolute",left:"33.33%",top:0,bottom:0,borderLeft:"1px solid #E5E7EB"}}/>
                <div style={{position:"absolute",left:"66.66%",top:0,bottom:0,borderLeft:"1px solid #E5E7EB"}}/>
                <div style={{position:"absolute",left:`${leftPct}%`,width:`${widthPct}%`,top:"50%",transform:"translateY(-50%)",height:14,background:proj.color,borderRadius:3,overflow:"hidden",opacity:0.9,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <div style={{position:"absolute",left:0,top:0,bottom:0,width:`${init.prog}%`,background:"rgba(0,0,0,0.2)"}}/>
                  <span style={{position:"relative",fontSize:8,fontWeight:700,color:"white",whiteSpace:"nowrap",zIndex:1}}>{init.prog>0?init.prog+"%":""}</span>
                </div>
              </div>
            </div>;})}
          <div style={{display:"flex",gap:8,marginTop:6,flexWrap:"wrap"}}>
            {Object.entries(CATS).map(([cat,{color}])=><div key={cat} style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:8,height:5,borderRadius:1,background:color}}/><span style={{fontSize:8,color:"#9CA3AF"}}>{cat.split(" ")[0]}</span></div>)}
          </div>
        </div>
      </div>
      {/* Tower Progress */}
      <div style={{background:"white",borderRadius:10,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
        <p style={{fontWeight:700,fontSize:13,color:"#374151",marginBottom:12}}>Transition Progress by Tower</p>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {Object.entries(m.catProgress).map(([cat,pct])=>{const cc=CATS[cat]?.color||"#374151";return<div key={cat}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:11,color:"#374151",fontWeight:600}}>{cat}</span><span style={{fontSize:11,fontWeight:700,color:cc}}>{pct}%</span></div>
            <Bar v={pct} color={cc}/>
          </div>;})}
        </div>
        {(()=>{
          const entries=Object.entries(m.catProgress);
          const sorted=[...entries].sort((a,b)=>b[1]-a[1]);
          const leader=sorted[0];const laggard=sorted[sorted.length-1];
          const atRisk=entries.filter(([,p])=>p<10).map(([c])=>c);
          const leadColor=CATS[leader[0]]?.color||"#059669";
          const msg=`🤖 ${leader[0]} leads at ${leader[1]}% — fastest-moving tower. ${laggard[0]} at ${laggard[1]}% needs immediate resource attention.${atRisk.length>0?` ${atRisk.join(", ")} ${atRisk.length>1?"are":"is"} below 10% — Wave 1 exits at risk if not accelerated.`:" All towers have initiated delivery."}`;
          return<div style={{marginTop:12,background:"#EFF6FF",borderRadius:6,padding:"8px 10px",border:`1px solid ${leadColor}33`}}>
            <p style={{fontSize:11,color:"#1E40AF",fontWeight:600,lineHeight:1.5}}>{msg}</p>
          </div>;
        })()}
      </div>
    </div>

    {/* Bottom Row */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1.2fr 1fr",gap:12}}>
      {/* Top Risks */}
      <div style={{background:"white",borderRadius:10,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <p style={{fontWeight:700,fontSize:13,color:"#374151"}}>Top Risks</p>
          <span style={{fontSize:10,color:"#9CA3AF"}}>Computed from initiative data</span>
        </div>
        {m.topRisks.length===0?<p style={{fontSize:12,color:"#9CA3AF"}}>No critical risks identified</p>:
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {m.topRisks.map((r,i)=>{const sc=r.sev==="Critical"?{bg:"#FEE2E2",txt:"#991B1B"}:r.sev==="High"?{bg:"#FEF9C3",txt:"#92400E"}:{bg:"#DBEAFE",txt:"#1E40AF"};return<div key={i} style={{display:"flex",alignItems:"flex-start",gap:8}}>
            <span style={{background:sc.bg,color:sc.txt,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:6,whiteSpace:"nowrap",marginTop:1,flexShrink:0}}>{r.sev}</span>
            <p style={{fontSize:11,color:"#374151",lineHeight:1.4}}>{r.txt}</p>
          </div>;})}
        </div>}
        <button style={{marginTop:10,fontSize:11,color:"#0284C7",background:"none",border:"none",cursor:"pointer",fontWeight:600,padding:0}}>View All Risks →</button>
      </div>

      {/* AI Insights */}
      <div style={{background:"white",borderRadius:10,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
        <p style={{fontWeight:700,fontSize:13,color:"#374151",marginBottom:10}}>AI Insights & Recommendations</p>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {[
            {icon:"🔴",txt:`${m.criticalTsa.length} critical TSA exits in Wave 1. Prioritise transition plans and resourcing immediately.`,level:"High"},
            {icon:"🟡",txt:`Data migration activities at risk due to Global Corp system dependency — early assessment critical.`,level:"Medium"},
            {icon:"🟢",txt:`Cloud Foundation at ${m.catProgress["Infra & Cyber"]||0}% — ahead of other towers. Good base for cloud workstreams.`,level:"Info"},
          ].map((ins,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"8px 10px",background:"#F8FAFC",borderRadius:8}}>
            <span style={{fontSize:16,flexShrink:0}}>{ins.icon}</span>
            <p style={{fontSize:11,color:"#374151",lineHeight:1.5,flex:1,textAlign:"left"}}>{ins.txt}</p>
            <span style={{background:ins.level==="High"?"#FEE2E2":ins.level==="Medium"?"#FEF9C3":"#DBEAFE",color:ins.level==="High"?"#991B1B":ins.level==="Medium"?"#92400E":"#1E40AF",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:8,flexShrink:0}}>{ins.level}</span>
          </div>)}
        </div>
      </div>

      {/* AI Risk Score + Financial */}
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div style={{background:"white",borderRadius:10,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <p style={{fontWeight:700,fontSize:13,color:"#374151"}}>AI Risk Score</p>
            <button onClick={getAiAnalysis} disabled={aiLoading} style={{background:"#EEF3FB",border:"none",color:"#00338D",padding:"4px 10px",borderRadius:16,fontSize:11,fontWeight:700,cursor:"pointer"}}>{aiLoading?"Analysing…":"🤖 Refresh AI"}</button>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
            <div style={{width:64,height:64,borderRadius:"50%",border:`6px solid ${scoreColor}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <span style={{fontSize:18,fontWeight:800,color:scoreColor}}>{m.aiScore}</span>
            </div>
            <div><p style={{fontWeight:700,color:scoreColor,fontSize:14}}>{scoreLabel} Risk</p><p style={{fontSize:11,color:"#6B7280"}}>↑ Increasing · Formula-based</p></div>
          </div>
          {aiNarrative?<div style={{background:"#F0F9FF",borderRadius:7,padding:"8px 10px"}}><p style={{fontSize:11,color:"#0C4A6E",lineHeight:1.5}}>{aiNarrative}</p></div>:<p style={{fontSize:11,color:"#9CA3AF"}}>Click Refresh AI for narrative analysis</p>}
        </div>
        <div style={{background:"white",borderRadius:10,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <p style={{fontWeight:700,fontSize:13,color:"#374151"}}>Live Budget — Top 5 Initiatives</p>
            <span style={{fontSize:10,color:"#9CA3AF"}}>by planned spend</span>
          </div>
          {(()=>{
            const top5=[...inits].sort((a,b)=>b.bp-a.bp).slice(0,5);
            return top5.map((init,i)=>{
              const ptd=Math.round(init.bp*init.prog/100);
              const variance=ptd-init.bs;
              const ragColor=init.rag==="Red"?"#DC2626":init.rag==="Amber"?"#D97706":"#059669";
              const ragBg=init.rag==="Red"?"#FEE2E2":init.rag==="Amber"?"#FEF9C3":"#D1FAE5";
              return<div key={init.id} style={{padding:"7px 0",borderBottom:i<4?"1px solid #F3F4F6":"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                  <span style={{fontSize:11,fontWeight:700,color:"#1F2937",flex:1,paddingRight:6,lineHeight:1.3}}>{init.name}</span>
                  <span style={{fontSize:9,background:ragBg,color:ragColor,padding:"1px 6px",borderRadius:6,fontWeight:700,flexShrink:0}}>{init.rag}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#9CA3AF",marginBottom:3}}>
                  <span>Budget ₹{init.bp}Cr · Spent ₹{init.bs}Cr</span>
                  <span style={{color:variance>=0?"#059669":"#DC2626",fontWeight:600}}>₹{Math.abs(variance)}Cr {variance>=0?"under":"over"}</span>
                </div>
                <div style={{background:"#E5E7EB",borderRadius:3,height:3}}>
                  <div style={{width:`${Math.min(init.bs/init.bp*100,100)}%`,height:"100%",background:ragColor,borderRadius:3}}/>
                </div>
              </div>;
            });
          })()}
        </div>
      </div>
    </div>
  </div>;}

// ─── APPLICATIONS TAB ────────────────────────
function ApplicationsTab({program,onSelect}){
  const inits=program?.initiatives||INITIATIVES;
  const [activeCat,setActiveCat]=useState("");const [fRag,setFRag]=useState("");const [fWave,setFWave]=useState("");const [search,setSearch]=useState("");
  const filtered=inits.filter(i=>(!activeCat||i.cat===activeCat)&&(!fRag||i.rag===fRag)&&(!fWave||i.wave===+fWave)&&(!search||i.name.toLowerCase().includes(search.toLowerCase())));
  return<div style={{padding:20}}>
    <h2 style={{fontSize:16,fontWeight:800,color:"#00338D",marginBottom:14}}>Initiatives in Scope</h2>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
      {["All",...Object.keys(CATS)].map(cat=>{const isCat=cat==="All"?activeCat==="":activeCat===cat;const cc=cat==="All"?"#00338D":CATS[cat]?.color||"#374151";const count=cat==="All"?inits.length:inits.filter(i=>i.cat===cat).length;
        return<button key={cat} onClick={()=>setActiveCat(cat==="All"?"":cat)} style={{padding:"6px 14px",borderRadius:20,border:`2px solid ${isCat?cc:"#E5E7EB"}`,background:isCat?cc:"white",color:isCat?"white":cc,fontSize:12,fontWeight:700,cursor:"pointer"}}>{cat} ({count})</button>;})}
    </div>
    <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
      <input placeholder="🔍 Search…" value={search} onChange={e=>setSearch(e.target.value)} style={{...INP,flex:1,minWidth:160,padding:"7px 12px"}}/>
      <select value={fRag} onChange={e=>setFRag(e.target.value)} style={{...INP,width:"auto",padding:"7px 10px"}}><option value="">All Status</option><option value="Green">🟢 Green</option><option value="Amber">🟡 Amber</option><option value="Red">🔴 Red</option></select>
      <select value={fWave} onChange={e=>setFWave(e.target.value)} style={{...INP,width:"auto",padding:"7px 10px"}}><option value="">All Waves</option><option value="1">Wave 1</option><option value="2">Wave 2</option><option value="3">Wave 3</option></select>
      {(search||fRag||fWave)&&<button onClick={()=>{setSearch("");setFRag("");setFWave("");}} style={{...INP,width:"auto",padding:"7px 12px",cursor:"pointer",color:"#6B7280"}}>✕</button>}
    </div>
    <p style={{fontSize:11,color:"#9CA3AF",marginBottom:10}}>Showing {filtered.length} of {inits.length} · ⚠[B] = early TSA exit · [A] = tech dependency</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:12}}>
      {filtered.map(init=>{const cc=CATS[init.cat]?.color||"#00338D";const[hov,setHov]=useState(false);return<div key={init.id} onClick={()=>onSelect(init)} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{background:"white",borderRadius:10,overflow:"hidden",cursor:"pointer",boxShadow:hov?"0 4px 16px rgba(0,0,60,0.14)":"0 1px 4px rgba(0,0,0,0.07)",transform:hov?"translateY(-2px)":"none",transition:"all 0.15s"}}>
        <div style={{height:4,background:cc}}/><div style={{padding:"12px 14px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:6}}><h3 style={{fontSize:12,fontWeight:700,color:"#1F2937",flex:1,lineHeight:1.3}}>{init.name}</h3><RAGBadge rag={init.rag}/></div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:7}}>
            <span style={{background:cc+"1A",color:cc,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:7}}>{init.cat}</span>
            {init.tsa&&<span style={{background:"#FEF9C3",color:"#92400E",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:7}}>⚠[B]</span>}
            {init.td&&<span style={{background:"#EDE9FE",color:"#5B21B6",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:7}}>[A]</span>}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#6B7280",marginBottom:6}}><span>📅 {init.goLive}</span><span style={{background:"#EEF3FB",color:"#00338D",padding:"1px 6px",borderRadius:8,fontSize:10,fontWeight:700}}>W{init.wave}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#9CA3AF",marginBottom:4}}><span>Progress</span><span>{init.prog}%</span></div>
          <Bar v={init.prog} color={cc}/>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#9CA3AF",marginTop:5}}><span>₹{init.bp}Cr planned</span><span>₹{init.bs}Cr spent</span></div>
        </div>
      </div>;})}
    </div>
  </div>;}



const QS=["Q1 FY27","Q2 FY27","Q3 FY27","Q4 FY27","Q1 FY28","Q2 FY28","Q3 FY28","Q4 FY28","Q1 FY29","Q2 FY29","Q3 FY29","Q4 FY29"];
// ─── RISKS & ISSUES TAB ───────────────────────
function RisksTab({program,onSelect}){
  const inits=program?.initiatives||INITIATIVES;
  const [rView,setRView]=useState("risks");
  const [filter,setFilter]=useState("");
  const [editMode,setEditMode]=useState(false);
  const [risks,setRisks]=useState(CROSS_RISKS.map(r=>({...r})));
  const [issues,setIssues]=useState(CROSS_ISSUES.map(i=>({...i})));
  const [auditLog,setAuditLog]=useState([]);
  const [showAudit,setShowAudit]=useState(false);
  const filteredR=risks.filter(r=>!filter||r.cat===filter);
  const filteredI=issues.filter(r=>!filter||r.cat===filter);
  const cats=[...new Set([...risks.map(r=>r.cat),...issues.map(r=>r.cat)])];
  const scoreColor=s=>s>=20?"#DC2626":s>=12?"#D97706":"#16A34A";
  const recalcScore=(r,changedField,val)=>{const prob=changedField==="prob"?val:r.prob;const impact=changedField==="impact"?val:r.impact;const pv={High:4,Medium:3,Low:2};const iv={Critical:5,High:4,Medium:3,Low:2};return Math.round((pv[prob]||3)*(iv[impact]||3)*1.2);};
  const updateRisk=(id,field,val)=>{const ts=new Date().toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"});const prev=risks.find(r=>r.id===id)?.[field];setRisks(rs=>rs.map(r=>r.id===id?{...r,[field]:val,score:field==="prob"||field==="impact"?recalcScore(r,field,val):r.score}:r));setAuditLog(log=>[{id,field,from:prev,to:val,ts},...log.slice(0,49)]);};
  const updateIssue=(id,field,val)=>{const ts=new Date().toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"});const prev=issues.find(i=>i.id===id)?.[field];setIssues(is=>is.map(i=>i.id===id?{...i,[field]:val}:i));setAuditLog(log=>[{id,field,from:prev,to:val,ts},...log.slice(0,49)]);};
  const statusColors={Open:{bg:"#FEE2E2",txt:"#991B1B"},"In Progress":{bg:"#FEF9C3",txt:"#92400E"},Closed:{bg:"#D1FAE5",txt:"#065F46"},Monitor:{bg:"#DBEAFE",txt:"#1E40AF"}};
  return<div style={{padding:20}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
      <div><h2 style={{fontSize:16,fontWeight:800,color:"#00338D",marginBottom:2}}>Risks & Issues</h2>
        <p style={{fontSize:12,color:"#6B7280"}}>Cross-programme risk and issue register — computed from initiative data and programme context</p></div>
      <div style={{display:"flex",gap:8}}>
        {auditLog.length>0&&<button onClick={()=>setShowAudit(!showAudit)} style={{background:"#F4F7FB",border:"1px solid #E5E7EB",color:"#374151",padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>📋 Audit Log ({auditLog.length})</button>}
        <button onClick={()=>setEditMode(!editMode)} style={{background:editMode?"#059669":"#00338D",color:"white",border:"none",padding:"6px 16px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>{editMode?"✓ Done Editing":"✏ Edit Register"}</button>
      </div>
    </div>
    {showAudit&&auditLog.length>0&&<div style={{background:"white",borderRadius:10,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",marginBottom:14,border:"1px solid #E5E7EB"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <p style={{fontSize:13,fontWeight:700,color:"#374151"}}>Audit Log — Recent Changes</p>
        <button onClick={()=>setShowAudit(false)} style={{background:"none",border:"none",color:"#9CA3AF",cursor:"pointer",fontSize:16}}>×</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:4,maxHeight:200,overflowY:"auto"}}>
        {auditLog.map((entry,i)=><div key={i} style={{display:"flex",gap:10,padding:"6px 10px",background:"#F8FAFC",borderRadius:6,fontSize:11,alignItems:"center"}}>
          <span style={{color:"#9CA3AF",fontWeight:600,flexShrink:0}}>{entry.ts}</span>
          <span style={{fontWeight:700,color:"#00338D",flexShrink:0}}>{entry.id}</span>
          <span style={{color:"#6B7280",flex:1}}>{entry.field}: <span style={{color:"#DC2626",textDecoration:"line-through"}}>{entry.from}</span> → <span style={{color:"#059669",fontWeight:700}}>{entry.to}</span></span>
        </div>)}
      </div>
    </div>}
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
      {[{l:"Total Risks",v:risks.length,c:"#00338D"},{l:"Critical / High",v:risks.filter(r=>r.score>=15).length,c:"#DC2626"},{l:"Open Issues",v:issues.filter(i=>i.status==="Open").length,c:"#D97706"},{l:"In Progress",v:issues.filter(i=>i.status==="In Progress").length,c:"#0284C7"}].map((s,i)=>(
        <div key={i} style={{background:"white",borderRadius:10,padding:"12px 14px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",borderTop:`3px solid ${s.c}`}}>
          <p style={{fontSize:10,color:"#9CA3AF",fontWeight:700,textTransform:"uppercase",marginBottom:4}}>{s.l}</p>
          <p style={{fontSize:22,fontWeight:800,color:s.c}}>{s.v}</p>
        </div>))}
    </div>
    <div style={{display:"flex",gap:0,marginBottom:12,borderBottom:"2px solid #E5E7EB"}}>
      {[["risks","⚠ Risks"],["issues","🔴 Issues"]].map(([v,l])=>(
        <button key={v} onClick={()=>setRView(v)} style={{padding:"8px 18px",border:"none",background:"none",fontSize:13,fontWeight:700,cursor:"pointer",color:rView===v?"#00338D":"#9CA3AF",borderBottom:rView===v?"3px solid #00338D":"3px solid transparent",marginBottom:-2}}>{l}</button>))}
      <div style={{flex:1}}/>
      <div style={{display:"flex",gap:6,alignItems:"center",paddingBottom:4}}>
        <button onClick={()=>setFilter("")} style={{padding:"4px 10px",borderRadius:14,border:"1px solid",borderColor:filter===""?"#00338D":"#E5E7EB",background:filter===""?"#00338D":"white",color:filter===""?"white":"#374151",fontSize:11,cursor:"pointer",fontWeight:600}}>All</button>
        {cats.slice(0,5).map(c=><button key={c} onClick={()=>setFilter(filter===c?"":c)} style={{padding:"4px 10px",borderRadius:14,border:"1px solid",borderColor:filter===c?"#00338D":"#E5E7EB",background:filter===c?"#00338D":"white",color:filter===c?"white":"#374151",fontSize:11,cursor:"pointer",fontWeight:600}}>{c}</button>)}
      </div>
    </div>
    {rView==="risks"&&<>
      <div style={{background:"white",borderRadius:10,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
        <div style={{display:"grid",gridTemplateColumns:"60px 2fr 80px 70px 70px 60px 100px 110px 90px",background:"#EEF3FB",padding:"9px 14px",fontSize:11,fontWeight:700,color:"#00338D",borderBottom:"1px solid #E5E7EB"}}>
          <span>ID</span><span>Risk Description</span><span>Category</span><span>Probability</span><span>Impact</span><span>Score</span><span>Owner</span><span>Due Date</span><span>Status</span>
        </div>
        {filteredR.map((r,idx)=>(
          <div key={r.id} style={{display:"grid",gridTemplateColumns:"60px 2fr 80px 70px 70px 60px 100px 110px 90px",padding:"10px 14px",borderTop:idx>0?"1px solid #F3F4F6":"none",alignItems:"start",background:editMode?"#FAFBFF":"white"}}>
            <span style={{fontSize:11,fontWeight:700,color:"#9CA3AF"}}>{r.id}</span>
            <div>{editMode?<textarea defaultValue={r.desc} onBlur={e=>updateRisk(r.id,"desc",e.target.value)} style={{width:"100%",fontSize:11,border:"1px solid #BFDBFE",borderRadius:5,padding:"4px 6px",fontFamily:"inherit",resize:"vertical",minHeight:40,background:"white",color:"#1F2937"}}/>
              :<><p style={{fontSize:12,fontWeight:700,color:"#1F2937",marginBottom:3,textAlign:"left"}}>{r.desc}</p><p style={{fontSize:11,color:"#9CA3AF",lineHeight:1.4,textAlign:"left"}}>{r.mitigation}</p></>}</div>
            <span style={{fontSize:11,color:"#6B7280"}}>{r.cat}</span>
            {editMode?<select defaultValue={r.prob} onBlur={e=>updateRisk(r.id,"prob",e.target.value)} style={{fontSize:11,border:"1px solid #BFDBFE",borderRadius:5,padding:"3px 4px",color:"#374151"}}>{["High","Medium","Low"].map(v=><option key={v}>{v}</option>)}</select>
              :<span style={{fontSize:11,fontWeight:600,color:r.prob==="High"?"#DC2626":r.prob==="Medium"?"#D97706":"#059669"}}>{r.prob}</span>}
            {editMode?<select defaultValue={r.impact} onBlur={e=>updateRisk(r.id,"impact",e.target.value)} style={{fontSize:11,border:"1px solid #BFDBFE",borderRadius:5,padding:"3px 4px",color:"#374151"}}>{["Critical","High","Medium","Low"].map(v=><option key={v}>{v}</option>)}</select>
              :<span style={{fontSize:11,fontWeight:600,color:r.impact==="Critical"||r.impact==="High"?"#DC2626":r.impact==="Medium"?"#D97706":"#059669"}}>{r.impact}</span>}
            <span style={{fontSize:14,fontWeight:800,color:scoreColor(r.score)}}>{r.score}</span>
            {editMode?<input defaultValue={r.owner} onBlur={e=>updateRisk(r.id,"owner",e.target.value)} style={{fontSize:11,border:"1px solid #BFDBFE",borderRadius:5,padding:"3px 6px",width:"90px",color:"#374151"}}/>
              :<span style={{fontSize:11,color:"#374151",fontWeight:600}}>{r.owner}</span>}
            {editMode?<input defaultValue={r.dueDate} onBlur={e=>updateRisk(r.id,"dueDate",e.target.value)} style={{fontSize:11,border:"1px solid #BFDBFE",borderRadius:5,padding:"3px 6px",width:"100px",color:"#374151"}}/>
              :<span style={{fontSize:11,color:"#374151",fontWeight:600}}>{r.dueDate}</span>}
            {editMode?<select defaultValue={r.status} onBlur={e=>updateRisk(r.id,"status",e.target.value)} style={{fontSize:11,border:"1px solid #BFDBFE",borderRadius:5,padding:"3px 4px",color:"#374151"}}>{["Open","In Progress","Closed","Monitor"].map(v=><option key={v}>{v}</option>)}</select>
              :<span style={{fontSize:10,background:(statusColors[r.status]||statusColors.Open).bg,color:(statusColors[r.status]||statusColors.Open).txt,padding:"2px 8px",borderRadius:8,fontWeight:700}}>{r.status}</span>}
          </div>))}
      </div>
      <div style={{marginTop:16}}>
        <h3 style={{fontSize:13,fontWeight:700,color:"#374151",marginBottom:10}}>Initiative-Level Risk Signals</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
          {inits.filter(i=>i.rag==="Red"||i.rag==="Amber").map(init=>(
            <div key={init.id} onClick={()=>onSelect(init)} style={{background:"white",borderRadius:8,padding:"10px 14px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",cursor:"pointer",borderLeft:`3px solid ${init.rag==="Red"?"#DC2626":"#CA8A04"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <p style={{fontSize:12,fontWeight:700,color:"#1F2937"}}>{init.name}</p><RAGBadge rag={init.rag}/>
              </div>
              <p style={{fontSize:11,color:"#6B7280",marginTop:3}}>{init.tsa?`TSA exit ${init.tsaQ}`:init.cat} · Wave {init.wave}</p>
            </div>))}
        </div>
      </div>
    </>}
    {rView==="issues"&&<>
      <div style={{background:"white",borderRadius:10,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
        <div style={{display:"grid",gridTemplateColumns:"60px 2.5fr 80px 90px 100px 110px 90px",background:"#EEF3FB",padding:"9px 14px",fontSize:11,fontWeight:700,color:"#00338D",borderBottom:"1px solid #E5E7EB"}}>
          <span>ID</span><span>Issue Description</span><span>Category</span><span>Severity</span><span>Owner</span><span>Due Date</span><span>Status</span>
        </div>
        {filteredI.map((iss,idx)=>{const sevC=iss.sev==="High"?"#DC2626":iss.sev==="Medium"?"#D97706":"#059669";const stStyle=statusColors[iss.status]||statusColors.Open;
          return<div key={iss.id} style={{display:"grid",gridTemplateColumns:"60px 2.5fr 80px 90px 100px 110px 90px",padding:"10px 14px",borderTop:idx>0?"1px solid #F3F4F6":"none",alignItems:"start",background:editMode?"#FAFBFF":"white"}}>
            <span style={{fontSize:11,fontWeight:700,color:"#9CA3AF"}}>{iss.id}</span>
            <div>{editMode?<textarea defaultValue={iss.desc} onBlur={e=>updateIssue(iss.id,"desc",e.target.value)} style={{width:"100%",fontSize:11,border:"1px solid #BFDBFE",borderRadius:5,padding:"4px 6px",fontFamily:"inherit",resize:"vertical",minHeight:40,background:"white",color:"#1F2937"}}/>
              :<><p style={{fontSize:12,fontWeight:700,color:"#1F2937",marginBottom:3,textAlign:"left"}}>{iss.desc}</p><p style={{fontSize:11,color:"#9CA3AF",lineHeight:1.4,textAlign:"left"}}>{iss.action}</p></>}</div>
            <span style={{fontSize:11,color:"#6B7280"}}>{iss.cat}</span>
            <span style={{fontSize:11,fontWeight:700,color:sevC}}>{iss.sev}</span>
            {editMode?<input defaultValue={iss.owner} onBlur={e=>updateIssue(iss.id,"owner",e.target.value)} style={{fontSize:11,border:"1px solid #BFDBFE",borderRadius:5,padding:"3px 6px",width:"90px",color:"#374151"}}/>
              :<span style={{fontSize:11,color:"#374151",fontWeight:600}}>{iss.owner}</span>}
            {editMode?<input defaultValue={iss.dueDate} onBlur={e=>updateIssue(iss.id,"dueDate",e.target.value)} style={{fontSize:11,border:"1px solid #BFDBFE",borderRadius:5,padding:"3px 6px",width:"100px",color:"#374151"}}/>
              :<span style={{fontSize:11,color:"#374151",fontWeight:600}}>{iss.dueDate}</span>}
            {editMode?<select defaultValue={iss.status} onBlur={e=>updateIssue(iss.id,"status",e.target.value)} style={{fontSize:11,border:"1px solid #BFDBFE",borderRadius:5,padding:"3px 4px",color:"#374151"}}>{["Open","In Progress","Closed","Monitor"].map(v=><option key={v}>{v}</option>)}</select>
              :<span style={{fontSize:10,background:stStyle.bg,color:stStyle.txt,padding:"2px 8px",borderRadius:8,fontWeight:700}}>{iss.status}</span>}
          </div>;})}
      </div>
    </>}
  </div>;}

// ─── TSA TAB ─────────────────────────────────
function TSATab({program,onSelect}){
  const inits=program?.initiatives||INITIATIVES;
  const earlyExit=inits.filter(i=>i.tsa);
  const [filter,setFilter]=useState("");
  const filtered=earlyExit.filter(i=>!filter||(tsaReadiness(i)===filter));
  const grouped={};filtered.forEach(i=>{const q=i.tsaQ||"TBD";if(!grouped[q])grouped[q]=[];grouped[q].push(i);});
  const qO={"Q3 FY27":1,"Q4 FY27":2,"Q1 FY28":3,"Q2 FY28":4,"Q3 FY28":5,"Q2 FY28":6,"Q1 FY29":7};
  const quarters=Object.keys(grouped).sort((a,b)=>(qO[a]||9)-(qO[b]||9));
  return<div style={{padding:20}}>
    <div style={{marginBottom:12,background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:10,padding:"12px 16px"}}>
      <p style={{fontSize:13,fontWeight:700,color:"#1E40AF",marginBottom:2}}>📌 All {inits.length} initiatives are under Global Corp TSA</p>
      <p style={{fontSize:12,color:"#3730A3",lineHeight:1.5}}><strong>[B] Early Exit</strong> = Global Corp exits that service before the standard 3-year term. <strong>[A] Tech Dep</strong> = technical prerequisite. Standard TSA runs through Q3 FY29.</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:10,marginBottom:14}}>
      {[{l:"Total Under TSA",v:inits.length,c:"#00338D"},{l:"Early Exit [B]",v:earlyExit.length,c:"#7C3AED"},{l:"Critical",v:earlyExit.filter(i=>tsaReadiness(i)==="Critical").length,c:"#DC2626"},{l:"At Risk",v:earlyExit.filter(i=>tsaReadiness(i)==="At Risk").length,c:"#CA8A04"},{l:"On Track",v:earlyExit.filter(i=>tsaReadiness(i)==="On Track").length,c:"#16A34A"}].map((s,i)=>(
        <div key={i} style={{background:"white",borderRadius:10,padding:"12px 14px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",borderTop:`3px solid ${s.c}`}}>
          <p style={{fontSize:10,color:"#9CA3AF",textTransform:"uppercase",fontWeight:700,marginBottom:4,lineHeight:1.3}}>{s.l}</p>
          <p style={{fontSize:22,fontWeight:800,color:s.c}}>{s.v}</p>
        </div>))}
    </div>
    <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
      {["","Critical","At Risk","On Track"].map(v=><button key={v} onClick={()=>setFilter(v)} style={{padding:"5px 12px",border:"1px solid",borderRadius:20,fontSize:12,cursor:"pointer",fontWeight:600,borderColor:filter===v?"#00338D":"#E5E7EB",background:filter===v?"#00338D":"white",color:filter===v?"white":"#374151"}}>{v||"All"}</button>)}
    </div>
    {quarters.map(q=>{const items=grouped[q];const urgColor=["Q3 FY27","Q4 FY27"].includes(q)?"#DC2626":q.includes("FY28")?"#D97706":"#059669";
      return<div key={q} style={{marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{background:urgColor,color:"white",padding:"3px 12px",borderRadius:12,fontSize:12,fontWeight:700}}>{q}</span><span style={{fontSize:12,color:"#6B7280"}}>{items.length} exits</span></div>
        <div style={{background:"white",borderRadius:10,overflow:"hidden",border:"1px solid #E5E7EB",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 2fr 70px 90px 70px",background:"#EEF3FB",padding:"8px 14px",fontSize:11,fontWeight:700,color:"#00338D",borderBottom:"1px solid #E5E7EB"}}><span>Initiative</span><span>Service Exiting</span><span>Progress</span><span>Readiness</span><span>Action</span></div>
          {items.map((init,idx)=>{const r=tsaReadiness(init);const rs=READY_S[r]||{bg:"#F3F4F6",txt:"#374151"};const cc=CATS[init.cat]?.color||"#00338D";
            return<div key={init.id} style={{display:"grid",gridTemplateColumns:"2fr 2fr 70px 90px 70px",padding:"10px 14px",borderTop:idx>0?"1px solid #F3F4F6":"none",alignItems:"center"}}>
              <div><p style={{fontWeight:700,fontSize:12,color:"#1F2937",marginBottom:2}}>{init.name}</p><span style={{background:cc+"1A",color:cc,fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:6}}>{init.cat}</span></div>
              <p style={{fontSize:11,color:"#6B7280",lineHeight:1.4,paddingRight:8}}>{init.tsaSvc}</p>
              <div><p style={{fontSize:10,color:"#9CA3AF",marginBottom:2}}>{init.prog}%</p><Bar v={init.prog} color="#83BD41"/></div>
              <span style={{background:rs.bg,color:rs.txt,padding:"3px 8px",borderRadius:8,fontSize:11,fontWeight:700}}>{r}</span>
              <button onClick={()=>onSelect(init)} style={{background:"#00338D",color:"white",border:"none",padding:"5px 10px",borderRadius:5,fontSize:11,fontWeight:700,cursor:"pointer"}}>View →</button>
            </div>;})}
        </div>
      </div>;})}
  </div>;}

// ─── FINANCE TAB ─────────────────────────────
function FinanceTab({program,onSelect}){
  const inits=program?.initiatives||INITIATIVES;
  const [fCat,setFCat]=useState("");const [sort,setSort]=useState("bp");
  const totalBp=inits.reduce((s,i)=>s+i.bp,0);
  const totalBs=inits.reduce((s,i)=>s+i.bs,0);
  const totalPtd=inits.reduce((s,i)=>s+Math.round(i.bp*i.prog/100),0);
  const totalVar=totalPtd-totalBs;
  const filtered=inits.filter(i=>!fCat||i.cat===fCat).sort((a,b)=>sort==="name"?a.name.localeCompare(b.name):(b[sort]||0)-(a[sort]||0));
  return<div style={{padding:20}}>
    <h2 style={{fontSize:16,fontWeight:800,color:"#00338D",marginBottom:14}}>Finance</h2>
    {/* KPI cards */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:14}}>
      {[
        {l:"Total Budget",    v:`₹${totalBp}Cr`,       c:"#00338D"},
        {l:"Planned Till Date",v:`₹${totalPtd}Cr`,     c:"#7C3AED"},
        {l:"Actual Spent",   v:`₹${totalBs}Cr`,        c:"#0284C7"},
        {l:"Variance vs PTD",v:`₹${Math.abs(totalVar)}Cr ${totalVar>=0?"under":"over"}`,c:totalVar>=0?"#059669":"#DC2626"},
        {l:"Utilisation",    v:`${Math.round(totalBs/totalBp*100)||0}%`, c:"#D97706"},
      ].map((s,i)=>(
        <div key={i} style={{background:"white",borderRadius:10,padding:"12px 14px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",borderTop:`3px solid ${s.c}`}}>
          <p style={{fontSize:10,color:"#9CA3AF",textTransform:"uppercase",fontWeight:700,marginBottom:4,lineHeight:1.3}}>{s.l}</p>
          <p style={{fontSize:18,fontWeight:800,color:s.c}}>{s.v}</p>
        </div>))}
    </div>
    {/* Filters */}
    <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
      <select value={fCat} onChange={e=>setFCat(e.target.value)} style={{...INP,width:"auto",padding:"7px 10px"}}>
        <option value="">All Categories</option>
        {Object.keys(CATS).map(c=><option key={c}>{c}</option>)}
      </select>
      <select value={sort} onChange={e=>setSort(e.target.value)} style={{...INP,width:"auto",padding:"7px 10px"}}>
        <option value="bp">Budget ↓</option><option value="bs">Spent ↓</option><option value="name">Name</option>
      </select>
    </div>
    {/* Table */}
    <div style={{background:"white",borderRadius:10,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
      <div style={{display:"grid",gridTemplateColumns:"2fr 0.5fr 0.9fr 1fr 1fr 1.1fr",background:"#EEF3FB",padding:"8px 14px",fontSize:11,fontWeight:700,color:"#00338D",borderBottom:"1px solid #E5E7EB"}}>
        <span>Initiative</span><span>Wave</span><span>Total Budget</span><span>Planned Till Date</span><span>Actual Spent</span><span>Variance vs PTD</span>
      </div>
      {filtered.map((init,idx)=>{
        const cc=CATS[init.cat]?.color||"#00338D";
        const pct=init.bp>0?Math.round(init.bs/init.bp*100):0;
        const ptd=Math.round(init.bp*init.prog/100);
        const vv=ptd-init.bs;
        return<div key={init.id} onClick={()=>onSelect(init)}
          style={{display:"grid",gridTemplateColumns:"2fr 0.5fr 0.9fr 1fr 1fr 1.1fr",padding:"9px 14px",borderTop:idx>0?"1px solid #F3F4F6":"none",alignItems:"center",cursor:"pointer"}}
          onMouseEnter={e=>e.currentTarget.style.background="#F8FAFC"}
          onMouseLeave={e=>e.currentTarget.style.background="white"}>
          <div>
            <p style={{fontWeight:700,fontSize:12,color:"#1F2937",marginBottom:2,textAlign:"left"}}>{init.name}</p>
            <span style={{background:cc+"1A",color:cc,fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:6}}>{init.cat}</span>
          </div>
          <span style={{fontSize:11,color:"#6B7280",fontWeight:600}}>W{init.wave}</span>
          <span style={{fontSize:12,fontWeight:700,color:"#374151"}}>₹{init.bp}Cr</span>
          <div>
            <p style={{fontSize:12,fontWeight:700,color:"#7C3AED"}}>₹{ptd}Cr</p>
            <p style={{fontSize:9,color:"#9CA3AF"}}>{init.prog}% progress</p>
          </div>
          <div>
            <p style={{fontSize:10,color:"#9CA3AF",marginBottom:2}}>₹{init.bs}Cr ({pct}%)</p>
            <div style={{background:"#E5E7EB",borderRadius:3,height:4}}>
              <div style={{width:`${Math.min(pct,100)}%`,background:pct>90?"#DC2626":pct>70?"#CA8A04":"#83BD41",height:"100%",borderRadius:3}}/>
            </div>
          </div>
          <div>
            <p style={{fontSize:11,fontWeight:700,color:vv>=0?"#059669":"#DC2626"}}>₹{Math.abs(vv).toFixed(1)}Cr {vv>=0?"under":"over"}</p>
            <p style={{fontSize:9,color:"#9CA3AF"}}>vs ₹{ptd}Cr PTD</p>
          </div>
        </div>;
      })}
    </div>
  </div>;}


// ─── ARB TAB ─────────────────────────────────
function ARBTab(){
  const [activeSection,setActiveSection]=useState("overview");
  const sections=[{id:"overview",label:"Overview & Team"},{id:"process",label:"Submission Process"},{id:"principles",label:"Integration Principles"},{id:"register",label:"Decision Register"}];
  const decisionColor={Approved:"#059669","Approved with Conditions":"#D97706",Deferred:"#9CA3AF",Rejected:"#DC2626"};
  return<div style={{padding:20}}>
    <div style={{marginBottom:16}}><h2 style={{fontSize:16,fontWeight:800,color:"#00338D",marginBottom:2}}>Architecture Review Board</h2>
      <p style={{fontSize:12,color:"#6B7280"}}>Standing governance body ensuring architectural consistency and integration integrity across all 25 initiatives</p></div>
    {/* Section nav */}
    <div style={{display:"flex",gap:8,marginBottom:16,borderBottom:"2px solid #E5E7EB",paddingBottom:0}}>
      {sections.map(s=><button key={s.id} onClick={()=>setActiveSection(s.id)} style={{padding:"8px 16px",border:"none",background:"none",fontSize:13,fontWeight:700,cursor:"pointer",color:activeSection===s.id?"#00338D":"#9CA3AF",borderBottom:activeSection===s.id?"3px solid #00338D":"3px solid transparent",marginBottom:-2}}>
        {s.label}</button>)}
    </div>

    {activeSection==="overview"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      {/* Team */}
      <div style={{background:"white",borderRadius:10,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
        <h3 style={{fontSize:14,fontWeight:700,color:"#00338D",marginBottom:14}}>👥 ARB Team Composition</h3>
        {[{role:"Chair",person:"CIO",type:"Decision Authority",badge:"#00338D"},
          {role:"Technical Authority",person:"IT Architecture Lead",type:"Permanent Member — Meeting Secretary",badge:"#7C3AED"},
          {role:"Security",person:"CISO",type:"Permanent Member",badge:"#DC2626"},
          {role:"Data Architecture",person:"Data Architect",type:"Permanent Member",badge:"#0284C7"},
          {role:"Infrastructure",person:"Infrastructure Lead",type:"Permanent Member",badge:"#059669"},
          {role:"ERP Architecture",person:"SAP/ERP Architect",type:"Attending Member — ERP decisions",badge:"#D97706"},
          {role:"Business Representative",person:"Rotating — Finance / Operations / Commercial",type:"1 per meeting",badge:"#9CA3AF"},
          {role:"Programme Oversight",person:"Programme Director",type:"Observer — Escalation path",badge:"#6B7280"},
        ].map((m,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"8px 0",borderBottom:i<7?"1px solid #F3F4F6":"none"}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:m.badge,flexShrink:0,marginTop:4}}/>
          <div style={{flex:1,textAlign:"left"}}><p style={{fontSize:12,fontWeight:700,color:"#1F2937",textAlign:"left"}}>{m.role}</p><p style={{fontSize:11,color:"#6B7280",textAlign:"left"}}>{m.person}</p></div>
          <span style={{fontSize:10,background:"#F3F4F6",color:"#6B7280",padding:"2px 8px",borderRadius:8,textAlign:"left",lineHeight:1.4,flexShrink:0}}>{m.type}</span>
        </div>)}
      </div>
      {/* Cadence + Agenda */}
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div style={{background:"white",borderRadius:10,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
          <h3 style={{fontSize:14,fontWeight:700,color:"#00338D",marginBottom:12}}>📅 Meeting Cadence</h3>
          {[{label:"Standing ARB",detail:"Bi-weekly · Alternate Wednesdays · 2:00 PM – 4:00 PM IST"},
            {label:"Emergency ARB",detail:"48-hour notice · Critical path blockers only"},
            {label:"Quarterly Extended",detail:"Half-day session · Full programme architecture alignment review"},
          ].map((c,i)=><div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:i<2?"1px solid #F3F4F6":"none"}}>
            <span style={{fontSize:16}}>{i===0?"🔄":i===1?"⚡":"📊"}</span>
            <div><p style={{fontSize:12,fontWeight:700,color:"#374151"}}>{c.label}</p><p style={{fontSize:11,color:"#6B7280"}}>{c.detail}</p></div>
          </div>)}
        </div>
        <div style={{background:"white",borderRadius:10,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
          <h3 style={{fontSize:14,fontWeight:700,color:"#00338D",marginBottom:4}}>📋 Standard Agenda</h3>
          <p style={{fontSize:11,color:"#9CA3AF",marginBottom:12}}>Standing ARB — Bi-weekly Wednesdays 2:00–4:00 PM</p>
          {[["Previous decisions & open actions","15 min"],["New solution design submissions (up to 3)","20 min each"],["Architecture exception requests","15 min"],["Integration alignment review","20 min"],["AOB & next meeting prep","10 min"]].map(([item,dur],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<4?"1px solid #F3F4F6":"none"}}>
            <p style={{fontSize:12,color:"#374151",textAlign:"left"}}><span style={{fontWeight:700,color:"#00338D",marginRight:8}}>{i+1}.</span>{item}</p>
            <span style={{fontSize:11,color:"#9CA3AF",whiteSpace:"nowrap",marginLeft:8}}>{dur}</span>
          </div>)}
          <div style={{marginTop:12,padding:"10px 12px",background:"#F0FDF4",borderRadius:7,border:"1px solid #BBF7D0"}}>
            <p style={{fontSize:11,fontWeight:700,color:"#065F46",marginBottom:3}}>📊 Quarterly Extended ARB — Half-day</p>
            <p style={{fontSize:11,color:"#059669"}}>Full programme architecture alignment · All 25 initiatives reviewed · Integration map updated · Next: Q3 FY26</p>
          </div>
        </div>
        {/* Recent Meetings */}
        <div style={{background:"white",borderRadius:10,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",marginTop:12}}>
          <h3 style={{fontSize:14,fontWeight:700,color:"#00338D",marginBottom:12}}>📅 Recent ARB Meetings</h3>
          {[
            {date:"12 Jun FY26",title:"Standing ARB #5",decisions:["Cloud Foundation Azure Landing Zone — Approved (CISO review condition)","IAM MFA mandatory policy — Approved unconditionally"],attendance:"7/8 members"},
            {date:"29 May FY26",title:"Standing ARB #4",decisions:["PLM Windchill SaaS — Approved with conditions (India data residency confirmation required)","Treasury BTP integration — Deferred (resubmit with full design)"],attendance:"8/8 members"},
            {date:"15 May FY26",title:"Standing ARB #3",decisions:["Core Network MPLS architecture — Approved","IAM Azure AD as IdP — Approved"],attendance:"6/8 members"},
          ].map((m,i)=><div key={i} style={{padding:"10px 0",borderBottom:i<2?"1px solid #F3F4F6":"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
              <p style={{fontSize:12,fontWeight:700,color:"#374151",textAlign:"left"}}>{m.title} · {m.date}</p>
              <span style={{fontSize:10,color:"#9CA3AF"}}>{m.attendance}</span>
            </div>
            {m.decisions.map((d,j)=><p key={j} style={{fontSize:11,color:"#6B7280",marginBottom:2,paddingLeft:10,textAlign:"left"}}>→ {d}</p>)}
          </div>)}
        </div>
      </div>
    </div>}

    {activeSection==="process"&&<div style={{background:"white",borderRadius:10,padding:24,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
      <h3 style={{fontSize:14,fontWeight:700,color:"#00338D",marginBottom:6}}>Architecture Design Document (ADD) — Approval Process</h3>
      <p style={{fontSize:12,color:"#6B7280",marginBottom:20}}>All initiative owners must obtain ARB approval before proceeding to build phase. No implementation begins without confirmed ARB sign-off.</p>
      <div style={{display:"flex",flexDirection:"column",gap:0}}>
        {[{step:1,title:"ADD Submission",desc:"Initiative owner submits Architecture Design Document minimum 10 working days before target ARB session. ADD must cover: proposed solution architecture, integration points with other initiatives, data flows, security controls, and any deviation from guiding principles.",icon:"📝",color:"#7C3AED"},
          {step:2,title:"Pre-Review by Technical Authority",desc:"IT Architecture Lead reviews ADD within 3 working days. If incomplete, returned to submitter. If compliant, added to ARB agenda. If concerns exist, flags them in writing before the session so the panel is pre-briefed.",icon:"🔍",color:"#0284C7"},
          {step:3,title:"ARB Presentation",desc:"Initiative owner presents for 15 minutes. Panel Q&A for 5 minutes. Panel deliberates for 5 minutes — presenter may be asked to leave the room for complex decisions.",icon:"🎙",color:"#D97706"},
          {step:4,title:"Decision",desc:"Four possible outcomes: Approved (proceed immediately), Approved with Conditions (proceed but address named items by next ARB), Deferred (resubmit with changes specified), Rejected (fundamental architecture issue — escalate to CIO).",icon:"⚖",color:"#DC2626"},
          {step:5,title:"Decision Register Update",desc:"All decisions logged in ARB Decision Register within 24 hours. Conditions tracked to closure. Initiative owner notified formally. No initiative proceeds to build phase without confirmed ARB Approved status in the register.",icon:"📚",color:"#059669"},
        ].map((s,i)=><div key={i} style={{display:"flex",gap:16,paddingBottom:24,position:"relative"}}>
          {i<4&&<div style={{position:"absolute",left:20,top:44,bottom:0,width:2,background:"#E5E7EB"}}/>}
          <div style={{width:40,height:40,borderRadius:"50%",background:s.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,zIndex:1,fontSize:18}}>{s.icon}</div>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{background:s.color,color:"white",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:12}}>Step {s.step}</span><h4 style={{fontSize:13,fontWeight:700,color:"#1F2937"}}>{s.title}</h4></div>
            <p style={{fontSize:12,color:"#6B7280",lineHeight:1.6}}>{s.desc}</p>
          </div>
        </div>)}
      </div>
    </div>}

    {activeSection==="principles"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      {ARB_PRINCIPLES.map(p=><div key={p.n} style={{background:"white",borderRadius:10,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",borderLeft:`4px solid ${p.type==="Non-negotiable"?"#DC2626":"#D97706"}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{background:"#EEF3FB",color:"#00338D",width:24,height:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0}}>{p.n}</span><h4 style={{fontSize:13,fontWeight:700,color:"#1F2937"}}>{p.title}</h4></div>
          <span style={{fontSize:10,background:p.type==="Non-negotiable"?"#FEE2E2":"#FEF9C3",color:p.type==="Non-negotiable"?"#991B1B":"#92400E",padding:"2px 8px",borderRadius:8,whiteSpace:"nowrap",fontWeight:700,flexShrink:0,marginLeft:8}}>{p.type}</span>
        </div>
        <p style={{fontSize:12,color:"#6B7280",lineHeight:1.6}}>{p.desc}</p>
      </div>)}
      <div style={{gridColumn:"1/-1",background:"#FEF9C3",borderRadius:10,padding:"12px 16px",border:"1px solid #FDE68A"}}>
        <p style={{fontSize:12,fontWeight:700,color:"#92400E",marginBottom:2}}>⚠ Deviation from Non-negotiable Principles</p>
        <p style={{fontSize:12,color:"#78350F"}}>Any proposed deviation from a Non-negotiable principle requires explicit CIO approval documented in the ARB Decision Register. Exception requests must be submitted to the Technical Authority minimum 5 working days before the ARB session. Temporary exceptions expire after 90 days unless renewed.</p>
      </div>
    </div>}

    {activeSection==="register"&&<div>
      <div style={{background:"white",borderRadius:10,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
        <div style={{display:"grid",gridTemplateColumns:"70px 80px 1.5fr 1.5fr 100px 140px 80px",background:"#EEF3FB",padding:"9px 14px",fontSize:11,fontWeight:700,color:"#00338D",borderBottom:"1px solid #E5E7EB"}}>
          <span>ID</span><span>Date</span><span>Initiative</span><span>Topic</span><span>Decision</span><span>Conditions</span><span>Status</span>
        </div>
        {ARB_DECISIONS.map((d,idx)=>{const dc=decisionColor[d.decision]||"#374151";return<div key={d.id} style={{display:"grid",gridTemplateColumns:"70px 80px 1.5fr 1.5fr 100px 140px 80px",padding:"10px 14px",borderTop:idx>0?"1px solid #F3F4F6":"none",alignItems:"start"}}>
          <span style={{fontSize:11,fontWeight:700,color:"#9CA3AF"}}>{d.id}</span>
          <span style={{fontSize:11,color:"#6B7280"}}>{d.date}</span>
          <span style={{fontSize:12,fontWeight:700,color:"#1F2937"}}>{d.initiative}</span>
          <span style={{fontSize:11,color:"#374151"}}>{d.topic}</span>
          <span style={{fontSize:11,fontWeight:700,color:dc}}>{d.decision}</span>
          <span style={{fontSize:11,color:"#6B7280",lineHeight:1.4}}>{d.conditions}</span>
          <span style={{fontSize:10,background:d.status==="Closed"?"#D1FAE5":d.status==="Pending Resubmission"?"#FEE2E2":"#FEF9C3",color:d.status==="Closed"?"#065F46":d.status==="Pending Resubmission"?"#991B1B":"#92400E",padding:"2px 6px",borderRadius:8,fontWeight:700}}>{d.status}</span>
        </div>;})}
      </div>
      <div style={{marginTop:12,background:"white",borderRadius:10,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
        <p style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:8}}>Register Summary</p>
        <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
          {[["Approved",ARB_DECISIONS.filter(d=>d.decision==="Approved").length,"#059669"],["Approved with Conditions",ARB_DECISIONS.filter(d=>d.decision==="Approved with Conditions").length,"#D97706"],["Deferred",ARB_DECISIONS.filter(d=>d.decision==="Deferred").length,"#9CA3AF"],["Rejected",ARB_DECISIONS.filter(d=>d.decision==="Rejected").length,"#DC2626"]].map(([l,v,c])=><div key={l} style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:10,height:10,borderRadius:"50%",background:c,flexShrink:0}}/><span style={{fontSize:12,color:"#374151"}}>{l}: <strong>{v}</strong></span></div>)}
        </div>
      </div>
    </div>}
  </div>;}

// ─── WORKSTREAMS TAB ──────────────────────────
function WorkstreamsTab({program,onSelect}){
  const inits=program?.initiatives||INITIATIVES;
  return<div style={{padding:20}}>
    <h2 style={{fontSize:16,fontWeight:800,color:"#00338D",marginBottom:14}}>Workstreams</h2>
    {Object.entries(CATS).map(([cat,{color,light,border}])=>{
      const catInits=inits.filter(i=>i.cat===cat);
      const avgProg=catInits.length?Math.round(catInits.reduce((s,i)=>s+i.prog,0)/catInits.length):0;
      const totalBudget=catInits.reduce((s,i)=>s+i.bp,0);
      const totalSpent=catInits.reduce((s,i)=>s+i.bs,0);
      const ptd=catInits.reduce((s,i)=>s+Math.round(i.bp*i.prog/100),0);
      const variance=ptd-totalSpent;
      const redCount=catInits.filter(i=>i.rag==="Red").length;
      const amberCount=catInits.filter(i=>i.rag==="Amber").length;
      const openRisks=CROSS_RISKS.filter(r=>r.status==="Open").length;
      return<div key={cat} style={{marginBottom:24}}>
        {/* Workstream header */}
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:color}}/>
          <h3 style={{fontSize:14,fontWeight:700,color:"#374151",flex:1}}>{cat}</h3>
          <span style={{fontSize:11,color:"#9CA3AF"}}>{catInits.length} initiatives · ₹{totalBudget}Cr total</span>
          <span style={{fontSize:12,fontWeight:700,color}}>{avgProg}% avg</span>
        </div>
        {/* Progress bar */}
        <div style={{marginBottom:8}}><Bar v={avgProg} color={color}/></div>
        {/* Consolidated health summary */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:10,background:"white",borderRadius:8,padding:"10px 12px",boxShadow:"0 1px 4px rgba(0,0,0,0.05)",border:`1px solid ${border}`}}>
          <div>
            <p style={{fontSize:9,color:"#9CA3AF",fontWeight:700,textTransform:"uppercase",marginBottom:2}}>Budget</p>
            <p style={{fontSize:12,fontWeight:700,color:color}}>₹{totalSpent}Cr / ₹{totalBudget}Cr</p>
            <p style={{fontSize:9,color:"#9CA3AF"}}>{Math.round(totalSpent/totalBudget*100)||0}% utilised</p>
          </div>
          <div>
            <p style={{fontSize:9,color:"#9CA3AF",fontWeight:700,textTransform:"uppercase",marginBottom:2}}>Variance vs PTD</p>
            <p style={{fontSize:12,fontWeight:700,color:variance>=0?"#059669":"#DC2626"}}>₹{Math.abs(variance)}Cr {variance>=0?"under":"over"}</p>
            <p style={{fontSize:9,color:"#9CA3AF"}}>PTD ₹{ptd}Cr</p>
          </div>
          <div>
            <p style={{fontSize:9,color:"#9CA3AF",fontWeight:700,textTransform:"uppercase",marginBottom:2}}>RAG Status</p>
            <div style={{display:"flex",gap:6}}>
              {redCount>0&&<span style={{fontSize:11,fontWeight:700,color:"#DC2626"}}>🔴 {redCount}</span>}
              {amberCount>0&&<span style={{fontSize:11,fontWeight:700,color:"#CA8A04"}}>🟡 {amberCount}</span>}
              {redCount===0&&amberCount===0&&<span style={{fontSize:11,fontWeight:700,color:"#059669"}}>🟢 All Green</span>}
            </div>
          </div>
          <div>
            <p style={{fontSize:9,color:"#9CA3AF",fontWeight:700,textTransform:"uppercase",marginBottom:2}}>Schedule</p>
            <p style={{fontSize:12,fontWeight:700,color:avgProg>15?"#059669":"#D97706"}}>{avgProg>15?"On Track":"Early Stage"}</p>
            <p style={{fontSize:9,color:"#9CA3AF"}}>{avgProg}% complete</p>
          </div>
        </div>
        {/* Initiative cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:8}}>
          {catInits.map(init=>(
            <div key={init.id} onClick={()=>onSelect(init)}
              style={{background:"white",borderRadius:8,padding:"10px 14px",border:`1px solid ${border}`,cursor:"pointer",display:"flex",alignItems:"center",gap:10}}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,60,0.1)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:12,fontWeight:700,color:"#1F2937",marginBottom:3}}>{init.name}</p>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <RAGBadge rag={init.rag}/>
                  {init.tsa&&<span style={{fontSize:10,background:"#FEF9C3",color:"#92400E",padding:"1px 6px",borderRadius:6,fontWeight:700}}>⚠[B]</span>}
                  <span style={{fontSize:10,color:"#9CA3AF"}}>W{init.wave} · {init.goLive}</span>
                </div>
              </div>
              <div style={{width:50,textAlign:"right"}}>
                <p style={{fontSize:11,fontWeight:700,color,marginBottom:3}}>{init.prog}%</p>
                <Bar v={init.prog} color={color}/>
              </div>
            </div>
          ))}
        </div>
      </div>;
    })}
  </div>;}


// ─── AI INSIGHTS TAB ─────────────────────────
function AIInsightsTab({program,role}){
  const inits=program?.initiatives||INITIATIVES;
  const m=computeMetrics(inits);
  const [chatOpen,setChatOpen]=useState(false);
  const redCount=inits.filter(i=>i.rag==="Red").length;
  const amberCount=inits.filter(i=>i.rag==="Amber").length;
  const totalPtd=inits.reduce((s,i)=>s+Math.round(i.bp*i.prog/100),0);
  const totalBs=inits.reduce((s,i)=>s+i.bs,0);
  const variance=totalPtd-totalBs;
  const preloaded=[
    {cat:"Programme Progress",icon:"📊",color:"#00338D",bg:"#EEF3FB",items:[
      `Overall programme ${m.totalProg}% complete across ${inits.length} initiatives — ${inits.filter(i=>i.prog===100).length} closed, ${redCount} Red, ${amberCount} Amber.`,
      `Wave 1 has ${inits.filter(i=>i.wave===1&&(i.rag==="Red"||i.rag==="Amber")).length} initiatives at risk. Cloud Foundation leads at 58%.`,
      `${m.wave1Behind.length} Wave 1 initiative${m.wave1Behind.length!==1?"s":""} behind plan — resource reallocation recommended to protect Q3 FY26 exits.`,
    ]},
    {cat:"Risk Outlook",icon:"⚠",color:"#DC2626",bg:"#FEF2F2",items:[
      `${CROSS_RISKS.filter(r=>r.score>=15).length} Critical/High risks active. Top risk: TSA Exit — Critical applications (score 25, trending up).`,
      `Data migration complexity remains the single biggest technical risk — early assessment sprints should begin in blueprint phase.`,
      `Resource availability for Business SMEs is below 30% — CIO directive issued but formal commitments not yet confirmed.`,
    ]},
    {cat:"Budget & Finance",icon:"💰",color:"#7C3AED",bg:"#F5F3FF",items:[
      `Total budget ₹${m.totalBp}Cr. Actual spent ₹${totalBs}Cr vs ₹${totalPtd}Cr planned till date — ₹${Math.abs(variance)}Cr ${variance>=0?"under":"over"} plan.`,
      variance>=0
        ? `Spend below plan: verify this is programme momentum (early stage) not delay. Wave 1 initiatives should be ramping now.`
        : `Spend above plan: review cost drivers. Contingency adequacy should be assessed immediately.`,
      `Utilisation at ${Math.round(totalBs/m.totalBp*100)||0}% — appropriate for programme stage. No budget overrun risk at this time.`,
    ]},
    {cat:"TSA & Exits",icon:"🔗",color:"#059669",bg:"#F0FDF4",items:[
      `${m.tsaExpiring} TSA services expiring within 12 months. ${m.criticalTsa.length} classified as Critical readiness.`,
      `All 25 initiatives remain under Global Corp TSA. ${inits.filter(i=>i.tsa).length} have early exit obligations — Wave 1 exits are the immediate priority.`,
      `Product Engineering Platform (PLM) — Red status on critical path for Q3 FY26 exit. Immediate escalation required.`,
    ]},
  ];
  const suggested=[
    "Which Wave 1 initiatives are most at risk of missing TSA deadlines?",
    "What are the top 3 cross-programme dependency risks right now?",
    "Summarise programme health for this week's SteerCo",
    "Which initiatives could turn Red in the next 30 days?",
    "What decisions require SteerCo approval this month?",
    "Are we on track for Day 1 operational independence?",
  ];
  return<div style={{padding:20}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
      <div>
        <h2 style={{fontSize:16,fontWeight:800,color:"#00338D",marginBottom:2}}>AI Insights</h2>
        <p style={{fontSize:12,color:"#6B7280"}}>Computed programme intelligence · Role: {role}</p>
      </div>
      <button onClick={()=>setChatOpen(!chatOpen)} style={{background:chatOpen?"#00338D":"#EEF3FB",color:chatOpen?"white":"#00338D",border:"none",padding:"8px 16px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>
        {chatOpen?"✕ Close Chat":"💬 Ask AI Co-Pilot"}
      </button>
    </div>
    {/* Pre-loaded insight cards */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:chatOpen?16:0}}>
      {preloaded.map((cat,ci)=>(
        <div key={ci} style={{background:"white",borderRadius:10,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",borderTop:`3px solid ${cat.color}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <span style={{fontSize:18}}>{cat.icon}</span>
            <p style={{fontWeight:700,fontSize:13,color:cat.color}}>{cat.cat}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {cat.items.map((item,ii)=>(
              <div key={ii} style={{display:"flex",gap:8,padding:"7px 10px",background:cat.bg,borderRadius:7}}>
                <span style={{fontSize:11,color:"#9CA3AF",fontWeight:700,flexShrink:0,marginTop:1}}>{ii+1}.</span>
                <p style={{fontSize:11,color:"#374151",lineHeight:1.5,textAlign:"left"}}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    {/* Suggested questions */}
    {!chatOpen&&<div style={{background:"white",borderRadius:10,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",marginTop:12}}>
      <p style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:10}}>💬 Suggested questions — click to ask</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
        {suggested.map((q,i)=>(
          <button key={i} onClick={()=>{setChatOpen(true);}} style={{background:"#F8FAFC",border:"1px solid #E5E7EB",borderRadius:8,padding:"8px 12px",fontSize:11,color:"#374151",cursor:"pointer",textAlign:"left",fontWeight:500,transition:"all 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor="#00338D"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="#E5E7EB"}>
            {q}
          </button>
        ))}
      </div>
    </div>}
    {/* Chat panel */}
    {chatOpen&&<div style={{background:"white",borderRadius:10,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",height:420}}>
      <ChatPanel role={role} program={program} onClose={()=>setChatOpen(false)} minimal={true}/>
    </div>}
  </div>;}



// ─── REPORTS TAB ─────────────────────────────
function ReportsTab({program,role}){
  const inits=program?.initiatives||INITIATIVES;
  const [selInit,setSelInit]=useState(null);
  const [editMode,setEditMode]=useState(false);
  const [sent,setSent]=useState(false);
  const handleSend=()=>{setSent(true);setTimeout(()=>setSent(false),3000);};

  // Get WSR content from SAMPLE_CONTENT (same source as artifact modal) or localStorage
  const getWsrContent=(id)=>{
    try{const v=localStorage.getItem(`smo_art_${id}_Weekly_Status_Report`);if(v)return JSON.parse(v).content;}catch{}
    return SAMPLE_CONTENT[id]?.["Weekly Status Report"]||null;
  };
  const [wsrContent,setWsrContent]=useState("");
  useEffect(()=>{if(selInit){setWsrContent(getWsrContent(selInit.id)||"");}}, [selInit]);

  if(!selInit) return<div style={{padding:20}}>
    <div style={{marginBottom:14}}>
      <h2 style={{fontSize:16,fontWeight:800,color:"#00338D",marginBottom:2}}>Reports</h2>
      <p style={{fontSize:12,color:"#6B7280"}}>Weekly Status Reports per initiative — select an initiative to view or update</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}}>
      {inits.map(init=>{
        const hasContent=!!getWsrContent(init.id);
        const cc=CATS[init.cat]?.color||"#00338D";
        return<div key={init.id} onClick={()=>setSelInit(init)}
          style={{background:"white",borderRadius:10,padding:"12px 16px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",cursor:"pointer",borderLeft:`3px solid ${cc}`,display:"flex",alignItems:"center",gap:12}}
          onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)"}
          onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.06)"}>
          <div style={{flex:1}}>
            <p style={{fontSize:12,fontWeight:700,color:"#1F2937",marginBottom:3}}>{init.name}</p>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <RAGBadge rag={init.rag}/>
              <span style={{fontSize:10,color:"#9CA3AF"}}>W{init.wave} · {init.goLive}</span>
            </div>
          </div>
          {hasContent?<span style={{fontSize:10,background:"#D1FAE5",color:"#065F46",padding:"2px 8px",borderRadius:8,fontWeight:700}}>WSR Ready</span>
            :<span style={{fontSize:10,background:"#F3F4F6",color:"#9CA3AF",padding:"2px 8px",borderRadius:8,fontWeight:600}}>Draft</span>}
          <span style={{fontSize:14,color:"#9CA3AF"}}>→</span>
        </div>;
      })}
    </div>
  </div>;

  return<div style={{padding:20}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
      <button onClick={()=>setSelInit(null)} style={{color:"#00338D",background:"none",border:"none",cursor:"pointer",fontWeight:700,fontSize:13,padding:0}}>← All Initiatives</button>
      <span style={{color:"#9CA3AF"}}>/</span>
      <h2 style={{fontSize:15,fontWeight:800,color:"#00338D",margin:0}}>{selInit.name}</h2>
      <div style={{flex:1}}/>
      <button onClick={()=>setEditMode(!editMode)} style={{background:"#EEF3FB",border:"none",color:"#00338D",padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>{editMode?"✕ Close Edit":"✏ Edit"}</button>
      <button onClick={handleSend} style={{background:sent?"#059669":"#00338D",color:"white",border:"none",padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>
        {sent?"✓ Sent!":"📧 Send Report"}
      </button>
    </div>
    <div style={{background:"white",borderRadius:10,padding:"14px 18px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <RAGBadge rag={selInit.rag}/>
          <span style={{fontSize:12,fontWeight:700,color:"#374151"}}>Weekly Status Report</span>
        </div>
        <span style={{fontSize:11,color:"#9CA3AF"}}>Initiative Owner · Live</span>
      </div>
      {wsrContent
        ?editMode
          ?<textarea value={wsrContent} onChange={e=>{setWsrContent(e.target.value);try{localStorage.setItem(`smo_art_${selInit.id}_Weekly_Status_Report`,JSON.stringify({content:e.target.value,ts:new Date().toLocaleString("en-IN")}));}catch{}}} style={{width:"100%",minHeight:400,padding:10,border:"1px solid #E5E7EB",borderRadius:7,fontSize:12,fontFamily:"Arial",background:"white",color:"#1F2937",resize:"vertical",boxSizing:"border-box",lineHeight:1.6}}/>
          :<div style={{background:"#F8FAFC",borderRadius:8,padding:16}}><MD text={wsrContent}/></div>
        :<div style={{textAlign:"center",padding:"32px 20px",border:"2px dashed #E5E7EB",borderRadius:10}}>
          <p style={{fontSize:13,color:"#9CA3AF"}}>No WSR available for this initiative yet.</p>
          <p style={{fontSize:11,color:"#9CA3AF",marginTop:4}}>Generate via Project Artifacts to populate this view.</p>
        </div>}
    </div>
    {sent&&<div style={{position:"fixed",bottom:24,right:24,background:"#059669",color:"white",padding:"10px 20px",borderRadius:10,fontWeight:700,fontSize:13,boxShadow:"0 4px 16px rgba(0,0,0,0.2)"}}>✓ Report sent to defined recipients</div>}
  </div>;}


// ─── ROADMAP TAB ────────────────────────────
function initTimeline(init){
  const qlookup={"Q1 FY27":1,"Q2 FY27":2,"Q3 FY27":3,"Q4 FY27":4,"Q1 FY28":5,"Q2 FY28":6,"Q3 FY28":7,"Q4 FY28":8,"Q1 FY29":9,"Q2 FY29":10,"Q3 FY29":11,"Q4 FY29":12};
  const starts={1:1,2:3,3:6};
  const endQ=qlookup[init.goLive]||11;
  const startQ=Math.min(starts[init.wave]||1, endQ-1);
  return {startQ,endQ,color:CATS[init.cat]?.color||"#374151"};}
const MILESTONES=[
  {q:3, label:"Wave 1 First Exits",   color:"#DC2626"},
  {q:7, label:"Wave 2 First Exits",   color:"#D97706"},
  {q:11,label:"Full TSA Independence",color:"#00338D"},
];
function RoadmapTab({program,onSelect}){
  const inits=program?.initiatives||INITIATIVES;
  const catOrder=Object.keys(CATS);
  return<div style={{padding:20}}>
    <div style={{marginBottom:14}}>
      <h2 style={{fontSize:16,fontWeight:800,color:"#00338D",marginBottom:2}}>Roadmap & Milestones</h2>
      <p style={{fontSize:12,color:"#6B7280"}}>All {inits.length} initiatives across 3-year programme — 12 quarters FY27–FY29</p>
    </div>
    <div style={{background:"white",borderRadius:10,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"190px 1fr",background:"#EEF3FB",borderBottom:"1px solid #E5E7EB"}}>
        <div style={{padding:"10px 14px",fontWeight:700,fontSize:12,color:"#00338D",borderRight:"1px solid #E5E7EB"}}>Initiative</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)"}}>
          {["FY27","FY28","FY29"].map((y,i)=>(
            <div key={y} style={{padding:"10px 0",textAlign:"center",fontWeight:700,fontSize:12,color:"#00338D",borderRight:i<2?"1px solid #E5E7EB":"none",background:i===0?"#EEF3FB":i===1?"#F4F7FB":"#EFF6FF"}}>{y}</div>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"190px 1fr",background:"#F8FAFC",borderBottom:"1px solid #E5E7EB"}}>
        <div style={{borderRight:"1px solid #E5E7EB"}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",position:"relative"}}>
          {QS.map((q,i)=>(
            <div key={q} style={{padding:"4px 0",textAlign:"center",fontSize:9,color:"#9CA3AF",borderRight:i<11?"1px solid #F3F4F6":"none"}}>{q.replace(" FY27","").replace(" FY28","").replace(" FY29","")}</div>
          ))}
          {MILESTONES.map(ms=>(
            <div key={ms.q} style={{position:"absolute",left:`${((ms.q-1)/12)*100}%`,top:0,bottom:0,borderLeft:`2px dashed ${ms.color}`,zIndex:2}}>
              <span style={{position:"absolute",top:0,left:2,fontSize:8,fontWeight:700,color:ms.color,whiteSpace:"nowrap",background:"white",padding:"1px 3px",borderRadius:2}}>{ms.label}</span>
            </div>
          ))}
        </div>
      </div>
      {catOrder.map(cat=>{
        const catInits=inits.filter(i=>i.cat===cat);
        if(!catInits.length) return null;
        const cc=CATS[cat]?.color||"#374151";
        return<React.Fragment key={cat}>
          <div style={{background:"#F8FAFC",padding:"6px 14px",fontSize:10,fontWeight:700,color:cc,textTransform:"uppercase",letterSpacing:0.5,borderTop:"1px solid #E5E7EB",display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:cc}}/>{cat} · {catInits.length} initiatives
          </div>
          {catInits.map(init=>{
            const {startQ,endQ,color}=initTimeline(init);
            const leftPct=(startQ-1)/12*100;const widthPct=(endQ-startQ+1)/12*100;
            return<div key={init.id} style={{display:"grid",gridTemplateColumns:"190px 1fr",borderTop:"1px solid #F3F4F6"}} onClick={()=>onSelect(init)}>
              <div style={{padding:"8px 14px",borderRight:"1px solid #E5E7EB",cursor:"pointer"}}>
                <p style={{fontSize:11,fontWeight:700,color:"#1F2937",marginBottom:2,lineHeight:1.3,textAlign:"left"}}>{init.name}</p>
                <div style={{display:"flex",gap:4,alignItems:"center"}}><RAGBadge rag={init.rag}/>{init.tsa&&<span style={{fontSize:9,background:"#FEF9C3",color:"#92400E",padding:"1px 4px",borderRadius:4,fontWeight:700}}>[B]</span>}</div>
              </div>
              <div style={{position:"relative",height:44,cursor:"pointer"}} onClick={()=>onSelect(init)}>
                {QS.map((_,i)=><div key={i} style={{position:"absolute",left:`${i/12*100}%`,top:0,bottom:0,borderLeft:"1px solid #F9FAFB"}}/>)}
                <div style={{position:"absolute",left:"33.33%",top:0,bottom:0,borderLeft:"1px solid #E5E7EB"}}/>
                <div style={{position:"absolute",left:"66.66%",top:0,bottom:0,borderLeft:"1px solid #E5E7EB"}}/>
                {MILESTONES.map(ms=>(
                  <div key={ms.q} style={{position:"absolute",left:`${((ms.q-1)/12)*100}%`,top:0,bottom:0,borderLeft:`1px dashed ${ms.color}44`,zIndex:1}}/>
                ))}
                <div style={{position:"absolute",left:`${leftPct}%`,width:`${widthPct}%`,top:"50%",transform:"translateY(-50%)",height:20,background:color,borderRadius:3,display:"flex",alignItems:"center",overflow:"hidden",opacity:0.9,zIndex:2}}>
                  <div style={{position:"absolute",left:0,top:0,bottom:0,width:`${init.prog}%`,background:"rgba(0,0,0,0.2)"}}/>
                </div>
              </div>
            </div>;})}
        </React.Fragment>;})}
    </div>
    <div style={{display:"flex",gap:16,marginTop:10,flexWrap:"wrap",alignItems:"center"}}>
      {Object.entries(CATS).map(([cat,{color}])=>(
        <div key={cat} style={{display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:12,height:8,borderRadius:2,background:color}}/><span style={{fontSize:11,color:"#6B7280"}}>{cat}</span>
        </div>))}
      {MILESTONES.map(ms=>(
        <div key={ms.q} style={{display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:12,height:12,borderLeft:`2px dashed ${ms.color}`}}/><span style={{fontSize:11,color:ms.color,fontWeight:700}}>{ms.label}</span>
        </div>))}
    </div>
  </div>;}

// ─── LEFT SIDEBAR ────────────────────────────
const NAV_ITEMS=[
  {id:"overview",label:"Executive Overview",icon:"📊"},
  {id:"initiatives",label:"Initiatives",icon:"🗂"},
  {id:"tsa",label:"TSA Management",icon:"🔗"},
  {id:"workstreams",label:"Workstreams",icon:"⚙"},
  {id:"roadmap",label:"Roadmap & Milestones",icon:"📅"},
  {id:"risks",label:"Risks & Issues",icon:"⚠"},
  {id:"arb",label:"Architecture Review",icon:"🏛"},
  {id:"finance",label:"Finance",icon:"💰"},
  {id:"insights",label:"AI Insights",icon:"🤖"},
  {id:"reports",label:"Reports",icon:"📄"},
  {id:"admin",label:"Administration",icon:"⚙",placeholder:true},
];

function LeftSidebar({tab,setTab,program}){
  return<div style={{width:220,minWidth:220,background:"#00338D",display:"flex",flexDirection:"column",height:"100vh",position:"sticky",top:0,overflowY:"auto"}}>
    {/* Logo */}
    <div style={{padding:"16px 16px 12px",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
        <div style={{background:"#83BD41",color:"#00338D",fontWeight:900,fontSize:13,padding:"3px 8px",borderRadius:3}}>KPMG</div>
        <span style={{color:"rgba(255,255,255,0.6)",fontSize:10}}>IT SMO Suite</span>
      </div>
      <p style={{color:"rgba(255,255,255,0.9)",fontSize:11,fontWeight:700,lineHeight:1.3}}>{program?.clientName||"ClientCo"}</p>
      <p style={{color:"rgba(255,255,255,0.5)",fontSize:10}}>Separating from {program?.parentName||"Global Corp"}</p>
    </div>
    {/* Nav */}
    <nav style={{flex:1,padding:"8px 0"}}>
      {NAV_ITEMS.map(item=>{
        const active=tab===item.id;
        return<button key={item.id} onClick={()=>!item.placeholder&&setTab(item.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 16px",border:"none",background:active?"rgba(131,189,65,0.15)":"transparent",borderLeft:active?"3px solid #83BD41":"3px solid transparent",cursor:item.placeholder?"default":"pointer",textAlign:"left",transition:"all 0.15s"}}>
          <span style={{fontSize:16,flexShrink:0,opacity:item.placeholder?0.4:1}}>{item.icon}</span>
          <span style={{fontSize:12,fontWeight:active?700:500,color:active?"#83BD41":item.placeholder?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.75)",flex:1}}>{item.label}</span>
          {item.placeholder&&<span style={{fontSize:9,background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.4)",padding:"1px 5px",borderRadius:6}}>Soon</span>}
        </button>;})}
    </nav>
    {/* Footer */}
    <div style={{padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.1)"}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><div style={{width:6,height:6,borderRadius:"50%",background:"#83BD41"}}/><span style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>Live · AI-Powered</span></div>
      <p style={{fontSize:9,color:"rgba(255,255,255,0.3)"}}>KPMG India · Digital Transformation</p>
    </div>
  </div>;}

// ─── MAIN PLATFORM ───────────────────────────
function MainPlatform({program,onHome,role,setRole}){
  const [tab,setTab]=useState("overview");
  const [selected,setSelected]=useState(null);
  const inits=program?.initiatives||INITIATIVES;

  const goToInit=(init)=>{setSelected(init);};
  const backFromInit=()=>setSelected(null);

  const renderContent=()=>{
    if(selected)return<InitiativeDetail initiative={selected} onBack={backFromInit} role={role} program={program}/>;
    switch(tab){
      case"overview":   return<ExecutiveOverview program={program} onSelect={goToInit} onTabChange={setTab}/>;
      case"initiatives":return<ApplicationsTab program={program} onSelect={goToInit}/>;
      case"tsa":        return<TSATab program={program} onSelect={goToInit}/>;
      case"workstreams": return<WorkstreamsTab program={program} onSelect={goToInit}/>;
      case"roadmap":    return<RoadmapTab program={program} onSelect={goToInit}/>;
      case"risks":      return<RisksTab program={program} onSelect={goToInit}/>;
      case"arb":        return<ARBTab/>;
      case"finance":    return<FinanceTab program={program} onSelect={goToInit}/>;
      case"insights":   return<AIInsightsTab program={program} role={role}/>;
      case"reports":    return<ReportsTab program={program} role={role}/>;
      default:return<div style={{padding:40,textAlign:"center"}}><p style={{fontSize:32,marginBottom:16}}>🚧</p><p style={{fontSize:16,fontWeight:700,color:"#374151"}}>Coming in Phase 2</p><p style={{fontSize:13,color:"#9CA3AF",marginTop:8}}>This module is under development</p></div>;
    }};

  return<div style={{display:"flex",height:"100vh",overflow:"hidden",fontFamily:"Arial, sans-serif"}}>
    <LeftSidebar tab={selected?"":tab} setTab={(t)=>{setTab(t);setSelected(null);}} program={program}/>
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      {/* Top bar */}
      <div style={{background:"white",borderBottom:"1px solid #E5E7EB",padding:"8px 16px",display:"flex",alignItems:"center",gap:10,flexShrink:0,zIndex:100}}>
        {selected&&<button onClick={backFromInit} style={{color:"#00338D",background:"none",border:"none",cursor:"pointer",fontWeight:700,fontSize:13,padding:0}}>← Back</button>}
        <p style={{fontSize:13,fontWeight:700,color:"#374151",flex:1}}>{selected?selected.name:NAV_ITEMS.find(n=>n.id===tab)?.label||""}</p>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={onHome} style={{background:"#F3F4F6",border:"none",color:"#6B7280",padding:"4px 10px",borderRadius:16,fontSize:11,cursor:"pointer"}}>🏠 Home</button>
          <select value={role} onChange={e=>setRole(e.target.value)} style={{...INP,width:"auto",padding:"4px 10px",fontSize:11,color:"#1F2937"}}>
            {["PMO Lead","SteerCo","Initiative Owner"].map(r=><option key={r}>{r}</option>)}
          </select>
          <span style={{background:"#D1FAE5",color:"#065F46",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20}}>● Live</span>
        </div>
      </div>
      {/* Main content */}
      <div style={{flex:1,overflowY:"auto",paddingBottom:60,background:"#F4F7FB"}}>
        {renderContent()}
      </div>
    </div>
    <AICoPilotBar program={program} role={role} initiative={selected}/>
  </div>;}

// ─── LANDING PAGE ─────────────────────────────
function LandingPage({onSample,onSetup}){
  const [h1,setH1]=useState(false);const [h2,setH2]=useState(false);
  return<div style={{minHeight:"100vh",background:"linear-gradient(135deg, #00338D 0%, #001F5A 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"Arial, sans-serif"}}>
    <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:40}}>
      <div style={{background:"#83BD41",color:"#00338D",fontWeight:900,fontSize:20,padding:"6px 14px",borderRadius:5}}>KPMG</div>
      <div style={{width:1,height:36,background:"rgba(255,255,255,0.2)"}}/>
      <p style={{color:"rgba(255,255,255,0.7)",fontSize:13,fontWeight:500}}>IT Separation Management Office</p>
    </div>
    <div style={{textAlign:"center",maxWidth:640,marginBottom:52}}>
      <h1 style={{color:"white",fontSize:28,fontWeight:800,lineHeight:1.3,marginBottom:14}}>Welcome to KPMG IT SMO Suite</h1>
      <p style={{color:"#93C5FD",fontSize:15,lineHeight:1.6}}>Managing your end-to-end IT transformation — from separation strategy through to standalone operation</p>
      <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:16,flexWrap:"wrap"}}>
        {["Executive Command Centre","25 Initiatives","ARB Framework","AI-Powered","All Artifacts Pre-Loaded"].map(t=><span key={t} style={{background:"rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.8)",fontSize:11,padding:"3px 10px",borderRadius:20}}>{t}</span>)}
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:20,width:"100%",maxWidth:620}}>
      <div onClick={onSetup} onMouseEnter={()=>setH1(true)} onMouseLeave={()=>setH1(false)} style={{background:"white",borderRadius:14,padding:"28px 24px",cursor:"pointer",boxShadow:h1?"0 12px 40px rgba(0,0,0,0.3)":"0 4px 20px rgba(0,0,0,0.15)",transform:h1?"translateY(-4px)":"none",transition:"all 0.2s",borderTop:"4px solid #83BD41"}}>
        <div style={{width:44,height:44,background:"#F0FDF4",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14,fontSize:22}}>🆕</div>
        <h2 style={{fontSize:15,fontWeight:800,color:"#00338D",marginBottom:8}}>Setup New SMO Program</h2>
        <p style={{fontSize:12,color:"#6B7280",lineHeight:1.6,marginBottom:16}}>Configure your separation programme with guiding principles, initiative roadmap, and TSA structure. AI-assisted where you need it.</p>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{["Guided wizard","AI-assisted","5 steps"].map(t=><span key={t} style={{background:"#F0F9FF",color:"#0284C7",fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:8}}>{t}</span>)}</div>
      </div>
      <div onClick={onSample} onMouseEnter={()=>setH2(true)} onMouseLeave={()=>setH2(false)} style={{background:"white",borderRadius:14,padding:"28px 24px",cursor:"pointer",boxShadow:h2?"0 12px 40px rgba(0,0,0,0.3)":"0 4px 20px rgba(0,0,0,0.15)",transform:h2?"translateY(-4px)":"none",transition:"all 0.2s",borderTop:"4px solid #0284C7"}}>
        <div style={{width:44,height:44,background:"#EFF6FF",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14,fontSize:22}}>📊</div>
        <h2 style={{fontSize:15,fontWeight:800,color:"#00338D",marginBottom:8}}>Sample SMO Program</h2>
        <p style={{fontSize:12,color:"#6B7280",lineHeight:1.6,marginBottom:16}}>ClientCo separating from Global Corp — full executive command centre, 25 initiatives, ARB framework, roadmap, risks, and all artifacts pre-loaded.</p>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{["Executive dashboard","25 initiatives","ARB live","All artifacts","AI insights"].map(t=><span key={t} style={{background:"#F0FDF4",color:"#059669",fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:8}}>{t}</span>)}</div>
      </div>
    </div>
    <p style={{color:"rgba(255,255,255,0.3)",fontSize:11,marginTop:40}}>KPMG India · Digital Transformation Practice · Confidential</p>
  </div>;}

// ─── SETUP WIZARD ─────────────────────────────
function SetupWizard({onComplete,onBack}){
  const [step,setStep]=useState(1);const TOTAL=5;
  const [data,setData]=useState({clientName:"",parentName:"",industry:"Consumer Markets",programName:"",separationDate:"Q3 FY29",description:"",guidingPrinciples:"",initiatives:[],standardTsa:"3",earlyExits:[]});
  const [aiLoading,setAiLoading]=useState(false);
  const fill=()=>setData(d=>({...d,clientName:"ClientCo",parentName:"Global Corp",industry:"Consumer Markets",programName:"ClientCo IT Separation Program",separationDate:"Q3 FY29",description:"ClientCo India separating full IT estate from US parent Global Corp following strategic divestiture."}));
  const aiGen=async()=>{setAiLoading(true);try{const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:800,messages:[{role:"user",content:`Generate 7-8 guiding principles for an IT separation programme where ${data.clientName||"a client"} in ${data.industry} separates from ${data.parentName||"its parent"}. Numbered list format.`}]})});const d=await res.json();setData(prev=>({...prev,guidingPrinciples:d.content?.map(b=>b.text||"").join("")||""}));}catch{}setAiLoading(false);};
  const can=n=>{if(n===1)return data.clientName&&data.parentName&&data.programName;if(n===2)return data.guidingPrinciples;if(n===3)return data.initiatives.length>0;return true;};
  const STEPS=[{n:1,l:"Overview"},{n:2,l:"Principles"},{n:3,l:"Initiatives"},{n:4,l:"TSA"},{n:5,l:"Launch"}];
  return<div style={{minHeight:"100vh",background:"#F4F7FB",fontFamily:"Arial, sans-serif"}}>
    <div style={{background:"#00338D",padding:"12px 20px",display:"flex",alignItems:"center",gap:12}}>
      <div style={{background:"#83BD41",color:"#00338D",fontWeight:900,fontSize:13,padding:"3px 9px",borderRadius:3}}>KPMG</div>
      <p style={{color:"white",fontWeight:700,fontSize:13}}>Setup New SMO Program</p>
      <p style={{color:"#93C5FD",fontSize:11,marginLeft:4}}>Step {step} of {TOTAL}</p>
      <button onClick={onBack} style={{marginLeft:"auto",background:"rgba(255,255,255,0.15)",border:"none",color:"white",padding:"5px 12px",borderRadius:16,fontSize:11,cursor:"pointer"}}>← Home</button>
    </div>
    <div style={{background:"white",borderBottom:"1px solid #E5E7EB",padding:"12px 20px"}}>
      <div style={{display:"flex",gap:0}}>
        {STEPS.map((s,i)=><div key={s.n} style={{display:"flex",alignItems:"center"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:step>s.n?"#83BD41":step===s.n?"#00338D":"#E5E7EB",color:step>=s.n?"white":"#9CA3AF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:step>s.n?12:11,fontWeight:700}}>{step>s.n?"✓":s.n}</div>
            <span style={{fontSize:10,color:step===s.n?"#00338D":"#9CA3AF",fontWeight:step===s.n?700:400}}>{s.l}</span>
          </div>
          {i<STEPS.length-1&&<div style={{width:32,height:2,background:step>s.n?"#83BD41":"#E5E7EB",margin:"0 4px",marginBottom:14}}/>}
        </div>)}
      </div>
    </div>
    <div style={{maxWidth:620,margin:"0 auto",padding:20}}>
      <div style={{background:"white",borderRadius:12,padding:24,boxShadow:"0 1px 5px rgba(0,0,0,0.07)"}}>
        {step===1&&<><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <h2 style={{fontSize:16,fontWeight:800,color:"#00338D"}}>Programme Overview</h2>
            <button onClick={fill} style={{background:"#F0FDF4",color:"#059669",border:"1px solid #BBF7D0",borderRadius:6,padding:"5px 12px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Use Sample Data</button>
          </div>
          {[["clientName","Client Name *","e.g. ClientCo"],["parentName","Parent Company *","e.g. Global Corp"],["programName","Programme Name *","e.g. ClientCo IT Separation Programme"]].map(([k,label,ph])=>(
            <div key={k} style={{marginBottom:14}}><label style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:5,display:"block"}}>{label}</label><input style={INP} placeholder={ph} value={data[k]} onChange={e=>setData(d=>({...d,[k]:e.target.value}))}/></div>))}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
            <div><label style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:5,display:"block"}}>Industry</label><select style={INP} value={data.industry} onChange={e=>setData(d=>({...d,industry:e.target.value}))}>{["Consumer Markets","Manufacturing","Oil & Gas","Aviation","Financial Services"].map(i=><option key={i}>{i}</option>)}</select></div>
            <div><label style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:5,display:"block"}}>Separation Target</label><input style={INP} value={data.separationDate} onChange={e=>setData(d=>({...d,separationDate:e.target.value}))}/></div>
          </div>
          <div><label style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:5,display:"block"}}>Description</label><textarea style={{...INP,height:80,resize:"vertical"}} value={data.description} onChange={e=>setData(d=>({...d,description:e.target.value}))}/></div>
        </>}
        {step===2&&<><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h2 style={{fontSize:16,fontWeight:800,color:"#00338D"}}>Guiding Principles</h2>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setData(d=>({...d,guidingPrinciples:SAMPLE_PRINCIPLES.join("\n")}))} style={{background:"#F0FDF4",color:"#059669",border:"1px solid #BBF7D0",borderRadius:6,padding:"5px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>Use Sample</button>
              <button onClick={aiGen} style={{background:"#EEF3FB",color:"#00338D",border:"1px solid #BFDBFE",borderRadius:6,padding:"5px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{aiLoading?"Generating…":"⚡ AI Generate"}</button>
            </div>
          </div>
          <textarea style={{...INP,height:220,resize:"vertical",fontFamily:"inherit"}} placeholder="Paste principles or use Sample / AI Generate…" value={data.guidingPrinciples} onChange={e=>setData(d=>({...d,guidingPrinciples:e.target.value}))}/></>}
        {step===3&&<><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h2 style={{fontSize:16,fontWeight:800,color:"#00338D"}}>Initiatives</h2>
            <button onClick={()=>setData(d=>({...d,initiatives:INITIATIVES}))} style={{background:"#EEF3FB",color:"#00338D",border:"1px solid #BFDBFE",borderRadius:6,padding:"5px 12px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Load Sample 25</button>
          </div>
          {data.initiatives.length===0?<div style={{textAlign:"center",padding:"32px 20px",border:"2px dashed #E5E7EB",borderRadius:10}}><p style={{fontSize:28,marginBottom:12}}>📋</p><button onClick={()=>setData(d=>({...d,initiatives:INITIATIVES}))} style={{background:"#00338D",color:"white",border:"none",padding:"9px 20px",borderRadius:7,fontSize:13,fontWeight:700,cursor:"pointer"}}>Load Sample 25 Initiatives</button></div>:
            <div style={{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:8,padding:"10px 14px"}}><p style={{fontWeight:700,color:"#166534",fontSize:13}}>{data.initiatives.length} initiatives loaded</p></div>}
        </>}
        {step===4&&<><h2 style={{fontSize:16,fontWeight:800,color:"#00338D",marginBottom:12}}>TSA Structure</h2>
          <p style={{fontSize:12,color:"#6B7280",marginBottom:12}}>All initiatives are under Global Corp TSA. Standard duration: {data.standardTsa} years.</p>
          <div style={{marginBottom:14}}><label style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:5,display:"block"}}>Standard TSA Duration</label>
            <select style={{...INP,width:"auto"}} value={data.standardTsa} onChange={e=>setData(d=>({...d,standardTsa:e.target.value}))}><option value="1">1 Year</option><option value="2">2 Years</option><option value="3">3 Years (Standard)</option></select>
          </div></>}
        {step===5&&<><h2 style={{fontSize:16,fontWeight:800,color:"#00338D",marginBottom:16}}>Review & Launch</h2>
          {[["Client",data.clientName],["Parent",data.parentName],["Industry",data.industry],["Target",data.separationDate],["Initiatives",`${data.initiatives.length} configured`]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #F3F4F6"}}><span style={{fontSize:12,color:"#6B7280",fontWeight:600}}>{k}</span><span style={{fontSize:12,color:"#1F2937",fontWeight:700}}>{v}</span></div>))}
          <div style={{marginTop:16,background:"#EEF3FB",borderRadius:8,padding:"12px 14px"}}><p style={{fontSize:12,color:"#1E40AF",fontWeight:700}}>Ready to launch with full platform access</p></div>
        </>}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:24,paddingTop:16,borderTop:"1px solid #F3F4F6"}}>
          <button onClick={()=>step===1?onBack():setStep(s=>s-1)} style={{background:"#F3F4F6",border:"none",padding:"9px 20px",borderRadius:7,fontSize:13,fontWeight:600,cursor:"pointer",color:"#374151"}}>{step===1?"← Home":"← Back"}</button>
          {step<TOTAL?<button onClick={()=>setStep(s=>s+1)} disabled={!can(step)} style={{background:can(step)?"#00338D":"#E5E7EB",color:can(step)?"white":"#9CA3AF",border:"none",padding:"9px 24px",borderRadius:7,fontSize:13,fontWeight:700,cursor:can(step)?"pointer":"not-allowed"}}>Continue →</button>
          :<button onClick={()=>onComplete({...data,initiatives:data.initiatives.length>0?data.initiatives:INITIATIVES})} style={{background:"#83BD41",color:"#00338D",border:"none",padding:"9px 24px",borderRadius:7,fontSize:13,fontWeight:800,cursor:"pointer"}}>🚀 Launch Programme</button>}
        </div>
      </div>
    </div>
  </div>;}

// ─── APP ROOT ─────────────────────────────────
export default function App(){
  const [screen,setScreen]=useState("landing");
  const [program,setProgram]=useState(null);
  const [role,setRole]=useState("PMO Lead");
  const goSample=()=>{setProgram({clientName:"ClientCo",parentName:"Global Corp",industry:"Consumer Markets",programName:"ClientCo IT Separation Program",separationDate:"Q3 FY29",guidingPrinciples:SAMPLE_PRINCIPLES.join("\n"),initiatives:INITIATIVES,standardTsa:"3"});setScreen("app");};
  const goWizard=()=>setScreen("wizard");
  const launch=data=>{setProgram(data);setScreen("app");};
  const goHome=()=>{setScreen("landing");setProgram(null);setRole("PMO Lead");};
  if(screen==="landing")return<LandingPage onSample={goSample} onSetup={goWizard}/>;
  if(screen==="wizard")return<SetupWizard onComplete={launch} onBack={()=>setScreen("landing")}/>;
  return<MainPlatform program={program} onHome={goHome} role={role} setRole={setRole}/>;}
