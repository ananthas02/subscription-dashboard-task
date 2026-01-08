const router = require("express").Router();
const { getPlans } = require("../controllers/plan.controller");

router.get("/", getPlans);
module.exports = router;
