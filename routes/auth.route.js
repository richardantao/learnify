const router = require("express").Router();
const controller = require("../controllers/auth.controller");

// middleware
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validation/auth.validation");

// @route /user
// @desc Get User credentials for authentication 
// @access PRIVATE
router.get("/user", auth, validate.user, controller.user);

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
router.post("/invite", validate.invite, controller.invite)

// @route /register
// @desc signs user up for application
// @access PUBLIC
router.post("/register", validate.register, controller.register);

// @route /signin
// @desc Verifies user authentication and loads user dashboard
// @access PUBLIC
router.post("/signin", validate.signin, controller.signin);

// @route /signout
// @desc kills user's application session
// @access PRIVATE
router.delete("/signout", auth, validate.signout, controller.signout);
  
module.exports = router;