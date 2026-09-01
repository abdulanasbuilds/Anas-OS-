# Approval Matrix

This matrix defines the default authority boundary. A more restrictive project-specific policy wins.

| Action | Default authority | Evidence required |
|---|---|---|
| Read/search/analyze | Autonomous | Source or execution evidence when material |
| Generate documentation | Autonomous | Validation when operationally relied upon |
| Format/lint/type-check | Autonomous | Command output |
| Run tests | Autonomous | Test output |
| Modify application code in approved scope | Autonomous | Diff + checks |
| Add dependency | Approval required | Rationale + security/license/cost review |
| Change database schema | Approval required | Migration + impact analysis + backup/rollback plan |
| Destructive data operation | Human only unless explicitly delegated | Exact scope + backup + approval |
| Change auth/authorization policy | Approval required | Security analysis + tests |
| Change production infrastructure | Approval required | Plan + impact + rollback |
| Production deployment | Approval required | Release gate evidence |
| Send consequential external communication | Approval required | Final content + recipient scope |
| Spend money / create paid vendor commitment | Human only | Explicit authorization |
| Transfer ownership or credentials | Human only | Explicit authorization |
| Bypass security or policy controls | Forbidden | Not applicable |
| Fabricate evidence or completion | Forbidden | Not applicable |

## Escalation rule

When uncertain about authority, escalate rather than assume permission.

## Emergency rule

An emergency path may exist for active incidents, but it must preserve auditability and require post-incident review.
