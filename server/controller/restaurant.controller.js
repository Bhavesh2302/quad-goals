
const { Router } = require("express")
const { authentication } = require("../middlewares/authentication")
const { authorization } = require("../middlewares/authorization")
const { RestaurantModel } = require("../models/restaurant.model")
const { UserModel } = require("../models/user.model")
const restaurantController = Router()

restaurantController.get("/get",async (req,res)=>{
   const all_restaurants =await RestaurantModel.find()
   console.log(all_restaurants)
    res.send(all_restaurants)
})

// authorization(["admin","shopOwner"])
restaurantController.post("/create", authentication,authorization(["shopOwner"]),async (req,res)=>{

    
        const payload = req.body;
        const {userId} =req.body
        console.log(userId)
        // console.log(payload)

        // const user = await UserModel.findOne({userId}) 

        const new_restaurant = new RestaurantModel(payload)
        console.log(new_restaurant)
        // console.log(new_restaurant)
        // await new_restaurant.save()
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