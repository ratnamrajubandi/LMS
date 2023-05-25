import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { useDispatch, useSelector } from "react-redux";
import "./YourCourses.css";
// import logo from "././assets/logo.png";
import logo from "../../assets/logo.png";
import salesforce from "../../assets/salesforce.jpeg";
import { listUserPurchasedCourses } from "./YourCourses.actions";

const YourCourses = () => {
  const dispatch = useDispatch();

  const email = localStorage.getItem("Email");
  useEffect(() => {
    dispatch(listUserPurchasedCourses(email));
  }, []);

  const courses = useSelector((state) => state.userPurchasedCourses.courses);
  // console.log("courses in com: ", courses);

  return (
    <div>
      <div className="top-logos-container d-flex justify-content-between">
        <img src={logo} alt="logo" />
        <img src={salesforce} alt="salesforce" />
      </div>
      <div className="hero-image-container d-flex align-items-center justify-content-center">
        <h2 className="fw-bolder text-white">Welcome to Kona LMS!</h2>
      </div>

      <div className="your-courses-container">
        <h4 className="fw-bold yourcourses-title">Your Courses</h4>
        {courses.map((course) => (
          <CourseCard
            courseName={course.courseName}
            courseDuration={course.duration}
          />
        ))}
      </div>

      <div className="text-end pb-5 pr-5 mx-5">
        <Link className="text-decoration-none" to="/userhomepage">
          <p className="yourcourses-return">Return Home</p>
        </Link>
      </div>
    </div>
  );
};

export default YourCourses;
