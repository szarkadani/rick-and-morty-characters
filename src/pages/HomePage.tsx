import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { fetchCharacters } from "../actions/characterActions";
import Character from "../components/Character";
import { CharacterData } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks";
function HomePage() {
  const dispatch = useAppDispatch();
  const { characters } = useAppSelector((state) => state.characters);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCharacters = characters.filter((character: CharacterData) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <header className="header">
        <div className="search-container">
          <Form.Group controlId="search" className="mb-0">
            <Form.Control
              type="text"
              placeholder="Search characters..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded-pill"
            />
          </Form.Group>
        </div>
      </header>
      <div className="container py-4">
        <Row>
          {filteredCharacters.map((character: CharacterData) => (
            <Col sm={12} md={6} lg={4} xl={3} key={character.id}>
              <Character character={character} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
