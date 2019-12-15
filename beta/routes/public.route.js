const router = require("express").Router();
const controller = require("../controllers/public.controller");

router.post("/apply", controller.application);

router.post("/contact", controller.contact);

router.post("/invite", controller.invite);

module.exports = router;