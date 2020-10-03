import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Restaurant from "./Restaurant";

const ResultList = ({ restaurants }) => {
  return (
    <>
      <ListGroup className="mt-3">
        {restaurants.map((restaurant) => (
          <ListGroupItem key={restaurant.id}>
            <Restaurant key={restaurant.id} restaurant={restaurant} />
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default ResultList;
