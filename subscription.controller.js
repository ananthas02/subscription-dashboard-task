const Subscription = require("../models/Subscription");
const Plan = require("../models/Plan");

exports.subscribe = async (req, res) => {
  const plan = await Plan.findById(req.params.planId);
  if (!plan) return res.status(404).json({ message: "Plan not found" });

  const start = new Date();
  const end = new Date();
  end.setDate(start.getDate() + plan.duration);

  const subscription = await Subscription.create({
    user_id: req.user.id,
    plan_id: plan._id,
    start_date: start,
    end_date: end
  });

  res.status(201).json(subscription);
};

exports.mySubscription = async (req, res) => {
  const sub = await Subscription.findOne({ user_id: req.user.id, status: "active" })
    .populate("plan_id");

  res.json(sub);
};
