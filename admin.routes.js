const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const { getAllSubscriptions } = require("../controllers/admin.controller");

router.get("/subscriptions", auth, role("admin"), getAllSubscriptions);
module.exports = router;
