"use strict";

const { json } = require("sequelize");
const { sequelize, create } = require("../models");
const Models = require("../models");
const redisClient = require("../redisClient");
const DEFAULT_EXPIRATION = 3600;

const getEmployees = (req, res) => {
  Models.Employees.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.messaage });
    });
};

const getPayslips = (req, res) => {
  const employeeID = req.params.employeeID;
  Models.Payslips.findAll({
    where: {
      employee_id: employeeID,
      // release: true,
    },
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.messaage });
    });
};

const getRoster = async (req, res) => {
  const employeeID = req.params.employeeID;
  try {
    const cached = await redisClient.get(`roster:${employeeID}`);
    if (!cached) {
      console.log("Not cached yet");
      const roster = await Models.Rosters.findAll({
        where: { employee_id: employeeID },
      });
      await redisClient.setEx(
        `roster:${employeeID}`,
        DEFAULT_EXPIRATION,
        JSON.stringify(roster)
      );
      res.send({ result: 200, data: roster });
    } else {
      console.log("cache found");
      return res.json({ result: 200, data: JSON.parse(cached) });
    }
  } catch (err) {
    res.status(500).send({ result: 500, error: err.message });
  }
};

const getLeaveBalances = (req, res) => {
  const employeeID = req.params.employeeID;
  Models.LeaveBalances.findOne({
    where: { employee_id: employeeID },
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((data) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

const createEmployee = (req, res) => {
  const data = req.body;
  Models.Employees.create(data)
    .then((data) => {
      res.send({ result: 200, message: "employee successfully created" });
    })
    .catch((err) => {
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getEmployees,
  getPayslips,
  getRoster,
  getLeaveBalances,
  createEmployee,
};
