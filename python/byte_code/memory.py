class TestClass: # Go to Heap Memory
    def __init__(self, name):
        self.name = name

    def say_hello(self):
        print(f"Hello, {self.name}!")
        
global_var = "I am a global variable" # Go to Heap Memory

def main():
    local_var = "I am a local variable" # Go to Stack Memory
    obj = TestClass("User") # obj reference goes to Stack Memory, but the actual object goes to Heap Memory
    obj.say_hello()
    print(global_var)
    print(local_var)
    
if __name__ == "__main__": # Byte code is still generated for this code, but its not reflected in __pycache__ folder, until it is imported
    main()
