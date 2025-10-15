# Minimum Coin Change

This repository contains an explanation and implementations of the **“Minimum Coin Change”** problem, based on the article from IncludeHelp.

---

## Table of Contents

1. Problem  
2. Approaches  
   - Recursive  
   - Dynamic Programming (Top‑Down / Memoization)  
   - Dynamic Programming (Bottom‑Up)  
3. Time and Space Complexity  
4. Examples  
5. Usage / How to Run  
6. Contributions  
7. License  

---

## 1. Problem

Given a value `V` and a set of coins with denominations `C = { C₁, C₂, …, Cₙ }` (with infinite supply of each coin), determine the **minimum number of coins** required to make up exactly the value `V`. If it’s not possible, return `-1`.  
Based on the IncludeHelp article: [includehelp.com](https://www.includehelp.com/icp/minimum-coin-change-find-minimum-number-of-coins-that-make-a-given-value.aspx)

### Input Format

- `N` — number of coin types  
- `V` — target value  
- Array `coins[]` of size `N`, containing the coin denominations  

### Output

- The minimum number of coins to make up `V`, or `-1` if not possible.  

---

## 2. Approaches

### 2.1 Recursive

Each coin is considered, and a recursive call subtracts its value from the target. The minimum result among all valid options is returned.  

Pseudocode:

```
minCoins(coins, N, V):
  if V == 0:
    return 0
  res = ∞
  for i in 0..N-1:
    if coins[i] ≤ V:
      sub = 1 + minCoins(coins, N, V - coins[i])
      res = min(res, sub)
  return res
```

**Disadvantage:** Highly inefficient for large values due to overlapping subproblems.

### 2.2 Dynamic Programming — Top‑Down / Memoization

Uses a `dp[]` array to store intermediate results and avoid recalculations.  
If `dp[x] != -1`, return that value directly.  

Pseudocode:

```
minCoins(coins, dp, N, V):
  if dp[V] != -1:
    return dp[V]
  if V == 0:
    return 0
  res = ∞
  for i in 0..N-1:
    if coins[i] ≤ V:
      sub = 1 + minCoins(coins, dp, N, V - coins[i])
      res = min(res, sub)
  dp[V] = res
  return dp[V]
```

Initialize `dp[0] = 0` and all others as `-1` before calling.

### 2.3 Dynamic Programming — Bottom‑Up

Builds a table `dp[0..V]` iteratively:

- `dp[0] = 0`  
- For each `i` from `1` to `V`:  
  - Initialize `dp[i] = ∞`  
  - For each coin `coins[j]`, if `coins[j] ≤ i`, update:  
    ```
    dp[i] = min(dp[i], dp[i − coins[j]] + 1)
    ```

Finally, `dp[V]` contains the answer (or infinity if impossible).

---

## 3. Complexity

| Approach          | Time Complexity         | Space Complexity |
|-------------------|--------------------------|------------------|
| Recursive         | Exponential              | Depends on recursion depth |
| Top‑Down / Memo   | O(N * V)                 | O(V) (dp array + recursion) |
| Bottom‑Up         | O(N * V)                 | O(V) |

---

## 4. Examples

**Example 1**  
- `N = 5`, `V = 25`  
- `coins = {4, 5, 2, 1, 9}`  
- Output: `4` (for example, 9 + 9 + 5 + 2)

**Example 2**  
- `N = 6`, `V = 256324`  
- `coins = {1, 2, 5, 10, 20, 50}`  
- Output: `5129`

If it’s not possible to reach the target value, print `-1`.

---

## 5. Usage / How to Run

1. Clone this repository  
2. Choose the desired approach (recursive, top‑down, or bottom‑up)  
3. Compile or execute depending on the language used  
4. Provide the input values as follows:

```
t (number of test cases)
for each test case:
  N V
  coins[0] coins[1] … coins[N−1]
```

Example:

```text
3
3 20
5 25 10
4 13
9 5 6 1
3 9
7 6 8
```

---

## 6. Contributions

Contributions are welcome: improvements, additional languages, optimizations, new test cases, documentation, etc. Please open **issues** or **pull requests**.

---

## 7. License

This project may inherit your repository’s license, or you can release it under a standard open-source license such as MIT, Apache, or GNU.
