import React from "react";
import { Row, Label, Input, Button, Col } from "reactstrap";
import { useFieldArray, useFormContext } from "react-hook-form";
import shortid from "shortid";

const Grades = () => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "grades", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  return (
    <>
      {fields.map((grade, index) => (
        <Row key={grade.id}>
          <Col md="4">
            <Label for="grades[${index}].date">Date</Label>
            <Input
              name={`grades[${index}].date`}
              placeholder="Jane Doe"
              innerRef={register}
            />
          </Col>
          <Col md="2">
            <Label for="grades[${index}].score">Score</Label>
            <Input
              name={`grades[${index}].score`}
              placeholder="Jane Doe"
              innerRef={register}
            />
          </Col>
          <Col md="2">
            <Label for="grades[${index}].grade">Grade</Label>
            <Input
              name={`grades[${index}].grade`}
              placeholder="Jane Doe"
              innerRef={register}
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
            {/* </Col> */}
            {/* <Col md="1" className="d-flex align-items-end"> */}
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
    </>
  );
};

export default Grades;
