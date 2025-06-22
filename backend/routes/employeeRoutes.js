const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");

router.get("/", (req, res) => {
  employeesController.getEmployees(req, res);
});

router.get("/payslips/:employeeID", (req, res) => {
  employeesController.getPayslips(req, res);
});

router.get("/roster/:employeeID", (req, res) => {
  employeesController.getRoster(req, res);
});

router.get("/leavebalances/:employeeID", (req, res) => {
  employeesController.getLeaveBalances(req, res);
});

router.post("/create", (req, res) => {
  employeesController.createEmployee(req, res);
});

module.exports = router;
