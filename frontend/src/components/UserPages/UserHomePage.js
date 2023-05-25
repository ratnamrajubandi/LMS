import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./UserHomePage.css";
// import { useSelector } from "react-redux";

import { LoginOutlined } from "@ant-design/icons";

const UserHomePage = () => {
  // const email = useSelector((state) => state.login.email);
  const localEmail = localStorage.getItem("Email");

  // const jwt = useSelector((state) => state.login.jwt);
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logged Out");
    localStorage.removeItem("JWT Token");
    navigate("/login");
  };

  return localStorage.getItem("JWT Token") ? (
    <div className="user-home-container mb-4 ">
      <div className="user-heading">
        <div className="logout">
          <LoginOutlined
            className="mt-4 btn btn-primary  signout-button"
            onClick={handleLogout}
          />
          <p className="text-align-center">Logout</p>
        </div>
        <h1 className="user-homepage-heading">Welcome To Kona LMS</h1>
        <div className="login-logout">
          <h5 className="text-secondary">
            Logged in as <span className="text-success fs-6">{localEmail}</span>
          </h5>
        </div>
      </div>
      <div className="user-links d-flex">
        <Link to="/listavailablecourses">
          <div className="link-one m-2">List Available Courses</div>
        </Link>
        <Link to="/yourcourses">
          <div className="link-two m-2">Get Your Purchased Courses</div>
        </Link>
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default UserHomePage;
