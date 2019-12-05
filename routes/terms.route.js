const router = require("express").Router();
const controller = require("../controllers/terms.controller");

const auth = require("../middleware/auth.middleware");
const validation = require("../middleware/validation/terms.validation");

router.post("/", auth, validation, controller.create);

router.get("/", auth, controller.read);

router.get("/:termId", auth, controller.edit);

router.put("/:termId", auth, validation, controller.update);

router.delete("/:termId", auth, controller.delete);

module.exports = router;