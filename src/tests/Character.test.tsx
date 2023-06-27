import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Character from "../components/Character";

const mockCharacter = {
  id: 1,
  name: "Test Character",
  species: "Human",
  status: "Alive",
  image: "test-image-url",
  type: "Main Character",
  gender: "Male",
  origin: { name: "Earth", url: "https://example.com/earth" },
  location: { name: "Mars", url: "https://example.com/mars" },
  episode: ["https://example.com/episode1"],
};

describe("Character component", () => {
  it("renders character details correctly", () => {
    render(
      <Router>
        <Character character={mockCharacter} />
      </Router>
    );

    const characterName = screen.getByText("Test Character");
    const characterSpecies = screen.getByText("Human");
    const characterStatus = screen.getByText("Alive");

    expect(characterName).toBeInTheDocument();
    expect(characterSpecies).toBeInTheDocument();
    expect(characterStatus).toBeInTheDocument();
  });

  it("renders the character image with the correct source", () => {
    render(
      <Router>
        <Character character={mockCharacter} />
      </Router>
    );

    const characterImage = screen.getByRole("img");
    expect(characterImage).toBeInTheDocument();
    expect(characterImage).toHaveAttribute("src", "test-image-url");
  });
});
