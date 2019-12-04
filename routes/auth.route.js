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

// @route /verifyEmail
// @desc Verifies registered email and grants app access to user
// @access PUBLIC 
router.put("/verifyEmail/:token", controller.verifyEmail);

// @route /resendEmailVerification
// @desc
// @access PUBLIC
router.put("/resendEmailVerification", controller.resendEmailVerification);

// @route /forgetPassword
// @desc Sends token to user's email 
// @access PUBLIC
router.post("/forgotPassword", controller.forgotPassword);

// @route /
// @desc verify token after user click's link to change password
// @access PUBLIC
router.get("/changePassword/:token", controller.changePassword);

// @route /resetPassword
// @desc submit submission of new password
// @access PUBLIC
router.put("/resetPassword", controller.resetPassword);

// @route /signout
// @desc kills user's application session
// @access PRIVATE
router.delete("/signout", auth, validate.signout, controller.signout);
  
module.exports = router;