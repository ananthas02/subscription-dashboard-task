const Subscription = require("../models/Subscription");
const Plan = require("../models/Plan");

/**
 * Subscribe (first time)
 */
exports.subscribe = async (req, res) => {
  const userId = req.user.id;
  const { planId } = req.params;

  const plan = await Plan.findById(planId);
  if (!plan) {
    return res.status(404).json({ message: "Plan not found" });
  }

  const existing = await Subscription.findOne({ user: userId });
  if (existing) {
    return res.status(400).json({ message: "Already subscribed" });
  }

  const subscription = await Subscription.create({
    user: userId,
    plan: plan._id,
    price: plan.price,
    status: "active",
    expiresAt: addMonths(1),
  });

  res.json({
    message: "Subscribed successfully",
    subscription: formatSubscription(subscription, plan),
  });
};

/**
 * Get my subscription
 */
exports.mySubscription = async (req, res) => {
  const subscription = await Subscription.findOne({
    user: req.user.id,
  }).populate("plan");

  if (!subscription) {
    return res.json({ subscription: null });
  }

  res.json({
    subscription: formatSubscription(subscription, subscription.plan),
  });
};

/**
 * 🔄 Upgrade / Downgrade logic
 */
exports.changePlan = async (req, res) => {
  const userId = req.user.id;
  const { planId } = req.params;

  const newPlan = await Plan.findById(planId);
  if (!newPlan) {
    return res.status(404).json({ message: "Plan not found" });
  }

  const subscription = await Subscription.findOne({ user: userId });
  if (!subscription) {
    return res.status(400).json({ message: "No active subscription" });
  }

  // 🔼 UPGRADE → immediate
  if (newPlan.price > subscription.price) {
    subscription.plan = newPlan._id;
    subscription.price = newPlan.price;
    subscription.status = "active";
    subscription.expiresAt = addMonths(1);
    subscription.nextPlan = null;

    await subscription.save();

    return res.json({
      message: "Plan upgraded successfully",
      subscription: formatSubscription(subscription, newPlan),
    });
  }

  // 🔽 DOWNGRADE → after expiry
  if (newPlan.price < subscription.price) {
    subscription.nextPlan = newPlan._id;
    await subscription.save();

    return res.json({
      message: "Plan will be downgraded after current period",
      subscription: formatSubscription(subscription, newPlan, true),
    });
  }

  res.json({ message: "Already on this plan" });
};

/* ---------------- HELPERS ---------------- */

function addMonths(months) {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date;
}

function formatSubscription(subscription, plan, scheduled = false) {
  return {
    planId: plan._id,
    planName: plan.name,
    status: subscription.status,
    expiresAt: subscription.expiresAt,
    scheduled: scheduled,
  };
}
