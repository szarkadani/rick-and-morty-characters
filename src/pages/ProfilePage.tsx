import { Card, Badge, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CharacterData } from "../types";
import { getStatusColor } from "../utils";

function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<CharacterData | null>(null);

  useEffect(() => {
    fetchCharacter();
  }, []);

  const fetchCharacter = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const data = await response.json();
      setCharacter(data);
    } catch (error) {
      console.log("Error fetching character:", error);
    }
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  const {
    name,
    status,
    species,
    type,
    gender,
    origin,
    location,
    image,
    episode,
  } = character;

  const statusColor = getStatusColor(status);

  return (
    <div>
      <Card className="my-3 py-3">
        <Row>
          <Col sm={12} md={4}>
            <Card.Img src={image} />
          </Col>
          <Col sm={12} md={8}>
            <Card.Body>
              <Card.Title as="h2" className="mb-3">
                {name}
              </Card.Title>
              <Card.Text>
                <strong>Status:</strong>{" "}
                <span style={{ color: statusColor }}>{status}</span>
              </Card.Text>
              <Card.Text>
                <strong>Species:</strong> {species}
              </Card.Text>
              <Card.Text>
                <strong>Type:</strong> {type || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Gender:</strong> {gender}
              </Card.Text>
              <Card.Text>
                <strong>Origin:</strong> {origin.name}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {location.name}
              </Card.Text>
              <Card.Text>
                <strong>Episodes:</strong>{" "}
                {episode.map((ep) => (
                  <Badge key={ep} className="mr-1">
                    Episode {ep.split("/").pop()}
                  </Badge>
                ))}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
    </div>
  );
}

export default ProfilePage;
