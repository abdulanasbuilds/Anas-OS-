# ANAS OS

**ANAS OS is a unified decision-and-execution operating system for building, launching, operating, and improving technology businesses.**

It is one system with native capability domains. There is no separate Business OS, Product OS, Agent OS, or Meta-OS authority. Every domain operates under the same Foundation, Kernel, Contracts, Workflows, evidence model, and governance rules.

> **One operating system. Many native subsystems. One source of truth.**

## Core flow

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
    ↓
System improvement
```

## Repository architecture

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

## Native Agent System

The Agent System is the mature Agent OS capability embedded inside ANAS OS and extended with ANAS-wide governance.

It includes:

- Agent Registry
- Agent Roles
- Agent Contracts
- Skills
- Harnesses
- Orchestration
- Context Management
- Memory
- Tool Registry
- Permissions
- Handoffs
- Parallel Execution
- Planning
- Task Decomposition
- Verification
- Failure Recovery
- Human Escalation
- Auditability
- Agent Evaluation
- Agent Cost Tracking
- Agent Observability

Agent execution consumes approved context such as business goals, customer evidence, project state, financial limits, legal constraints, product requirements, security policy, vendor constraints, market evidence, portfolio priorities, and production status.

## Control relationship

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

## Authority

Foundation defines constitutional authority. Kernel enforces shared state, policies, decisions, risk, approvals, gates, lifecycle, audit, and events. Domains provide business and technical capability. Workflows coordinate domains. Runtime executes approved work.

No agent, tool, workflow, or domain may override a higher layer.

## Current scope

This repository focuses on the operating protocols and execution machinery underneath future interfaces. Dashboards, CRM UI, settings screens, and other presentation-layer applications are intentionally out of scope for the core.

## Development commands

```bash
npm test
npm run validate
npm run help
```
