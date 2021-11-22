import React from "react";
import { InputGroup, FormControl, Container, Row, Col } from "react-bootstrap";

function PersonInput() {
  return (
    <div>
      <Row>
        <Col>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">Name</InputGroup.Text>
            <FormControl
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
        </Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </div>
  );
}

export default PersonInput;
