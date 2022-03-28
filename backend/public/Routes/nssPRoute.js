const express = require("express");
const nssPController = require("../Controllers/nssPController");
const router = express.Router();

router
	.route("/")
	.get(nssPController.getAllNSSPersonnel)
	.post(
		nssPController.uploadImage,
		nssPController.resizeImage,
		nssPController.createNSSPersonnel
	);

router.route("/:slug").get(nssPController.getNSSPersonnel);
router
	.route("/:id")
	.patch(
		nssPController.uploadImage,
		nssPController.resizeImage,
		nssPController.updateNSSPersonel
	)
	.delete(nssPController.deleteNSSPersonnel);

module.exports = router;
