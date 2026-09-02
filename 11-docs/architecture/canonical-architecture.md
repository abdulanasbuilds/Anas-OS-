# ANAS OS Architecture

**One operating system. Many native subsystems. One source of truth.**

ANAS OS is a unified decision-and-execution operating system for turning opportunities into validated businesses and reliable products, then operating and improving them continuously.

## 1. Canonical physical architecture

```text
ANAS OS/
├── 00-foundation/
│   ├── constitution/
│   ├── governance/
│   ├── evidence/
│   └── identity/
├── 01-kernel/
│   ├── object-model/
│   ├── state/
│   ├── lifecycle/
│   ├── decisions/
│   ├── risk/
│   ├── policies/
│   ├── approvals/
│   ├── gates/
│   ├── audit/
│   └── events/
├── 02-domains/
│   ├── business/
│   ├── product/
│   ├── agent-system/
│   ├── engineering/
│   ├── ai/
│   ├── data/
│   ├── research/
│   ├── customer/
│   ├── integration/
│   ├── operations/
│   ├── security/
│   ├── growth/
│   ├── finance/
│   ├── legal/
│   ├── communication/
│   ├── content/
│   ├── portfolio/
│   ├── experimentation/
│   ├── automation/
│   ├── infrastructure/
│   ├── vendors/
│   ├── support/
│   ├── continuity/
│   └── system-evolution/
├── 03-workflows/
├── 04-contracts/
├── 05-templates/
├── 06-knowledge/
├── 07-runtime/
├── 08-projects/
├── 09-tests/
├── 10-tooling/
├── 11-docs/
└── .github/
```

`config/`, `schemas/`, `policies/`, `agents/`, `workflows/`, `templates/`, and `src/` are implementation concerns that must not become competing top-level authorities. Their canonical contents belong to the layers above.

## 2. Authority model

```text
CONSTITUTION
     ↓
GOVERNANCE + EVIDENCE + IDENTITY
     ↓
KERNEL: canonical state + policies + decisions + risk + approvals + gates + lifecycle + audit/events
     ↓
NATIVE DOMAINS
     ↓
WORKFLOWS
     ↓
TOOLS / ADAPTERS
     ↓
RUNTIME EXECUTION
     ↓
EVIDENCE
     ↓
MEASUREMENT + FEEDBACK
     ↓
LEARNING
     ↓
SYSTEM EVOLUTION
     └──────────────────────→ ANAS OS
```

No domain may override the Foundation or Kernel. Agents and tools are execution capabilities, not authority sources.

## 3. Agent System architecture

The mature `abdulanasbuilds/Agent-OS` repository is the baseline capability source. ANAS OS does not create a second Agent OS; it embeds and extends those capabilities as the native `agent-system` domain.

```text
Existing Agent OS
       ↓
Inventory
       ↓
Preserve mature capabilities
       ↓
Map into canonical ANAS paths
       ↓
Remove duplicate authorities
       ↓
Bind to Kernel policies, state, risk, approvals and gates
       ↓
Add cross-domain context and observability
       ↓
ANAS Agent System
```

The embedded subsystem covers:

```text
registry
roles
contracts
skills
harnesses
context-management
memory
tool-registry
permissions
planning
task-decomposition
orchestration
handoffs
parallel-execution
verification
failure-recovery
evaluation
observability
cost-tracking
human-escalation
```

### ANAS-native agent context

```text
Business context
Customer context
Project state
Financial limits
Legal constraints
Product requirements
Security policies
Vendor constraints
Market evidence
Portfolio priorities
Production status
```

### Agent execution boundary

```text
Agent intent
   ↓
Context resolution
   ↓
Capability check
   ↓
Policy check
   ↓
Risk classification
   ↓
Approval resolution
   ↓
Workflow authorization
   ↓
Tool execution
   ↓
Verification
   ↓
Audit/event record
   ↓
Result / handoff / escalation
```

`capability ≠ authority` and `execution success ≠ verification`.

## 4. Native domain model

Every domain is a capability boundary. Domains may define concepts, procedures, artifacts, metrics, and specialized knowledge, but shared policy, approval, evidence, lifecycle, state, and audit authority remains in the Foundation/Kernel.

The original 36-domain concept is preserved through canonical mappings. Some concerns deliberately merge into shared layers to avoid duplicate operating systems:

- Identity & Context → `00-foundation/identity`
- Project → `08-projects`
- Project Templates → `05-templates`
- Knowledge → `06-knowledge`
- Release → `03-workflows/release` + release domain contracts
- Observability → Kernel audit/events + domain observability
- Evaluation → Agent System evaluation + domain-specific evaluators
- Failure & Recovery → Kernel recovery semantics + domain runbooks
- Command Center → trusted cross-domain state contracts; presentation UI remains outside core
- Developer Experience → `10-tooling` + engineering workflows
- Security Operations → Security domain + incident/security workflows
- Asset & Content → Content domain
- Procurement & Vendor → Vendors domain
- Support & Service → Support domain
- Business Continuity → Continuity domain
- System Governance → Foundation governance
- Meta-OS → System Evolution domain; it can propose changes but cannot silently rewrite authority

## 5. Universal operating lifecycle

```text
Opportunity analysis
       ↓
Business validation
       ↓
Customer research
       ↓
Product definition
       ↓
Architecture
       ↓
Risk analysis
       ↓
AGENT SYSTEM
       ├── Researcher
       ├── Strategist
       ├── Product
       ├── Architect
       ├── Database
       ├── Frontend
       ├── Backend
       ├── AI Engineer
       ├── Security
       ├── QA
       └── Release / DevOps
       ↓
Verification
       ↓
Release
       ↓
Operations
       ↓
Customer feedback
       ↓
Measurement
       ↓
Learning
       ↓
System improvement
       └────────────────────────→ next discovery
```

## 6. Workflow families

Canonical workflows coordinate the domains without becoming new authorities:

- universal decision
- new business / opportunity
- project lifecycle
- product development
- research
- agent execution
- coding / feature development
- testing / verification
- release
- sales
- customer onboarding and feedback
- support
- incident response
- security review
- vendor evaluation
- experimentation
- system improvement

All workflows have inputs, preconditions, authorized actions, outputs, failure paths, escalation rules, and evidence requirements.

## 7. Contract model

Contracts make boundaries machine-readable. They cover:

- objects
- agents
- tools
- workflows
- events
- integrations
- evidence
- approvals

A contract defines required fields, valid states, transition rules, ownership, validation rules, and compatibility expectations.

## 8. Runtime model

Runtime contains execution machinery only. It resolves canonical state and contracts, loads the correct workflow, dispatches agents/tools through scoped permissions, records evidence, and reports outcomes. Runtime must never invent policy or bypass gates.

## 9. Project model

Each project is an isolated stateful instance of ANAS OS with a manifest and lifecycle artifacts. Minimum durable project artifacts are:

`project.manifest.json`, `opportunity-brief.md`, `validation-report.md`, `product-requirements.md`, `architecture.md`, `risk-register.md`, `execution-plan.md`, `verification-report.md`, `release-plan.md`, `operations-runbook.md`, `learning-record.md`.

## 10. System evolution

ANAS OS learns through measured evidence, not self-modification by assumption.

```text
Measure → Diagnose → Propose → Review → Test → Approve → Adopt → Measure
```

Constitutional or authority changes always require explicit human approval and a durable change record.
