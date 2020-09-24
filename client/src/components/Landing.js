import React, { useState } from "react";
import { Navbar, NavbarText, Button, Row, Col } from "reactstrap";
import SearchForm from "./SearchForm";

const Landing = () => {
  const [searchForm, setSearchForm] = useState(false);
 

  return (
    <>
      {/* <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="teal.500"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
            Manage Restaurants
          </Heading>
        </Flex>
      </Flex>

      <Flex justify="center">
        <Flex as="container" justify="space-around" w="50%">
          <Button as="button" onClick={() => setSearchForm(true)}>
            Search
          </Button>
          <Box as="button">Add</Box>
          <Box as="button">Delete</Box>
        </Flex>
      </Flex> */}
      <Navbar color="primary">
        <NavbarText>
          <h4>Manage Restaurants</h4>
        </NavbarText>
      </Navbar>
      <Row className="d-flex justify-content-center mt-3">
        <Col md="6" className="d-flex justify-content-around">
          <Button onClick={() => setSearchForm(true)}>Search</Button>
          <Button>Add</Button>
          <Button>Delete</Button>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-3">
        <Col md="8">{searchForm ? <SearchForm /> : null}</Col>
      </Row>
    </>
  );
};

export default Landing;
