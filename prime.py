import sys
sys.set_int_max_str_digits(10000)  # Increase the limit for large integers

from sympy import nextprime
import secrets

# Generate a random 32,768-bit number
n = secrets.randbits(4096)
# Find the next prime greater than n
prime_32768 = nextprime(n)

# Print the prime number
print(prime_32768)