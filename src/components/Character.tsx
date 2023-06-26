import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CharacterData } from "../types";

interface CharacterProps {
  character: CharacterData;
}

function Character({ character }: CharacterProps) {
  let statusColor = "";

  if (character.status === "Alive") {
    statusColor = "green";
  } else if (character.status === "Dead") {
    statusColor = "red";
  } else {
    statusColor = "lightgray";
  }

  return (
    <Card className="my-3 py-3">
      <Link to={`/character/${character.id}`}>
        <Card.Img src={character.image} />
      </Link>
      <Card.Body>
        <Link to={`/character/${character.id}`}>
          <Card.Title as="div">
            <strong>{character.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text>{character.species}</Card.Text>
        <Card.Text style={{ color: statusColor }}>{character.status}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Character;
