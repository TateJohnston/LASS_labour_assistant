const express = require("express");
const router = express.Router();
const skillsController = require("../controllers/skillsController");

router.get("/", (req, res) => {
  skillsController.getEmployeesSkills(req, res);
});

router.get("/expiring/tickets", (req, res) => {
  skillsController.getExpiringTickets(req, res);
});

router.get("/expiring/voc", (req, res) => {
  skillsController.getExpiringVOC(req, res);
});

router.post("/create/crane/:employeeID", (req, res) => {
  skillsController.createCraneOperator(req, res);
});

router.post("/create/foreman/:employeeID", (req, res) => {
  skillsController.createForeman(req, res);
});

router.post("/create/fork/:employeeID", (req, res) => {
  skillsController.createForkOperator(req, res);
});

router.post("/create/truck/:employeeID", (req, res) => {
  skillsController.createTruckOperator(req, res);
});

router.post("/create/clerk/:employeeID", (req, res) => {
  skillsController.createClerk(req, res);
});

module.exports = router;
