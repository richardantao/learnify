const router = require("express").Router()
const controller = require("../controllers/root");

router.post("/invite", controller.invite);

router.post("/contact", controller.contact);

module.exports = router;