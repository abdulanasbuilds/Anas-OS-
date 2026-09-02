# Agent Contract

An agent invocation is a bounded execution contract, not a free-form instruction.

Required fields:

```text
agent_id
role
objective
project_id
current_stage
allowed_scope
approved_tools
required_context
input_artifacts
expected_outputs
acceptance_criteria
risk_level
approval_class
escalation_conditions
verification_plan
budget_or_cost_limit
```

## Contract rules

1. The objective must map to an approved project or system objective.
2. Required context must be sufficient for the decision; irrelevant sensitive data should not be injected.
3. Tool permission is explicit and scoped.
4. High-risk actions inherit the Kernel approval requirement; agents cannot self-approve.
5. Outputs must identify evidence and uncertainty.
6. A handoff requires an inspectable artifact and a clear remaining-action statement.
7. Contract violations block execution or trigger human escalation.

## Completion

An agent reports `blocked`, `partial`, `completed`, or `completed-and-verified`. The final state is evidence-backed and never inferred merely from the absence of an error.
