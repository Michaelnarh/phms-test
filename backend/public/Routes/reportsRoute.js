const express = require("express");

const reportController = require("../Controllers/reportController");

const router = express.Router();

router.get("/owners", reportController.getOwners);
router.get("/managers", reportController.getManagers);
router.get("/porters", reportController.getPorters);
router.get("/hostels", reportController.getHostels);
router.get("/homestels", reportController.getHomesls);
router.get("/registered", reportController.geRegisteredResidences);
router.get("/statistics", reportController.getRegisteredNumber);

module.exports = router;
