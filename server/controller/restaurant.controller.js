
const { Router } = require("express")
const { authentication } = require("../middlewares/authentication")
const { authorization } = require("../middlewares/authorization")
const { RestaurantModel } = require("../models/restaurant.model")
const { UserModel } = require("../models/user.model")
const restaurantController = Router()

restaurantController.get("/get/:restId",async (req,res)=>{
    const {restId} =req.params
   const singleRestaurant =await RestaurantModel.findOne({_id:restId})
   console.log(singleRestaurant)
    res.status(200).send({"singleRestaurant":singleRestaurant})
})

// authorization(["admin","shopOwner"])
restaurantController.post("/create", authentication,authorization(["shopOwner"]),async (req,res)=>{

    
        // const payload = req.body;
        const {userId} =req.body
        console.log(userId)
        // console.log(payload)

        // const user = await UserModel.findOne({userId}) 

        const new_restaurant = new RestaurantModel({userId,...req.body})
        console.log(new_restaurant)
        // console.log(new_restaurant)
        await new_restaurant.save()
        res.status(201).send({"msg":"created restaurant"})
    
   
})

restaurantController.patch("/update/:id",authentication,authorization(["shopOwner"]),async (req,res)=>{
    const { id } = req.params
    const {userId} = req.body
    const payload = req.body
  const updated_restaurant = await RestaurantModel.findByIdAndUpdate({_id:id,userId},{...payload})

  console.log(updated_restaurant)
    res.status(201).send("Updated Restaurant succesfully")
})
 
restaurantController.delete("/remove/:id",authentication,authorization(["admin","shopOwner"]),async (req,res)=>{
    const { id } = req.params
    const {userId} = req.body
    const delete_restaurant = await RestaurantModel.findByIdAndDelete({_id:id,userId})
    console.log(delete_restaurant)
    res.status(201).send("Deleted restaurant")
})

module.exports = { restaurantController }