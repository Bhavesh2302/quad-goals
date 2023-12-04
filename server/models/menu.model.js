const mongoose = require("mongoose");
// required:true
const menu_schema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },
  description: { type: String },
  item_image: { type: String },
  type: { type: String },
  userId: { type: String },
  restId: { type: String }
});

const MenuModel = mongoose.model("menuList", menu_schema);

module.exports = { MenuModel };
