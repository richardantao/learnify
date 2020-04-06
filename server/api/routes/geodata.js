const router = require("express").Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/geodata");

router.get("/countries", auth, controller.countries);

router.get("/countries/:country/regions", auth, controller.regions);

router.get("/regions/:region/institutions", auth, controller.institutions);

router.get("/institutions/:institution/schools", auth, controller.schools);

module.exports = router;