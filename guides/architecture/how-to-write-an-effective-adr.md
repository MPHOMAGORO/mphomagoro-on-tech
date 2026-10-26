---
title: "How to write an effective ADR"
description: "How to write an ADR that is actually useful"
date: 2026-10-24T07:00:00+01:00
authors: [mpho]
tags:
  - architecture

hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 2
---

## Introduction: Writing an ADR Is More Than Filling in a Template

An Architecture Decision Record is a lightweight record that captures a significant architectural decision during the design and development of a system.

Its purpose is simple: preserve the reasoning behind the decision before the context fades.

In other words, an ADR helps future readers understand why the trade-off was acceptable at the time and what consequences were expected.

Michael Nygard's 2011 article, [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions), describes a lightweight format for recording architecturally significant decisions.

## What Makes an ADR Effective?

A useful ADR focuses on one architectural or design decision. It is concise, grounded in the context that created it, and easy for future readers to understand.

A useful ADR often helps answer these questions, though the exact structure can vary by team and decision:
- What problem required a decision?
- What requirements and constraints matter?
- What alternatives were considered and why they were ruled out?
- What decision was made, and why?
- What trade-offs and risks were accepted?
- Under what circumstances might the decision need reconsideration?
- When was the decision made?
- Whether the decision was accepted, rejected, or still in progress?

## Before You Start Writing

- Identify the actual architectural or design decision.
- Understand the requirements and constraints.
- Separate verified facts from assumptions.
- Identify the relevant stakeholders.

## How to Write an Effective ADR — Step by Step

Use the following steps as a guide, adjusting the level of detail to the decision. The goal is to preserve the reasoning, not to fill every section with boilerplate.

### 01. Write a meaningful title

State the decision in a short, specific phrase. A title such as “Use PostgreSQL for order storage” is more useful in a decision log than “Database decision.” If your team numbers ADRs, include the identifier according to its convention.

### 02. Record the status.

Many teams use a simple status convention such as Proposed, Accepted, Rejected, and Superseded. Record the status clearly and consistently so readers can tell whether a decision is still being evaluated, final, or replaced by a later ADR.

### 03. Record ownership
Name the author and include other stakeholders when their input or the decision's impact is important. This helps future readers understand whose perspective the ADR represents and who to contact with questions.

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

The following fictional example illustrates how these sections can be applied in practice. The organisation, stakeholders, and evaluation are invented.

## ADR-001-Build vs Buy an Appointment Booking Capability

- **Status:** Proposed
- **Date:** 2026-10-26
- **Author:** Mpho Magoro
- **Stakeholders:** Priya Sharma, Marco Rossi, Thabo Dlamini

### Context

The organisation needs an online appointment booking capability on its existing WordPress website.

Two options are being considered:

1. Adopt a third-party Software as a Service (SaaS) booking platform, such as Setmore, and integrate it with WordPress.
2. Build and operate an internally owned booking capability within the existing WordPress environment.

The main question is whether the organisation should spend limited engineering capacity on a supporting capability that is not a source of competitive differentiation.

**Assumptions**

- The organisation already operates a WordPress website.
- Appointment scheduling is a supporting business capability rather than a source of competitive differentiation.
- Standard booking functionality can satisfy most business requirements.
- Engineering resources are limited and must be prioritised against other business initiatives.

**Constraints**

- The solution must integrate with the existing WordPress website.
- The solution must meet applicable data protection and security requirements.
- Implementation and ongoing costs must remain commercially justifiable.
- The solution must be maintainable with the organisation's available technical resources.

### Decision Drivers

- **Time to market:** Minimise the time required to deliver a functional booking capability.
- **Total cost of ownership:** Consider initial implementation, licensing, infrastructure, maintenance and support costs.
- **Engineering capacity:** Avoid diverting limited engineering resources from higher-value business initiatives.
- **Functional suitability:** Meet appointment scheduling requirements without unnecessary complexity.
- **Maintainability:** Minimise ongoing technical maintenance and operational responsibilities.
- **Flexibility:** Accommodate future changes in business requirements.
- **Security and compliance:** Ensure customer information is processed and protected appropriately.
- **Vendor dependency:** Consider the implications of relying on a third-party provider and the cost of switching solutions.

### Options Considered

#### Option 1: Adopt a Third-Party SaaS Booking Platform (Setmore)

**Advantages**

- Faster implementation with lower initial delivery risk.
- Less engineering effort and lower operational burden.
- Access to established booking features and supported integrations.

**Disadvantages**

- Vendor dependency and reduced control over pricing and roadmap.
- Limited customisation and possible lock-in.
- Ongoing subscription and integration costs.

#### Option 2: Build and Operate an Internal WordPress Booking Capability

**Advantages**

- Greater control over functionality and future roadmap.
- Better fit for specialised or unusual workflows.
- Full control over data management and integration decisions.

**Disadvantages**

- Higher upfront engineering effort and longer time to market.
- Ongoing maintenance, patching and operational responsibility.
- Opportunity cost for limited engineering capacity.

### Decision

**The proposed decision is to adopt a third-party SaaS booking platform, with Setmore as the preferred candidate, and integrate it into the existing WordPress website.**

The organisation will not develop a custom appointment booking capability at this stage.

This decision is conditional on validating that the selected SaaS platform satisfies the agreed functional, security, privacy, integration and commercial requirements.

### Rationale

Appointment booking is treated as a supporting business capability rather than a source of differentiation. In that context, the organisation's priority is to deliver value quickly without consuming scarce engineering capacity on a commodity capability.

A custom platform would offer more control and flexibility, but those benefits do not currently justify the development effort, operational burden and opportunity cost of owning the service internally.

A managed SaaS solution is a better fit because it reduces delivery risk, preserves engineering capacity, and keeps the organisation focused on higher-value initiatives.

The trade-off is only acceptable if the provider satisfies the organisation's functional, security and integration requirements and remains commercially viable over time.

**The decision prioritises speed, operational simplicity and business focus over maximum technical control.**

### Consequences

#### Positive

- Faster delivery of an online appointment booking capability.
- Reduced need for custom software development.
- Lower internal maintenance and operational responsibilities.
- Engineering resources remain available for higher-value business initiatives.
- Reduced complexity within the existing WordPress environment.
- Ability to use existing SaaS booking functionality instead of recreating established features.

#### Negative

- The organisation becomes dependent on an external booking provider.
- Customisation is limited to vendor-supported capabilities.
- Recurring subscription and potential integration costs are introduced.
- Booking service availability is partially outside the organisation's control.
- Future migration may require additional engineering effort and data transformation.
- Changes to vendor pricing, policies or functionality may affect the organisation.

#### Risks and Follow-up Actions

- **Requirements validation:** Confirm that Setmore satisfies mandatory business workflows, integrations and customer experience requirements.
- **Security and compliance:** Review the vendor's data handling, access controls, processing agreements and applicable privacy requirements.
- **Cost assessment:** Compare the estimated three-year total cost of ownership for the SaaS and internal development options.
- **Vendor lock-in:** Validate the availability, completeness and usability of customer and appointment data exports.
- **Service continuity:** Assess service reliability commitments and establish a fallback process for booking disruptions.
- **Integration testing:** Validate the WordPress integration across supported devices and browsers.
- **Decision review:** Reassess the decision if future business requirements, vendor costs or operational risks materially change.

### Links

- [Setmore – WordPress Integration](https://support.setmore.com/en/articles/490966-wordpress)
- [Setmore – Embedding the Booking Page](https://support.setmore.com/en/articles/490991-embed-your-booking-page-on-your-website)

## Common Mistakes to Avoid

- Recording the selected technology without explaining the problem.
- Presenting only advantages of the preferred option.
- Inventing weak alternatives to justify a predetermined choice.
- Treating assumptions as established facts.
- Writing implementation instructions instead of a decision record.
- Failing to document accepted risks and consequences.
- Recording a proposed decision as accepted before it has been agreed.

## Reviewing and Maintaining ADRs

:::tip Recommended ADR Revision Policy

As a rule of thumb, do not rewrite an accepted ADR when a decision changes. Leave the original document intact to preserve its historical context, then create a new, superseding ADR to document the change. Use the status fields in both files to link them together (for example, “Superseded by ADR-XXX” and “Supersedes ADR-YYY”). This keeps the architectural evolution transparent and accurate.

:::

## ADR Quality Checklist

- [ ] Is the decision clearly identified?
- [ ] Is the problem and context understandable to someone outside the team?
- [ ] Are important requirements and constraints documented?
- [ ] Are credible alternatives and their trade-offs explained?
- [ ] Is the rationale evidence-based and proportional?
- [ ] Are the status and decision ownership clear?
- [ ] Could another person understand why this decision made sense in two years?

## Conclusion

A good ADR does more than record a choice. It preserves the reasoning that made that choice reasonable at the time, including the trade-offs, constraints, and uncertainty that shaped it.

That is why ADRs are valuable: they give future developers and reviewers a way to understand not just what was decided, but why the decision made sense in context. Without that context, teams are much more likely to misread old decisions as inevitable or to reverse them without understanding the cost of doing so.

The real discipline is not writing a document for formality's sake. It is making architectural knowledge durable enough to survive team turnover, changing requirements, and time itself. When done well, an ADR becomes a practical record of engineering judgement rather than a static archive of decisions.

Please see [When should you create an ADR](../../articles/when-to-create-an-adr) article for understanding when a decision is worth recording.

## Reusable ADR Template

Copy the template below and adapt it to your architectural decision.

```md title="adr-template.md"

# <ADR-Version-No>-[Decision Title]

- **Status:** Proposed
- **Date:** YYYY-MM-DD
- **Author:** [Name]
- **Stakeholders:** [Names]

## Context

Describe the problem, requirements, assumptions and constraints.

## Decision Drivers
- Driver 1
- Driver 2

## Options Considered

### Option 1: [Name]

**Advantages**
- Describe the advantages

**Disadvantages**
- Describe the disadvantages

### Option 2: [Name]
**Advantages**
- Describe the advantages

**Disadvantages**
- Describe the disadvantages

## Decision
Describe the selected option.

## Rationale
Explain why this option was selected.

## Consequences

### Positive
- Describe the positive consequence of the decision

### Negative
- Describe the negative consequence of the decision

### Risks and Follow-up Actions
- Explain the accepted risks and the follow-up actions

## Links

Add references to the related tickets, supporting documents and superseding ADRs.

```
