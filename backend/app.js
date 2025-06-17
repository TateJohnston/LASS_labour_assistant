const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

const licenseRoutes = require("./routes/licenseRoutes");
const logInRoutes = require("./routes/logInRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const rosterRoutes = require("./routes/rosterRoutes");
const skillRoutes = require("./routes/skillRoutes");
const teamRoutes = require("./routes/teamRoutes");

app.use(express.json());

app.use("/lass/licenses", licenseRoutes);
app.use("/lass/leave", leaveRoutes);
app.use("/lass/skills", skillRoutes);
app.use("/lass/rosters", rosterRoutes);
app.use("/lass/teams", teamRoutes);
app.use("/lass/payroll", payrollRoutes);
app.use("/lass/logIn", logInRoutes);

module.exports = app;
