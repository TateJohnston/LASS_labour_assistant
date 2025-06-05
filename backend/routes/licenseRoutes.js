const express = require("express");
const router = express.Router();
const licensesController = require("../controllers/licensesController");

router.get("/", (req, res) => {
  licensesController.getLicenses(req, res);
});

router.get("/due", (req, res) => {
  licensesController.getDueLicenses(req, res);
});

router.put("/update/:licenseID", (req, res) => {
  licensesController.updateLicense(req, res);
});

module.exports = router;
