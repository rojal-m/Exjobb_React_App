import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginSignup from "./login-signup/LoginSignup";
import Overview from "./overview/Overview";
import Form from "./form/Form";

import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/App.css'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/login-signup" element={<LoginSignup />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/form" element={<Form />} />
      <Route path="/form/:id" element={<Form />} />
    </Routes>
  );
};

export default App;
