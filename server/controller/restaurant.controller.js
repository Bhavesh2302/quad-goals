const { Router } = require("express");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
const { RestaurantModel } = require("../models/restaurant.model");
const { UserModel } = require("../models/user.model");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const restaurantController = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, base + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

restaurantController.get("/get/:restId", async (req, res) => {
  const { restId } = req.params;
  const singleRestaurant = await RestaurantModel.findOne({ _id: restId });
  console.log(singleRestaurant);
  res.status(200).send({ singleRestaurant: singleRestaurant });
});

restaurantController.get(
  "/get/shops/:shopownerId",
  authentication,
  authorization(["shopOwner"]),
  async (req, res) => {
    const { shopownerId } = req.params;
    console.log("shopownerId", shopownerId);
    const restaurants = await RestaurantModel.find({
      userId: shopownerId,
      // active: true,
    });
    console.log(restaurants);
    res.status(200).send({ restaurants: restaurants });
  }
);

restaurantController.get(
  "/get/shop-details/:restId",
  authentication,
  authorization(["shopOwner"]),
  async (req, res) => {
    const { restId } = req.params;

    const restaurants = await RestaurantModel.find({
      _id: restId
      // active: true
    });
    console.log("restaurants-----", restaurants, restId);
    res.status(200).send({ restaurant: restaurants[0] });
  }
);

// authorization(["admin","shopOwner"])
restaurantController.post(
  "/create",authentication,authorization(['admin','shopOwner']),upload.single("image_rest"),
  async (req, res) => {
    try {
      const file = req.file;

      const result = await cloudinary.uploader.upload(file.path);

      const new_restaurant = new RestaurantModel({
        ...req.body,
        image_rest: result.secure_url,
      });
      console.log(new_restaurant);
      await new_restaurant.save();
      res.status(201).send({ msg: "created restaurant" });
    } catch (error) {
      res.status(500).send({ msg: "Error ocuured while creating the restaurant" });
    }
  }
);

restaurantController.patch(
  "/update/:id",
  authentication,
  authorization(["shopOwner"]),
  upload.single("image_rest"), 
  async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, ...restPayload } = req.body;

      let updatedPayload = { ...restPayload };

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        updatedPayload.image_rest = result.secure_url ; 
      }

      const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
        { _id: id, userId },
        { $set: updatedPayload },
        // { new: true }
      );
      if (!updatedRestaurant) {
        return res.status(404).send("Restaurant not found or unauthorized.");
      }

      res.status(200).send("Updated Restaurant successfully");
    } catch (err) {
      console.error("Error updating restaurant:", err);
      res.status(500).send("Error updating restaurant");
    }
  }
);

restaurantController.put(
  "/remove/:id",
  authentication,
  authorization(["admin", "shopOwner"]),
  async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const delete_restaurant = await RestaurantModel.findByIdAndDelete(
      {
        _id: id,
        userId,
      },
      // { active: false }
    );
    console.log(delete_restaurant);
    res.status(201).send("Deleted restaurant");
  }
);

restaurantController.patch("/updatemany", async (req, res) => {
  try {
    const a = await RestaurantModel.updateMany({}, { $set: { active: true } });
    console.log(a);
    res.send({ msg: "updated with active as true" });
  } catch (error) {
    console.log(error);
  }
});

// restaurantController.patch("/updateRestaurant", async (req, res) => {
//   try {
//     // const rests = await RestaurantModel.updateMany({userId:"6616c0831d1bb5933cae2d1d"},{$set:{userId:"675c8680fe3c470724c8ee07"}})
//     // const rests = await RestaurantModel.updateMany({city:"kota"},{$set:{userId:"675c81ecfe3c470724c8edd9"}})
//     const rests = await RestaurantModel.updateMany(
//       { city: "mumbai" },
//       { $set: { active: "false" } }
//     );
//     console.log(rests);
//     res.send("done");
//   } catch (error) {
//     res.send(err);
//   }
// });




// restaurantController.delete("/deletemany",async(req,res)=>{
//   try {
//     const user = await UserModel.deleteMany({city:"Mumbai"})
//     res.send("delete done")
//   } catch (error) {
//     res.send(error)
//   }
// })

module.exports = { restaurantController };
