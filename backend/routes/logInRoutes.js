const express = require("express");
const router = express.Router();
const payrollController = require("../controllers/logInController");

router.post("/", (req, res) => {
  payrollController.logIn(req, res);
});

router.post("/send-verification", (req, res) => {
  payrollController.sendVerificationCode(req, res);
});

router.post("/verify-code", (req, res) => {
  payrollController.verificationCheck(req, res);
});

router.post("/create-password", (req, res) => {
  payrollController.createPassword(req, res);
});

module.exports = router;
