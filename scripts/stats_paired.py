#!/usr/bin/env python3
"""Paired statistics for systems papers.

Usage as a library:
    from stats_paired import paired_ci, permutation_p

Usage from the command line (CSV with two columns, one row per paired unit):
    python stats_paired.py --csv diffs.csv --col-a a --col-b b [--perm]

Prints: median of paired differences, 95% bootstrap CI of the median, number of
units with a positive difference, and (with --perm) a two-sided permutation p.
"""
import argparse, bisect, csv, random, statistics


def paired_ci(a, b, B=10000, seed=7):
    d = [x - y for x, y in zip(a, b)]
    rng = random.Random(seed)
    n = len(d)
    med = sorted(statistics.median([d[rng.randrange(n)] for _ in range(n)]) for _ in range(B))
    return statistics.median(d), med[int(0.025 * B)], med[int(0.975 * B)], sum(1 for x in d if x > 0), n


def permutation_p(a, b, B=2000, seed=11):
    """Two-sided permutation test on the difference of medians."""
    obs = abs(statistics.median(a) - statistics.median(b))
    pool = list(a) + list(b)
    n = len(a)
    rng = random.Random(seed)
    cnt = 0
    for _ in range(B):
        rng.shuffle(pool)
        if abs(statistics.median(pool[:n]) - statistics.median(pool[n:])) >= obs:
            cnt += 1
    return obs, (cnt + 1) / (B + 1)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--csv', required=True)
    ap.add_argument('--col-a', required=True)
    ap.add_argument('--col-b', required=True)
    ap.add_argument('--perm', action='store_true')
    a = ap.parse_args()
    rows = list(csv.DictReader(open(a.csv, encoding='utf-8')))
    x = [float(r[a.col_a]) for r in rows]
    y = [float(r[a.col_b]) for r in rows]
    m, lo, hi, pos, n = paired_ci(x, y)
    print('n=%d median delta=%.4f CI=[%.4f, %.4f] positive=%d/%d' % (n, m, lo, hi, pos, n))
    if a.perm:
        obs, p = permutation_p(x, y)
        print('permutation |median diff|=%.4f p=%.4f' % (obs, p))


if __name__ == '__main__':
    main()
