import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:id" element={<ProfilePage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
