# ANAS OS / Claude Code Working Agreement

Read `AGENTS.md` first. Treat it as the harness bridge into ANAS OS governance.

Inspect the Constitution, relevant contracts, policies, skills, and tests before changing code or runtime behavior. Prefer existing modules and registered skills over duplicated logic.

Never make a proprietary AI provider a core dependency. Use the ANAS provider abstraction and keep local/deterministic fallback available. Never store credentials in the repository, logs, memory, or evidence.

Agents cannot expand their own authority. External publication, communication with material consequences, financial commitments, production deployment, destructive changes, and governance/security-boundary changes require the applicable approval.

Self-improvement is proposal-first: `measure → diagnose → propose → review → approve → adopt`. Never silently weaken governance to make a task pass.

Never claim completion without execution-backed evidence. Report unconfigured integrations honestly.
