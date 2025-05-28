const { json, where } = require("sequelize");
const Models = require("../models");
const { sequelize } = require("../models/employees");

const getRoster = (req, res) => {
  const employeeID = req.params.employeeID;
  const query = `
SELECT 
	e.employee_id as employee_id,
    e.name as employee_name,
    s.shift_id as shift_id,
    s.name as shift,
    available,
    date
FROM rosters r
JOIN shifts s ON r.shift_id = s.shift_id
JOIN employees e ON r.employee_id = e.employee_id
WHERE e.employee_id = ${employeeID}`;

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

// const changeRoster = (req, res) => {
//   const date = req.params.date;
//   const employeeID = req.params.employeeID;
//   const data = req.body;

//   Models.Rosters.findOne({
//     where: {
//       employee_id: employeeID,
//       date: date,
//     },
//   }).then((data) => {
//     console.log({ employee_id: employeeID, date: date });
//     console.log(data);
//   });
//   Models.Rosters.update(data, {
//     where: {
//       employee_id: employeeID,
//       date: date,
//     },
//   })
//     .then((data) => {
//       if (data[0] > 0) {
//         res.send({
//           result: 200,
//           message: "Roster successfully Changed",
//           data: data,
//         });
//       } else {
//         res.send({ message: "No changes were made" });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({ result: 500, error: err.message });
//     });
// };

module.exports = {
  getRoster,
};
