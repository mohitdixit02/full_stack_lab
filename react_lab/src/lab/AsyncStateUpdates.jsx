import React, { useState } from 'react'

export default function AsyncStateUpdates() {
    // React updates the state asynchronously and batches multiple state updates together for better performance.

    const [count, setCount] = useState(0);
    const handleClickAsyncUpdate = (e) => {
        console.log(e);
        setCount(count + 1); // async update
        console.log(count); // Will be 0, as state update is async
        setCount(count + 1); // async update
        console.log(count); // Will be 0, as state update is async and previous update is not done yet
    }

  return (
    <div>
        <h2>Async State Updates</h2>
        <p>Count: {count}</p>
        <button onClick={handleClickAsyncUpdate}>Increment</button>
        <p>Clicking the button will increment the count by 2, but, </p>
        <ul>
            <li>console logs will show the old count value due to asynchronous state updates.</li>
            <li>React batches the updates, so increment of only one is done</li>
        </ul>
    </div>
  )
}
