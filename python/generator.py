# Generators
def get_fibbonaci():
    a, b = 0, 1
    while True:
        yield a # yield - gives a value and pauses the function, next() will resume from here
        a, b = b, a + b

# Method 1: Getting the iterator object and using next() to get values
fib_gen = get_fibbonaci()
for _ in range(10):
    print(next(fib_gen)) # since generator returns an iterator, we can use next() to get the next value

# Method 2: Using a for loop to iterate over the generator
for i in get_fibbonaci():
    if i > 10:
        break
    print(i)

# always returns the first value of the generator 
# since a new generator is created each time get_fibbonaci() is called
for i in range(10):
    print(next(get_fibbonaci())) 
