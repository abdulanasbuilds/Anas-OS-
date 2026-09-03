# ANAS OS execution contract

This repository is governed by ANAS OS. Before changing it:

1. Read `README.md` and `00-foundation/constitution/CONSTITUTION.md`.
2. Inspect the relevant domain, contract, policy, and tests.
3. Define the goal, scope, evidence standard, and approval boundary.
4. Make the smallest coherent change.
5. Run `npm test`, `npm run validate`, `npm run doctor`, and `npm run self-check` as applicable.
6. Inspect failures instead of masking them.
7. Do not commit secrets or credentials.
8. Do not weaken governance, gates, permissions, or security controls to make a task pass.
9. Treat model/provider/harness choices as replaceable implementations.
10. Never claim completion without verification evidence.

For provider-backed operations, prefer configured local/open implementations and respect `07-runtime/config/providers.json`.
