# Stack Memory
def recursive(i):
    if(i == 0):
        return 1
    return recursive(i - 1)

# Heap Memory
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
    
    
if __name__ == "__main__":
    print("Stack Overflow and Heap Memory example")
    
    for i in range(1000):
        node = Node(i) # Heap memory is used to store objects - Flexibile size
    print("Heap memory allocation successful")
    # No error
    
    recursive(1000) # Stack Overflow error as recursion is handled by stack memory
    # RecursionError: maximum recursion depth exceeded
