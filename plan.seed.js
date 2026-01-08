require("dotenv").config();
const connectDB = require("../config/db");
const Plan = require("../models/Plan");

connectDB();

(async () => {
  await Plan.deleteMany();
  await Plan.insertMany([
    { name: "Free", price: 0, features: ["Basic Access"], duration: 7 },
    { name: "Basic", price: 199, features: ["Email Support"], duration: 30 },
    { name: "Pro", price: 499, features: ["Priority Support"], duration: 90 }
  ]);
  console.log("✅ Plans seeded");
  process.exit();
})();
