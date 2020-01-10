const router = require("express").Router();
const validation = require("../middleware/validation/team");
const storage = require("../middleware/storage/team");
const controller = require("../controllers/team");

router.post("/applications/backend", validation.tech, storage.multer.single("resume"), storage.uploadToGCP, controller.backend);

router.post("/applications/creator", validation.nontech, storage.multer.single("resume"), storage.uploadToGCP, controller.creator);

router.post("/applications/designer", validation.nontech, storage.multer.single("resume"), storage.uploadToGCP, controller.designer);

router.post("/applications/frontend", validation.tech, storage.multer.single("resume"), storage.uploadToGCP, controller.frontend);

router.post("/applications/marketer", validation.nontech, storage.multer.single("resume"), storage.uploadToGCP, controller.marketer);

// router.post("/applications/swift", validation.swift, storage, controller.swift);

module.exports = router;