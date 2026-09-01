# Evidence Standard

ANAS OS separates **claims** from **evidence**.

## Evidence classes

### E0 — None
An assertion without supporting evidence. Treat as unknown.

### E1 — Reasoned
Derived from known information or explicit assumptions. Useful for hypotheses, not proof.

### E2 — Source-backed
Supported by a reliable external, project, customer, or technical source.

### E3 — Execution-backed
Supported by reproducible command output, tests, logs, deployment records, or other direct execution evidence.

### E4 — Production-backed
Supported by observed production behavior, real customer behavior, financial records, or independently verifiable operational evidence.

## Claim rule

The stronger the claim, the stronger the evidence required.

Examples:

- “The code was written” → diff/commit evidence.
- “The feature works” → relevant tests and acceptance verification.
- “The integration works” → sandbox or production verification appropriate to the integration.
- “Customers want it” → customer evidence, not agent opinion.
- “The business is viable” → actual economic evidence, not a large market-size estimate.

## Completion rule

A task is not complete merely because an agent says it is complete. Completion requires the evidence defined by the task's acceptance criteria and applicable gates.
