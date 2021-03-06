import React, { useState } from "react";
import { Navbar, NavbarText, Button, Row, Col } from "reactstrap";
import SearchForm from "./SearchForm";
import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";

const Landing = () => {
  const [searchForm, setSearchForm] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);

  const reset = () => {
    setSearchForm(false);
    setAddForm(false);
    setDeleteForm(false);
  };

  const toggleSearchForm = () => {
    reset();
    setSearchForm(true);
  };

  const toggleAddForm = () => {
    reset();
    setAddForm(true);
  };

  const toggleDeleteForm = () => {
    reset();
    setDeleteForm(true);
  };

  return (
    <>
      <Navbar color="primary">
        <NavbarText>
          <h4>Manage Restaurants</h4>
        </NavbarText>
      </Navbar>
      <Row className="d-flex justify-content-center mt-3">
        <Col md="6" className="d-flex justify-content-around">
          <Button onClick={() => toggleSearchForm()}>Search</Button>
          <Button onClick={() => toggleAddForm()}>Add</Button>
          <Button onClick={() => toggleDeleteForm()}>Delete</Button>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-3">
        <Col md="8">
          {searchForm ? <SearchForm reset={reset} /> : null}
          {addForm ? <AddForm reset={reset} /> : null}
          {deleteForm ? <DeleteForm reset={reset} /> : null}
        </Col>
      </Row>
    </>
  );
};

export default Landing;
