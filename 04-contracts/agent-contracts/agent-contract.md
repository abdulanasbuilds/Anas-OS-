# Agent Contract

This is the canonical contract location for Agent System executions. The detailed operational policy lives in `02-domains/agent-system/contracts/agent-contract.v1.md`.

An agent invocation MUST declare identity, version, objective, task/project, authority ceiling, allowed tools, constraints, context provenance, inputs, expected outputs, acceptance criteria, required evidence, budget limits, and escalation conditions.

An agent MUST NOT self-authorize, bypass a kernel policy, fabricate evidence, suppress failures, expose secrets, perform forbidden actions, or claim verification without verification evidence.

The lifecycle is:

`plan → authorize → execute → verify → record → handoff/escalate`

The agent remains subordinate to ANAS OS Constitution, governance, policies, gates, and human approval boundaries at all times.
