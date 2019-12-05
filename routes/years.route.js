const router = require("express").Router();
const controller = require("../controllers/years.controller");

const auth = require("../middleware/auth.middleware");
const validation = require("../middleware/validation/years.validation");

router.post("/", auth, validation, controller.create);

router.get("/", auth, controller.read);

router.get("/:yearId", auth, controller.edit);

router.put("/:yearId", auth, validation, controller.update);

router.delete("/:yearId", auth, controller.delete);

module.exports = router;


