import React, { useState, useEffect } from "react";
import { userServices, formServices } from "../Services";
import { useNavigate } from "react-router-dom";
import FormInfoBox from "./FormInfoBox";
import FormInfoView from "./FormInfoView";

const Overview = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!userServices.isUserLoggedIn()) {
      navigate("/login-signup");
    } else {
      getUserInfo();
      getForms();
    }
  }, [navigate]);

  const [userInfo, setUserInfo] = useState(null);
  const [completedForms, setCompletedForms] = useState([]);
  const [incompletedForms, setIncompletedForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = await userServices.getUserInfo(token);
      if (!data) {
        throw new Error();
      }
      setUserInfo(data);
    } catch (error) {
      console.error("Failed to get user info");
    }
  };

  const getForms = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = await formServices.getForms(token);
      if (!data) {
        throw new Error();
      }
      const completed = [];
      const incompleted = [];
      for (const form of data) {
        if (form.isComplete) {
          completed.push(form);
        } else {
          incompleted.push(form);
        }
      }
      setCompletedForms(completed);
      setIncompletedForms(incompleted);
    } catch (error) {
      console.error("Failed to get forms info");
    }
  };

  /* const editUserInfo = (newData) => {
    const token = localStorage.getItem('token');
    if (token) {
      userServices.updateUserInfo(token, newData).then(() => {
        getUserInfo();
      });
    }
  }; */

  const navigateToAddForm = () => {
		navigate("/form");
  };

  const signOut = () => {
    localStorage.clear();
    navigate("/login-signup");
  };

  const deleteForm = async (formId, isCompleted) => {
		if (isCompleted) {
			setCompletedForms(prevForms => prevForms.filter(item => item._id !== formId));
		} else {
			setIncompletedForms(prevForms => prevForms.filter(item => item._id !== formId));
		}
		try {
      const data = await formServices.removeForm(formId);
      if (!data) {
        throw new Error();
      }
      console.log(data);
    } catch (error) {
      console.error("Failed to delete form");
    }
  };

  const editForm = (formId) => {
    navigate(`/form/${formId}`);
  };

  const viewForm = (formId) => {
    setSelectedFormId(formId);
  };

  const closeView = () => {
    setSelectedFormId(null);
  };

  return (
    <div className="container">
      {userInfo && (
        <div className="row justify-content-between mt-4">
          <div className="col-7">
            <h3>{userInfo.username}'s Overview</h3>
            <p>Email: {userInfo.email}</p>
          </div>
          <div className="col-sm-3 row justify-content-between align-items-center">
            <button
              className="col-auto btn btn-primary"
              onClick={navigateToAddForm}
            >
              Add New Form
            </button>
            <button className="col-auto btn btn-secondary" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </div>
      )}
      <div className="row gx-5 justify-content-between text-center pt-3">
        <div className="col-6">
          {completedForms.length > 0 && (
            <>
              <h4>Completed Forms:</h4>
              {completedForms.map((form) => (
                <FormInfoBox
									key={form._id} 
                  form={form}
                  viewForm={viewForm}
                  editForm={editForm}
                  deleteForm={deleteForm}
									isCompleted={true}
                />
              ))}
            </>
          )}
        </div>
        <div className="col-6">
          {incompletedForms.length > 0 && (
            <>
              <h4>Incompleted Forms:</h4>
              {incompletedForms.map((form) => (
                <FormInfoBox
									key={form._id} 
									form={form}
									viewForm={viewForm}
									editForm={editForm}
									deleteForm={deleteForm}
									isCompleted={false}
								/>
              ))}
            </>
          )}
        </div>
      </div>
      {selectedFormId && (
				<FormInfoView 
					formId={selectedFormId}
					closeView={closeView}
				/>
			)}
    </div>
  );
};

export default Overview;