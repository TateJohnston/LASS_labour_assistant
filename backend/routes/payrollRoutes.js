const express = require("express");
const router = express.Router();
const payrollController = require("../controllers/payrollController");

router.get("/:startDate/:endDate", (req, res) => {
  payrollController.payableTimeSummary(req, res);
});

router.get("/summary/:employeeID/:startDate/:endDate", (req, res) => {
  payrollController.getEmployeePaySummary(req, res);
});

router.post("/create", (req, res) => {
  payrollController.confirmPayslip(req, res);
});

router.get("/completed/:startDate/:endDate", (req, res) => {
  payrollController.checkIfPayslipCompleted(req, res);
});

module.exports = router;
