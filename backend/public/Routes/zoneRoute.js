const express = require("express");
const zoneController = require("../Controllers/zoneController");
const router = express.Router();

router.route("/").post(zoneController.createZone);
//   .get(hostelController.getAllHostels)

// router
//   .route("/:id")
//   .get(hostelController.getHostel)
//   .patch(hostelController.updateHostel);

module.exports = router;
