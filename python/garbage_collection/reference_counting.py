import sys

# Reference counting
x = [1, 2, 3]
print(sys.getrefcount(x))  # Output: 2 (one reference from x and one from getrefcount)

y = x
print(sys.getrefcount(x))  # Output: 3 (one reference from x, one from y, and one from getrefcount)

y = None
print(sys.getrefcount(x))  # Output: 2 (one reference from x and one from getrefcount)

# Cyclic references
print("\nCyclic references:")
node1 = [1,2,3]
node2 = [4,5,6]
node1.append(node2)
node2.append(node1)

print(sys.getrefcount(node1))  # Output: 3 (one reference from node1, one from node2, and one from getrefcount)
print(sys.getrefcount(node2))  # Output: 3 (one reference from node2, one from node1, and one from getrefcount)
