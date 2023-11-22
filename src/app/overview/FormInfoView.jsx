import React, { useState, useEffect }  from 'react';
import { formServices, userServices } from "../Services";

const FormInfoView = ({ formId, closeView }) => {
  const [form, setForms] = useState(null);

	useEffect(() => {
    	getOneForm(formId);
  	},[formId]);

	const getOneForm = async (formId) => {
		try {
      const data = await formServices.getOneForm(formId);
      if (!data) {
        throw new Error();
      }
      setForms(data);
    } catch (error) {
      console.error("Failed to get form");
    }
  };

	const getClassLabels = (classValue) => {
    return userServices.getClassLabels(classValue);
  };
	const getPropertyLabel = (property) => {
		return userServices.getPropertyLabels(form.class, property);
	};
	const getPropertyValueLabel = (property) => {
		if (Array.isArray(property.value)) {
			const data =  property.value.map((p) =>
			userServices.getPropertyValueLabels(form.class, property.name, p)
			).join(', ');
			return data;
		}
		return property.value;
	};
	
	const download = () => {
		// Convert form data to JSON format
		const formData = { ...form };
		delete formData.__v;
		delete formData._id;
		delete formData.isComplete;
		delete formData.userId;
		delete formData.createdDate;

		const jsonData = JSON.stringify(formData);
		// Create a Blob with the JSON data
		const blob = new Blob([jsonData], { type: 'application/json' });
		const url = window.URL.createObjectURL(blob);
		// Create an <a> element to trigger the download
		const a = document.createElement('a');
		a.href = url;
		a.download = 'data.json';
		a.click();
	
		// Clean up the temporary URL
		window.URL.revokeObjectURL(url);
	};

  return (
		<>
			{form && (
				<div className="overlay">

					<div className="container view-form-container">
						<div className="row justify-content-between">
							<div className="col-7">
								<h3>{form.title} - {getClassLabels(form.class)}</h3>
								<p>Created Date: {new Date(form.createdDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
							</div>
							<div className="col-auto row justify-content-between align-items-start">
								<button className="btn btn-outline-secondary" onClick={closeView}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
										<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
									</svg>
								</button>
							</div>
						</div>
						<h5>Properties:</h5>
						{form.properties.map((property, index) => (
							<div key={index} className="row view-property-box justify-content-start align-items-center mb-2 ms-5 me-5">
								<p className="col-4 m-2">{getPropertyLabel(property.name)}: </p>
								<p className="col-4 m-2">{getPropertyValueLabel(property)}</p>
							</div>
						))}
						<button className="align-center btn btn-primary ms-5" onClick={download}>Download</button>
					</div>
					<div className="overlay" onClick={closeView}></div>
				</div>
			)}
		</>
  );
};

export default FormInfoView;
