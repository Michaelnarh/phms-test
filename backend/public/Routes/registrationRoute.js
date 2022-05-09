const registrationController = require("../Controllers/registrationController");
const authController = require("../Controllers/authController");
const express = require("express");
const router = express.Router();
router.post(
	"/register/:year_slug/:residenceId/:user_id",
	authController.protected,
	authController.restrictTo("admin", "superAdmin", "supervisor"),
	registrationController.registerResidence
);
router.post(
	"/register/:year_slug/:residenceId",
	authController.protected,
	authController.restrictTo("admin", "superAdmin", "supervisor"),
	registrationController.disabledRegistration
);
router.get(
	"/reg/:zone_id/:academic_year",
	authController.protected,
	authController.restrictTo("admin", "superAdmin", "supervisor"),
	authController.protected,
	authController.restrictTo("admin", "superAdmin", "supervisor"),
	registrationController.getRegisteredResidences
);
router.get(
	"/unreg/:zone_id/:academic_year",
	authController.protected,
	authController.restrictTo("admin", "superAdmin", "supervisor"),
	registrationController.displayUnregisteredResidences
);

module.exports = router;
