import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";
import "../bootstrap.min (1).css";
import { toast } from "react-toastify";
// import "../../node_modules/bootstrap/dist/css/bootstrap.css";
const SERVER_URL = "http://localhost:5000";

toast.info("Update the scheduled interview");

const initialState = {
  Candidate: "",
  Interviewer: "",
  startTime: "",
  endTime: "",
};

function UpdateInterview() {
  const { id } = useParams();
  console.log("id", id);
  // const [newInterview, setNewInterview] = useState(initialState);
  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log("e.target", e.target);

  //   // setNewInterview({ ...newInterview, [name]: value });
  // };

  // const [persons, setPersons] = useState([]);
  let [candidate, setCandidate] = useState({});
  let [interviewer, setInterviewer] = useState({});
  let [interview, setInterview] = useState({});
  let [startTime, setStartTime] = useState("");
  let [endTime, setEndTime] = useState("");
  useEffect(() => {
    console.log("inside use effect");
    axios
      .get(`${SERVER_URL}/getInterviewById/${id}`)
      .then((response) => {
        setInterview(response.data);
        console.log("response.data", response.data);
        console.log("inside axios");
        // let personArray = response.data.personArray;
        // console.log("personArray", personArray);
        setCandidate(response.data.response.Candidate);
        setInterviewer(response.data.response.Interviewer);
        setStartTime(response.data.response.startTime);
        setEndTime(response.data.response.endTime);
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
  // console.log(newInterview);
  // console.log("persons", persons);
  console.log("candidates", candidate);
  console.log("interviewers", interviewer);
  // console.log("persons.personMap", persons.personMap);
  // persons.personMap.forEach((element, key) => {
  //   console.log(key, "=", element);
  // });
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${SERVER_URL}/updateInterview`, {
        Candidate: candidate,
        Interviewer: interviewer,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        // id: id,
        if(response) {
          toast.success("Updation was successfull");
        },
      });
    } catch (error) {
      toast.error("Updation was unsuccessful");
    }

    // console.log("response", response);
    // newInterview = initialState;
  };

  return (
    <div>
      <Container>
        <Form onSubmit={handleOnSubmit}>
          <Form.Select aria-label="Default select example" name="Candidate">
            {/* <option>Select a candidate</option> */}
            <option value={candidate._id}>{candidate.name}</option>
            {/* {candidate.map((element, index) => {
              return (
                <option value={element._id} key={element._id}>
                  {element.name}
                </option>
              );
            })} */}
          </Form.Select>

          <Form.Select aria-label="Default select example" name="Interviewer">
            <option value={interviewer._id}>{interviewer.name}</option>
            {/* <option>Select an Interviewer</option> */}
            {/* {interviewer.map((element, index) => {
              return (
                <option value={element._id} key={element._id}>
                  {element.name}
                </option>
              );
            })} */}
          </Form.Select>

          <label for="startTime">Start Time for Interview:</label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={moment(startTime).format("yyyy-MM-DThh:mm")}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <br />
          <br />
          <label for="endTime">End Time for Interview:</label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={moment(endTime).format("yyyy-MM-DThh:mm")}
            onChange={(e) => setEndTime(e.target.value)}
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
