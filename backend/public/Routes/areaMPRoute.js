const express = require("express");
const areaMPController = require("../Controllers/areaMPController");
const router = express.Router();

router
	.route("/")
	.get(areaMPController.getAllAreaMP)
	.post(
		areaMPController.uploadImage,
		areaMPController.resizeImage,
		areaMPController.createAreaMP
	);

router.route("/:slug").get(areaMPController.getAreaMP);
router
	.patch(
		areaMPController.uploadImage,
		areaMPController.resizeImage,
		areaMPController.updateAreaMP
	)
	.delete(areaMPController.deleteAreaMP);

module.exports = router;
