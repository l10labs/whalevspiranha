# Whale vs Piranha - Game Specification

## Overview
A PvP lottery-style game where whales deposit large reserves and piranhas attack for rewards using 4-digit combinations.

## Players

### Whales
- Minimum deposit: $100,000
- Fund the game reserve
- Single whale deposit starts the game

### Piranhas
- Cost per attack: $10
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

| Combo Type | Digits Matching | Reward |
|------------|----------------|--------|
| 1x         | First digit    | $10    |
| 2x         | First 2 digits | $50    |
| 3x         | First 3 digits | $500   |
| 4x         | All 4 digits   | $5,000 |

Example: Crit attack = "2345"
- Piranha attack "2345" = 4x combo ($5,000)
- Piranha attack "2349" = 3x combo ($500)
- Piranha attack "2395" = 2x combo ($50)
- Piranha attack "2987" = 1x combo ($10)

## Attack Limits

### Permutation Cap
- Maximum attacks per permutation per cycle: Step function
- Increments by 10 for every $100k deposited
- Formula: `floor(whale_reserve / 100,000) * 10`

Examples:
- $100k-$199k reserve = 10 max per permutation
- $200k-$299k reserve = 20 max per permutation
- $300k-$399k reserve = 30 max per permutation
- $500k-$599k reserve = 50 max per permutation

## Game State

### Reserve Balance
- Funded by whale deposits
- Depleted by piranha payouts

### Cycle Duration
- Fixed: 10 seconds

### Active State
- Game runs while reserve has sufficient funds
