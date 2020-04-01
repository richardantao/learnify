const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/tasks");
const controller = require("../controllers/tasks");

router.post("/tasks", /*auth,*/ validation, controller.create);

router.get("/terms/:term/tasks", /*auth,*/ controller.read);

router.get("/courses/:course/tasks", /*auth,*/ controller.filter);

router.get("/tasks/:_id", /*auth,*/ controller.edit);

router.patch("/tasks/:_id", /*auth,*/ controller.patch);

router.put("/tasks/:_id", /*auth,*/ validation, controller.update);

router.delete("/tasks/:_id", /*auth,*/ controller.delete);

module.exports = router;