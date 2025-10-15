# Minimum Coin Change

Este repositorio contiene la explicación y las implementaciones del problema **“Minimum Coin Change”** (Encontrar el número mínimo de monedas para alcanzar un valor dado), basadas en el artículo de IncludeHelp.  

---

## Índice

1. Problema  
2. Enfoques  
   - Recursivo  
   - Programación dinámica (Top‑Down / Memoización)  
   - Programación dinámica (Bottom‑Up)  
3. Complejidad de tiempo y espacio  
4. Ejemplos  
5. Uso / Cómo ejecutar  
6. Contribuciones  
7. Licencia  

---

## 1. Problema

Dado un valor `V` y un conjunto de monedas con valores `C = { C₁, C₂, …, Cₙ }` con suministro infinito de cada moneda, determinar el número mínimo de monedas necesarias para alcanzar exactamente el valor `V`. Si no es posible, devolver `-1`.  
Tomado de IncludeHelp. ([includehelp.com](https://www.includehelp.com/icp/minimum-coin-change-find-minimum-number-of-coins-that-make-a-given-value.aspx))

### Formato de entrada

- `N` — número de tipos de monedas  
- `V` — valor objetivo  
- Lista `coins[]` de tamaño `N`, con los valores de las monedas  

### Salida

- El número mínimo de monedas para alcanzar `V`, o `-1` si no es posible.  

---

## 2. Enfoques

### 2.1 Recursivo

Se considera cada moneda y se hace una llamada recursiva restando su valor del objetivo, luego se toma el mínimo entre las opciones posibles.  
Pseudocódigo:

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

Desventaja: muchas subproblemas redundantes, por lo que es ineficiente para valores grandes.

### 2.2 Programación dinámica — Top‑Down / Memoización

Se usa un arreglo `dp[]` para memorizar resultados ya calculados y evitar recomputar subproblemas.  
Si `dp[x] != -1`, devuelve inmediatamente ese valor.  
Pseudocódigo:

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

Inicializar `dp[0] = 0` y el resto como `-1` antes de la llamada.

### 2.3 Programación dinámica — Bottom‑Up

Se construye un arreglo `dp[0..V]` acumulativamente:

- `dp[0] = 0`  
- Para `i` de `1` a `V`:  
  - Inicializar `dp[i] = ∞`  
  - Para cada moneda `coins[j]`, si `coins[j] ≤ i`, actualizar:  
    ```
    dp[i] = min(dp[i], dp[i − coins[j]] + 1)
    ```

Al final, `dp[V]` contendrá la respuesta (o será infinito si no es posible).

---

## 3. Complejidad

| Enfoque           | Tiempo                            | Espacio                       |
|-------------------|------------------------------------|-------------------------------|
| Recursivo         | Exponencial (muchas ramas)        | Recursión dependiente de V    |
| Top‑Down / Memo   | O(N * V)                           | O(V) (arreglo dp + pila)      |
| Bottom‑Up         | O(N * V)                           | O(V)                          |

---

## 4. Ejemplos

**Ejemplo 1**  
- `N = 5`, `V = 25`  
- `coins = {4, 5, 2, 1, 9}`  
- Salida: `4` (por ejemplo, 9 + 9 + 5 + 2)

**Ejemplo 2**  
- `N = 6`, `V = 256324`  
- `coins = {1, 2, 5, 10, 20, 50}`  
- Salida: `5129`

Si no es posible alcanzar el valor, se imprime `-1`.

---

## 5. Uso / Cómo ejecutar

1. Clona este repositorio  
2. Selecciona el enfoque que deseas usar (recursivo, top‑down, bottom‑up)  
3. Compila o ejecuta (dependiendo del lenguaje)  
4. Proporciona los valores de entrada:

```
t (número de casos de prueba)
por cada caso:
  N V
  coins[0] coins[1] … coins[N−1]
```

Por ejemplo:

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

## 6. Contribuciones

Las contribuciones son bienvenidas: mejoras, nuevos lenguajes, optimizaciones, casos de prueba adicionales, documentación, etc. Por favor, abre **issues** o **pull requests**.

---

## 7. Licencia

Este proyecto puede heredar la licencia de tu repositorio o puedes colocarlo bajo una licencia de código abierto como MIT, Apache, GNU, etc.
