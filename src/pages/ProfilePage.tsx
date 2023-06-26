import { Card, Badge, Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { CharacterData } from "../types";
import { getStatusColor } from "../utils";
import Loading from "../components/Loading";
import { useAppSelector } from "../hooks";

function ProfilePage() {
  const { id } = useParams<{ id?: string }>();
  const { characters } = useAppSelector((state) => state.characters);
  const character: CharacterData | undefined = characters.find(
    (char: CharacterData) => char.id === parseInt(id || "")
  );

  if (!character) {
    return <Loading />;
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
    <Container>
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
    </Container>
  );
}

export default ProfilePage;
