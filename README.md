# ANAS OS

**ANAS OS is a unified decision-and-execution operating system for building, launching, operating, and improving technology businesses.**

It is one system, not a collection of separate operating systems. Business, product, engineering, AI, agent execution, data, research, customer, growth, security, finance, operations, and system evolution are native subsystems governed by the same constitutional core, schemas, policies, state, gates, evidence model, and learning loop.

## The central rule

> **One operating system. Many native subsystems. One source of truth.**

An agent runtime is therefore not an independent "Agent OS". A dashboard is not a separate "Command OS". A Meta-OS is not a second authority. They are capabilities implemented inside ANAS OS.

## What ANAS OS does

```text
OPPORTUNITY
    ↓
PROBLEM
    ↓
CUSTOMER + MARKET
    ↓
VALIDATION
    ↓
BUSINESS CASE
    ↓
PRODUCT DEFINITION
    ↓
ARCHITECTURE
    ↓
AGENT-ASSISTED EXECUTION
    ↓
VERIFICATION
    ↓
RELEASE
    ↓
OPERATIONS
    ↓
CUSTOMER FEEDBACK
    ↓
MEASUREMENT
    ↓
LEARNING
    ↓
SYSTEM IMPROVEMENT
```

## Universal decision loop

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

## Native architecture

ANAS OS is organized into 36 native control domains. The numbered domains are subsystems of the same operating system:

- `00` Constitution
- `01` Identity & Context
- `02` Business
- `03` Product
- `04` Agent Execution
- `05` Engineering
- `06` AI Engineering
- `07` Project Templates
- `08` Project Management
- `09` Knowledge
- `10` Operations
- `11` Growth
- `12` Finance & Cost
- `13` Legal & Compliance
- `14` Release
- `15` Observability
- `16` Evaluation
- `17` Failure & Recovery
- `18` Command Center data contracts
- `19` Data
- `20` Research & Intelligence
- `21` Customer
- `22` Integration
- `23` Developer Experience
- `24` Security Operations
- `25` Communication
- `26` Asset & Content
- `27` Portfolio
- `28` Experimentation
- `29` Automation
- `30` Environment & Infrastructure
- `31` Procurement & Vendor
- `32` Support & Service
- `33` Business Continuity
- `34` System Governance
- `35` System Evolution

**Important:** none of these is a competing OS. They are capability domains inside ANAS OS.

## Authority model

```text
                    ANAS OS
                       │
                CONSTITUTION
                       │
                   POLICIES
                       │
             RISK + APPROVAL RULES
                       │
             CANONICAL OBJECT MODEL
                       │
                    STATE
                       │
                  WORKFLOWS
                       │
                  SUBSYSTEMS
                       │
          ┌────────────┼────────────┐
          │            │            │
       BUSINESS       PRODUCT    ENGINEERING
          │            │            │
          └────────────┼────────────┘
                       │
                 AGENT EXECUTION
                       │
             AGENTS / SKILLS / HARNESS
                       │
                     TOOLS
                       │
                   EXECUTION
                       │
                  EVIDENCE
                       │
            METRICS / EVENTS / FEEDBACK
                       │
                    LEARNING
                       │
               SYSTEM EVOLUTION
                       │
                       └──────► ANAS OS
```

## Repository philosophy

The repository implements the operating system. Documentation alone is insufficient: important rules are represented as machine-readable policies, schemas, registries, lifecycle logic, validators, gates, and tests.

## Current scope

The current build deliberately excludes presentation-layer work such as dashboards, CRM UI, settings screens, consumer-facing frontend applications, and similar interface projects. The core focuses on the operating protocols and execution machinery underneath those future interfaces.

## Core source of truth

- Constitution: `/00-constitution`
- Config and domain registry: `/config`
- Policies: `/policies`
- Canonical schemas: `/schemas`
- Workflows: `/workflows`
- Native agent execution: `/04-agent-system`
- Project templates: `/07-project-templates`
- System evolution: `/35-system-evolution`
- Runtime engine: `/src`
- Tests: `/tests`

## Development principle

Start with the smallest reliable mechanism that enforces the rule. Add automation, orchestration, storage, or advanced intelligence only when a real workflow justifies it. ANAS OS should become more capable without becoming needless bureaucracy.
