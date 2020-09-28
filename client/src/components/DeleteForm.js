import React from "react";
import PropTypes from "prop-types";
import { Row, FormGroup, Form, Label, Input, Button, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import RestaurantDataService from "../services/RestaurantService";

const DeleteForm = ({ reset }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    let restaurant;
    await RestaurantDataService.get(values.restaurant_id)
      .then((response) => {
        restaurant = response.data[0];
      })
      .catch((e) => {
        console.log(e);
      });

    if (restaurant !== undefined) {
      restaurant.deleted = true;

      await RestaurantDataService.update(restaurant.id, restaurant)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    reset();
  };

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md="8">
          <h3>Enter a Restaurant ID to Delete</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="restaurant_id">Restaurant ID</Label>
              <Input
                name="restaurant_id"
                placeholder="Restaurant ID"
                innerRef={register}
              />
            </FormGroup>
            <Button type="submit">Search</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

DeleteForm.propTypes = {
  reset: PropTypes.func,
};

export default DeleteForm;
