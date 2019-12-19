const router = require("express").Router();
const controller = require("../controllers/auth");

const auth = require("../middleware/auth");
const validate = require("../middleware/validation/auth");

router.post("/register", validate.register, controller.register);

router.post("/signin", validate.signin, controller.signin);

router.delete("/signout", auth, validate.signout, controller.signout);

module.exports = router;
