import React, { useState, useEffect, useRef } from "react";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import { formServices } from "../Services";

function FormBuilder({ currentForm, object, language, editing }) {
  const navigate = useNavigate();
  const myformref = useRef();
  const [sortedProperties, setSortedProperties] = useState([]);
  const [formValidity, setFormValidity] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    class: object.class.value,
    isComplete: false,
    userId: localStorage.getItem('token'),
    properties: [],
  });
  
  
  useEffect(() => {
     // Sort the properties based on property.property.sortKey
     const sorted = object.properties.sort((a, b) => a.property.sortKey.localeCompare(b.property.sortKey));
     setSortedProperties(sorted);
     const updatedProperties = sorted.map((prop) => ({
       name: prop.property.value,
       value: '' || [],
     }));
     setFormData({
       title: "",
       class: object.class.value,
       isComplete: false,
       userId: localStorage.getItem('token'),
       properties: updatedProperties,
     });
  }, [object]);
  
  useEffect(() => {
    if(object.class.value) {
    if (currentForm && currentForm.properties && object.class.value === currentForm.class) {
      const updatedProperties = currentForm.properties.map((prop) => ({
        name: prop.name,
        value: prop.value,
      }));
      setFormData({
        title: currentForm.title,
        class: currentForm.class,
        isComplete: currentForm.isComplete,
        userId: currentForm.userId,
        properties: updatedProperties,
      });
    }}
  }, [currentForm, object.class.value]);

  const handleTitleChange = (e) => {
    setFormData({
      ...formData,
      title: e.target.value,
    });
    formCheckValidity();
  }

  const handlePropertyChange = (propertyName, propertyValue) => {
    const updatedProperties = [...formData.properties];
    const existingPropertyIndex = updatedProperties.findIndex(
      (prop) => prop.name === propertyName
    );

    if (existingPropertyIndex !== -1) {
      updatedProperties[existingPropertyIndex].value = propertyValue;
    } else {
      updatedProperties.push({ name: propertyName, value: propertyValue });
    }

    setFormData({
      ...formData,
      properties: updatedProperties,
    });
    formCheckValidity();
  };

  const formCheckValidity = () => {
    setFormValidity(myformref.current.checkValidity());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValidity) {
      formData.isComplete = true;
    } else {
      formData.isComplete = false;
    }

    if (editing) {
      try {
        const res = await formServices.patchForm(currentForm._id, formData);
        if (!res) {
          throw new Error();
        }
        console.log(res);
        navigate("/overview");
      } catch (error) {
        console.error("Could not edit form");
      }
    } else {
      try {
        const res = await formServices.postForm(formData);
        if (!res) {
          throw new Error();
        }
        console.log(res);
        navigate("/overview");
      } catch (error) {
        console.error("Could not post form");
      }
    }
  };

  return (
    <div className="container-md mt-5 mb-5 p-0 cont">
      <form className="needs-validation was-validated" onSubmit={handleSubmit} ref={myformref}  noValidate>
      <div className="m-3">
          <div className="row">
            <label className="col-sm-3 col-form-label bold" htmlFor="title" title="Select title for the Form">
              Title <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="col-sm-9">
              <input
                className={`form-control ${formData.title === "" ? 'is-invalid' : 'is-valid'}`}
                type="text"
                id="title"
                value={formData.title}
                onChange={handleTitleChange}
                required
              />
              <div className="invalid-feedback">The field is required.</div>
            </div>
          </div>
        </div>
        {formData.properties.length !== 0 && (
        sortedProperties.map((property, index) => (
          <FormInput
            key={index}
            formGroup={formData.properties[index]}
            property={property}
            onPropertyChange={handlePropertyChange}
            language={language}
          />
        )))}
        <div className="row justify-content-center">
          <button
            type="submit"
            className={`btn-${formValidity ? 'success' : 'primary'} btn col-sm-8 m-3 mt-0`}
          >
            {formValidity ? 'Saving Complete Form' : 'Saving Incomplete Form'}
          </button>
          <button type="button" className="btn-secondary btn col-sm-3 m-3 mt-0" onClick={() => navigate("/overview")}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormBuilder;
