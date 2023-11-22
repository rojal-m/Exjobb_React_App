import React, { useState } from 'react';

const LoginForm = ({ login }) => {
  const [formData, setFormData] = useState({
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
    // Call the login function passed as a prop
    login(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row justify-content-center">
        <div className="col-6 form-floating mb-4">
          <input
            type="email"
            className="form-control"
            id="userLoginEmail"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <label className="ms-3" htmlFor="userLoginEmail">Email address</label>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6 form-floating mb-4">
          <input
            type="password"
            className="form-control"
            id="userLoginPassword"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <label className="ms-3" htmlFor="userLoginPassword">Password</label>
        </div>
      </div>
      <div className="row justify-content-center">
        <button type="submit" className="btn btn-primary btn-block col-4 mb-4">
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
