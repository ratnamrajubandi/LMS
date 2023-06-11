import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";

import YourCourses from "./components/UserPurchasedCourses/YourCourses";
import ForgotPassword from "./components/Forgotpassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Admin2Dashboard from "./components/Admin2Dashboard/Admin2Dashboard";
import AdminCourses from "./components/AdminCourses/AdminCourses";
import ListAdminCourses from "./components/ListAdminCourses/ListAdminCourses";
import CoursesAccordion from "./components/AdminCourses/CoursesAccordion";
import UserHomePage from "./components/UserPages/UserHomePage";
import UserListAvailableCourses from "./components/UserPages/UserListAvailableCourses";
import PaymentSuccess from "./components/Payments/PaymentSuccess";
import AdminGetAllUsers from "./components/AdminDashboard/AdminGetAllUsers";
import EmailVerified from "./components/Forgotpassword/EmailVerified";
import SignUpVerify from "./components/SignUp/SignUpVerify"

function App() {
  return (
    // <AdminCourses />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact={true} />
        <Route path="/home" element={<Home />} />
        <Route path="/signupverify" element={<SignUpVerify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin2dashboard" element={<Admin2Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/yourcourses" element={<YourCourses />} />
        <Route path="/userhomepage" element={<UserHomePage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/course" element={<AdminCourses />} />
        <Route path="/getallusers" element={<AdminGetAllUsers />} />
        <Route path="/courselist" element={<ListAdminCourses />} />
        <Route
          path="/courselist/courseaccordion/:id"
          element={<CoursesAccordion />}
        />
        <Route
          path="/listavailablecourses"
          element={<UserListAvailableCourses />}
        />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/emailverification" element={<EmailVerified />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
