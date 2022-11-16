const { Router } = require("express");
const { OtpModel } = require("../models/otp.model");
const { UserModel } = require("../models/user.model");
const nodemailer = require("nodemailer");

const checkEmailController = Router();

checkEmailController.post("/mail", async (req, res) => {
  const user = await UserModel.findOne(req.body);
//   console.log(user);


  // console.log(user.email)
  if (user) {
    res.send({ msg: "User Already Exist" });
  } else {
    const generateOtp = Math.floor(Math.random() * 899999 + 100000);
    console.log(generateOtp);

    const otp = new OtpModel({ email: req.body.email, otp: generateOtp });
    await otp.save();

    mailer(req.body.email, otp.otp);
    res.send({ msg: "otp has been generated" });
  }
});

checkEmailController.post("/otp", async (req, res) => {
  const { email, otp } = req.body;


  const otpData = await OtpModel.findOne({ email,otp });
  console.log("req",otp,otpData)

  if (otpData) {
    if (otp === otpData.otp) {
        await OtpModel.deleteOne({otp})
      res.send({ msg: "otp matched successfully" });
    } else {
      res.send({ msg: "Please enter the correct otp" });
    }
  }
});

const mailer = (email, otp) => {
//   console.log(email, otp);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.MAILER_PASSWORD,
    },
  });
  var mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "rest your password one time password",
    text: `one time password is ${otp}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  checkEmailController,
};
