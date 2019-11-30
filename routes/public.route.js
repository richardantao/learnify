const router = require("express").Router();
const controller = require("../controllers/public.controller");

const validate = require("../middleware/validation/public.validation");

// @route /apply
// @desc submits job application
// @access PUBLIC
router.post("/apply", validate.application, controller.application);

// @route /contact
// @desc submits contact form on root domain
// @access PUBLIC
router.post("/contact", validate.contact, controller.contact);

// @route /invite
// @desc submits beta invite form on root domain
// @access PUBLIC
router.post("/invite", validate.invite, controller.invite);

module.exports = router;