import React from "react";
import desk1 from "../assets/desk2.jpeg";
import { ArrowRightOutlined } from '@ant-design/icons';
import { VideoCameraOutlined } from '@ant-design/icons';
import "./CourseCard.css";

const CourseCard = () => {
  return (
    <div className="coursecard-container shadow mb-3 bg-body rounded">
      <div className="coursecard-img-container">
        <img className="coursecard-img-container" src={desk1} alt="" />
      </div>
      <div className="m-3 coursecard-title-container">
        <p className="text-secondary fw-bold">AWS-202217 7 PM</p>
        <p className="text-muted fw-lighter">AWS-202217</p>
      </div>
      <div className="d-flex  flex-column align-items-end coursecard-buttons-container">
        <button className="mt-3 coursecard-button-1">Continue <ArrowRightOutlined /></button>
        
        <button className="mt-3 coursecard-button-2 text-muted">Live Class <VideoCameraOutlined /></button>
      </div>
    </div>
  );
};

export default CourseCard;
