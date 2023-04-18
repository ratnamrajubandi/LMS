import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";

import YourCourses from "./components/YourCourses";
import ForgotPassword from "./components/Forgotpassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminCourses from "./components/AdminCourses/AdminCourses";
import ListAdminCourses from "./components/ListAdminCourses/ListAdminCourses";
import CoursesAccordion from "./components/AdminCourses/CoursesAccordion";

function App() {
  return (
    // <AdminCourses />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact={true} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/yourcourses" element={<YourCourses />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/course" element={<AdminCourses />} />
        <Route path="/courselist" element={<ListAdminCourses />} />
        <Route
          path="/courselist/courseaccordion/:id"
          element={<CoursesAccordion />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
