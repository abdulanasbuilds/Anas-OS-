# Kernel

The ANAS OS Kernel is the shared control plane used by every native domain. It owns canonical objects, state transitions, policy evaluation, decisions, risk, approvals, gates, lifecycle, and audit/event semantics.

## Kernel law

Domains provide capabilities; the Kernel provides control and authority. Domains cannot create an alternate lifecycle, policy authority, approval model, or evidence standard.

## Components

- `objects/` — canonical object model and object registry
- `state/` — state model and valid transitions
- `policies/` — policy registry and policy engine
- `decisions/` — decision creation and supersession
- `risk/` — risk scoring and treatment
- `approvals/` — human/autonomous authority checks
- `gates/` — lifecycle gate evaluation
- `lifecycle/` — canonical project lifecycle
- `audit/` — inspectable decision/action records
- `events/` — immutable material state-change events
