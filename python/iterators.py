# Iterators
str = "Hello, World!"
itr = iter(str) # iter - gives an iterator object
print(itr) # <str_iterator object at 0x7f8c8c8c8c8c>

while True:
    try:
        a = next(itr) # next - gives the next item from the iterator
        print(a)
    except StopIteration as e:
        print("End of iterator")
        break # else error will be raised by every next() call after the end
    

class CustomIter:
    def __init__(self, data):
        self.data = data
        self.index = 0
        self.size = len(data)
        
    def __iter__(self):
        return self[self.index]
    
    def __next__(self):
        if self.index < self.size:
            result = self.data[self.index]
            self.index += 1
            return result
        else:
            raise StopIteration

print("\nCustom Iterator:")

lst = [1, 2, 3, 4, 5]
custom_iter = CustomIter(lst)
while True:
    try:
        a = next(custom_iter)
        print(a)
    except StopIteration as e:
        print("End of custom iterator")
        break
