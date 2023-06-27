import React from "react";
import { Form, Col } from "react-bootstrap";

interface PageSizeSelectProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PageSizeSelect({ value, onChange }: PageSizeSelectProps) {
  return (
    <Col>
      <Form.Group controlId="viewType" className="mb-0">
        <Form.Control
          as="select"
          value={value.toString()}
          onChange={onChange}
          className="form-control-sm"
        >
          <option value="20">20 character per page</option>
          <option value="40">40 character per page</option>
          <option value="80">80 character per page</option>
        </Form.Control>
      </Form.Group>
    </Col>
  );
}

export default PageSizeSelect;
