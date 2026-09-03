# Personal Operating Workflows

These workflows implement the Level-5 operating loop inside ANAS OS:

`goal → context → skill → plan → authority/risk → execute → verify → evidence → human approval when required → outcome → learning → governed improvement`

The workflows are intentionally provider-neutral. Web research, email, calendars, Slack/meeting data, source control, model APIs, publishing, payments, and deployment are external adapters. A configured provider must satisfy its adapter contract before an operating workflow can use it.

The scheduler is disabled by default. Enabling a schedule is an operator configuration change; external actions remain subject to their own authority and approval requirements.
