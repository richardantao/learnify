const router = require("express").Router();
const controller = require("../controllers/tasks");

const auth = require("../middleware/auth");
const validation = require("../middleware/validation/tasks");

router.post("/tasks", /*auth,*/ validation, controller.create);

router.get("/tasks", /*auth,*/ controller.readAll)

router.get("/terms/:termId/tasks", /*auth,*/ controller.filterByTerm);

router.get("/courses/:courseId/tasks", auth, controller.filterByCourse);

router.get("/tasks/:taskId", /*auth,*/ controller.edit);

router.put("/tasks/:taskId", /*auth,*/ validation, controller.update);

router.delete("/tasks/:taskId", /*auth,*/ controller.delete);

module.exports = router;