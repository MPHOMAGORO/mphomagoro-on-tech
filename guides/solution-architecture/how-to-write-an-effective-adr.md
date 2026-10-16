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

## What is an ADR?

The term "Architecture Decision Record" was coined by [Michael Nygard](https://cognitect.com/authors/MichaelNygard.html) in 2011 in his [article](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).

An Architecture Decision Record is commonly described as a short document that captures and explains a significant architectural decision. It typically records the context behind the decision, the options considered, the decision that was made, the consequences that followed, and often the stakeholders involved.

Its purpose is simple: preserve the reasoning behind a decision before the context fades.

In other words, an ADR helps future readers understand why the trade-off was acceptable at the time.

:::note

A common pattern is to create a new superseding ADR when a decision changes and leave the original unchanged. This preserves the reasoning behind the original decision while preserving the evolution of the architecture.

:::