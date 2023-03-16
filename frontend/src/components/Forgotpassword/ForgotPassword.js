import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "./ForgotPassword.actions";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const forgotPasswordResponse = useSelector(
    (state) => state.forgotPassword?.responseStatus
  );
  console.log("forgotPasswordResponse: ", forgotPasswordResponse);
  const initialValues = { email: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (forgotPasswordResponse === 404) {
      setStatusMessage("Email not found");
      return;
    }
    if (forgotPasswordResponse === 400) {
      setStatusMessage("Error in sending reset message");
      return;
    }

    if (forgotPasswordResponse === 200) {
      setStatusMessage("A reset request has been sent to your email");
    }
  }, [forgotPasswordResponse]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (ev) => {
    dispatch(forgotPassword(formValues.email));
    ev.preventDefault();
  };
  return (
    <div className="f-container d-flex align-items-center justify-content-center ">
      <div className="forgot-password-container">
        <div className="align-items-center">
          <form onSubmit={handleSubmit}>
            <p className="text-align-center f-pw-text">
              Enter Your Registered Email..
            </p>
            <input
              className="forgot-password-input"
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <button className="fp-button" type="submit">
              Send
            </button>
          </form>
          {statusMessage ? (
            <div className="forgot-password-status-message text-danger mt-3 fw-bold">
              {statusMessage}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
