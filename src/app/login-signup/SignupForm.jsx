import React, { useState } from 'react';

const SignupForm = ({ signup }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the signup function passed as a prop
    signup(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row justify-content-center">
        <div className="col-6 form-floating mb-4">
          <input
            type="text"
            className="form-control"
            id="userSignupName"
            placeholder="Name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
          <label className="ms-3" htmlFor="userSignupName">Name</label>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6 form-floating mb-4">
          <input
            type="email"
            className="form-control"
            id="userSignupEmail"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <label className="ms-3" htmlFor="userSignupEmail">Email address</label>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6 form-floating mb-4">
          <input
            type="password"
            className="form-control"
            id="userSignupPassword"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <label className="ms-3" htmlFor="userSignupPassword">Password</label>
        </div>
      </div>
      <div className="row justify-content-center">
        <button type="submit" className="btn btn-primary btn-block col-4 mb-4">
          Sign up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
