# ANAS OS Operating Doctrine

This document defines what the 36 ANAS OS domains are responsible for. Implementation can live in code, policy files, project artifacts, or external systems, but ownership must remain explicit.

## 00 Constitution
The highest-order rules. Defines principles, forbidden behavior, evidence honesty, security posture, and the human authority boundary.

## 01 Identity & Context
Maintains stable context about the operator, business strategy, constraints, preferred technology, and operating environment.

## 02 Business
Owns market intelligence, ICP, problem validation, value capture, economics, pricing, and go-to-market logic.

## 03 Product
Turns validated problems into bounded product definitions, UX flows, acceptance criteria, roadmaps, and lifecycle decisions.

## 04 Agent
Provides the AI execution kernel: agents, skills, harnesses, orchestration, permissions, and handoffs.

## 05 Engineering
Defines software architecture, implementation standards, data storage, security engineering, testing, quality, and deployment standards.

## 06 AI Engineering
Defines model selection, prompts, RAG, tool use, agent memory, evaluations, AI safety, and inference economics.

## 07 Project Templates
Reusable starting points for common product classes. Templates are defaults, not requirements.

## 08 Project
Maintains project identity, state, decisions, tasks, risks, dependencies, milestones, and memory.

## 09 Knowledge
Stores durable project and business knowledge, documentation, decisions, patterns, rejected alternatives, and lessons.

## 10 Operations
Runs deployed systems: monitoring, incidents, reliability, support readiness, operational metrics, and continuous improvement.

## 11 Growth
Owns acquisition, sales, onboarding, retention, experimentation, messaging, and growth loops.

## 12 Finance & Cost
Tracks revenue, COGS, infrastructure spend, AI spend, margins, budgets, ROI, and financial risk.

## 13 Legal & Compliance
Tracks applicable legal requirements, contracts, privacy, data handling, licensing, IP, and regulated-domain obligations.

## 14 Release
Controls versioning, release planning, migrations, feature flags, rollout, rollback, and post-release verification.

## 15 Observability
Defines logs, metrics, traces, alerts, audit trails, cost telemetry, and AI telemetry.

## 16 Evaluation
Measures business, product, engineering, security, and AI outcomes against explicit acceptance criteria.

## 17 Failure & Recovery
Classifies failures, coordinates remediation, captures root causes, and turns incidents into preventive controls.

## 18 Command Center
The future aggregation layer for system state. It is intentionally non-UI in this repository; data contracts come first.

## 19 Data
Defines the meaning, lifecycle, ownership, quality, governance, analytics, and safe use of data.

## 20 Research & Intelligence
Continuously monitors markets, competitors, technology, regulations, local operating conditions, and new opportunities using explicit source and confidence standards.

## 21 Customer
Owns customer profiles, journey, feedback, customer health, voice-of-customer, support signals, churn signals, and product opportunities.

## 22 Integration
Owns external providers, API contracts, credentials references, retries, idempotency, webhooks, rate limits, fallbacks, and integration testing.

## 23 Developer Experience
Optimizes project bootstrap, local setup, coding conventions, CLI workflows, debugging, automation, and reusable development assets.

## 24 Security Operations
Continuously manages security posture, vulnerabilities, access, suspicious activity, incidents, and risk.

## 25 Communication
Standardizes internal agent communication, customer communications, sales messages, alerts, escalation, and localization.

## 26 Asset & Content
Controls reusable sales, marketing, brand, product education, and documentation assets through a defined lifecycle.

## 27 Portfolio
Allocates scarce attention, time, money, and engineering capacity across ideas and products. Supports invest/maintain/pivot/pause/kill decisions.

## 28 Experimentation
Converts assumptions into explicit hypotheses, cheap tests, success metrics, time limits, budget limits, and learning records.

## 29 Automation
Connects triggers, workflows, agents, systems, events, permissions, limits, retries, and audit trails.

## 30 Environment & Infrastructure
Controls development, preview, staging, production environments; infrastructure; configuration; infrastructure-as-code; scaling; and cost.

## 31 Procurement & Vendor
Evaluates providers on capability, price, reliability, security, lock-in, local fit, exit strategy, and criticality.

## 32 Support & Service
Provides support intake, classification, triage, resolution, knowledge, SLA expectations, and support intelligence.

## 33 Business Continuity
Protects critical assets and defines backups, recovery objectives, dependency failure plans, and restore testing.

## 34 System Governance
Controls policy changes, risk, exceptions, audits, approvals, and system evolution.

## 35 Meta-OS
Measures ANAS OS itself. It detects failing policies, agent weaknesses, workflow bottlenecks, stale knowledge, unnecessary complexity, and improvement opportunities.

## Cross-domain law

No domain is sovereign by itself. Constitutional rules and governance constraints override domain preferences. A business goal cannot waive security; an agent cannot waive approval; an engineering shortcut cannot invent evidence; and a growth metric cannot justify misleading customers.
