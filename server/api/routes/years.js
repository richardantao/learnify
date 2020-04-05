const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/years");
const controller = require("../controllers/years");

// create year
router.post("/", /*auth,*/ validation, controller.create);

// get all the user's years
router.get("/", /*auth,*/ controller.read);

// fetch specific year
router.get("/:_id", /*auth,*/ controller.edit);

// update year
router.put("/:_id", /*auth,*/ validation, controller.update);

// delete year
router.delete("/:_id", /*auth,*/ controller.delete);

module.exports = router;


