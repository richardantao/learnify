const router = require("express").Router();
const controller = require("../controllers/tasks.controller");

// middleware
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validation/tasks.validation");

// @route /tasks/
// @desc render all current tasks
// @access PRIVATE
router.get("/", auth, controller.index);

// @route /tasks/past
// @desc render all past tasks
// @access PRIVATE
router.get("/past", auth, controller.past); // handle logic on frontend?

// @route /tasks/edit/:taskId
// @desc edit task instance
// @access PRIVATE
router.get("/edit/:taskId", auth, controller.edit);

// @route /tasks/new
// @desc get form to add new form
// @access PRIVATE
router.get("/new", auth, controller.new); 

// @route /tasks/create
// @desc add new task
// @access PRIVATE
router.post("/create", auth, validate.create, controller.create);

// @route /tasks/update/:taskId
// @desc render all current tasks
// @access PRIVATE
router.put("/update/:taskId", auth, validate.update, controller.update);

// @route /tasks/delete/:taskId
// @desc render all current tasks
// @access PRIVATE
router.delete("/delete/:taskId", auth, validate.delete, controller.delete);

module.exports = router;