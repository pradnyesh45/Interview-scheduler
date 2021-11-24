import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
const SERVER_URL = "http://localhost:5000";

function InterviewList() {
  // let CandidateNames = [];
  // let InterviewerNames = [];
  let [Interviews, setInteriviews] = useState([]);
  let [reload, setReload] = useState(false);
  useEffect(() => {
    // console.log("inside use effect");
    axios
      .get(`${SERVER_URL}/allInterviews`)
      .then((response) => {
        // console.log("response", response);
        // console.log("inside axios");
        let interviewArray = response.data.interviewArray;
        // console.log("interviewArray", interviewArray);
        setInteriviews(() => interviewArray);
        // toast.success("Interview Timings Loaded");
        // interviewArray.map((item) => {
        //   console.log("item", item);
        //   Interviews.push(item);
        // });
        toast.info("Interview Schedule Loaded");
      })
      .catch((error) => {
        toast.error("Error in fetching interviews");
        console.log(error);
      });
  }, [Interviews._id, reload]);

  // console.log("Interviews", Interviews);

  const handleEditClick = async () => {
    const response = await axios.post(`${SERVER_URL}`);
  };

  const handleDeleteClick = async (id) => {
    // toast.success("Deleted Sucessfully");
    // console.log("id", id);
    try {
      const response = await axios.delete(
        `${SERVER_URL}/deleteInterview/${id}`
      );
      console.log(response);

      if (response.status === 200) {
        toast.success("Deleted Successfully");
        setReload((state) => !state);
      }
    } catch (error) {
      toast.error("Delete unsuccessful");
      console.log(error);
    }
  };

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
                <td>{item.Candidate.name}</td>
                <td>{item.Interviewer.name}</td>
                <td>
                  {moment(item.startTime).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td>
                  {moment(item.endTime).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td>
                  {/* <Link to={pathname: "/updateInterview", state: {}} /> */}
                  {/* <Link
                    to={{
                      pathname: "/updateInterview",
                      state: {
                        Candidate: item.Candidate,
                        Interview: item.Interview,
                        startTime: item.startTime,
                        endTime: item.endTime,
                        id: item._id,
                      },
                    }}
                  >
                    <Button variant="primary">Update</Button>
                  </Link> */}
                  <Button
                    variant="primary"
                    as={Link}
                    to={`/updateInterview/${item._id}`}
                  >
                    Update
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(item._id)}
                  >
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
