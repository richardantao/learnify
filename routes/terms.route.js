const router = require("express").Router();
const controller = require("../controllers/terms.controller");

const auth = require("../middleware/auth.middleware");
const validation = require("../middleware/validation/terms.validation");

router.post("/terms", auth, validation, controller.create);

router.get("/terms", auth, controller.read);

router.get("/years/:yearId/terms", auth, controller.filter);

router.get("/terms/:termId", auth, controller.edit);

router.put("/terms/:termId", auth, validation, controller.update);

router.delete("/terms/:termId", auth, controller.delete);

module.exports = router;