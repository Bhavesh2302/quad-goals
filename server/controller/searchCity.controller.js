
const {Router} =require("express")
const { RestaurantModel } = require("../models/restaurant.model")

const searchCityController = Router()

searchCityController.get("/getCity",async (req,res)=>{
    
    let {city,sortBy} =req.query

     if(sortBy){
        const restaurants_by_city = await RestaurantModel.find({city}).sort({cost:sortBy ==="asc"? 1 :-1})
        console.log(restaurants_by_city)
    
        res.status(200).send({"Restaurants":restaurants_by_city})
    }
    
   else{
    const restaurants_by_city = await RestaurantModel.find({city})
    console.log(restaurants_by_city)

    res.status(200).send({"Restaurants":restaurants_by_city})
   }
    
})

module.exports = { searchCityController}