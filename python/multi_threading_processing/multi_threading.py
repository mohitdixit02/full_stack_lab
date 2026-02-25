from time import sleep, time
from concurrent.futures import ThreadPoolExecutor
# GIL Lock

# single threaded
def perform_opr(n):
    sleep(2)
    return n

def perform_single_threaded():
    start_time = time()
    for i in range(5):
        print(perform_opr(i))
    print(f"Total time taken for single threaded execution is {time() - start_time} seconds")
    
def perform_multi_threaded():
    start_time = time()
    with ThreadPoolExecutor(max_workers=5) as executor:
        results = list(executor.map(perform_opr, range(5)))
    print(results)
    print(f"Total time taken for multi threaded execution is {time() - start_time} seconds")

if __name__ == "__main__":
    perform_single_threaded()
    perform_multi_threaded()
