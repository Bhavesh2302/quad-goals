

const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const signupController = Router()
const bcrypt = require('bcryptjs');

signupController.post("/signup",(req,res)=>{
    const { phoneNo, name, email, password,role} = req.body

    bcrypt.hash(password, 8, async function(err, hash) {
        if(err){
            console.log(err)
            res.status(401).send({"msg":"something went wrong please signup again"})
        }

        try {
            const user = new UserModel({phoneNo, name, email, password:hash,role})
            await user.save()
            res.status(201).send({"msg":"Sigup Successful"})
        } catch (error) {
            // res.send(err)
            res.status(401).send({"msg":"something went wrong please signup again"})
        }

    });

})

module.exports = { signupController }


