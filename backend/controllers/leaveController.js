const { json, where } = require("sequelize");
const Models = require("../models");
const { sequelize } = require("../models/employees");

const getAllLeave = (req, res) => {
  const employeeID = req.query.employeeID;

  if (!employeeID) {
    Models.LeaveBalances.findAll({})
      .then((data) => {
        res.send({ result: 200, data: data });
      })
      .catch((err) => {
        res.status(500).send({ result: 500, error: err.message });
      });
  } else {
    Models.LeaveBalances.findOne({
      where: { employee_id: employeeID },
    })
      .then((data) => {
        res.send({ result: 200, data: data });
      })
      .catch((err) => {
        res.status(500).send({ result: 500, error: err.message });
      });
  }
};

const requestLeave = (req, res) => {
  const data = req.body;
  Models.LeaveRequests.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

const getLeaveRequests = async (req, res) => {
  //WHen working on front end, if a specific employee is selected make sure to have a query after the requests eg http://localhost:8081/lass/leave/requests/?employeeID=1
  const employeeID = req.query.employeeID;
  const queryAll = `SELECT * FROM leave_requests;`;
  const queryOne = `SELECT * FROM leave_requests WHERE employee_id = ${employeeID}`;

  if (!employeeID) {
    sequelize
      .query(queryAll, {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((data) => {
        if (data.length !== 0) {
          res.send({ status: 200, data: data });
        } else {
          res.send({ status: 404, message: "No leave requests" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.send({ status: 500, error: err.message });
      });
  } else {
    sequelize
      .query(queryOne, {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((data) => {
        if (data.length !== 0) {
          res.send({ status: 200, data: data });
        } else {
          res.send({ status: 404, message: `Employee has no leave requests.` });
        }
      })
      .catch((err) => {
        console.log(err);
        res.send({ status: 500, error: err.message });
      });
  }
};

const approveLeave = async (req, res) => {
  const leaveRequestID = req.params.leaverequestID;

  try {
    await Models.LeaveRequests.update(
      { status: "Approved" },
      { where: { leave_request_id: leaveRequestID }, returning: true }
    );

    const leaveRequest = await Models.LeaveRequests.findOne({
      where: {
        leave_request_id: leaveRequestID,
      },
    });
    const leaveType = leaveRequest.dataValues.leave_type;
    const employeeID = leaveRequest.dataValues.employee_id;
    const rosterID = leaveRequest.dataValues.roster_id;

    const balances = {
      al: "al_balance",
      lsl: "lsl_balance",
      sl: "sl_balance",
      dil: "dil_balance",
      ml: "ml_balance",
    };

    const selectedBalance = balances[leaveType];

    await Models.LeaveBalances.decrement(selectedBalance, {
      where: { employee_id: employeeID },
    });

    await Models.Rosters.update(
      {
        available: false,
      },
      { where: { roster_id: rosterID } }
    );

    res.send({ result: 200, message: "Leave successfully approved" });
  } catch (err) {
    res.status(500).send({ result: 500, error: err.message });
  }
};

const denyLeave = (req, res) => {
  const leaveRequestID = req.params.leaverequestID;
  //In front end make the comment the req.body
  const comment = "Sorry too many people off";
  // Change the status in leave_requests to Denied
  // Put a comment in the comment section in leave_requests
  Models.LeaveRequests.update(
    { status: "Denied", comment: comment },
    { where: { leave_request_id: leaveRequestID } }
  )
    .then((data) => {
      res.send({ result: 200, message: "Leave successfully denied" });
    })
    .catch((err) => {
      res.status(500).send({ result: 500, error: err.message });
    });
};

module.exports = {
  getAllLeave,
  approveLeave,
  requestLeave,
  getLeaveRequests,
  denyLeave,
};
