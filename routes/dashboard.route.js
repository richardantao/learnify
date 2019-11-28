const router = require("express").Router();
const controller = require("../controllers/dashboard.controller");

// middleware
const auth = require("../middleware/auth.middleware");
const validateClass = require("../middleware/validation/classes.validation");
const validateTask = require("../middleware/validation/tasks.validation");
const validateAssessment = require("../middleware/validation/assessments.validation");

// @route /dashboard/
// @desc render all today's classes, and the tasks and assessments due within 7 days
// @access PRIVATE
router.get("/", auth, controller.index);

/* Class routes */

// @route /dashboard/classes/edit/:classId
// @desc edit class instance
// @access PRIVATE
router.get("classes/edit/:classId", auth, controller.editClass);

// @route /dashboard/classes/update/:classId
// @desc update class instance
// @access PRIVATE
router.put("classes/update/:classId", auth, validateClass, controller.updateClass);

// @route /dashboard/classes/delete/:classId
// @desc delete class instance
// @access PRIVATE
router.put("/classes/delete/:classId", auth, controller.deleteClass); 

/* Task routes */

// @route /dashboard/tasks/new
// @desc get form to add new task through the dashboard
// @access PRIVATE
router.get("/tasks/new", auth, controller.newTask);

// @route /dashboard/tasks/create
// @desc create new task
// @access PRIVATE
router.put("/tasks/create", auth, validateTask, controller.createTask);

// @route /dashboard/tasks/edit/:taskId
// @desc edit task instance
// @access PRIVATE
router.get("/tasks/edit/:taskId", auth, controller.editTask);

// @route /dashboard/tasks/create
// @desc update task instances
// @access PRIVATE
router.put("/tasks/update/:taskId", auth, validateTask, controller.updateTask);

// @route /dashboard/tasks/delete/:taskId
// @desc delete task instance
// @access PRIVATE
router.put("/tasks/delete/:taskId", auth, controller.deleteTask);

// @route /dashboard/assessments/edit/:assessmentId
// @desc edit assessment instance
// @access PRIVATE
router.get("/assessments/edit/:assessmentId", auth, controller.editAssessment);

// @route /dashboard/tasks/update/:assessmentId
// @desc update assessment 
// @access PRIVATE
router.put("/assessments/update/:assessmentId", auth, validateAssessment, controller.updateAssessment);

// @route /dashboard/assessments/delete/:assessmentId
// @desc delete assessment instance
// @access PRIVATE
router.put("/assessments/delete/:assessmentId", auth, controller.deleteAssessment);

module.exports = router;

