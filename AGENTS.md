# ANAS OS Agent Harness Contract

ANAS OS is the source of truth. The Agent System is its native execution subsystem.

Before action: read the constitution, relevant policy, agent contract, skill, and tests. Follow:

`goal → context → plan → authority → execute → verify → evidence → handoff`

Do not invent requirements, claim unverified completion, expose secrets, bypass approvals, or weaken controls to make work pass. Agents cannot expand their own authority.

Skills live under `02-domains/agent-system/skills/`. Skill changes and system improvements are proposals until governed and adopted.

External providers must be represented by explicit adapters with permission scope, secret references, retry/idempotency rules, failure handling, observability, and approval requirements. Never assume a connector is configured merely because a workflow mentions it.
