#!/usr/bin/env python3
"""Audit a compiled paper PDF (and optionally the LaTeX log).

Usage:
  python page_audit.py --pdf main.pdf [--log main.log] [--refs-heading REFERENCES]

Reports: page count, page size, the page where the references start, overfull
boxes, PDF metadata, and the first page of each figure caption containing
"Figure N" in its text.
"""
import argparse, re

import pymupdf


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--pdf', required=True)
    ap.add_argument('--log', default=None)
    ap.add_argument('--refs-heading', default='REFERENCES')
    a = ap.parse_args()

    d = pymupdf.open(a.pdf)
    print('pages:', len(d), '| size: %.0f x %.0f pt' % (d[0].rect.width, d[0].rect.height))
    print('metadata title/author: %r / %r' % (d.metadata.get('title'), d.metadata.get('author')))

    refs_page = None
    for i, p in enumerate(d):
        if a.refs_heading in p.get_text():
            refs_page = i + 1
            break
    print('references start on page:', refs_page)

    figs = {}
    for i, p in enumerate(d):
        for m in re.finditer(r'Figure\s+(\d+)[.:]', p.get_text()):
            figs.setdefault(int(m.group(1)), i + 1)
    if figs:
        print('figure caption pages:', ', '.join('Fig %d -> p%d' % kv for kv in sorted(figs.items())))

    if a.log:
        log = open(a.log, encoding='utf-8', errors='ignore').read()
        over = len(re.findall(r'Overfull \\hbox', log))
        err = len(re.findall(r'^! ', log, re.M))
        print('overfull hboxes:', over, '| latex errors:', err)
        undef = re.findall(r'There were undefined references|Citation .* undefined', log)
        print('undefined refs/cites:', len(undef))


if __name__ == '__main__':
    main()
