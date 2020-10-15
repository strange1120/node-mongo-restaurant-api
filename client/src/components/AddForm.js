import React, { useState } from "react";
import { Row, FormGroup, Form, Label, Input, Button, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import RestaurantDataService from "../services/RestaurantService";
import AddFormBody from "./AddFormBody";

const AddForm = () => {
  const [restaurant, setRestaurant] = useState(undefined);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    await RestaurantDataService.get(values.restaurant_id)
      .then((response) => {
        if (response.data.length > 0) {
          if (response.data[0].deleted === true) {
            setRestaurant(undefined);
          } else {
            setRestaurant(response.data[0]);
          }
        } else {
          setRestaurant(undefined);
        }
        setSearchSubmitted(true);
        setSubmitted(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Row className="d-flex justify-content-center mb-2">
        <Col md="8">
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
      {searchSubmitted === true ? (
        <AddFormBody
          restaurant={restaurant}
          setRestaurant={setRestaurant}
          setSubmitted={setSubmitted}
          submitted={submitted}
        />
      ) : null}
    </>
  );
};

export default AddForm;
