const { json } = require("sequelize");
const Models = require("../models");
const { sequelize } = require("../models/employees");

const getLeaveBalancesReport = (req, res) => {
  const employeeID = req.query.employeeID;

  if (!employeeID) {
    const query = `SELECT * from leave_balances_report`;
    sequelize
      .query(query, {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((data) => {
        res.status(200).send({ result: 200, data: data });
      })
      .catch((err) => {
        res.status(500).send({ result: 500, error: err.message });
      });
  } else {
    const query = `SELECT * from leave_balances_report where employee_id = ${employeeID}`;
    sequelize
      .query(query, {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((data) => {
        res.status(200).send({ result: 200, data: data });
      })
      .catch((err) => {
        res.status(500).send({ result: 500, error: err.message });
      });
  }
};

const getWagesReport = (req, res) => {
  const employeeID = req.query.employeeID;

  if (!employeeID) {
    const query = `SELECT * from ytd_wages_report`;
    sequelize
      .query(query, {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((data) => {
        res.status(200).send({ result: 200, data: data });
      })
      .catch((err) => {
        res.status(500).send({ result: 500, error: err.message });
      });
  } else {
    const query = `SELECT * from ytd_wages_report where employee_id = ${employeeID}`;
    sequelize
      .query(query, {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((data) => {
        res.status(200).send({ result: 200, data: data });
      })
      .catch((err) => {
        res.status(500).send({ result: 500, error: err.message });
      });
  }
};

const getSkillsReport = (req, res) => {
  const query = `SELECT * from active_skills`;
  sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      res.status(200).send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

const getTeamsReport = (req, res) => {
  const startDate = JSON.stringify(req.params.startDate);
  const endDate = JSON.stringify(req.params.endDate);
  const query = `SELECT * FROM teams_report where work_date between ${startDate} and ${endDate}`;
  sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      res.status(200).send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

module.exports = {
  getTeamsReport,
  getLeaveBalancesReport,
  getWagesReport,
  getSkillsReport,
};
