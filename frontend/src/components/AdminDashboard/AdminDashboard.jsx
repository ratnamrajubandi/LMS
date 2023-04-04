import React from "react";
import "./AdminDashboard.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="d-flex home">
      <div className="form-signin-container ">
        <main className="form-signin-home text-center mr-auto ">
          <form className="">
            <img
              className="mb-5 "
              src={logo}
              alt="Digital Lync Logo"
              width={300}
              height={100}
            />
            <h1 className="h4 mb-4 fw-normal mt-2 text-secondary ">
              Welcome To Admin Dashboard
            </h1>
            <div className="d-flex"> 
            <Link to="/course">
              <button className="admin-button-color">Add Courses</button>
              {/* <p className="text-muted">Add Courses</p> */}
            </Link>
            <Link to="/course">
              <button className="admin-button-color">Change Role</button>
              {/* <p className="text-muted">Change Role</p> */}
            </Link>
            <Link to="/course">
              {/* <p className="text-muted">Add Courses</p> */}
              <button className="admin-button-color">Change Role</button>
            </Link>
            </div>
          </form>
        </main>
      </div>
      <div className="background-img"></div>
    </div>
  );
};

export default AdminDashboard;
