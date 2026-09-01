# Project Initialization Protocol

A new project must enter ANAS OS through a controlled initialization sequence.

## Phase 0 — Context capture

Record the operator objective, available resources, constraints, target geography, expected time horizon, and known assumptions.

## Phase 1 — Opportunity

Record the opportunity, problem, target buyer, user, desired outcome, alternatives, and why now.

## Phase 2 — Business gate

Do not authorize product definition until the opportunity has a plausible value-creation and value-capture path and an explicit validation plan.

## Phase 3 — Validation

Collect customer evidence, competitive evidence, local-market evidence where relevant, and willingness-to-pay evidence or a documented reason it cannot yet be collected.

## Phase 4 — Product and architecture

Create the PRD, scope boundaries, acceptance criteria, user flows, architecture, data model, security model, integrations, risk register, and cost envelope.

## Phase 5 — Execution plan

Decompose approved work into tasks. Each task has an owner/agent, inputs, output artifact, acceptance criteria, dependencies, and evidence requirement.

## Phase 6 — Build

Agents implement only approved scope. Changes that materially alter product intent, architecture, security boundaries, cost, or data model must be escalated.

## Phase 7 — Verification

Run type checks, lint, tests, security checks, integration checks, acceptance tests, and manual verification appropriate to risk.

## Phase 8 — Release

Create release notes, deployment plan, rollback plan, migration plan, environment checks, and approval record.

## Phase 9 — Operate

Establish monitoring, support path, backup status, incident path, and operational ownership before considering the product production-ready.

## Phase 10 — Measure and learn

Record business metrics, product metrics, system metrics, cost metrics, customer feedback, incidents, and lessons. Convert lessons into decisions and potential ANAS OS improvements.

## Required project artifacts

```text
project.manifest.json
opportunity-brief.md
validation-report.md
product-requirements.md
architecture.md
risk-register.md
execution-plan.md
verification-report.md
release-plan.md
operations-runbook.md
learning-record.md
```
