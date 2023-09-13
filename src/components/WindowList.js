// WindowList.js
import React, { useState, useEffect } from 'react';

function WindowList({ data, setSelectedWindow }) {
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
    <div>
      <h2>Select an Object's Class:</h2>
      <select onChange={handleSelectChange} value={selectedOption}>
        {sortedData.map((window, index) => (
          <option key={index} value={index}>
            {window.class.labels.default}
          </option>
        ))}
      </select>
    </div>
  );
}

export default WindowList;
