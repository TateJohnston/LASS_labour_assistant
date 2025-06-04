const { json, where } = require("sequelize");
const Models = require("../models");
const { sequelize } = require("../models/employees");

const addTeam = (req, res) => {
  Models.Teams.create(req.body)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

const getTeams = (req, res) => {
  const date = JSON.stringify(req.params.shiftdate);
  const query = `select * from teams_data
where date = ${date}`;

  sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      if (data.length > 0) {
        res.send({ result: 200, data: data });
      } else {
        res.send({ result: 404, message: `No teams for ${date}` });
      }
    })
    .catch((err) => {
      res.send({ result: 500, error: err.message });
    });
};

const addEmployeeToTeam = async (req, res) => {
  const employeeID = req.params.employeeID;
  const teamID = req.params.teamID;
  const roleID = req.params.roleID;
  const date = req.params.date;

  Models.Rosters.update(
    {
      team_id: teamID,
      role_id: roleID,
    },
    {
      where: {
        employee_id: employeeID,
        date: date,
      },
    }
  )
    .then((data) => {
      if (data) {
        res.send({ result: 200, data: data, employeeID, teamID, roleID, date });
      } else {
        res.send("Nothing happened");
      }
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

module.exports = {
  addTeam,
  getTeams,
  addEmployeeToTeam,
};
