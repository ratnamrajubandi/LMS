import React, { useEffect, useState } from "react";
import "./CourseAccordion.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCurriculum, getCourseByCourseId } from "./AdminCourses.actions";
import Button from "react-bootstrap/Button";
import CreateCurriculumModal from "./CreateCurriculumModal";
import Accordion from "react-bootstrap/Accordion";
import { DoubleRightOutlined } from "@ant-design/icons";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CoursesAccordion = () => {
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getCourseByCourseId(id));
    }
  }, [id]);

  const allCourses = useSelector((state) => state.addCourses.courses);
  const currentCourse = allCourses[id];
  const curriculums = currentCourse?.curriculum;
  console.log("curriculum: ", curriculums);

  const hanldeSaveCurriculum = (topic) => {
    const { topicName, topicNotes } = topic;
    dispatch(addCurriculum(id, topicName, topicNotes));
    setShow(false);
  };
  return (
    <div className="">
      <div className="curriculum-header">
        <Button
          className="btn-success"
          variant="primary"
          onClick={() => {
            setShow(true);
          }}
        >
          Add New Topic
        </Button>
      </div>
      {show ? (
        <CreateCurriculumModal
          show={show}
          handleClose={() => {
            setShow(false);
          }}
          handleSave={hanldeSaveCurriculum}
        />
      ) : (
        <></>
      )}
      {curriculums?.length ? (
        <Accordion defaultActiveKey="0">
          {curriculums.map((curriculum, index) => (
            <Accordion.Item
              className="bg-success fw-bold"
              eventKey={`${index}`}
              key={curriculum.id}
            >
              <Accordion.Header>
                {<DoubleRightOutlined className="outlined-icon" />}{" "}
                {`   ${curriculum.name}`}{" "}
                {
                  <EditOutlined className="d-flex align-right edit-outline-icon" />
                }{" "}
                {
                  <DeleteOutlined className="d-flex flex-direction-row text-right delete-outline-icon" />
                }
              </Accordion.Header>

              <Accordion.Body>{curriculum.notes}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <></>
      )}
      <div className="text-end mt-5 p-5">
        <Link className="text-decoration-none" to="/admindashboard">
          <p>Return to Dashboard</p>
        </Link>
      </div>
    </div>
  );
};

export default CoursesAccordion;
