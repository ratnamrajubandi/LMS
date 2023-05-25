import React from "react";
import "./Admin2Dashboard.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginOutlined } from "@ant-design/icons";

const Admin2Dashboard = () => {
  const email = useSelector((state) => state.login.email);

  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logged Out");
    localStorage.removeItem("JWT Token");
    navigate("/login");
  };

  return (
    <div className="d-flex home">
      <div className="form-signin-container2 ">
        <main className="form-signin-home2 text-center mr-auto ">
          <form className="">
            <img
              className="mb-5 "
              src={logo}
              alt="Digital Lync Logo"
              width={300}
              height={100}
            />
            <h1 className="h4 mb-4 fw-normal mt-2 text-secondary">
              Welcome To Admin Dashboard
            </h1>
            <h5 className="text-secondary">
              Logged in as <span className="text-success fs-6">{email}</span>
            </h5>
            <div className="d-flex mt-4">
            <Link to="/course">
                <button className="admin-button-color2">Add Courses</button>
                {/* <p className="text-muted">Add Courses</p> */}
              </Link>
              <Link to="/courselist">
                <button className="admin-button-color2">Get All Courses</button>
                {/* <p className="text-muted">Change Role</p> */}
              </Link>
              {/* <Link to="/getallusers">
                <button className="admin-button-color2">
                  Change User Role
                </button>
              </Link> */}
            </div>
          </form>
        </main>
      </div>
      <div className="background-img2">
        <div className="admin-logout2">
          <LoginOutlined
            className="mt-4 btn btn-primary  signout-button2"
            onClick={handleLogout}
          />
          <p className="text-align-center">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Admin2Dashboard;
