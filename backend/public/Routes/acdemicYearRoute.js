const express = require("express");
const academicYearController = require("./../Controllers/academicYearController");
const router = express.Router();

router
	.route("/")
	.post(academicYearController.createAcademicYear)
	.get(academicYearController.getAllAcademicYears);

router
	.route("/:id")
	.get(academicYearController.getAcademicYear)
	.patch(academicYearController.updateAcademicYear)
	.delete(academicYearController.deleteAacdemicYear);

module.exports = router;
