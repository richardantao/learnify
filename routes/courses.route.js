const router = require("express").Router();
const controller = require("../controllers/courses.controller");

const auth = require("../middleware/auth.middleware");
const validation = require("../middleware/validation/courses.validation");

router.post("/courses", auth, validation, controller.create);

router.get("/courses", auth, controller.read);

router.get("/terms/:termId/courses", auth, controller.filter);

router.get("/courses/:courseId", auth, controller.edit);

router.put("/courses/:courseId", auth, validation, controller.update);

router.delete("/courses/:courseId", auth, controller.delete);

module.exports = router;
