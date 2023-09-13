// PropertyInput.js
import React from 'react';

function PropertyInput({ property }) {
  const renderInput = () => {
    if (property.datatype === 'http://www.w3.org/2001/XMLSchema#boolean') {
      // Handle boolean datatype with radio buttons
      return (
        <>
          <label>
            <input type="radio" name={property.property.labels.default} value="true" />
            Yes
          </label>
          <label>
            <input type="radio" name={property.property.labels.default} value="false" />
            No
          </label>
        </>
      );
    } else if (property.datatype === 'http://www.w3.org/2001/XMLSchema#string') {
      // Handle string datatype with a text field
      return <input type="text" />;
    } else if (property.datatype === 'http://www.w3.org/2001/XMLSchema#gMonthYear') {
      // Handle gMonthYear datatype with a date picker (simplified)
      return <input type="date" />;
    } else if (property.values) {
      // Handle dropdown based on values
      if (property.max === 1) {
        // Single-select with radio buttons
        return (
          <>
            {property.values.map((value, index) => (
              <label key={index}>
                <input type="radio" name={property.property.labels.default} value={value.value} />
                {value.labels.default}
              </label>
            ))}
          </>
        );
      } else {
        // Multi-select with checkboxes
        return (
          <>
            {property.values.map((value, index) => (
              <label key={index}>
                <input type="checkbox" name={property.property.labels.default} value={value.value} />
                {value.labels.default}
              </label>
            ))}
          </>
        );
      }
    } else if (property.min == 0 || !property.max || !property.datatype || !property.values) {
      return(
        <>
          <label>
            <input type="checkbox" name={property.property.labels.default} value="true" />
            Yes
          </label>
          <label>
            <input type="checkbox" name={property.property.labels.default} value="false" />
            No
          </label>
        </>
      );
    } else {
      // Handle other cases (unspecified datatype or unsupported)
      return <label style={{color: "red"}}>Error: Unsupported Property Type</label>;
    }
  };

  return (
    <div>
      <label>{property.property.labels.default}</label>
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
