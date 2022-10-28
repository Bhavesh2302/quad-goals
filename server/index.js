const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const { connection } = require("./configs/db");
const { signupController } = require("./controller/signup.controller");
const { loginController } = require("./controller/login.controller");
const { restaurantController } = require("./controller/restaurant.controller");

const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

app.use("/signup", signupController);
app.use("/login", loginController);
app.use("/restaurant", restaurantController)


app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`running on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
