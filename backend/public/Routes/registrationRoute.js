const registrationController = require("../Controllers/registrationController");
const express = require("express");
const router = express.Router();
router.post(
	"/register/:year_slug/:residenceId/:user_id",
	registrationController.registerResidence
);
router.post(
	"/register/:year_slug/:residenceId",
	registrationController.disabledRegistration
);
router.get(
	"/reg/:zone_id/:academic_year",
	registrationController.getRegisteredResidences
);
router.get(
	"/unreg/:zone_id/:academic_year",
	registrationController.disabledRegistration
);

module.exports = router;
