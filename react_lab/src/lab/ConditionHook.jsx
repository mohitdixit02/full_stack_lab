import React, { useState } from 'react'

export default function ConditionHook() {
    // Hooks are implemented as Linked List inside React and conditional hooks implementation
    // breaks the order of hooks and React throws an error

    const [count, setCount] = useState(0);
    if(count % 2 === 0) {
        // Uncommenting the below line will throw an error as it breaks the order of hooks
        // const [name, setName] = useState('John Doe');
    }
  return (
    <div>
        <h2>Conditional Hook</h2>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <p>Name useState hook renders for even count value, uncommenting the same in code will throw an error</p>
    </div>
  )
}
