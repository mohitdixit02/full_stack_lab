# CPU Bound Task - GIL Lock vs Multi Processing vs Multi Threading
from time import sleep, time
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor

# CPU Bound Task
def perform_opr(n):
    v = 0
    for i in range(10**4):
        for j in range(10**4):
            v = v + i + j + n
    return v

def single_threaded():
    start_time = time()
    for i in range(5):
        perform_opr(i)
    print(f"Total time taken for single threaded execution is {time() - start_time} seconds")
    
def multi_threaded():
    start_time = time()
    with ThreadPoolExecutor(max_workers=5) as executor:
        executor.map(perform_opr, range(5))
    print(f"Total time taken for multi threaded execution is {time() - start_time} seconds")
    
def multi_processed():
    start_time = time()
    with ProcessPoolExecutor(max_workers=5) as executor:
        executor.map(perform_opr, range(5))
    print(f"Total time taken for multi processed execution is {time() - start_time} seconds")
    
if __name__ == "__main__":
    single_threaded()
    multi_threaded()
    multi_processed()
    
# Total time taken for single threaded execution is 50.98517322540283 seconds
# Total time taken for multi threaded execution is 43.08821678161621 seconds
# Total time taken for multi processed execution is 13.217612504959106 seconds

# Even Multi-threading is not effective for CPU bound tasks, as still one thread will be executing at a time due to GIL lock
