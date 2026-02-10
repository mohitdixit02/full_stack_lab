import React from 'react';
import './App.css';
import { Lab } from './lab';
import ContextProvider from './lab/ContextProvider';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <div>
          <h1>React Lab</h1>
          {
            Object.keys(Lab).map((key) => {
              const Component = Lab[key];
              return (
                <div key={key}>
                <hr />
                <Component />
              </div>
              )
            })
          }
        </div>
      </ContextProvider>
    </div>
  );
}

export default App;
