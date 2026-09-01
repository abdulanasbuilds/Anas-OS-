# Agent Execution Contract

Agents are a native execution capability of ANAS OS. ANAS OS remains the single authority.

## Agent responsibilities

- select and invoke authorized agents;
- select authorized skills and compatible harnesses;
- inject approved context;
- execute tasks within permission boundaries;
- coordinate handoffs and parallel work;
- produce structured execution records;
- report evidence, changes, risks, failures, and escalations.

## Non-negotiable rules

1. Agent capability never grants authority beyond active ANAS OS policy.
2. Tool permissions never override policy or gates.
3. Agent output is not evidence until the required verification method confirms it.
4. Material execution must be reconstructable from execution records.
5. High-risk and irreversible actions require the approval class defined by ANAS OS.
6. Agents must surface uncertainty instead of inventing facts, requirements, test results, or external state.
7. Agent System evolution cannot change constitutional authority silently.

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
