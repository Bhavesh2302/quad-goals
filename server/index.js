const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const { connection } = require("./configs/db");
const { signupController } = require("./controller/signup.controller");
const { loginController } = require("./controller/login.controller");
const { restaurantController } = require("./controller/restaurant.controller");
const { menuController } = require("./controller/menu.controller");
const { searchCityController } = require("./controller/searchCity.controller");
const { checkEmailController } = require("./controller/checkEmail.controller");
const { costController } = require("./controller/cost.controller");


const PORT = process.env.PORT || 7082;

app.use(cors());
app.use(express.json());

app.use("/signup", signupController);
app.use("/login", loginController);
app.use("/restaurant", restaurantController)
app.use("/getRestaurants",costController)
app.use("/menu",menuController)
app.use("/allRestaurants",searchCityController)
app.use("/check",checkEmailController)


app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`running on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
