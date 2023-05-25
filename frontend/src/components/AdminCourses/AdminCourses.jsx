import "./AdminCourses.css";
import logo from "../../assets/logo.png";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { addCourses } from "./AdminCourses.actions";
import { useEffect } from "react";

const AdminCourses = () => {
  console.log("in admin course");
  const initialValues = {
    courseID: "",
    courseName: "",
    courseDuration: 0,
    curriculum: {},
    price: 0,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [topicIds, setTopicIds] = useState(["topicId0"]);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const responseStatus = useSelector(
    (state) => state.addCourses.responseStatus
  );

  console.log("responseStatus: ", responseStatus);

  //DISPATCHING FORM VALUES FROM UI TO STORE
  const dispatch = useDispatch();

  // ------------------------------------------------------------------------

  // GETTING ROLE FROM STORE
  const userRole = useSelector((state) => state.login.role);
  console.log("userRole: ", userRole);

  //FORM HANDLING AND GETTING INPUT DATA FROM USER
  const handleTopicAdd = (e) => {
    const randomId = Math.random().toString(36).substr(2, 5);
    console.log("randomId: ", randomId);
    setTopicIds((topicIds) => [...topicIds, randomId]);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("curriculum-")) {
      const topicId = name.substring(11);
      setFormValues({
        ...formValues,
        curriculum: {
          ...formValues.curriculum,
          [topicId]: value,
        },
      });
      return;
    }

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const curriculum = Object.values(formValues.curriculum);
    if (Object.keys(validate(formValues)).length) {
      setFormErrors(validate(formValues));
      return;
    } else {
      setFormErrors("");
    }

    setIsSubmit(true);
    dispatch(
      addCourses(
        formValues.courseID,
        formValues.courseName,
        formValues.courseDuration,
        curriculum,
        formValues.price
      )
    );
    console.log(formValues);
    // navigate("./admindashboard")
    // <Navigate to="/admindashboard" replace={true} />
  };

  useEffect(() => {
    if (responseStatus === 500) {
      setErrorMessage("Invalid Request");
    }
    if (responseStatus === 200) {
      setErrorMessage("");

      setFormValues({ ...initialValues, curriculum: [] });
    }
  }, [responseStatus]);

  //VALIDATING USER ROLE
  const [errorMessage, setErrorMessage] = useState("");

  console.log("before  if");
  console.log("userrole in admin courses: ", userRole);
  if (!["superadmin", "admin"].includes(userRole)) {
    console.log("before  navigate");
    // navigate("/login");
    return <Navigate to="/login" replace={true} />;
  }

  //FORM VALIDATION ON FRONTEND
  const validate = (values) => {
    const errors = {};

    if (!values.courseName) {
      errors.courseName = "Course Name is required!!";
    }

    if (!values.courseDuration) {
      errors.courseDuration = "Course Duration is required!!";
    }

    if (!values.courseDuration) {
      errors.courseDuration = "Course Duration is required!!";
    }

    if (!values.price) {
      errors.price = "Price is required!!";
    }

    if (!values.curriculum) {
      errors.courseDuration = "Course Cirriculum is required!!";
    }
    console.log("errors: ", errors);

    return errors;
  };

  return (
    <div className="admincourses-page-background-img">
      <main className="admincourses-form-signin text-center mr-auto">
        <form onSubmit={handleSubmit}>
          <img
            className="mb-4 "
            src={logo}
            alt="Digital Lync Logo"
            width={200}
            height={70}
          />
          {/* <h1 className="h3 mb-3 fw-normal text-secondary">Welcome</h1> */}

          {errorMessage ? (
            <div className="text-danger">Invalid Request !!</div>
          ) : (
            <></>
          )}

          <p className="text-warning">{formErrors.courseName}</p>

          {/* <p className="text-warning">{formErrors.password}</p> */}

          <div className="form-floating mt-2">
            <input
              type="text"
              className="form-control"
              id="courseName"
              placeholder="Add Course Name"
              name="courseName"
              value={formValues.courseName}
              onChange={handleChange}
            />

            <label for="courseName">Add Course Name</label>
          </div>
          <p className="text-warning">{formErrors.courseDuration}</p>
          <div className="form-floating mt-2">
            <input
              type="number"
              className="form-control"
              id="courseDuration"
              placeholder="Add Course Duration"
              name="courseDuration"
              value={formValues.courseDuration}
              onChange={handleChange}
            />

            <label for="courseDuration">Add Course Duration</label>
          </div>
          {/* <Link to="/courselist/courseaccordion">
            <p className="text-start mt-2 fw-bold">Course Currculum</p>
          </Link> */}
          {/* {topicIds.map((topicId) => (
            <div className="form-floating mt-2 cirrculumInput d-flex">
              <input
                type="text"
                className="form-control"
                id="addCurrculum"
                placeholder="Add Cirruculum"
                name={`curriculum-${topicId}`}
                key={topicId}
                value={formValues.curriculum[topicId]}
                onChange={handleChange}
              />

              <label for="addCurrculum">Add Topic</label>
              <button className="cirrculumButton" onClick={handleTopicAdd}>
                +
              </button>
            </div>
          ))} */}
          <p className="text-warning">{formErrors.price}</p>
          <div className="form-floating mt-2">
            <input
              type="number"
              className="form-control"
              id="addCoursePrice"
              placeholder="Add Course Price"
              name="price"
              value={formValues.price}
              onChange={handleChange}
            />

            <label for="addCoursePrice">Add Course Price</label>
          </div>

          <button
            className="adminCourseButton btn btn-primary mt-3"
            type="submit"
          >
            Submit
          </button>
          {userRole === "superadmin" ? (
            <Link className="text-decoration-none" to="/admindashboard">
              <p className="mt-3">Return to Dashboard</p>
            </Link>
          ) : (
            <Link className="text-decoration-none" to="/admin2dashboard">
              <p className="mt-3">Return to Dashboard</p>
            </Link>
          )}
        </form>
      </main>
    </div>
  );
};

export default AdminCourses;
