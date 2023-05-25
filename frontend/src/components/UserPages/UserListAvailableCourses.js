import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import { DoubleRightOutlined } from "@ant-design/icons";

import Accordion from "react-bootstrap/Accordion";

import { Link } from "react-router-dom";

import "./UserListAvailableCourses.css";
import logo from "../../assets/logo.png";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { listUserAvailableCourses } from "./UserListAvailableCourses.actions";

const UserListAvailableCourses = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setCurrentCurriculum([]);
    setShow(false);
  };
  const handleShow = (curriculum) => {
    setCurrentCurriculum(curriculum);
    setShow(true);
  };
  const [currentCurriculum, setCurrentCurriculum] = useState([]);
  ////////////////////
  const email = useSelector((state) => {
    console.log("state: ", state);
    return state.login.email;
  });
  console.log("email: ", email);
  const listAvailableCourses = useSelector(
    (state) => state.adminCourses.courses
  );

  console.log("What I want", listAvailableCourses);

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
      email,
      ordered_course: course.courseID,
    });

    const options = {
      key,
      amount: order.price,
      currency: "INR",
      name: "DigitalLync",
      description: "Test Transaction",
      image: { logo },
      order_id: order.id,

      user_email: email,
      redirect: false,
      callback_url: "http://localhost:4001/api/paymentverification",
      prefill: {
        name: "Ratnam Raju Bandi",
        email: "ratnamraju.bandi@gmail.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",

        email,
        ordered_course: course.courseID,
        price: course.price,
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
                      <>
                        <Button
                          variant="primary"
                          onClick={() => {
                            handleShow(course?.curriculum);
                          }}
                        >
                          View Curriculum
                        </Button>
                        {show ? (
                          <CurriculumModal
                            curriculum={currentCurriculum}
                            handleClose={handleClose}
                            show={show}
                          />
                        ) : (
                          <></>
                        )}
                      </>
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

const CurriculumModal = ({ curriculum, handleClose, show }) => {
  console.log("oye:", curriculum.name);
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    // <Modal className="bg-body-secondary" show={show} onHide={handleClose}>
    //   <Modal.Header
    //     closeButton
    //     className="border-3 border-primary  rounded shadow-sm"
    //   >
    //     <Modal.Title className=" fw-bolder">Curriculum</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     {curriculum.map((curriculumItem, index) => {
    //       return (
    //         <div>
    //           <p
    //             key={curriculumItem.id}
    //             className="pl-2 pr-2 pt-2 pb-2 mt-2 mb-2 text-success fw-bold border border-secondary-subtle"
    //           >
    //             {` ${index + 1}. ${curriculumItem.name}`}
    //           </p>
    //         </div>
    //       );
    //     })}
    //   </Modal.Body>
    //   <Modal.Footer className="bg-">
    //     <Button variant="danger" onClick={handleClose}>
    //       Close
    //     </Button>
    //   </Modal.Footer>
    // </Modal>

    ////////////////////////

    <Modal
      className=""
      contentClassName="custom-modal-style"
      // fade
      modal
      role="dialog"
      aria-modal="true"
      // id="exampleModal"
      tabindex="-1"
      // style="display:block;"
      // aria-labelledby="exampleModalLabel"
      // animation={true}
      // fullscreen

      show={show}
      onHide={handleClose}
    >
      <Modal.Header
        closeButton
        // className="border-3 border-primary rounded shadow-sm"
      >
        <Modal.Title className=" fw-bolder">Curriculum</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Accordion className="accordion-size-user" defaultActiveKey="">
          {curriculum.map((curriculumItem, index) => (
            <Accordion.Item
              className="bg-success fw-bold"
              eventKey={`${index}`}
              key={curriculumItem.id}
            >
              <Accordion.Header>
                {/* {<DoubleRightOutlined className="outlined-icon" />}{" "} */}
                {`   ${curriculumItem.name}`}{" "}
              </Accordion.Header>

              <Accordion.Body
                dangerouslySetInnerHTML={{ __html: curriculumItem.notes }}
              ></Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Modal.Body>
      {/* <Modal.Footer className="">
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default UserListAvailableCourses;
