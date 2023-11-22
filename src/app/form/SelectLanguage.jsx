// LanguageSelector.js
import React, { useState, useEffect } from "react";
import lang from "../../data/lang.json";

function LanguageSelect({ setSelectedLanguage }) {
	const languages = lang;
  const [selectedLang, setSelectedLang] = useState("");

  useEffect(() => {
    const storedSelectedLang = localStorage.getItem("selectedLang");
    if (storedSelectedLang !== null) {
      setSelectedLang(storedSelectedLang); // Set the selectedOption based on local storage
      setSelectedLanguage(storedSelectedLang);
    } else {
			setSelectedLanguage("en"); // Select the first element by default
      localStorage.setItem("selectedLang", "en"); // Store the selected index in local storage
    }
  }, [languages, setSelectedLanguage]);

  const handleLanguageChange = (e) => {
    setSelectedLang(e.target.value);
    setSelectedLanguage(e.target.value);
    localStorage.setItem("selectedLang", e.target.value); // Store the selected language in local storage
  };

  return (
    <div className="col-4">
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor="lang-select" className="col-form-label">
            Language:
          </label>
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            id="lang-select"
            value={selectedLang}
            onChange={handleLanguageChange}
          >
            {Object.entries(languages).map(([languageKey, languageValue]) => (
              <option key={languageKey} value={languageValue}>
                {languageKey}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default LanguageSelect;
