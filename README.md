# ANAS OS

**ANAS OS is a decision-and-execution operating system for building and running a one-person technology company.**

It is not merely an AI coding framework or a collection of prompts. It governs the full lifecycle from opportunity discovery through business validation, product definition, agent-assisted execution, verification, launch, operations, customer feedback, learning, and system improvement.

## Core model

```text
CONTEXT
  ↓
OBJECTIVE
  ↓
CONSTRAINTS
  ↓
OPTIONS
  ↓
EVIDENCE
  ↓
DECISION
  ↓
APPROVAL
  ↓
EXECUTION
  ↓
VERIFICATION
  ↓
MEASUREMENT
  ↓
FEEDBACK
  ↓
LEARNING
  ↓
SYSTEM UPDATE
```

## Architecture

ANAS OS is organized into 36 control domains:

- 00 Constitution
- 01 Identity & Context OS
- 02 Business OS
- 03 Product OS
- 04 Agent OS
- 05 Engineering OS
- 06 AI Engineering OS
- 07 Project Templates
- 08 Project OS
- 09 Knowledge OS
- 10 Operations OS
- 11 Growth OS
- 12 Finance & Cost OS
- 13 Legal & Compliance OS
- 14 Release OS
- 15 Observability OS
- 16 Evaluation OS
- 17 Failure & Recovery OS
- 18 Command Center
- 19 Data OS
- 20 Research & Intelligence OS
- 21 Customer OS
- 22 Integration OS
- 23 Developer Experience OS
- 24 Security Operations OS
- 25 Communication OS
- 26 Asset & Content OS
- 27 Portfolio OS
- 28 Experimentation OS
- 29 Automation OS
- 30 Environment & Infrastructure OS
- 31 Procurement & Vendor OS
- 32 Support & Service OS
- 33 Business Continuity OS
- 34 System Governance OS
- 35 ANAS OS Meta-OS

## Control hierarchy

```text
ANAS OS
    │
    ▼
CONSTITUTION
    │
    ▼
GOVERNANCE
    │
    ├── BUSINESS
    ├── PRODUCT
    └── ENGINEERING
            │
            ▼
        AGENT OS
            │
            ├── AGENTS
            ├── SKILLS
            └── HARNESSES
                    │
                    ▼
                  TOOLS
                    │
                    ▼
                EXECUTION
                    │
                    ▼
                 EVIDENCE
                    │
                    ▼
             METRICS + FEEDBACK
                    │
                    ▼
                LEARNING
                    │
                    ▼
              META-OS UPDATE
```

## Maturity model

### Level 1 — Foundation
Constitution, Business, Product, Agent, Engineering, Project, Knowledge, and Gates.

### Level 2 — Operational
Operations, Growth, Finance, Customer, Data, Release, Observability, and Security Operations.

### Level 3 — Intelligent
Research, Experimentation, Automation, Portfolio, AI Engineering, and Command Center.

### Level 4 — Self-improving
System Governance, Business Continuity, Meta-OS, policy evolution, agent evolution, workflow evolution, and knowledge evolution.

**Rule:** complexity must be earned by real operational need. ANAS OS must never become an elaborate documentation project detached from actual business execution.

## Repository philosophy

The repository is the implementation of ANAS OS, not ANAS OS itself. The durable assets are its principles, schemas, policies, workflows, evidence standards, and learning loops.

Agent OS is treated as the **execution kernel** inside ANAS OS. ANAS OS governs what should happen, why it should happen, who/what may execute it, what evidence is required, and how the result changes future decisions.

## Source of truth

- Constitution: `/00-constitution`
- Global schemas and object model: `/schemas`
- Policies: `/policies`
- Workflows: `/workflows`
- Project templates: `/07-project-templates`
- Agent execution kernel: `/04-agent-os`
- System evolution: `/35-meta-os`

## Current build strategy

Build the control plane before building a large platform:

1. Establish constitutional rules.
2. Define canonical objects and schemas.
3. Define gates and approval classes.
4. Define project lifecycle and evidence requirements.
5. Integrate the existing Agent OS as the execution layer.
6. Add reusable project templates.
7. Add operational data only when real projects require it.
8. Automate repeatable workflows after they have been proven manually.

This repository should remain useful even when the underlying AI tools, frameworks, vendors, and models change.
