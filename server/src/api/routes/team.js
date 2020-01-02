const router = require("express").Router();
const controller = require("../controllers/team");

const validation = require("../middleware/validation/team");

router.post("/applications/backend", validation.backend, controller.backend);

router.post("/applications/creator", validation.creator, controller.creator);

router.post("/applications/designer", validation.designer, controller.designer);

router.post("/applications/frontend", validation.frontend, controller.frontend);

router.post("/applications/marketer", validation.marketer, controller.marketer);

// router.post("/applications/swift", validation.swift, controller.swift);

module.exports = router;