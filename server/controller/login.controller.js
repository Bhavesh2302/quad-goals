const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const loginController = Router();
require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

loginController.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  console.log(user)
   const hash = user.password
   console.log(hash)

  bcrypt.compare(password, hash, async function (err, result) {
    if (err) {
      res.status(401).send({ msg: "something went wrong try again" });
    }

    if (result === true) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.SECRET,
      );

      res.status(201).send({ msg: "Login Successfull", token: token,"user":user });
    } else {
      res.status(401).send({ msg: "please login again" });
    }
  });
});

module.exports = {
    loginController,
};
