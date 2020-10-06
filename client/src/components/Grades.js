import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Label, Input, FormGroup, Button, Col } from "reactstrap";
import { useFieldArray, useFormContext } from "react-hook-form";

const Grades = () => {
  const { register, control, setValue, reset, watch } = useFormContext();
  let { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "grades", // unique name for your Field Array
    keyName: "_id",
  });

  const watchGrades = watch("grades");

  // useEffect(() => {
  // if (restaurant !== undefined) {
  // setValue("name", defaultValues.name);
  // setValue("address.building", defaultValues.address.building);
  // setValue("address.street", defaultValues.address.street);
  // setValue("address.latitude", defaultValues.address.latitude);
  // setValue("address.longitude", defaultValues.address.longitude);
  // setValue("address.zipCode", defaultValues.address.zipCode);
  // setValue("restaurant_id", defaultValues.restaurant_id);
  // setValue("cuisine", defaultValues.cuisine);
  // setValue("borough", defaultValues.borough);
  // setValue("grades", defaultValues.grades);
  // }
  // else {
  //   setValue("name", restaurant.name);
  //   setValue("address.building", restaurant.address.building);
  //   setValue("address.street", restaurant.address.street);
  //   setValue("address.latitude", restaurant.address.coord[0]);
  //   setValue("address.longitude", restaurant.address.coord[1]);
  //   setValue("address.zipCode", restaurant.address.zipCode);
  //   setValue("restaurant_id", restaurant.restaurant_id);
  //   setValue("cuisine", restaurant.cuisine);
  //   setValue("borough", restaurant.borough);
  //   setValue("grades", restaurant.grades);
  // }
  // }, [restaurant]);

  useEffect(() => {
    // reset("grades");
    fields.forEach((grade, index) => {
      setValue(`grades[${index}].grade`, grade.grade);
      setValue(`grades[${index}].score`, grade.score);
      setValue(`grades[${index}].date`, grade.date);
      console.log(fields);
    });
  }, [fields, setValue]);

  return (
    <>
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
            <Input name="borough" placeholder="Borough" innerRef={register} />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label for="cuisine">Cuisine</Label>
            <Input name="cuisine" placeholder="Cuisine" innerRef={register} />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        {watchGrades &&
          fields.map((grade, index) => (
            <Row key={grade._id}>
              <Col md="4">
                <Label for="grades[${index}].date">Date</Label>
                <Input
                  name={`grades[${index}].date`}
                  placeholder="Nov 20"
                  innerRef={register}
                  defaultValue={`${grade.date}`}
                />
              </Col>
              <Col md="2">
                <Label for="grades[${index}].score">Score</Label>
                <Input
                  name={`grades[${index}].score`}
                  placeholder="9"
                  innerRef={register}
                  defaultValue={`${grade.score}`}
                />
              </Col>
              <Col md="2">
                <Label for="grades[${index}].grade">Grade</Label>
                <Input
                  name={`grades[${index}].grade`}
                  placeholder="A"
                  innerRef={register}
                  defaultValue={`${grade.grade}`}
                />
              </Col>
              <Col
                md="4"
                className="d-flex align-items-end justify-content-between"
              >
                <Button
                  type="button"
                  className="secondary"
                  onClick={() =>
                    append({
                      grade: "",
                      score: 1,
                      date: "",
                    })
                  }
                >
                  Add Grade
                </Button>
                <Button
                  type="button"
                  className="secondary"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
      </FormGroup>
    </>
  );
};

export default Grades;
