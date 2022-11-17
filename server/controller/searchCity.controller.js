
const {Router} =require("express")
const { RestaurantModel } = require("../models/restaurant.model")

const searchCityController = Router()

searchCityController.get("/getCity",async (req,res)=>{
    
    let {city,sortBy,deliveryTime} =req.query

     if(sortBy &&  deliveryTime){
        const restaurants_by_city = await RestaurantModel.find({city}).sort({ d_time:deliveryTime==="desc" ? -1 : 1}).collation({locale: "en_US", numericOrdering: true}).sort({cost:sortBy ==="asc"? 1 :-1})
        console.log(restaurants_by_city)
    
        res.status(200).send({"Restaurants":restaurants_by_city})
    }
    
    else if(sortBy && !deliveryTime){
        const restaurants_by_city = await RestaurantModel.find({city}).sort({cost:sortBy ==="asc"? 1 :-1})
        console.log(restaurants_by_city)
    
        res.status(200).send({"Restaurants":restaurants_by_city})
    }

   else if(!sortBy && deliveryTime){
    const restaurants_by_city = await RestaurantModel.find({city}).sort({ d_time:deliveryTime==="desc" ? -1 : 1}).collation({locale: "en_US", numericOrdering: true})
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