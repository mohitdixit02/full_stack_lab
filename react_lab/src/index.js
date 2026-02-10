import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// ********************** Manual Element Creation **********************
// const element = React.createElement(
//   'div',
//   { className: 'container', style: { color: 'white', textAlign: 'center', marginTop: '20px' } },
//   [
//     React.createElement('h1', null, 'Hello World'),
//     React.createElement('p', null, 'This is a simple React element created using React.createElement.')
//   ]
// );
// ReactDOM.createRoot(document.getElementById('root')).render(element);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
