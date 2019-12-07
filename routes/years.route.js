const router = require("express").Router();
const controller = require("../controllers/years.controller");

const auth = require("../middleware/auth.middleware");
const validation = require("../middleware/validation/years.validation");

router.post("/years", auth, validation, controller.create);

router.get("/years", auth, controller.read);

router.get("/years/:yearId", auth, controller.edit);

router.put("/years/:yearId", auth, validation, controller.update);

router.delete("/years/:yearId", auth, controller.delete);

module.exports = router;


