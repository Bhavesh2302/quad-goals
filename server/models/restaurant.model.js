
const mongoose = require("mongoose")
// required:true
const restaurant_schema = new mongoose.Schema({
    
    image_rest:{ type: String},
    rest_name :{ type: String},
    cuisines:{type:Array},
    rating :{type: Number},
    d_time:{type:String},
    cost:{type: Number},
    offer :{type: String ,enum:["60"],default :"none"},
    promoted :{type: String ,enum:["promoted"], default : "none"},
    city:{type:String},
    userId:{type:String}
     

})

const RestaurantModel = mongoose.model("restaurant",restaurant_schema)

module.exports = { RestaurantModel }