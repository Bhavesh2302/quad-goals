const { UserModel } = require("../models/user.model");

const authorization = (roles) => async (req, res, next) => {
  const permittedRoles = roles;

  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  console.log(user.role);
  if (permittedRoles.includes(user.role)) {
    next();
  } else {
    res.send("you are not authorized");
  }
};

module.exports = { authorization };
