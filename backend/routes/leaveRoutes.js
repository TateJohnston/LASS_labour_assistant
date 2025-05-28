const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");

router.get("/", (req, res) => {
  leaveController.getAllLeave(req, res);
});

router.post("/request", (req, res) => {
  leaveController.requestLeave(req, res);
});

router.get("/requests", (req, res) => {
  leaveController.getLeaveRequests(req, res);
});

router.put("/requests/approve/:leaverequestID", (req, res) => {
  leaveController.approveLeave(req, res);
});

router.put("/requests/deny/:leaverequestID", (req, res) => {
  leaveController.denyLeave(req, res);
});

module.exports = router;
