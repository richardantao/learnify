const router = require("express").Router();
const controller = require("../controllers/team");

const validate = require("../middleware/validation/team");

router.post("/applications/backend", validate.backend, controller.backend);

router.post("/applications/creator", validate.creator, controller.creator);

router.post("/applications/designer", validate.designer, controller.designer);

router.post("/applications/frontend", validate.frontend, controller.frontend);

router.post("/applications/marketer", validate.marketer, controller.marketer);

// router.post("/applications/swift", validate.swift, controller.swift);

module.exports = router;