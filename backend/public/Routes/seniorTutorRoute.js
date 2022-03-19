const express = require("express");
const seniorTutorController = require("../Controllers/seniorTutorController");
const authController = require("../Controllers/authController");
const router = express.Router();

router
	.route("/")
	.post(
		seniorTutorController.uploadImage,
		seniorTutorController.resizeImage,
		seniorTutorController.createSeniorTutor
	)
	.get(seniorTutorController.getAllSeniorTutors);

router
	.route("/:id")
	.get(seniorTutorController.getSeniorTutor)
	.patch(seniorTutorController.updateSeniorTutor)
	.delete(
		authController.protected,
		authController.restrictTo(["supervisor", "admin"]),
		seniorTutorController.deleteSeniorTutor
	);

module.exports = router;
