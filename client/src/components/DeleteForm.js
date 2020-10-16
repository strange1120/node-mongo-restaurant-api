import React, { useState } from "react";
import { Row, FormGroup, Form, Label, Input, Button, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import RestaurantDataService from "../services/RestaurantService";
import Restaurant from "./Restaurant";

const DeleteForm = () => {
  const { register, handleSubmit } = useForm();
  const [notFound, setNotFound] = useState(false);
  const [restaurant, setRestaurant] = useState(undefined);
  const [model, setModel] = useState({});

  const _model = {
    name: true,
    cuisine: true,
    building: true,
    latitude: true,
    longitude: true,
    street: true,
    zipcode: true,
    grades: true,
    borough: true,
    restaurant_id: true,
  };

  const search = async (values) => {
    setRestaurant(undefined);
    setNotFound(false);
    await RestaurantDataService.get(values.restaurant_id)
      .then((response) => {
        if (response.data[0]) {
          if (response.data[0].deleted === true) {
            setNotFound(true);
          } else {
            setRestaurant(response.data[0]);
            setModel(_model);
          }
        } else {
          setNotFound(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteRestaurant = async (restaurant) => {
    restaurant.deleted = true;

    await RestaurantDataService.update(restaurant.id, restaurant)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setNotFound(false);
    setRestaurant(undefined);
  };

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md="8">
          <h3>Enter a Restaurant ID to Delete</h3>
          <Form onSubmit={handleSubmit(search)}>
            <FormGroup>
              <Label for="restaurant_id">Restaurant ID</Label>
              <Input
                name="restaurant_id"
                placeholder="Restaurant ID"
                innerRef={register}
              />
            </FormGroup>
            <Button className="mb-2" type="submit">
              Search
            </Button>
          </Form>
          {restaurant ? (
            <>
              <Restaurant restaurant={restaurant} model={model} />
              <Button
                className="mt-2"
                type="button"
                onClick={() => deleteRestaurant(restaurant)}
              >
                Delete Restaurant
              </Button>
            </>
          ) : null}
          {notFound === true ? (
            <h5 className="mt-3">No restaurant found</h5>
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default DeleteForm;
