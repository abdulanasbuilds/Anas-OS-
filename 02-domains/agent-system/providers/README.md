# ANAS OS Provider Boundary

ANAS OS owns contracts, governance, routing policy, state, evidence, and execution semantics. Providers are replaceable adapters.

## Rules

1. Core ANAS OS must run without a paid AI provider.
2. A provider is never an authority source; the Constitution and governance remain authoritative.
3. Providers must be explicitly enabled before network execution.
4. Credentials come from environment or an external secret manager; never from repository files.
5. Paid providers are opt-in and the default policy prefers local/free execution.
6. Provider failure must produce a bounded failure or fallback state, never silent success.
7. Replacing a provider must not require rewriting agents, skills, workflows, or kernel policy.

## Current adapter shapes

- `ollama-chat`: local Ollama-compatible chat endpoint.
- `openai-compatible`: generic `/v1/chat/completions` and `/v1/audio/transcriptions` endpoints. This can represent many hosted gateways or local servers without coupling ANAS OS to a vendor SDK.

Adding a new provider means implementing the provider adapter contract, registering capabilities, defining credential references, and adding tests. It does not change ANAS agent contracts.
