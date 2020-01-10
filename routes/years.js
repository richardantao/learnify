const router = require("express").Router();
const controller = require("../controllers/years");

const auth = require("../middleware/auth");
const validation = require("../middleware/validation/years");

// create year
router.post("/years", /*auth,*/ validation, controller.create);

// get all users
router.get("/years", /*auth,*/ controller.read);

// get one year
router.get("/years/:yearId", /*auth,*/ controller.edit);

// update year
router.put("/years/:yearId", /*auth,*/ validation, controller.update);

// delete year
router.delete("/years/:yearId", /*auth,*/ controller.delete);

module.exports = router;


