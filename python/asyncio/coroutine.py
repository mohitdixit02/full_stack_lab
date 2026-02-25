import asyncio
import time

# Coroutine
async def my_coroutine(type = "default", start_time = time.time()):
    print("start time: ", start_time)
    print(f"Hello, World! This is a {type} coroutine.")
    await asyncio.sleep(1)
    end_time = time.time()
    print(f"Coroutine {type} completed in {end_time - start_time:.2f} seconds.")
    
# coroutine object
coro = my_coroutine("object defintion")
print(coro)  # <coroutine object my_coroutine at 0x...>
# Give warning as coroutine object needs to either be awaited or scheduled to run

# Running the coroutine
# Method 1: Using await inside another coroutine
print("\nMethod 1: Using await inside another coroutine")
async def main():
    # Sequential execution of coroutines
    start_time = time.time()
    await my_coroutine("seq awaited 1", start_time)
    await my_coroutine("seq awaited 2", start_time)
    
asyncio.run(main())

# Method 2: Using asyncio.run() directly
print("\nMethod 2: Using asyncio.run() directly")
asyncio.run(my_coroutine("top level coroutine")) # only runs one coroutine, and it will block until it completes. 
                                                # Used for running top level entry point of an asyncio program


# Method 3: Creating a task - schedules the coroutine to run concurrently with other tasks 
print("\nMethod 3: Creating a task")
async def main_with_task():
    start_time = time.time()
    task1 = asyncio.create_task(my_coroutine("task 1", start_time))
    task2 = asyncio.create_task(my_coroutine("task 2", start_time))
    await task1
    await task2
    
asyncio.run(main_with_task())
