const router = require("express").Router();
const controller = require("../controllers/assessments.controller");

// middleware
const auth = require("../middleware/auth.middleware");
const validation = require("../middleware/validation/assessments.validation");

router.post("/assessments", auth, validation, controller.create);

router.get("/assessments", auth, controller.read);

router.get("/assessments/:assessmentId", auth, controller.edit);

router.put("/assessments/:assessmentId", auth, validation, controller.delete);

router.delete("/assessments/:assessmentId", auth, controller.delete);

module.exports = router;