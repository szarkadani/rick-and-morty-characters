import React, { useState, useEffect } from "react";
import { Row, Col, Table, Pagination, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Character from "../components/Character";
import SearchBar from "../components/SearchBar";
import PageSizeSelect from "../components/PageSizeSelect";
import ViewTypeSwitches from "../components/ViewTypeSwitches";
import Loading from "../components/Loading";
import { CharacterData } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchCharacters } from "../actions/characterActions";
import { getStatusColor } from "../utils";

function HomePage() {
  const dispatch = useAppDispatch();
  const { loading, error, characters } = useAppSelector(
    (state) => state.characters
  );

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
      {loading ? (
        <Loading />
      ) : error ? (
        <Alert variant="danger"> {error} </Alert>
      ) : (
        <div>
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
          <div className="container py-4">
            <Row>
              <PageSizeSelect
                value={charactersPerPage}
                onChange={handlePageSizeChange}
              />
              <ViewTypeSwitches
                viewType={viewType}
                onChange={handleViewTypeChange}
              />
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
      )}
    </div>
  );
}

export default HomePage;
