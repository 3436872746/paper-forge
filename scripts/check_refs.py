#!/usr/bin/env python3
"""Check citations, labels and placeholders in a LaTeX paper.

Usage:
  python check_refs.py --tex main.tex --bib refs.bib --bbl main.bbl

Checks:
  - every cited key exists in the .bib and in the .bbl
  - first-use order of citations equals the .bbl item order (IEEE numeric style)
  - every \\ref has a \\label
  - obvious placeholders (TODO/TBD/??)
"""
import argparse, re, sys


def read(p):
    return open(p, encoding='utf-8', errors='ignore').read()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--tex', required=True)
    ap.add_argument('--bib', required=True)
    ap.add_argument('--bbl', default=None)
    a = ap.parse_args()

    tex = read(a.tex)
    cites = []
    for m in re.finditer(r'\\cite\{([^}]+)\}', tex):
        for k in m.group(1).split(','):
            k = k.strip()
            if k and k not in cites:
                cites.append(k)

    bib = re.findall(r'@\w+\s*\{\s*([^,]+),', read(a.bib))
    missing = [k for k in cites if k not in bib]
    print('cites %d | bib keys %d | cited-not-in-bib: %s' % (len(cites), len(bib), missing or 'none'))

    if a.bbl:
        bbl = re.findall(r'\\bibitem\{([^}]+)\}', read(a.bbl))
        print('bbl items %d' % len(bbl))
        if cites != bbl:
            print('ORDER MISMATCH -> rerun bibtex. First difference:')
            for i, (x, y) in enumerate(zip(cites, bbl)):
                if x != y:
                    print('  #%d cite=%s bbl=%s' % (i + 1, x, y))
                    break
        else:
            print('citation order == bbl order: OK')

    labels = set(re.findall(r'\\label\{([^}]+)\}', tex))
    refs = set(re.findall(r'\\(?:ref|eqref)\{([^}]+)\}', tex))
    print('refs without label: %s' % (sorted(refs - labels) or 'none'))

    for pat in ('TODO', 'TBD', 'FIXME', 'PLACEHOLDER', '??'):
        if pat in tex:
            print('placeholder %r appears %d times' % (pat, tex.count(pat)))


if __name__ == '__main__':
    main()
