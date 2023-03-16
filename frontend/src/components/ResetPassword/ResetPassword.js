import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import resetPassword from "./ResetPassword.actions";
import "./ResetPassword.css";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const initialValues = { password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [statusMessage, setStatusMessage] = useState("");
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const resetPasswordResponse = useSelector(
    (state) => state.resetPassword?.responseStatus
  );
  console.log("resetPasswordResponse: ", resetPasswordResponse);

  useEffect(() => {}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log("params: ", params);
    dispatch(resetPassword(formValues.password, params.user, params.token));
  };

  return (
    <div className="f-container d-flex align-items-center justify-content-center ">
      <div className="forgot-password-container">
        <div className="align-items-center">
          <form onSubmit={handleSubmit}>
            <p className="text-align-center f-pw-text">
              Enter Your New Password
            </p>
            <input
              className="forgot-password-input"
              type="text"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <button className="fp-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
