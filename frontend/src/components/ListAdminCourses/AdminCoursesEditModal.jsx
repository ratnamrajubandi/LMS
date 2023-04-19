import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function AdminCoursesEditModal({
  show,
  course,
  handleClose,
  handleSave,
}) {
  const [formValues, setFormValues] = useState({
    courseName: course.courseName,
    duration: course.duration,
    price: course?.price,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Edit Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              onChange={handleChange}
              defaultValue={course?.courseName || ""}
              name="courseName"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Course Duration</Form.Label>
            <Form.Control
              type="number"
              autoFocus
              onChange={handleChange}
              defaultValue={course?.duration}
              name="duration"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Course Price</Form.Label>
            <Form.Control
              type="number"
              autoFocus
              onChange={handleChange}
              name="price"
              defaultValue={course?.price}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleSave({ id: course._id, ...formValues });
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
