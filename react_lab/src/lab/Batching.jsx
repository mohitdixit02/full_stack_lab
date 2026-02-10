import React, { useState } from 'react'

export default function Batching() {
    const [count, setCount] = useState(0);
    const handleClick = () => {
        // React batches state updates that occur in the same event handler, so only the last update will be applied.
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    };
    const handleClick2 = () => {
        // Using the functional form of setState allows us to access the previous state value, 
        // it ensures all updates are applied.
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
    }
  return (
    <div>
        <h2>Batching</h2>
        <p>
            Due to multiple state updates in the same event handler, React batches them together and only applies the last update. 
        </p>
        <p>
            Total increment will be 1 instead of 3 in first case.
        </p>
        <button onClick={handleClick}>Increment Count (Batching effect)</button> <br />
        <button onClick={handleClick2}>Increment Count (Use of Previous state)</button>
        <p>Count: {count}</p>
    </div>
  )
}
