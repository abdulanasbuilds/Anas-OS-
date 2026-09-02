# Confidence Model

Evidence strength is separate from decision confidence.

| Evidence | Meaning |
|---|---|
| E0 | No meaningful evidence; proposal only |
| E1 | Reasoned argument or internal observation |
| E2 | Source-backed external or first-party evidence |
| E3 | Execution-backed evidence from a controlled check, test, or observed behavior |
| E4 | Production-backed evidence from real operation and measured outcomes |

Confidence is represented separately on a 0–1 scale and must include a reason. Strong claims require evidence appropriate to their impact. Conflicting evidence is preserved rather than silently averaged away.

Required language:

- `implemented`: artifact exists.
- `verified`: relevant check passed.
- `working`: acceptance behavior was observed.
- `production-ready`: release gates passed.
- `deployed`: deployment evidence exists.

Absence of evidence must remain `unknown`; it must not be converted into a negative or positive claim without justification.
