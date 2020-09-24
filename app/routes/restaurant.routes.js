module.exports = (app) => {
  const restaurants = require("../controllers/restaurant.controller.js");

  const router = require("express").Router();

  // Create a new Restaurant
  router.post("/", restaurants.create);

  // Retrieve all Restaurants
  router.get("/", restaurants.findAll);

  // Retrieve all published Restaurants
  router.get("/published", restaurants.findAllPublished);

  // Retrieve a single Restaurant with id
  router.get("/:restaurant_id", restaurants.findOne);

  // Update a Restaurant with id
  router.put("/:id", restaurants.update);

  // Delete a Restaurant with id
  router.delete("/:id", restaurants.delete);

  // Create a new Restaurant
  router.delete("/", restaurants.deleteAll);

  app.use("/api/restaurants", router);
};
