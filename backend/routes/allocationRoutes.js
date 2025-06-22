const express = require("express");
const router = express.Router();
const allocationsController = require("../controllers/allocationsController");

router.get("/", (req, res) => {
  allocationsController.getAllEmployees(req, res);
});

router.post("/send-allocations", (req, res) => {
  allocationsController.sendAllocations(req, res);
});

module.exports = router;
