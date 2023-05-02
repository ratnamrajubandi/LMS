import React from "react";
import { useSearchParams, Link } from "react-router-dom";

import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  const refNum = searchQuery.get("reference");

  return (
    <div className="suuccess-container pt-5">
      <div className="text-align-center d-flex justify-content-center align-items-center flex-column mx-auto border-4 bg-success w-50 rounded-3">
        <div className="mt-5 fw-bolder text-white">Order Successful!!!</div>
        <p className="mt-4 fw-bold">Reference No. : {refNum}</p>
      </div>
      <div className="text-end pb-5 pr-5 mx-5">
        <Link className="text-decoration-none" to="/listavailablecourses">
          <p className="user-courses-return">Return Home</p>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
