const express = require("express");
const residenceController = require("../Controllers/residenceController");
const searchController = require("../Controllers/searchController");
const router = express.Router();
//special routes
/**get residence by type */
router.route("/search?:search").get(searchController.searchResidence);
router.route("/hostels").get(residenceController.getHostels);
router.route("/homestels").get(residenceController.getHomestels);

router
	.route("/")
	.get(residenceController.getAllResidence)
	.post(residenceController.createResidence);

router
	.route("/:id")
	.get(residenceController.getResidence)
	.patch(
		residenceController.uploadCoverImage,
		residenceController.resizeImage,
		residenceController.updateResidence
	)
	.delete(residenceController.deleteResidence);

module.exports = router;
