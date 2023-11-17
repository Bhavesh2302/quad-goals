const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const loginController = Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

loginController.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });
  console.log(user);

  if (user) {
    const hash = user.password;
    bcrypt.compare(password, hash, async function (err, result) {
      if (err) {
        console.log(err);
        res.status(401).send({ msg: "something went wrong try again" });
      } else if (result === true) {
        const token = jwt.sign(
          {
            userId: user._id
          },
          process.env.SECRET
        );

        res.status(201).send({
          msg: "Login Successful",
          token: token,
          user: {
            id: user._id,
            name: user.name,
            phoneNo: user.phoneNo,
            role: user.role,
            email: user.email
          }
        });
      } else {
        res.send({ msg: "please login again" });
      }
    });
  } else res.send({ msg: "something went wrong" });
});

loginController.get("/getall", async (req, res) => {
  try {
    const all = await UserModel.find();

    res.send({ all: all });
  } catch (error) {
    res.send({ msg: "something went wrong" });
  }
});

module.exports = {
  loginController
};
