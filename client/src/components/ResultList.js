import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import Restaurant from "./Restaurant";

const ResultList = ({ restaurants, model }) => {
  return (
    <>
      <ListGroup className="mt-3 mb-3">
        {restaurants.map((restaurant) => (
          <ListGroupItem key={restaurant._id} className="mb-3">
            <Restaurant
              key={restaurant._id}
              model={model}
              restaurant={restaurant}
            />
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

ResultList.propTypes = {
  restaurant: PropTypes.array,
  model: PropTypes.object,
};

export default ResultList;
