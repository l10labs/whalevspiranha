# Whale vs Piranha - Game Specification

## Overview
A PvP lottery-style game where whales deposit large reserves and piranhas attack for rewards using 4-digit combinations.

## Players

### Whales
- Minimum deposit: $1,000
- Fund the game reserve (single shared pool)
- Multiple whales can deposit into the same pool
- First whale deposit starts the game
- Profit/loss shared proportionally based on deposit percentage

### Piranhas
- Cost per attack: $0.10
- Submit 4-digit non-repeating attacks
- Each digit: 1-9 inclusive
- No per-piranha limit (can attack as many permutations as desired per cycle)

## Game Flow

### Start
- Game begins when a single whale deposits
- 10-second cycles commence

### Cycle Process
1. **Start of cycle**: Piranhas submit their 4-digit attacks
2. **End of cycle**: Random 4-digit crit attack generated
3. **Evaluation**: Matching attacks receive combo rewards

### Revenue & Payout Timing
- **Revenue**: Attack fees ($0.10 per attack) added to whale reserve first
- **Payouts**: Then deducted from whale reserve

Both occur in the same cycle, with revenue applied before payouts.

## Attack Rules

### Attack Format
- 4 digits
- Non-repeating
- Each digit: 1-9 (inclusive)

### Combo System
Combos awarded for matching crit attack from left to right:

| Combo Type | Digits Matching | Multiplier | Reward |
|------------|-----------------|------------|--------|
| 1x         | First digit     | 1x         | $0.10  |
| 2x         | First 2 digits  | 10x        | $1.00  |
| 3x         | First 3 digits  | 100x       | $10.00 |
| 4x         | All 4 digits    | 1000x      | $100.00|

Example: Crit attack = "2345"
- Piranha attack "2345" = 4x combo (1000x = $100.00)
- Piranha attack "2349" = 3x combo (100x = $10.00)
- Piranha attack "2395" = 2x combo (10x = $1.00)
- Piranha attack "2987" = 1x combo (1x = $0.10)

## Attack Limits

### Permutation Cap
- Maximum attacks per permutation per cycle: Step function
- Base cap of 5 for reserves $1,000-$5,999
- Increments by 5 for every $1,000 above $5,000
- Formula: `5 + floor(max(0, whale_reserve - 5,000) / 1,000) * 5`

Examples:
- $1,000-$5,999 reserve = 5 max per permutation
- $6,000-$6,999 reserve = 10 max per permutation
- $7,000-$7,999 reserve = 15 max per permutation
- $10,000-$10,999 reserve = 30 max per permutation

## Game State

### Reserve Balance
- Funded by whale deposits
- Depleted by piranha payouts
- Minimum reserve threshold: $1,000

### Cycle Duration
- Fixed: 10 seconds

### Active State
- Before each cycle starts, check if reserve >= $1,000
- If reserve >= $1,000, cycle proceeds normally
- If reserve < $1,000, game pauses until whales top up

### Empty Cycles
- If no attacks occur in a cycle, crit is still generated
- No payouts, no revenue
- Next cycle begins normally

### Payouts Guaranteed
- All winning attacks in a cycle are always paid out
- Revenue is applied before payouts, so net reserve change is always positive at max attacks
- The conservative permutation cap (starting at $5,000) provides a large buffer
- At $1,000-$5,999 reserve with max attacks (cap=5): revenue $1,512 - payout $1,077 = +$435 profit
- The permutation cap scaling ensures the game is always solvent

### Whale Withdrawal
- Deposits are locked for 10 cycles (100 seconds)
- After lock period, whale can withdraw their share (between cycles)
- Share = whale_percentage × current_reserve
- Withdrawal not allowed if it would drop reserve below $1,000
- Example: Whale deposited $1,000 of $5,000 pool (20%), reserve now $6,000 → withdraws $1,200

### Profit Sharing
- Each whale owns a percentage of the pool based on their deposit
- Percentage = whale_deposit / total_deposits_at_time_of_deposit
- Profits and losses affect the pool; whale's share floats with pool value
- New deposits dilute existing whale percentages proportionally

Example:
1. Whale A deposits $1,000 → owns 100% of $1,000 pool
2. Whale B deposits $4,000 → A owns 20%, B owns 80% of $5,000 pool
3. Pool grows to $6,000 from piranha attacks
4. Whale A's share: 20% × $6,000 = $1,200
5. Whale B's share: 80% × $6,000 = $4,800
