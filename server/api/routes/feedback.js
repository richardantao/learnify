const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/feedback");
const controller = require("../controllers/feedback");

router.post("/", /*auth,*/ validation, controller.create);

router.get("/", /*auth,*/ controller.read);

router.get("/:feedbackId", /*auth,*/ controller.edit);

router.put("/:feedbackId", /*auth,*/ validation, controller.update);

router.delete("/:feedbackId", /*auth,*/ controller.delete);

module.exports = router;