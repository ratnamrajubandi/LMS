import React, { useState, useEffect } from "react";
import "./ListAdminCourses.css";
import logo from "../../assets/logo.png";
import { EditOutlined, DeleteOutlined, LoginOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { url } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdminCourse,
  listAdminCourses,
  updateCourse,
} from "./ListAdminCourses.actions";
import AdminCoursesEditModal from "./AdminCoursesEditModal";

const ListAdminCourses = () => {
  const [data, setData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const dispatch = useDispatch();

  const userRole = useSelector((state) => state.login.role);

  const adminCourses = useSelector((state) => state.adminCourses.courses);

  console.log("adminCourses: ", adminCourses);

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    console.log("in handle delete: ", id);
    dispatch(deleteAdminCourse(id));
  };

  useEffect(() => {
    dispatch(listAdminCourses());
  }, []);

  // data.map((c) => {
  //   console.log(c.curriculum);
  // });

  return (
    <div className="list-admin-courses-container">
      <div className="container">
        {showEditModal && (
          <AdminCoursesEditModal
            show={showEditModal}
            handleClose={() => {
              setShowEditModal(false);
            }}
            course={selectedCourse}
            handleSave={(formValues) => {
              const { id, ...rest } = formValues;
              dispatch(updateCourse(formValues.id, rest));
              setShowEditModal(false);
            }}
          />
        )}
        <div className="logout">
          <LoginOutlined className="mt-4 btn btn-primary  signout-button" />
          <p className="text-align-center">Logout</p>
        </div>
        <h1 className="courselist-heading text-center mt-0 pt-5">
          Courses List
        </h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
          {adminCourses?.map((course) => {
            return (
              <div className="m-4">
                <div
                  className="card text-black  mb-3 mx-auto mt-4 text-start admin-card-style"
                  style={{ maxWidth: "18rem" }}
                  key={course.courseID}
                >
                  <div className="card-body">
                    <div className="courseMargin  mb-3 pb-3">
                      <h5 className="card-title ">{course.courseName}</h5>
                    </div>

                    <div className="courseMargin mt-3 mb-3 pb-3">
                      <Link
                        to={`/courselist/courseaccordion/${course.courseID}`}
                      >
                        <p className="card-text">{`Course Currculum`}</p>
                      </Link>
                    </div>
                    <div className="courseMargin  mb-3 pb-3">
                      <p className="card-text">{`${course.duration} hours`}</p>
                    </div>
                    <div className="courseMargin  mb-3 pb-3">
                      <p className="card-text">{`Rs.${course.price}/-`}</p>
                    </div>
                    <div className="d-flex justify-content-sm-between">
                      <EditOutlined
                        className="btn"
                        onClick={() => handleEdit(course)}
                      />
                      <button>Assign</button>
                      <DeleteOutlined
                        className="btn"
                        onClick={() => {
                          handleDelete(course["_id"]);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-end pb-5 pr-5 mx-5">
          {/* <Link className="text-decoration-none" to="/admin2dashboard">
            <p>Return to Dashboard</p>
          </Link> */}
          {console.log("userRole: ", userRole, userRole === "superadmin")}
          <Link
            className="text-decoration-none"
            to={
              userRole === "superadmin" ? "/admindashboard" : "/admin2dashboard"
            }
          >
            <p className="mt-3">Return to Dashboard</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListAdminCourses;
