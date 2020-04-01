const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/terms");
const controller = require("../controllers/terms");

// create a new term
router.post("/terms", /*auth,*/ validation, controller.create);

// get all the terms for a specific year
router.get("/years/:year/terms", /*auth,*/ controller.read);

// get one term
router.get("/terms/:_id", /*auth,*/ controller.edit);

// update a term
router.put("/terms/:_id", /*auth,*/ validation, controller.update);

// delete a term
router.delete("/terms/:_id", /*auth,*/ controller.delete);

module.exports = router;