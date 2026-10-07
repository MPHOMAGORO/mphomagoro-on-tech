---
title: "When Should You Create An ADR"
description: "Learn when to create an Architecture Decision Record (ADR) to document important technical decisions, their context, and their consequences."
date: 2026-09-30T07:00:00+01:00
authors: [mpho]
image: /img/articles/when-to-create-an-adr/crossroads.png
tags:
  - architecture

hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 2
slug: when-to-create-an-adr
---

![When to create an ADR](/img/articles/when-to-create-an-adr/crossroads.png)


Imagine you are a climber preparing to trek to Everest Base Camp.

There is more than one way to get there. You could take the Classic Everest Base Camp route, follow the Gokyo Lakes and Cho La Pass variant, tackle the Three Passes Trek, or take the historic route from Jiri.

Each can lead you toward the same destination, but the journeys are very different. They vary in time, difficulty, altitude exposure, scenery, logistics and risk.

Suppose the climber chooses the Classic route.

Months later, someone looking only at the route they took might ask:

> “Why didn’t they take the Three Passes route? It’s better.”

But *better* according to what?

Perhaps the climber had limited time. Perhaps they wanted a more established route, simpler logistics or less altitude exposure. The decision only makes sense when you understand the circumstances in which it was made.

Architecture decisions have the same problem.

Months or years after a system has been built, someone might ask:

> “Why did we choose a relational database over a NoSQL Database?”
>
> "Why did we build this capability rather than buy a SaaS product?"
>
> "Why did we choose Azure App Service instead of deploying the application to AKS?"

Looking at the finished system may tell you **what** was chosen. It rarely tells you **why that choice made sense at the time**.

That is the problem an __Architecture Decision Record (ADR)__ is designed to solve.

An ADR preserves the context behind a significant architecture decision so that someone looking at it later can understand not only what was decided, but why that path was chosen.

That leads to the more difficult question:

__Which decisions are significant enough to deserve an ADR?__


<!-- truncate -->

## What is an ADR?

The term "Architecture Decision Record" was coined by [Michael Nygard](https://cognitect.com/authors/MichaelNygard.html) in 2011 in his [article](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).

An Architecture Decision Record is commonly described as a short, immutable document that captures and explains a significant architectural decision. It records the context behind the decision, the options considered, the decision that was made, the consequences that followed, and often the stakeholders involved.

Its purpose is simple: preserve the reasoning behind a decision before the context fades.

In other words, an ADR helps future readers understand why the trade-off was acceptable at the time.

:::important

If the decision is changed, a new superseding ADR is often created and linked to the previous version. In many teams, the original ADR is left unchanged.

:::

## The key question: when is a decision worth recording?

A useful rule is to ask:

> Would losing the reasoning behind this decision create confusion, rework, risk, or a bad future decision?

If the answer is yes, the decision likely deserves an ADR.

This is a better test than asking whether a decision is merely "important." Some decisions are important, but not all of them are worth recording in a formal decision log. The real question is whether the reasoning is likely to matter later, rather than whether the decision was technically significant in the moment.

## ADR-worthy signals

A few signs usually indicate that a decision is worth capturing:

- There are multiple credible options
- The decision has trade-offs that are not obvious at first glance
- Reversing it later would be expensive, slow, or disruptive
- The choice affects multiple teams, systems, or services
- The decision may be challenged later by someone who was not involved at the time
- The decision shapes long-term system direction, cost, performance, or risk

If the decision could reasonably be debated later, it is usually worth recording.

This is the practical threshold: if the reasoning behind the decision might be questioned again, it is usually worth preserving.

## Practical examples

### Decisions that usually deserve an ADR

- Choosing a relational database over a NoSQL database for a system that needs strong consistency, reporting, and transactional guarantees
- Building an internal platform capability instead of buying a SaaS product
- Choosing Azure App Service instead of AKS for a workload that prioritises simplicity and operational speed over deep control
- Adopting an event-driven architecture for integration between services with different ownership boundaries

These are examples where the trade-offs are meaningful and the reasoning matters years later.

### Decisions that usually do not deserve an ADR

- Naming a class or service
- Choosing a minor library or package
- Following an established internal coding convention
- Making a small refactor that does not materially change system behaviour or team direction

These are usually good candidates for a ticket, PR, or design note, but not necessarily a dedicated ADR.

## When not to create one

The important counterpoint is that not every technical decision deserves an ADR.

An ADR is not a record of every choice. It is a record of the decisions that reshape the system or create non-trivial trade-offs. If a decision is local, reversible, obvious, and unlikely to be misunderstood later, then it usually does not warrant the overhead.

This is a useful rule of thumb, rather than a rigid standard.

The threshold is not "is this a technical decision?" It is "would the reasoning matter later?"

That distinction is what separates a useful ADR from unnecessary paperwork.

## Final takeaway

An ADR is not about documenting every technical choice. It is about preserving the reasoning behind the decisions that shape the system's future.

When a decision has real trade-offs, long-lived consequences, or a high chance of being misunderstood later, write it down. That is what makes an ADR valuable.

The goal is not to record the final outcome alone. The goal is to preserve the thinking that made that outcome reasonable at the time.

:::note

This article focuses on when a decision is worth recording. Choosing an ADR format and writing one are separate questions.

:::


