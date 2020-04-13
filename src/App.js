import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Quarantine from './Quarantine';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Quarantine />
      </div>
    </BrowserRouter>
  );
}

export default App;
