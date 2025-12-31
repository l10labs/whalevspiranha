#!/usr/bin/env python3
"""
Whale vs Piranha - Game Simulation (Highly Optimized)

Simulates entire runs at once using aggregate random sampling.
"""

import random
from statistics import mean, stdev
import math

# =============================================================================
# GAME PARAMETERS
# =============================================================================

WHALE_RESERVE = 1000
ATTACK_COST = 0.10
CYCLES_PER_RUN = 1000
CYCLE_DURATION_SECONDS = 60

# Simulation parameters
NUM_SIMULATIONS = 1000

# Total permutations: 9 * 8 * 7 * 6 = 3024
TOTAL_PERMUTATIONS = 3024

# Combo probabilities and payouts
COMBO_4X_PROB = 1 / 3024
COMBO_3X_PROB = 5 / 3024
COMBO_2X_PROB = 36 / 3024
COMBO_1X_PROB = 294 / 3024

PAYOUT_4X = 100.00
PAYOUT_3X = 10.00
PAYOUT_2X = 1.00
PAYOUT_1X = 0.10


def sample_normal(mean_val, std_val):
    """Sample from normal distribution, clamped to non-negative."""
    return max(0, random.gauss(mean_val, std_val))


def simulate_run_aggregate(num_cycles, attacks_per_cycle):
    """
    Simulate an entire run by treating the total attacks as one big sample.

    Total attacks across all cycles = num_cycles * attacks_per_cycle
    We sample how many of those hit each combo type.
    """
    total_attacks = num_cycles * attacks_per_cycle

    # Expected hits for each combo type
    exp_4x = total_attacks * COMBO_4X_PROB
    exp_3x = total_attacks * COMBO_3X_PROB
    exp_2x = total_attacks * COMBO_2X_PROB
    exp_1x = total_attacks * COMBO_1X_PROB

    # Standard deviations (binomial)
    std_4x = math.sqrt(total_attacks * COMBO_4X_PROB * (1 - COMBO_4X_PROB))
    std_3x = math.sqrt(total_attacks * COMBO_3X_PROB * (1 - COMBO_3X_PROB))
    std_2x = math.sqrt(total_attacks * COMBO_2X_PROB * (1 - COMBO_2X_PROB))
    std_1x = math.sqrt(total_attacks * COMBO_1X_PROB * (1 - COMBO_1X_PROB))

    # Sample hits from normal approximation
    hits_4x = sample_normal(exp_4x, std_4x)
    hits_3x = sample_normal(exp_3x, std_3x)
    hits_2x = sample_normal(exp_2x, std_2x)
    hits_1x = sample_normal(exp_1x, std_1x)

    # Calculate totals
    total_revenue = total_attacks * ATTACK_COST
    total_payout = (
        hits_4x * PAYOUT_4X
        + hits_3x * PAYOUT_3X
        + hits_2x * PAYOUT_2X
        + hits_1x * PAYOUT_1X
    )

    profit = total_revenue - total_payout

    return profit, hits_4x


def run_simulation_for_attack_count(attacks_per_cycle):
    """Run simulation for a specific attack count and return summary stats."""
    profits = []
    counts_4x = []

    for _ in range(NUM_SIMULATIONS):
        profit, count_4x = simulate_run_aggregate(CYCLES_PER_RUN, attacks_per_cycle)
        profits.append(profit)
        counts_4x.append(count_4x)

    return {
        "attacks": attacks_per_cycle,
        "avg_profit": mean(profits),
        "std_profit": stdev(profits),
        "min_profit": min(profits),
        "max_profit": max(profits),
        "losing_runs": sum(1 for p in profits if p < 0),
        "avg_4x": mean(counts_4x),
    }


def main():
    print("=" * 90)
    print("WHALE VS PIRANHA - SIMULATION")
    print("=" * 90)

    # Time calculations
    total_seconds = CYCLES_PER_RUN * CYCLE_DURATION_SECONDS
    total_minutes = total_seconds / 60
    total_hours = total_minutes / 60
    total_days = total_hours / 24

    print(f"\nSimulation Parameters:")
    print(f"  Whale Reserve:      ${WHALE_RESERVE:,}")
    print(f"  Cycles per Run:     {CYCLES_PER_RUN:,}")
    print(f"  Cycle Duration:     {CYCLE_DURATION_SECONDS} seconds")
    print(f"  Number of Runs:     {NUM_SIMULATIONS:,}")
    print(f"  Time per Run:       {total_hours:.2f} hours ({total_days:.2f} days)")

    attack_counts = [100, 500, 1000, 5000, 10000]

    print(f"\nRunning simulations for attack counts: {attack_counts}")
    print("-" * 90)

    all_results = []
    for attacks in attack_counts:
        print(f"  Simulating {attacks:,} attacks per cycle...")
        result = run_simulation_for_attack_count(attacks)
        all_results.append(result)

    # Print summary table
    print(f"\n{'=' * 90}")
    print("RESULTS SUMMARY (per run = {:.2f} hours)".format(total_hours))
    print("=" * 90)

    print(
        f"\n{'Attacks':>10} {'Avg Profit':>14} {'Std Dev':>12} {'Min':>14} {'Max':>14} {'Losing':>10} {'Avg 4x':>8}"
    )
    print("-" * 90)

    for r in all_results:
        losing_pct = r["losing_runs"] / NUM_SIMULATIONS * 100
        print(
            f"{r['attacks']:>10,} ${r['avg_profit']:>+12,.2f} ${r['std_profit']:>10,.2f} ${r['min_profit']:>+12,.2f} ${r['max_profit']:>+12,.2f} {losing_pct:>9.2f}% {r['avg_4x']:>7.1f}"
        )

    # Time-based profit table
    print(f"\n{'=' * 90}")
    print("TIME-BASED PROFIT (Average)")
    print("=" * 90)

    print(
        f"\n{'Attacks':>10} {'Per Cycle':>14} {'Per Minute':>14} {'Per Hour':>14} {'Per Day':>14}"
    )
    print("-" * 90)

    for r in all_results:
        profit_per_cycle = r["avg_profit"] / CYCLES_PER_RUN
        profit_per_minute = profit_per_cycle * (60 / CYCLE_DURATION_SECONDS)
        profit_per_hour = profit_per_minute * 60
        profit_per_day = profit_per_hour * 24

        print(
            f"{r['attacks']:>10,} ${profit_per_cycle:>+12,.2f} ${profit_per_minute:>+12,.2f} ${profit_per_hour:>+12,.2f} ${profit_per_day:>+12,.2f}"
        )

    # ROI table
    print(f"\n{'=' * 90}")
    print("RETURN ON INVESTMENT (on ${:,} reserve)".format(WHALE_RESERVE))
    print("=" * 90)

    print(f"\n{'Attacks':>10} {'ROI/Hour':>14} {'ROI/Day':>14} {'ROI/Year':>16}")
    print("-" * 90)

    for r in all_results:
        profit_per_cycle = r["avg_profit"] / CYCLES_PER_RUN
        profit_per_minute = profit_per_cycle * (60 / CYCLE_DURATION_SECONDS)
        profit_per_hour = profit_per_minute * 60
        profit_per_day = profit_per_hour * 24

        roi_per_hour = (profit_per_hour / WHALE_RESERVE) * 100
        roi_per_day = (profit_per_day / WHALE_RESERVE) * 100
        roi_per_year = roi_per_day * 365

        print(
            f"{r['attacks']:>10,} {roi_per_hour:>+13.2f}% {roi_per_day:>+13.2f}% {roi_per_year:>+15,.2f}%"
        )


if __name__ == "__main__":
    main()
