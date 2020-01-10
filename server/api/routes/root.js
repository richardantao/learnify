const router = require("express").Router()
const controller = require("../controllers/root");

const validation = require("../middleware/validation/root");

router.post("/invite", validation.invite, controller.invite);

router.post("/contact", validation.contact, controller.contact);

module.exports = router;