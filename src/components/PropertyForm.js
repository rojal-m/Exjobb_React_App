// PropertyForm.js
import React from 'react';
import PropertyInput from './PropertyInput';

function PropertyForm({ properties }) {
    // Sort the properties based on property.property.sortKey
    const sortedProperties = properties.sort((a, b) =>
    a.property.sortKey.localeCompare(b.property.sortKey)
    );

  return (
    <div>
      <h2>Properties</h2>
      <form>
        {sortedProperties.map((property, index) => (
          <PropertyInput key={index} property={property} />
        ))}
      </form>
    </div>
  );
}

export default PropertyForm;
