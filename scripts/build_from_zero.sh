#!/usr/bin/env bash
# Build a LaTeX submission package from zero and audit it.
# Usage: bash build_from_zero.sh package.zip [main.tex]
set -euo pipefail

ZIP=${1:?usage: build_from_zero.sh package.zip [main.tex]}
MAIN=${2:-main.tex}
TMP=$(mktemp -d)
trap 'echo "build dir: $TMP"' EXIT

python - "$ZIP" "$TMP" <<'PY'
import sys, zipfile
zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])
PY

cd "$TMP"
for i in 1 2; do pdflatex -interaction=nonstopmode "$MAIN" >/dev/null 2>&1 || true; done
bibtex "${MAIN%.tex}" >/dev/null 2>&1 || true
pdflatex -interaction=nonstopmode "$MAIN" >/dev/null 2>&1 || true
pdflatex -interaction=nonstopmode "$MAIN" > build.log 2>&1 || true

grep -E '^Output written' build.log || true
echo "overfull: $(grep -c 'Overfull \\hbox' build.log || true)"
echo "errors:   $(grep -c '^! ' build.log || true)"
