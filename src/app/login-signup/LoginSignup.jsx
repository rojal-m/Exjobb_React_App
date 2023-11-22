import React, { useEffect, useState } from "react";
import { userServices } from "../Services";
import { useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";


const LoginSignup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (userServices.isUserLoggedIn()) {
      navigate("/overview");
    }
  }, [navigate]);

  const [showLogin, setShowLogin] = useState(true);
  //const history = useHistory();
  

  const login = async (credentials) => {
    try {
      const userRes = await userServices.login(credentials);
      if (!userRes) {
        throw new Error();
      }
      // Handle successful login
      localStorage.setItem('token', userRes._id);
      // Redirect to the desired route, e.g., using React Router
      navigate("/overview");
    } catch (error) {
      // Handle login error
      console.error('Login failed');
    }
  };

  const signup = async (user) => {
    try {
      const userRes = await userServices.signup(user);
      if (!userRes) {
        throw new Error();
      }
      // Handle successful signup
      localStorage.setItem("token", userRes._id);
      // Redirect to the desired route, e.g., using React Router
      navigate("/overview");
    } catch (error) {
      // Handle signup error
      console.error('Signup failed');
    }
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="container-sm center text-center">
      {showLogin ? (
        <div>
          <h4 className="mt-2 mb-4">User Login</h4>
          <LoginForm login={login}/>
          <div className="text-center">
            <p>
              Not a member?
              <span className="link" onClick={toggleForm}>
                Register
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div>
          <h4 className="mt-2 mb-4">User Registration</h4>
          <SignupForm signup={signup}/>
          <div className="text-center">
            <p>
              Already a member?
              <span className="link" onClick={toggleForm}>
                Log in
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
