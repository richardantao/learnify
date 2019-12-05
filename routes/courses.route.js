const router = require("express").Router();
const controller = require("../controllers/courses.controller");

const auth = require("../middleware/auth.middleware");
const validation = require("../middleware/validation/courses.validation");

router.post("/", auth, validation, controller.create);

router.get("/", auth, controller.read);

router.get("/:courseId", auth, controller.edit);

router.put("/:courseId", auth, validation, controller.update);

router.delete("/:courseId", auth, controller.delete);

module.exports = router;
