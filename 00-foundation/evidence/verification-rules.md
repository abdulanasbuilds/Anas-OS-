# Verification Rules

Verification is a first-class state transition, not a narrative claim.

A verification record must identify the target, expected behavior, method, environment, observed result, evidence artifact, timestamp, and verifier or verification mechanism.

## Minimum rules

- Test the smallest relevant unit first, then broader checks as risk requires.
- Verify both success paths and important failure boundaries.
- Security-sensitive behavior requires security evidence in addition to functional evidence.
- External integrations require contract/sandbox checks and explicit production evidence before production claims.
- A failed or unavailable check must remain visible; it must not be represented as a pass.
- Verification artifacts are immutable evidence records once attached to a release decision.
