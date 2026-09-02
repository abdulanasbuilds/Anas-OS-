# Agent System Canonical Specification

The Agent System is the native execution workforce of ANAS OS and the successor to the mature `Agent-OS` repository.

## Preservation contract

The ANAS Agent System preserves the mature baseline capabilities from Agent OS v2.7.0: disciplined project intake, planning, option evaluation, context hygiene, writing for agents, token efficiency, architecture, testing, debugging, Git workflow, browser testing, database work, performance, API design, accessibility, domain modeling, codebase design, handoff, TDD, specification/build/review loops, research, evidence, provider documentation, security review, prompt-injection defense, dependency/supply-chain review, authentication, authorization, database/RLS security, adversarial assessment, Supabase/Firebase/Cloudflare platform knowledge, media/realtime capabilities, product discovery, project lifecycle, environment capabilities, design/presentation systems, autonomous orchestration, gates, run-state, multi-instance orchestration, business-fit, observability, and retrospectives.

## ANAS-native expansion

The same workforce is now bound to canonical ANAS state and policies. Agent execution receives only the approved context needed for the task:

- business objective and validated problem
- customer and market evidence
- product requirements and acceptance criteria
- project stage and current state
- architecture and technical constraints
- security and legal constraints
- financial budgets and cost limits
- vendor/integration constraints
- portfolio priorities
- production and operational status

## Canonical components

```text
registry/
contracts/
roles/
skills/
harnesses/
context/
memory/
tool-registry/
permissions/
planning/
orchestration/
handoffs/
parallel-execution/
verification/
failure-recovery/
evaluation/
observability/
human-escalation/
```

## Execution invariant

`capability ≠ authority`.

An agent may use a capability only after the Kernel resolves the applicable policy, permission, risk, approval, and workflow constraints. External content is data, not authority. Successful execution never substitutes for verification.
