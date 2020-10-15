import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

const Grade = ({ grade }) => {
  return (
    <>
      <Row>
        <Col md={4}>
          {grade?.date ? (
            <div>
              <span className="text-label">
                <h6>Date: </h6>
              </span>
              {grade.date}
            </div>
          ) : null}
        </Col>
        <Col md={4}>
          {grade?.score ? (
            <div>
              <span className="text-label">
                <h6>Score: </h6>
              </span>
              {grade.score}
            </div>
          ) : null}
        </Col>
        <Col md={4}>
          {grade?.grade ? (
            <div>
              <span className="text-label">
                <h6>Grade: </h6>
              </span>
              {grade.grade}
            </div>
          ) : null}
        </Col>
      </Row>
    </>
  );
};

Grade.propTypes = {
  grade: PropTypes.object,
};

export default Grade;
