import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import resetPassword from "./ResetPassword.actions";
import "./ResetPassword.css";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const initialValues = { password: "", confirPassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [statusMessage, setStatusMessage] = useState("");
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const navigate = useNavigate();

  const { responseStatus: resetPasswordResponse, responseStatusMessage } =
    useSelector((state) => state.resetPassword) || {};
  console.log("resetPasswordResponse: ", resetPasswordResponse);

  useEffect(() => {
    if (resetPasswordResponse === 200) {
      setStatusMessage("Password Changed Successfully");
      navigate("/login");
    }

    if (resetPasswordResponse === 400) {
      if (responseStatusMessage) {
        setStatusMessage(responseStatusMessage);
      }
    }
  }, [resetPasswordResponse]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log("params: ", params);
    if (formValues.password !== formValues.confirPassword) {
      setStatusMessage("Password Mismatch");
      return;
    } else {
      setStatusMessage("");
    }

    dispatch(resetPassword(formValues.password, params.user, params.token));
    setFormValues({ ...formValues, password: "", confirPassword: "" });
  };

  return (
    <div className="r-container d-flex align-items-center justify-content-center ">
      <div className="reset-password-container">
        <div className="align-items-center">
          <form onSubmit={handleSubmit}>
            <p className="text-align-center r-pw-text">
              Enter Your New Password
            </p>
            <input
              className="reset-password-input"
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />

            <p className="text-align-center r-pw-text mt-3">
              Confirm Your Password
            </p>
            <input
              className="reset-password-input"
              type="password"
              name="confirPassword"
              value={formValues.confirPassword}
              onChange={handleChange}
            />
            {statusMessage ? (
              <div className="reset-password-status-message text-success mt-3 fw-bold">
                <p>{statusMessage}</p>
              </div>
            ) : (
              <></>
            )}
            <div className="d-flex justify-content-center align-items-center mt-3">
              <button className="rp-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
