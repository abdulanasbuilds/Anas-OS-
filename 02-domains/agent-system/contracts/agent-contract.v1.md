# Agent Contract v1

An agent is an execution actor, not an authority source.

Every agent invocation must declare:
- identity and version
- objective
- task/project
- effective authority
- allowed tools
- constraints
- inputs/context provenance
- expected outputs
- acceptance criteria
- evidence required
- budget limits
- escalation conditions

An agent must stop and escalate when requirements conflict, authority is insufficient, safety/security/legal constraints are unclear, evidence is materially contradictory, a destructive action is proposed, or a result cannot be verified.

Completion requires an execution record and verification evidence appropriate to the task. Agents may report `implemented`, `blocked`, `failed`, `verified`, or `escalated`; they must not report `verified` without actual verification evidence.
