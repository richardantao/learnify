const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/assessments");
const controller = require("../controllers/assessments");

router.post("/assessments", /*auth,*/ validation, controller.create);

router.get("/terms/:term/assessments", /*auth,*/ controller.read);

router.get("/courses/:course/assessments", /*auth,*/ controller.filter);

router.get("/assessments/:_id", /*auth,*/ controller.edit);

router.patch("/assessments/:_id", /*auth,*/ controller.patch);

router.put("/assessments/:_id", /*auth,*/ validation, controller.update);

router.delete("/assessments/:_id", /*auth,*/ controller.delete);

module.exports = router;