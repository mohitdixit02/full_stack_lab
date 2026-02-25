# Manual Asyncio Event Loop
import asyncio

async def coroutine():
    print("Hello")
    await asyncio.sleep(3)
    print("World")
    loop.stop()  # Stop the event loop
    
if __name__ == "__main__":
    loop = asyncio.new_event_loop()  # Create a new event loop
    asyncio.set_event_loop(loop)  # Set the new event loop as the current one
    print(loop)
    try:
        print("Running coroutine...")
        loop.create_task(coroutine())  # Schedule the coroutine to run on the event loop
        loop.run_forever()  # Start the event loop and run until stop() is called
        if loop.is_running():
            print("Event loop is still running...")
    finally:
        loop.close()
        print("Event loop closed.")