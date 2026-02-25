from functools import wraps

# decorators
"""
    args - positional arguments - * for single value
    kwargs - keyword arguments - ** for dictionary
"""
def decorator(func=None, assign_metadata=True):
    def decorator_wrapper(func):
        def wrapper(*args, **kwargs):
            print("Before the function call.")
            result = func(*args, **kwargs)
            print("After the function call.")
            return result
        
        # Manual assignment of metadata
        # Difficult to maintain and error-prone, especially if the original function has a lot of metadata
        if assign_metadata:
            wrapper.__name__ = func.__name__
            wrapper.__doc__ = func.__doc__
        return wrapper
    
    if func is None:
        return decorator_wrapper
    else:
        return decorator_wrapper(func)
    
def advance_decorator(func):
    @wraps(func)  # This will automatically assign the metadata of func to wrapper
    def wrapper(*args, **kwargs):
        print("Before the function call.")
        result = func(*args, **kwargs)
        print("After the function call.")
        return result
    return wrapper

@decorator(assign_metadata=False)
def say_hello(name):
    """A simple function to greet a person."""
    print(f"Hello, {name}!")
    
@decorator
def say_goodbye(name):
    """A simple function to bid farewell to a person."""
    print(f"Goodbye, {name}!")
    
@advance_decorator
def add(a, b):
    """A simple function to add two numbers."""
    print(f"Adding {a} and {b}.")
    return a + b
    
if __name__ == "__main__":
    print("Function with default metadata assignment:")
    say_hello("Alice")
    print(f"Function name: {say_hello.__name__}")
    print(f"Function docstring: {say_hello.__doc__}")
    
    print("\nFunction with manual metadata assignment:")
    say_goodbye("Bob")
    print(f"Function name: {say_goodbye.__name__}")
    print(f"Function docstring: {say_goodbye.__doc__}")
    
    print("\nFunction with @wraps decorator:")
    result = add(5, 3)
    print(f"Result of add: {result}")
    print(f"Function name: {add.__name__}")
    print(f"Function docstring: {add.__doc__}")
