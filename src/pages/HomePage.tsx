import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Character from "../components/Character";
import { CharacterData } from "../types";

function HomePage() {
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  const fetchAllCharacters = async () => {
    try {
      let page = 1;
      let fetchedCharacters: CharacterData[] = [];

      while (true) {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );

        const data = await response.json();

        if (data.results) {
          const charactersOnPage: CharacterData[] = data.results.map(
            (result: any) => ({
              id: result.id,
              name: result.name,
              image: result.image,
              species: result.species,
              status: result.status,
            })
          );
          fetchedCharacters = fetchedCharacters.concat(charactersOnPage);
        }

        if (data.info && data.info.next) {
          // Continue to next page if available
          page++;
        } else {
          // Break the loop if there are no more pages
          break;
        }
      }

      setCharacters(fetchedCharacters);
    } catch (error) {
      console.log("Error fetching characters:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder="Search characters..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Form.Group>
      <Row>
        {filteredCharacters.map((character) => (
          <Col sm={12} md={6} lg={4} xl={3} key={character.id}>
            <Character character={character} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
