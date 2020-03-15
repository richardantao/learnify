const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/feedback");
const controller = require("../controllers/feedback");

router.post("/", /*auth,*/ validation, controller);

module.exports = router;