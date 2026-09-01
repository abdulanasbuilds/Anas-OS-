# Agent OS Execution Kernel Contract

Agent OS is the execution subsystem of ANAS OS. It must never become the authority over constitutional policy, business truth, approval boundaries, or system governance.

## ANAS OS owns

- Objectives and constraints
- Business and product decisions
- Policies and gates
- Agent authority
- Evidence standards
- Approval requirements
- Project state
- Risk acceptance
- System evolution

## Agent OS owns

- Agent runtime
- Skills
- Harness adapters
- Tool execution
- Context injection
- Agent handoffs
- Task execution
- Execution logs
- Failure reporting

## Boundary rules

1. Agent OS may propose actions outside its authority but may not silently execute them.
2. A tool permission does not override ANAS OS policy.
3. Agent output is not automatically evidence; evidence requires the defined verification method.
4. Agents must return structured status, outputs, failures, and requested escalations.
5. Agent OS must preserve enough execution history to reconstruct material actions.
6. Agent OS may be replaced without changing the constitutional model of ANAS OS.

## Required agent result envelope

```json
{
  "taskId":"task-id",
  "status":"completed|blocked|failed|escalated",
  "outputs":[],
  "evidence":[],
  "changes":[],
  "risks":[],
  "nextActions":[],
  "escalation":null
}
```

The execution kernel is replaceable. The governance protocol is not casually replaceable.
