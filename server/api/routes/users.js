const router = require("express").Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation/user");
const controller = require("../controllers/user");

router.get("/users/profile", /*auth,*/ controller.editProfile);

router.put("/users/profile", /*auth,*/ validation.profile, controller.updateProfile);

router.delete("/users/profile", /*auth,*/ controller.deleteProfile); 

router.get("/users/password", /*auth,*/ controller.editPassword);

router.put("/users/password", /*auth,*/ validation.password, controller.updatePassword);

router.get("/users/preferences", /*auth,*/ controller.editPreferences);

router.put("/users/preferences", /*auth,*/ validation.preferences, controller.updatePreferences);

module.exports = router;