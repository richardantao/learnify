const router = require("express").Router();
const controller = require("../controllers/planner.controller");

const auth = require("../middleware/auth.middleware");
const validateTask = require("../middleware/validation/years.validation");
const validateAssessment = require("../middleware/validation/terms.validation");

// @route /planner/
// @desc render both models in the view
// @access PRIVATE
router.get("/", auth, controller.index);

// @route /planner/past
// @desc render past records of both models in planner view
// @access PRIVATE
router.get("/", auth, controller.past);

// @route /planner/tasks/new
// @desc get task form to create new task
// @access PRIVATE
router.get("/tasks/new", auth, controller.newTask);

// @route /planner/tasks/create
// @desc create new task
// @access PRIVATE
router.put("/tasks/create", auth, validateTask, controller.createTask);

// @route /planner/tasks/edit/:taskId
// @desc render task instance in modal to edit
// @access PRIVATE
router.get("/tasks/edit/:taskId", auth, controller.editTask);

// @route /planner/tasks/update/:taskId
// @desc update task record
// @access PRIVATE
router.put("/tasks/update/:taskId", auth, validateTask, controller.updateTask);

// @route /planner/tasks/delete/:taskId
// @desc delete task record
// @access PRIVATE
router.put("/tasks/delete/:taskId", auth, controller.deleteTask);

// @route /planner/assessments/new
// @desc get assessment form to create new assessment
// @access PRIVATE
router.get("/assessments/new", auth, controller.newAssessment);

// @route /planner/assessments/create
// @desc create new assessment
// @access PRIVATE
router.put("/assessments/create", auth, validateAssessment, controller.createAssessment);

// @route /planner/assessments/edit/:assessmentId
// @desc render assessment instance in modal to edit
// @access PRIVATE
router.get("/assessments/edit/:assessmentId", auth, controller.editAssessment);

// @route /planner/assessments/update/:assessmentId
// @desc update task record
// @access PRIVATE
router.put("/assessments/update/:assessmentId", auth, validateAssessment, controller.updateAssessment);

// @route /planner/assessments/delete/:assessmentId
// @desc delete assessment record
// @access PRIVATE
router.put("/assessments/delete/:assessmentId", auth, controller.deleteAssessment);

module.exports = router;