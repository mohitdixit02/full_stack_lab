import React, { useEffect, useState } from 'react'

export default function HOC() {
    const [count, setCount] = useState(0);
    const [timerCount, setTimerCount] = useState(0);

    useEffect(()=>{
        // Increase count by 1 after 5 seconds, but it will always set count to 1 due to closure trap,
        // even if we change it by button click, because it is using the count value from the current render snapshot.
        setTimeout(()=>{
            console.log("timer triggered");
            console.log("count found in timer callback:", count);
            setTimerCount(count + 1);
        }, 5000);
    }, []);

    const CustomComponent = (Component, ColorScheme) => {
        const schemes = {
            'primary': {
                backgroundColor: 'blue',
                color: 'white'   
            },
            'secondary': {
                backgroundColor: 'gray',
                color: 'white'
            },
            'danger': {
                backgroundColor: 'red',
                color: 'white'
            },
            'warning': {
                backgroundColor: 'orange',
                color: 'white'
            }
        };
        const customStyle = {
            ...schemes[ColorScheme],
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        }
        return (props) => 
            <div style={{"margin":"10px 0"}}>
                <Component {...props} style={{...customStyle, ...props.style}} />
            </div>
    }
    
    // Using High Order Component
    const PrimaryButton = CustomComponent((props) => <button {...props}>{props.label}</button>, 'primary');
    const SecondaryButton = CustomComponent((props) => <button {...props}>{props.label}</button>, 'secondary');
    const DangerButton = CustomComponent((props) => <button {...props}>{props.label}</button>, 'danger');
    const WarningButton = CustomComponent((props) => <button {...props}>{props.label}</button>, 'warning');

    // Without Enhancement by High Order Component
    const NormalButton = (props) => <button 
        style={{
            "color":props.color, 
            "backgroundColor": props.bgcolor
        }}
        >
            {props.label}
        </button>;

  return (
    <div>
        <h2>High Order Component Implementation (+ Closure Traps)</h2>
        <p>Clsoure Trap occurs when Closure function use state from the current react's render snapshot.</p>
        <PrimaryButton label="Primary Button" />
        <SecondaryButton label="Secondary Button" />
        <DangerButton label="Danger Button" />
        <WarningButton label="Warning Button"/>
        <div>
            <NormalButton 
                label="Normal Button"
                color="white"
                bgcolor="red"
            />
        </div>

        <p>
            Even on increasing the count by button click, timer will always set timerCount to 1 after 5 seconds, <br/>
            because it is using the count value from the current render snapshot when useEffect was executed for the first time.
        </p>
        <button onClick={()=>setCount(count + 1)}>Increase Count</button>
        <p>Count: {count}</p>
        <p>Timer Count set after 5 seconds: {timerCount}</p>
    </div>
  )
}
