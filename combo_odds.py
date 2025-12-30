#!/usr/bin/env python3
"""
Calculate the probability that all paying combos are hit
given N random attacks (sampling without replacement).

We have 3,024 total permutations, of which 336 are paying combos.
If we randomly select N unique attacks, what's the probability
that all 336 paying combos are among them?
"""

from math import comb
from fractions import Fraction

# Game parameters
TOTAL_PERMUTATIONS = 3024  # 9 * 8 * 7 * 6

# Paying combo counts
COMBO_4X = 1
COMBO_3X = 5
COMBO_2X = 36
COMBO_1X = 294

TOTAL_PAYING = COMBO_4X + COMBO_3X + COMBO_2X + COMBO_1X  # 336
NON_PAYING = TOTAL_PERMUTATIONS - TOTAL_PAYING  # 2688


def prob_all_paying_combos_hit(n_attacks):
    """
    Probability that all 336 paying combos are included in n_attacks random selections.

    This equals: C(2688, n-336) / C(3024, n)

    We must pick all 336 paying combos, then pick (n-336) from the 2688 non-paying.
    Divided by total ways to pick n from 3024.
    """
    if n_attacks < TOTAL_PAYING:
        return 0.0
    if n_attacks >= TOTAL_PERMUTATIONS:
        return 1.0

    # Number of non-paying slots to fill
    non_paying_to_pick = n_attacks - TOTAL_PAYING

    # Ways to pick the non-paying ones
    numerator = comb(NON_PAYING, non_paying_to_pick)

    # Total ways to pick n attacks from all permutations
    denominator = comb(TOTAL_PERMUTATIONS, n_attacks)

    return numerator / denominator


def main():
    print("=" * 70)
    print("PROBABILITY ALL PAYING COMBOS ARE HIT")
    print("=" * 70)

    print(f"\nTotal permutations:  {TOTAL_PERMUTATIONS:,}")
    print(
        f"Paying combos:       {TOTAL_PAYING} (4x: {COMBO_4X}, 3x: {COMBO_3X}, 2x: {COMBO_2X}, 1x: {COMBO_1X})"
    )
    print(f"Non-paying combos:   {NON_PAYING:,}")

    print(f"\nMinimum attacks to hit all paying combos: {TOTAL_PAYING}")

    print(f"\n{'Attacks':>10} {'P(all combos hit)':>20} {'Odds'}")
    print("-" * 70)

    # Generate attack counts: 100, 200, 300, ... up to 2900, then every single number from 3000+
    attack_counts = list(range(100, 3000, 100))
    attack_counts.extend(range(3000, TOTAL_PERMUTATIONS + 1))

    for n in attack_counts:
        prob = prob_all_paying_combos_hit(n)

        if prob == 0:
            odds_str = "impossible"
        elif prob == 1:
            odds_str = "guaranteed"
        elif prob < 1e-100:
            odds_str = "< 1 in 10^100"
        elif prob < 0.000001:
            odds_str = f"1 in {1 / prob:.2e}"
        else:
            odds_str = f"1 in {1 / prob:,.0f}"

        marker = ""
        if n == TOTAL_PERMUTATIONS:
            marker = " <- full coverage"

        print(f"{n:>10,} {prob:>20.10%} {odds_str}{marker}")

    # Show 50% threshold
    print(f"\n50% threshold: 3,019 attacks (99.8% of all permutations)")


if __name__ == "__main__":
    main()
