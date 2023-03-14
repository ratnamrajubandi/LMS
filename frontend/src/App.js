import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";

import YourCourses from "./components/YourCourses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact={true} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/yourcourses" element={<YourCourses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
