import React, { useState, useRef } from "react"

export default function ControlledInput() {
    const [text, setText] = useState("");
    const inputRef = useRef(null);

    const handleValidation = (e) => {
        const text = e.target.value;
        // number check
        if (/\d/.test(text)) {
            let wr_div = document.querySelector('.warning_text');
            wr_div.innerHTML = "Only words are allowed!";
            wr_div.style.color = "red";
        }
        else{
            let wr_div = document.querySelector('.warning_text');
            wr_div.innerHTML = "";
        }
        setText(text);
    }

    const handleRefInput = () => {
        const inputValue = inputRef.current.value;
        alert("Uncontrolled Input Value: " + inputValue);
        if (/\d/.test(inputValue)) {
            let wr_div = document.querySelector('.warning_text2');
            wr_div.innerHTML = "Only words are allowed!";
            wr_div.style.color = "red";
        }
        else{
            let wr_div = document.querySelector('.warning_text2');
            wr_div.innerHTML = "";
        }
    }
  return (
    <div>
        <h2>Controlled and Uncontrolled Input</h2>
        <h4>
            Controlled Input
        </h4>
        <p>Controlled by react state</p>
        <input type="text" value={text} onChange={handleValidation} />
        <div className="warning_text"></div>
        <p>
            Warning come immediately when user enters a number in the input field.
        </p>
        <h4>
            Uncontrolled Input
        </h4>
        <p>Controlled by DOM, react does not manage the state of the input</p>
        <input type="text" ref={inputRef} /> <br/>
        <div className="warning_text2"></div>
        <br/>
        <button onClick={handleRefInput}>Show Uncontrolled Input Value</button>
        <p>
            Uncontrolled input value is accessed using ref and alert on button click.
        </p>
    </div>
  )
}
