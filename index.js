const express = require("express");
const mysql = require("mysql");
const morgan = require("morgan");
const db = require("./config/db");

db;

require("dotenv").config();

const app = express();

app.use(morgan("tiny"));

app.use(express.json());

const employee = require("./routes/employee");

app.use("", employee);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
