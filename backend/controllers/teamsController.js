const { json, where } = require("sequelize");
const Models = require("../models");
const { sequelize, update } = require("../models/employees");

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
        res.send("No Changes");
      }
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

const updateBonus = (req, res) => {
  const team_id = req.body.team_id;

  Models.Teams.update(
    { bonus: req.body.bonus },
    { where: { team_id: team_id } }
  )
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).result({ result: 500, error: err.message });
    });
};

const deleteTeam = (req, res) => {
  const teamID = req.params.teamID;
  Models.Teams.destroy({ where: { team_id: teamID } })
    .then((data) => {
      res
        .status(200)
        .send({
          result: 200,
          message: "Team Successfully Deleted",
          data: data,
        });
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

module.exports = {
  addTeam,
  getTeams,
  addEmployeeToTeam,
  updateBonus,
  deleteTeam,
};
