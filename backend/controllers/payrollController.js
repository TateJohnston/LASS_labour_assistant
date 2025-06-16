const { json, where } = require("sequelize");
const Models = require("../models");
const { sequelize } = require("../models/teams");

const payableTimeSummary = (req, res) => {
  const start_date = JSON.stringify(req.params.startDate);
  const end_date = JSON.stringify(req.params.endDate);
  const query = `SELECT * FROM payable_time_summary
WHERE date between ${start_date} AND ${end_date}`;

  sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      res.send({
        status: 200,
        data: data,
        start_date: start_date,
        end_date: end_date,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: 500, error: err.message });
    });
};

const getEmployeePaySummary = (req, res) => {
  const employeeID = req.params.employeeID;
  const startDate = JSON.stringify(req.params.startDate);
  const endDate = JSON.stringify(req.params.endDate);

  const query = `
  SELECT * FROM payable_time_summary
  WHERE employee_id = ${employeeID}
  AND date BETWEEN ${startDate} AND ${endDate}
  `;

  sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

const confirmPayslip = (req, res) => {
  const data = req.body;
  Models.Payslips.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

const checkIfPayslipCompleted = (req, res) => {
  const payday = req.query.payday;
  Models.Payslips.findAll({
    where: {
      pay_day: payday,
    },
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

module.exports = {
  payableTimeSummary,
  getEmployeePaySummary,
  confirmPayslip,
  checkIfPayslipCompleted,
};
