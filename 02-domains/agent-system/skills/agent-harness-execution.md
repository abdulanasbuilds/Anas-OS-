---
id: agent-harness-execution
version: 1.0.0
purpose: Execute work through interchangeable coding/agent harnesses with ANAS governance in control
authority: governed
---

# Agent Harness Execution

Use the harness as an executor, not as the source of truth.

## Loop

`goal → context → plan → authorization → harness execution → verification → evidence → handoff → learning`

## Harness requirements

- Read `AGENTS.md` or `CLAUDE.md` before changing the repository.
- Treat ANAS Constitution, policies, contracts, and gates as higher authority than model preference.
- Keep changes scoped to the approved task.
- Never fabricate tests, sources, metrics, deployments, or completion.
- Prefer small, reversible changes and inspect the diff before commit.
- Run relevant validation before declaring success.
- Escalate credential access, production actions, destructive operations, policy changes, and material external communication.

The harness may choose implementation tactics. It may not expand authority, rewrite governance, or silently modify its own constraints.
