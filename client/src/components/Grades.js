import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Label, Input, FormGroup, Button, Col } from "reactstrap";
import { useFieldArray, useFormContext } from "react-hook-form";

const Grades = ({ restaurant }) => {
  const {
    register,
    control,
    setValue,
    reset,
    watch,
    formState,
  } = useFormContext();
  let { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "grades", // unique name for your Field Array
    keyName: "_id",
  });

  const watchGrades = watch("grades");

  useEffect(() => {
    // reset("grades");
    fields.forEach((grade, index) => {
      setValue(`grades[${index}].grade`, grade.grade);
      setValue(`grades[${index}].score`, grade.score);
      setValue(`grades[${index}].date`, grade.date);
      console.log(fields);
      console.log("errors", formState.errors);
    });
  }, [fields, setValue]);

  return (
    <>
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

Grades.propTypes = {
  restaurant: PropTypes.object,
};

export default Grades;
