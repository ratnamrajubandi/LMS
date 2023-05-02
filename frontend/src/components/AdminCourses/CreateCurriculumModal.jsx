import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import RichTextEditor from "./RichTextEditor";

export default function CreateCurriculumModal({
  show,
  handleClose,
  handleSave,
  edit,
  curriculum,
}) {
  const [topicName, setTopicName] = useState(
    edit && curriculum ? curriculum.name : ""
  );
  const [topicNotes, setTopicNotes] = useState(
    edit && curriculum ? curriculum.notes : ""
  );

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
              defaultValue={edit && curriculum ? curriculum.name : ""}
            />
          </Form.Group>
          {/* <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
            onChange={(ev) => {
              setTopicNotes(ev.target.value);
            }}
          >
            <Form.Label>Topic Notes</Form.Label>

            <Form.Control
              // as="textarea"
              as={"RichTextEditor"}
            />
          </Form.Group> */}
          <label>Topic Notes</label>
          <RichTextEditor
            onBlur={(content) => setTopicNotes(content)}
            value={topicNotes}
          />
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
