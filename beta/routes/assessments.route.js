const router = require("express").Router();
const controller = require("../controllers/assessments.controller");

const auth = require("../middleware/auth.middleware");
const validation = require("../middleware/validation/assessments.validation");

// create assessment
router.post("/assessments", /*auth,*/ validation, controller.create);

// get all the assessments
router.get("/assessments", /*auth,*/ controller.readAll);

// get all the assessments in a term
router.get("/terms/:termId/assessments", /*auth,*/ controller.filterByTerm);

// get all the assessments for a course
router.get("/courses/:courseId/assessments", /*auth,*/ controller.filterByCourse);

// get one assessment
router.get("/assessments/:assessmentId", /*auth,*/ controller.edit);

// update an assessment
router.put("/assessments/:assessmentId", /*auth,*/ validation, controller.update);

// delete an assessment
router.delete("/assessments/:assessmentId", /*auth,*/ controller.delete);

module.exports = router;