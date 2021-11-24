import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";

import "../bootstrap.min (1).css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.css";
const SERVER_URL = "http://localhost:5000";

const initialState = {
  Candidate: "",
  Interviewer: "",
  startTime: "",
  endTime: "",
};

function UpdateInterview() {
  const [newInterview, setNewInterview] = useState(initialState);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log("e.target", e.target);

    setNewInterview({ ...newInterview, [name]: value });
  };

  const [persons, setPersons] = useState([]);
  let [candidate, setCandidate] = useState([]);
  let [interviewer, setInterviewer] = useState([]);
  useEffect(() => {
    console.log("inside use effect");
    axios
      .get(`${SERVER_URL}/allPersons`)
      .then((response) => {
        setPersons(response.data);
        console.log("response.data", response.data);
        console.log("inside axios");
        let personArray = response.data.personArray;
        console.log("personArray", personArray);
        setCandidate(
          personArray.filter((item) => {
            return item.role === "Candidate";
          })
        );
        setInterviewer(
          personArray.filter((item) => {
            return item.role === "Interviewer";
          })
        );
        // persons.personMap.forEach((element, key) => {
        //   console.log(key, "=", element);
        // });
      })
      .catch((error) => {
        console.log(error);
      });

    // person.forEach((person) => {
    // if (findCandidateById()){
    //   Candidates[person.Candidate] = person;
    // }
    // })
    // const Interviewers = {};
  }, []);
  console.log(newInterview);
  console.log("persons", persons);
  console.log("candidates", candidate);
  console.log("interviewers", interviewer);
  // console.log("persons.personMap", persons.personMap);
  // persons.personMap.forEach((element, key) => {
  //   console.log(key, "=", element);
  // });
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${SERVER_URL}/createInterview`, {
      Candidate: newInterview.Candidate,
      Interviewer: newInterview.Interviewer,
      startTime: newInterview.startTime,
      endTime: newInterview.endTime,
    });
    console.log("response", response);
    // newInterview = initialState;
  };

  return (
    <div>
      <Container>
        <Form onSubmit={handleOnSubmit}>
          <Form.Select
            aria-label="Default select example"
            name="Candidate"
            value={newInterview.Candidate}
            onChange={handleOnChange}
          >
            <option>Select a candidate</option>
            {candidate.map((element, index) => {
              return (
                <option value={element._id} key={element._id}>
                  {element.name}
                </option>
              );
            })}
          </Form.Select>

          <Form.Select
            aria-label="Default select example"
            name="Interviewer"
            value={newInterview.Interviewer}
            onChange={handleOnChange}
          >
            <option>Select an Interviewer</option>
            {interviewer.map((element, index) => {
              return (
                <option value={element._id} key={element._id}>
                  {element.name}
                </option>
              );
            })}
          </Form.Select>

          <label for="birthdaytime">Start Time for Interview:</label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={newInterview.startTime}
            onChange={handleOnChange}
          />
          <br />
          <br />
          <label for="birthdaytime">End Time for Interview:</label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={newInterview.endTime}
            onChange={handleOnChange}
          />
          <br />
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default UpdateInterview;
