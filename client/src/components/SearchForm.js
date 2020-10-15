import React, { useState, useEffect } from "react";
import { Row, FormGroup, Form, Label, Input, Button, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import PaginationComponent from "react-reactstrap-pagination";
import ResultList from "./ResultList";
import RestaurantDataService from "../services/RestaurantService";

const SearchForm = () => {
  const [nameChecked, setNameChecked] = useState(false);
  const [boroughChecked, setBoroughChecked] = useState(false);
  const [restaurantIdChecked, setRestaurantIdChecked] = useState(false);
  const [cuisineChecked, setCuisineChecked] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  let [fieldCount, setFieldCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = (values) => {
    setSubmitted(false);
    search(values);
    setSubmitted(true);
  };

  const search = (values) => {
    RestaurantDataService.search(values, page, 5)
      .then((response) => {
        const { totalItems, restaurants } = response.data;

        setRestaurants(restaurants);
        setTotalCount(totalItems);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (page > 1) search(getValues());
  }, [page]);

  const handlePageChange = (value) => {
    setPage(value);
  };

  const toggleName = () => {
    setNameChecked(!nameChecked);
    if (nameChecked === false) {
      setFieldCount(fieldCount + 1);
    } else {
      setFieldCount(fieldCount - 1);
    }
  };

  const toggleBorough = () => {
    setBoroughChecked(!boroughChecked);
    if (boroughChecked === false) {
      setFieldCount(fieldCount + 1);
    } else {
      setFieldCount(fieldCount - 1);
    }
  };

  const toggleRestaurantId = () => {
    setRestaurantIdChecked(!restaurantIdChecked);
    if (restaurantIdChecked === false) {
      setFieldCount(fieldCount + 1);
    } else {
      setFieldCount(fieldCount - 1);
    }
  };

  const toggleCuisine = () => {
    setCuisineChecked(!cuisineChecked);
    if (cuisineChecked === false) {
      setFieldCount(fieldCount + 1);
    } else {
      setFieldCount(fieldCount - 1);
    }
  };

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md="8">
          <h3>Select fields to search on</h3>
          <Form>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" onClick={() => toggleName()} />
                Name
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" onClick={() => toggleBorough()} />
                Borough
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" onClick={() => toggleRestaurantId()} />
                Restaurant ID
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" onClick={() => toggleCuisine()} />
                Cuisine
              </Label>
            </FormGroup>
          </Form>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {cuisineChecked ? (
              <FormGroup>
                <Label for="cuisine">Cuisine</Label>
                <Input
                  name="cuisine"
                  placeholder="Cuisine"
                  innerRef={register}
                />
              </FormGroup>
            ) : null}
            {restaurantIdChecked ? (
              <FormGroup>
                <Label for="restaurant_id">Restaurant ID</Label>
                <Input
                  name="restaurant_id"
                  placeholder="Restaurant ID"
                  innerRef={register}
                />
              </FormGroup>
            ) : null}
            {boroughChecked ? (
              <FormGroup>
                <Label for="borough">Borough</Label>
                <Input
                  name="borough"
                  placeholder="Borough"
                  innerRef={register}
                />
              </FormGroup>
            ) : null}
            {nameChecked ? (
              <FormGroup>
                <Label for="name">Name</Label>
                <Input name="name" placeholder="Name" innerRef={register} />
              </FormGroup>
            ) : null}
            {fieldCount > 0 ? <Button type="submit">Search</Button> : null}
          </Form>
          {submitted === true ? (
            restaurants.length > 0 ? (
              <>
                <ResultList className="mt-2" restaurants={restaurants} />
                <PaginationComponent
                  pageSize={5}
                  onSelect={handlePageChange}
                  totalItems={totalCount}
                />
              </>
            ) : (
              <h5 className="mt-2">No results found</h5>
            )
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default SearchForm;
