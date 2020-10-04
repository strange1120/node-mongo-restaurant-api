import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useMount } from "react-use";
import { Row, Label, Input, Button, Col } from "reactstrap";
import { useFieldArray, useFormContext } from "react-hook-form";

const Grades = () => {
  const { register, control, setValue, watch } = useFormContext();
  let { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "grades", // unique name for your Field Array
    keyName: "_id",
  });

  const watchedFields = watch("grades", fields);

  useEffect(() => {
    console.log(fields);
    fields.map((grade, index) => {
      setValue(`grades[${index}].grade`, grade.grade);
      setValue(`grades[${index}].score`, grade.score);
      setValue(`grades[${index}].date`, grade.date);
      console.log(fields);
    });
  }, [fields]);

  return (
    <>
      {watchedFields &&
        fields.map((grade, index) => (
          <Row key={grade._id}>
            <Col md="4">
              <Label for="grades[${index}].date">Date</Label>
              <Input
                name={`grades[${index}].date`}
                placeholder="Nov 20"
                innerRef={register}
              />
            </Col>
            <Col md="2">
              <Label for="grades[${index}].score">Score</Label>
              <Input
                name={`grades[${index}].score`}
                placeholder="9"
                innerRef={register}
              />
            </Col>
            <Col md="2">
              <Label for="grades[${index}].grade">Grade</Label>
              <Input
                name={`grades[${index}].grade`}
                placeholder="A"
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

export default Grades;
