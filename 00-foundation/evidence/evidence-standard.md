# Evidence Standard

Evidence records support claims, transitions, and decisions.

## Levels
- E0: no evidence; claim is unknown.
- E1: reasoned analysis; useful for hypotheses and planning.
- E2: source-backed evidence; external or primary sources are identified.
- E3: execution-backed evidence; a real check, test, tool result, or observed behavior exists.
- E4: production-backed evidence; behavior has been observed in the actual production environment.

The phrase `implemented` means an artifact exists. `verified` requires a relevant check passed. `production-ready` requires the release gate. `deployed` requires deployment evidence. `working` requires observed acceptance behavior.

Conflicting evidence is preserved, not silently averaged away. Missing evidence never counts as positive evidence.
