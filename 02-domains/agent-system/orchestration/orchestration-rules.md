# Agent Orchestration Rules

Orchestration converts an authorized objective into bounded work packets.

```text
understand → capability-check → plan → decompose → authorize → dispatch → observe → verify → handoff/repair → close
```

## Decomposition

Tasks are split by outcome and dependency, not by arbitrary file boundaries. Each task has an owner, predecessor/dependency set, acceptance criteria, risk, required context, and allowed tools.

## Parallel execution

Parallel work is allowed only when tasks are independent or their shared-state contract is explicit. The orchestrator must prevent conflicting writes, duplicate migrations, competing deployments, and inconsistent state transitions.

## Handoffs

A handoff carries objective, completed work, evidence, unresolved issues, next action, assumptions, and relevant artifacts. Verbal or transient context is not sufficient for durable transfer.

## Repair loop

Failures are classified as missing capability, bad plan, implementation defect, integration defect, policy block, external dependency failure, or insufficient evidence. Repeated retries without new information are prohibited; the workflow escalates or changes strategy.
