import random

# Constants
ATTACK_COST = 0.10
STARTING_BANKROLL = 100.00
ATTACKS_PER_SESSION = int(STARTING_BANKROLL / ATTACK_COST)  # 1000 attacks

PAYOUTS = {
    0: 0.00,  # miss
    1: 0.10,  # 1x (break even)
    2: 1.00,  # 10x
    3: 10.00,  # 100x
    4: 100.00,  # 1000x
}


def generate_crit():
    """Generate a random 4-digit crit attack."""
    return tuple(random.sample(range(1, 10), 4))


def generate_attack():
    """Generate a random piranha attack."""
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


def run_piranha_session():
    """
    Simulate a single piranha spending $100 (1000 attacks).
    Each attack is in its own cycle (own crit).
    Returns: (total_winnings, combo_counts)
    """
    total_winnings = 0
    combo_counts = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}

    for _ in range(ATTACKS_PER_SESSION):
        crit = generate_crit()
        attack = generate_attack()
        combo = calculate_combo(attack, crit)
        combo_counts[combo] += 1
        total_winnings += PAYOUTS[combo]

    return total_winnings, combo_counts


def run_multiplayer_session(num_piranhas_per_cycle):
    """
    Simulate multiple piranhas playing together.
    Each piranha plays 1 attack per cycle, same crit for all in that cycle.
    Each piranha plays 1000 cycles (spending $100 total).
    Returns: list of (total_winnings, combo_counts) per piranha
    """
    # Track each piranha's results
    piranha_winnings = [0.0] * num_piranhas_per_cycle
    piranha_combos = [
        {0: 0, 1: 0, 2: 0, 3: 0, 4: 0} for _ in range(num_piranhas_per_cycle)
    ]

    for _ in range(ATTACKS_PER_SESSION):
        crit = generate_crit()

        for p in range(num_piranhas_per_cycle):
            attack = generate_attack()
            combo = calculate_combo(attack, crit)
            piranha_combos[p][combo] += 1
            piranha_winnings[p] += PAYOUTS[combo]

    return [
        (piranha_winnings[p], piranha_combos[p]) for p in range(num_piranhas_per_cycle)
    ]


def run_simulation(num_piranhas=10000):
    """Simulate many piranhas each playing a full session."""
    results = []
    total_combos = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}

    for _ in range(num_piranhas):
        winnings, combo_counts = run_piranha_session()
        net_profit = winnings - STARTING_BANKROLL
        results.append(
            {
                "winnings": winnings,
                "net_profit": net_profit,
            }
        )
        for combo, count in combo_counts.items():
            total_combos[combo] += count

    return results, total_combos


def print_results(results, total_combos, num_piranhas):
    """Print simulation results."""
    winnings = [r["winnings"] for r in results]
    profits = [r["net_profit"] for r in results]

    avg_winnings = sum(winnings) / num_piranhas
    avg_profit = sum(profits) / num_piranhas
    min_profit = min(profits)
    max_profit = max(profits)

    # Standard deviation
    variance = sum((p - avg_profit) ** 2 for p in profits) / num_piranhas
    std_dev = variance**0.5

    # Count winners/losers
    winners = sum(1 for p in profits if p > 0)
    losers = sum(1 for p in profits if p < 0)
    break_even = sum(1 for p in profits if p == 0)

    # Percentiles
    sorted_profits = sorted(profits)
    p10 = sorted_profits[int(num_piranhas * 0.10)]
    p25 = sorted_profits[int(num_piranhas * 0.25)]
    p50 = sorted_profits[int(num_piranhas * 0.50)]
    p75 = sorted_profits[int(num_piranhas * 0.75)]
    p90 = sorted_profits[int(num_piranhas * 0.90)]

    print("=" * 50)
    print("PIRANHA SIMULATION")
    print("=" * 50)
    print(f"\nSimulation Parameters:")
    print(f"  Piranhas Simulated: {num_piranhas:,}")
    print(f"  Starting Bankroll: ${STARTING_BANKROLL:.2f}")
    print(f"  Attack Cost: ${ATTACK_COST:.2f}")
    print(f"  Attacks per Session: {ATTACKS_PER_SESSION:,}")

    print(f"\n--- NET PROFIT ANALYSIS ---")
    print(f"  Avg Winnings: ${avg_winnings:,.2f}")
    print(f"  Avg Net Profit: ${avg_profit:,.2f}")
    print(f"  Min Net Profit: ${min_profit:,.2f}")
    print(f"  Max Net Profit: ${max_profit:,.2f}")
    print(f"  Std Deviation: ${std_dev:,.2f}")

    print(f"\n--- WIN/LOSS BREAKDOWN ---")
    print(f"  Winners: {winners:,} ({winners / num_piranhas * 100:.2f}%)")
    print(f"  Losers: {losers:,} ({losers / num_piranhas * 100:.2f}%)")
    print(f"  Break Even: {break_even:,} ({break_even / num_piranhas * 100:.2f}%)")

    print(f"\n--- PROFIT PERCENTILES ---")
    print(f"  10th: ${p10:,.2f}")
    print(f"  25th: ${p25:,.2f}")
    print(f"  50th (median): ${p50:,.2f}")
    print(f"  75th: ${p75:,.2f}")
    print(f"  90th: ${p90:,.2f}")

    print(f"\n--- COMBO DISTRIBUTION ---")
    total_attacks = sum(total_combos.values())
    for combo in range(5):
        count = total_combos[combo]
        pct = (count / total_attacks) * 100 if total_attacks > 0 else 0
        label = f"{combo}x" if combo > 0 else "Miss"
        print(f"  {label}: {count:,} ({pct:.2f}%)")


def run_multiplayer_simulation(num_piranhas_per_cycle, num_sessions=10000):
    """
    Run multiple sessions with multiple piranhas per cycle.

    For efficiency, we run (num_sessions / num_piranhas_per_cycle) sessions
    to get approximately num_sessions total piranha results.
    """
    sessions_to_run = max(1, num_sessions // num_piranhas_per_cycle)
    results = []
    total_combos = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}

    for _ in range(sessions_to_run):
        session_results = run_multiplayer_session(num_piranhas_per_cycle)

        for winnings, combo_counts in session_results:
            net_profit = winnings - STARTING_BANKROLL
            results.append(
                {
                    "winnings": winnings,
                    "net_profit": net_profit,
                }
            )
            for combo, count in combo_counts.items():
                total_combos[combo] += count

    return results, total_combos


def print_compact_results(results, num_piranhas_per_cycle):
    """Print compact results for comparison table."""
    profits = [r["net_profit"] for r in results]
    num_results = len(results)

    avg_profit = sum(profits) / num_results
    min_profit = min(profits)
    max_profit = max(profits)

    variance = sum((p - avg_profit) ** 2 for p in profits) / num_results
    std_dev = variance**0.5

    winners = sum(1 for p in profits if p > 0)
    win_pct = (winners / num_results) * 100

    sorted_profits = sorted(profits)
    median = sorted_profits[int(num_results * 0.50)]

    return {
        "players": num_piranhas_per_cycle,
        "avg_profit": avg_profit,
        "median": median,
        "min": min_profit,
        "max": max_profit,
        "std_dev": std_dev,
        "win_pct": win_pct,
    }


def run_player_count_comparison():
    """Compare results across different player counts per cycle."""
    print("=" * 90)
    print("PIRANHA SIMULATION - PLAYERS PER CYCLE COMPARISON")
    print("=" * 90)
    print(f"\nEach piranha: $100 bankroll, 1000 attacks, $0.10/attack")
    print(f"Simulating ~10,000 piranha sessions per player count...\n")

    header = f"{'Players/Cycle':<15} {'Avg Profit':<12} {'Median':<12} {'Min':<12} {'Max':<12} {'Std Dev':<12} {'Win %':<10}"
    print(header)
    print("-" * 90)

    player_counts = [1, 10, 100, 1000]

    for count in player_counts:
        print(f"Running {count} players per cycle...", end=" ", flush=True)
        results, _ = run_multiplayer_simulation(count, num_sessions=10000)
        stats = print_compact_results(results, count)
        print(
            f"\r{count:<15} ${stats['avg_profit']:<11.2f} ${stats['median']:<11.2f} ${stats['min']:<11.2f} ${stats['max']:<11.2f} ${stats['std_dev']:<11.2f} {stats['win_pct']:.2f}%"
        )


if __name__ == "__main__":
    run_player_count_comparison()
