const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: String,
  price: Number,
  features: [String],
  duration: Number // days
});

module.exports = mongoose.model("Plan", planSchema);
