import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userServices, formServices } from "../Services";

import SelectObject from "./SelectObject";
import LanguageSelect from "./SelectLanguage";
import FormBuilder from "./FormBuilder";

function Form() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!userServices.isUserLoggedIn()) {
      navigate("/login-signup");
    }
  }, [navigate]);

  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [currentForm, setCurrentForm] = useState({});

  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    // Fetch data here if needed
    if (id) {
      setEditing(true);
      getOneForm(id);
    }
  }, [id]);

  const getOneForm = async (formId) => {
    try {
      const dataRes = await formServices.getOneForm(formId);
      if (!dataRes) {
        throw new Error();
      }
      // Handle successful login
      setCurrentForm(dataRes);
    } catch (error) {
      // Handle login error
      console.error("Cannot find Form with id");
    }
  };

  return (
    <div className="container-md">
      <h1>Trace4Value</h1>
      <div className="row row-reverse">
        <LanguageSelect setSelectedLanguage={setSelectedLanguage} />
        <SelectObject
          objClass={currentForm.class ?? null}
          language={selectedLanguage}
          setSelectedObject={setSelectedObject}
        />
      </div>
      {selectedObject && (
        <FormBuilder
          currentForm={currentForm ?? null}
          object={selectedObject}
          language={selectedLanguage}
          editing={editing}
        />
      )}
    </div>
  );
}

export default Form;
