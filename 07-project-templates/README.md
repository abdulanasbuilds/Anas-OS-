# Project Templates

Templates are opinionated starting points, not rigid prescriptions.

## Template classes

- `saas` — multi-tenant web software with authentication, billing, roles, analytics and operational controls.
- `marketplace` — buyer/seller flows, listings, transactions, trust, moderation and payouts.
- `internal-tool` — authenticated operational workflows, tables, approvals, reporting and auditability.
- `mobile-app` — React Native / Expo default, offline-aware behavior, authentication and push notifications where needed.
- `ai-application` — model gateway, prompt/version control, structured outputs, evaluation, cost tracking and safety controls.
- `ecommerce` — catalog, inventory, checkout, payment, fulfillment and customer service.
- `school-management` — schools, students, staff, attendance, grades, fees, reporting and role isolation.
- `healthcare` — high-sensitivity data, explicit access control, auditability and domain-specific compliance review.
- `fintech` — financial transaction integrity, idempotency, reconciliation, fraud controls and strong auditability.
- `crm` — intentionally no UI implementation in this repository; template contracts may be reused by future frontend systems.
- `content-platform` — content lifecycle, publishing, moderation, analytics and search.

## Template contract

Every template should provide:

```text
project manifest
business brief
PRD skeleton
architecture skeleton
security checklist
risk checklist
verification checklist
release checklist
operations runbook skeleton
learning record skeleton
```

Templates should depend on ANAS OS schemas and policies rather than duplicating governance logic.
