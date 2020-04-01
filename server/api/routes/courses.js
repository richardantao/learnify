const router = require("express").Router();
const validation = require("../middleware/validation/courses");
const controller = require("../controllers/courses");
const auth = require("../middleware/auth");

// create a course
router.post("/courses", /*auth,*/ validation, controller.create);

// get all the courses for a specific term
router.get("/terms/:term/courses", /*auth,*/ controller.read);

// get one course
router.get("/courses/:_id", /*auth,*/ controller.edit);

// update a course
router.put("/courses/:_id", /*auth,*/ validation, controller.update);

// delete a course
router.delete("/courses/:_id", /*auth,*/ controller.delete);

module.exports = router;
