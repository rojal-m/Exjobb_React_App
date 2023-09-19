// LanguageSelector.js
import React, { useState, useEffect }  from 'react';

function LanguageSelect({languages, setSelectedLanguage}) {
    const [selectedLang, setSelectedLang] = useState('');



    useEffect(() => {
        const storedSelectedLang = localStorage.getItem('selectedLang');
        if (storedSelectedLang !== null) {
            setSelectedLang(storedSelectedLang); // Set the selectedOption based on local storage
            setSelectedLanguage(languages[storedSelectedLang]);
        } else {
            localStorage.setItem('selectedLang', "English"); // Store the selected index in local storage
            setSelectedLanguage(languages["English"]); // Select the first element by default
        }
    }, [languages, setSelectedLanguage]);

    const handleLangChange = (e) => {
        const selectedKey = e.target.value;
        console.log(languages[selectedKey]);
        setSelectedLang(selectedKey);
        setSelectedLanguage(languages[selectedKey]);
        localStorage.setItem('selectedLang', selectedKey); // Store the selected language in local storage
    }

    return (
        <div>
            <label>Language:</label>
            <select onChange={handleLangChange} value={selectedLang} >
                {Object.keys(languages).map((language) => (
                    <option key={language} value={language}> 
                        {language} 
                    </option>
                ))} 
            </select>
        </div>
    );
}

export default LanguageSelect;
