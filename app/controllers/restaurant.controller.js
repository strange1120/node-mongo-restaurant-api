const db = require("../models");
const Restaurant = db.restaurants;

// Create and Save a new Restaurant
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Restaurant
  const restaurant = new Restaurant({
    address: req.body.address,
    borough: req.body.borough,
    cuisine: req.body.cuisine,
    grades: req.body.grades,
    name: req.body.name,
    restaurant_id: req.body.restaurant_id,
  });

  // Save restaurant in the database
  restaurant
    .save(restaurant)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Restaurant.",
      });
    });
};

// Retrieve all Restaurants from the database.
exports.findAll = (req, res) => {
  const restaurant_id = req.query.restaurant_id;
  var condition = title
    ? { restaurant_id: { $regex: new RegExp(restaurant_id), $options: "i" } }
    : {};

  Tutorial.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurants.",
      });
    });
};

// Find a single Restaurant with an id
exports.findOne = (req, res) => {
  const restaurant_id = req.params.restaurant_id;

  Restaurant.find({ restaurant_id })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Restaurant with id " + restaurant_id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Restaurant with id=" + restaurant_id,
      });
    });
};

// Update a Restaurant by the id in the request
exports.update = (req, res) => {};

// Delete a Restaurant with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Restaurants from the database.
exports.deleteAll = (req, res) => {};

// Find all published Restaurants
exports.findAllPublished = (req, res) => {};
