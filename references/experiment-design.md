# Experiment design

> 中文版: [experiment-design.zh.md](experiment-design.zh.md)

## 1. Arms and controls

Every batch contains:

- the **treatment** arms;
- at least one **placebo / identical** arm (same code, different label) to measure
  the run-to-run floor;
- the **oracle** arm when the claim is about an estimate (it bounds what any
  ordering could achieve).

Name the arm that *cannot* respond to the independent variable. If there is none,
the design cannot separate signal from noise.

## 2. Pre-register the criteria

Before the run, write, in the batch header:

- P1..Pn: the conditions that must hold for the mechanism to be supported;
- the floor for each metric;
- what counts as "not distinguishable";
- the aggregation convention (which median, which rounds are analysed).

After the run, a criterion cannot be added. A criterion that fired on a
different metric does not count.

## 3. Batch manifest

Each batch writes `meta.txt` with:

```
script, git commit, date, OUT, N, K, load/rho, model, quantization,
seeds, rounds analysed, environment (engine version), expected model
```

Anything the batch cannot observe (model, engine flags) must be **declared,
guarded before start, and recorded**. Guard form: query the engine's `/v1/models`
and refuse to run on a mismatch.

## 4. Output discipline

- Every run gets a new `OUT`; re-runs must differ explicitly.
- Batch scripts must fail loudly if `OUT` exists and was not declared as reuse.
- Long jobs: `setsid nohup ... > out.txt 2>&1 < /dev/null &`.
  `[1]+ Done` is the parent exiting; verify with `pgrep -af 'bash run_'` and by
  counting completed records in the log.
- While a batch runs, do not start, stop, or probe anything that shares the
  engine.

## 5. Shared machines

- Never kill by broad pattern. `pgrep -af` → pick the exact PID → kill → re-check.
- Prefer pidfiles written by your own launcher; fall back to a port that only
  your project uses.
- Cleanup scope = what this session created. If ownership is unclear, print the
  list and stop.

## 6. Reproducibility

- Pin the seeds; record the per-arm round order.
- A paper artifact is accepted only after a **from-zero build**: unzip the
  submitted package, run the documented commands, obtain the same page count and
  the same numbers.
- Keep the analysis scripts in the repository; a number without a script is a
  rumour.

## 7. Negative and void batches

Record every batch that failed or was invalidated:

```
batch id | why void | what it can still be cited for | replacement batch
```

A void batch that is not recorded will be cited six weeks later.
