import React, { useState, useEffect } from 'react';
import WindowList from './WindowList';
import PropertyForm from './PropertyForm';
import LanguageSelect from './LanguageSelect';
import data from '../data/form.json';
import lang from '../data/lang.json';

function App() {
  const [selectedWindow, setSelectedWindow] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    // Fetch data here if needed
  }, []);

  return (
    <div>
      <h1>Trace4Value</h1>
      <WindowList data={data} setSelectedWindow={setSelectedWindow} language={selectedLanguage}/>
      <LanguageSelect languages={lang} setSelectedLanguage={setSelectedLanguage} />
      {selectedWindow && (
        <PropertyForm object={selectedWindow} language={selectedLanguage}/>
      )}
    </div>
  );
}

export default App;

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
  );
}

export default App;*/
