const express = require("express");
const academicYearController = require("./../Controllers/academicYearController");
const authController = require("../Controllers/authController");
const router = express.Router();

router
	.route("/")
	.post(
		authController.protected,
		authController.restrictTo("admin", "superAdmin"),
		academicYearController.createAcademicYear
	)
	.get(authController.protected, academicYearController.getAllAcademicYears);

router
	.route("/:id")
	.get(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		academicYearController.getAcademicYear
	)
	.patch(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		academicYearController.updateAcademicYear
	)
	.delete(
		authController.protected,
		authController.restrictTo("admin", "superAdmin", "supervisor"),
		academicYearController.deleteAacdemicYear
	);

module.exports = router;
