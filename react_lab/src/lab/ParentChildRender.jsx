import React, { useMemo, useCallback, useState, useRef } from 'react'

const expensiveComputation = (num) => {
    console.log('Performing expensive computation...');
    let result = 0;
    for (let i = 0; i < 10000000 * num; i++) {
        result += i;
    }
    return result + num;
}

const ChildComponentUnoptimized = ({count, handleClick}) => {
    console.log('Unoptimized Child component rendered');
    const start_time = performance.now();
    const result = expensiveComputation(count);
    const end_time = performance.now();
    console.log('Unoptimized Expensive computation result:', result);
    console.log(`Unoptimized Expensive computation took ${(end_time - start_time).toFixed(2)} ms`);
    return <div>
        <h2>Child Component (Unoptimized)</h2>
        <p>Expensive computation result: {result}</p>
        <p>Time for Calculation: {(end_time - start_time).toFixed(2)} ms</p>
        <button onClick={handleClick}>Re-render Parent</button> <br/>
    </div>;
}

const ChildComponentOptimized = ({count, handleClick}) => {
    console.log('Optimized Child component rendered');
    const start_time = performance.now();
    const result = useMemo(()=> expensiveComputation(count), [count]);
    const end_time = performance.now();
    console.log('Optimized Expensive computation result:', result);
    console.log(`Optimized Expensive computation took ${(end_time - start_time).toFixed(2)} ms`);
    return <div>
        <h2>Child Component (Calculation Optimized by Memo)</h2>
        <p>Expensive computation result: {result}</p>
        <p>Time for Calculation: {(end_time - start_time).toFixed(2)} ms</p>
        <button onClick={handleClick}>Re-render Parent</button> <br/>
    </div>;
}


export default function ParentChildRender() {
    const [count, setCount] = useState(1);
    const handleClick = () => {
        setCount(count + 1);
    }

    const OptimizedChild = useCallback(() => {
        console.log('Optimized Child component - useCallback');
        const start_time = performance.now();
        // result calculation run on every render, but function instance remains same
        // count is not a dependency, so it will always use the initial value of count (1) for calculation, 
        // which is set during first render
        const result = expensiveComputation(count);
        const end_time = performance.now();
        console.log('Optimized with useCallback Expensive computation result:', result);
        console.log(`Optimized with useCallback Expensive computation took ${(end_time - start_time).toFixed(2)} ms`);
        return <div>
            <h2>Child Component (Callback)</h2>
            <p>Expensive computation result: {result}</p>
            <p>Time for Calculation: {(end_time - start_time).toFixed(2)} ms</p>
            {/* 
                Handle Click set count always to 2, as it is memoized with count = 1, during first render.
            */}
            <button onClick={handleClick}>Re-render Parent</button> <br/>
        </div>;
    }, []);

  return (
    <div>
        <h1>Parent Component</h1>
        <p>Parent Count: {count}</p>
        <button onClick={handleClick}>Re-render Parent</button>
        <ChildComponentUnoptimized
            count={count}
            handleClick={handleClick}
        />
        <ChildComponentOptimized
            count={count}
            handleClick={handleClick}
        />
        <OptimizedChild/>

        <h4>Case - 1</h4>
        <p>
            In the unoptimized version, Child renders for change in parent count and the expensive computation runs.
        </p>
        <h4>Case - 2</h4>
        <p>
            In the optimized version using useMemo, Child still renders for change in parent count, but the expensive computation is memoized.
        </p>
        <h4>Case - 3</h4>
        <p>
            In the useCallback version, child renders only when the variable in the dependency array of useCallback changes. <br/>
            Since it is empty, the function instance remains the same across renders, and the expensive computation uses the initial value of count ( = 1) for calculation, which is set during first render. <br/>
        </p>
        <p>
            Also, the handleClick function, always set count to 2, as it is memoized with count = 1, during first render.
        </p>
    </div>
  )
}
