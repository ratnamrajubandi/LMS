import "./Login.css";
import logo from "../../assets/logo.png";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./Login.actions";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const responseStatus = useSelector((state) => state.login.responseStatus);

  //DISPATCHING EMAIL AND PASSWORD FROM UI TO STORE
  const dispatch = useDispatch();

  const loginUser = () => {
    dispatch(login(formValues.email, formValues.password));
  };
  // ------------------------------------------------------------------------

  // GETTING EMAIL, PASSWORD, JWT FROM STORE
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  const jwt = useSelector((state) => state.login.jwt);

  //FORM HANDLING AND GETTING INPUT DATA FROM USER
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  //VALIDATING USER CREDENTIALS IN BACKEND AND ROUTING TO DASHBOARD
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit && jwt) {
      localStorage.setItem("JWT Token", jwt);
      navigate("/yourcourses");
    }

    if (responseStatus === 400) {
      setErrorMessage("Invalid Credentials");
    }
  }, [formErrors, isSubmit, jwt, responseStatus]);

  //FORM VALIDATION ON FRONTEND
  const validate = (values) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!values.email) {
      errors.email = "Email is required!!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid E-mail format";
    }

    if (!values.password) {
      errors.password = "Password is required!!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed than 10 characters";
    }

    return errors;
  };

  return (
    <div className="background-img login-page">
      <main className="form-signin text-center mr-auto">
        <form onSubmit={handleSubmit}>
          <img
            className="mb-4 "
            src={logo}
            alt="Digital Lync Logo"
            width={200}
            height={70}
          />
          <h1 className="h3 mb-3 fw-normal text-secondary">Welcome</h1>

          {errorMessage ? (
            <div className="text-danger">Invalid Credentials !!</div>
          ) : (
            <p className="text-muted mt-4">
              Log in to Kona LMS to continue to DigitalLync
            </p>
          )}

          <p className="text-warning">{formErrors.email}</p>
          <div className="form-floating mt-4">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <p className="text-warning">{formErrors.password}</p>
          <div className="form-floating mt-2">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="mb-3">
            <Link className="text-decoration-none">
              <p className="span-text text-left">Forgot Password?</p>
            </Link>
          </div>
          <button
            className="w-100 btn btn-lg button-color"
            type="submit"
            onClick={loginUser}
          >
            Continue
          </button>
          <p className="mt-5 mb-3 text-muted">
            Don't have an account?{" "}
            <Link to="/signup" className="text-decoration-none">
              {" "}
              <span className="span-text ">Sign Up</span>{" "}
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
