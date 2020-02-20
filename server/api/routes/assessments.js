const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/assessments");
const controller = require("../controllers/assessments");

// create assessment
router.post("/assessments", /*auth,*/ validation, controller.create);

// get all the assessments in a term
router.get("/terms/:termId/assessments?current&limit", /*auth,*/ controller.read);

// get all the assessments for a course
router.get("/courses/:courseId/assessments?current", /*auth,*/ controller.filter);

// get one assessment
router.get("/assessments/:assessmentId", /*auth,*/ controller.edit);

// update an assessment
router.put("/assessments/:assessmentId", /*auth,*/ validation, controller.update);

// delete an assessment
router.delete("/assessments/:assessmentId", /*auth,*/ controller.delete);

module.exports = router;