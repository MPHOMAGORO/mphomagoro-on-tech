---
title: "When Should You Create An ADR"
description: "Learn when to create an Architecture Decision Record (ADR) to document important technical decisions, their context, and their consequences."
date: 2026-09-30T07:00:00+01:00
authors: [mpho]
image: /img/articles/when-to-create-an-adr/crossroads.png
tags:
  - Solution Architecture

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

But that raises a more difficult question:

__Which decisions are significant enough to deserve an ADR?__

## What  is  an  ADR?

The term  "Architecture Decision Record" was coined by [Michael Nygard](https://cognitect.com/authors/MichaelNygard.html) in 2011 in his [article](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).

An Architecture Decision Record is a short immutable document that captures and explains a significant architecture decision to a system or product in time.
It typically records the context of the decision, the options considered, the status, the decision that was made, the consequences that follow from it and more recently the stakeholders involved in the decision.

:::note

If the decision is changed, another superseding ADR must be created and linked to the previous version.
Do not modify the existing ADR.

:::

## When should you create one?

It is advised to  create an ADR whenever a decision of significant impact is made. And it is up to the team to align on what defines significant impact. But I think the most important question is:

> Would losing the reasoning behind the decision create confusion, rework, risk, or a bad future decision?

## Signals that a decision is ADR-worthy

A few things to look out for that make a decision ADR-worthy:

- There are multiple credible options
- Reversing it later would be expensive or disruptive
- Someone is likely to challenge the decision later.
- The choice affects multiple teams, systems, or services


## When not to create one

The important counterpoint is that not every technical decision deserves an ADR.

For example, naming a class, choosing a minor library or following an already establish pattern.


## Final takeaway




