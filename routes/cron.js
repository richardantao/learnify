const router = require("express").Router();
const controller = require("../controllers/cron");

router.put("/clean-items", controller.cleanItems);

module.exports = router;