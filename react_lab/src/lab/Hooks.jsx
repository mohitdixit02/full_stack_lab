import React, {
    useState,
    useReducer,
    useContext,
    useEffect,
    useLayoutEffect,
    useInsertionEffect,
    useMemo,
    useCallback,
    useRef
} from 'react';
import { LabContext } from './ContextProvider';

/*
    Implementtaion of React Hooks,
    - useState
    - useReducer
    - useContext
    - useEffect
    - useLayoutEffect
    - useInsertionEffect
    - useMemo
    - useCallback
    - useRef
    - custom Hook
*/ 
export default function Hooks() {
    // **************** useState ****************
    const [value, setValue] = useState(0);
    const [effect, setEffect] = useState(0);

    // **************** useEffect ****************
    useEffect(() => {
        // update effect count whenever value changes
        // start with 1, as useEffect is called after the first render
        console.log('useEffect called');
        setEffect(effect + 1);
    }, [value]);

    // **************** useReducer - for complex logic ****************
    const initialState = {val: 0};
    const reducerAction = (state, action) => {
        switch(action.type){
            case 'add':
                return {val: state.val + 1};
            case 'multiply':
                return {val: state.val * 2};
            default:
                return state;
        }
    }
    // accpets a reducer function and an initial state, 
    // and returns the current state and a dispatch function to update the state.
    const [state, dispatch] = useReducer(reducerAction, initialState);

    // **************** useContext ****************
    const {name} = useContext(LabContext);
    
    // **************** useLayoutEffect ****************
    // Background color will change to red immediately after DOM mutations and 
    // before the browser has a chance to paint
    useLayoutEffect(() => { 
        const original = document.body.style.backgroundColor;
        document.body.style.backgroundColor = 'red';
        console.log('useLayoutEffect called');

        // Simulate heavy computation
        let v = 0;
        for (let i = 0; i < 100000000; i++) {
            v += i % 2 ? 1 : -1;
        }

        // Revert after a short delay
        setTimeout(() => {
            document.body.style.backgroundColor = original;
        }, 500);

        return () => {
            document.body.style.backgroundColor = original;
        };
    }, []);

    // **************** useInsertionEffect ****************
    // Designed for injecting styles into the DOM before any other effects are executed.
    useInsertionEffect(() => {
        console.log('useInsertionEffect called');
        const head = document.createElement('h1');
        head.textContent = 'useInsertionEffect: This is a heading inserted before any other effects.';
        document.body.insertBefore(head, document.body.firstChild);
        // Simulate heavy computation
        let v = 0;
        for (let i = 0; i < 100000000; i++) {
            v += i % 2 ? 1 : -1;
        }
        setTimeout(() => {
            document.body.removeChild(head);
        }, 500);
        return () => {
            document.body.removeChild(head);
        };
    }, []);

    // **************** useMemo ****************
    // cache the result of an expensive calculation and only recompute it when its dependencies change
    const [fib_num, setFibNum] = useState(30);
    const fibonacci = (n) => {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    const memoVal = useMemo(()=>{
        return fibonacci(fib_num); // expensive calculation
    }, [fib_num]);

    const getFibonacci = (n, memoEnabled) => {
        let start_time = performance.now();
        if (memoEnabled) {
            let ans = memoVal;
            let time_taken1 = performance.now() - start_time;
            console.log(`Time taken with memoization: ${performance.now() - start_time} ms`);
            return {
                "ans": ans,
                "time": time_taken1
            };
        }
        else{
            let ans = fibonacci(n);
            let time_taken2 = performance.now() - start_time;
            console.log(`Time taken without memoization: ${performance.now() - start_time} ms`);
             return {
                "ans": ans,
                "time": time_taken2
            };
        }
    }

    // **************** useCallback ****************
    // returns a memoized version of the callback function that only changes if one of the dependencies has changed.
    // helps to prevent unnecessary re-renders when passing callbacks to child components.

    const [callbackNum, setCallBackNum] = useState(0);
    const increaseNumber = useCallback(() => setCallBackNum(prev => prev + 1), []); // same memory reference across renders
    const decreaseNumber = () => setCallBackNum(prev => prev - 1);
    const doubleNumber = useCallback(() => setCallBackNum(prev => prev * 2), [callbackNum]); // memory reference changes when callbackNum changes

    // **************** useRef ****************
    // useRef returns a mutable (which can be changed) ref object whose .current property is initialized to the passed argument (initialValue).
    // useRef can survive renders, not cause renders when updated, and has no dependency like useCallback or useMemo.

    const valueRef = useRef(0);
    const incrementRefValue = () => {
        valueRef.current += 1;
        console.log('Ref Value:', valueRef.current);
    };

    // Checking useCallback effect on function reference, using useRef to store the initial reference across renders
    const increaseNumberRef = useRef(increaseNumber);
    const decreseNumRef = useRef(decreaseNumber);
    const doubleNumRef = useRef(doubleNumber);
    useEffect(()=>{
        const currentRef1 = increaseNumberRef.current;
        const currentRef2 = decreseNumRef.current;
        const currentRef3 = doubleNumRef.current;
        const updatedRef1 = increaseNumber;
        const updatedRef2 = decreaseNumber;
        const updatedRef3 = doubleNumber;
        if(currentRef1 !== updatedRef1){
            console.log('increaseNumber function reference has changed');
        }
        else{
            console.log('increaseNumber function reference same');
        }
        if(currentRef2 !== updatedRef2){
            console.log('decreaseNumber function reference has changed');
        }
        else{
            console.log('decreaseNumber function reference same');
        }
        if(currentRef3 !== updatedRef3){
            console.log('doubleNumber function reference has changed');
        }
        else{
            console.log('doubleNumber function reference same');
        }
    }, [callbackNum]);
  return (
    <div>
        <h2>React Hooks</h2>
        <h4>Use State</h4>
        <p>Value: {value}</p>
        <button onClick={()=> setValue(value + 1)}>Increment</button>

        <h4>Use Effect</h4>
        <p>Start with one because useEffect called on first render</p>
        <p>Effect Count: {effect}</p>

        <h4>Use Reducer</h4>
        <p>Value: {state.val}</p>
        <div style={{"display":"flex", "gap": "10px"}}>
            <button onClick={()=>dispatch({type:"add"})}>Add</button>
            <button onClick={()=>dispatch({type:"multiply"})}>Multiply</button>
        </div>

        <h4>Use Context</h4>
        <p>Value from context: {name}</p>

        <h4>Use LayoutEffect</h4>
        <p>Background color will change to red immediately after DOM mutations and before the browser has a chance to paint.</p>
        <p>Simulating heavy computation in useLayoutEffect to demonstrate blocking of browser paint until the effect is complete.</p>
        <p>Red color comes when browser stops reloading after refresh</p>

        <h4>Use InsertionEffect</h4>
        <p>Designed for injecting styles into the DOM before any other effects are executed. In this example, it inserts a heading before any other effects run.</p>
        <p>Simulating heavy computation in useInsertionEffect to demonstrate that it runs before any other effects (even useLayoutEffect).</p>

        <h4>Use Memo</h4>
        <p>Finonacci Calculation and memoization using use Memo hook</p>
        <p>
            With Memoization, Fibonacci of {fib_num} is {getFibonacci(fib_num, true).ans} and time taken is {getFibonacci(fib_num, true).time} ms
        </p>
        <p>
            Without Memoization, Fibonacci of {fib_num} is {getFibonacci(fib_num, false).ans} and time taken is {getFibonacci(fib_num, false).time} ms
        </p>
        <button onClick={()=> setFibNum(fib_num + 1)}>Increment Fibonacci</button>

        <h4>Use Callback</h4>
        <p>First function is memoized using useCallback to prevent unnecessary re-creations on each render.</p>
        <p>Current Number: {callbackNum}</p>
        <div style={{"display":"flex", "gap": "10px"}}>
            <button onClick={increaseNumber}>Increase</button>
            <button onClick={decreaseNumber}>Decrease</button>
            <button onClick={doubleNumber}>Double</button>
        </div>
        <p>
            Reference of increaseNumber function is same across renders due to useCallback, while decreaseNumber function reference changes on every render (console logs will show this). <br/>
            DoubleNumber function reference changes when callbackNum changes due to useCallback dependency. <br/>
            Also, useCallback triggers re-rendering, which changes useMemo time taken, but it preserves its own reference across renders.<br/>
        </p>

        <h4>Use Ref</h4>
        <p>Value: {valueRef.current}</p>
        <button onClick={incrementRefValue}>Increment Ref Value</button>
        <p>
            Note: Updating the ref value does not cause a re-render, the above value will not update on the screen until a re-render is triggered by some other state change. <br/>
        </p>
        <p>On increasing counter in useCallback section, useMemo time taken changes due to re-rendering, but it doesn't happen in case of useRef</p>
    </div>
  )
}
