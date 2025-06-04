const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teamsController");

router.post("/addteam", (req, res) => {
  teamsController.addTeam(req, res);
});

router.get("/:shiftdate", (req, res) => {
  teamsController.getTeams(req, res);
});

router.put("/addteam/:date/:employeeID/:teamID/:roleID", (req, res) => {
  teamsController.addEmployeeToTeam(req, res);
});

module.exports = router;
