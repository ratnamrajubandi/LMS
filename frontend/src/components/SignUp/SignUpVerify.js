import "./SignUpVerify.css";
import logo from "../../assets/logo.png";

import React from "react";

const SignUpVerify = () => {
  return (
    <div className="v-page-background-img">
        
      <div className="p-5 fw-bolder d-flex align-items-center justify-content-center">
        <p className="p-5 mt-5">
          A Verification link has been sent to your registered E-mail,
          <a
            className="text-decoration-none"
            href="https:/mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Click Here
          </a>
        </p>
      
      </div>
    </div>
  );
};

export default SignUpVerify;
