const { Router } = require("express");
const { authentication } = require("../middlewares/authentication");
const { MenuModel } = require("../models/menu.model");
const { RestaurantModel } = require("../models/restaurant.model");
const { authorization } = require("../middlewares/authorization");

const menuController = Router();

menuController.get("/getMenu/:restId", async (req, res) => {
  const { restId } = req.params;
  const { userId } = req.body;

  try {
    const menuList = await MenuModel.find({ restId });

    console.log(menuList);

    res.status(200).send({ menuList: menuList });
  } catch (err) {
    res.status(400).send("msg", "not found");
  }
});

menuController.post(
  "/addMenuItems",
  authentication,
  authorization(["shopOwner"]),
  async (req, res) => {
    const { userId } = req.body;
    const getRestaurants = await RestaurantModel.findOne({ userId });

    const rest_id = getRestaurants._id;
    console.log(rest_id);

    const addMenu = new MenuModel({ userId, restId: rest_id, ...req.body });

    await addMenu.save();

    console.log(addMenu);

    res.status(201).send({ msg: "item has been added" });
  }
);

menuController.patch(
  "/update/:id",
  authentication,
  authorization(["shopOwner"]),
  async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;

    const menu_update = await MenuModel.findByIdAndUpdate(
      { _id: id, userId },
      { ...req.body }
    );
    console.log(menu_update);
    res.status(201).send({ msg: "item updated successfull" });
  }
);

menuController.delete(
  "/remove/:id",
  authentication,
  authorization(["shopOwner"]),
  async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;

    const menu_delete = await MenuModel.findByIdAndDelete({ _id: id, userId });
    console.log(menu_delete);
    res.status(201).send({ msg: "item deleted successfull" });
  }
);

module.exports = { menuController };
