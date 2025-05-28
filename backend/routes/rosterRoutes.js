const express = require("express");
const router = express.Router();
const rosterController = require("../controllers/rosterController");
const { all } = require("axios");

router.get("/:employeeID", (req, res) => {
  rosterController.getRoster(req, res);
});

router.put("/:employeeID/:date", (req, res) => {
  rosterController.changeRoster(req, res);
});

module.exports = router;
