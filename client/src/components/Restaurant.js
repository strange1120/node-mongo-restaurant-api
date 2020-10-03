import React from "react";
import { Row, Col } from "reactstrap";

const Restaurant = ({ restaurant }) => {
  return (
    <>
      <Row>
        <Col md={4}>
          <div>
            <span className="text-label">Name: </span>
            {restaurant.name}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Restaurant;
