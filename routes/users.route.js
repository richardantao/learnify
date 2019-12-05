const router = require("express").Router();
const controller = require("../controllers/user.controller");

const auth = require("../middleware/auth.middleware");
const validation = require("../middleware/validation/user.validation");

router.get("/profile", auth, controller.editProfile);

router.put("/profile", auth, validation.profile, controller.updateProfile);

router.delete("/profile", auth, controller.deleteProfile); 

router.get("/password", auth, controller.editPassword);

router.put("/password", auth, validation.password, controller.updatePassword);

router.get("/preferences", auth, controller.editPreferences);

router.put("/preferences", auth, validation.preferences, controller.updatePreferences);

module.exports = router;