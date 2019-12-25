const router = require("express").Router();
const controller = require("../controllers/terms");

const auth = require("../middleware/auth");
const validation = require("../middleware/validation/terms");

// create a new term
router.post("/terms", auth, validation, controller.create);

// get all the terms for a specific year
router.get("/years/:yearId/terms", auth, controller.read);

// get one term
router.get("/terms/:termId", auth, controller.edit);

// update a term
router.put("/terms/:termId", auth, validation, controller.update);

// delete a term
router.delete("/terms/:termId", auth, controller.delete);

module.exports = router;