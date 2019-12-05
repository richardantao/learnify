const router = require("express").Router();
const controller = require("../controllers/classes.controller");

// middleware
const auth = require("../middleware/auth.middleware");
const validation = require("../middleware/validation/classes.validation");

router.post("/", auth, validation, controller.create);

router.get("/", auth, controller.read);

router.get("/:classId", auth, controller.edit);

router.put("/:classId", auth, validation, controller.delete);

router.delete("/:classId", auth, controller.delete);

module.exports = router;