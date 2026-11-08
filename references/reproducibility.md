# Reproducibility and operations

## Artifacts

- Analysis scripts live beside the data; every reported number is produced by one.
- Keep a `verify.py` that recomputes each headline number from the raw files and
  prints a pass/fail table.
- A paper artifact is "done" only after a **from-zero build**:
  unpack into an empty directory, run the documented command sequence, and obtain
  the same page count and the same numbers.

## Build hygiene

- After editing text that changes citations, **rerun bibtex**. A stale `.bbl`
  keeps the old numbering while the PDF looks fine.
- Numbering follows first use; if a table is referenced before Table I exists,
  either move the float or point at the section instead.
- Remove old `.aux/.bbl/.out` before a clean build; otherwise a missing citation
  can be masked.

## Long jobs

- `setsid nohup cmd > out 2>&1 < /dev/null &`
- `[1]+ Done` means the parent exited, not that the job finished.
- Verify with two independent signals: a process check and a record count.
- While a batch runs: read only files already written.

## Shared servers

- Never use a broad `pkill -f`. `pgrep -af` -> exact PID -> kill -> re-check.
- Prefer a pidfile written at launch; fall back to a port owned by the project.
- Do not stop someone else's engine to free a device; wait or ask.

## Snapshots and versions

- Version artifacts by date/letter; never "final".
- A manifest lists large files that were excluded from the repository.
- Keep the exact environment (engine version, model, quantization) in `meta.txt`;
  the batch cannot observe these on its own.
