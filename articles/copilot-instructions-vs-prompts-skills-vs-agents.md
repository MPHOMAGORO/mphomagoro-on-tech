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

This is where GitHub Copilot customisation starts to become genuinely useful.

:::tip

### Quick decision framework

Use this as a practical filter when deciding which Copilot customisation mechanism to reach for:

- **Prompt**: use when the guidance is one-off, task-specific, and meant for a single job.
- **Instructions**: use when the rule should apply repeatedly without needing to be restated.
- **Skill**: use when the work requires reusable expertise or a repeatable way of thinking about a type of task.
- **Agent**: use when responsibility, workflow ownership, or a clear sequence of steps matters.
- **Hook**: use when the behaviour should happen automatically at a workflow boundary or event.
- **MCP**: use when Copilot needs access to external tools, data, or systems that are not already in context.

A useful shorthand is:
- Prompt = “what should happen right now?”
- Instructions = “what rules should always apply?”
- Skill = “how should this kind of work be done?”
- Agent = “who owns this workflow?”
- Hook = “what should happen automatically when an event occurs?”
- MCP = “what external systems can this worker access?”

If the answer is “this should always apply,” use instructions. If the answer is “this is a reusable capability,” use a skill. If the answer is “this is a role with a workflow,” use an agent. If the answer is “this needs external context,” use MCP.

:::

## Prompts: What do I want done right now?

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

As a rule of thumb, use a prompt file when the task is repeatable, intentional, and only needed in the moment.

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

:::danger

### Common mistakes

The **biggest mistake** is treating every useful **instruction** as a **prompt**. If you are constantly doing this, it means you are compensating for missing custom **instructions** rather than improving your **prompts**.

Another **mistake** is turning a prompt into an agent simply because the prompt has become long.
:::

## Instructions: Always apply these rules

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

As a default, use custom instructions when you want Copilot to behave consistently without repeating yourself in every chat session.
This keeps the context stable and makes the rules easier to apply consistently across work.

Good candidates include:
- naming or coding conventions
- testing frameworks and testing expectations
- patterns the team uses or avoids
- repository architecture and important boundaries
- language/framework conventions

### When not to use instructions
- You only need a task or operation once.
- The workflow is complex and multi-step.
- The task requires specialized tooling or context that should not be treated as a universal rule.

:::danger

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

The **third mistake** that often gets overlooked is treating instructions as enforcement.
GitHub explicitly notes that, because AI is nondeterministic, Copilot may not follow custom instructions in the same way every time.

:::

## Skills: How should this kind of work be done?

### What are skills?
Skills are reusable, task-specific capabilities that can be surfaced to an agent when the work matches their scope. A skill usually lives in a folder with a required `SKILL.md`, and may include supporting resources such as scripts, references, and assets.

In many agent setups, skills are selected or loaded only when a specific kind of task comes up. The name and description often help the agent decide when a skill is relevant.

### What problem do skills solve?
Skills solve the problem of repeated specialist reasoning.
Without skills, teams often keep rewriting the same guidance into prompts:

> Review this PR for architecture impact, requirements alignment, and test adequacy.

A skill lets you package that expertise once and reuse it.

For example, instead of telling Copilot how to assess a PR, you could have separate skills for:
- requirements alignment
- test adequacy
- architecture impact
- security review

### When to use skills?

As a rule of thumb, use skills when the work is repeatable, bounded, and requires recognisable expertise.
The best candidates tend to be specialised reasoning modules.

Examples include:
- Requirements completeness assessment
- Test adequacy assessment
- Architecture impact analysis
- Backward-compatibility analysis
- Migration-risk analysis

### When not to use skills?

A skill is not necessary when:
- The task is trivial
- It is only needed once.
- The capability cannot be defined clearly enough to produce consistent results.

:::danger

### Common mistakes

The biggest mistake is turning every repeated prompt into a skill.

1. Skills that are too broad.
2. Skills that are too narrow. For example, if the skill only applies to one file, one ticket, or one edge case.
3. Mixing orchestration with expertise. A skill usually describes how to perform a capability.

:::


## Agents: Who owns this workflow

### What are agents?

Agents are the responsibility-boundary primitive. They are role-based AI workers configured around a specific workflow, goal, or decision boundary rather than a single prompt.

They are useful when you want to separate concerns such as planning, implementation, review, or migration work, and they can hand off to another agent once one phase is complete.

### What problem do agents solve?

Agents reduce context mixing. Instead of asking one general worker to act as planner, implementer, reviewer, and tester all at once, you give the work a narrower role and a clearer ownership boundary.

### When to use agents?

A good default is to use an agent when the workflow is specialised, repeated, or involves a clear sequence of responsibilities.

:::note

Agents are valuable because they establish responsibility boundaries, not because they have a persona.

:::

### When not to use agents?

A dedicated agent is usually unnecessary when: 
- You need reusable expertise knowledge. That's probably a skill.
- You are simply repeating the same request. That's probably a prompt.
- A rule should apply everywhere. Those belong in instructions. 
- The default Copilot agent already does a good job.

:::warning
### Common mistakes

The biggest mistake is treating an agent as a fancy wrapper around a prompt. A real agent is not just a longer set of instructions; it is a role with a defined job, context, and workflow boundary.

:::

## Hooks: What should happen automatically when an event occurs?

### What are hooks?

Hooks are automation triggers that run in response to events or workflow stages. They are distinct from prompts and instructions because they operate at the workflow level instead of the conversation level.

In workflow tools, hooks often run at strategic points such as task start or completion, before or after a prompt is submitted, or when an agent transitions between phases.

### What problem do hooks solve?

Hooks solve the problem of enforcing behaviour automatically when a task or workflow starts, finishes, or changes state. They are useful when you want a standard workflow to happen without requiring the developer to remember to trigger it manually.

Good candidates for hooks are :
- Guardrails
- Enforcement
- Auditing

### When to use hooks?

A practical rule is to use hooks when a rule or workflow should happen automatically for every relevant event, not just when someone asks for it manually.

### When not to use hooks?

Avoid hooks when the action is optional or requires judgement.

:::danger

### Common mistakes

The biggest mistake is using hooks to compensate for a missing instruction or unclear workflow. Hooks work best when the behaviour is mechanical and repeatable.

:::

## MCP Servers: What external systems can this worker access?

### What is an MCP Server?

It is a server that exposes external data, tools, or systems through the Model Context Protocol.
MCP is an open standard that lets applications share context and capabilities with LLMs.

### What problem does MCP solve?

MCP gives AI applications a standard way to access external information and capabilities.
For example, a requirements analyst agent may need information from a GitHub issue.
Without MCP, the agent may have to rely on a human to copy that context into the conversation manually.

You do not want to manually copy everything into the chat every time.

So instead of:

> Human -> Copy user story -> paste into Copilot 

you can move toward:

> Agent -> MCP -> GitHub

### When should you use MCP?

MCP is often useful when Copilot needs to interact with an external system or retrieve information that isn't naturally available in its current context.

### When should you NOT use MCP?

- When built-in capabilities already solve the work.
- When the knowledge is static and does not change. Prefer to  use instructions or a skill.

:::danger

### Common mistakes

The biggest mistake is giving the MCP integration all permissions.
The MCP design should follow least privilege.

:::

##  How it all fits together?

Imagine we are running an Italian restaurant.

A customer places an order:

> **“Make me a Margherita pizza.”**

That order is the equivalent of a **prompt**.

It tells us what needs to be done right now. The customer does not need to explain how the entire restaurant operates. They simply provide the immediate request.

But the chef should not make the pizza however they want.

The restaurant already has a set of standing rules:

* Use fresh ingredients.
* Keep preparation time under 30 minutes.
* Follow the restaurant's food-safety standards.
* Use approved ingredients and suppliers.

These are the equivalent of **instructions**.

They apply broadly across the restaurant. They do not explain how to make one particular dish; they define the rules and constraints under which the kitchen operates.

### The restaurant needs more than one recipe

Now we need the actual know-how for preparing the food.

The restaurant might have recipes for:

**Margherita Pizza**

1. Prepare and stretch the dough.
2. Add tomato sauce.
3. Add fresh mozzarella.
4. Bake at the required temperature.
5. Finish with basil and olive oil.

**Carbonara**

1. Cook the pasta.
2. Prepare the egg and cheese mixture.
3. Cook the guanciale.
4. Combine everything correctly without scrambling the eggs.
5. Finish with black pepper and Pecorino Romano.

These recipes are the equivalent of **skills**.

Each skill packages reusable expertise for a particular kind of task.

The kitchen does not need to relearn how to make carbonara every time someone orders it. The method already exists and can be selected when the task requires it.

The same idea applies to Copilot.

The **agent decides which capabilities are relevant to achieving the goal**.

### The chef is the agent

The **agent** is the chef.

The chef receives the customer's order, works within the restaurant's standing rules, chooses the appropriate recipe and performs the work.

So for our pizza order:

**Prompt**
“Make me a Margherita pizza.”

**Instructions**
Use fresh ingredients, follow food-safety rules and prepare orders within 30 minutes.

**Skill**
The Margherita pizza recipe.

**Agent**
The chef who understands the request, selects the appropriate recipe and carries out the work.

But there is still something missing.

A chef cannot operate using recipes alone.

They sometimes need information or capabilities that exist **outside the kitchen**.

### Hooks are the kitchen's automatic checks

Now imagine the restaurant has an automatic kitchen monitor.

When a new order is placed, a hook checks whether the required ingredients are available. If mozzarella is running low, it can trigger a restock alert before the pizza is started. When the pizza is marked ready, another hook can notify the front-of-house team and update the order status.

This is different from a prompt, instruction, or skill. The hook is not the task itself, the rule, or the recipe. It is the automatic event-driven trigger that fires when something important happens.

In GitHub Copilot terms, hooks are used for guardrails, auditing, and automatic workflow enforcement at the points where a task starts, finishes, or changes state.

### MCP is how the kitchen connects to the outside world

Imagine the chef discovers that the kitchen has run out of fresh mozzarella.

Knowing the recipe does not magically provide mozzarella.

The chef needs access to an external supplier system.

Or perhaps the chef needs to:

* Check whether an ingredient is in stock.
* Order more ingredients from a supplier.
* Look up today's reservations.
* Check whether a customer has recorded an allergy.
* Update an order in the restaurant's ordering system.
* Check a delivery status.

Those external systems are not skills.

They are **systems the chef needs to interact with**.

This is where **MCP servers** fit into the analogy.

An MCP server acts like a standard connection between the chef and an outside service, exposing tools or data the agent can use. In GitHub Copilot, custom agents can be configured with MCP servers and specific tools from those servers.

For our restaurant, imagine we have:

**Inventory MCP server**
Allows the chef to:

* Check ingredient stock.
* Find ingredient locations.
* Update stock levels.

**Supplier MCP server**
Allows the chef to:

* Find approved suppliers.
* Check ingredient availability.
* Place an ingredient order.

**Reservation MCP server**
Allows the chef to:

* Check today's bookings.
* Find customer dietary requirements.
* See expected party sizes.

**Order Management MCP server**
Allows the chef to:

* Read incoming orders.
* Update an order's status.
* Mark an order as completed.

Now the workflow becomes much more powerful.

A customer says:

> **“Make me a Margherita pizza.”**

The chef receives the **prompt**.

The chef follows the restaurant's **instructions**.

The chef selects the **Margherita pizza skill**.

The chef checks the inventory system through an **MCP server** and discovers that fresh mozzarella is available.

The chef then prepares the pizza.

The **agent** coordinates all of this.

So the pieces are doing fundamentally different jobs:

A recipe cannot check the stockroom.

A stock-management system does not know how to make a pizza.

The restaurant rules do not tell the chef which dish the customer ordered.

And the customer's order does not need to contain the entire recipe.

Each piece has its own responsibility.

The strength of the system comes from **combining them rather than trying to force everything into one giant prompt**.


## Final takeaway 

The repeated question in all of this is not just “what is it?” but “what is its scope, and who owns the responsibility?”

- Prompts answer the immediate task.
- Instructions define rules that should apply repeatedly across a project or workflow.
- Skills package reusable expertise.
- Agents own a workflow or role.
- Hooks fire automatically at defined moments.
- MCP exposes external systems and data.

That distinction is the key to choosing the right primitive. If the requirement is short-lived and specific, use a prompt. If it should apply broadly and automatically, use instructions. If it is repeatable expertise, use a skill. If it is a workflow with responsibility boundaries, use an agent. If it needs to trigger automatically, use a hook. If it needs access to systems outside the current context, use MCP.
