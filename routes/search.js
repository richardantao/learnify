const router = require("express").Router();
const controller = require("../controllers/search");

const auth = require("../middleware/auth");

router.get("/", /*auth,*/ controller.search);

module.exports = router;