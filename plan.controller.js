const Plan = require("../models/Plan");

exports.getPlans = async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
};
