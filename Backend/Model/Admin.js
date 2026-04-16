const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
  username: { type: String, required: true, unique: true, default: "admin" },
  password: { type: String, required: true, default: "admin@123" },
});

const adminModel = mongoose.model("Admin", Admin);
module.exports = adminModel;