const Employees = require("./employees");
const LeaveBalances = require("./leave_balances");
const Payslips = require("./payslips");
const Licenses = require("./licenses");
const ForkliftOperators = require("./forklift_operators");
const CraneOperators = require("./crane_operators");
const Foreman = require("./foreman");
const Clerks = require("./clerks");
const TruckOperators = require("./truck_operators");
const Shifts = require("./shifts");
const Teams = require("./teams");
const Rosters = require("./rosters");
const Roles = require("./roles");
const Managers = require("./managers");
const LeaveRequests = require("./leave_requests");

const init = async () => {
  await Employees.sync();
  await LeaveBalances.sync();
  await Payslips.sync();
  await Licenses.sync();
  await ForkliftOperators.sync();
  await CraneOperators.sync();
  await Foreman.sync();
  await Clerks.sync();
  await TruckOperators.sync();
  await Shifts.sync();
  await Teams.sync();
  await Rosters.sync();
  await Roles.sync();
  await Managers.sync();
  await LeaveRequests.sync();
};

init();

module.exports = {
  Employees,
  ForkliftOperators,
  LeaveBalances,
  Payslips,
  Licenses,
  CraneOperators,
  Foreman,
  Clerks,
  TruckOperators,
  Shifts,
  Teams,
  Rosters,
  Roles,
  Managers,
  LeaveRequests,
};
