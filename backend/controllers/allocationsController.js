const { json, where } = require("sequelize");
const Models = require("../models");
const { sequelize } = require("../models/employees");
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const getAllEmployees = (req, res) => {
  const date = JSON.stringify(req.query.date);
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

const sendAllocations = (req, res) => {
  const employeeID = req.body.employeeID;
  const name = req.body.name;
  const role = req.body.role;
  const date = req.body.date;
  const shift = req.body.shift;
  const number = req.body.number;

  client.messages
    .create({
      body: `${name} Employee ID ${employeeID}, CONFIRMED for ${shift} ${date}. Role: ${role}`,
      messagingServiceSid: "MG65d14e822e2693f5782af559a422da10",
      to: number,
    })
    .then((message) => {
      console.log(message.sid);
      confirmToUser();
    });

  const confirmToUser = () => {
    res.status(200).send({ result: 200, message: "Allocations Sent" });
  };
};

module.exports = {
  sendAllocations,
  getAllEmployees,
};
