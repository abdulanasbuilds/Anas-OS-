# ANAS OS Agent Execution System

Agents are a native execution subsystem of ANAS OS. There is no separate Agent OS authority. ANAS OS remains the single operating system, and this subsystem provides agent runtime, skills, harness adapters, tool use, orchestration, handoffs, execution logging, and failure reporting.

## ANAS OS remains authoritative

- Constitution and policies
- Business and product decisions
- Objectives and constraints
- Approval boundaries
- Evidence requirements
- Risk acceptance
- Project state
- System governance
- Evolution of ANAS OS

## Agent execution responsibilities

- Select and invoke authorized agents
- Select authorized skills
- Select compatible execution harnesses
- Inject approved context
- Execute tasks within permission boundaries
- Coordinate handoffs
- Produce structured execution records
- Report evidence, changes, risks, failures, and escalations

## Non-negotiable rules

1. Agent capability never grants authority beyond the active ANAS OS policy.
2. A tool permission never overrides a policy or gate.
3. Agent output is not evidence until the required verification method confirms it.
4. Material execution must be reconstructable from execution records.
5. High-risk and irreversible actions require the approval class defined by ANAS OS.
6. Agents must surface uncertainty instead of inventing facts, requirements, test results, or external state.
7. The execution subsystem may evolve, but constitutional authority remains with ANAS OS governance.

## Result envelope

```json
{
  "taskId": "task-id",
  "status": "completed|blocked|failed|escalated",
  "outputs": [],
  "evidence": [],
  "changes": [],
  "risks": [],
  "nextActions": [],
  "escalation": null
}
```
