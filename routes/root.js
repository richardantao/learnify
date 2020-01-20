const router = require("express").Router()
const validation = require("../middleware/validation/root");
const controller = require("../controllers/root");

router.post("/invite", validation.invite, controller.invite);

router.post("/contact", validation.contact, controller.contact);

module.exports = router;