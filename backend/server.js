const express = require("express");
require("dotenv").config();
let dbConnect = require("./dbConnect");
require("./models");
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my mySQL application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
