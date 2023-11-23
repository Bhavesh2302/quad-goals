
const mongoose = require("mongoose")
// required:true
const cart_schema = new mongoose.Schema({

    itemName:{type:String},
    restName:{type:String},
    itemImage:{type:String},
    restImage:{type:String},
    price:{type:Number},
    quantity:{type:Number,default:1},
    menuId : {type:String},
    restId :{type:String},
    userId:{type:String},
})

const CartModel = mongoose.model("cart",cart_schema)

module.exports = {
    CartModel
}