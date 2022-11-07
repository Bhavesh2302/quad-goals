
const {Router} =require("express")
const { RestaurantModel } = require("../models/restaurant.model")

const searchCityController = Router()

searchCityController.get("/getCity",async (req,res)=>{
    
    let query =req.query
    // console.log(query)
    // const city =query.city
    const restaurants_by_city = await RestaurantModel.find(query)
    console.log(restaurants_by_city)

    res.status(200).send({"Restaurants":restaurants_by_city})
})

module.exports = { searchCityController}