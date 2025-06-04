const express = require("express");
const router = express.Router();
const allocationsController = require("../controllers/allocationsController");

router.get("/:date", (req, res) => {
  allocationsController.getAllEmployees(req, res);
});

router.get("/unavailable/:date", (req, res) => {
  allocationsController.getUnavailableEmployees(req, res);
});

module.exports = router;
