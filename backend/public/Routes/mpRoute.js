const express = require("express");
const mpController = require("../Controllers/mpController");
const router = express.Router();

router.route("/").get(mpController.getAllMPs).post(mpController.createMP);
router
	.route("/:id")
	.get(mpController.getMP)
	.patch(mpController.updateMP)
	.delete(mpController.deleteMP);

module.exports = router;
