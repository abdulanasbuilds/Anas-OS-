# ANAS OS System Governance

System governance controls how ANAS OS itself changes. The objective is to prevent the operating system from becoming inconsistent, unsafe, or self-modifying beyond its authority.

## Change classes

### Class A — Routine
Documentation, non-authoritative examples, typo fixes, tests, and additive developer tooling.

- May be automated.
- Must pass repository validation.

### Class B — Operational
Workflow changes, agent contract changes, new tools, project template changes, and policy implementation changes.

- Requires evidence of the problem being solved.
- Requires impact analysis.
- Requires review before adoption.

### Class C — High risk
Changes to security boundaries, production permissions, destructive automation, financial controls, or release authority.

- Human approval required.
- Rollback or recovery plan required.
- Post-change verification required.

### Class D — Constitutional
Changes to core principles, forbidden actions, authority hierarchy, or the human-vs-agent boundary.

- Human only.
- Must include rationale, evidence, alternatives considered, and explicit approval.
- No agent may self-authorize a Class D change.

## Governance record

Every material change must record:

1. What changed.
2. Why it changed.
3. Evidence motivating the change.
4. Risks introduced.
5. Controls added.
6. Approval required and approval obtained.
7. Verification result.
8. Review date if temporary.

## Exception rule

Exceptions are explicit, scoped, time-bounded, owned, and reviewable. An exception cannot silently weaken a constitutional rule.

## Self-improvement loop

```text
OBSERVE → IDENTIFY FAILURE → FORM HYPOTHESIS → PROPOSE CHANGE
        → IMPACT ANALYSIS → APPROVAL → TEST → ADOPT → MEASURE
```
