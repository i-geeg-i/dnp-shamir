import random
from typing import List, Tuple

PRIME = 208351617316091241234326746312124448251235562226470491514186331217050270460481  # Big safe prime

def eval_polynomial(coeffs: List[int], x: int) -> int:
    result = 0
    for i, coef in enumerate(coeffs):
        result += coef * pow(x, i, PRIME)
    return result % PRIME

def lagrange_interpolate(x: int, x_s: List[int], y_s: List[int]) -> int:
    total = 0
    k = len(x_s)
    for i in range(k):
        xi, yi = x_s[i], y_s[i]
        prod = yi
        for j in range(k):
            if i != j:
                xj = x_s[j]
                inv = pow(xi - xj, -1, PRIME)
                prod *= (x - xj) * inv
                prod %= PRIME
        total += prod
        total %= PRIME
    return total

def solve(secret: int, total_keys: int, need_keys: int) -> str:
    # Create random polynomial with degree = need_keys - 1
    coeffs = [secret] + [random.randint(0, PRIME - 1) for _ in range(need_keys - 1)]
    shares = []
    for x in range(1, total_keys + 1):
        y = eval_polynomial(coeffs, x)
        shares.append(f"{x}:{y}")
    return ",".join(shares)

def resolve(input: str) -> int:
    parts = input.split(",")
    x_s, y_s = [], []
    for part in parts:
        x_str, y_str = part.split(":")
        x_s.append(int(x_str))
        y_s.append(int(y_str))
    # Lagrange interpolation at x=0 gives the secret
    return lagrange_interpolate(0, x_s, y_s)


# def main():
#     secrets = solve(1111223, 3, 2)
#     print(secrets)
#     resolved = resolve(secrets)
#     print(resolved)

# if __name__ == "__main__":
#     main()