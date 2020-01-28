const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/feedback");
const controller = require("../controllers/feedback");

router.post("", /*auth,*/ validation, controller.create);

router.get("", /*auth,*/ validation, controller.read);

router.get("", /*auth,*/ validation, controller.edit);

router.put("", /*auth,*/ validation, controller.update);

router.delete("", /*auth,*/ validation, controller.delete);

module.exports = router;