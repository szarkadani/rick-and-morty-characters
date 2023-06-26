import { Card, Badge, Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { getStatusColor } from "../utils";
import Loading from "../components/Loading";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchCharacterById } from "../actions/characterActions";

function ProfilePage() {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();
  const character = useAppSelector((state) => state.character.character);
  const loading = useAppSelector((state) => state.character.loading);

  useEffect(() => {
    dispatch(fetchCharacterById(parseInt(id || "")));
  }, [dispatch, id]);

  if (loading) {
    return <Loading />;
  }

  if (!character) {
    return <div>Character not found.</div>;
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
                {episode.map((ep: string) => (
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
