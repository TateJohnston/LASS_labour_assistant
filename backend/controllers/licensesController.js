const { json } = require("sequelize");
const Models = require("../models");
const { sequelize, update } = require("../models/employees");

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
      if (data.length > 0) {
        res.status(200).send({ result: 200, data: data });
      } else {
        res.status(400).send({
          result: 404,
          message: "No licenses expiring within 30 days",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

const updateLicense = (req, res) => {
  const licenseID = req.params.licenseID;
  const cost_per_month = req.body.cost_per_month;
  const expiry = req.body.expiry;

  if (cost_per_month && expiry) {
    Models.Licenses.update(
      {
        cost_per_month: cost_per_month,
        expiry: expiry,
      },
      { where: { license_id: licenseID } }
    )
      .then((data) => {
        res.send({ result: 200, data: data });
      })
      .catch((err) => {
        res.status(500).send({ result: 500, error: err.message });
      });
  } else if (!cost_per_month && expiry) {
    Models.Licenses.update(
      {
        expiry: expiry,
      },
      { where: { license_id: licenseID } }
    )
      .then((data) => {
        res.send({ result: 200, data: data });
      })
      .catch((err) => {
        res.status(500).send({ result: 500, error: err.message });
      });
  } else if (cost_per_month && !expiry) {
    Models.Licenses.update(
      {
        cost_per_month: cost_per_month,
      },
      { where: { license_id: licenseID } }
    )
      .then((data) => {
        res.send({ result: 200, data: data });
      })
      .catch((err) => {
        res.status(500).send({ result: 500, error: err.message });
      });
  } else {
    res.send({ result: 404, message: "Nothing to update" });
  }
};

module.exports = {
  getLicenses,
  getDueLicenses,
  updateLicense,
};
