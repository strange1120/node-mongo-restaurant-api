import React, { useState } from "react";
import { Row, FormGroup, Form, Label, Input, Button, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import RestaurantDataService from "../services/RestaurantService";

const SearchForm = () => {
  const [nameChecked, setNameChecked] = useState(false);
  const [boroughChecked, setBoroughChecked] = useState(false);
  const [restaurantIdChecked, setRestaurantIdChecked] = useState(false);
  const [cuisineChecked, setCuisineChecked] = useState(false);
  let [fieldCount, setFieldCount] = useState(0);

  const { register, handleSubmit } = useForm();

  const onSubmit = (values) => {
    findByTitle(values.restaurantId);
  };

  const findByTitle = (id) => {
    RestaurantDataService.get(id)
      .then((response) => {
        // setTutorials(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
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
                <Label for="restaurantId">Restaurant ID</Label>
                <Input
                  name="restaurantId"
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
        </Col>
      </Row>
    </>
  );
};

export default SearchForm;
