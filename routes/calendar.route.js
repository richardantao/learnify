const router = require("express").Router();
const controller = require("../controllers/calendar.controller");
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validation/classes.validation");

// @route /calendar/
// @desc display default calendar view
// @ access PRIVATE
router.get("/", auth, controller.index);

// @route /calendar/month
// @desc display month calendar view
// @ access PRIVATE
router.get("/month", auth, controller.month);

// @route /calendar/week
// @desc display week calendar view
// @ access PRIVATE
router.get("/week", auth, controller.week);

// @route /calendar/day
// @desc display day calendar view
// @ access PRIVATE
router.get("/day", auth, controller.day);

// @route /calendar/agenda
// @desc display user's agenda
// @ access PRIVATE
router.get("/agenda", auth, controller.agenda);

// @route /calendar/classes/new
// @desc get form to add new class
// @access PRIVATE
router.get("/classes/new", auth, controller.newClass);

// @route /calendar/classes/create
// @desc create new class in calendar page
// @ access PRIVATE
router.put("/classes/create", auth, validate, controller.createClass);

// @route /calendar/classes/edit/classId
// @desc edit class instance
// @access PRIVATE
router.get("/classes/edit/:classId", auth, controller.editClass);

// @route /calendar/classes/update/classId
// @desc display default calendar view
// @ access PRIVATE
router.put("/classes/update/:classId", auth, validate, controller.updateClass);

// @route /calendar/classes/delete/classId
// @desc display default calendar view
// @ access PRIVATE
router.put("/classes/delete/:classId", auth, controller.deleteClass);

module.exports = router;