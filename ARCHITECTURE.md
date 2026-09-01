# ANAS OS Architecture

## System boundary

ANAS OS is the governing operating system. Agent OS is an execution subsystem within it.

### ANAS OS governs

- why work should happen;
- what outcome is required;
- business and product constraints;
- policies and permissions;
- evidence requirements;
- gates and approvals;
- measurement;
- learning and system evolution.

### Agent OS executes

- agent selection;
- skill selection;
- harness execution;
- tool use;
- agent handoffs;
- task execution;
- execution reporting.

## Universal decision loop

```text
1. Context
2. Objective
3. Constraints
4. Options
5. Evidence
6. Decision
7. Approval
8. Execution
9. Verification
10. Measurement
11. Feedback
12. Learning
13. System update
```

Not every trivial action needs every stage explicitly. High-impact decisions do.

## Control hierarchy

```text
Constitution
    ↓
Governance
    ↓
Business / Product / Engineering
    ↓
Agent OS
    ↓
Agents / Skills / Harnesses
    ↓
Tools
    ↓
Execution
    ↓
Evidence
    ↓
Metrics / Feedback / Events
    ↓
Intelligence
    ↓
Learning
    ↓
Meta-OS improvement
```

## Architectural laws

1. Policies outrank prompts.
2. Schemas outrank ad-hoc conventions.
3. Evidence outranks claims.
4. Gates outrank convenience.
5. Human authority outranks autonomous execution.
6. Project state must be inspectable.
7. Every irreversible action must have an explicit authorization path.
8. External dependencies must be registered and observable.
9. Automation must be auditable and bounded.
10. The system must degrade gracefully when agents, vendors, models, APIs, or infrastructure fail.

## Build principle

ANAS OS is built incrementally. Do not implement a platform component until there is a concrete workflow that needs it. Prefer a simple documented process first; automate it after repetition and correctness are demonstrated.
