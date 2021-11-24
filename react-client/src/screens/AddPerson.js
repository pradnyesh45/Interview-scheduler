import React, { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
const SERVER_URL = "http://localhost:5000";
toast.info("Add a Candidate or an Interviewer");
// require("dotenv").config();
// import { Form } from "react-bootstrap";
// import { Form, Button } from "react-bootstrap";
dotenv.config();
const initialState = {
  name: "",
  email: "",
  role: "",
};

function AddPerson() {
  const [newPerson, setNewPerson] = useState(initialState);

  useEffect(() => {}, [newPerson]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // console.log("e.target", e.target.id);

    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleOnRole = (e) => {
    const { name, id } = e.target;
    setNewPerson({ ...newPerson, [name]: id });
  };
  console.log("newPerson", newPerson);
  // console.log("env", REACT_APP_SERVER_URL);
  const createPerson = async (e) => {
    e.preventDefault();
    // console.log("Inside create person");
    try {
      const response = await axios.post(`${SERVER_URL}/createPerson`, {
        name: newPerson.name,
        email: newPerson.email,
        role: newPerson.role,
      });
      if (response) {
        toast.success("A Person is added");
      } else {
        toast.error("Error in creating Person");
      }
      // console.log(response);
      // newPerson = initialState;
    } catch (error) {
      toast.error("Please fill the information completely and correctly");
    }
  };

  return (
    <div>
      <Container>
        <Form onSubmit={createPerson}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name of Person</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              value={newPerson.name}
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={newPerson.email}
              onChange={handleOnChange}
            />
          </Form.Group>

          {["radio"].map((type) => (
            <div
              key={`inline-${type}`}
              className="mb-3"
              name="role"
              value={newPerson.role}
              onChange={handleOnRole}
            >
              <Form.Check
                inline
                label="Candidate"
                name="role"
                type={type}
                id="Candidate"
              />
              <Form.Check
                inline
                label="Interviewer"
                name="role"
                type={type}
                id="Interviewer"
              />
            </div>
          ))}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddPerson;
