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
    console.log(name)
    console.log(value)
    onPropertyChange(name, value);
  };

  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    console.log(name)
    console.log(selectedOptions)
    onPropertyChange(name, selectedOptions);
  };


  const renderInput = () => {
    if (property.datatype === 'http://www.w3.org/2001/XMLSchema#boolean') {
      // Handle boolean datatype with radio buttons
      return (
        <fieldset className="row">
          <legend className="col-form-label col-sm-3" title={getSelectedLang(property.property.comments)}>
            {getSelectedLang(property.property.labels)} 
            {isRequired? <span style={{color: "red"}}>*</span> : null}
          </legend>
          <div className="col-sm-9">
            <div className="form-check">
              <input type="radio" name={propertyName} className="form-check-input" id={propertyName+1} value="yes" onChange={handleInputChange} required={isRequired}/>
              <label className="form-check-label" htmlFor={propertyName+1}>Yes</label>
            </div>
            <div className="form-check">
              <input type="radio" name={propertyName} className="form-check-input" id={propertyName+2} value="no" onChange={handleInputChange} required={isRequired} />
              <label className="form-check-label" htmlFor={propertyName+2}>No</label>
              <div className="invalid-feedback">
                The field is required.
              </div>
            </div>
            {!isRequired? 
            <div className="form-check">
              <input type="radio" name={propertyName} className="form-check-input" id={propertyName+3} value="dontknow" onChange={handleInputChange} />
              <label className="form-check-label" htmlFor={propertyName+3}>Don't Know</label>
            </div> :null}
          </div>
        </fieldset>
      );  
    } else if (property.datatype === 'http://www.w3.org/2001/XMLSchema#string') {
      // Handle string datatype with a text field
      return (
        <div className="row">
          <label className="col-form-label col-sm-3" htmlFor={propertyName} title={getSelectedLang(property.property.comments)}>
            {getSelectedLang(property.property.labels)} 
            {isRequired? <span style={{color: "red"}}>*</span> : null}
          </label>
          <div className="col-sm-9">
            <input className="form-control" type="text" id={propertyName} name={propertyName} onChange={handleInputChange} required={isRequired} />
            <div className="invalid-feedback">
                The field is required.
            </div>
          </div>
        </div>
      );
    } else if (property.datatype === 'http://www.w3.org/2001/XMLSchema#gMonthYear') {

      return (
        <div className="row">
          <label className="col-form-label col-sm-3" htmlFor={propertyName} title={getSelectedLang(property.property.comments)}>
            {getSelectedLang(property.property.labels)} 
            {isRequired? <span style={{color: "red"}}>*</span> : null}
          </label>
          <div className="col-sm-9">
            <input className="form-control" type="month" id={propertyName} name={propertyName} onChange={handleInputChange} required={isRequired} />
            <div className="invalid-feedback">
                The field is required.
            </div>
          </div>
        </div>
      );
    } else if (property.values) {
      // Handle dropdown based on values
      return (
        <div className="row">
          <label className="col-form-label col-sm-3" htmlFor={propertyName} title={getSelectedLang(property.property.comments)}>
            {getSelectedLang(property.property.labels)} 
            {isRequired? <span style={{color: "red"}}>*</span> : null}
          </label>
          <div className="col-sm-9">
            <select className={!(property.max === 1) ? "form-select child-select multiple" : "form-select child-select"} 
              multiple={!(property.max === 1)} 
              id={propertyName} 
              name={propertyName}
              onChange={!(property.max === 1)? handleSelectChange : handleInputChange} 
              required={isRequired}>
            {(property.max === 1)? <option value="">Choose an option</option> : null}
                {property.values.map((value, index) => (
                  <option key={index} value={value.value} title={getSelectedLang(value.comments)}>
                    {getSelectedLang(value.labels)}
                  </option>
                ))}
            </select>
            <div className="invalid-feedback">
                The field is required.
            </div>
          </div>
        </div>
      );
    } else if (!isRequired || !property.max || !property.datatype || !property.values) {
      return(
        <div className="row">
          <label className="col-form-label col-sm-3" htmlFor={propertyName} title={getSelectedLang(property.property.comments)}>
            {getSelectedLang(property.property.labels)} 
            {isRequired? <span style={{color: "red"}}>*</span> : null}
          </label>
          <div className="col-sm-9">
            <input className="form-control" type="text" id={propertyName} name={propertyName} onChange={handleInputChange} required={isRequired} />
            <div className="invalid-feedback">
                The field is required.
            </div>
          </div>
        </div>
      );
    } else {
      // Handle other cases (unspecified datatype or unsupported)
      return <label style={{color: "red"}}>Error: Unsupported Property Type</label>;
    }
  };

  return (
    <div className="m-3">
      {renderInput()}
    </div>
  );
}

export default PropertyInput;
