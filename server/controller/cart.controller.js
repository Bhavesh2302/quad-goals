const { Router } = require("express");
const { authentication } = require("../middlewares/authentication");
const { CartModel } = require("../models/cart.model");
const { MenuModel } = require("../models/menu.model");
const { RestaurantModel } = require("../models/restaurant.model");

const cartController = Router();

cartController.get("/get", authentication, async (req, res) => {
  const { userId } = req.body;

  const cart_data = await CartModel.find({ userId });
  // console.log(cart_data)

  res.send({ cartData: cart_data });
});

cartController.post("/add/:menuId", authentication, async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  const { menuId } = req.params;
  const isExist = await CartModel.findOne({ menuId });

  console.log("isExist", isExist);
  if (!isExist) {
    const menu = await MenuModel.findOne({ _id: menuId });
    const rest_id = menu.restId;
    // const userId =menu.userId

    const restaurant = await RestaurantModel.findOne({ _id: rest_id });
    // console.log(restaurant)

    const payload = {
      itemName: menu.title,
      restName: restaurant.rest_name,
      restImage: restaurant.image_rest,
      itemImage: menu.item_image,
      price: menu.price,
      menuId: menuId,
      userId: userId,
      restId: rest_id
    };
    // "cartData": {
    //     "_id": "636917fe55b4e5a499d0436b",
    //     "title": "Kaju Curry",
    //     "price": 250,
    //     "description": "blend of sauces with the richness of cream and the taste of kaju",
    //     "item_image": "https://i0.wp.com/cookingfromheart.com/wp-content/uploads/2020/10/Kaju-Masala-3.jpg?w=768&ssl=1",
    //     "type": "veg",
    //     "userId": "6368a81e8b872abb8c0122b6",
    //     "restId": "636903d7e795198e6dc9a432",
    //     "__v": 0
    //   },

    // "rest": {
    //     "menu": [],
    //     "_id": "636903d7e795198e6dc9a432",
    //     "image_rest": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/us08ptreuvk7onrcx9bg",
    //     "rest_name": "Amar Punjabi Foods",
    //     "cuisines": [
    //       "Pasta",
    //       "Chinese",
    //       "Continental",
    //       "North Indian"
    //     ],
    //     "rating": 4.1,
    //     "d_time": "40",
    //     "cost": 250,
    //     "offer": "60",
    //     "promoted": "none",
    //     "city": "Kota",
    //     "address": "Talwandi A-18, Kota, Rajasthan",
    //     "userId": "6368a81e8b872abb8c0122b6",
    //     "__v": 0
    //   }
    // }

    // console.log(payload)
    const add_to_cart = new CartModel(payload);
    await add_to_cart.save();
    // const
    res.send({ restaurant: restaurant, cartData: add_to_cart });
  }
});

cartController.delete("/delete/:cartId", authentication, async (req, res) => {
  const { userId } = req.body;
  const { cartId } = req.params;
  const deletedItem = await CartModel.deleteOne({ _id: cartId, userId });
  console.log(deletedItem);

  res.send({ msg: "Item has been deleted" });
});

cartController.patch("/:cartId", authentication, async (req, res) => {
  const { userId } = req.body;
  // const payload = req.body
  const { quantity } = req.body;
  // console.log("payload",payload)

  const { cartId } = req.params;

  const updatedCart = await CartModel.findByIdAndUpdate(
    { _id: cartId, userId },
    { $inc: { quantity: quantity } }
  );
  console.log(updatedCart);
  // const cart_data = await CartModel.find({userId})
  //  res.status(200).send({"updated cart":updatedCart,"cartData":cart_data})
  res.send({
    msg: "quantity has been updated",
    quantity: updatedCart,
    payload: quantity
  });
});

module.exports = {
  cartController
};
