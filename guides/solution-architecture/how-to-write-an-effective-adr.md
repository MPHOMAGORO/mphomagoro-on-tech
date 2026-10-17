---
title: "How to write an effective ADR"
description: "How to write an ADR that is actually useful"
date: 2026-14-08T07:00:00+01:00
authors: [mpho]
image: /img/guides/architecture/how-to-write-an-effective-adr/hero%20image.png
tags:
  - architecture

hide_table_of_contents: true
toc_min_heading_level: 2
toc_max_heading_level: 2
---

## Introduction: Writing an ADR Is More Than Filling in a Template

An Architecture Decision Record is a formal document that captures and explains a significant architectural decision during the design and development of systems.

Its purpose is simple: preserve the reasoning behind a decision before the context fades.

In other words, an ADR helps future readers understand why the trade-off was acceptable at the time.

The term "Architecture Decision Record" was coined by [Michael Nygard](https://cognitect.com/authors/MichaelNygard.html) in 2011 in his [article](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).


## What Makes an ADR Effective?

An effective ADR is focused on one architectural or design decision. It is concise, and grounded in its context. 

An effective ADR should answer seven questions:
- What problem required a decision?
- What requirements and constraints matter?
- What alternatives were considered and why they were ruled out?
- What decision was made, and why?
- What trade-offs and risks were accepted?
- Under what circumstances might the decision need reconsideration
- When the decision was made?
- Whether the decision was accepted, rejected or still in progress?

## Before You Start Writing

- Identify the actual architectural or design decision.
- Understand th requirments and constraints
- Separate verified facts from assumptions
- Identify the relevant stakeholders


## How to Write an ADR — Step by Step

Use the following steps as a guide, adapting the level of detail to the decision. The goal is to preserve the reasoning, not to fill every section with boilerplate.

### 01. Write a meaningful title

State the decision in a short, specific phrase. A title such as “Use PostgreSQL for order storage” is more useful in a decision log than “Database decision.” If your team numbers ADRs, include the identifier according to its convention.

### 02. Record the status.

Mark the ADR as Proposed while the decision is under review, then record whether it was Accepted or Rejected. If a later decision replaces it, mark it Superseded and link to the newer ADR. Use status terms consistently across the decision log.

### 03. Record  the ownership
Name the author and the people accountable for making or approving the decision. Include other stakeholders when their input or the decision's impact is important. This helps future readers understand whose perspective the ADR represents and who to contact with questions.

### 04. Date
Record when the ADR was created or when the decision was made, following the convention used by your team. A clear date helps readers place the decision in the context of the system and constraints at that time.

### 05. Explain the context and problem
Describe the situation that requires a decision, why it matters, and what is driving the change. Include the relevant requirements, constraints, and evidence. Label assumptions as assumptions so readers do not mistake them for verified facts.


### 06. Identify the options considered.
Present credible alternatives, including keeping the current approach when that is a realistic option. Compare them against the decision drivers, noting the main advantages, disadvantages, and reasons for ruling options out. Avoid making the alternatives look weaker just to justify a preferred choice.

### 07. State the decision and rationale

State the chosen option clearly. Explain why it fits the context and requirements better than the alternatives, using the decision drivers and available evidence. If the decision is still being reviewed, keep its status Proposed rather than presenting it as final.

### 08. Document consequences

Describe the expected benefits as well as the costs, risks, and limitations the team accepts. Include relevant effects on operations, security, performance, maintainability, or delivery. Record mitigations and follow-up actions when they are part of making the decision workable.

### 09. Links

Link to useful supporting material, such as design documents, research, tickets, or related ADRs. When a decision changes, link the new ADR to the one it supersedes so readers can follow how the architecture evolved.

## Worked Example: From Problem to Architectural Decision



## Common Mistakes to Avoid

Cover mistakes that materially reduce decision quality:
- Recording the selected technology without explaining the problem.
- Presenting only advantages of the preferred option.
- Inventing weak alternatives to justify a predetermined choice.
- Treating assumptions as established facts.
- Writing implementation instructions instead of a decision record.
- Failing to document accepted risks and consequences.
- Recording a proposed decision as accepted before it has been agreed.

## Reviewing and Maintaining ADRs

:::note Recommended ADR Revision Policy

__Never edit an accepted ADR when a decision changes__. Instead, leave the original document unmodified to preserve its historical context. Create a new, superseding ADR to document the change, and use the Status section in both files to link them together (e.g., “Superseded by ADR-XXX” and “Supersedes ADR-YYY”). This keeps the architectural evolution transparent and accurate.

:::

## ADR Quality Checklist

- [ ] Is the decision clearly identified?
- [ ] Is the problem and context understandable to someone outside the team?
- [ ] Are important requirements and constraints documented?
- [ ] Are credible alternatives and their trade-offs explained?
- [ ] Is the rationale evidence-based and proportional?
- [ ] Are the status and decision ownership clear?
- [ ] Could another person understand why this decision made sense in two years?


## Reusable ADR Template

Copy the template below and adapt it to your architectural decision.

```md title="adr-template.md"
# <ADR-Version-No>-[Decision Title]

- **Status:** Proposed
- **Date:** YYYY-MM-DD
- **Decision Makers:** [Names]
- **Stakeholders:** [Names]

## Context

Describe the problem, requirements, assumptions and constraints.

## Decision Drivers
- Driver 1
- Driver 2

## Options Considered

### Option 1: [Name]

**Advantages**
- 

**Disadvantages**
- 

### Option 2: [Name]
**Advantages**
-

**Disadvantages**
-

## Decision
Describe the selected option.

## Rationale
Explain why this option was selected.

## Consequences

### Positive
-

### Negative
-

### Risks and Follow-up Actions
-

## Links

Add references to the related tickets, supporting documents and superseding ADRs.

```