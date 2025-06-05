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

const getLeaveRequests = (req, res) => {
  const query = `SELECT * FROM leave_request_view`;

  sequelize
    .query(query, {
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
};

const getSpecificLeaveRequest = (req, res) => {
  const requestID = req.params.leaverequestID;
  const query = `SELECT * FROM edit_leave_request_view WHERE leave_request_id = ${requestID}`;
  sequelize
    .query(query, {
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
      console.log(err, requestID);
      res.send({ status: 500, error: err.message });
    });
};

const approveLeave = async (req, res) => {
  const leaveDictionary = {
    "Annual Leave": "al_balance",
    "Long Service Leave": "lsl_balance",
    "Sick Leave": "sl_balance",
    "Day In Lieu": "dil_balance",
    "Maternity Leave": "ml_balance",
  };

  const employeeID = req.body.employee_id;
  const leave_request_id = req.body.leave_request_id;
  const comment = JSON.stringify(req.body.comment);
  const startDate = JSON.stringify(req.body.start_date);
  const endDate = JSON.stringify(req.body.end_date);
  const decrementAmount = req.body.decrement_amount;
  const leaveType = req.body.leave_type;
  const leaveColumn = leaveDictionary[leaveType];

  const removeFromRoster = `update rosters
set available = false
where date between ${startDate} and ${endDate} and employee_id = ${employeeID}`;

  const approveLeaveRequest = `update leave_requests
set status = "Approved", comment = ${comment}
where leave_request_id = ${leave_request_id}`;

  try {
    await sequelize.query(removeFromRoster, {
      type: sequelize.QueryTypes.UPDATE,
    });

    await sequelize.query(approveLeaveRequest, {
      type: sequelize.QueryTypes.UPDATE,
    });

    await Models.LeaveBalances.decrement(
      { [leaveColumn]: decrementAmount },
      {
        where: {
          employee_id: employeeID,
        },
      }
    );

    res.send({ result: 200, message: "All updates done and leave approved" });
  } catch (err) {
    res.status(500).send({ result: 500, error: err.message });
  }
};

const denyLeave = (req, res) => {
  const leaveRequestID = req.params.leaverequestID;
  const comment = req.body.comment;

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
  getSpecificLeaveRequest,
};
