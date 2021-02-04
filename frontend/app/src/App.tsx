import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BoxDataPage } from './pages/box-data-page';

function App() {

    fetch("/test")
        .then(data => console.log(data))
        .catch(error => console.log(error));

  return (
    <div className="App">
        <BoxDataPage />
    </div>
  );
}

export default App;
