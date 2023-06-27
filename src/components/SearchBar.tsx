import React from "react";
import { Form } from "react-bootstrap";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <header className="header">
      <div className="search-container">
        <Form.Group controlId="search" className="mb-0">
          <Form.Control
            type="text"
            placeholder="Search characters by name..."
            value={value}
            onChange={onChange}
            className="rounded-pill"
          />
        </Form.Group>
      </div>
    </header>
  );
}

export default SearchBar;
