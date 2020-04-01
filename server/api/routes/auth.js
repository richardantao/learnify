const router = require("express").Router();
const auth = require("../middleware/auth");
const validate = require("../middleware/validation/auth");
const controller = require("../controllers/auth");

router.get("/user", /*auth,*/ controller.user);

router.post("/register", validate.register, controller.register);

router.post("/login", validate.signin, controller.signin);

router.put("/verify-email/:token", controller.verifyEmail);

router.put("/resend-email-verification", controller.resendEmailVerification);

router.post("/forgot-password", controller.forgotPassword);

router.get("/change-password/:token", controller.changePassword);

router.put("/reset-password", controller.resetPassword);

router.delete("/logout", /*auth,*/ validate.signout, controller.signout);
  
module.exports = router;