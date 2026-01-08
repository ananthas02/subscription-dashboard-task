const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const { subscribe, mySubscription } = require("../controllers/subscription.controller");

router.post("/subscribe/:planId", auth, subscribe);
router.get("/my-subscription", auth, mySubscription);

module.exports = router;
