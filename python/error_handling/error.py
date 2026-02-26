# Error handling Syntax
def calculate_value(x):
    try:
        result = 10 / x
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    else:
        print("Calculation successful.")
        return result
    finally:
        print("Execution of calculate_value is complete.")

print("Basic Syntax of Error Handling in Python:")
print(calculate_value(2))  # Should print the result and messages
print(calculate_value(0))  # Should handle division by zero error and print messages

print("\n" + "-"*50 + "\n")

# Catching Multiple Exceptions + raise Exceptions
def calculate_square_root(x):
    try:
        if x < 0:
            raise ValueError("Cannot calculate square root of a negative number.")
        result = x ** 0.5
    except ValueError as ve:
        print(f"Value error: {ve}")
        return None
    except TypeError as te:
        print(f"Type error: {te}")
        return None
    else:
        print("Square root calculation successful.")
        return result

print("Catching Multiple Exceptions and Raising Exceptions in Python:")
print(calculate_square_root(16))  # Should print the result and messages
print(calculate_square_root(-4))  # Should handle value error and print messages
print(calculate_square_root("string"))  # Should handle type error and print messages

print("\n" + "-"*50 + "\n")