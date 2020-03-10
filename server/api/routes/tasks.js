const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/tasks");
const controller = require("../controllers/tasks");

router.post("/tasks", /*auth,*/ validation, controller.create);

router.get("/terms/:termId/tasks", /*auth,*/ controller.read);

router.get("/courses/:courseId/tasks", /*auth,*/ controller.filter);

router.get("/tasks/:taskId", /*auth,*/ controller.edit);

router.put("/tasks/:taskId", /*auth,*/ validation, controller.update);

router.delete("/tasks/:taskId", /*auth,*/ controller.delete);

module.exports = router;