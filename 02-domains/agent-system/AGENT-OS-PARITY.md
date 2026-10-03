# Agent OS Parity Contract

ANAS OS is the sole operating system. The Agent System is its native implementation of the capabilities formerly developed in `abdulanasbuilds/Agent-OS`.

## Upstream baseline

- Repository: `abdulanasbuilds/Agent-OS`
- Branch: `main`
- Baseline version: `2.9.0`
- Baseline manifest: `MANIFEST.yml`
- Baseline README: `README.md`

The Agent OS baseline defines the agentic-development doctrine, skills, agents, harness adapters, policies, prompts, templates, references, validators, and orchestration model. Its current README explicitly describes autonomous execution, project lifecycle, design/presentation systems, environment capability detection, security gates, harness portability, and verification requirements.

## Non-negotiable parity rule

Every capability present in Agent OS must exist in ANAS OS as a **native capability**, not merely as a link, submodule, external dependency, or documentation claim.

ANAS OS may rename, reorganize, generalize, or improve an Agent OS capability to fit the ANAS kernel and domain architecture, but it must not silently remove behavior.

When ANAS OS and Agent OS express the same capability differently:

1. ANAS OS governance/constitution remains sovereign.
2. The Agent OS capability must remain functionally represented.
3. ANAS-specific context may extend the capability but must not weaken its safety, evidence, approval, verification, or boundary controls.
4. Improvements to the native ANAS implementation supersede the old Agent OS implementation only after evidence-backed change control.

## Capability families that must remain represented

- Core context, planning, option analysis, agent interaction, context hygiene, agent writing, token efficiency, prompt normalization/rewrite, readable output, workspace boundaries, routing.
- Engineering architecture, testing, debugging, Git workflow/guardrails, browser testing, database work, performance, API design, accessibility, adversarial/grilling review, domain modeling, codebase design, wayfinding, handoffs, TDD, specification, tickets, implementation, code review, triage, diagnosis, merge conflict resolution, pre-commit setup.
- Research, documentation, evidence discipline, provider documentation.
- Security audit/review, prompt-injection defense, supply-chain/dependency review, authentication, authorization, database security, RLS, Firebase rules, permission bridging, adversarial assessment.
- Data/database design, PostgreSQL, migrations.
- Platform integrations for Supabase, Firebase, Firestore, and Cloudflare data.
- Media/video understanding and realtime multimodal work.
- Product/problem discovery and business market-fit analysis.
- Project intake, lifecycle, project-type routing, new project/app/SaaS/business/client/website/web-app/mobile/desktop/CLI/API/library/extension/experiment/prototype flows, GitHub repository handling, workspace bootstrap, task-context bootstrap.
- Environment capability detection, machine bootstrap, browser-first execution, terminal multiplexing.
- Design intake, direction, system, typography, layout, components, references, assets/provenance, motion/animation, frontend/UI/UX audits, variants, anti-AI-slop, responsive/interaction design, reference discovery/library/search, cloning/reconstruction, component sourcing, stack selection, business-aware design, reference-to-production, web/mobile/app/website design.
- Presentation intake, narrative, slide composition, storytelling, typography, speaker notes, assets, accessibility, QA, variants, deck production, cloning/reference analysis.
- Personalization with local-only personal data boundaries.
- Autonomous execution, spec/build/review loops, gates, run state, multi-instance orchestration.
- Operations/observability and retrospectives.
- Agent roles including planner, researcher, architect, builder, debugger, tester, reviewer, security auditor, red-team operator, UX reviewer, performance auditor, release manager, and orchestrator.
- Harness portability for Pi, Claude Code, Codex, and OpenCode.
- Reference catalogs, project templates, checklists, policies, prompts, scripts, and validation tooling.

## Canonical execution model

`UNDERSTAND → CAPABILITY CHECK → PLAN/SPEC → SLICE → IMPLEMENT → VERIFY → REVIEW → REPAIR → SECURITY/RELEASE GATES → COMMIT/PUSH/DEPLOY WHEN AUTHORIZED → VERIFY → REPORT`

ANAS OS must preserve the equivalent controls and evidence transitions even when the implementation is distributed across its kernel and native subsystems.

## Drift control

Any future change that adds or removes Agent OS capability must update this parity contract and the corresponding native ANAS implementation in the same governed change.

The target is not superficial file equality. The target is **behavioral and operational parity, with ANAS OS extending Agent OS rather than regressing it**.
