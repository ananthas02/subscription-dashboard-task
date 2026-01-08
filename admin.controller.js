const Subscription = require("../models/Subscription");

exports.getAllSubscriptions = async (req, res) => {
  const subs = await Subscription.find()
    .populate("user_id")
    .populate("plan_id");
  res.json(subs);
};
