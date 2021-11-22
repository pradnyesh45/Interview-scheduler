import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

function NavbarComponent() {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Navbar
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/addPerson">
              AddPerson
            </Nav.Link>
            <Nav.Link as={Link} to="/scheduleInterview">
              ScheduleInterview
            </Nav.Link>
            <Nav.Link as={Link} to="/interviewList">
              InterviewList
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
