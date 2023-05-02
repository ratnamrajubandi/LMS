import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserListAvailableCourses.css";
import logo from "../../assets/logo.png";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { listUserAvailableCourses } from "./UserListAvailableCourses.actions";

const UserListAvailableCourses = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const listAvailableCourses = useSelector(
    (state) => state.adminCourses.courses
  );

  useEffect(() => {
    dispatch(listUserAvailableCourses());
  }, []);

  const checkoutHandler = async (course) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:4001/api/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:4001/api/checkout", {
      price: course.price,
    });

    const options = {
      key,
      amount: order.price,
      currency: "INR",
      name: "DigitalLync",
      description: "Test Transaction",
      image: { logo },
      order_id: order.id,
      redirect: false,
      callback_url: "http://localhost:4001/api/paymentverification",
      prefill: {
        name: "Ratnam Raju Bandi",
        email: "ratnamraju.bandi@gmail.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);

    razor.open();
  };

  return (
    <div className="user-available-courses-container">
      <div className="container">
        <h1 className="courselist-heading text-center mt-0 pt-5">
          Available Courses
        </h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
          {listAvailableCourses?.map((course) => {
            return (
              <div className="m-4">
                <div
                  className="card text-black  mb-3 mx-auto mt-4 text-start card-style"
                  style={{ maxWidth: "18rem" }}
                  key={course.courseID}
                >
                  <div className="card-body">
                    <div className="courseMargin  mb-3 pb-3">
                      <h5 className="card-title ">{course.courseName}</h5>
                    </div>

                    <div className="courseMargin  mb-3 pb-3">
                      <p className="card-text">{`${course.duration} hours`}</p>
                    </div>
                    <div className="courseMargin  mb-3 pb-3">
                      <p className="card-text">{`Rs. ${course.price}/-`}</p>
                    </div>
                  </div>

                  <div
                    className="card-button"
                    onClick={() => {
                      checkoutHandler(course);
                    }}
                  >
                    <button className="btn btn-primary card-button-styles">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-end pb-5 pr-5 mx-5">
          <Link className="text-decoration-none" to="/userhomepage">
            <p className="user-courses-return">Return Home</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserListAvailableCourses;
