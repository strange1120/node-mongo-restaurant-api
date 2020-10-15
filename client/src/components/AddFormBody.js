import React, { useEffect } from "react";
import Grades from "./Grades";
import { yupResolver } from "@hookform/resolvers";
import { Row, FormGroup, Form, Label, Input, Button, Col } from "reactstrap";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import RestaurantDataService from "../services/RestaurantService";

const schema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  restaurant_id: yup.string().required("Restaurant ID is a required field"),
  address: yup.object().shape({
    building: yup.string().required("Building address is a required field"),
    street: yup.string().required("Street address is a required field"),
    latitude: yup.number().required("Latitude is a required field"),
    longitude: yup.number().required("Longitude is a required field"),
    zipcode: yup.string().required("ZipCode is a required field"),
  }),
  cuisine: yup.string(),
  borough: yup.string(),
  grades: yup.array().of(
    yup.object().shape({
      date: yup.string(),
      score: yup.number().positive(),
      grade: yup.string(),
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
    zipcode: "",
  },
  cuisine: "",
  borough: "",
  grades: [{ date: "", score: 1, grade: "" }],
};

const AddFormBody = ({ restaurant, submitted, setSubmitted }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const watchAllFields = methods.watch();

  useEffect(() => {
    if (restaurant !== undefined) {
      methods.setValue("name", restaurant.name);
      methods.setValue("address.building", restaurant.address.building);
      methods.setValue("address.street", restaurant.address.street);
      methods.setValue("address.latitude", restaurant.address.coord[0]);
      methods.setValue("address.longitude", restaurant.address.coord[1]);
      methods.setValue("address.zipcode", restaurant.address.zipcode);
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
      values = { ...values, deleted: false };
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
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setSubmitted(true);
  };

  if (submitted === false) {
    return (
      <>
        {watchAllFields && (
          <FormProvider {...methods}>
            <Row className="d-flex justify-content-center">
              <Col md="8">
                <h3>Add a Restaurant</h3>
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                  <FormGroup>
                    <Label for="name">Name (Required)</Label>
                    <Input
                      name="name"
                      placeholder="Name"
                      innerRef={methods.register}
                    />
                    <p className="mt-2">{methods.errors.name?.message}</p>
                  </FormGroup>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="street">Street (Required)</Label>
                        <Input
                          name="address.street"
                          placeholder="Street"
                          innerRef={methods.register}
                        />
                        <p className="mt-2">
                          {methods.errors.address?.street?.message}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="restaurant_id">
                          Restaurant ID (Required)
                        </Label>
                        <Input
                          name="restaurant_id"
                          placeholder="Restaurant ID"
                          innerRef={methods.register}
                        />
                        <p className="mt-2">
                          {methods.errors.restaurant_id?.message}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label for="latitude">Latitude (Required)</Label>
                        <Input
                          name="address.latitude"
                          placeholder="Latitude"
                          innerRef={methods.register}
                        />
                        <p className="mt-2">
                          {methods.errors.address?.latitude?.message}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="longitude">Longitude (Required)</Label>
                        <Input
                          name="address.longitude"
                          placeholder="Longitude"
                          innerRef={methods.register}
                        />
                        <p className="mt-2">
                          {methods.errors.address?.longitude?.message}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="building">Building (Required)</Label>
                        <Input
                          name="address.building"
                          placeholder="Building"
                          innerRef={methods.register}
                        />
                        <p className="mt-2">
                          {methods.errors.address?.building?.message}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label for="zipcode">Zip Code (Required)</Label>
                        <Input
                          name="address.zipcode"
                          placeholder="Zip Code"
                          innerRef={methods.register}
                        />
                        <p className="mt-2">
                          {methods.errors.address?.zipcode?.message}
                        </p>
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
  }
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md="8">
          <h4>Restaurant was saved successfully</h4>
        </Col>
      </Row>
    </>
  );
};

AddFormBody.propTypes = {
  restaurant: PropTypes.object,
  setSubmitted: PropTypes.func,
  submitted: PropTypes.bool,
};

export default AddFormBody;
