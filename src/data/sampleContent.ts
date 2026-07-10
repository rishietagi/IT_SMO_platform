// Pre-drafted artifact content, keyed by initiative id → artifact name.
// Extracted verbatim from the original app (SAMPLE_CONTENT). Initiatives 1, 12,
// 17, 18, 20 ship with pre-loaded draft artifacts; all others generate on demand.

export const SAMPLE_CONTENT: Record<number, Record<string, string>> = {
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
