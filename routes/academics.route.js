const router = require("express").Router();
const controller = require("../controllers/academics.controller");

// middleware
const auth = require("../middleware/auth.middleware");
const validateYear = require("../middleware/validation/years.validation");
const validateTerm = require("../middleware/validation/terms.validation");
const validateCourse = require("../middleware/validation/courses.validation");

// @route /courses/
// @desc render all models within the courses view
// @access PRIVATE
router.get("/", controller.index);

/* Years */

// @route /courses/years/new
// @desc get form to add new year
// @access PRIVATE
router.get("/years/new", auth, controller.newYear);

// @route /courses/years/create
// @desc create new year
// @access PRIVATE
router.put("/years/create", auth, validateYear, controller.createYear);

// @route /courses/years/edit/:yearId
// @desc edit year instance
// @access PRIVATE
router.get("/years/edit/:yearId", auth, controller.editYear);

// @route /courses/years/update/:yearId
// @desc update year instance
// @access PRIVATE
router.put("/years/update/:yearId", auth, validateYear, controller.updateYear);

// @route /courses/years/delete/:yearId
// @desc delete year instance
// @access PRIVATE
router.put("/years/delete/:yearId", auth, controller.deleteYear);

/* Terms */

// @route /courses/terms/new
// @desc get form to add new term
// @access PRIVATE
router.get("/terms/new", auth, controller.newTerm);

// @route /courses/terms/create
// @desc create new term
// @access PRIVATE
router.put("/terms/create", auth, validateTerm, controller.createTerm);

// @route /courses/terms/edit/:termId
// @desc edit term instance
// @access PRIVATE
router.get("/terms/edit/:termId", auth, controller.editTerm);

// @route /courses/terms/update/:termId
// @desc update term instance
// @access PRIVATE
router.put("/terms/update/:termId", auth, validateTerm, controller.updateTerm);

// @route /courses/terms/delete/:termId
// @desc edit year instance
// @access PRIVATE
router.put("/terms/delete/:termId", auth, controller.deleteTerm);

// courses

// @route /courses/years/edit/:courseId
// @desc get form to add new course
// @access PRIVATE
router.get("/courses/new", auth, controller.newCourse);

// @route /courses/create
// @desc create new course
// @access PRIVATE
router.put("/courses/create", auth, validateCourse, controller.createCourse);

// @route /courses/edit/:courseId
// @desc edit course instace
// @access PRIVATE
router.get("/courses/edit/:courseId", auth, controller.editCourse);

// @route /courses/update/:courseId
// @desc update course instance
// @access PRIVATE
router.put("/courses/update/:courseId", auth, validateCourse, controller.updateCourse);

// @route /courses/delete/:courseId
// @desc delete course instance
// @access PRIVATE
router.put("/courses/delete/:courseId", auth, controller.deleteCourse);

// // modules

// // @route /courses/modules/new
// // @desc get form to add new module
// // @access PRIVATE
// router.get("/modules/new", auth, controller.newModule);

// // @route /courses/modules/create
// // @desc create new module
// // @access PRIVATE
// router.put("/modules/create", auth, validateModule.create, controller.createModule);

// // @route /courses/modules/edit/:moduleId
// // @desc edit module instance
// // @access PRIVATE
// router.get("/modules/edit/:moduleId", auth, controller.editModule);

// // @route /courses/modules/update/:moduleId
// // @desc update module instance
// // @access PRIVATE
// router.put("/modules/update/:moduleId", auth, validateModule.update, controller.updateModule);

// // @route /courses/modules/delete/:moduleId
// // @desc delete module instance
// // @access PRIVATE
// router.put("/modules/delete/:moduleId", auth, validateModule.delete, controller.deleteModule);

module.exports = router; 