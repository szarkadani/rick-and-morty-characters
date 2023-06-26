import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CharacterData } from "../types";

function ProfilePage() {
  const { id } = useParams();

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Card className="my-3 py-3">
        <Card.Text>{id}</Card.Text>
      </Card>
    </div>
  );
}

export default ProfilePage;
