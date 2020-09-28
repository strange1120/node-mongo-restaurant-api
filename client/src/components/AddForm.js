import React from "react";
import PropTypes from "prop-types";
import { Row, FormGroup, Form, Label, Input, Button, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import RestaurantDataService from "../services/RestaurantService";
import Grades from "./Grades";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  restaurant_id: yup.string().required(),
  address: yup.object().shape({
    building: yup.string().required(),
    street: yup.string().required(),
    latitude: yup.number().required(),
    longitude: yup.number().required(),
    zipCode: yup.string().required(),
  }),
  cuisine: yup.string().required(),
  borough: yup.string().required(),
  grades: yup.array().of(
    yup.object().shape({
      date: yup.string().required(),
      score: yup.number().required().positive(),
      grade: yup.string().required(),
    })
  ),
});

const AddForm = ({ reset }) => {
  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      grades: [{ date: "", score: 1, grade: "" }],
    },
  });

  const onSubmit = async (values) => {
    values.address = {
      ...values.address,
      coord: [values.address.latitude, values.address.longitude],
    };

    delete values.address.latitude;
    delete values.address.longitude;

    let restaurant;
    await RestaurantDataService.get(values.restaurant_id)
      .then((response) => {
        restaurant = response.data[0];
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    if (restaurant !== undefined) {
      await RestaurantDataService.update(restaurant.id, values)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      values = { ...values, deleted: false };
      await RestaurantDataService.create(values)
        .then((response) => {
          // setTutorials(response.data);
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
          <h3>Add a Restaurant</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input name="name" placeholder="Name" innerRef={register} />
            </FormGroup>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="street">Street</Label>
                  <Input
                    name="address.street"
                    placeholder="Street"
                    innerRef={register}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="restaurant_id">Restaurant ID</Label>
                  <Input
                    name="restaurant_id"
                    placeholder="Restaurant ID"
                    innerRef={register}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label for="latitude">Latitude</Label>
                  <Input
                    name="address.latitude"
                    placeholder="Latitude"
                    innerRef={register}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="longitude">Longitude</Label>
                  <Input
                    name="address.longitude"
                    placeholder="Longitude"
                    innerRef={register}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="building">Building</Label>
                  <Input
                    name="address.building"
                    placeholder="Building"
                    innerRef={register}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label for="zipCode">Zip Code</Label>
                  <Input
                    name="address.zipCode"
                    placeholder="Zip Code"
                    innerRef={register}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="borough">Borough</Label>
                  <Input
                    name="borough"
                    placeholder="Borough"
                    innerRef={register}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="cuisine">Cuisine</Label>
                  <Input
                    name="cuisine"
                    placeholder="Cuisine"
                    innerRef={register}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Grades register={register} control={control} />
            <Button className="mt-3" type="submit">
              Add
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

AddForm.propTypes = {
  reset: PropTypes.func,
};

export default AddForm;
