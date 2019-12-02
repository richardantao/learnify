const router = require("express").Router();
const controller = require("../controllers/cron.controller");

router.put("/clean-database", controller.cleanDb);

module.exports = router;