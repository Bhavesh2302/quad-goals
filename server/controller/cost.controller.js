const { Router } = require("express");
const { RestaurantModel } = require("../models/restaurant.model");

const costController = Router();

costController.get("/htl", async (req, res) => {
  const restaurants = await RestaurantModel.find().sort({ cost: -1 });

  console.log(restaurants);

  res.send({ msg: restaurants });
});

costController.get("/lth", async (req, res) => {
  const restaurants = await RestaurantModel.find().sort({ cost: 1 });

  console.log(restaurants);

  res.send({ msg: restaurants });
});

module.exports = {
  costController
};
