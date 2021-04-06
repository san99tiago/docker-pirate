const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql = require("mysql");

const PORT = process.env.APP_PORT || 3000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: "root",
  password: "root",
  // insecureAuth: true,
  database: "employees",
});

app.use(morgan("short"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/developers", (req, res) => {
  const queryString = "SELECT * FROM developers";

  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query, err: ", err);
      res.sendStatus(404);
      res.end();
      return;
    }
    res.json(rows);
  });
});

app.get("/developers/:id_type/:id_value", (req, res) => {
  let idType = req.params.id_type;
  let idValue = req.params.id_value;
  res.send([
    { name: "Melissa", lastname: "Mejia", id_type: "cc", id_value: "4444" },
  ]);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
