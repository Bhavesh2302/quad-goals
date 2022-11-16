

const mongoose = require("mongoose")


const otpSchema = new mongoose.Schema({
 
    email:{type:String},
    otp:{type:String}
 
}) 

const OtpModel = mongoose.model("otp",otpSchema)

module.exports = {OtpModel}
