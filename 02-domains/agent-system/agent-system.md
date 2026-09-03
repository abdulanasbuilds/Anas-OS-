# Agent System — Native ANAS Subsystem

The Agent System is the integrated evolution of the existing Agent OS. Existing mature capabilities remain authoritative until superseded through evidence-backed change control.

## Layers
1. Registry: agents, roles, skills, harnesses, tools.
2. Contracts: agent, task, handoff, execution result.
3. Context: project, business, customer, product, finance, legal, security, vendor, evidence, production.
4. Planning: objective decomposition, dependency mapping, acceptance criteria.
5. Orchestration: delegation, sequencing, parallel execution, joins, review loops.
6. Execution: permission checks, tool invocation, bounded retries, cancellation and checkpointing.
7. Verification: artifact checks, tests, evidence collection, acceptance verification.
8. Recovery: classify failure, retry only when safe, compensate or escalate.
9. Evaluation: quality, correctness, reliability, cost, latency, policy adherence.
10. Observability: trace, events, token/tool/cost records, handoffs, decisions, failures.
11. Human escalation: explicit reason, blocked action, required authority, evidence, next safe action.

## Context rule
An agent receives the minimum sufficient context assembled from canonical state. Context is read-only by default and every source is identified with provenance and confidence. Secrets are never injected into general context; tools receive secret references only when authorized.

## Core agent roles
Research, Strategy, Product, Architecture, Database, Frontend, Backend, Security, QA, DevOps/Release, Growth, Finance, Compliance, Customer Success, Documentation, Data, AI Engineering, and Meta/Systems Evolution.

## Execution invariant
`plan → authorize → execute → verify → record → handoff/escalate`.
