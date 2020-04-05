const router = require("express").Router();
const controller = require("../controllers/errors");

router.post("/", controller);

module.exports = router;