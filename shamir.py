def solve(input: int, total_keys: int, need_keys: int) -> str:
    # Convert the integer into shares using Shamir's scheme
    # Return string like "1:1234,2:5678,3:9101"
    return str(input*2)
    #TODO: actual Shamir alg. implementation

def resolve(input: str) -> int:
    # Convert the string "1:1234,2:5678,3:9101" into a list of (x, y) tuples
    # Run reconstruction using Lagrange interpolation
    # Return the recovered secret (as int)
    return 2
    #TODO: actual implementation of rev. Shamir alg.