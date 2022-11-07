
const {Router} =require("express")
const { authentication } = require("../middlewares/authentication")
const { MenuModel } = require("../models/menu.model")
const { RestaurantModel } = require("../models/restaurant.model")

const menuController =Router()

menuController.get("/getMenu",authentication,async (req,res)=>{

    const {userId} =req.body

    const getRestaurants = await RestaurantModel.find({userId})

    console.log(getRestaurants)

    res.status(200).send({"Restaurants":getRestaurants})
})


menuController.post("/addMenuItems",authentication, async (req,res)=>{

    const {userId} =req.body
    const getRestaurants = await RestaurantModel.findOne({userId})
    
    const rest_id =getRestaurants._id
    console.log(rest_id)

    const addMenu = new MenuModel({userId,restId:rest_id ,...req.body})

    await addMenu.save()

    console.log(addMenu)
 
    res.status(201).send({"msg":"item has been added"})
})

menuController.patch("/update/:id",authentication,async (req,res)=>{

    const {userId} =req.body
    const {id} =req.params

    const menu_update = await MenuModel.findByIdAndUpdate({_id:id,userId},{...req.body})
    console.log(menu_update)
    res.status(201).send({"msg":"item updated successfull"})
})

menuController.delete("/remove/:id",authentication,async (req,res)=>{

    const {userId} =req.body
    const {id} =req.params

    const menu_delete = await MenuModel.findByIdAndDelete({_id:id,userId})
    console.log(menu_delete)
    res.status(201).send({"msg":"item deleted successfull"})
})


module.exports = { menuController }