import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Character from "../components/Character";
import { CharacterData } from "../types";
function HomePage() {
  const [characters, setCharacters] = useState<CharacterData[]>([]);

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

  return (
    <div>
      <Row>
        {characters.map((character) => (
          <Col sm={12} md={6} lg={4} xl={3} key={character.id}>
            <Character character={character} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
