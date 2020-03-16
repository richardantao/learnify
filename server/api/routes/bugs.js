const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/bugs");
const controller = require("../controllers/bugs");

router.post("/", /*auth,*/ validation, controller.submit);

module.exports = router;
