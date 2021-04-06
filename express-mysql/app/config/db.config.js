"use strict";
const mysql = require("mysql");

// Connect to MySQL based on environment variables or default
const dbConn = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: "root",
  password: "root",
  database: "employees",
});

module.exports = dbConn;
