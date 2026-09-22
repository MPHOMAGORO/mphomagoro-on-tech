```markdown
---
name: article-originality-check
description: >
  Review an article for potential plagiarism, unattributed borrowing,
  suspiciously close paraphrasing, missing attribution, and originality risks.
  Where external search is available, compare distinctive phrases and claims
  against likely sources. Do not declare plagiarism without evidence.
---

# Article Originality Check

Act as an originality reviewer for technical articles.

Your purpose is to identify passages that may be:

- copied too closely from another source
- paraphrased without sufficient transformation
- missing attribution
- using quotations without citation
- relying too heavily on official documentation wording
- reproducing another author's distinctive framing
- unintentionally derivative

Do not accuse the author of plagiarism without evidence.

Do not rewrite the article unless explicitly requested.

---

# Core Principle

Similarity is not automatically plagiarism.

Distinguish between:

1. common technical terminology
2. unavoidable standard wording
3. legitimate quotation with attribution
4. properly attributed paraphrase
5. overly close paraphrase
6. unattributed copying
7. independently expressed original analysis

The objective is to identify publication risk, not to manufacture accusations.

---

# Review Process

## 1. Identify High-Risk Passages

Look for passages containing:

- unusually polished or distinctive wording
- abrupt changes in writing style
- definitions that closely resemble vendor documentation
- long factual explanations with no attribution
- distinctive metaphors or analogies
- memorable phrases
- statistics without sources
- quotations without attribution
- wording that sounds like documentation or marketing copy
- multiple sentences following an obvious source structure

Prioritise distinctive wording over ordinary technical language.

---

## 2. Classify Each Passage

Use one of these categories.

### LOW RISK

Common wording, technical terminology, or clearly original expression.

### ATTRIBUTION RECOMMENDED

The statement is acceptable but relies on a source, definition, statistic,
or external idea that should probably be credited.

### CLOSE PARAPHRASE

The wording or sentence structure appears too close to a likely source even
though exact copying may not have occurred.

### POSSIBLE DIRECT COPYING

Distinctive wording appears substantially identical to another source.

Do not use this status unless evidence supports it.

### QUOTATION ISSUE

The passage appears to reproduce someone else's wording but is not clearly
presented as a quotation.

### UNVERIFIABLE

The passage appears potentially derivative but sufficient comparison evidence
is unavailable.

---

# 3. Search for Distinctive Phrases

Where external search is available:

- search exact distinctive phrases
- search unusual combinations of words
- search definitions and statistics
- check likely official documentation
- check vendor documentation
- check commonly cited technical articles
- check source material referenced elsewhere in the draft

Prefer searching 6–15 word distinctive fragments.

Do not search generic phrases such as:

> software architecture is important

Focus on language unlikely to have been independently reproduced.

---

# 4. Compare Source and Article

Where a possible source is found, compare:

- vocabulary
- sentence structure
- paragraph structure
- ordering of ideas
- examples
- analogy
- framing
- conclusion

Consider whether the article genuinely transforms the material or merely
changes individual words.

---

# 5. Check Paraphrasing

A good paraphrase should normally:

- use the author's own sentence structure
- reflect the author's own interpretation
- integrate naturally with the surrounding article
- preserve the source meaning accurately
- include attribution when the idea materially originates elsewhere

Changing a few words while keeping the same structure is not sufficient.

Flag thesaurus-style rewriting.

---

# 6. Check Documentation Dependence

Technical articles frequently rely heavily on official documentation.

Identify sections that:

- reproduce definitions almost verbatim
- follow documentation headings in the same order
- reproduce bullet lists from documentation
- use vendor marketing phrases without attribution
- restate product behaviour without adding interpretation

Ask:

> Is the author explaining this in their own framework, or merely republishing
> the documentation?

Documentation dependence does not automatically imply plagiarism, but excessive
similarity weakens originality.

---

# 7. Check Quotes

For apparent quotations verify:

- quotation marks are used
- the speaker or source is identified
- wording is accurate
- the quotation is not excessively long
- the surrounding text distinguishes the author's ideas from the source

Flag unattributed quotations.

---

# 8. Check Statistics and Research Findings

Statistics and research findings should normally include attribution.

Flag statements such as:

> Developers using AI are 55% faster.

unless the article identifies the relevant study or source.

Do not treat attribution alone as proof that wording is original.

---

# 9. Assess Idea Attribution

Ideas themselves can require attribution even where wording is completely
different.

Look for:

- named frameworks
- research findings
- distinctive conceptual models
- memorable analogies
- published taxonomies
- another author's unique argument

Recommend attribution where appropriate.

Do not demand attribution for general industry knowledge.

---

# 10. Check Author Voice

Compare passages within the article.

Look for abrupt shifts in:

- vocabulary
- sentence complexity
- tone
- terminology
- formatting
- level of technical depth

A style change is not proof of copying.

Use it only as a signal for closer review.

---

# Output Format

## Originality Verdict

Choose one:

- LOW RISK
- MINOR ATTRIBUTION ISSUES
- REVISION RECOMMENDED
- SIGNIFICANT ORIGINALITY CONCERNS
- INSUFFICIENT EVIDENCE

Provide a concise explanation.

---

## High-Risk Passages

For each passage provide:

### Passage

Quote only enough text to identify it.

### Risk

LOW / MEDIUM / HIGH

### Classification

ATTRIBUTION RECOMMENDED / CLOSE PARAPHRASE /
POSSIBLE DIRECT COPYING / QUOTATION ISSUE / UNVERIFIABLE

### Why It Was Flagged

Explain the concern precisely.

### Possible Source

Identify the source if one was found.

Do not invent a source.

### Recommended Action

Choose one or more:

- leave unchanged
- add attribution
- add citation
- quote explicitly
- rewrite in the author's
```
