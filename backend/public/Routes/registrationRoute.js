const registrationController = require("../Controllers/registrationController");
const express = require("express");
const router = express.Router();
router.post(
	"/register/:year_slug/:residenceId",
	registrationController.registerResidence
);
router.post(
	"/register/:year_slug/:residenceId",
	registrationController.disabledRegistration
);
router.get(
	"/:zone_id/:academic_year",
	registrationController.getRegisteredResidences
);

module.exports = router;
