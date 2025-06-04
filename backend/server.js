const express = require("express");
require("dotenv").config();
let dbConnect = require("./dbConnect");
require("./models");
const app = express();
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");
const licenseRoutes = require("./routes/licenseRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const skillRoutes = require("./routes/skillRoutes");
const allocationRoutes = require("./routes/allocationRoutes");
const rosterRoutes = require("./routes/rosterRoutes");
const teamRoutes = require("./routes/teamRoutes");

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
