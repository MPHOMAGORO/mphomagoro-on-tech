---
title: "Prompts vs Instructions vs Skills vs Agents vs Hooks"
description: "How GitHub Copilot Customisation Actually Fits Together."
date: 2026-09-20
authors: [mpho]
image: /img/articles/prompts-vs-instructions-vs-skills-vs-agents/hero.png
tags:
  - ai-engineering
  - github-copilot

hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Prompts vs Instructions vs Skills vs Agents vs Hooks

![GitHub Copilot and GH-300](/img/articles/prompts-vs-instructions-vs-skills-vs-agents/hero.png)

It’s Tuesday morning, 09:00.

You’re fired up, coffee nearby, and ready to build software.

You open GitHub Copilot and ask it to help implement a change.

Before it can really get going, you explain how the application is structured.

You tell it where the business logic belongs, which patterns the team follows, how tests should be written and which architectural boundaries it needs to respect.

Copilot gets to work.

The result is good.

Later that morning, you open another conversation to work on something else.

- Again, you explain the project structure.

- Again, you mention the coding standards.

- Again, you remind it how your team expects tests to be written.


At some point, you realise the problem. You are spending a surprising amount of time teaching Copilot how your engineering environment works before asking it to do any actual engineering. Some knowledge should already be available. Some behaviours should be reusable.

And that is where prompting starts to feel insufficient.

This is where GitHub Copilot customisation starts becoming interesting.

__Prompts__, __instructions__, __skills__, __agents__ and __hooks__ all help solve this problem — but they solve very different parts of it.