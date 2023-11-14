import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/App.css'
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
    <div className="container-md">
      <h1>Trace4Value</h1>
      <div className="row row-reverse">
        <LanguageSelect languages={lang} setSelectedLanguage={setSelectedLanguage} />
        <WindowList data={data} setSelectedWindow={setSelectedWindow} language={selectedLanguage}/>
      </div>
      {selectedWindow && (
        <PropertyForm object={selectedWindow} language={selectedLanguage}/>
      )}
    </div>
  );
}

export default App;
