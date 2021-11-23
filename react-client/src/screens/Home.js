import React from "react";
import { Accordion } from "react-bootstrap";

function Home() {
  return (
    <div>
      <h1>Pradnyesh Aglawe Welcomes you to Interview-Scheduler</h1>
      <p>Click on the links on Navbar to navigate</p>

      <Accordion defaultActiveKey="">
        <Accordion.Item eventKey="0">
          <Accordion.Header>AddPerson</Accordion.Header>
          <Accordion.Body>
            To add an interviewer or candidate to the database.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>ScheduleInterview</Accordion.Header>
          <Accordion.Body>
            To schedule an interview between interviewer and candidate.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>InterviewList</Accordion.Header>
          <Accordion.Body>To view the scheduled interviews</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Home;
