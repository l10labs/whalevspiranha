import random
from itertools import permutations

# Constants
ATTACK_COST = 0.10
PAYOUTS = {
    1: 0.10,  # 1x
    2: 1.00,  # 10x
    3: 10.00,  # 100x
    4: 100.00,  # 1000x
}
WHALE_DEPOSIT = 1000  # $1,000
ATTACKS_PER_PERM = 10  # max attacks per permutation at $1k reserve

# Generate all valid permutations (4 non-repeating digits, 1-9)
ALL_PERMS = list(permutations(range(1, 10), 4))
TOTAL_PERMS = len(ALL_PERMS)  # 3024


def generate_crit():
    """Generate a random 4-digit crit attack."""
    return tuple(random.sample(range(1, 10), 4))


def calculate_combo(attack, crit):
    """Calculate combo level (0-4) for an attack against crit."""
    combo = 0
    for i in range(4):
        if attack[i] == crit[i]:
            combo += 1
        else:
            break
    return combo


def run_cycle(attack_coverage=1.0):
    """
    Run a single cycle.

    attack_coverage: fraction of permutations that get attacked (0.0 to 1.0)

    Returns: (revenue, payouts, profit)
    """
    crit = generate_crit()

    # Determine which permutations are attacked
    num_attacked_perms = int(TOTAL_PERMS * attack_coverage)
    attacked_perms = random.sample(ALL_PERMS, num_attacked_perms)

    # Each attacked permutation gets max attacks
    total_attacks = num_attacked_perms * ATTACKS_PER_PERM
    revenue = total_attacks * ATTACK_COST

    # Calculate payouts
    total_payouts = 0
    combo_counts = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}

    for attack in attacked_perms:
        combo = calculate_combo(attack, crit)
        combo_counts[combo] += ATTACKS_PER_PERM
        if combo > 0:
            total_payouts += PAYOUTS[combo] * ATTACKS_PER_PERM

    profit = revenue - total_payouts
    return revenue, total_payouts, profit, combo_counts


def run_simulation(num_cycles=1000, attack_coverage=1.0):
    """Run multiple cycles and collect stats."""
    results = []
    total_combos = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}

    for _ in range(num_cycles):
        revenue, payouts, profit, combo_counts = run_cycle(attack_coverage)
        results.append(
            {
                "revenue": revenue,
                "payouts": payouts,
                "profit": profit,
            }
        )
        for combo, count in combo_counts.items():
            total_combos[combo] += count

    return results, total_combos


def print_results(results, total_combos, num_cycles):
    """Print simulation results."""
    profits = [r["profit"] for r in results]
    revenues = [r["revenue"] for r in results]
    payouts = [r["payouts"] for r in results]

    total_profit = sum(profits)
    avg_profit = total_profit / num_cycles
    min_profit = min(profits)
    max_profit = max(profits)

    # Calculate standard deviation
    variance = sum((p - avg_profit) ** 2 for p in profits) / num_cycles
    std_dev = variance**0.5

    # Count losing cycles
    losing_cycles = sum(1 for p in profits if p < 0)

    print("=" * 50)
    print("WHALE VS PIRANHA - MONTE CARLO SIMULATION")
    print("=" * 50)
    print(f"\nSimulation Parameters:")
    print(f"  Cycles: {num_cycles}")
    print(f"  Whale Deposit: ${WHALE_DEPOSIT:,}")
    print(f"  Attack Cost: ${ATTACK_COST}")
    print(f"  Max Attacks/Perm: {ATTACKS_PER_PERM}")
    print(f"  Total Permutations: {TOTAL_PERMS}")

    print(f"\n--- WHALE PROFIT ANALYSIS ---")
    print(f"  Total Profit: ${total_profit:,.2f}")
    print(f"  Avg Profit/Cycle: ${avg_profit:,.2f}")
    print(f"  Min Profit: ${min_profit:,.2f}")
    print(f"  Max Profit: ${max_profit:,.2f}")
    print(f"  Std Deviation: ${std_dev:,.2f}")
    print(f"  Losing Cycles: {losing_cycles} ({losing_cycles / num_cycles * 100:.2f}%)")

    avg_revenue = sum(revenues) / num_cycles
    avg_payout = sum(payouts) / num_cycles
    margin = (avg_profit / avg_revenue) * 100 if avg_revenue > 0 else 0

    print(f"\n--- PER CYCLE AVERAGES ---")
    print(f"  Avg Revenue: ${avg_revenue:,.2f}")
    print(f"  Avg Payouts: ${avg_payout:,.2f}")
    print(f"  House Margin: {margin:.2f}%")

    print(f"\n--- COMBO DISTRIBUTION ---")
    total_attacks = sum(total_combos.values())
    for combo in range(5):
        count = total_combos[combo]
        pct = (count / total_attacks) * 100 if total_attacks > 0 else 0
        label = f"{combo}x" if combo > 0 else "Miss"
        print(f"  {label}: {count:,} ({pct:.2f}%)")


def run_coverage_comparison(num_cycles=1000):
    """Run simulations across different coverage levels."""
    print("=" * 80)
    print("WHALE VS PIRANHA - COVERAGE COMPARISON")
    print("=" * 80)
    print(f"\nRunning {num_cycles} cycles per coverage level...\n")

    header = f"{'Coverage':<10} {'Avg Profit':<12} {'Min':<12} {'Max':<12} {'Std Dev':<12} {'Losing %':<10} {'Margin':<10}"
    print(header)
    print("-" * 80)

    for coverage_pct in range(10, 110, 10):
        coverage = coverage_pct / 100
        results, _ = run_simulation(num_cycles, attack_coverage=coverage)

        profits = [r["profit"] for r in results]
        revenues = [r["revenue"] for r in results]

        avg_profit = sum(profits) / num_cycles
        min_profit = min(profits)
        max_profit = max(profits)
        variance = sum((p - avg_profit) ** 2 for p in profits) / num_cycles
        std_dev = variance**0.5
        losing_cycles = sum(1 for p in profits if p < 0)
        losing_pct = (losing_cycles / num_cycles) * 100

        avg_revenue = sum(revenues) / num_cycles
        margin = (avg_profit / avg_revenue) * 100 if avg_revenue > 0 else 0

        print(
            f"{coverage_pct:>3}%      ${avg_profit:<10,.2f} ${min_profit:<10,.2f} ${max_profit:<10,.2f} ${std_dev:<10,.2f} {losing_pct:<9.2f}% {margin:<.2f}%"
        )


if __name__ == "__main__":
    run_coverage_comparison(num_cycles=1000)
