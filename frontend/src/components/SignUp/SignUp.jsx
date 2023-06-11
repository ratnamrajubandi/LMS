import "./SignUp.css";
import logo from "../../assets/logo.png";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Signup } from "./SignUp.actions";
//SIGNUP COMPONENT - BEGIN
const SignUp = () => {
  //CONSTANTS FOR BOTH REDUX AND COMPONENT STATE
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  //DISPATCHING EMAIL AND PASSWORD FROM UI TO STORE
  const dispatch = useDispatch();

  const register = () => {
    dispatch(Signup(formValues.email, formValues.password));
  };
  // ------------------------------------------------------------------------

  // GETTING EMAIL AND PASSWORD FROM STORE
  const email = useSelector((state) => state.email);

  const password = useSelector((state) => state.password);
  const responseStatus = useSelector((state) => state.signup.responseStatus);

  const [errorMessage, setErrorMessage] = useState("");
  //-------------------------------------------------------------------------
  //EVENT HANDLERS
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  //REDIRECT TO SIGNIN PAGE AFTER SIGNUP
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  useEffect(() => {
    if (responseStatus === 201) {
      navigate("/signupverify");
    }
    if (responseStatus === 409) {
      setErrorMessage("User Already Exists");
    }
  }, [responseStatus]);

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
          <div>
            <img
              className="mb-4 "
              src={logo}
              alt="Digital Lync Logo"
              width={200}
              height={70}
            />
            <h1 className="h3 mb-3 fw-normal text-secondary">Welcome</h1>

            {Object.keys(formErrors).length === 0 &&
            isSubmit &&
            errorMessage ? (
              <div className="text-success">{errorMessage}</div>
            ) : (
              <p className="text-muted mt-4">
                Sign Up to Kona LMS to continue to DigitalLync
              </p>
            )}
            <p className="text-warning">{formErrors.email}</p>
            <div className="form-floating mb-4 mt-4">
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
            <div className="form-floating mt-4 mb-4">
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

            <button
              className="w-100 btn btn-lg button-color"
              type="submit"
              onClick={register}
            >
              Continue
            </button>

            <p className="mt-5 mb-3 text-muted">
              Already have an account?{" "}
              <Link to="/login">
                <span className="span-text">Log in</span>{" "}
              </Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
