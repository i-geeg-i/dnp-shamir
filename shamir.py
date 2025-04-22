import random
from typing import List

PRIME =  9452036579057174094513291138251794135191248340490472295466735188765162175556248866553265369770230382633734932233884150263985541585213063190750843218504193971629107330506857411563631721741911200377155668608353149874630945436540969686159177924936605805231684060054329447845947558186213286351949943202484891880099163915753657400090327740687388679458404775698481398499191483766498618233003249520763950743135175952080963550730364027349081934990233190089121370811948012589409878219233021440148664143874184138217857312573258733309466865220884724763187328136989678524984458007698635390461119248085198118209083100027792665991 #2048 bit prime. 256 characters - total

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
    coeffs = [secret] + [random.randint(1, PRIME - 1) for _ in range(need_keys - 1)]
    shares = []

    for x in range(1, total_keys + 1):
        y = eval_polynomial(coeffs, x)
        prefix = str(x).zfill(3)  # Always 3 digits: 001, 002, ...
        shares.append(prefix + str(y))

    return ",".join(shares)

def resolve(input: str) -> int:
    parts = input.split(",")

    x_s = []
    y_s = []

    for part in parts:
        x = int(part[:3])        # Always grab first 3 digits
        y = int(part[3:])        # The rest is the y-value
        x_s.append(x)
        y_s.append(y)
    return lagrange_interpolate(0, x_s, y_s)





# def main():
#     secret = 2024
#     total = 100
#     needed = 4

#     shares = solve(secret, total, needed)
#     print("All shares:", shares)

#     # Grab any 4 parts, in random order
#     some = shares.split(",")
#     chosen = ",".join([some[3], some[96], some[41], some[6]])

#     recovered = resolve(chosen, total)
#     print("Recovered secret:", recovered)



# if __name__ == "__main__":
#     main()