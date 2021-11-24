import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
const SERVER_URL = "http://localhost:5000";

function InterviewList() {
  let [Interviews, setInteriviews] = useState([]);
  useEffect(() => {
    console.log("inside use effect");
    axios
      .get(`${SERVER_URL}/allInterviews`)
      .then((response) => {
        console.log("response.data", response.data);
        console.log("inside axios");
        let interviewArray = response.data.interviewArray;
        console.log("interviewArray", interviewArray);
        setInteriviews(() => interviewArray);
        // interviewArray.map((item) => {
        //   console.log("item", item);
        //   Interviews.push(item);
        // });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Interviews._id]);

  console.log("Interviews", Interviews);

  const handleEditClick = async () => {
    const response = await axios.post(`${SERVER_URL}`, {});
  };

  const handleDeleteClick = () => {};

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Candidate Name</th>
            <th>Interviewer Name</th>
            <th>StartTime</th>
            <th>EndTime</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Interviews.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.Candidate}</td>
                <td>{item.Interviewer}</td>
                <td>{item.startTime}</td>
                <td>{item.endTime}</td>
                <td>
                  <Button variant="primary" as={Link} to="/updateInterview">
                    Update
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={handleDeleteClick}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default InterviewList;
