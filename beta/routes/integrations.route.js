const router = require("express").Router();
const controller = require("../controllers/integrations.controller");

const auth = require("../middleware/auth.middleware");
const validation = require("../middleware/validation/integrations.validation");

router.post("/", /*auth,*/ validation, controller.create);

router.get("/", /*auth,*/ controller.read);

router.get("/:_id", /*auth,*/ controller.edit);

router.put("/:_id", /*auth,*/ validation, controller.update);

router.delete("/:_id", /*auth,*/ controller.delete);

module.exports = router;