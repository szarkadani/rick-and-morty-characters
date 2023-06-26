import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: "110px",
        width: "110px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only"></span>
    </Spinner>
  );
}

export default Loading;
