read_path = "./python/context_manager/file.txt"
test_path = "./python/context_manager/test_file.txt"
# Error becuase of the file not being closed
file_holders = []
try:
    for i in range(100000):
        file_holders.append(open(test_path, "w"))
except OSError as e:
    # OSError: [Errno 24] Too many open files: 'file_8189.txt'
    print(e)

# Using context manager to automatically close the file after use
for i in range(100000):
    with open(test_path, "w") as f:
        f.write(f"file_{i}.txt") # not fail, as file is closed after each iteration
        
class CustomContextManager:
    def __init__(self, file):
        self.file = file
    
    def __enter__(self):
        print("Opening the file")
        self.fileObj = open(self.file, "r")
        return self.fileObj
    
    def __exit__(self, exc_type, exc_value, traceback):
        print("Closing the file")
        self.fileObj.close()

with CustomContextManager(read_path) as f:
    print("Inside the context")
    while True:
        line = f.readline()
        if not line:
            break
        print(line.strip())
