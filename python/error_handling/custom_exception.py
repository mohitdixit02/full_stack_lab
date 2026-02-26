class CustomException(Exception):
    """Custom exception for specific error handling."""
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
        
def perform_operation(x):
    try:
        if x < 0:
            raise CustomException("Negative value is not allowed.")
        result = x * 2
    except CustomException as ce:
        print(f"Custom exception caught: {ce.message}")
        return None
    else:
        print("Operation performed successfully.")
        return result
    finally:
        print("Execution of perform_operation is complete.")
        
print("Custom Exception Handling in Python:")
print(perform_operation(5))  # Should print the result and messages
print(perform_operation(-3))  # Should handle custom exception and print messages
