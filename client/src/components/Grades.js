import React from "react";
import { Row, Label, Input, Col } from "reactstrap";
import { useFieldArray } from "react-hook-form";

const Grades = ({ register, control }) => {
  const { fields } = useFieldArray({
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
        </Row>
      ))}
    </>
  );
};

export default Grades;
