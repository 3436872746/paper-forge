# Gates and rules

Nine gates before handing over a command, a batch, or a claim. Each one is here
because it was violated once and the violation was silent.

## A — Synthetic dry run
Feed the summariser/verdict/controller logic an input whose answer you know.
Examples: a synthetic table where the median is obvious; a replay where the
oracle arm must win; a parser on two rows with known fields.
If a control path cannot be dry-run, it is not ready.

## B — Placebo / zero-effect arm
Every experiment needs an arm that provably cannot respond to the independent
variable (identical copies, shuffled keys, no-op policy). Measure its spread in
the metric's own unit. That spread is the floor.
- Two identical arms: floor = max paired deviation per round.
- Three arms: floor = max over pairs of per-round spread.
Nothing below the floor is a difference — not "small", not "trending".

## C — Same-state principle
Any parameter computed from readings must be computed in the *same state* it
will act on. Calibration from a warm-up, a different load, or a different batch
is not the same state.
Typical failure: a rate measured during saturation used to label a non-saturated
run; a predictor calibrated on one workload applied to another without saying so.

## D — Criterion vs its historical value
When the protocol says "stop when stable" / "the first verdict wins" / "after
three agreements", implement the criterion, not the constant from the run that
inspired it. Hard-coded `12`, `n=5`, `0.25` are suspects.

## E — Metric matches purpose
Write down which metric the experiment exists to move, then check it is in the
automated audit list. A run that "passed" because the audit checked a different
metric is not a pass.

## F — Second variable
Before attributing to X, list everything else that changed between arms
(load, batch composition, K, warm-up, hardware). If two changed, you have a
correlation, not a cause.

## G — Source vs retelling
Every number written into a paper is recomputed from the raw file by a script.
"Looks reasonable" is how two unreproducible numbers survived a day-1 check.
Also: filter values (not just column names) must be checked against the actual
data domain before using them.

## H — Assertion about code or command effect
Any sentence of the form "the code does X" or "this will produce Y" requires a
grep or a dry run first. Reading the comment is not reading the code.

## I — Dry-run contract
A "dry run" that starts engines, sends requests, or writes outputs is not a dry
run. Declare what the script can touch before invoking it; prefer `DRY=1` plus a
hard guard that exits before the first external call.

---

# Rules

1. While a batch runs, read only files already on disk. No restart, no probe, no
   watcher that sends requests.
2. Re-running a batch requires an explicit, different output directory. Defaults
   overwrite silently.
3. Move/archive data by copying. Never rename a directory that git tracks.
4. `ls`/`grep` before copying a path or a parameter name from memory.
5. Numbers too good to be true are failures first: latency near zero, failures
   exactly zero, throughput jumping an order of magnitude.
6. "Written" is not "run". After writing a batch or a fix, execute it once; the
   criterion is a file timestamp newer than the script and no old string left.
7. Before changing a data structure, grep every reader of it.
8. Paragraph/row indices are looked up live, never copied from an export.
9. Engine-side properties (model, quantization, block size, concurrency) must be
   declared, guarded before the run, and recorded in `meta.txt`.
10. Kill by PID from a pidfile, after `pgrep -af`; re-check after killing. Never
    use a broad pattern on a shared machine. `setsid ... &` returning "Done" is
    the parent exiting, not the batch finishing.
11. Cleanup scope = only what this session created and tagged. If unsure who made
    it, report the list instead of deleting.
12. A "read-only" claim must be guaranteed by the callee's structure: check for a
    `__main__` guard / write flags before importing or running it.
13. Environment variables do not cross from a Unix shell into a Windows executable.
    Pass arguments, or print the selected batch before running.
14. On shared machines, broad `pkill -f` is an incident. Use pidfiles and ports.

---

# Disease types (recognise the shape, not the instance)

- **A — freezing a live rule into a literal.** A comment explains a mechanism the
  code implements only halfway; a new independent variable needs all its sites.
- **B — reading a parameter in a state other than the one it acts on.**
- **C — defining/checking before the thing it depends on exists.**
- **D — verdict logic that fabricates a conclusion** (passes on the wrong metric,
  treats a missing condition as satisfied).
- **E — attributing to one of two variables that moved together.**
- **F — asserting from memory without going back to the source.**
- **G — building on bad data; ending with an over-broad claim.**
- **H — intruding into a running system.**
- **I — environment/operation layer** (paths, shells, encodings, page limits).

When you meet a new bug, name its shape. The same shape will return under another
name in two weeks.
