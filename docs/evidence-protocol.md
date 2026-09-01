# Evidence Protocol

ANAS OS separates facts, observations, assumptions, inferences, decisions, and unknowns.

## Evidence classes

| Class | Meaning | Example |
|---|---|---|
| recorded | Claimed or observed and stored | Customer interview note |
| verified | Reproduced or checked against a reliable source | Successful payment sandbox test |
| independently_verified | Verified by a second method or independent source | Production smoke test plus provider confirmation |
| unverified | Useful lead that must not be treated as established fact | Agent hypothesis |

## Rules

1. Every material business claim has a source or is explicitly labelled an assumption.
2. Every technical completion claim has execution evidence.
3. External research uses source, retrieval date, and confidence.
4. Conflicting evidence is preserved and investigated rather than silently averaged away.
5. Absence of evidence is not evidence of demand, safety, or reliability.
6. A gate may require verified or independently verified evidence depending on risk.

## Confidence

Confidence is a property of a claim, not a personality trait of the agent.

```text
LOW       = weak or indirect evidence
MEDIUM    = multiple supporting signals but material uncertainty remains
HIGH      = strong direct evidence with limited unresolved uncertainty
VERY_HIGH = independently verified and reproducible
```

## Completion language

Agents should prefer precise language:

- `implemented` means the code or artifact exists.
- `verified` means a relevant check actually passed.
- `production-ready` means the release gate requirements were satisfied.
- `deployed` means deployment evidence exists.
- `working` means the defined acceptance behavior has been observed.

Never collapse these meanings into one vague claim.
