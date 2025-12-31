#!/usr/bin/env python3
"""
Whale vs Piranha - Game Simulation

Simulates 1000 runs of:
- 1 whale with $1,000 reserve
- 100 random piranha attacks per cycle
- 1000 cycles per run
- 60 seconds per cycle (for time-based calculations)
"""

import random
from statistics import mean, median, stdev

# =============================================================================
# GAME PARAMETERS
# =============================================================================

WHALE_RESERVE = 1000
ATTACK_COST = 0.10
ATTACKS_PER_CYCLE = 100
CYCLES_PER_RUN = 1000
CYCLE_DURATION_SECONDS = 60

# Simulation parameters
NUM_SIMULATIONS = 1000

# All possible 4-digit non-repeating permutations from 1-9
DIGITS = "123456789"
ALL_PERMUTATIONS = []
for a in DIGITS:
    for b in DIGITS:
        if b == a:
            continue
        for c in DIGITS:
            if c in (a, b):
                continue
            for d in DIGITS:
                if d in (a, b, c):
                    continue
                ALL_PERMUTATIONS.append(a + b + c + d)

TOTAL_PERMUTATIONS = len(ALL_PERMUTATIONS)  # 3024


def get_combo_type(attack, crit):
    """Determine combo type for an attack against a crit."""
    if attack == crit:
        return "4x"
    elif attack[:3] == crit[:3]:
        return "3x"
    elif attack[:2] == crit[:2]:
        return "2x"
    elif attack[0] == crit[0]:
        return "1x"
    else:
        return "0x"


def get_payout(combo_type):
    """Get payout for a combo type."""
    payouts = {"4x": 100.00, "3x": 10.00, "2x": 1.00, "1x": 0.10, "0x": 0.00}
    return payouts[combo_type]


def simulate_cycle(num_attacks):
    """
    Simulate a single cycle with random attacks.
    Returns (revenue, payout, combo_counts)
    """
    # Generate random crit
    crit = random.choice(ALL_PERMUTATIONS)

    # Generate random attacks (with replacement - same permutation can be attacked multiple times)
    attacks = random.choices(ALL_PERMUTATIONS, k=num_attacks)

    revenue = num_attacks * ATTACK_COST
    total_payout = 0.0
    combo_counts = {"4x": 0, "3x": 0, "2x": 0, "1x": 0, "0x": 0}

    for attack in attacks:
        combo = get_combo_type(attack, crit)
        combo_counts[combo] += 1
        total_payout += get_payout(combo)

    return revenue, total_payout, combo_counts


def simulate_run(num_cycles, attacks_per_cycle):
    """
    Simulate a full run of multiple cycles.
    Returns total profit and combo statistics.
    """
    total_revenue = 0.0
    total_payout = 0.0
    total_combos = {"4x": 0, "3x": 0, "2x": 0, "1x": 0, "0x": 0}

    for _ in range(num_cycles):
        revenue, payout, combos = simulate_cycle(attacks_per_cycle)
        total_revenue += revenue
        total_payout += payout
        for combo, count in combos.items():
            total_combos[combo] += count

    profit = total_revenue - total_payout
    return {
        "revenue": total_revenue,
        "payout": total_payout,
        "profit": profit,
        "combos": total_combos,
    }


def main():
    print("=" * 70)
    print("WHALE VS PIRANHA - SIMULATION")
    print("=" * 70)

    print(f"\nSimulation Parameters:")
    print(f"  Whale Reserve:      ${WHALE_RESERVE:,}")
    print(f"  Attacks per Cycle:  {ATTACKS_PER_CYCLE}")
    print(f"  Cycles per Run:     {CYCLES_PER_RUN:,}")
    print(f"  Cycle Duration:     {CYCLE_DURATION_SECONDS} seconds")
    print(f"  Number of Runs:     {NUM_SIMULATIONS:,}")

    # Time calculations
    total_seconds = CYCLES_PER_RUN * CYCLE_DURATION_SECONDS
    total_minutes = total_seconds / 60
    total_hours = total_minutes / 60
    total_days = total_hours / 24

    print(f"\nTime per Run:")
    print(
        f"  {total_seconds:,} seconds = {total_minutes:,.1f} minutes = {total_hours:,.2f} hours = {total_days:,.2f} days"
    )

    print(f"\nRunning {NUM_SIMULATIONS:,} simulations...")

    # Run simulations
    results = []
    for i in range(NUM_SIMULATIONS):
        result = simulate_run(CYCLES_PER_RUN, ATTACKS_PER_CYCLE)
        results.append(result)
        if (i + 1) % 100 == 0:
            print(f"  Completed {i + 1:,} runs...")

    # Aggregate results
    profits = [r["profit"] for r in results]
    revenues = [r["revenue"] for r in results]
    payouts = [r["payout"] for r in results]

    total_4x = [r["combos"]["4x"] for r in results]
    total_3x = [r["combos"]["3x"] for r in results]
    total_2x = [r["combos"]["2x"] for r in results]
    total_1x = [r["combos"]["1x"] for r in results]

    # Calculate statistics
    avg_profit = mean(profits)
    med_profit = median(profits)
    std_profit = stdev(profits)
    min_profit = min(profits)
    max_profit = max(profits)

    # Count losing runs
    losing_runs = sum(1 for p in profits if p < 0)

    print(f"\n{'=' * 70}")
    print("RESULTS (per run = {:.2f} hours)".format(total_hours))
    print("=" * 70)

    print(f"\nProfit Statistics (per {CYCLES_PER_RUN:,} cycles):")
    print(f"  Average Profit:     ${avg_profit:+,.2f}")
    print(f"  Median Profit:      ${med_profit:+,.2f}")
    print(f"  Std Deviation:      ${std_profit:,.2f}")
    print(f"  Min Profit:         ${min_profit:+,.2f}")
    print(f"  Max Profit:         ${max_profit:+,.2f}")
    print(
        f"  Losing Runs:        {losing_runs} / {NUM_SIMULATIONS} ({losing_runs / NUM_SIMULATIONS * 100:.2f}%)"
    )

    print(f"\nCombo Statistics (per run):")
    print(
        f"  4x hits: avg={mean(total_4x):.2f}, min={min(total_4x)}, max={max(total_4x)}"
    )
    print(
        f"  3x hits: avg={mean(total_3x):.2f}, min={min(total_3x)}, max={max(total_3x)}"
    )
    print(
        f"  2x hits: avg={mean(total_2x):.2f}, min={min(total_2x)}, max={max(total_2x)}"
    )
    print(
        f"  1x hits: avg={mean(total_1x):.2f}, min={min(total_1x)}, max={max(total_1x)}"
    )

    # Time-based profit calculations
    profit_per_cycle = avg_profit / CYCLES_PER_RUN
    profit_per_minute = profit_per_cycle * (60 / CYCLE_DURATION_SECONDS)
    profit_per_hour = profit_per_minute * 60
    profit_per_day = profit_per_hour * 24

    print(f"\n{'=' * 70}")
    print("TIME-BASED PROFIT (Average)")
    print("=" * 70)
    print(f"  Per Cycle ({CYCLE_DURATION_SECONDS}s):    ${profit_per_cycle:+,.4f}")
    print(f"  Per Minute:          ${profit_per_minute:+,.4f}")
    print(f"  Per Hour:            ${profit_per_hour:+,.2f}")
    print(f"  Per Day:             ${profit_per_day:+,.2f}")

    # ROI calculations
    roi_per_hour = (profit_per_hour / WHALE_RESERVE) * 100
    roi_per_day = (profit_per_day / WHALE_RESERVE) * 100

    print(f"\n{'=' * 70}")
    print("RETURN ON INVESTMENT (on ${:,} reserve)".format(WHALE_RESERVE))
    print("=" * 70)
    print(f"  ROI per Hour:        {roi_per_hour:+,.2f}%")
    print(f"  ROI per Day:         {roi_per_day:+,.2f}%")
    print(f"  ROI per Year:        {roi_per_day * 365:+,.2f}%")


if __name__ == "__main__":
    main()
