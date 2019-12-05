const router = require("express").Router();
const controller = require("../controllers/tasks.controller");

// middleware
const auth = require("../middleware/auth.middleware");
const validation = require("../middleware/validation/tasks.validation");

router.post("/", auth, validation, controller.create);

router.get("/", auth, controller.read);

router.get("/:taskId", auth, controller.edit);

router.put("/:taskId", auth, validation, controller.delete);

router.delete("/:taskId", auth, controller.delete);

module.exports = router;