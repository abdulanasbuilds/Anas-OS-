# Canonical Object Contract

Every persistent ANAS OS object has:
- `id`: globally unique stable identifier
- `type`: canonical object type
- `status`: explicit lifecycle state
- `owner`: responsible person/agent/domain
- `createdAt` and `updatedAt`
- `source`: where the record came from
- `confidence`: 0..1
- `evidence`: references to evidence records
- `relationships`: typed links to other objects
- `metadata`: non-authoritative extension fields

Material transitions must emit an event and, where consequential, a decision record. Records are append-friendly; history is never silently rewritten.

Canonical types include Person, Organization, Project, Product, Customer, Lead, Problem, Opportunity, Feature, Experiment, Agent, Skill, Tool, Workflow, Policy, Gate, Decision, Task, Incident, Deployment, Environment, Integration, Vendor, Asset, Document, Metric, Event, Risk, Cost, Learning, Approval, Evidence, Handoff, Execution.
