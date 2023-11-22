import data from '../data/form.json';

const baseUrl = "http://localhost:5000";

const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

const error = (failedRes) => {
  console.error(failedRes);
  throw new Error("Network response was not ok");
};

export const userServices = {
  isUserLoggedIn: () => {
    return localStorage.getItem("token") !== null;
  },
  signup: async (user) => {
    try {
      const response = await fetch(`${baseUrl}/users/signup`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        error(response);
      }
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  },
  login: async (credentials) => {
    try {
      const response = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        error(response);
      }
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  },
  getUserInfo: async (id) => {
    try {
      const response = await fetch(`${baseUrl}/users/${id}`);
      if (!response.ok) {
        error(response);
      }
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  },
  updateUserInfo: async (email, newData) => {
    try {
      const response = await fetch(`${baseUrl}/users/${email}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        error(response);
      }
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  },
  getClassLabels: (classValue) => {
    const selectedObject = data.find(item => item.class.value === classValue);
    if (selectedObject && selectedObject.class.labels) {
        const selectedLang = localStorage.getItem('selectedLang') ?? "en";
        return selectedObject.class.labels[selectedLang] ?? selectedObject.class.labels.default;
    }
    return classValue;
  },
  getPropertyLabels: (classValue, propValue) => {
    const selectedObject = data.find(item => item.class.value === classValue);
    const objPropData = selectedObject.properties.find(item => item.property.value === propValue);
    if (objPropData && objPropData.property.labels) {
        const selectedLang = localStorage.getItem('selectedLang') ?? "en";
        return objPropData.property.labels[selectedLang] ?? objPropData.property.labels.default;
    }
    return propValue;
  },
  getPropertyValueLabels: (classValue, propValue, propValuesValue) => {
    const selectedObject = data.find(item => item.class.value === classValue);
    const objPropData = selectedObject.properties.find(item => item.property.value === propValue);
    const objPropValueData = objPropData.values.find(item => item.value === propValuesValue);
    if (objPropValueData && objPropValueData.labels) {
        const selectedLang = localStorage.getItem('selectedLang') ?? "en";
        return objPropValueData.labels[selectedLang] ?? objPropValueData.labels.default;
    }
    return propValuesValue;
  },
};

export const formServices = {
  getForms: async (userId) => {
    try {
      const response = await fetch(`${baseUrl}/forms/getAll/${userId}`);
      if (!response.ok) {
        error(response);
      }
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  },
  getOneForm: async (id) => {
    try {
      const response = await fetch(`${baseUrl}/forms/getOne/${id}`);
      if (!response.ok) {
        error(response);
      }
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  },
  postForm: async (formData) => {
    try {
      const response = await fetch(`${baseUrl}/forms/post`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        error(response);
      }
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  },
  patchForm: async (id, formData) => {
    try {
      const response = await fetch(`${baseUrl}/forms/patch/${id}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        error(response);
      }
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  },
  removeForm: async (id) => {
    try {
      const response = await fetch(`${baseUrl}/forms/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        error(response);
      }
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  },
};
