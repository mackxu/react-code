import React, { useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './Hello';
import { StateContext } from './store/context';
import { reducer, actions, initailState } from './store/reducer'
import { Time } from './Time';

function App() {
  const [state, dispatch] = useReducer(reducer, initailState);
  return (
    <StateContext.Provider value={{ state, dispatch, actions }}>
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Hello />
        <Time />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </StateContext.Provider>
    
  );
}

export default App;
