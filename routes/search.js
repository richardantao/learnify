const router = require("express").Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/search");

router.get("/", /*auth,*/ controller.search);

module.exports = router;