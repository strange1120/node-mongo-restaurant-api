import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import Grade from "./Grade";

const Restaurant = ({ restaurant, model }) => {
  return (
    <>
      <Row>
        <Col md={6}>
          {model?.name ? (
            <div>
              <span className="text-label">
                <h6>Cuisine: </h6>
              </span>
              {restaurant.name}
            </div>
          ) : null}
        </Col>
        <Col md={6}>
          {model?.cuisine ? (
            <div>
              <span className="text-label">
                <h6>Cuisine: </h6>
              </span>
              {restaurant.cuisine}
            </div>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          {model?.borough ? (
            <div>
              <span className="text-label">
                <h6>Borough</h6>
              </span>
              {restaurant.borough}
            </div>
          ) : null}
        </Col>
        <Col md={4}>
          {model?.restaurant_id ? (
            <div>
              <span className="text-label">
                <h6>Restaurant ID: </h6>
              </span>
              {restaurant.restaurant_id}
            </div>
          ) : null}
        </Col>
        <Col md={4}>
          {model?.street ? (
            <div>
              <span className="text-label">
                <h6>Street: </h6>
              </span>
              {restaurant.address.street}
            </div>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          {model?.zipcode ? (
            <div>
              <span className="text-label">
                <h6>Zip Code</h6>
              </span>
              {restaurant.address.zipcode}
            </div>
          ) : null}
        </Col>
        <Col md={6}>
          {model?.building ? (
            <div>
              <span className="text-label">
                <h6>Building: </h6>{" "}
              </span>
              {restaurant.address.building}
            </div>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          {model?.latitude ? (
            <div>
              <span className="text-label">
                <h6>Latitude</h6>
              </span>
              {restaurant.address.coord[0]}
            </div>
          ) : null}
        </Col>
        <Col md={4}>
          {model?.longitude ? (
            <div>
              <span className="text-label">
                <h6>Longitude: </h6>
              </span>
              {restaurant.address.coord[1]}
            </div>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <span className="text-label">
            <h6>Grades: </h6>
          </span>
          {model?.grades ? (
            <>
              {restaurant.grades.map((grade, index) => (
                <Grade key={index} grade={grade} />
              ))}
            </>
          ) : null}
        </Col>
      </Row>
    </>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.object,
  model: PropTypes.object,
};

export default Restaurant;
