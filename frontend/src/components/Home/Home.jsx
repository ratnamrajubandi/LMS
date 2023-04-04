import React from "react";
import "./Home.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex home">
      <div className="form-signin-container ">
        <main className="form-signin-home text-center mr-auto">
          <form>
            <img
              className="mb-5 "
              src={logo}
              alt="Digital Lync Logo"
              width={300}
              height={100}
            />
            <h1 className="h3 mb-3 fw-normal mt-3 text-secondary">Welcome</h1>
            <p className="text-muted">Please sign in to your account below</p>
            {/* 
            <Link to="/login"> */}
            <Link to="/course">
              <button
                className="w-75 btn btn-lg button-color mt-5 btn-size"
                type="submit"
              >
                Sign In
              </button>
            </Link>
          </form>
        </main>
      </div>
      <div className="background-img"></div>
    </div>
  );
};

export default Home;
