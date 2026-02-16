"use client";
/*
  use-client tell nextjs that this component requires Browser APIs and React Render Cycle. So, it should be rendered on client side.
  But for SEO and performance purpose, this page will pre-render on server side and then sent to client.
  state hooks - default value picked
  lifecycle hooks - not executed on server side
  browser objects - throw error on server side
*/ 

import { useEffect, useState } from "react";
export default function Receipe() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState(localStorage.getItem("text") || ""); // will throw error on server as default value is picked but localStorage is not available on server side

  useEffect(()=>{
    const val = localStorage.getItem("text") || ""; // local storage is not a issue as useEffect is not executed on server side.
    console.log("useEffect executed, value from localStorage: ", val);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Receipe Page</h1>
      <div>
      {`
        This is client based component.
      `} 
      </div>
      <div>
      {`
       On removing "use client" directive, Compile error will occur because server component can't use hooks.
      `} 
      </div>
      <div>
      {`
        use-client tell nextjs that this component requires Browser APIs and React Render Cycle. So, it should be rendered on client side.
        But for SEO and performance purpose, this page will pre-render on server side and then sent to client.
      `}
      </div>
      <ol>
        <li>state hooks - default value picked</li>
        <li>lifecycle hooks - not executed on server side</li>
        <li>browser objects - throw error on server side</li>
      </ol>
      {/*
        Below nesting of div inside p also throw Hydration error because p tag can't have div as child.
      */}
      <p>
        <div>
        </div>
      </p>
      <button
        style={{
          "color": "white",
          "backgroundColor": "blue",
          "border": "none",
          "padding": "10px",
          "borderRadius": "10px",
          "cursor": "pointer"
        }}
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => setCount(count + 1)}
      >
        Count: {count}
      </button>
    </div>
  );
}
