import React, { useState, useEffect } from "react";
import { Row, Col, Form, Pagination, Table } from "react-bootstrap";
import { fetchCharacters } from "../actions/characterActions";
import { CharacterData } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import Character from "../components/Character";
import { getStatusColor } from "../utils";

function HomePage() {
  const dispatch = useAppDispatch();
  const { characters } = useAppSelector((state) => state.characters);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(20);
  const [viewType, setViewType] = useState("table");

  useEffect(() => {
    dispatch(fetchCharacters(currentPage, charactersPerPage));
  }, [dispatch, currentPage, charactersPerPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageSize = parseInt(e.target.value);
    setCharactersPerPage(pageSize);
    setCurrentPage(1);
  };

  const handleViewTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setViewType(e.target.value);
  };

  const filteredCharacters = characters.filter((character: CharacterData) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);
  const displayedPages = 5;

  const startPage = Math.max(1, currentPage - Math.floor(displayedPages / 2));
  const endPage = Math.min(startPage + displayedPages - 1, totalPages);

  const pages = [...Array(endPage - startPage + 1)].map(
    (_, i) => startPage + i
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const goToFirstPage = () => setCurrentPage(1);

  const goToLastPage = () => setCurrentPage(totalPages);

  return (
    <div>
      <header className="header">
        <div className="search-container">
          <Form.Group controlId="search" className="mb-0">
            <Form.Control
              type="text"
              placeholder="Search characters by name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded-pill"
            />
          </Form.Group>
        </div>
      </header>
      <div className="container py-4">
        <Row>
          <Col>
            <Form.Group controlId="viewType" className="mb-0">
              <Form.Control
                as="select"
                value={charactersPerPage.toString()}
                onChange={handlePageSizeChange}
                className="form-control-sm"
              >
                <option value="20">20 character per page</option>
                <option value="40">40 character per page</option>
                <option value="80">80 character per page</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Check
              inline
              type="switch"
              id="table-view"
              label="Table View"
              value="table"
              checked={viewType === "table"}
              onChange={handleViewTypeChange}
            />
            <Form.Check
              inline
              type="switch"
              id="card-view"
              label="Card View"
              value="card"
              checked={viewType === "card"}
              onChange={handleViewTypeChange}
            />
          </Col>
        </Row>

        {viewType === "table" ? (
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Species</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentCharacters.map((character: CharacterData) => (
                <tr key={character.id}>
                  <td>
                    <img
                      src={character.image}
                      alt={character.name}
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>
                    <Link to={`/character/${character.id}`}>
                      {character.name}
                    </Link>
                  </td>
                  <td>{character.species}</td>
                  <td style={{ color: getStatusColor(character.status) }}>
                    {character.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Row>
            {currentCharacters.map((character: CharacterData) => (
              <Col sm={12} md={6} lg={4} xl={3} key={character.id}>
                <Character character={character} />
              </Col>
            ))}
          </Row>
        )}
        <Pagination className="justify-content-center mt-3">
          <Pagination.First
            onClick={goToFirstPage}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {pages.map((pageNumber) => (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={goToLastPage}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
}

export default HomePage;
