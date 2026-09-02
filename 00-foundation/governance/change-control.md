# Change Control

Constitutional, governance, policy, workflow, contract, template, or runtime authority changes follow this sequence:

`proposal → evidence → impact analysis → risk review → approval → implementation → verification → adoption`

Every adopted change records an identifier, author, timestamp, previous version, new version, rationale, affected objects, compatibility impact, approval record, verification evidence, and rollback/containment plan where applicable.

## Protected changes

No agent or workflow may silently weaken security, remove approval boundaries, broaden permissions, alter constitutional authority, erase audit history, or redefine evidence standards.

## Versioning

- Constitution changes require explicit human approval.
- Governance and policy changes require recorded review and approval appropriate to their impact.
- Runtime changes must pass the relevant automated tests and release gates.
- Deprecated rules remain traceable until their retirement record is complete.
