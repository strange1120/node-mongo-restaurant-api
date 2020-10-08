module.exports = (app) => {
  const restaurants = require("../controllers/restaurant.controller.js");

  const router = require("express").Router();

  // Create a new Restaurant
  router.post("/", restaurants.create);

  // Retrieve all Restaurants on search terms
  router.get("/", restaurants.findAll);

  // Retrieve a single Restaurant with id
  router.get("/:restaurant_id", restaurants.findOne);

  // Update a Restaurant with id
  router.put("/:id", restaurants.update);

  app.use("/api/restaurants", router);
};
