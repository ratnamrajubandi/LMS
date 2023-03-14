import React from 'react';
import CourseCard from './CourseCard';
import "./YourCourses.css";
import logo from "../assets/logo.png";
import salesforce from "../assets/salesforce.jpeg";

const YourCourses = () => {
  return (
    <div>
        <div className='top-logos-container d-flex justify-content-between'>
        <img src={logo} alt="logo"/>
        <img src={salesforce} alt="salesforce" />
        </div>
        <div className='hero-image-container d-flex align-items-center justify-content-center'>
            <h2 className='fw-bolder text-white'>Welcome to Kona LMS!</h2>
        </div>
        
        <div className='your-courses-container'>
        <h4 className='fw-bold yourcourses-title'>Your Courses</h4>
            <CourseCard />
            <CourseCard />
            <CourseCard />
        </div>
    </div>
  )
}

export default YourCourses;