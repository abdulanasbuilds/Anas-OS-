# ANAS OS Architecture

ANAS OS is one operating system for turning opportunities into reliable businesses and products. It contains native capability domains; Business, Product, Agent System, Engineering, and every other domain are subsystems of ANAS OS, not competing operating systems.

## 1. Physical architecture

```text
ANAS OS
├── 00-foundation
│   ├── constitution
│   ├── authority
│   ├── governance
│   ├── evidence
│   └── identity
├── 01-kernel
│   ├── objects
│   ├── state
│   ├── policies
│   ├── decisions
│   ├── risk
│   ├── approvals
│   ├── gates
│   ├── lifecycle
│   ├── audit
│   └── events
├── 02-domains
│   ├── business
│   ├── product
│   ├── agent-system
│   ├── engineering
│   ├── ai
│   ├── data
│   ├── research
│   ├── customer
│   ├── integration
│   ├── operations
│   ├── security
│   ├── growth
│   ├── finance
│   ├── legal
│   ├── communication
│   ├── content
│   ├── portfolio
│   ├── experimentation
│   ├── automation
│   ├── infrastructure
│   ├── vendors
│   ├── support
│   ├── continuity
│   └── system-evolution
├── 03-workflows
├── 04-contracts
├── 05-templates
├── 06-knowledge
├── 07-runtime
├── 08-projects
├── 09-tests
└── 10-tooling
```

## 2. Control flow

```text
                         ANAS OS
                            │
                     ┌──────┴──────┐
                     │             │
                  KERNEL         DOMAINS
                     │             │
                     │       ┌─────┴─────┐
                     │       │           │
                     │     AGENT      BUSINESS
                     │     SYSTEM      PRODUCT
                     │       │        ENGINEERING
                     │       │           ...
                     └───────┼───────────
                             │
                         WORKFLOWS
                             │
                           TOOLS
                             │
                         EXECUTION
```

## 3. Agent System relationship

```text
Existing Agent OS
       ↓
Inventory everything
       ↓
Preserve mature capabilities
       ↓
Remove duplication
       ↓
Connect to ANAS Kernel
       ↓
Add missing capabilities
       ↓
ANAS Agent System
```

The embedded Agent System preserves the mature baseline: Agent Registry, Roles, Contracts, Skills, Harness Adapters, Tool Permissions, Context Injection, Memory, Planning, Task Decomposition, Orchestration, Handoffs, Parallel Execution, Verification, Failure Handling, Human Escalation, Auditability, Evaluation, Cost Tracking, and Observability.

It adds ANAS-native context: Business, Customer, Project, Financial, Legal, Product, Security, Vendor, Market, Portfolio, and Production state.

## 4. Operating lifecycle

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
 ├─ Research Agent
 ├─ Product Agent
 ├─ Architect Agent
 ├─ Database Agent
 ├─ Frontend Agent
 ├─ Backend Agent
 ├─ Security Agent
 ├─ QA Agent
 └─ Release / DevOps Agent
      ↓
Verification
      ↓
Release
      ↓
Operations
      ↓
Customer feedback
      ↓
Learning
```

## 5. Architectural laws

1. ANAS OS is the single authority.
2. Foundation outranks Kernel; Kernel outranks Domains; Domains operate through Workflows; Runtime executes approved work.
3. Agent capability does not grant authority.
4. No domain may create a parallel policy, approval, lifecycle, or evidence authority.
5. Important claims require inspectable evidence.
6. High-risk and irreversible actions require the approval class defined by ANAS OS.
7. System evolution may propose changes but cannot silently rewrite Constitution or authority.
