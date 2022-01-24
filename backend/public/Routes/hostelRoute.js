const express = require("express");
const hostelController = require("../Controllers/hostelController");
const router = express.Router();

router
  .route("/")
  .get(hostelController.getAllHostels)
  .post(hostelController.createHostel);

router
  .route("/:id")
  .get(hostelController.getHostel)
  .patch(hostelController.updateHostel)
  .delete(hostelController.deleteHostel);

module.exports = router;
