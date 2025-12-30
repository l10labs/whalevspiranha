#!/usr/bin/env python3
"""
Whale vs Piranha - Game Economics Calculator

Calculates revenue and profit per cycle during maximum attack scenarios.
"""

# =============================================================================
# GAME PARAMETERS (Tweak these values)
# =============================================================================

# Whale settings
WHALE_RESERVE = 1000  # Starting whale reserve in dollars

# Piranha attack settings
ATTACK_COST = 0.10  # Cost per attack in dollars

# Combo payouts (multiplier of attack cost)
COMBO_1X_MULTIPLIER = 1  # First digit matches
COMBO_2X_MULTIPLIER = 10  # First 2 digits match
COMBO_3X_MULTIPLIER = 100  # First 3 digits match
COMBO_4X_MULTIPLIER = 1000  # All 4 digits match

# Permutation cap settings
CAP_INCREMENT = 5  # Attacks allowed per permutation per $1000
CAP_THRESHOLD = 1000  # Dollar threshold for cap increment

# Attack format constraints
DIGITS_AVAILABLE = 9  # Digits 1-9
ATTACK_LENGTH = 4  # 4-digit attacks

# =============================================================================
# CALCULATIONS
# =============================================================================


def calculate_total_permutations():
    """Calculate total unique 4-digit non-repeating permutations using digits 1-9."""
    result = 1
    for i in range(ATTACK_LENGTH):
        result *= DIGITS_AVAILABLE - i
    return result


def calculate_permutation_cap(reserve):
    """Calculate max attacks allowed per permutation based on reserve."""
    return (reserve // CAP_THRESHOLD) * CAP_INCREMENT


def calculate_max_attacks(reserve):
    """Calculate maximum total attacks possible in a cycle."""
    permutations = calculate_total_permutations()
    cap_per_permutation = calculate_permutation_cap(reserve)
    return permutations * cap_per_permutation


def calculate_combo_counts():
    """
    Calculate the exact number of attacks that hit each combo type
    when ALL permutations are attacked (deterministic max-attack scenario).

    For any given crit, we count how many of the 3,024 permutations
    match to each degree.
    """
    # 4x: Exactly 1 permutation matches all 4 digits
    count_4x = 1

    # 3x: First 3 digits match (e.g., "234_"), 4th differs
    # 4th digit must be unused by crit (5 remaining digits)
    count_3x = 5

    # 2x: First 2 digits match (e.g., "23__"), 3rd differs
    # 3rd digit: 6 choices (not the 2 used, not the correct 3rd)
    # 4th digit: 6 remaining
    count_2x = 6 * 6

    # 1x: First digit matches (e.g., "2___"), 2nd differs
    # 2nd digit: 7 choices (not the 1st digit, not the correct 2nd)
    # 3rd digit: 7 remaining
    # 4th digit: 6 remaining
    count_1x = 7 * 7 * 6

    # 0x: First digit doesn't match - calculate as remainder
    total_perms = 9 * 8 * 7 * 6  # 3024
    count_0x = total_perms - count_4x - count_3x - count_2x - count_1x

    return {
        "4x": count_4x,
        "3x": count_3x,
        "2x": count_2x,
        "1x": count_1x,
        "0x": count_0x,
    }


def calculate_payout_per_full_coverage():
    """
    Calculate the exact payout when every permutation is attacked once.
    This is deterministic - we know exactly how many hit each combo.
    """
    counts = calculate_combo_counts()

    payout = (
        counts["4x"] * COMBO_4X_MULTIPLIER * ATTACK_COST
        + counts["3x"] * COMBO_3X_MULTIPLIER * ATTACK_COST
        + counts["2x"] * COMBO_2X_MULTIPLIER * ATTACK_COST
        + counts["1x"] * COMBO_1X_MULTIPLIER * ATTACK_COST
        + counts["0x"] * 0  # No payout for 0x
    )

    return payout


def calculate_cycle_economics(reserve):
    """Calculate full cycle economics for a given reserve (deterministic max-attack)."""
    total_perms = calculate_total_permutations()
    cap_per_perm = calculate_permutation_cap(reserve)
    max_attacks = total_perms * cap_per_perm

    revenue = max_attacks * ATTACK_COST

    # Payout scales with cap - each "layer" of full coverage has same payout
    payout_per_coverage = calculate_payout_per_full_coverage()
    total_payout = payout_per_coverage * cap_per_perm

    profit = revenue - total_payout

    return {
        "reserve": reserve,
        "max_attacks": max_attacks,
        "revenue": revenue,
        "total_payout": total_payout,
        "profit": profit,
        "profit_margin": (profit / revenue * 100) if revenue > 0 else 0,
    }


def main():
    print("=" * 60)
    print("WHALE VS PIRANHA - GAME ECONOMICS CALCULATOR")
    print("=" * 60)

    # Display parameters
    print("\n📊 GAME PARAMETERS")
    print("-" * 40)
    print(f"Whale Reserve:        ${WHALE_RESERVE:,.2f}")
    print(f"Attack Cost:          ${ATTACK_COST:.2f}")
    print(f"1x Payout:            ${COMBO_1X_MULTIPLIER * ATTACK_COST:.2f}")
    print(f"2x Payout:            ${COMBO_2X_MULTIPLIER * ATTACK_COST:.2f}")
    print(f"3x Payout:            ${COMBO_3X_MULTIPLIER * ATTACK_COST:.2f}")
    print(f"4x Payout:            ${COMBO_4X_MULTIPLIER * ATTACK_COST:.2f}")
    print(f"Cap Increment:        {CAP_INCREMENT} per ${CAP_THRESHOLD:,}")

    # Display permutation info
    total_perms = calculate_total_permutations()
    cap = calculate_permutation_cap(WHALE_RESERVE)
    print(f"\n📈 ATTACK LIMITS")
    print("-" * 40)
    print(f"Total Permutations:   {total_perms:,}")
    print(f"Cap per Permutation:  {cap}")
    print(f"Max Attacks/Cycle:    {total_perms * cap:,}")

    # Display combo counts (deterministic)
    counts = calculate_combo_counts()
    print(f"\n🎯 COMBO COUNTS (per full coverage)")
    print("-" * 40)
    print(f"4x (all 4 match):     {counts['4x']:,}")
    print(f"3x (first 3 match):   {counts['3x']:,}")
    print(f"2x (first 2 match):   {counts['2x']:,}")
    print(f"1x (first 1 match):   {counts['1x']:,}")
    print(f"0x (no match):        {counts['0x']:,}")
    print(f"Total:                {sum(counts.values()):,}")

    # Display payout breakdown per full coverage
    payout_per_coverage = calculate_payout_per_full_coverage()
    revenue_per_coverage = total_perms * ATTACK_COST
    print(f"\n💰 ECONOMICS PER FULL COVERAGE")
    print("-" * 40)
    print(f"Revenue (3,024 attacks): ${revenue_per_coverage:,.2f}")
    print(f"Payout breakdown:")
    print(
        f"  4x: {counts['4x']} × ${COMBO_4X_MULTIPLIER * ATTACK_COST:.2f} = ${counts['4x'] * COMBO_4X_MULTIPLIER * ATTACK_COST:,.2f}"
    )
    print(
        f"  3x: {counts['3x']} × ${COMBO_3X_MULTIPLIER * ATTACK_COST:.2f} = ${counts['3x'] * COMBO_3X_MULTIPLIER * ATTACK_COST:,.2f}"
    )
    print(
        f"  2x: {counts['2x']} × ${COMBO_2X_MULTIPLIER * ATTACK_COST:.2f} = ${counts['2x'] * COMBO_2X_MULTIPLIER * ATTACK_COST:,.2f}"
    )
    print(
        f"  1x: {counts['1x']} × ${COMBO_1X_MULTIPLIER * ATTACK_COST:.2f} = ${counts['1x'] * COMBO_1X_MULTIPLIER * ATTACK_COST:,.2f}"
    )
    print(f"Total Payout:            ${payout_per_coverage:,.2f}")
    print(
        f"Profit:                  ${revenue_per_coverage - payout_per_coverage:,.2f}"
    )
    print(
        f"Profit Margin:           {(revenue_per_coverage - payout_per_coverage) / revenue_per_coverage * 100:.2f}%"
    )

    # Display cycle economics
    economics = calculate_cycle_economics(WHALE_RESERVE)
    print(f"\n🐋 CYCLE ECONOMICS (MAX ATTACK SCENARIO)")
    print("-" * 40)
    print(f"Total Attacks:        {economics['max_attacks']:,}")
    print(f"Revenue:              ${economics['revenue']:,.2f}")
    print(f"Total Payout:         ${economics['total_payout']:,.2f}")
    print(f"Profit:               ${economics['profit']:,.2f}")
    print(f"Profit Margin:        {economics['profit_margin']:.2f}%")

    # Show economics at different reserve levels
    print(f"\n📊 ECONOMICS AT DIFFERENT RESERVE LEVELS")
    print("-" * 60)
    print(
        f"{'Reserve':>12} {'Max Attacks':>14} {'Revenue':>14} {'Payout':>14} {'Profit':>14}"
    )
    print("-" * 60)

    for reserve in [1000, 2000, 5000, 10000, 50000, 100000]:
        econ = calculate_cycle_economics(reserve)
        print(
            f"${reserve:>10,} {econ['max_attacks']:>14,} ${econ['revenue']:>12,.2f} ${econ['total_payout']:>12,.2f} ${econ['profit']:>12,.2f}"
        )


if __name__ == "__main__":
    main()
