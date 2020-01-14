const router = require("express").Router();
const validation = require("../middleware/validation/team");
const controller = require("../controllers/team");

router.post("/applications/backend", validation.tech, controller.backend);

router.post("/applications/creator", /*validation.nontech,*/  controller.creator);

router.post("/applications/designer", validation.nontech,  controller.designer);

router.post("/applications/frontend", validation.tech,  controller.frontend);

router.post("/applications/marketer", validation.nontech, controller.marketer);

module.exports = router;