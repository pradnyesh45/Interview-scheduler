import React from "react";
import {
  DropdownButton,
  Dropdown,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { DateTime } from "react-datetime-bootstrap";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import "../bootstrap.min (1).css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.css";

function ScheduleInterview() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <DropdownButton id="dropdown-basic-button" title="Select Candidate">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col>
            <DropdownButton
              id="dropdown-basic-button"
              title="Select Interivewer"
            >
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </Col>
          {/* <Col>
            <input
              type="datetime-local"
              id="birthdaytime"
              name="birthdaytime"
            ></input>
          </Col> */}
          <Col>
            <h4>Pick Date: </h4>
            <DateTime pickerOptions={{ format: "LL" }} />
          </Col>
          <Col>
            <h4>Pick start time: </h4>
            <DateTime pickerOptions={{ format: "LTS" }} />
          </Col>
          <Col>
            <h4>Pick end time: </h4>
            <DateTime pickerOptions={{ format: "LTS" }} />
          </Col>
        </Row>
        <Row>
          <Button>Submit</Button>
        </Row>
      </Container>
    </div>
  );
}

export default ScheduleInterview;
