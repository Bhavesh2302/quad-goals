const { UserModel } = require("../models/user.model");

const authorization = (roles) => async (req, res, next) => {
  // console.log(roles)
  const permittedRoles = roles;

  const { userId } = req.body;
  // console.log(userId)

  const user = await UserModel.findOne({ userId });
  // console.log(user)
  // console.log(user.role)
  // console.log(user.role);
  if (permittedRoles.includes(user.role)) {
    next();
  } else {
    res.send({"msg":"you are not authorized"});
  }
};

module.exports = { authorization };
