# ANAS OS Architecture

## 1. System identity

ANAS OS is **one unified operating system** for building, launching, operating, selling, and continuously improving technology businesses.

Business, product, engineering, AI, agent execution, data, security, research, growth, finance, operations, and system evolution are **subsystems of ANAS OS**.

They are not separate operating systems.

This distinction is constitutional:

> There is exactly one authority: ANAS OS.

A subsystem may provide capabilities, but no subsystem may establish its own competing authority, policy hierarchy, approval system, or source of truth.

## 2. Unified control model

```text
                         ANAS OS
                            │
                    CONSTITUTIONAL CORE
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
      POLICIES            STATE              EVIDENCE
         │                  │                  │
         └──────────────────┼──────────────────┘
                            │
                       SUBSYSTEMS
                            │
   ┌────────┬────────┬───────┼───────┬────────┬────────┐
   ▼        ▼        ▼       ▼       ▼        ▼        ▼
Business Product Engineering Agents Data   Security Operations
   │        │        │       │       │        │        │
   └────────┴────────┴───────┼───────┴────────┴────────┘
                            │
                         WORKFLOWS
                            │
                           TOOLS
                            │
                         EXECUTION
                            │
                      VERIFICATION
                            │
                    METRICS + FEEDBACK
                            │
                         LEARNING
                            │
                    SYSTEM EVOLUTION
                            │
                            └──────► ANAS OS
```

## 3. Subsystem law

Every subsystem must:

1. use the canonical ANAS OS object model;
2. obey ANAS OS policies and constitutional rules;
3. consume and produce inspectable state;
4. use the common evidence standard;
5. participate in the universal lifecycle;
6. use the central approval and risk model;
7. expose failure and uncertainty;
8. remain replaceable without creating a second authority;
9. share the common audit and learning model;
10. avoid duplicating another subsystem's source of truth.

## 4. Native subsystems

### Business
Market intelligence, customer economics, validation, pricing, GTM, revenue, and portfolio decisions.

### Product
Discovery, PRDs, requirements, UX, scope, prioritization, acceptance criteria, experimentation, and product lifecycle.

### Agent execution
Agents, skills, harness adapters, context injection, tool execution, handoffs, orchestration, task execution, and execution reporting.

### Engineering
Architecture, frontend, backend, database, infrastructure, testing, code quality, security engineering, and deployment.

### AI engineering
Models, prompts, routing, RAG, tool use, evaluations, AI safety, and AI cost control.

### Data
Data meaning, ownership, quality, governance, lifecycle, analytics, pipelines, and intelligence.

### Research and intelligence
Market, technology, business, competitive, regulatory, and local intelligence.

### Customer
Customer profiles, journey, feedback, health, voice of customer, support signals, and retention intelligence.

### Integration
External APIs, OAuth, webhooks, events, reliability, provider dependencies, and contract testing.

### Operations
Monitoring, reliability, incidents, runbooks, support, release operations, and production readiness.

### Security
Access, vulnerability management, threat modeling, security monitoring, incident response, and auditability.

### Growth and communications
Acquisition, sales, onboarding, retention, content, customer communication, proposals, and outreach.

### Finance and vendor management
Revenue, COGS, margins, budgets, infrastructure/AI spend, vendors, lock-in, and exit planning.

### Continuity and recovery
Backups, RTO/RPO, restore procedures, disaster recovery, and dependency failure handling.

### System evolution
Measurement and controlled improvement of ANAS OS policies, workflows, agents, schemas, templates, knowledge, and processes.

## 5. Universal decision loop

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

Trivial, low-risk actions may use a compressed path. High-impact decisions must preserve the full reasoning/evidence chain.

## 6. Universal project lifecycle

```text
DISCOVER → VALIDATE → DEFINE → BUILD → VERIFY → RELEASE
    → OPERATE → MEASURE → LEARN → DISCOVER
```

No subsystem may bypass lifecycle gates merely because it owns a specialized capability.

## 7. Authority hierarchy

```text
ANAS OS CONSTITUTION
        ↓
ANAS OS POLICIES
        ↓
APPROVAL / RISK BOUNDARIES
        ↓
CANONICAL SCHEMAS + STATE
        ↓
WORKFLOWS
        ↓
SUBSYSTEMS
        ↓
AGENTS / SKILLS / HARNESSES
        ↓
TOOLS
        ↓
EXECUTION
        ↓
EVIDENCE
        ↓
LEARNING
```

Agents are therefore an execution capability **inside ANAS OS**, not a separate operating system.

## 8. Architectural laws

1. One operating system, many native subsystems.
2. Policies outrank prompts and implementation preferences.
3. Schemas outrank ad-hoc conventions.
4. Evidence outranks claims.
5. Gates outrank convenience.
6. Human authority outranks autonomous execution.
7. Project state must be inspectable.
8. Every irreversible action requires an explicit authorization path.
9. External dependencies must be registered and observable.
10. Automation must be bounded, auditable, and recoverable.
11. Subsystems must compose rather than compete.
12. New capabilities belong inside ANAS OS unless there is a demonstrated reason to create a separate external system.
13. Complexity must be earned by real operational need.
14. System evolution must improve the whole system, not optimize one subsystem at the expense of the rest.

## 9. Repository rule

The repository is the implementation of ANAS OS. Directory names such as `04-agent-system` or `35-system-evolution` describe **internal subsystems**, not independent OS products.
