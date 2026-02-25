# Case 1 - Immutable Object
a = 5

def modify_immutable(x):
    x += 1  # This creates a new object, does not modify the original 'a'
    print("Inside function (immutable):", x)

modify_immutable(a)
print("Outside function (immutable):", a)

print("\n" + "-"*30 + "\n")

# Case 2 - Mutable Object (Reassignment)
b = [1, 2, 3]

def modify_mutable_reassign(lst):
    lst = [4, 5, 6]  # This creates a new list, does not modify the original 'b'
    print("Inside function (mutable reassign):", lst)
    
modify_mutable_reassign(b)
print("Outside function (mutable reassign):", b)

print("\n" + "-"*30 + "\n")


# Case 3 - Mutable Object (In-place Modification)
c = [1, 2, 3]

def modify_mutable_inplace(lst):
    lst.append(4)  # This modifies the original list 'c' in place
    print("Inside function (mutable in-place):", lst)
    
modify_mutable_inplace(c)
print("Outside function (mutable in-place):", c)
