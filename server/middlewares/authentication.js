require("dotenv").config();
const jwt = require('jsonwebtoken');
const authentication = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ msg: "please login again" });
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      res.status(401).send({ msg: "something went wrong" });
    } else {
      req.body.userId = decoded.userId;
      next();
    }
  });
};

module.exports = {
  authentication,
};
