const { json, where } = require("sequelize");
const Models = require("../models");
const { sequelize } = require("../models/employees");

const getAllEmployees = (req, res) => {
  const date = JSON.stringify(req.params.date);
  const query = `
SELECT 
	r.employee_id as employee_id,
    employee_name,
    s.name as shift,
    foreman,
    crane,
    clerk,
    fork,
    truck
FROM rosters r
LEFT JOIN active_skills  ON r.employee_id = active_skills.employee_id
LEFT JOIN shifts s ON r.shift_id = s.shift_id
WHERE date = ${date} and available = true`;

  sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getAllEmployees,
};
