import asyncio

# Task Object
async def coroutine():
    print("Hello")
    await asyncio.sleep(1)
    print("World")
    return "Coroutine Completed"
    
async def main():
    task = asyncio.create_task(coroutine())
    print("Task created")
    print(task)
    print(isinstance(task, asyncio.Task))  # True
    print(isinstance(task, asyncio.Future))  # True
    await task
    print("Task done:", task.done())  # True
    if(task.done()):
        print("Task result:", task.result())  # "Coroutine Completed"
    
    print("\n--- Future Object Example ---")
    # Future Object
    future = asyncio.Future()
    print("Future object: ", future)
    future.set_result("Future Completed")
    print("Future done:", future.done())  # True
    if(future.done()):
        print("Future result:", future.result())  # "Future Completed"
    
    print("\n--- Future with Exception Example ---")
    # Excpetion
    future2 = asyncio.Future()
    future2.set_exception(ValueError("An error occurred"))
    print("Future2 done:", future2.done())  # True
    if(future2.done()):
        try:
            print("Future2 result:", future2.result())
        except Exception as e:
            print("Future2 exception:", e)

if __name__ == "__main__": # ensure the event loop is only run when this script is executed directly
    asyncio.run(main())