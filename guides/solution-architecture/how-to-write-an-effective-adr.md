---
title: "How to write an effective ADR"
description: "How to write an ADR that is actually useful"
date: 2026-14-08T07:00:00+01:00
authors: [mpho]
image: /img/articles/when-to-create-an-adr/crossroads.png
tags:
  - architecture

hide_table_of_contents: false
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

### 01. Write a meaningful title.

### 02. Record the status.

Proposed, Accepted, Rejected or superseded.

### 03. Record  the ownership
The author and decision-makers where appropriate

### 04. Date
The date 

### 05. Explain the context and problem
Describe what is happening, why it matters, what is driving the change, which constraints and assumptions exist.


### 06. Identify the options considered.
Present credible alternatives. For each alternative, record the advantages and disadvantages.

### 07. State the decision and rationale

Explain the selected decision and why it provides the best fit for the circumstances.

### 08. Document consequences

Capture positive outcomes, risks 

### 09. Links

Add references to related tickets, supporting documents, and superseding ADRs.

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
# <ADR-Version-No>[Decision Title]

- **Status:** Proposed
- **Date:** YYYY-MM-DD
- **Decision Makers:** [Names ]
- **Stakeholders:** [Names ]

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