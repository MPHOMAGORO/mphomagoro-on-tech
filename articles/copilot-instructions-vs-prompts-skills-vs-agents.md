import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

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
- Again, you remind on which architectural boundaries it needs to respect.

At some point, you realise the problem. You are spending a surprising amount of time teaching Copilot how your engineering environment works before asking it to do any actual engineering. Some knowledge should already be available. Some behaviours should be reusable.

And that is where prompting starts to feel insufficient.

This is where GitHub Copilot customisation starts becoming interesting.

:::info

GitHub Copilot uses  six configuration primitives: __Prompts__, __instructions__, __skills__, __agents__ and __hooks__ that help solve this problem — but they solve very different parts of it.

:::

## 1) Prompts: What do I want done right now?

### What is it
Prompts are one off task shortcuts that you manually trigger via slash commands.

### What problem it solves

### When to use it

### When not to use it

### Common mistake

## 2) Instructions: Always apply these rules

### What is it?
Instructions are Markdown files containing persistanet guidance and rules. Those are automatically loaded in the background for every session or prompt.

Copilot offers three variations of custom instructions:
  - Global instructions:  These apply to every chat request in the workspace and are usually under `github/copilot-instructions.md`
  - File/path targeted instructions: These are targeted to specific file types and use the `applyTo`  pattern so the instructions only apply when working with matching files. These are usually under `.github/instructions/*.instructions.md`.
  - Multi-agent compatible: These support subfolder-level scoping. These are recognised by multiple agents and are under `AGENTS.md`.
  - Organisations instructions: These apply across all the repos in a GitHub organisation.

### What problem do instructions solves?

Without instructions, engineers repeatedly put the same context into prompts. 

### When should you use instructions?

Use custom instructions when you want Copilot to behave consistently without repeating yourself in every chat session.
This makes the context stable and the rules that follow work consistent.

Good candidates include:
- naming or coding conventions
- testing frameworks and testing expectations
- patterns the team uses or avoids
- repository architecture and important boundaries
- language/framework conventions

### When not to use it
- You only need a task or operation once.
- Complex multi-step workflows.
- Task requiring specialising tools.

### Common mistakes

The **first mistake** is putting every rule at the repository scope.
If NET conventions. React conventions all live in the global file, Copilot receives irrelvant information constantly. This is where you need to apply file-specific custom instructions.

The **second mistake** is writing vague principles instead of actionable constraints.

<Tabs>

  <TabItem value="ineffective" label="⚠️ Ineffective" default>

  Write high-quality code <br/>
  Make sure the code is secure <br/>
  Follow best practices 

  </TabItem>

  <TabItem value="effective" label="✅ Effective">

  Do not log authentication tokens
  New HTTP integrations must use the existing type HttpClient pattern
  Use xUnit for new unit tests

  </TabItem>
</Tabs>

The **third mistake** that often gets overlooked, is treating instructions as enforcement.
GitHub explicitly notes that , because AI is nondeterministic , Copilot may not follow custom instructions the same way every time.

