// WindowList.js
import React, { useState, useEffect } from 'react';

function WindowList({ data, setSelectedWindow, language}) {
  const [selectedOption, setSelectedOption] = useState('');

  // Sort the data based on sortKey
  const sortedData = data.sort((a, b) => {
    return a.class.sortKey.localeCompare(b.class.sortKey);
  });
  
  const handleSelectChange = (e) => {
    const selectedIndex = e.target.value;
    console.log(sortedData[selectedIndex]);
    setSelectedOption(selectedIndex); // Set the selectedOption based on local storage
    setSelectedWindow(sortedData[selectedIndex]);
    localStorage.setItem('selectedWindowIndex', selectedIndex); // Store the selected index in local storage
  };

  const indent = (sortKey) => {
    // Split the sortKey string using '->' as the delimiter
    const arrowCount = sortKey.split('->').length - 1;

    // Create a string with the desired number of val characters
    const val = String.fromCharCode(8194).repeat(arrowCount);

    return val;
  }

  useEffect(() => {
    const storedSelectedIndex = localStorage.getItem('selectedWindowIndex');
    if (storedSelectedIndex !== null) {
      setSelectedOption(storedSelectedIndex); // Set the selectedOption based on local storage
      setSelectedWindow(data[storedSelectedIndex]);
    } else {
      localStorage.setItem('selectedWindowIndex', 0); // Store the selected index in local storage
      setSelectedWindow(data[0]); // Select the first element by default
    }
  }, [data, setSelectedWindow]);

  return (
    <div className="col-8">
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor="obj-select" className="col-form-label">Form:</label>
        </div>
        <div className="col-7">
          <select className="form-select" id="obj-select" onChange={handleSelectChange} value={selectedOption}>
            {sortedData.map((window, index) => (
              <option key={index} value={index} title={window.class.comments[language] ? window.class.comments[language] : window.class.comments.default}>
                {indent(window.class.sortKey)}
                {window.class.labels[language] ? window.class.labels[language] : window.class.labels.default}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default WindowList;
