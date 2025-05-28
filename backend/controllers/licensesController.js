const { json } = require("sequelize");
const Models = require("../models");
const { sequelize } = require("../models/employees");

const getLicenses = (req, res) => {
  Models.Licenses.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

const getDueLicenses = (req, res) => {
  const query = `
    SELECT 
        license_id,
        licenser,
        cost_per_month,
        expiry,
        createdAt,
        updatedAt,
	    TIMESTAMPDIFF(day,current_timestamp,expiry) as days_til_expiry 
    FROM licenses
    WHERE TIMESTAMPDIFF(day,current_timestamp,expiry) < 30;`;

  sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      if (data.length > 1) {
        res.send({ result: 200, data: data });
      } else {
        res.send({
          result: 404,
          message: "No licenses expiring within 30 days",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

module.exports = {
  getLicenses,
  getDueLicenses,
};
