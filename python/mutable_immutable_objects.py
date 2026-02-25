# *********** Immutable Objects ***********
a = "Hello"
print("Memory of a:", id(a))

# Python allocates objects by reference
b = a
print("Memory of b:", id(b)) # same memory as a
c = b + " yay!"
print("Memory of c:", id(c)) # new memory for c, new object created using original object, b is unchanged, still points to the original object
print("Memory of a after creating c:", id(a)) # same memory as a, original
print("Memory of b after creating c:", id(b)) # same memory as b ( = a), original
print("\n")
# Reassignment
a = a + " World"
print("Memory of a after reassignment:", id(a)) # new memory for a, new object created using original object
print("Memory of b after a's reassignment:", id(b)) # b still points to the original object
# original object is not destroyed as it has a reference (b)
print("\n\n")

# *********** Mutable Objects ***********
x = [1, 2, 3]
print("Memory of x:", id(x))

# Python allocates objects by reference
y = x
print("Memory of y:", id(y)) # same memory as x

# Modifying the list through y
y.append(4)

print("Memory of x after modification through y:", id(x)) # same memory as x, list is modified in place
print("Memory of y after modification:", id(y)) # same memory as y, list is modified in place
print("Contents of x:", x) # [1, 2, 3, 4]
print("Contents of y:", y) # [1, 2, 3, 4]
print("\n\n")



# *********** Exception (Tuple) ***********
t = (1, 2, [3, 4]) # Tuple is immutable, but it can contain mutable objects like lists
print("Memory of t:", id(t))
print("Memory of the list inside t:", id(t[2])) # memory of the list inside the tuple

# Modifying the list inside the tuple
t[2].append(5)

print("Memory of t after modifying the list inside it:", id(t)) # same memory as t, tuple itself is not modified
print("Memory of the list inside t after modification:", id(t[2])) # same memory as the original list, list is modified in place
print("Contents of t:", t) # (1, 2, [3, 4, 5])

new_t = t + (6,) # creating a new tuple by concatenating the original tuple with a new element
print("Memory of new_t:", id(new_t)) # new memory for new_t, new object created
print("Memory of t after creating new_t:", id(t)) # same memory as t, original tuple is unchanged, will be garbage collected if no references point to it
