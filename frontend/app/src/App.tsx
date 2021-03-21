import React from 'react';
import './App.css';
import { BoxDataPage } from './pages/box-data-page';

import dotenv from 'dotenv'

dotenv.config()

function App() {

  return (
    <div className="App">
        <BoxDataPage />
    </div>
  );
}

export default App;
