const router = require("express").Router();
const controller = require("../controllers/search.controller");

const auth = require("../middleware/auth.middleware");

router.get("/", /*auth,*/ controller.search);

module.exports = router;