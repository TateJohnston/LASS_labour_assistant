const { json } = require("sequelize");
const Models = require("../models");
const { sequelize, update } = require("../models/employees");
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const bcrypt = require("bcrypt");

const logIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const matchingEmployee = await Models.Employees.findOne({
      where: { work_email: email },
    });
    if (!matchingEmployee) {
      return res.send({ result: 404, message: "Wrong Email" });
    }
    const validPassword = await bcrypt.compare(
      password,
      matchingEmployee.password
    );
    if (!validPassword) {
      return res.send({ result: 404, message: "Wrong Password" });
    }
    res.send({
      result: 200,
      message: "Successful Login",
      data: matchingEmployee,
    });
  } catch (err) {
    res.status(500).send({ result: 500, error: err.message });
  }
};

let phoneNumber;

const sendVerificationCode = async (req, res) => {
  const email = req.body.email;
  try {
    const matchingEmployee = await Models.Employees.findOne({
      where: { work_email: email },
    });
    if (matchingEmployee) {
      const preFormattedNumber = matchingEmployee.contact_number;
      let formattedNumber = preFormattedNumber.replace(/\s+/g, "");
      if (formattedNumber.startsWith("0")) {
        formattedNumber = "+61" + formattedNumber.slice(1);
      }
      phoneNumber = formattedNumber;
      const verification = await client.verify.v2
        .services("VA81abf21ab119b8350a065302f74a7ffb")
        .verifications.create({ to: phoneNumber, channel: "sms" });
      return res.json({ result: 200, sid: verification.sid });
    } else {
      return res.json({ status: 404, message: "No matching employee" });
    }
  } catch (err) {
    return res.status(500).send({ result: 500, error: err.message });
  }
};

const verificationCheck = async (req, res) => {
  const code = req.body.code;
  try {
    const verificationCheck = await client.verify.v2
      .services("VA81abf21ab119b8350a065302f74a7ffb")
      .verificationChecks.create({
        code: code,
        to: phoneNumber,
      });
    res.json(verificationCheck);
  } catch (err) {
    console.log(err);
  }
};

const createPassword = async (req, res) => {
  const email = req.body.email;
  const newPassword = req.body.password;
  try {
    const hash = await bcrypt.hash(newPassword, 13);
    const updatedEmployee = await Models.Employees.update(
      { password: hash },
      { where: { work_email: email } }
    );
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).send({ result: 500, error: err.message });
  }
};

module.exports = {
  logIn,
  sendVerificationCode,
  verificationCheck,
  createPassword,
};
