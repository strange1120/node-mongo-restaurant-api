import React from "react";
import { Row, FormGroup, Form, Label, Input, Button, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import RestaurantDataService from "../services/RestaurantService";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   restaurantId: yup.string().required(),
//   address: yup.object().shape({
//     building: yup.string().required(),
//     street: yup.string().required(),
//     // coord: array().of(number().required()),
//     latitude: yup.number().required(),
//     longitude: yup.number().required(),
//     zipCode: yup.string().required(),
//   }),
//   cuisine: yup.string().required(),
//   borough: yup.string().required(),
//   grades: yup.array().of(
//     yup.object().shape({
//       date: yup.string().required(),
//       score: yup.number().required().positive(),
//       grade: yup.string().required(),
//     })
//   ),
// });

const AddForm = () => {
  const { register, handleSubmit } = useForm();
  //       {
  //     resolver: yupResolver(schema),
  //   }

  const onSubmit = (values) => {
    console.log(values);
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
                    name="street"
                    placeholder="Street"
                    innerRef={register}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="restaurantId">Restaurant ID</Label>
                  <Input
                    name="restaurantId"
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
                    name="latitude"
                    placeholder="Latitude"
                    innerRef={register}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="longitude">Longitude</Label>
                  <Input
                    name="longitude"
                    placeholder="Longitude"
                    innerRef={register}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="building">Building</Label>
                  <Input
                    name="building"
                    placeholder="Building"
                    innerRef={register}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup name="address">
                  <Label for="zipCode">Zip Code</Label>
                  <Input
                    name="zipCode"
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
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input name="date" placeholder="Date" innerRef={register} />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="grade">Grade</Label>
                  <Input name="grade" placeholder="Grade" innerRef={register} />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="score">Score</Label>
                  <Input name="score" placeholder="Score" innerRef={register} />
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit">Add</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddForm;
