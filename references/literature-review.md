# Literature review — from a question to a defensible related-work section

Goal: not "read everything", but **place your claim on an axis** and be able to say,
for the three closest papers, exactly which sentence separates you from each.

## 1. Turn the question into search terms

Write three columns before searching:

| Concept | Synonyms / spellings | Must appear in the paper |
|---|---|---|
| the object | e.g. cache, KV cache, prefix cache | one of these |
| the action | split, partition, tier | one of these |
| the measure | hit rate, tail latency, miss ratio | one of these |

A paper must match at least one term from each column. This one rule removes most
of the noise a keyword search returns.

## 2. Search three sources, not one

- **arXiv API** — best coverage of recent preprints and abstracts.
- **OpenAlex** — venue metadata, citation counts, abstracts (reconstruct from the
  inverted index).
- **Semantic Scholar** — good relevance ranking; rate-limits aggressively, so pace
  requests and expect `429`.

Practical notes:
- Ask for abstracts, not just titles; a paper without an abstract cannot be
  triaged.
- Deduplicate by normalised title (lower-case, collapsed whitespace) **before**
  screening.
- Record for each hit: title, venue, year, DOI, and which query found it.

## 3. Screen in two passes

**Pass 1 — title + abstract (2 minutes per paper).** Keep if it matches the three
concept columns and reports an experiment, trace, simulation or measurement.
Drop surveys from the *mechanism* pool (a survey can orient you, but it cannot
give you a mechanism).

**Pass 2 — full text (only for the survivors).** Confirm the mechanism and the
evidence type. If you cannot state the mechanism in one sentence after reading,
it is not yet usable.

Record why a paper was dropped. A related-work section is easier to defend when
you can say "we excluded X because it assumes Y".

## 4. Extract into a triage matrix

One row per paper, five columns:

| Paper | Problem it attacks | Load-bearing assumption | Evidence type | Where it stops (boundary) | My one-sentence difference |
|---|---|---|---|---|---|

The last column is the only one that belongs in the paper. The others exist so you
can write it correctly.

Do **not** write the related-work section from abstracts. Use the matrix to decide
what to read, then write from the full text.

## 5. Read PDFs as text, never as pixels

Before any model reads a paper, convert formulas, tables and pseudocode to
Markdown/LaTeX. Two-column PDF parsing is a known source of invented numbers and
mis-attributed claims. Keep the original PDF as the source of record, and cite the
section/page where the mechanism is stated.

## 6. Verify every citation before it enters the bibliography

For each entry, check four things:

1. **It exists** — DOI resolves; the title matches the version you read.
2. **The version** — preprint v1 and v2 can differ in author list and numbers;
   pin the version you actually read.
3. **The sentence is supported** — the cited claim appears in the cited paper, not
   only in a related-work sentence inside it.
4. **The venue/year** — a preprint cited as a conference paper is a factual error
   the reviewer will find.

A citation locator (section, page, figure) next to your claim makes this check
mechanical.

## 7. Stop rule

Stop searching when **the last two queries return only papers already in the
matrix**. Anything you find after that goes to a "future work" note, not to the
paper.

## 8. Output of this phase

- A triage matrix (kept locally; not in the paper).
- Three to five **difference sentences**, one per closest paper.
- A claim–evidence map: each of your claims → the experiment that will support it
  (this feeds `integrity-audit.md`).

## Common traps

- Citing a mechanism read only in the abstract.
- Treating a survey as evidence that a mechanism works.
- Letting citation counts decide relevance; a highly cited paper can be five years
  off your axis.
- Using a related-work sentence from another paper as the source of a claim.
- Mixing two versions of the same preprint in one comparison.
