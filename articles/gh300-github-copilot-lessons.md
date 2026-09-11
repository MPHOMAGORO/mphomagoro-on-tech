---
title: "I Used GitHub Copilot Every Day — GH-300 Still Taught Me These Things"
description: "What studying for GH-300 taught me despite already using GitHub Copilot professionally."
date: 2026-09-11
authors: [mpho]
image: /img/articles/github-copilot-gh300/hero.png
tags:
  - ai-engineering
  - github-copilot

hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# I Used GitHub Copilot Every Day — Why I Still Took GH-300

![GitHub Copilot and GH-300](/img/articles/github-copilot-gh300/hero.png)

I had already been using GitHub Copilot regularly before I decided to take the GH-300 certification.

It was part of my normal development workflow. I used it to generate code, explain unfamiliar code, refactor existing solutions, explore implementation approaches, write tests and reduce repetition in everyday engineering work.

So when I first looked at the GitHub Copilot certification, I had a very obvious question:

**If I already use Copilot every day, what exactly am I going to learn from an exam about it?**

It had been a while since I had completed a formal certification, and I had started to think they were not always necessary. At the same time, I also knew that certifications can be useful when they force you to think more deliberately about a tool you already use well.

That question turned out to be the reason the certification was useful.

Using a tool frequently and understanding how to use it deliberately are not the same thing.

GH-300 pushed me past the "I know how to prompt this tool" stage and into the larger question of how AI fits into real software engineering work: context, instructions, governance, accountability and workflow design.

There were plenty of topics in the exam that went beyond my day-to-day usage, and that was exactly why it was valuable.

{/* truncate */}

---

## I Thought Daily Use Meant I Already Understood Copilot

Before studying for GH-300, my use of Copilot was mostly practical.

I would open VS Code, describe what I wanted, review the generated code and continue working. That alone had real value. It could help me generate repetitive implementation code, write unit tests, explain unfamiliar code, suggest refactoring ideas, generate documentation and troubleshoot errors.

For an experienced engineer, the benefit is not always dramatic in a single interaction. It is the cumulative effect of reducing low-value typing and getting a useful first draft faster.

But that practical usage also creates a false sense of confidence.

You can become very good at using Copilot as an autocomplete engine without becoming particularly good at **engineering with AI**. That distinction became more important to me over time.

The more I used Copilot, the more I realised that my real question was not "How do I get code from the tool?" It was "How do I design an environment where the tool is more useful, more reliable and more aligned with engineering standards?"

That is where GH-300 started to change my thinking.

---

## Lesson 1: Productivity Isn't the Same as AI Engineering

One of the first gaps I noticed was between being productive and being deliberate.

If you use Copilot every day, it is easy to treat it like a fast code generator. You ask for a function, a test, a refactor or a sketch of an implementation, review it and move on. That can be productive, but it is not the same as engineering with AI.

The difference shows up when the task is more complex than "generate a method".

A typical workflow might look like this:

> Implement this feature.

> Write tests for this class.

> Refactor this method.

These prompts can work, but they place most of the responsibility for understanding the requirements, architecture and risk on the model.

A stronger approach is to provide the same kinds of constraints an experienced engineer would normally consider before implementation:

- what the requirement really is;
- what architectural constraints apply;
- what patterns are already established in the repository;
- what files should not change;
- what security or compliance boundaries exist;
- what testing expectations are required;
- what would count as an unacceptable outcome.

That is the real shift GH-300 prompted in me: the developer’s job is increasingly the design of the environment in which the AI operates, not simply the wording of the next prompt.

This matters because AI does not just accelerate implementation. It changes the distribution of effort across the engineering process.

The more capable the system becomes, the more important good requirements, clear context and sound judgement become.

---

## Lesson 2: Context Matters More Than Clever Prompts

One of the biggest changes in my thinking after GH-300 was that I stopped viewing Copilot purely as a prompt-and-response tool.

The more important capability is not raw prompting. It is **context**.

A prompt does not exist in isolation. It sits inside a larger environment: the current file, nearby code, repository context, instructions, chat history, open files, standards and the task you are trying to complete. The model is not receiving only the sentence you typed. It is reasoning from a broader set of signals.

That is why context engineering matters so much.

A useful AI-assisted workflow is not the one with the cleverest prompt. It is the one with the right context, in the right form, under the right constraints.

This is the point where the engineering discipline becomes more subtle.

You are no longer asking only, "What should I type?" You are asking, "What information should the assistant have access to, what should it be prevented from seeing, and how do I structure the environment so the output is useful?"

This is also where governance starts to become practical instead of abstract. The best AI workflow is not the one that exposes everything to the model. It is the one that provides the right context, under the right controls, for the right purpose.

---

## Lesson 3: Customisation Turns Copilot Into an Engineering Tool

Once I started thinking in terms of environment design, I began to see a very different role for Copilot.

Instead of repeatedly explaining the same engineering expectations over and over, those expectations can be encoded into the development environment itself: repository instructions, reusable prompt files, custom agents, specialised skills, architecture constraints, testing expectations and review workflows.

This changes the relationship between the developer and the assistant.

Instead of saying:

> Please remember we use this architecture pattern.

every time, the objective becomes:

> How do I make that knowledge part of the environment?

That is a much more scalable approach.

It also reduces friction. If the workflow already knows the standards, the engineer does not need to rediscover them in every interaction. That makes the system more consistent, more reusable and easier to govern.

This is where customisation becomes a real engineering capability rather than just a feature to play with.

The interesting part is not that Copilot can answer a question. It is that Copilot can increasingly act as a participant in a workflow that has been designed around clear rules, context and responsibility.

That is the beginning of AI-assisted engineering, not just AI-assisted prompting.

---

## Lesson 4: Governance Belongs Inside the Workflow

The governance topics in GH-300 were some of the most useful parts of the exam for me because they made AI adoption feel concrete.

One of the clearest examples was **content exclusion**. It is important to decide which repositories, folders or files should be unavailable to Copilot in certain contexts, especially when they contain confidential information, regulated data, security-sensitive logic or contractual restrictions.

The key question is not simply, "Can Copilot access this code?" It is also, "Should it access this code, under what conditions, and who is responsible for that decision?"

That is a governance question, not just a configuration question.

The same idea applies more broadly to responsible AI. The principles of fairness, reliability and safety, privacy and security, inclusiveness, transparency and accountability are not separate from software engineering. They are part of the quality bar for AI-assisted development.

Copilot can accelerate delivery, but it does not remove the need for review, validation or human judgement. In fact, as output speed increases, review quality matters even more.

The most useful lesson was that responsible AI starts before the prompt is written. It begins with deciding what information is allowed into the workflow and how the output will be checked before it becomes part of the system.

That is the organisational reality behind AI use: governance is not a final approval stage added at the end. It is a design consideration from the start.

---

## Lesson 5: Faster Coding Makes Requirements More Important

This was the biggest practical lesson for me.

Copilot can generate code quickly. That is useful when the direction is correct, and dangerous when it is not.

A vague requirement that previously led to a developer implementing the wrong thing over two days may now lead to the wrong implementation being produced in twenty minutes. The bottleneck has moved.

As implementation becomes faster, activities such as requirements analysis, architecture, constraint identification and validation become more valuable, not less.

This is where AI changes the engineering process in a very concrete way.

Before AI, a weak requirement often produced slow failure. The cost of wrong implementation was mainly the cost of time and iteration. With AI, a weak requirement can now be turned into a plausible-looking solution much faster. That can make poor decisions more expensive, not less.

This is one of the strongest arguments for engineering discipline in an AI-assisted world.

Good requirements, clear boundaries, real trade-off analysis and architecture review are not optional extras. They are the constraints that prevent speed from creating new kinds of failure.

AI does not remove the need for engineering judgement. It increases the value of it.

---

## Lesson 6: AI Makes Engineering Judgement More Valuable

The certification also reinforced something I already suspected from daily use: the ability to generate code is becoming less scarce, while the ability to decide whether the code should exist in the first place remains scarce.

An experienced engineer still has to evaluate the problem, the trade-offs and the risk.

That includes asking whether the proposed solution actually solves the real problem, whether there is a simpler approach, whether the implementation fits the architecture, whether the security model makes sense, whether the operational cost is acceptable and whether the generated code is maintainable.

Copilot can help with each of those activities, but it cannot remove accountability from the engineer.

The role shifts from producing every line manually to directing, constraining, evaluating and integrating the output.

That is what makes judgement so valuable.

The AI system can accelerate the work, but humans remain the ones responsible for deciding whether the output is appropriate, safe and aligned with organisational intent.

In many ways, AI raises the bar for good engineering judgement rather than lowering it.

---

## What GH-300 Changed for Me

<div>
  <img src="/img/articles/github-copilot-gh300/github-copilot.svg" alt="GitHub Copilot certification badge" width="180" />
</div>

I did not take GH-300 because I needed someone to teach me how to open Copilot Chat.

I took it because I wanted a more structured understanding of a tool that was becoming increasingly important in my engineering workflow.

The certification gave me a vocabulary for concepts I had already been bumping into through practice: context engineering, prompt processing, custom instructions, reusable skills, AI-assisted review and governance-aware workflow design.

More importantly, it pushed me toward the next set of questions I wanted to explore.

I became more interested in:

- context engineering
- instructions, skills and specialised agents
- AI-assisted requirements and architecture analysis
- AI-assisted PR review
- governance-aware engineering workflows

That is what made the exam valuable to me: not that it taught me a new prompt trick, but that it created a structure for thinking about the broader engineering system around AI.

---

## Final Thoughts

Copilot started as a way for me to write code faster. I now see it increasingly as a platform for building AI-assisted engineering workflows designed around context, constraints and human judgement.

AI may reduce the cost of producing code, but it does not reduce the importance of understanding the problem, choosing the right design or deciding whether the result should exist at all.

What happens to software engineering when producing code becomes dramatically cheaper, but understanding the right thing to build does not?

That is the question I want to keep exploring.
