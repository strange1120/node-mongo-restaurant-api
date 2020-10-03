import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Label, Input, Button, Col } from "reactstrap";
import { useFieldArray, useFormContext } from "react-hook-form";

const Grades = ({ grades }) => {
  const { register, control, setValue } = useFormContext();
  let { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "grades", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  useEffect(() => {
    if (grades !== undefined) {
      grades.forEach((grade, index) => {
        setValue(`grades[${index}].date`, grade.date);
        setValue(`grades[${index}].score`, grade.score);
        setValue(`grades[${index}].grade`, grade.grade);
      });
    }
  }, [grades]);

  return (
    <>
      {(grades || fields).map((grade, index) => (
        <Row key={grade.id || grade._id}>
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

Grades.propTypes = {
  grades: PropTypes.array,
};

export default Grades;
