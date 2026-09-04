# ANAS OS Provider Layer

Providers are replaceable adapters. They are not authorities, policies, or required dependencies of the ANAS OS core.

## Design rules

- Core governance, state, workflows, memory, skills, audit, evidence, and tests run without a commercial provider.
- No skill, agent contract, workflow, or domain policy may require a specific vendor by name unless an explicit integration contract says so.
- Provider credentials are never stored in this repository.
- Provider selection is based on capability, privacy, risk, latency, availability, and cost—not brand loyalty.
- A provider outage must produce a controlled fallback or an explicit `not-configured` / `unavailable` result rather than an invented success.
- External mutations remain subject to ANAS authority and approval rules.
- Replacing one provider must not require rewriting domain logic.

## Capability families

The registry supports provider-neutral families such as `ai`, `transcription`, `storage`, `database`, `email`, `search`, `messaging`, `calendar`, `analytics`, and `deployment`.

The built-in fallback provider is deterministic and local. It exists so the runtime remains executable in a clean clone without paid credentials. It is not presented as equivalent to a generative model.

See `provider-registry.json` for the currently known adapters and their states.
