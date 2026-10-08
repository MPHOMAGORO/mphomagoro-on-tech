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

Each can lead you toward the same destination, but the journeys are very different. They vary in time, difficulty, altitude exposure, scenery, logistics, and risk.

Suppose the climber chooses the Classic route.

Months later, someone looking only at the route they took might ask:

> “Why didn’t they take the Three Passes route? It’s better.”

But *better* according to what?

Perhaps the climber had limited time. Perhaps they wanted a more established route, simpler logistics, or less altitude exposure. The decision only makes sense when you understand the circumstances in which it was made.

Architecture decisions have the same problem.

Months or years after a system has been built, someone might ask:

> “Why did we choose a relational database over a NoSQL database?”
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

An Architecture Decision Record is commonly described as a short, immutable document that captures and explains a significant architectural decision. It typically records the context behind the decision, the options considered, the decision that was made, the consequences that followed, and often the stakeholders involved.

Its purpose is simple: preserve the reasoning behind a decision before the context fades.

In other words, an ADR helps future readers understand why the trade-off was acceptable at the time.

:::important Important rule

A common practice is to create a new superseding ADR and leave the original unchanged, preserving the evolution of the architectural reasoning.

:::

## When is a decision worth recording?

A quick checklist: if the decision has long-term consequences, affects more than one team or service, or would be costly or disruptive to reverse, it is worth recording.

A useful rule is to ask:

> "Would losing the reasoning behind this decision create confusion, rework, risk, or a bad future decision?"

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

If the decision could reasonably be debated later, it is often worth recording. A practical test is whether the reasoning behind it might be questioned again later.

## Practical examples

### Decisions that usually deserve an ADR

- For a system that needs strong consistency, reporting, and transactional guarantees, a relational database is usually the better fit, even though it gives up the flexible schema evolution that NoSQL can offer.
- Building an internal platform capability gives the team control and long-term flexibility, but it costs time, focus, and operational burden compared with buying a SaaS product.
- Azure App Service was the right choice when the priority was operational speed and simplicity, even though it gives up some of the customisation and control that AKS provides.
- Event-driven integration was chosen to reduce coupling across ownership boundaries, but it introduced eventual consistency, more complex observability, and a harder debugging experience.

These are examples where the trade-offs are meaningful and the reasoning matters years later.

### Decisions that usually do not deserve an ADR

- Naming a class or service
- Choosing a minor library or package
- Following an established internal coding convention
- Making a small refactor that does not materially change system behaviour or team direction

These are usually good candidates for a ticket, PR, or design note, but not necessarily a dedicated ADR.

## Borderline cases

Sometimes the same technical choice may or may not deserve an ADR depending on its scope, consequences, and how difficult it would be to reverse.

### 1. Introducing a new authentication library

If one service replaces an authentication library with another while keeping the same authentication model, a dedicated ADR may be unnecessary.

But if the decision establishes how dozens of services authenticate and determines the organisation's identity provider, the reasoning probably deserves to be preserved.

### 2. Changing an API

Adding another endpoint to an existing API probably does not deserve an ADR.

Changing the integration model from synchronous REST calls to asynchronous messaging probably does.
That choice changes failure handling, consistency, observability, and how systems interact.


### 3. Introducing Redis

Using Redis as a temporary cache inside one application may simply be an implementation detail.
Using Redis as shared infrastructure for distributed caching, session storage, coordination, or communication between multiple services is different.
The decision introduces an operational dependency and architectural consequences that could affect several systems.

The technology may be the same; the architectural significance is not.


## When not to create one

The important counterpoint is that not every technical decision deserves an ADR.

An ADR is not a record of every choice. It is a record of the decisions that reshape the system or create non-trivial trade-offs. If a decision is local, reversible, obvious, and unlikely to be misunderstood later, it usually does not warrant the overhead. This is a useful rule of thumb rather than a rigid standard. A useful threshold is not whether the decision is technical, but whether the reasoning would matter later.

## Final takeaway

An ADR is not about documenting every technical choice. It is about preserving the reasoning behind the decisions that shape the system's future.

When a decision has real trade-offs, long-lived consequences, or a high chance of being misunderstood later, write it down. That is what makes an ADR valuable.

__The goal is not to record the final outcome alone. The goal is to preserve the thinking that made that outcome reasonable at the time.__

:::note

This article focuses on when a decision is worth recording. Choosing an ADR format and writing one are separate questions.

:::


## References
- Michael Nygard - [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- ADR GitHub -  [ADR GitHub Organisation](https://adr.github.io/)
