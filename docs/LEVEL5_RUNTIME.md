# Level 5 Runtime

ANAS OS supports a governed personal/company operating loop without pretending external integrations are configured.

## Loop

`goal -> context -> skill -> plan -> authority/risk -> execute -> verify -> evidence -> approval -> outcome -> learning -> governed improvement`

## Capability layers

- Agent System: registry, contracts, skills, harness boundary, permissions, context, planning, orchestration, verification, recovery, evaluation, observability.
- Personal Operating Layer: workflow capture, advisor, memory, learning proposals, preference/context files.
- Intelligence: briefing and research plans that can operate with local inputs and explicitly report unavailable providers.
- Automation: schedules and bounded runs. External effects remain adapter-gated.
- System Evolution: measure, diagnose, propose, review, adopt.

## Reality boundary

The runtime can execute local repository actions and tests now. External research, messaging, calendars, publishing, analytics, deployment, and remote Git operations remain provider adapters. A disabled adapter must return `not-configured`; it must never simulate success.

## Safety boundary

Consequential actions require approval according to the authority model. Constitution, authority, security and approval policy cannot be self-modified by agents. Skills and learnings are proposals until adopted through governance.
