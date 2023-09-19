// PropertyInput.js
import React from 'react';

function PropertyInput({ property, language , onPropertyChange}) {
  // Function to get the label in the specified language or fallback to default
  const getSelectedLang = (labels) => {
    return labels[language] ? labels[language] : labels.default;
  };

  const isRequired = (property.min !== 0);
  const propertyName = property.property.value;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onPropertyChange(name, value);
  };

  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    onPropertyChange(name, selectedOptions);
  };


  const renderInput = () => {
    if (property.datatype === 'http://www.w3.org/2001/XMLSchema#boolean') {
      // Handle boolean datatype with radio buttons
      if(isRequired){
        return (
          <div>
            <input type="radio" name={propertyName} value="yes" onChange={handleInputChange} required />
            <label>Yes</label>
            <input type="radio" name={propertyName} value="no" onChange={handleInputChange} required />
            <label>No</label>
          </div>
        );
        } else{
          return (
            <div>
              <input type="radio" name={propertyName} value="yes" onChange={handleInputChange} />
              <label>Yes</label>
              <input type="radio" name={propertyName} value="no" onChange={handleInputChange} />
              <label>No</label>
              <input type="radio" name={propertyName} value="dontknow" onChange={handleInputChange} />
              <label>Dont Know</label>
            </div>
          );
        }
    } else if (property.datatype === 'http://www.w3.org/2001/XMLSchema#string') {
      // Handle string datatype with a text field
      return (
        <div>
          <input type="text" name={propertyName} onChange={handleInputChange} required={isRequired} />
        </div>
      );
    } else if (property.datatype === 'http://www.w3.org/2001/XMLSchema#gMonthYear') {

      return (
        <div>
          <input type="month" id="start" name={propertyName} onChange={handleInputChange} required={isRequired} />
        </div>
      );
    } else if (property.values) {
      // Handle dropdown based on values
      if (property.max === 1) {
        // Single-select with radio buttons
        return (
          <select name={propertyName} onChange={handleInputChange} required={isRequired}>
            <option value="">Choose an option</option>
              {property.values.map((value, index) => (
                <option key={index} value={value.value}>
                  {getSelectedLang(value.labels)}
                </option>
              ))}
          </select>
        );
      } else {
        // Multi-select with checkboxes
        return (
          <select multiple name={propertyName} onChange={handleSelectChange} required={isRequired}>
              {property.values.map((value, index) => (
                <option key={index} value={value.value}>
                  {getSelectedLang(value.labels)}
                </option>
              ))}
          </select>
        );
      }
    } else if (!isRequired || !property.max || !property.datatype || !property.values) {
      return(
        <div>
          <input type="text" name={propertyName} onChange={handleInputChange} />
        </div>
      );
    } else {
      // Handle other cases (unspecified datatype or unsupported)
      return <label style={{color: "red"}}>Error: Unsupported Property Type</label>;
    }
  };

  return (
    <div>
      <label>{getSelectedLang(property.property.labels)}</label>
      {isRequired? <label style={{color: "red"}}>*</label> : ""}
      {renderInput()}
    </div>
  );
}

export default PropertyInput;

/*// PropertyInput.js
import React from 'react';

function PropertyInput({ property }) {
  const renderInput = () => {
    if (property.datatype === 'http://www.w3.org/2001/XMLSchema#boolean') {
      return <input type="checkbox" />;
    } else if (property.values) {
      // Handle property with values (e.g., radio buttons, select)
      return (
        <select>
          {property.values.map((value, index) => (
            <option key={index} value={value.value}>
              {value.labels.default}
            </option>
          ))}
        </select>
      );
    } else {
      // Handle other data types (text, date picker, etc.)
      return <input type="text" />;
    }
  };

  return (
    <div>
      <label>{property.property.labels.default}</label>
      {renderInput()}
    </div>
  );
}

export default PropertyInput;*/
