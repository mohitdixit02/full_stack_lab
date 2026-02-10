import React, { Component } from "react";

/* 
    Class based Implementation of React Component.
    Implementation of lifecycle methods and state management using Class based Component.
*/ 

class CustomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Hello, World!",
            count: 0,
            steps: []
        }
    }

    // Mounting
    componentDidMount(){
        console.log("Class Component is Mounted!");
        let curr_steps = this.state.steps;
        curr_steps.push("Class Component Mounted");
        this.setState({steps: curr_steps});
    }
    
    // Updating
    componentDidUpdate(prevProps, prevState){
        console.log("Class Component is Updated!");
        console.log("Previous Props: ", prevProps);
        console.log("Previous State: ", prevState);
        console.log("Class Component is Mounted!");
        if(prevState.count !== this.state.count){
            let curr_steps = this.state.steps;
            curr_steps.push("Class Component Updated - Count: " + this.state.count);
            this.setState({steps: curr_steps});
        }
    }

    // Unmounting
    componentWillUnmount(){
        console.log("Class Component is Unmounted!");
    }

    render(){
        return(
            <div>
                <h2>Class Based Class Component</h2>
                <p>{this.state.text}</p>
                <button onClick={()=> {
                    this.setState({count: this.state.count + 1});
                    this.setState({text: "Text Updated - " + (this.state.count + 1)});
                }}>Update Text</button>
                <h3>Steps:</h3>
                <ol>
                    {this.state.steps.map((step, index) => <li key={index}>{step}</li>)}
                </ol>
            </div>
        )
    }
}

export default CustomComponent;