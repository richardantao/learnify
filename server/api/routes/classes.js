const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/classes");
const controller = require("../controllers/classes");

router.post("/classes", /*auth,*/ validation, controller.create);

router.get("/terms/:term/classes", /*auth,*/ controller.read);

router.get("/courses/:course/classes", /*auth,*/ controller.filter);

router.get("/classes/:_id", /*auth,*/ controller.edit);

router.put("/classes/:_id", /*auth,*/ validation, controller.delete);

router.delete("/classes/:_id", /*auth,*/ controller.delete);

module.exports = router;