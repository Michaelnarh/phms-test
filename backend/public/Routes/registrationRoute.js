const registrationController = require("../Controllers/registrationController");
const express = require("express");
const router = express.Router();
router
	.route("/register/:year_slug/:residenceId")
	.get(registrationController.registerResidence);
router
	.route("/register/:year_slug/:residenceId")
	.get(registrationController.disabledRegistration);
router
	.route("/registration/:zone_id/:academic_year")
	.get(registrationController.disabledRegistration);

module.exports = router;
