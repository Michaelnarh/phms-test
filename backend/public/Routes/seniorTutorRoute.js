const express = require("express");
const seniorTutorController = require("../Controllers/seniorTutorController");
const authController = require("../Controllers/authController");
const router = express.Router();

router.route("/de-activate/:id").patch(seniorTutorController.handleDeActivate);
router.route("/activate/:id").patch(seniorTutorController.handleActivate);
router
	.route("/")
	.post(
		seniorTutorController.uploadImage,
		seniorTutorController.resizeImage,
		seniorTutorController.createSeniorTutor
	)
	.get(seniorTutorController.getAllSeniorTutors);

router.route("/:slug").get(seniorTutorController.getSeniorTutor);
router
	.route("/:id")
	.patch(
		seniorTutorController.uploadImage,
		seniorTutorController.resizeImage,
		seniorTutorController.updateSeniorTutor
	)
	.delete(
		// authController.protected,
		// authController.restrictTo(["supervisor", "admin"]),
		seniorTutorController.deleteSeniorTutor
	);

module.exports = router;
