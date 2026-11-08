# Submission checklist

> 中文版: [submission.zh.md](submission.zh.md)

## Format

- Use the venue's **current** template. If the CFP changed template families
  (e.g. ACM -> IEEE), recompile from the new class; do not port a preamble by hand.
- Page limit: body pages + references-only pages (commonly 6+1). The references
  page must contain only references.
- Two columns, 9-10 pt, US Letter unless the CFP says otherwise.
- Keep the document class default layout: no global spacing overrides. If the body
  overflows, cut words, not the template's float spacing.
- Extra packages are normal (tables, URLs, alt text). They are not a format
  violation; a different document class is.

## Mechanical audit (run before packaging)

1. `pdflatex` from a **clean copy** of the package (unzip elsewhere).
2. Page count and the location of the references page.
3. Overfull boxes = 0; LaTeX errors = 0.
4. Citation numbering: first-use order equals the `.bbl` order; every `\cite` key
   exists; no `??`.
5. Figures/tables: numbering follows first reference; every float is referenced.
6. PDF metadata: title/author empty for double-blind; no acknowledgements, no
   institution, no e-mail, no local paths.
7. Fonts embedded; page size correct.
8. File list: main .tex, bibliography, figures; no .aux/.log/.bbl from an older run.

## Double-blind

- Third-person self-citation.
- No funding acknowledgement in the submitted PDF.
- No links to your own repositories in the body.
- Author names/affiliations go into the submission system, not the PDF.

## Authors and conflicts (abstract stage)

- Full names, affiliations, countries, e-mails for **all** authors.
- Conflicts of interest with TPC members (advisor/student, co-authorship within
  N years, same institution).
- Missing author or COI information is a desk-reject trigger; authors usually
  cannot be changed after the abstract deadline.

## AI-generated content

Check the current CFP. Typical policy: LLM-generated text/figures/code must be
disclosed in a dedicated section (model, sections, how used); routine editing,
translation, and retrieval are usually exempt. Decide early: the disclosure costs
space and must fit before the references page.

## Packaging and naming

- Name artifacts `VENUE_KIND_YYYYMMDD[letter]`; never "final".
- Keep the previous artifact; do not overwrite the PDF you might need to compare.
- After packaging, build from the zip once more and record the hash.
