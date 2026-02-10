import React, { useState, useEffect } from "react";

/* 
    Function based Implementation of React Component.
    Implementation of lifecycle methods and state management using hooks.
*/ 

export default function FunctionImplementation(){
    const [text, setText] = useState("Hello, World!");
    const [count, setCount] = useState(0);
    const [steps, setSteps] = useState([]);

    // Mounting
    useEffect(()=>{
        console.log("Function Component is Mounted!");
        setSteps(prevSteps => [...prevSteps, "Function Component Mounted"]);

        // Unmounting
        return () => {
            console.log("Function Component is Unmounted!");
        };
    }, []);

    // Updating
    useEffect(()=>{
        console.log("Function Component is Updated!");
        setSteps(prevSteps => [...prevSteps, `Function Component Updated: Text changed to "${text}"`]);
    }, [text])

    return(
        <div>
            <h2>Function Function Component</h2>
            <p>{text}</p>
            <button onClick={()=> {
                setCount(prevCount => prevCount + 1);
                setText(`Button clicked ${count + 1} times`);
            }}>Update Text</button>
            <h3>Steps:</h3>
            <ol>
                {steps.map((step, index) => <li key={index}>{step}</li>)}
            </ol>
        </div>
    )
}