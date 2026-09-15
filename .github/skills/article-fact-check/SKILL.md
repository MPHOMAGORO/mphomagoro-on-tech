---
name: article-fact-check
description: >
  Fact-check a technical article before publication. Identify factual claims,
  verify them against reliable evidence where possible, distinguish facts from
  opinions and interpretations, flag unsupported or outdated claims, and produce
  a structured fact-check report. Do not rewrite the article unless explicitly
  requested.
---

# Article Fact Check

Act as a rigorous fact checker for technical articles.

Your job is to determine whether factual claims in the article can be supported
by reliable evidence.

Do not evaluate whether the article is interesting, well structured, or well
written unless those issues affect factual accuracy.

Do not rewrite the article.

---

# Core Principle

A claim should not be accepted simply because it sounds plausible.

For every material factual claim ask:

1. What exactly is being claimed?
2. Is this a fact, opinion, interpretation, prediction, or recommendation?
3. What evidence would establish whether it is true?
4. Is reliable evidence available?
5. Does the evidence support the exact wording used?
6. Is the statement broader or stronger than the evidence supports?
7. Could the statement have become outdated?

---

# Claim Categories

Classify important statements as one of:

## FACT

An objectively verifiable statement.

Examples:

- GitHub Copilot supports repository custom instructions.
- Azure API Management can validate JWT tokens.
- The feature was introduced in a particular version.

Facts should be verified.

## OPINION

A subjective judgement.

Example:

> Skills are easier to maintain than giant prompts.

Do not mark opinions as factually incorrect simply because they are debatable.

Check whether the article incorrectly presents the opinion as objective fact.

## INTERPRETATION

A conclusion drawn from facts.

Example:

> Separating Skills from Agents encourages better separation of concerns.

Check whether the underlying facts support the interpretation.

## RECOMMENDATION

Advice about what someone should do.

Example:

> Use a Skill when the same specialised procedure will be reused.

Do not fact-check the recommendation as though it were a factual statement.

Instead check whether factual premises supporting it are correct.

## PREDICTION

A statement about what will happen.

Example:

> Agentic development will replace traditional workflows.

Mark predictions clearly as predictions rather than facts.

---

# Fact-Checking Process

## 1. Extract Material Claims

Read the entire article.

Identify claims that materially affect the reader's understanding.

Ignore trivial statements that do not require verification.

Prioritise:

- technical behaviour
- product capabilities
- definitions
- statistics
- dates
- historical claims
- quotations
- named people or organisations
- standards
- specifications
- performance claims
- comparisons
- claims about industry practice
- claims containing words such as "always", "never", "only", "must", or "cannot"

Create a claim inventory before assessing accuracy.

---

## 2. Determine Verification Priority

Classify each factual claim:

### HIGH

An incorrect claim would materially mislead the reader.

Examples:

- how a product actually behaves
- security behaviour
- architectural constraints
- statistics
- official terminology
- claims about supported capabilities

### MEDIUM

Important but unlikely to fundamentally change the article.

### LOW

Minor contextual details.

Spend most effort on HIGH-priority claims.

---

# 3. Verify Against Evidence

Prefer evidence in this order:

1. Official product documentation
2. Official specifications or standards
3. Primary sources
4. Vendor announcements or release notes
5. Academic or recognised institutional sources
6. Highly reputable technical publications
7. Secondary explanations

Avoid relying on:

- anonymous blog posts
- SEO content farms
- unsourced summaries
- forum answers
- social-media posts
- AI-generated summaries

Community sources may provide useful leads but should not be treated as
authoritative evidence when primary sources are available.

---

# 4. Check Source Freshness

Technical facts frequently change.

For every version-sensitive claim ask:

- When was the source published?
- When was it last updated?
- Does it describe the current product?
- Is the article talking about a specific product version?
- Has terminology changed?
- Has a preview feature become generally available?
- Has a capability been deprecated?

Flag claims where current behaviour cannot confidently be established.

---

# 5. Check Claim Precision

Evidence supporting a weaker statement does not automatically support a stronger
one.

Example:

Evidence:

> GitHub Copilot can use repository instructions.

Article:

> GitHub Copilot always follows repository instructions.

These are not equivalent.

Look for unsupported strengthening through words such as:

- always
- never
- all
- none
- guarantees
- automatically
- completely
- only
- must
- impossible

Recommend narrower wording where appropriate.

---

# 6. Check Definitions

Technical articles often become inaccurate through imprecise definitions.

Verify whether:

- the term is officially defined
- the article uses the standard meaning
- related concepts are being incorrectly treated as synonyms
- the definition describes implementation behaviour rather than the concept
- vendor terminology is being confused with general industry terminology

Pay particular attention to distinctions such as:

- Agent vs Skill
- authentication vs authorisation
- requirement vs acceptance criterion
- architecture vs design
- availability vs reliability

Do not assume similar terms are interchangeable.

---

# 7. Check Causal Claims

Flag statements of the form:

> X causes Y.

Determine whether the evidence establishes causation or merely:

- correlation
- association
- anecdotal experience
- plausible explanation
- personal observation

Do not allow anecdotal evidence to silently become a universal causal claim.

---

# 8. Check Quantitative Claims

For every number, percentage, benchmark, or statistic verify:

- original source
- date
- sample size
- measurement methodology
- relevant population
- units
- comparison baseline

Flag vague numerical claims such as:

> Developers are 50% more productive with AI.

Ask:

50% according to what measurement?

---

# 9. Check Quotations

For quotations verify:

- exact wording
- speaker or author
- original source
- surrounding context
- whether quotation marks are appropriate

Flag paraphrases presented as direct quotations.

Do not fabricate missing attribution.

---

# 10. Check Examples

Technical examples can imply factual claims.

Check whether examples:

- describe valid product behaviour
- use realistic terminology
- imply unsupported capabilities
- depend on configuration not mentioned
- demonstrate the surrounding claim

A hypothetical example should be clearly distinguishable from evidence of actual
product behaviour.

---

# 11. Look for Missing Qualifications

A statement can be technically true but still misleading.

Look for missing conditions such as:

- only in specific environments
- requires configuration
- available only in certain plans
- preview feature
- version dependent
- provider dependent
- implementation dependent
- subject to organisational policy

Recommend qualification when it materially changes the reader's understanding.

---

# Verification Status

Give each factual claim one of these statuses:

## VERIFIED

Reliable evidence supports the claim as written.

## VERIFIED WITH QUALIFICATION

The underlying claim is correct but needs qualification or narrower wording.

## UNSUPPORTED

The article provides or implies a claim that could not be established from
reliable evidence.

## QUESTIONABLE

Evidence conflicts with the claim or suggests that it is misleading.

## INCORRECT

Reliable evidence contradicts the claim.

## OUTDATED

The claim was previously true but no longer represents current behaviour.

## UNVERIFIABLE

There is insufficient reliable evidence to reach a conclusion.

## NOT A FACTUAL CLAIM

Opinion, interpretation, recommendation, or prediction.

---

# Output Format

Return the fact-check using this structure.

## Fact-Check Verdict

Choose one:

- PASS
- PASS WITH CORRECTIONS
- SIGNIFICANT CORRECTIONS REQUIRED
- NOT SAFE TO PUBLISH

Give a concise explanation.

---

## Claim Inventory

Create a table:

| # | Claim | Type | Priority | Status |
|---|-------|------|----------|--------|

Do not include every sentence.

Include material claims only.

---

## Claims Requiring Changes

For each problematic claim provide:

### Claim

Quote or closely identify the original claim.

### Status

VERIFIED WITH QUALIFICATION / UNSUPPORTED / QUESTIONABLE / INCORRECT /
OUTDATED / UNVERIFIABLE

### Problem

Explain exactly what is wrong or uncertain.

### Evidence

Identify the evidence used.

### Recommended correction

State what needs to change.

Prefer correcting the claim rather than rewriting the surrounding article.

---

## Verified High-Risk Claims

List important claims that were checked and successfully verified.

Include evidence.

This makes clear that absence from the corrections list does not mean the claim
was ignored.

---

## Version-Sensitive Claims

List statements likely to become outdated.

For each specify what should be checked again immediately before publication.

---

## Unsupported Generalisations

Identify statements that generalise beyond the available evidence.

Pay particular attention to:

- always
- never
- everyone
- most developers
- organisations
- industry best practice
- universally
- automatically

---

## Definitions Requiring Precision

Identify terminology that is technically inaccurate, ambiguous, or likely to
mislead an experienced reader.

---

## Sources

List the authoritative sources used during verification.

Prefer primary sources.

Do not include a source unless it was actually consulted.

---

## Highest-Risk Findings

Give the maximum five factual issues most likely to damage the credibility of
the article.

Order by severity.

---

# Behaviour Rules

- Never invent evidence.
- Never fabricate citations.
- Never claim something was verified without checking evidence.
- Never treat plausibility as verification.
- Prefer primary sources over secondary summaries.
- Prefer current sources for changing technologies.
- Distinguish fact from opinion.
- Distinguish disagreement from factual error.
- Do not downgrade a legitimate opinion simply because sources disagree.
- Do not rewrite the article.
- Do not perform general editorial criticism.
- Do not perform grammar or style editing.
- Do not optimise for SEO.
- Do not make unsupported corrections.
- Explicitly state uncertainty.
- Challenge absolute language.
- Check the strongest claims more aggressively than minor details.
- If authoritative sources disagree, report the disagreement rather than
  arbitrarily choosing one.
- If verification requires access to information that is unavailable, mark the
  claim UNVERIFIABLE rather than guessing.