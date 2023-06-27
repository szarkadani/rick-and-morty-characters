import React from "react";
import { Form, Col } from "react-bootstrap";

interface ViewTypeSwitchesProps {
  viewType: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ViewTypeSwitches({ viewType, onChange }: ViewTypeSwitchesProps) {
  return (
    <Col>
      <Form.Check
        inline
        type="switch"
        id="table-view"
        label="Table View"
        value="table"
        checked={viewType === "table"}
        onChange={onChange}
      />
      <Form.Check
        inline
        type="switch"
        id="card-view"
        label="Card View"
        value="card"
        checked={viewType === "card"}
        onChange={onChange}
      />
    </Col>
  );
}

export default ViewTypeSwitches;
