import itertools
import operator

# Create a dictionary of operator functions
ops = {
    '+': operator.add,
    '-': operator.sub,
    '*': operator.mul,
    '/': operator.truediv  # Note that division might produce fractions
}

# Define the function to brute force solutions
def brute_force_nyt_digits(numbers, target):
    closest = float('inf')  # Initialize closest to infinity
    closest_expression = ''  # Initialize closest_expression to an empty string

    # Get all possible combinations of numbers (from 1 to 6)
    for r in range(1, 7):
        for num_comb in itertools.combinations(numbers, r):
            # Get all possible permutations of those combinations
            for num_perm in itertools.permutations(num_comb):
                # Get all possible combinations of operators for each permutation
                for op_comb in itertools.product(ops.keys(), repeat=len(num_perm)-1):
                    try:
                        result = num_perm[0]
                        for i, op in enumerate(op_comb):
                            result = ops[op](result, num_perm[i+1])
                        # Only accept results that are integers and positive
                        if result == int(result) and result >= 0 and abs(target - result) < abs(target - closest):
                            closest = result
                            closest_expression = f"{' '.join([str(num_perm[i]) + ' ' + op_comb[i] + ' ' for i in range(len(op_comb))]) + str(num_perm[-1])} = {closest}"
                    except ZeroDivisionError:
                        # Skip division by zero
                        continue
    return closest_expression

# Test the function
numbers = [3, 4, 11, 17, 21, 24]
target = 414
print(brute_force_nyt_digits(numbers, target))
