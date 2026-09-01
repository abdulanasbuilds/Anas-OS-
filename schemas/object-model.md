# ANAS OS Object Model

Everything important in ANAS OS is represented as an identifiable object with state, ownership, timestamps, relationships, and evidence where applicable.

## Canonical objects

Person, Organization, Project, Product, Customer, Lead, Problem, Opportunity, Feature, Experiment, Agent, Skill, Tool, Workflow, Policy, Gate, Decision, Task, Incident, Deployment, Environment, Integration, Vendor, Asset, Document, Metric, Event, Risk, Cost, and Learning.

## Minimum object contract

Each object should have, where applicable:

- `id` — stable unique identifier;
- `type` — canonical object type;
- `status` — lifecycle state;
- `owner` — accountable person or system;
- `created_at`;
- `updated_at`;
- `source` — where the object came from;
- `confidence` — when claims or intelligence are involved;
- `evidence` — supporting references;
- `relationships` — links to other objects;
- `metadata` — domain-specific attributes.

## Relationship example

```text
Opportunity
   ↓
Problem
   ↓
Customer
   ↓
Product
   ├── Feature
   ├── Experiment
   └── Metric
          ↓
       Decision
          ↓
        Agent
          ↓
       Workflow
          ↓
        Task
          ↓
        Code
          ↓
     Deployment
          ↓
        Event
          ↓
      Feedback
          ↓
      Learning
```

## State rules

- States must be explicit.
- State transitions must have defined entry conditions.
- Important transitions must record evidence.
- Invalid transitions must be rejected rather than silently coerced.
- Terminal states should explain why the object stopped progressing.
