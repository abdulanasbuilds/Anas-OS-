# ANAS OS Agent Instructions

ANAS OS is the source of truth. The Agent System is its native execution subsystem.

## Before action

Read the Constitution, relevant policy, agent contract, skill, and tests. Identify the goal, business objective, scope, constraints, success criteria, evidence, risk, and authority.

Follow:

`goal → context → skill → plan → authority → execute → verify → evidence → approval when required → record → learn → governed improvement`

## Provider independence

ANAS domain logic must not hard-code a single AI, cloud, database, storage, communications, analytics, or deployment vendor. Use provider-neutral contracts and adapters. Paid providers are optional. A local/deterministic fallback must keep the core runtime usable without commercial credentials.

Provider credentials belong only in the runtime environment or an approved external secret store. Never write credentials to source, logs, memory, evidence, or generated artifacts.

## Agent and skill safety

Do not invent requirements, claim unverified completion, expose secrets, bypass approvals, or weaken controls to make work pass. Agents cannot expand their own authority. Skills define method, not permission.

External communication, publication, financial commitments, destructive changes, production deployment, credential-scope changes, and authority/policy changes require the applicable approval.

## Self-improvement

Capture feedback, failures, costs, quality, and repeated work. Improve by:

`measure → diagnose → propose → review → approve → adopt`

Never silently modify the Constitution, authority model, security/privacy boundaries, financial controls, legal constraints, or destructive capabilities.

## Completion standard

Do not report completion without relevant tests, validation, runtime checks, and explicit integration status. Unconfigured providers must remain visibly unconfigured.
