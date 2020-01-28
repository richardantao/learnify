const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/bugs");
const controller = require("../controllers/bugs");

router.post("/", /*auth,*/ validation, controller.create);

router.get("/", /*auth,*/ controller.read);

router.get("/:bugId", /*auth,*/ controller.edit);

router.put("/:bugId", /*auth,*/ validation, controller.update);

router.delete("/:bugId", /*auth,*/ controller.delete);

module.exports = router;
