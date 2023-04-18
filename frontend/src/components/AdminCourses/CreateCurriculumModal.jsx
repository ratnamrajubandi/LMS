import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function CreateCurriculumModal({
  show,
  handleClose,
  handleSave,
}) {
  const [topicName, setTopicName] = useState("");
  const [topicNotes, setTopicNotes] = useState("");

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add New Topic</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Topic Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Today's topic"
              autoFocus
              onChange={(ev) => {
                setTopicName(ev.target.value);
              }}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
            onChange={(ev) => {
              setTopicNotes(ev.target.value);
            }}
          >
            <Form.Label>Topic Notes</Form.Label>
            <Form.Control as="textarea" rows={10} />
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
            handleSave({
              topicName,
              topicNotes,
            });
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
