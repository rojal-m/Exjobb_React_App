// PropertyForm.js
import React, { useState, useEffect} from 'react';
import '../css/propForm.css'
import PropertyInput from './PropertyInput';

function PropertyForm({ object, language }) {
  // Sort the properties based on property.property.sortKey
  const sortedProperties = object.properties.sort((a, b) =>
  a.property.sortKey.localeCompare(b.property.sortKey)
  );

  const [formData, setFormData] = useState(
  {
    "class": object.class.value,
    "properties": []
  });

  const handlePropertyChange = (propertyName, propertyValue) => {
    const updatedProperties = [...formData.properties];
    const existingPropertyIndex = updatedProperties.findIndex((prop) => prop.name === propertyName);

    if (existingPropertyIndex !== -1) {
      updatedProperties[existingPropertyIndex].value = propertyValue;
      
    } else {
      updatedProperties.push({ name: propertyName, value: propertyValue });
    }

    setFormData({
      ...formData,
      properties: updatedProperties,
    });
  };

  // Function to reset form data
  const resetForm = () => {
    // Clear input values
    const inputElements = document.querySelectorAll('input');
    inputElements.forEach((input) => {
      if (input.type === 'radio') {
        // For radio buttons, uncheck them
        input.checked = false;
      } else {
        // For other input types, set the value to an empty string
        input.value = '';
      }
    });
    
    // Clear select elements within the child component
    const childSelectElements = document.querySelectorAll('.child-select');
    childSelectElements.forEach((select) => {
      if (select.classList.contains('multiple')) {
        // If the select element has the "multiple" class, reset its selected index to 0
        select.selectedIndex = -1;
      } else {
        // If it doesn't have the "multiple" class, reset the selected index to -1
        select.selectedIndex = 0;
      }
    });
    
    setFormData({
      "class": object.class.value,
      "properties": [],
    });
    // Reset CSS styles
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach((form) => {
      form.classList.remove('was-validated');
    });
  }

  useEffect(() => {
    resetForm();
  }, [object]);
  

  const handleSubmit = (e) => {
    const form = e.target;
    if (!form.checkValidity()) {
      e.preventDefault()
      e.stopPropagation()
      console.log("not valid")
    } else{
      e.preventDefault();
      // Export form data to JSON
      const jsonData = JSON.stringify(formData);
      // Create a Blob object to save JSON data as a file
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      // Create an <a> element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'formData.json';
      a.click();
      // Clean up
      URL.revokeObjectURL(url);
    }
    form.classList.add('was-validated')
  }
  
  return (
    <div className="container-md mt-5 mb-5 p-0 cont">
      <form className="needs-validation" onSubmit={handleSubmit} noValidate >
        {sortedProperties.map((property, index) => (
          <PropertyInput key={index} property={property} onPropertyChange={handlePropertyChange} language={language}/>
        ))}
        <button type="submit" className="btn m-3 mt-0 btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default PropertyForm;
