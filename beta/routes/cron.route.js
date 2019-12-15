const router = require("express").Router();
const controller = require("../controllers/cron.controller");

router.put("/clean-items", controller.cleanItems);

module.exports = router;