import React, { useEffect } from "react";
import Grades from "./Grades";
import { yupResolver } from "@hookform/resolvers";
import { Row, FormGroup, Form, Label, Input, Button, Col } from "reactstrap";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import RestaurantDataService from "../services/RestaurantService";

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

const defaultValues = {
  name: "",
  restaurant_id: "",
  address: {
    building: "",
    street: "",
    latitude: 1,
    longitude: 1,
    zipCode: "",
  },
  cuisine: "",
  borough: "",
  grades: [{ date: "", score: 1, grade: "" }],
};

const AddFormBody = ({ restaurant, setRestaurant }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const watchAllFields = methods.watch();

  useEffect(() => {
    if (restaurant === undefined) {
      methods.setValue("name", defaultValues.name);
      methods.setValue("address.building", defaultValues.address.building);
      methods.setValue("address.street", defaultValues.address.street);
      methods.setValue("address.latitude", defaultValues.address.latitude);
      methods.setValue("address.longitude", defaultValues.address.longitude);
      methods.setValue("address.zipCode", defaultValues.address.zipCode);
      methods.setValue("restaurant_id", defaultValues.restaurant_id);
      methods.setValue("cuisine", defaultValues.cuisine);
      methods.setValue("borough", defaultValues.borough);
      methods.setValue("grades", defaultValues.grades);
    } else {
      methods.setValue("name", restaurant.name);
      methods.setValue("address.building", restaurant.address.building);
      methods.setValue("address.street", restaurant.address.street);
      methods.setValue("address.latitude", restaurant.address.coord[0]);
      methods.setValue("address.longitude", restaurant.address.coord[1]);
      methods.setValue("address.zipCode", restaurant.address.zipCode);
      methods.setValue("restaurant_id", restaurant.restaurant_id);
      methods.setValue("cuisine", restaurant.cuisine);
      methods.setValue("borough", restaurant.borough);
      methods.setValue("grades", restaurant.grades);
    }
  }, [restaurant]);

  const onSubmit = async (values) => {
    values.address.coord = [values.address.latitude, values.address.longitude];

    delete values.address.latitude;
    delete values.address.longitude;

    if (restaurant !== undefined) {
      await RestaurantDataService.update(restaurant.id, values)
        .then((response) => {
          console.log(response.data);
          setRestaurant(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      values = { ...values, deleted: false };
      await RestaurantDataService.create(values)
        .then((response) => {
          console.log(response.data);
          setRestaurant(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    methods.reset();
  };

  return (
    <>
      {watchAllFields && (
        <FormProvider {...methods}>
          <Row className="d-flex justify-content-center">
            <Col md="8">
              <h3>Add a Restaurant</h3>
              <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    name="name"
                    placeholder="Name"
                    innerRef={methods.register}
                  />
                </FormGroup>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="street">Street</Label>
                      <Input
                        name="address.street"
                        placeholder="Street"
                        innerRef={methods.register}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="restaurant_id">Restaurant ID</Label>
                      <Input
                        name="restaurant_id"
                        placeholder="Restaurant ID"
                        innerRef={methods.register}
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
                        innerRef={methods.register}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label for="longitude">Longitude</Label>
                      <Input
                        name="address.longitude"
                        placeholder="Longitude"
                        innerRef={methods.register}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label for="building">Building</Label>
                      <Input
                        name="address.building"
                        placeholder="Building"
                        innerRef={methods.register}
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
                        innerRef={methods.register}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label for="borough">Borough</Label>
                      <Input
                        name="borough"
                        placeholder="Borough"
                        innerRef={methods.register}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label for="cuisine">Cuisine</Label>
                      <Input
                        name="cuisine"
                        placeholder="Cuisine"
                        innerRef={methods.register}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Grades />
                <Button className="mt-3" type="submit">
                  Add
                </Button>
              </Form>
            </Col>
          </Row>
        </FormProvider>
      )}
    </>
  );
};

AddFormBody.propTypes = {
  restaurant: PropTypes.object,
  setRestaurant: PropTypes.func,
};

export default AddFormBody;
