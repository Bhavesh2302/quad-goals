
const mongoose = require("mongoose")
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid'

const userSchema = new mongoose.Schema({
    phoneNo:{type:Number,required:true,maxLength:10},
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:["admin","shopOwner","customer"], default:"customer"}
}) 

const UserModel = mongoose.model("user",userSchema)

module.exports = {UserModel}
