const express = require("express");
const residenceController = require("../Controllers/residenceController");
const searchController = require("../Controllers/searchController");
const authController = require("../Controllers/authController");

const router = express.Router();
//special routes
/**get residence by type */
router.route("/search").post(searchController.searchResidence);
router.route("/hostels").get(residenceController.getHostels);
router.route("/homestels").get(residenceController.getHomestels);
router
	.route("/statistics")
	.get(authController.protected, residenceController.getStatistics);

//get zonal addressess
router
	.route("/zone/:zone_id/addresses")
	.get(authController.protected, residenceController.getZonalGpsAdrress);

router
	.route("/")
	.get(residenceController.getAllResidence)
	.post(
		authController.protected,
		authController.restrictTo(
			"maintainer",
			"admin",
			"superAdmin",
			"supervisor"
		),
		residenceController.uploadImages,
		residenceController.resizeImage,
		residenceController.createResidence
	);

router.route("/:slug").get(residenceController.getResidence);
router
	.route("/:id")
	.post(
		residenceController.uploadImages,
		residenceController.resizeImage,
		residenceController.updateResidence
	)
	.delete(residenceController.deleteResidence);

module.exports = router;
