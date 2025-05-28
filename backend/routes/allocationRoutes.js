const express = require("express");
const router = express.Router();
const allocationsController = require("../controllers/allocationsController");

router.get("/available/:date", (req, res) => {
  allocationsController.getAvailableEmployees(req, res);
});

router.get("/unavailable/:date", (req, res) => {
  allocationsController.getUnavailableEmployees(req, res);
});

module.exports = router;
