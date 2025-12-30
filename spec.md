# Whale vs Piranha - Game Specification

## Overview
A PvP lottery-style game where whales deposit large reserves and piranhas attack for rewards using 4-digit combinations.

## Players

### Whales
- Minimum deposit: $1,000
- Fund the game reserve
- Single whale deposit starts the game

### Piranhas
- Cost per attack: $0.10
- Submit 4-digit non-repeating attacks
- Each digit: 1-9 inclusive

## Game Flow

### Start
- Game begins when a single whale deposits
- 10-second cycles commence

### Cycle Process
1. **Start of cycle**: Piranhas submit their 4-digit attacks
2. **End of cycle**: Random 4-digit crit attack generated
3. **Evaluation**: Matching attacks receive combo rewards

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
- Increments by 10 for every $1,000 deposited
- Formula: `floor(whale_reserve / 1,000) * 10`

Examples:
- $1,000-$1,999 reserve = 10 max per permutation
- $2,000-$2,999 reserve = 20 max per permutation
- $3,000-$3,999 reserve = 30 max per permutation
- $5,000-$5,999 reserve = 50 max per permutation

## Game State

### Reserve Balance
- Funded by whale deposits
- Depleted by piranha payouts

### Cycle Duration
- Fixed: 10 seconds

### Active State
- Game runs while reserve has sufficient funds
