const router = require("express").Router();
const controller = require("../controllers/stats");

router.get("/users", controller.users);

router.get("/years", controller.years);

router.get("/terms", controller.terms);

router.get("/courses", controller.courses);

router.get("/classes", controller.classes);

router.get("/assessments", controller.assessments);

router.get("/tasks", controller.tasks);

router.get("/beta", controller.beta);

router.get("/feedback", controller.feedback);

router.get("/bugs", controller.bugs);

router.get("/blog", controller.blog);

module.exports = router;