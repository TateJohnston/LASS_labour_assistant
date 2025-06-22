const { json, where, Model } = require("sequelize");
const Models = require("../models");
const { sequelize } = require("../models/employees");

const getEmployeesSkills = async (req, res) => {
  const employeeID = req.query.employeeID;
  const findOne = `
    SELECT * 
    FROM active_skills
    WHERE employee_id = ${employeeID}`;
  const findAll = `  SELECT * 
    FROM active_skills`;

  if (employeeID) {
    const exists = await Models.Employees.findOne({
      where: { employee_id: employeeID },
    });
    if (exists) {
      sequelize
        .query(findOne, {
          type: sequelize.QueryTypes.SELECT,
        })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({ result: 500, error: err.message });
        });
    } else {
      res.status(404).send({
        result: 404,
        message: `Employee with ID ${employeeID} doesn't exist`,
      });
    }
  } else {
    sequelize
      .query(findAll, {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((data) => {
        res.send({ result: 200, data: data });
      })
      .catch((err) => {
        res.status(500).send({ result: 500, error: err.message });
      });
  }
};

const getExpiringTickets = (req, res) => {
  const query = `
select 
	employee_id,
    employee_name,
	foreman_ticket_expiry,
    crane_ticket_expiry,
    fork_ticket_expiry,
    truck_ticket_expiry
from employee_skills
where (
TIMESTAMPDIFF(MONTH,CURRENT_TIMESTAMP,foreman_ticket_expiry) <= 2 OR
TIMESTAMPDIFF(MONTH,CURRENT_TIMESTAMP,crane_ticket_expiry) <= 2 OR
TIMESTAMPDIFF(MONTH,CURRENT_TIMESTAMP,fork_ticket_expiry) <= 2 OR
TIMESTAMPDIFF(MONTH,CURRENT_TIMESTAMP,truck_ticket_expiry) <= 2
)`;

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

const getExpiringVOC = (req, res) => {
  const query = `
select 
	employee_id,
    employee_name,
	last_foreman_voc,
    last_crane_voc,
    last_clerk_voc,
    last_fork_voc,
    last_truck_voc
from employee_skills
where (
TIMESTAMPDIFF(MONTH,last_foreman_voc,CURRENT_TIMESTAMP) >= 11 OR
TIMESTAMPDIFF(MONTH,last_crane_voc,CURRENT_TIMESTAMP) >= 11 OR
TIMESTAMPDIFF(MONTH,last_fork_voc,CURRENT_TIMESTAMP) >= 11  OR
TIMESTAMPDIFF(MONTH,last_truck_Voc,CURRENT_TIMESTAMP) >= 11  OR
TIMESTAMPDIFF(MONTH,last_clerk_voc,CURRENT_TIMESTAMP) >= 11 
)`;
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

const revokeSkill = (req, res) => {
  const employeeID = req.params.employeeID;
  const roleID = req.params.roleID;
  const skillDictionary = {
    1: Models.Foreman,
    2: Models.CraneOperators,
    3: Models.Clerks,
    4: Models.TruckOperators,
    5: Models.ForkliftOperators,
  };

  skillDictionary[roleID]
    .update({ has_skill: false }, { where: { employee_id: employeeID } })
    .then((data) => {
      res.send({ result: 200, message: "Skill successfully revoked" });
    })
    .catch((err) => {
      res.status(500).send({
        result: 500,
        error: err.message,
      });
    });
};

const reinstateSkill = (req, res) => {
  const employeeID = req.params.employeeID;
  const roleID = req.params.roleID;
  const skillDictionary = {
    1: Models.Foreman,
    2: Models.CraneOperators,
    3: Models.Clerks,
    4: Models.TruckOperators,
    5: Models.ForkliftOperators,
  };

  skillDictionary[roleID]
    .update({ has_skill: true }, { where: { employee_id: employeeID } })
    .then((data) => {
      res.send({ result: 200, message: "Skill successfully Reinstated" });
    })
    .catch((err) => {
      res.status(500).send({
        result: 500,
        error: err.message,
      });
    });
};

module.exports = {
  getEmployeesSkills,
  getExpiringTickets,
  getExpiringVOC,

  revokeSkill,
  reinstateSkill,
};
