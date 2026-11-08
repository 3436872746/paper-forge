# Casebook — silent traps

> 中文版: [casebook.zh.md](casebook.zh.md)

Each entry: symptom -> root cause -> check. All are from real papers; details are
generalised, and no entry refers to an unpublished manuscript. Published worked
examples are in `examples.md`. Read this list once before submission.

## Data and batches

1. **Perfect numbers.** Latency near zero, failures exactly zero, SLO 100% on a
   loaded system. Root: the engine is dead and the proxy is reporting success.
   Check: a sentinel request through the same path; latency distribution.
2. **Overwritten batch.** A re-run without a new OUT silently replaced a batch.
   Check: `OUT` must not exist, or must be declared as reuse.
3. **Wrong model label.** The output directory says 14B; the engine was 7B.
   Check: `EXPECT_MODEL` guard + `meta.txt` records the queried model.
4. **Warm-up counted.** The first rounds include calibration drift.
   Check: pre-register which rounds are analysed; the floor is computed on the
   same rounds.
5. **Two batches in one sentence.** Numbers from different batches are compared
   as if paired. Check: every sentence names one batch, or says "separate".
6. **Sampling with replacement as the unit.** Requests repeated four times are
   not independent. Check: the paired unit is the seed/round.
7. **Killed the wrong PID.** A broad pattern hit another user's process.
   Check: pidfile + exact PID + re-check; never `pkill -f`.
8. **"Done" from setsid.** The shell job ended; the batch did not.
   Check: process check and record count.

## Measurement

9. **Budget vs realization.** `max_tokens` is a client cap, not the generated
   length. Check: use a realized-length field; say so in the text.
10. **Median convention.** Lower median vs interpolated median can shift a ratio
    by a few percent. Check: state the convention; recompute both.
11. **Coverage of a quantile predictor.** A 95% quantile is not a hard bound;
    report empirical coverage, not the nominal level.
12. **Aggregate hides class.** A short-request median can be near-oracle while a
    class is 50x worse. Check: report one class-level or tail metric.
13. **Floor from the wrong arm.** The floor must come from identical arms, not
    from a placebo policy with real consequences.
14. **CI vs min-max.** Mixing `[min,max]` and 95% CI in one paper. Check: define
    once, label the exceptions.
15. **Permutation needed.** Offline replays compared without a null distribution.
    Check: shuffle labels, report the null band.
16. **G max depends on the stream order.** A windowed statistic computed on one
    arbitrary order. Check: report the max over several orders, or fix the order.
17. **Fewer than the stated pairs.** `C(7,2)=21` but only some were tested; the
    text says "significant reversals" without the denominator. Check: count.

## Claims and prose

18. **Average error vs its distribution.** "The estimator is wrong" is not "the
    order is wrong". Check: show the ordering consequence.
19. **Direction reversed.** "Serves the long class late" when the injection makes
    it first. Check: trace one request through the key.
20. **"Robust" without a robustness sweep.** Check: every adjective is tested.
21. **A control without its comparator.** A workload with no baseline arm is
    cited as evidence for the mechanism. Check: the claim names the comparison.
22. **Conditional mechanism sold as universal.** Check: the abstract and title
    carry the condition.
23. **Defensive stacking.** The same limitation explained in four sections.
    Check: one sentence in Limits, one clause in the abstract.
24. **Deleting scope to save space.** Check: cut wording; the ledger protects the
    evidence.
25. **Citation mischaracterised.** A prior system's mechanism described from
    memory. Check: read the source section and quote it.
26. **Self-citation in first person** under double-blind. Check: third person.

## Layout and submission

27. **Manual spacing to fit pages.** A dozen `\setlength` lines compress floats.
    Check: remove what is not necessary; if it is necessary, say so in the source.
28. **Table referenced before Table I.** Check: first references in increasing
    order.
29. **Stale bibliography.** Edited citations without rerunning bibtex.
    Check: first-use order == `.bbl` order.
30. **Package built from an old directory.** Check: from-zero build in an empty
    folder.
31. **The wrong zip.** A long version with the same name pattern uploaded as the
    submission. Check: template + page count, not the filename.
32. **Anonymous metadata leak.** PDF title/author, acknowledgements, local paths.
    Check: metadata + `strings`.
33. **Abstract word limit.** The submission form is not the paper abstract.
    Check: count the form text.
34. **Missing authors/COI.** Desk reject. Check: list complete before the abstract
    deadline; authors cannot change later.
35. **AI disclosure omitted.** Check the current CFP and decide explicitly.

## Tools and environment

36. **Heredoc through a wrapper eats backslashes.** Write `.tex`/scripts with an
    editor, not a shell heredoc through another shell.
37. **Windows Python does not see Unix env vars.** Pass arguments; print the
    selected batch before running.
38. **Import executes a fixer.** A module without `__main__` wrote into the paper
    when imported for its batch table. Check: parse with `ast`, never import.
39. **Two copies of a figure.** LaTeX uses the one in the working directory, not
    `figs/`. Check: update both or set `\graphicspath`.
40. **Encoding.** A console codec (GBK) breaks Chinese/Unicode output mid-script.
    Check: set `PYTHONIOENCODING=utf-8`.
