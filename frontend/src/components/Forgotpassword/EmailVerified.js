import React, { useEffect, useState } from "react";
import "./EmailVerified.css";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "./ForgotPassword.actions";
import { Link } from "react-router-dom";

const EmailVerified = () => {
  const dispatch = useDispatch();
  const [statusMessage, setStatusMessage] = useState("");
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const { verifyEmailResponseStatus, loading } =
    useSelector((state) => state.forgotPassword) || {};

  useEffect(() => {
    dispatch(verifyEmail(params.user, params.token));
  }, []);

  useEffect(() => {
    if (verifyEmailResponseStatus === 200) {
      setStatusMessage("Email verified successfully!!");
    }

    if (verifyEmailResponseStatus === 400) {
      setStatusMessage(
        "Unable to verify email. Please check the link and try again"
      );
    }
  }, [verifyEmailResponseStatus]);
  return (
    <div className="verify-background ">
      <div className="mt-5, p-4 d-flex fs-2 fw-bolder align-items-center justify-content-center">
        {loading ? "Verifying email" : statusMessage}
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <p className="fw-bold">
          Please <Link to="/login" className="text-decoration-none">click here </Link>  to login
        </p>
      </div>
    </div>
  );
};

export default EmailVerified;
