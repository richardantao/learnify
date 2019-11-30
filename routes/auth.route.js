const router = require("express").Router();
const controller = require("../controllers/auth.controller");

// middleware
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validation/auth.validation");

// @route /user
// @desc Get User credentials for authentication 
// @access PRIVATE
router.get("/user", auth, validate.user, controller.user);

// @route /register
// @desc signs user up for application
// @access PUBLIC
router.post("/register", validate.register, controller.register);

// @route /signin
// @desc Verifies user authentication and loads user dashboard
// @access PUBLIC
router.post("/signin", validate.signin, controller.signin);

// @route /forget
// @desc Resets password for user
// @access PUBLIC
router.post("/forgot", controller.forgot);

// @route /signout
// @desc kills user's application session
// @access PRIVATE
router.delete("/signout", auth, validate.signout, controller.signout);
  
module.exports = router;