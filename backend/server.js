const express = require("express");
require("dotenv").config();
let dbConnect = require("./dbConnect");
const { init } = require("./models");
const app = express();
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");
const licenseRoutes = require("./routes/licenseRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const skillRoutes = require("./routes/skillRoutes");
const allocationRoutes = require("./routes/allocationRoutes");
const rosterRoutes = require("./routes/rosterRoutes");
const teamRoutes = require("./routes/teamRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const logInRoutes = require("./routes/logInRoutes");
const reportRoutes = require("./routes/reportRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my mySQL application." });
});

app.use("/lass/employees", employeeRoutes);
app.use("/lass/licenses", licenseRoutes);
app.use("/lass/leave", leaveRoutes);
app.use("/lass/skills", skillRoutes);
app.use("/lass/allocations", allocationRoutes);
app.use("/lass/rosters", rosterRoutes);
app.use("/lass/teams", teamRoutes);
app.use("/lass/payroll", payrollRoutes);
app.use("/lass/logIn", logInRoutes);
app.use("/lass/reports", reportRoutes);

app.use("/lass", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== "test") {
  init()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
      });
    })
    .catch((err) => {
      console.error("Failed to initialize models:", err);
    });
} else {
  module.exports = app;
}
