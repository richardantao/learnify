const router = require("express").Router();
const controller = require("../controllers/users.controller");

// middleware
const validate = require("../middleware/validation/auth.validation");

router.get("/", controller.index);

router.get("/edit", controller.edit);

router.put("/update", controller.update);

router.delete("/delete", controller.delete);

module.exports = router;