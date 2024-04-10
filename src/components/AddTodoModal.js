import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
const AddTodoModal = ({
  show,
  onHide,
  date,
  title,
  setTitle,
  setDate,
  createTaskAction,
}) => {
  const handleAddTodo = () => {
    createTaskAction();
  };

  const today = new Date().toISOString().split('T')[0]

 

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              defaultValue={today}
              min={today}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddTodo}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTodoModal;
