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

GitHub Copilot customization is usually discussed in terms of several related mechanisms: __prompts__, __instructions__, __skills__, __agents__, and __hooks__. They solve different parts of the same problem, and the right choice depends on whether the guidance is one-off, persistent, or workflow-level.

:::

## 1) Prompts: What do I want done right now?

### What is it?
Prompts are the task-level instructions you give Copilot for a specific job. In practice, they are often reusable prompt files stored in the workspace as `.prompt.md` files and invoked when needed.

### What problem do prompts solve?

Prompts solve the problem of telling Copilot what you want it to do right now.
Even though Copilot already has some surrounding context — such as the current active file, selected code, and chat history — it still needs an explicit goal.

Instead of repeatedly writing:
> Review this API for authentication, authorization, input validation, rate limiting, logging...

you can encode that workflow once as something like:

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

### Common mistakes

The biggest mistake is treating every useful instruction as a prompt. If you are constantly doing this, it means you are compensating for missing custom instructions rather than improving your prompts.

Another mistake is turning a prompt into an agent simply because the prompt has become long.

## 2) Instructions: Always apply these rules

### What is it?
Instructions are Markdown files containing persistent guidance and rules. In GitHub Copilot, they are typically stored in the repository and are automatically provided when relevant to a request.

GitHub Copilot supports several kinds of instructions:
  - **Repository-wide instructions**: These apply to requests in the repository and are usually stored in `.github/copilot-instructions.md`.
  - **Path-specific instructions**: These are targeted to matching files and use the `applyTo` pattern. These are usually stored in `.github/instructions/*.instructions.md`.
  - **Agent instructions**: These are used by agent workflows and can be scoped with `AGENTS.md` files.
  - **Organization-level instructions**: These can apply across repositories in a GitHub organization.

### What problem do instructions solve?

Instructions make persistent project knowledge available automatically, so developers do not have to repeat it and Copilot makes fewer incorrect assumptions.

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
If .NET conventions and React conventions all live in the global file, Copilot receives irrelevant information constantly. This is where file-specific custom instructions are more useful.

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


## 3) Skills

### What are skills?
Skills are specialised are reusable, task-specific capabilities that agents load automatically when relevant. A Skill lives in a folder that hs a required SKILL.md, and can include supporting resources such as scripts, references, and assets.

Skills are loaded on demand , only when a specific kind of task comes up. The name and description are what tell the agent when the Skill is relevant.

### What problem do skills solve?
Skills solve the problem of repeated specialist reasoning.
Without skills, teams often keep rewriting the same guidance into prompts:

> Review this PR for architecture impact, requirements alignment, and test adequacy.

A skills lets you package that expertise once and reuse it.

For example, instead of telling Copilot how to assess a PR, you could have separate skills for:
- requirements alignment
- test adequacy
- architecture impact
- security review

### When to use skills it?

Use skills when the work is repeatable, bounded, and requires recognisable expertise.

### When not to use skills?

A skill is not necessary when:
- The task is trivial
- It is only needed once.
- The capability cannot be defined clearly enough to produce consistent results.

### Common mistakes

The biggest mistake is turning every repeated prompt into a skill.

1. Skills that are too broad.
2. Skills that are too narrow. For example, if the skill only applies to one file, one ticket, or one edge case.
3. Mixing orchestration with expertise. A skill usually describe how to perform a capability.

### Good candidates for skills

The best candidates tend to be specialised reasoning modules.

Examples include:
- Requirements completeness assessment
- Test adequacy assessment
- Architecture impact analysis
- Backward-compatibility analysis
- Migration-risk analysis


## 4) Agents

### What are agents?

Agents are specialist execution modes or personas that can be given a narrower role and workflow than a general chat session. In practice, they are often used to separate concerns such as planning, implementation, review, or migration work.

Agents can also participate in handoff workflows where one agent completes a phase and then passes the task to another agent with a different focus.

### What problem do agents solve?

Agents help reduce context mixing. Instead of asking one general assistant to act as planner, implementer, reviewer, and tester all at once, you can give it a narrower role and a clearer decision boundary.

### When to use agents?

Use an agent when the workflow is specialised, repeated, or involves a clear sequence of responsibilities.

### When not to use agents?

A dedicated agent is usually unnecessary when the task is short, when the workflow is ad hoc, or when a prompt or instruction is sufficient.

### Common mistakes

The biggest mistake is treating an agent as a fancy wrapper around a prompt. A real agent is not just a longer set of instructions; it is a role with a defined job, context, and workflow boundary.

## 5) Hooks

### What are hooks?

Hooks are automation triggers that run in response to events or workflow stages. They are distinct from prompts and instructions because they operate at the workflow level instead of the conversation level.

### What problem do hooks solve?

Hooks solve the problem of enforcing behaviour automatically when a task or workflow starts, finishes, or changes state. They are useful when you want a standard workflow to happen without requiring the developer to remember to trigger it manually.

### When to use hooks?

Use hooks when a rule or workflow should happen automatically for every relevant event, not just when someone asks for it manually.

### When not to use hooks?

Avoid hooks when the action is optional, human-driven, or only relevant in a subset of moments that should remain explicitly invoked.

### Common mistakes

The biggest mistake is using hooks to compensate for a missing instruction or unclear workflow. Hooks work best when the behaviour is mechanical and repeatable.

## 6) How it all fits together?

The practical pattern is simple: use a prompt when you need a specific task done now, instructions when the guidance should apply consistently, skills when you want reusable specialist reasoning, agents when a role or workflow needs separation, and hooks when a standard action should happen automatically. The goal is not to stack every mechanism everywhere; it is to match the right mechanism to the right problem.

