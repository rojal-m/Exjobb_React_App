// PropertyForm.js
import React, { useState } from 'react';
import PropertyInput from './PropertyInput';

function PropertyForm({ object, language }) {
  // Sort the properties based on property.property.sortKey
  const sortedProperties = object.properties.sort((a, b) =>
  a.property.sortKey.localeCompare(b.property.sortKey)
  );

  const [formData, setFormData] = useState(
  {
    "class": object.class.value,
    "properties":[]
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

  const handleSubmit = (e) => {
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
  };

  return (
    <div>
      <h2>Properties</h2>
      <form onSubmit={handleSubmit}>
        {sortedProperties.map((property, index) => (
          <PropertyInput key={index} property={property} onPropertyChange={handlePropertyChange} language={language}/>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PropertyForm;
