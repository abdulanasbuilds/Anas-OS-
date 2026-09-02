# Canonical Authority Model

ANAS OS has one authority model. Subsystems contribute capability; none become a higher-order operating system.

## Authority hierarchy

1. Constitution
2. System governance
3. Approved project policies
4. Approved workflows
5. Agent contracts
6. Task instructions
7. Agent preferences

## Layer boundaries

- Foundation defines what may be done and who may authorize it.
- Kernel evaluates state, policy, decisions, risk, approvals, lifecycle, gates, audit, and events.
- Domains own capability knowledge and domain-specific procedures.
- Workflows coordinate domain capabilities.
- Runtime performs only authorized executable actions.
- Tools are capability endpoints, not sources of authority.

## Agent boundary

An agent may plan, reason, delegate, call tools, produce artifacts, and report outcomes only within the authority returned by the Kernel. A more capable model does not receive more authority merely because it is more capable.

## Escalation

When authority is ambiguous, the default is to stop at the smallest safe boundary and request human authorization for the consequential step.
