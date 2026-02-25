# Closures
def outer_function(layer_message):
    outer_message = "Outer Scope: " + layer_message + "\n"
    def inner_function(message):
        # outer_message is stored in __closure__ attribute of inner_function
        inner_message = outer_message + "Inner Scope: " + message
        print(inner_message)
    return inner_function

# Create a closure
closure = outer_function("Hello from the outer function!")

if __name__ == "__main__":
    closure("Hello from the inner function!")
