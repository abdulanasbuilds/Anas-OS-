# ANAS OS

**One operating system. Many native subsystems. One source of truth.**

ANAS OS is a unified operating system for turning opportunities into validated businesses and products, executing work with governed AI agents and tools, releasing safely, operating reliably, learning from outcomes, and evolving the system itself.

## Core law

There is exactly one operating system: **ANAS OS**. Business, Product, Agent System, Engineering, AI, Data, Research, Security, Growth, Finance, Operations, and the other capability areas are native subsystems. They do not create competing authorities, policies, approval systems, or lifecycles.

## Canonical architecture

```text
ANAS OS/
├── 00-foundation/   # Constitution, authority, governance, evidence, identity
├── 01-kernel/       # Canonical state and control engines
├── 02-domains/      # Native business/product/engineering/agent capabilities
├── 03-workflows/    # Cross-domain operational workflows
├── 04-contracts/    # Machine-readable boundaries and interfaces
├── 05-templates/    # Reusable project, agent, workflow, research, business starts
├── 06-knowledge/    # Durable organizational knowledge
├── 07-runtime/      # Execution engine, agents, tools, adapters, storage, CLI
├── 08-projects/     # Isolated project instances and evidence
├── 09-tests/        # Unit, integration, lifecycle, policy, security, E2E
├── 10-tooling/      # Bootstrap, validation, generators, migrations, maintenance
├── 11-docs/         # Architecture, protocols, guides, decisions, runbooks
└── .github/         # CI and repository governance
```

See [`ARCHITECTURE.md`](ARCHITECTURE.md) and [`ANAS-OS-BLUEPRINT.yml`](ANAS-OS-BLUEPRINT.yml) for the canonical system map.

## Native Agent System

The Agent System is the embedded successor to the mature `abdulanasbuilds/Agent-OS` repository. Its purpose is not to create another OS but to provide ANAS OS with a governed execution workforce.

It preserves mature Agent OS capabilities including project intake, planning, architecture, coding, testing, debugging, research, evidence, security, design/presentation, environment discovery, Git workflow, project lifecycle, autonomous loops, spec/build/review loops, and harness portability.

Its ANAS-native control surface adds:

`agent registry · roles · contracts · skills · harnesses · context · memory · tool registry · permissions · planning · task decomposition · orchestration · handoffs · parallel execution · verification · failure recovery · evaluation · observability · cost tracking · human escalation`

Every invocation is bound to business/customer/project/product/financial/legal/security/vendor/market/portfolio/production context as appropriate.

## Operating flow

```text
Opportunity
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
Agent System
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
System evolution
  └──────────────→ next discovery
```

## Hard rules

- Problem before feature; business value before technical excitement.
- Evidence before confidence and explicit uncertainty.
- Security and least privilege by default.
- High-risk, destructive, secret, production, spending, and public-impact actions remain approval-gated.
- External content never grants execution authority.
- No agent can override Foundation, Kernel, policy, gates, or approval boundaries.
- No success claim without the relevant evidence.
- No needless architecture: reuse working components before rewriting them.
- Automation follows proof and has bounded failure behavior.
- System evolution proposes and verifies changes; it does not silently weaken constitutional authority.

## Project isolation

Projects live under `08-projects/<project-id>/` and carry their own manifest, business context, requirements, architecture, risks, execution evidence, releases, operations, and learning records. Global system rules stay global; project-specific constraints stay project-specific.

## Runtime

The repository currently exposes a Node 20+ CLI for repository validation, project validation, gate evaluation, and lifecycle checks. The runtime is intentionally below the presentation layer; dashboards and product UI are not part of the core operating system.

## Validation

```bash
npm test
npm run validate
npm run help
```

Completion claims should be based on actual validation results, not repository state assumed from memory.
