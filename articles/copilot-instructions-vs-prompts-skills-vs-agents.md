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
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 


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

### What is it?
Prompts are one off task or request that you manually trigger via slash commands. Reusable prompts are. `.prompt.md` files that are stored within your workspace and invoked when needed.

### What problem do prompts solve?

Prompts solve the problem of telling Copilot what you want it to do right now.
Even though Copilot already has some surrounding context - such as the current active file, select code and chat history, it still needs an explicit goal.

Instead of repeatedly wrting:
> Review this API for authentication, authorization, input validation, rate limiting, logging...

you can encode that workflow once as something  like:

`api-security-review.prompt.md`

and reuse it.

### When to use it?

Use a prompt file when the task is:
repeatable + intentional. + invoked when needed.

Good candidates include:
- generating unit tests according to a standard structure
- creating an implementation plan
- reviewing an API for security concerns
- generating documentation

### When not to use a prompt file?

If something should apply all the time, it probably belongs in **instructions**, not a prompt.

For example: 
> Use xUnit for all .NET unit tests.

That's a repository convention. You shouldn't have to remember to solve it.

### Common mistake

The biggest mistake is treating every useful instruction as a prompt. If you are constantly doing this, it means you are compensating for missing custom instructions rather than improving your prompts.

Another mistake is turning a prompt into an agent simply because the prompt has become long.

## 2) Instructions: Always apply these rules

### What is it?
Instructions are `Markdown` files containing persistanet guidance and rules. Those are automatically loaded in the background for every session or prompt.

Copilot offers four variations of custom instructions:
  - **Global instructions**:  These apply to every chat request in the workspace and are usually under `github/copilot-instructions.md`
  - **File/path targeted instructions**: These are targeted to specific file types and use the `applyTo`  pattern so the instructions only apply when working with matching files. These are usually under `.github/instructions/*.instructions.md`.
  - **Multi-agent compatible**: These support subfolder-level scoping. These are recognised by multiple agents and are under `AGENTS.md`.
  - **Organisations instructions**: These apply across all the repos in a GitHub organisation.

### What problem do instructions solves?

Instructions make persistent project knowledge avaiable automatically, so developers don't have to repeat it and Copilot makes fewer incorrect assumptions.

Without instructions, developers repeatedly put the same context into prompts. 

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

  <TabItem value="effective" label="✅ Effective" default>

  Do not log authentication tokens <br/>
  New HTTP integrations must use the existing type HttpClient pattern <br/>
  Use xUnit for new unit tests <br/>

  </TabItem>
  <TabItem value="ineffective" label="⚠️ Ineffective">

  Write high-quality code <br/>
  Make sure the code is secure <br/>
  Follow best practices 

  </TabItem>


</Tabs>

The **third mistake** that often gets overlooked, is treating instructions as enforcement.
GitHub explicitly notes that , because AI is nondeterministic , Copilot may not follow custom instructions the same way every time.

