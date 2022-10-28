
const { Router } = require("express")
const { authentication } = require("../middlewares/authentication")
const { RestaurantModel } = require("../models/restaurant.model")
const restaurantController = Router()

restaurantController.get("/get",(req,res)=>{
   const all_restaurants = RestaurantModel.find()
    res.send("Hello restaurent")
})
// authorization(["admin","shopOwner"])
restaurantController.post("/create", authentication,async (req,res)=>{
    const payload = req.body;
    const new_restaurant = new RestaurantModel(payload)
    console.log(new_restaurant)
    //await new_restaurant.save()
    res.send("created restaurent")
})

restaurantController.patch("/update/:id",(req,res)=>{
    const { id } = req.params
    const payload = req.body
  const updated_restaurant = RestaurantModel.findByIdAndUpdate({_id:id},{...payload})
    res.send("Updated Restaurant succesfully")
})

restaurantController.delete("/remove/:id",(req,res)=>{
    const { id } = req.params
    const payload = req.body
    const delete_restaurant = RestaurantModel.findByIdAndDelete({_id:id})
    res.send("Deleted restaurent")
})

module.exports = { restaurantController }