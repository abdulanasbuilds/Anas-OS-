---
id: provider-neutral-execution
version: 1.0.0
purpose: Route work across local, free, or paid providers without vendor lock-in
authority: governed
---

# Provider-Neutral Execution

Select providers by capability, privacy, cost, quality, availability, and explicit operator policy.

Default order:

1. local/open-source where practical;
2. configured free or zero-marginal-cost option;
3. paid provider only when explicitly enabled/allowed;
4. human execution when no acceptable provider exists.

Provider adapters must expose bounded errors, timeouts, capability metadata, and configuration state. Never store API keys in skills, registries, project files, or memory.
