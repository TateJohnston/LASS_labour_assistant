const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reportsController.js");

router.get("/leave-balances-report", (req, res) => {
  reportsController.getLeaveBalancesReport(req, res);
});

router.get("/wages-report", (req, res) => {
  reportsController.getWagesReport(req, res);
});

router.get("/skills-report", (req, res) => {
  reportsController.getSkillsReport(req, res);
});

router.get("/teams-report/:startDate/:endDate", (req, res) => {
  reportsController.getTeamsReport(req, res);
});

module.exports = router;
