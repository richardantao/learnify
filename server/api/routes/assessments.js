const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/assessments");
const controller = require("../controllers/assessments");

router.post("/assessments", /*auth,*/ validation, controller.create);

router.get("/terms/:termId/assessments", /*auth,*/ controller.read);

router.get("/courses/:courseId/assessments", /*auth,*/ controller.filter);

router.get("/assessments/:assessmentId", /*auth,*/ controller.edit);

router.patch("/assessments/:assessmentId", /*auth,*/ controller.patch);

router.put("/assessments/:assessmentId", /*auth,*/ validation, controller.update);

router.delete("/assessments/:assessmentId", /*auth,*/ controller.delete);

module.exports = router;