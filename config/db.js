const mysql = require("mysql");
const { createSchema } = require("../models/schema");

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: 3307,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");

  // Create database schema if it doesn't exist
  db.query(createSchema, (err) => {
    if (err) throw err;
    console.log("Database schema created");
  });
});

module.exports = db;
